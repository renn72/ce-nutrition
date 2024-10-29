import { vegeStack } from '@/server/db/schema/meal'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const vegeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.vegeStack.findMany()
    return res
  }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.vegeStack.findFirst({
        where: (store, { eq }) => eq(store.id, input.id),
      })
      return res
    }),
  create: protectedProcedure
    .input(z.object({ veges: z.string(), notes: z.string(), calories: z.string(), name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.insert(vegeStack).values({
        ...input,
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(vegeStack)
        .where(eq(vegeStack.id, input.id))
      return res
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(vegeStack)
    return res
  }),
})
