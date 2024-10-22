import { createStoreSchema } from '@/server/api/schema/store'
import { groceryStore } from '@/server/db/schema/ingredient'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const groceryStoreRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
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
    .input(createStoreSchema)
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.insert(groceryStore).values({
        ...input,
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(groceryStore)
        .where(eq(groceryStore.id, input.id))
      return res
    }),
})
