import { getServerAuthSession } from '@/server/auth'
import { client, db } from '@/server/db'
import { ingredient } from '@/server/db/schema/ingredient'
import { TRPCError } from '@trpc/server'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  rootProtectedProcedure,
} from '~/server/api/trpc'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

export const ingredientRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.number().optional())
    .query(async ({ input, ctx }) => {
      if (input) {
        const res = await ctx.db.query.ingredient.findMany({
          limit: input,
          columns: {
            id: true,
            foodName: true,
            createdAt: true,
          },
          orderBy: [asc(ingredient.createdAt)],
        })
      }
      const res = await ctx.db.query.ingredient.findMany()
      return res
    }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.ingredient.findFirst({
        where: (ingredient, { eq }) => eq(ingredient.id, input.id),
      })
      return res
    }),
})
