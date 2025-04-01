import { db } from '@/server/db'
import {
  dailyLog,
  dailyMeal,
  poopLog,
  tag,
  tagToDailyLog,
  waterLog,
} from '@/server/db/schema/daily-logs'
import { log } from '@/server/db/schema/log'
import {
  userIngredient,
  userPlan,
  userRecipe,
} from '@/server/db/schema/user-plan'
import type { GetSimpleDailyLogById as DailyLog } from '@/types'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { and, desc, eq } from 'drizzle-orm'
import { z } from 'zod'

const createLog = async ({
  user,
  task,
  notes,
  userId,
  objectId,
}: {
  user: string
  task: string
  notes: string
  userId: string
  objectId: number | null | undefined
}) => {
  await db.insert(log).values({
    task: task,
    notes: notes,
    user: user,
    userId: userId,
    objectId: objectId,
  })
}

export const tagRouter = createTRPCRouter({
  getAllTagsCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.tag.findMany({
      where: eq(tag.userId, ctx.session.user.id),
      orderBy: (data, { desc }) => desc(data.createdAt),
    })
    return res
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        color: z.string(),
        icon: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.insert(tag).values({
        name: input.name,
        color: input.color,
        icon: input.icon,
        userId: ctx.session.user.id,
      })
      return res
    }),
  updateTagToDailyLog: protectedProcedure
    .input(
      z.object({
        tagId: z.number(),
        dailyLogId: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const isTagged = await ctx.db.query.tagToDailyLog.findFirst({
        where: and(
          eq(tagToDailyLog.tagId, input.tagId),
          eq(tagToDailyLog.dailyLogId, input.dailyLogId),
        ),
      })

      if (isTagged) {
        await ctx.db
          .delete(tagToDailyLog)
          .where(
            and(
              eq(tagToDailyLog.tagId, input.tagId),
              eq(tagToDailyLog.dailyLogId, input.dailyLogId),
            ),
          )
        return true
      } else {
        const res = await ctx.db.insert(tagToDailyLog).values({
          tagId: input.tagId,
          dailyLogId: input.dailyLogId,
        })
        return res
      }

    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(tag).where(eq(tag.id, input))
      return res
    }),
})
