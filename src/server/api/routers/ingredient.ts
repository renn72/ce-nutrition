import { createIngredientSchema } from '@/server/api/schema/ingredient'
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
import { asc, desc, eq } from 'drizzle-orm'
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
          orderBy: [desc(ingredient.createdAt)],
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
  create: protectedProcedure
    .input(createIngredientSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      console.log({ ...input, userId })
      return true
      const res = await ctx.db.insert(ingredient).values({
        ...input,
        userId,
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(ingredient)
        .where(eq(ingredient.id, input.id))
      return res
    }),
})
