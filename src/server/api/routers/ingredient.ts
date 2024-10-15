import { getServerAuthSession } from '@/server/auth'
import { TRPCError } from '@trpc/server'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  rootProtectedProcedure,
} from '~/server/api/trpc'
import { client, db } from '~/server/db'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

export const ingredient = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ page: z.number().optional() }))
    .query(async ({ input }) => {
      const { page = 1 } = input
      const [ingredients, total] = await db.ingredient.findAndCount({
        skip: (page - 1) * 10,
        take: 10,
      })
      return { ingredients, total }
    }),
})
