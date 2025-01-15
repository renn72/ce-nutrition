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
        date: z.date(),
        morningWeight: z.string(),
        notes: z.string(),
        sleep: z.string(),
        sleepQuality: z.string().optional(),
        nap: z.string().optional(),
        isHiit: z.boolean().optional(),
        isCardio: z.boolean().optional(),
        isLift: z.boolean().optional(),
        bowelMovements: z.string(),
        image: z.string().optional(),
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
  addMeal: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        planId: z.number(),
        mealIndex: z.number(),
        recipeIndex: z.number(),
        ingredientIndex: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {}),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        date: z.date(),
        morningWeight: z.string(),
        notes: z.string(),
        sleep: z.string(),
        sleepQuality: z.string().optional(),
        nap: z.string().optional(),
        isHiit: z.boolean().optional(),
        isCardio: z.boolean().optional(),
        isLift: z.boolean().optional(),
        bowelMovements: z.string(),
        image: z.string().optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const {
        id,
        date,
        morningWeight,
        notes,
        sleep,
        sleepQuality,
        isHiit,
        isCardio,
        isLift,
        bowelMovements,
        image,
        userId,
        nap,
      } = input
      const res = await ctx.db
        .update(dailyLog)
        .set({
          date,
          morningWeight,
          notes,
          sleep,
          sleepQuality,
          nap,
          isHiit,
          isCardio,
          isLift,
          bowelMovements,
          image,
          userId,
        })
        .where(eq(dailyLog.id, id))

      return { res }
    }),
  getAllUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
      const res = await ctx.db.query.dailyLog.findMany({
        where: eq(dailyLog.userId, input),
        with: {
          dailyMeals: {
            with: {
              recipe: true,
            },
          },
        },
        orderBy: (data, { desc }) => desc(data.date),
      })
      return res
    }),
  getAllCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.dailyLog.findMany({
      where: eq(dailyLog.userId, ctx.session.user.id),
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
      const res = await ctx.db
        .delete(dailyLog)
        .where(eq(dailyLog.userId, input))
      return res
    }),
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.dailyLog.findFirst({
      where: eq(dailyLog.id, input),
    })
    return res
  }),
})
