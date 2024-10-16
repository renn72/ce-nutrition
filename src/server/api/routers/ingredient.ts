import { createReadStream, readFileSync } from 'fs'

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
import { parse } from 'csv-parse/sync'
import { eq } from 'drizzle-orm'
// @ts-ignore
import Papa from 'papaparse'
import { z } from 'zod'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

export const ingredientRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.ingredient.findMany()
    return res
  }),
})
