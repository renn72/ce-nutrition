import { createIngredientSchema } from '@/server/api/schema/ingredient'
import { ingredient } from '@/server/db/schema/ingredient'
import {
  createTRPCRouter,
  protectedProcedure,
} from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'


export const groceryStoreRouter = createTRPCRouter({
  getAll: protectedProcedure
    .query(async ({ ctx }) => {
      const res = await ctx.db.query.groceryStore.findMany()
      return res
    }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.groceryStore.findFirst({
        where: (store, { eq }) => eq(store.id, input.id),
      })
      return res
    }),
  create: protectedProcedure
    .input(createIngredientSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      console.log({ ...input, userId })
      return true
      const res = await ctx.db.insert(ingredient).values({
        ...input,
        userId,
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(ingredient)
        .where(eq(ingredient.id, input.id))
      return res
    }),
})
