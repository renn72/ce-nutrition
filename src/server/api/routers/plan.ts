import { recipe, recipeToIngredient } from '@/server/db/schema/recipe'
import { plan, planToRecipe } from '@/server/db/schema/plan'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const planRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc(plan.createdAt)],
      with: {
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
        recipeCategory: z.string(),
        ingredients: z.array(
          z.object({
            ingredientId: z.number(),
            alternateId: z.string(),
            isProtein: z.boolean(),
            isCarbohydrate: z.boolean(),
            isFat: z.boolean(),
            note: z.string(),
            serveSize: z.string(),
            serveUnit: z.string(),
            index: z.number(),
            isAlternate: z.boolean().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { ingredients, ...data } = input
      const res = await ctx.db
        .insert(recipe)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: recipe.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      const ingredientsRes = await ctx.db
        .insert(recipeToIngredient)
        .values(
          ingredients.map((ingredient) => ({
            ...ingredient,
            recipeId: resId,
          })),
        )
        .returning({ id: recipeToIngredient.id })
      return { res, ingredientsRes }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(recipe).where(eq(recipe.id, input.id))
      return res
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(recipe)
    return res
  }),
})
