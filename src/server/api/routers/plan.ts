import { plan, planToRecipe, planToVegeStack } from '@/server/db/schema/plan'
import { recipe, recipeToIngredient } from '@/server/db/schema/recipe'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const planRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc(plan.createdAt)],
      with: {
          planToVegeStack: {
            with: {
              vegeStack: true,
            },
          },
        planToRecipe: {
          with: {
            recipe: true,
          },
        },
      },
    })
    return res
  }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.plan.findFirst({
        where: (recipe, { eq }) => eq(plan.id, input.id),
        with: {
          planToVegeStack: {
            with: {
              vegeStack: true,
            },
          },
          planToRecipe: {
            with: {
              recipe: true,
            },
          },
        },
      })
      return res
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        notes: z.string(),
        planCategory: z.string(),
        numberOfMeals: z.number(),
        veges: z.array(
          z.object({
            vegeStackId: z.number(),
            note: z.string(),
            mealNumber: z.number(),
            calories: z.string(),
          }),
        ),
        recipes: z.array(
          z.object({
            recipeId: z.number(),
            note: z.string(),
            index: z.number(),
            mealNumber: z.number(),
            calories: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { veges, recipes, ...data } = input
      const res = await ctx.db
        .insert(plan)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: recipe.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      const recipeRes = await ctx.db
        .insert(planToRecipe)
        .values(
          recipes.map((recipe) => ({
            ...recipe,
            planId: resId,
          })),
        )
        .returning({ id: planToRecipe.id })

      const vegeStackRes = await ctx.db
        .insert(planToVegeStack)
        .values(
          veges.map((vege) => ({
            ...vege,
            planId: resId,
          })),
        )
        .returning({ id: planToVegeStack.id })

      return { res, recipeRes, vegeStackRes }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(plan).where(eq(plan.id, input.id))
      return res
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(plan)
    return res
  }),
})
