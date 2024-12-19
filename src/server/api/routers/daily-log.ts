import { dailyLog, user } from '@/server/db/schema/user'
import {
  userIngredient,
  userMeal,
  userPlan,
  userRecipe,
} from '@/server/db/schema/user-plan'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const dailyLogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        date: z.date().optional(),
        morningWeight: z.string(),
        notes: z.string(),
        sleep: z.string(),
        bowelMovements: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(dailyLog)
        .values({
          ...input,
        })
        .returning({ id: dailyLog.id })

      return { res }
    }),
  getAllUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db.query.dailyLog.findMany({
        where: eq(dailyLog.userId, input),
        orderBy: (data, { desc }) => desc(data.date),
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(dailyLog).where(eq(dailyLog.id, input))
      return res
    }),
  deleteAll: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db.delete(dailyLog).where(eq(dailyLog.userId, input))
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
})
