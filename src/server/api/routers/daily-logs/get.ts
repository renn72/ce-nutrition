import { dailyLog } from '@/server/db/schema/daily-logs'
import { TRPCError } from '@trpc/server'
import { protectedProcedure } from '~/server/api/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const get = {
	getAllUser: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
			const res = await ctx.db.query.dailyLog.findMany({
				where: eq(dailyLog.userId, input),
				with: {
					waterLogs: true,
					poopLogs: true,
					supplements: {
						with: {
							supplement: true,
						},
					},
					tags: {
						with: {
							tag: true,
						},
					},
					dailyMeals: {
						with: {
							recipe: true,
							ingredients: {
								with: {
									ingredient: true,
								},
							},
						},
					},
				},
				orderBy: (data, { desc }) => desc(data.createdAt),
			})
			return res
		}),
	getAllCurrentUser: protectedProcedure
		.input(z.object({ id: z.string() }).optional())
		.query(async ({ ctx, input }) => {
			let userId = ctx.session?.user.id
			if (input?.id && input.id !== '') userId = input.id
			if (!userId) return null

			const res = await ctx.db.query.dailyLog.findMany({
				where: eq(dailyLog.userId, userId),
				with: {
					poopLogs: true,
					waterLogs: true,
					supplements: {
						with: {
							supplement: true,
						},
					},
					tags: {
						with: {
							tag: true,
						},
					},
					dailyMeals: {
						with: {
							recipe: true,
							ingredients: {
								with: {
									ingredient: true,
								},
							},
						},
					},
				},
			})
			return res.sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
			)
		}),
	getSimple: protectedProcedure
		.input(z.number())
		.query(async ({ input, ctx }) => {
			const res = await ctx.db.query.dailyLog.findFirst({
				where: eq(dailyLog.id, input),
			})
			return res
		}),
	get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
		const res = await ctx.db.query.dailyLog.findFirst({
			where: eq(dailyLog.id, input),
			with: {
				poopLogs: true,
				waterLogs: true,
				supplements: {
					with: {
						supplement: true,
					},
				},
				tags: {
					with: {
						tag: true,
					},
				},
				dailyMeals: {
					with: {
						recipe: true,
						ingredients: {
							with: {
								ingredient: true,
							},
						},
					},
				},
			},
		})
		return res
	}),
}
