
import { weighIn } from '@/server/db/schema/user'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const weighInRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        date: z.date().optional(),
        bodyWeight: z.string(),
        bodyFat: z.string(),
        leanMass: z.string(),
        userId: z.string(),
        trainerId: z.string(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(weighIn)
        .values({
          ...input,
        })
        .returning({ id: weighIn.id })

      return { res }
    }),
  getAllUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db.query.weighIn.findMany({
        where: eq(weighIn.userId, input),
        orderBy: (data, { desc }) => desc(data.date),
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(weighIn).where(eq(weighIn.id, input))
      return res
    }),
  deleteAll: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db.delete(weighIn).where(eq(weighIn.userId, input))
      return res
    }),
})
