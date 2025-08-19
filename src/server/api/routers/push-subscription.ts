import { pushSubscription } from '@/server/db/schema'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const pushSubscriptionRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				subscription: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const sub = await ctx.db.query.pushSubscription.findFirst({
				where: eq(pushSubscription.userId, input.userId),
			})

			if (sub) {
				const res = await ctx.db
					.update(pushSubscription)
					.set({
						subscription: input.subscription,
					})
					.where(eq(pushSubscription.id, sub.id))
				return res
			}

			const res = await ctx.db
				.insert(pushSubscription)
				.values({
					...input,
				})
				.returning({ id: pushSubscription.id })
			return res

		}),
	get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		const res = await ctx.db.query.pushSubscription.findFirst({
			where: eq(pushSubscription.userId, input),
		})
		return res
	}),
})
