import { db } from '@/server/db'
import { log } from '@/server/db/schema/log'
import {
  dailyLog,
  dailyMeal,
  poopLog,
  user,
  waterLog,
} from '@/server/db/schema/user'
import {
  userIngredient,
  userMeal,
  userPlan,
  userRecipe,
} from '@/server/db/schema/user-plan'
import type { GetSimpleDailyLogById as DailyLog } from '@/types'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { and, desc, eq } from 'drizzle-orm'
import { z } from 'zod'

const createBlankLogs = async (
  userId: string,
  startDate: Date,
): Promise<DailyLog[]> => {
  const logs: DailyLog[] = []
  for (let i = 1; i < 7; i++) {
    const date = new Date(startDate.toDateString())
    date.setDate(startDate.getDate() + i)
    const existingLog = await db
      .select()
      .from(dailyLog)
      .where(
        and(
          eq(dailyLog.userId, userId),
          eq(dailyLog.date, date.toDateString()),
        ),
      )
      .then((res) => res[0])
    if (!existingLog) {
      const log = await db
        .insert(dailyLog)
        .values({
          date: date.toDateString(),
          morningWeight: '',
          notes: date.toDateString(),
          sleep: '',
          sleepQuality: '',
          isHiit: false,
          isCardio: false,
          isLift: false,
          isLiss: false,
          image: '',
          waistMeasurement: '',
          userId: userId,
        })
        .returning()
        .then((res) => res[0])
      logs.push(log)
    } else {
      await db.delete(dailyMeal).where(eq(dailyMeal.dailyLogId, existingLog.id))
      logs.push(existingLog)
    }
  }
  return logs
}

const createLog = async ({
  user,
  task,
  notes,
  userId,
  objectId,
}: {
  user: string
  task: string
  notes: string
  userId: string
  objectId: number | null | undefined
}) => {
  await db.insert(log).values({
    task: task,
    notes: notes,
    user: user,
    userId: userId,
    objectId: objectId,
  })
}

