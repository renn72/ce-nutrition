import { settings } from '@/server/db/schema/settings'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const settingsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ input, ctx }) => {
    const res = await ctx.db.query.settings.findFirst()
    return res
  }),
  updateCalories: protectedProcedure
    .input(z.boolean())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.update(settings).set({
        isCaloriesWithFibre: input,
      })
      return res
    }),
})
