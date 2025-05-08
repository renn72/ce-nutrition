import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { client, db } from '~/server/db'
import { log } from '~/server/db/schema/log'
import { goals, user, userSettings } from '~/server/db/schema/user'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const goalsRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.query.goals.findMany({
        where: (goal, { eq }) => eq(goal.userId, input.userId),
      })
      return res
    }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.query.goals.findFirst({
        where: (goal, { eq }) => eq(goal.id, input.id),
      })
      return res
    }),
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        title: z.string(),
        description: z.string(),
        state: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const trainerId = ctx.session?.user.id
      const res = await ctx.db
        .insert(goals)
        .values({
          userId: input.userId,
          title: input.title,
          description: input.description,
          state: input.state,
          trainerId: trainerId,
        })
        .returning({ id: goals.id })
      return res
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        description: z.string(),
        state: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(goals)
        .set({
          title: input.title,
          description: input.description,
          state: input.state,
        })
        .where(eq(goals.id, input.id))
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.delete(goals).where(eq(goals.id, input.id))
      return res
    }),
})
