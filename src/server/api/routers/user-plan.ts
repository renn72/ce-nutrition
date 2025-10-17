import { plan, planToMeal } from '@/server/db/schema/plan'
import {
  userIngredient,
  userMeal,
  userPlan,
  userRecipe,
} from '@/server/db/schema/user-plan'
import { notification } from '@/server/db/schema/notification'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

import { createLog } from '@/server/api/routers/admin-log'

export const userPlanRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(userPlan).where(eq(userPlan.id, input))
      return res
    }),
  finishPlan: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      try {
        const res = await ctx.db
          .update(userPlan)
          .set({
            isActive: false,
            finishedAt: new Date(),
          })
          .where(eq(userPlan.id, input))
        console.log({ finishPlan: res })
        return res
      } catch (e) {
        console.log({ finishPlanError: e })
        return e
      }
    }),
  activePlan: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(userPlan)
        .set({
          isActive: true,
          finishedAt: null,
        })
        .where(eq(userPlan.id, input))
      return res
    }),
  getMeal: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.userMeal.findFirst({
        where: eq(userMeal.id, input),
      })
      return res
    }),
  getRecipe: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.userRecipe.findFirst({
        where: eq(userRecipe.id, input),
      })
      return res
    }),
  getIngredient: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.userIngredient.findFirst({
        where: eq(userIngredient.id, input),
        with: {
          ingredient: true,
          alternateIngredient: true,
        },
      })
      return res
    }),
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userPlan.findFirst({
      where: eq(userPlan.id, input),
      with: {
        userMeals: true,
        userRecipes: true,
        userIngredients: {
          with: {
            ingredient: true,
            alternateIngredient: true,
          },
        },
      },
    })
    return res
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        image: z.string(),
        notes: z.string(),
        userId: z.string(),
        meals: z.array(
          z.object({
            mealIndex: z.number(),
            mealTitle: z.string(),
            calories: z.string(),
            protein: z.string().optional(),
            targetProtein: z.string(),
            targetCalories: z.string(),
            vegeCalories: z.string(),
            veges: z.string(),
            vegeNotes: z.string(),
            note: z.string(),
            recipes: z.array(
              z.object({
                recipeIndex: z.number(),
                mealIndex: z.number(),
                name: z.string(),
                note: z.string(),
                description: z.string(),
                index: z.number(),
                ingredients: z.array(
                  z.object({
                    ingredientId: z.number(),
                    ingredientIndex: z.number(),
                    recipeIndex: z.number(),
                    mealIndex: z.number(),
                    alternateId: z.number().nullable(),
                    name: z.string(),
                    serve: z.string(),
                    serveUnit: z.string(),
                    note: z.string(),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const creatorId = ctx.session.user.id
      const { meals, ...data } = input
      const recipes = meals.flatMap((meal) => meal.recipes)
      const ingredients = recipes.flatMap((recipe) => recipe.ingredients)

      const res = await ctx.db
        .insert(userPlan)
        .values({
          ...data,
          isActive: true,
          creatorId: creatorId,
        })
        .returning({ id: plan.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      const batchRes = await ctx.db.batch([
        ctx.db
          .insert(userMeal)
          .values(
            meals.map((meal) => ({
              ...meal,
              userPlanId: resId,
            })),
          )
          .returning({ id: planToMeal.id }),
        ctx.db
          .insert(userRecipe)
          .values(
            recipes.map((recipe) => ({
              ...recipe,
              userPlanId: resId,
            })),
          )
          .returning({ id: userRecipe.id }),
        ctx.db
          .insert(userIngredient)
          .values(
            ingredients.map((ingredient) => ({
              ...ingredient,
              alternateId: ingredient.alternateId === 0 ? null : Number(ingredient.alternateId),
              userPlanId: resId,
            })),
          )
          .returning({ id: userIngredient.id }),
      ])
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'User Create Plan',
        notes: JSON.stringify(input),
        objectId: resId,
      })
			const notif = await ctx.db.query.notification.findMany({
				where: and(
					eq(notification.userId, input.userId),
					eq(notification.code, 'user-plan_update'),
					eq(notification.isViewed, false),
				),
			})
			if (notif.length === 0) {
				await ctx.db.insert(notification).values({
					userId: input.userId,
					code: 'user-plan_update',
					title: 'Your user meal plan has been updated',
					description: 'You have a new user meal plan update',
					isViewed: false,
          isRead: false,
				})
			}
      console.log({ res, batchRes })
      return { res, batchRes }
    }),
})
