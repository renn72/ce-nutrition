import { plan, planToMeal } from '@/server/db/schema/plan'
import { userPlan, userMeal, userRecipe, userIngredient } from '@/server/db/schema/user-plan'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const userPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string(),
        image: z.string().optional(),
        notes: z.string(),
        meals: z.array(
          z.object({
            mealId: z.string(),
            mealTitle: z.string(),
            calories: z.string(),
            protein: z.string().optional(),
            targetProtein: z.string(),
            targetCalories: z.string(),
            vegeCalories: z.string(),
            vege: z.string(),
            vegeNotes: z.string(),
            note: z.string(),
            recipes: z.array(
              z.object({
                recipeId: z.string(),
                name: z.string(),
                note: z.string(),
                description: z.string(),
                index: z.number(),
                ingredients: z.array(
                  z.object({
                    ingredientId: z.string(),
                    name: z.string(),
                    serveSize: z.string(),
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
      const userId = ctx.session.user.id
      const { meals, ...data } = input
      const res = await ctx.db
        .insert(plan)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: plan.id })

      const resId = res?.[0]?.id
      if (!resId) return res
      const mealRes = await ctx.db
        .insert(planToMeal)
        .values(
          meals.map((meal) => ({
            ...meal,
            planId: resId,
          })),
        )
        .returning({ id: planToMeal.id })

      return { res, mealRes }
    }),
})
