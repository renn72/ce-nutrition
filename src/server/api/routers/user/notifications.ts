import { createLog } from '@/server/api/routers/admin-log'
import { protectedProcedure } from '~/server/api/trpc'
import { notificationToggle } from '~/server/db/schema/user'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const notifications = {
	getNotifications: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.query.notificationToggle.findMany({
				where: (toggle, { eq }) => eq(toggle.userId, input.userId),
			})
			return res
		}),
	toggleNotification: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				type: z.string(),
				interval: z.string(),
				sleep: z.string().optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db.query.notificationToggle.findFirst({
				where: (toggle, { eq, and }) =>
					and(eq(toggle.userId, input.userId), eq(toggle.type, input.type)),
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'toggle notification',
				notes: JSON.stringify(input),
				objectId: res?.id,
			})

			if (!res) {
				const toggle = await ctx.db.insert(notificationToggle).values({
					userId: input.userId,
					type: input.type,
					interval: input.interval,
					sleep: input.sleep,
				})
				return toggle
			} else {
				const toggle = await ctx.db
					.delete(notificationToggle)
					.where(eq(notificationToggle.id, res.id))
				return toggle
			}
		}),
	updateNotification: protectedProcedure
		.input(
			z.object({
				interval: z.string(),
				sleep: z.string().optional(),
				id: z.number(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db
				.update(notificationToggle)
				.set({
					interval: input.interval,
					sleep: input.sleep,
				})
				.where(eq(notificationToggle.id, input.id))
			return res
		}),
}
