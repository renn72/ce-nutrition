import { db } from '@/server/db'
import { log } from '@/server/db/schema/log'
import {
  bodyFat,
  bodyWeight,
  leanMass,
  skinfold,
} from '@/server/db/schema/metrics'
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
  getUserSkinfolds: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.skinfold.findMany({
        where: eq(skinfold.userId, input),
        with: {
          bodyFat: true,
          leanMass: true,
          bodyWeight: true,
        },
      })
      return res
    }),
  getSkinfold: protectedProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.skinfold.findFirst({
        where: eq(skinfold.id, input),
        with: {
          bodyFat: true,
          leanMass: true,
          bodyWeight: true,
        },
      })
      return res
    }),
  deleteSkinfold: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(skinfold)
        .where(eq(skinfold.id, input))
      return res
    }),
  createSkinfold: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        chin: z.string(),
        cheek: z.string(),
        lowerAbdominal: z.string(),
        pectoral: z.string(),
        biceps: z.string(),
        triceps: z.string(),
        subscapular: z.string(),
        midAxillary: z.string(),
        suprailiac: z.string(),
        umbilical: z.string(),
        lowerBack: z.string(),
        quadriceps: z.string(),
        hamstrings: z.string(),
        medialCalf: z.string(),
        knee: z.string(),
        shoulder: z.string(),
        notes: z.string(),
        userId: z.string(),
        bodyWeight: z.string(),
        leanMass: z.string(),
        bodyFat: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(skinfold)
        .values({ ...input })
        .returning({ id: skinfold.id })

      const skinfoldId = res[0]?.id

      if (!skinfoldId) throw new Error('Skinfold not created')

      await ctx.db.insert(leanMass).values({
        date: input.date,
        userId: input.userId,
        leanMass: input.leanMass,
        skinfoldId: skinfoldId,
      })

      await ctx.db.insert(bodyFat).values({
        date: input.date,
        userId: input.userId,
        bodyFat: input.bodyFat,
        skinfoldId: skinfoldId,
      })

      await ctx.db.insert(bodyWeight).values({
        date: input.date,
        userId: input.userId,
        bodyWeight: input.bodyWeight,
        source: 'skinfold',
        skinfoldId: skinfoldId,
      })

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Create Skinfold',
        notes: JSON.stringify(input),
        objectId: res[0]?.id,
      })

      return { res }
    }),
})