export const dailyLogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        morningWeight: z.string().optional(),
        fastedBloodGlucose: z.string().optional(),
        notes: z.string().optional(),
        sleep: z.string().optional(),
        sleepQuality: z.string().optional(),
        nap: z.string().optional(),
        waistMeasurement: z.string().optional(),
        isHiit: z.boolean().optional(),
        isCardio: z.boolean().optional(),
        isLift: z.boolean().optional(),
        isLiss: z.boolean().optional(),
        image: z.string().optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(dailyLog)
        .values({
          ...input,
          date: input.date,
        })
        .returning({ id: dailyLog.id })

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Create Daily Log',
        notes: JSON.stringify(input),
        objectId: res[0]?.id,
      })

      return { res }
    }),
  deleteMeal: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        mealIndex: z.number().nullable(),
        recipeId: z.number().nullable().optional(),
        date: z.date(),
        logId: z.number().nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .delete(userIngredient)
        .where(
          and(
            eq(userIngredient.dailyLogId, input.logId ?? -1),
            eq(userIngredient.mealIndex, input.mealIndex ?? -1),
          ),
        )

      await ctx.db
        .delete(userRecipe)
        .where(
          and(
            eq(userRecipe.dailyLogId, input.logId ?? -1),
            eq(userRecipe.mealIndex, input.mealIndex ?? -1),
          ),
        )

      await ctx.db
        .delete(dailyMeal)
        .where(
          and(
            eq(dailyMeal.dailyLogId, input.logId ?? -1),
            eq(dailyMeal.mealIndex, input.mealIndex ?? -1),
          ),
        )
      return true
    }),
  copyWeek: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        logId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const referenceLog = await ctx.db
        .select()
        .from(dailyLog)
        .where(eq(dailyLog.id, input.logId))
        .then((res) => res[0])
      if (!referenceLog || referenceLog.date === null) {
        throw new Error('Reference log not found.')
      }
      const startDate = new Date(referenceLog.date)
      console.log('startDate1', startDate.toDateString())
      const logs = await createBlankLogs(input.userId, startDate)
      await Promise.all(
        logs.map(async (log) => {
          if (log) {
            const meals = await ctx.db.query.dailyMeal.findMany({
              where: eq(dailyMeal.dailyLogId, input.logId),
            })
            meals.forEach(async (meal) => {
              if (meal) {
                const recipes = await db
                  .select()
                  .from(userRecipe)
                  .where(eq(userRecipe.dailyMealId, meal.id))
                const ingredients = await db
                  .select()
                  .from(userIngredient)
                  .where(eq(userIngredient.dailyMealId, meal.id))

                const newMeal = await db
                  .insert(dailyMeal)
                  .values({
                    ...meal,
                    id: undefined,
                    dailyLogId: log.id,
                  })
                  .returning({ id: dailyMeal.id })

                await Promise.all(
                  recipes.map(async (recipe) => {
                    await db.insert(userRecipe).values({
                      ...recipe,
                      id: undefined,
                      dailyMealId: newMeal[0]?.id,
                    })
                  }),
                )
                await Promise.all(
                  ingredients.map(async (ingredient) => {
                    await db.insert(userIngredient).values({
                      ...ingredient,
                      id: undefined,
                      dailyMealId: newMeal[0]?.id,
                    })
                  }),
                )
              }
            })
          }
        }),
      )
      return true
    }),
  clearDay: protectedProcedure
    .input(
      z.object({
        logId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const dailyMeals = await ctx.db
        .delete(dailyMeal)
        .where(eq(dailyMeal.dailyLogId, input.logId))

      return dailyMeals
    }),
  addWaterLog: protectedProcedure
    .input(
      z.object({
        logId: z.number().optional(),
        amount: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let logId = input.logId
      let isCreateLog = false

      if (input.logId === null || input.logId === undefined) {
        isCreateLog = true
        const log = await ctx.db
          .insert(dailyLog)
          .values({
            date: new Date().toDateString(),
            morningWeight: '',
            notes: '',
            sleep: '',
            sleepQuality: '',
            isHiit: false,
            isCardio: false,
            isLift: false,
            isLiss: false,
            image: '',
            waistMeasurement: '',
            userId: ctx.session.user.id,
          })
          .returning({ id: dailyLog.id })

        logId = log?.[0]?.id
      }
      if (!logId) throw new Error('Log not found')

      const water = await ctx.db
        .insert(waterLog)
        .values({
          amount: input.amount.toString(),
          dailyLogId: logId,
        })
        .returning({ id: waterLog.id })

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: water[0]?.id,
        task: 'Add Water ' + input.amount.toString() + 'ml',
        notes: isCreateLog ? 'Created new log' : '',
      })

      return water
    }),
  deleteWaterLog: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(waterLog).where(eq(waterLog.id, input.id))
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: input.id,
        task: 'Deleted water',
        notes: '',
      })
      return res
    }),
  addPoopLog: protectedProcedure
    .input(
      z.object({
        logId: z.number().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let logId = input.logId
      let isCreateLog = false

      if (input.logId === null || input.logId === undefined) {
        isCreateLog = true
        const log = await ctx.db
          .insert(dailyLog)
          .values({
            date: new Date().toDateString(),
            morningWeight: '',
            notes: '',
            sleep: '',
            waistMeasurement: '',
            sleepQuality: '',
            isHiit: false,
            isCardio: false,
            isLift: false,
            isLiss: false,
            image: '',
            userId: ctx.session.user.id,
          })
          .returning({ id: dailyLog.id })

        logId = log?.[0]?.id
      }
      if (!logId) throw new Error('Log not found')

      const poop = await ctx.db
        .insert(poopLog)
        .values({
          dailyLogId: logId,
        })
        .returning({ id: poopLog.id })

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: poop[0]?.id,
        task: 'Poop',
        notes: isCreateLog ? 'Created new log' : '',
      })

      return poop
    }),
  deletePoopLog: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(poopLog).where(eq(poopLog.id, input.id))
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: input.id,
        task: 'Deleted Poo',
        notes: '',
      })
      return res
    }),
  addMeal: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        planId: z.number(),
        mealIndex: z.number().nullable(),
        recipeIndex: z.number().nullable().optional(),
        recipeId: z.number().nullable().optional(),
        date: z.date(),
        logId: z.number().nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      console.log('input', input)

      const plan = await ctx.db.query.userPlan.findFirst({
        where: eq(userPlan.id, input.planId),
        with: {
          userMeals: true,
          userRecipes: true,
          userIngredients: true,
        },
      })

      if (!plan) return

      const meal = plan.userMeals.find(
        (meal) => meal.mealIndex == input.mealIndex,
      )
      if (!meal) return

      const recipe = plan.userRecipes.find(
        (recipe) =>
          recipe.recipeIndex == input.recipeIndex &&
          recipe.mealIndex == input.mealIndex,
      )
      if (!recipe) return

      const ingredients = plan.userIngredients.filter(
        (ingredient) =>
          ingredient.recipeIndex == input.recipeIndex &&
          ingredient.mealIndex == input.mealIndex,
      )
      if (!ingredients) return

      if (input.logId === null || input.logId === undefined) {
        const log = await ctx.db
          .insert(dailyLog)
          .values({
            date: input.date.toDateString(),
            morningWeight: '',
            notes: input.date.toDateString(),
            sleep: '',
            sleepQuality: '',
            waistMeasurement: '',
            isHiit: false,
            isCardio: false,
            isLift: false,
            isLiss: false,
            image: '',
            userId: input.userId,
          })
          .returning({ id: dailyLog.id })

        const logId = log?.[0]?.id
        console.log('logId', logId)
        if (!logId) throw new Error('Log not found')

        const meal = await ctx.db
          .insert(dailyMeal)
          .values({
            dailyLogId: logId,
            mealIndex: input.mealIndex,
            recipeId: input.recipeId,
            vegeCalories: '',
            veges: '',
          })
          .returning({ id: dailyMeal.id })

        const dailyMealId = meal?.[0]?.id
        console.log('dailyMealId', dailyMealId)
        if (!dailyMealId) throw new Error('Daily meal not found')

        const { id, createdAt, updatedAt, userPlanId, ...recipeInput } = recipe
        const recipeInsert = await ctx.db
          .insert(userRecipe)
          .values({
            ...recipeInput,
            dailyMealId: dailyMealId,
            dailyLogId: logId,
            isLog: true,
          })
          .returning({ id: userRecipe.id })

        console.log('recipeInsert', recipeInsert?.[0]?.id)

        const ingredientInsert = await ctx.db
          .insert(userIngredient)
          .values(
            ingredients.map((ingredient) => {
              return {
                id: undefined,
                ingredientId: ingredient.ingredientId,
                recipeId: recipeInsert?.[0]?.id,
                mealIndex: ingredient.mealIndex,
                recipeIndex: ingredient.recipeIndex,
                alternateId: ingredient.alternateId,
                dailyMealId: dailyMealId,
                dailyLogId: logId,
                isLog: true,
                serve: ingredient.serve,
                serveUnit: ingredient.serveUnit,
              }
            }),
          )
          .returning({ id: userIngredient.id })
        return { meal }
      } else {
        await ctx.db.batch([
          ctx.db
            .delete(userIngredient)
            .where(
              and(
                eq(userIngredient.dailyLogId, input.logId ?? -1),
                eq(userIngredient.mealIndex, input.mealIndex ?? -1),
              ),
            ),
          ctx.db
            .delete(userRecipe)
            .where(
              and(
                eq(userRecipe.dailyLogId, input.logId ?? -1),
                eq(userRecipe.mealIndex, input.mealIndex ?? -1),
              ),
            ),
          ctx.db
            .delete(dailyMeal)
            .where(
              and(
                eq(dailyMeal.dailyLogId, input.logId ?? -1),
                eq(dailyMeal.mealIndex, input.mealIndex ?? -1),
              ),
            ),
        ])

        const meal = await ctx.db
          .insert(dailyMeal)
          .values({
            dailyLogId: input.logId,
            mealIndex: input.mealIndex,
            recipeId: input.recipeId,
            vegeCalories: '',
            veges: '',
          })
          .returning({ id: dailyMeal.id })
        const dailyMealId = meal?.[0]?.id
        console.log('create 1')
        if (!dailyMealId) return

        const { id, createdAt, updatedAt, userPlanId, ...recipeInput } = recipe
        const recipeInsert = await ctx.db
          .insert(userRecipe)
          .values({
            ...recipeInput,
            dailyMealId: dailyMealId,
            dailyLogId: input.logId,
            isLog: true,
          })
          .returning({ id: userRecipe.id })

        const ingredientInsert = await ctx.db
          .insert(userIngredient)
          .values(
            ingredients.map((ingredient) => {
              return {
                ingredientId: ingredient.ingredientId,
                recipeId: recipeInsert?.[0]?.id,
                mealIndex: ingredient.mealIndex,
                recipeIndex: ingredient.recipeIndex,
                alternateId: ingredient.alternateId,
                dailyMealId: dailyMealId,
                dailyLogId: input.logId,
                isLog: true,
                serve: ingredient.serve,
                serveUnit: ingredient.serveUnit,
              }
            }),
          )
          .returning({ id: userIngredient.id })

        return { meal, recipe: recipeInsert, ingredient: ingredientInsert }
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        date: z.string(),
        morningWeight: z.string().optional(),
        notes: z.string().optional(),
        sleep: z.string().optional(),
        sleepQuality: z.string().optional(),
        fastedBloodGlucose: z.string().optional(),
        nap: z.string().optional(),
        waistMeasurement: z.string().optional(),
        isHiit: z.boolean().optional(),
        isCardio: z.boolean().optional(),
        isLift: z.boolean().optional(),
        isLiss: z.boolean().optional(),
        image: z.string().optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        date,
        morningWeight,
        notes,
        sleep,
        sleepQuality,
        fastedBloodGlucose,
        waistMeasurement,
        isHiit,
        isCardio,
        isLift,
        isLiss,
        image,
        userId,
        nap,
      } = input
      const res = await ctx.db
        .update(dailyLog)
        .set({
          date: date,
          morningWeight,
          notes,
          sleep,
          sleepQuality,
          fastedBloodGlucose,
          waistMeasurement,
          nap,
          isHiit,
          isCardio,
          isLift,
          isLiss,
          image,
          userId,
        })
        .where(eq(dailyLog.id, id))
      createLog({
        user: ctx.session.user.name,
        task: 'Update Daily Log',
        notes: JSON.stringify(input),
      })

      return { res }
    }),
  getAllUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db.query.dailyLog.findMany({
        where: eq(dailyLog.userId, input),
        with: {
          waterLogs: true,
          poopLogs: true,
          dailyMeals: {
            with: {
              recipe: true,
              ingredients: true,
            },
          },
        },
        orderBy: (data, { desc }) => desc(data.date),
      })
      return res
    }),
  getAllCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq(dailyLog.userId, ctx.session.user.id),
      with: {
        poopLogs: true,
        waterLogs: true,
      },
      orderBy: (data, { desc }) => desc(data.date),
    })
    return res
  }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(dailyLog).where(eq(dailyLog.id, input))
      return res
    }),
  deleteAll: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db
        .delete(dailyLog)
        .where(eq(dailyLog.userId, input))
      return res
    }),
  getSimple: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.dailyLog.findFirst({
        where: eq(dailyLog.id, input),
      })
      return res
    }),
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq(dailyLog.id, input),
      with: {
        poopLogs: true,
        waterLogs: true,
      },
    })
    return res
  }),
})
