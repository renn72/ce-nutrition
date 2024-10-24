import { recipe, recipeToIngredient } from '@/server/db/schema/recipe'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const groceryStoreRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.recipe.findMany()
    return res
  }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.recipe.findFirst({
        where: (recipe, { eq }) => eq(recipe.id, input.id),
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
            isProtein: z.boolean(),
            isCarbohydrate: z.boolean(),
            isFat: z.boolean(),
            note: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const res = await ctx.db.insert(recipe).values({
        ...input,
        creatorId: userId,
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(recipe).where(eq(recipe.id, input.id))
      return res
    }),
})
