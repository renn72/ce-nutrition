import { notification, pushSubscription } from '@/server/db/schema'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

import { sendPushNotification } from '@/server/api/utils/send-push'

import { createLog } from '@/server/api/routers/admin-log'

export const notificationRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				code: z.string(),
				title: z.string(),
				description: z.string().optional(),
				notes: z.string().optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db.insert(notification).values({
				userId: input.userId,
				code: input.code,
				title: input.title,
				description: input.description,
				notes: input.notes,
			})
      const sub = await ctx.db.query.pushSubscription.findFirst({
        where: eq(pushSubscription.userId, input.userId),
      })
      if (sub) {
        await sendPushNotification(
          JSON.parse(sub.subscription),
          input.title,
          input.description || '',
        )
      }
			return res
		}),
	get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
		const res = await ctx.db.query.notification.findFirst({
			where: eq(notification.id, input),
		})
		return res
	}),
	getAll: protectedProcedure.query(async ({ ctx }) => {
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
  getAllUserUnread: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const res = await ctx.db.query.notification.findMany({
        where: and(eq(notification.userId, input), eq(notification.isRead, false)),
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
			const res = await ctx.db
				.update(notification)
				.set({
					isRead: true,
				})
				.where(eq(notification.id, input))
			return res
		}),
  markAsNotified: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(notification)
        .set({
          isNotified: true,
        })
        .where(eq(notification.id, input))
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Mark Notification as Notified',
        notes: JSON.stringify(input),
        objectId: null,
      })
      return res
    }),
  markAllAsViewed: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(notification)
        .set({
          isRead: true,
          isViewed: true,
        })
        .where(eq(notification.userId, input))
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Mark All Notifications as Viewed',
        notes: JSON.stringify(input),
        objectId: null,
      })
      return res
    }),
	markAsViewed: protectedProcedure
		.input(z.number())
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db
				.update(notification)
				.set({
					isViewed: true,
          isRead: true,
				})
				.where(eq(notification.id, input))
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Mark Notification as Viewed',
        notes: JSON.stringify(input),
        objectId: null,
      })
			return res
		}),
})
