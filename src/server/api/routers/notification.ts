import { notification } from '@/server/db/schema/notification'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const notificationRouter = createTRPCRouter({
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findFirst({
      where: eq(notification.id, input),
    })
    return res
  }),
  getAll: protectedProcedure.query(async ({ input, ctx }) => {
    const res = await ctx.db.query.notification.findMany({
      where: eq(notification.isRead, false),
      orderBy: (data, { desc }) => desc(data.createdAt),
    })
    return res
  }),
  getAllUser: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.notification.findMany({
        where: eq(notification.userId, input),
        orderBy: (data, { desc }) => desc(data.createdAt),
      })
      return res
    }),
  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(notification)
        .where(eq(notification.id, input))
      return res
    }),
  markAsRead: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.update(notification).set({
        isRead: true,
      }).where(eq(notification.id, input))
      return res
    }),
  markAsViewed: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.update(notification).set({
        isViewed: true,
      }).where(eq(notification.id, input))
      return res
    }),
})
