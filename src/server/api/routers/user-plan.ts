import { plan, planToMeal } from '@/server/db/schema/plan'
import { user } from '@/server/db/schema/user'
import {
  userIngredient,
  userMeal,
  userPlan,
  userRecipe,
} from '@/server/db/schema/user-plan'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const userPlanRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(userPlan).where(eq(userPlan.id, input))
      return res
    }),
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.userPlan.findFirst({
      where: eq(userPlan.id, input),
      with: {
        userMeals: true,
        userRecipes: true,
        userIngredients: true,
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
      const recipes = meals.map((meal) => meal.recipes).flat()
      const ingredients = recipes.map((recipe) => recipe.ingredients).flat()

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
          .update(user)
          .set({ currentPlanId: resId })
          .where(eq(user.id, input.userId)),
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
              userPlanId: resId,
            })),
          )
          .returning({ id: userIngredient.id }),
      ])
      return { res, batchRes }
    }),
})
