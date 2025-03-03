
import { db } from '@/server/db'
import { log } from '@/server/db/schema/log'
import {
  dailyLog,
  dailyMeal,
  poopLog,
  user,
  waterLog,
} from '@/server/db/schema/user'
import {
  userIngredient,
  userMeal,
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


export const metricsRouter = createTRPCRouter({
  getAllSkinfolds: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.skinfold.findMany()
    return res
  }),
  getSkinfold: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.skinfold.findFirst({
      where: eq(skinfold.id, input),
    })
    return res
  }),
})
