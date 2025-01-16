import { dailyLog, dailyMeal, user } from '@/server/db/schema/user'
import {
  userIngredient,
  userMeal,
  userPlan,
  userRecipe,
} from '@/server/db/schema/user-plan'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { and, desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const dailyLogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        date: z.date(),
        morningWeight: z.string(),
        notes: z.string(),
        sleep: z.string(),
        sleepQuality: z.string().optional(),
        nap: z.string().optional(),
        isHiit: z.boolean().optional(),
        isCardio: z.boolean().optional(),
        isLift: z.boolean().optional(),
        bowelMovements: z.string(),
        image: z.string().optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(dailyLog)
        .values({
          ...input,
        })
        .returning({ id: dailyLog.id })

      return { res }
    }),
  deleteMeal: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        planId: z.number(),
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

      // console.log('meal', meal)
      // console.log('recipe', recipe)
      // console.log('ingredient', ingredient)

      if (!input.logId) {
        const log = await ctx.db
          .insert(dailyLog)
          .values({
            date: input.date,
            morningWeight: '',
            notes: '',
            sleep: '',
            sleepQuality: '',
            isHiit: false,
            isCardio: false,
            isLift: false,
            bowelMovements: '',
            image: '',
            userId: input.userId,
          })
          .returning({ id: dailyLog.id })

        const logId = log?.[0]?.id
        if (!logId) return

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
        if (!dailyMealId) return

        const recipeInsert = await ctx.db
          .insert(userRecipe)
          .values({
            ...recipe,
            dailyMealId: dailyMealId,
            isLog: true,
          })
          .returning({ id: userRecipe.id })

        return { meal }
      } else {
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
        date: z.date(),
        morningWeight: z.string(),
        notes: z.string(),
        sleep: z.string(),
        sleepQuality: z.string().optional(),
        nap: z.string().optional(),
        isHiit: z.boolean().optional(),
        isCardio: z.boolean().optional(),
        isLift: z.boolean().optional(),
        bowelMovements: z.string(),
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
        isHiit,
        isCardio,
        isLift,
        bowelMovements,
        image,
        userId,
        nap,
      } = input
      const res = await ctx.db
        .update(dailyLog)
        .set({
          date,
          morningWeight,
          notes,
          sleep,
          sleepQuality,
          nap,
          isHiit,
          isCardio,
          isLift,
          bowelMovements,
          image,
          userId,
        })
        .where(eq(dailyLog.id, id))

      return { res }
    }),
  getAllUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db.query.dailyLog.findMany({
        where: eq(dailyLog.userId, input),
        with: {
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
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq(dailyLog.id, input),
    })
    return res
  }),
})
