import { protectedProcedure } from '~/server/api/trpc'
import { z } from 'zod'

export const get = {
	getUser: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.query.goals.findMany({
				where: (goal, { eq }) => eq(goal.userId, input.userId),
			})
			return res
		}),
	get: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.query.goals.findFirst({
				where: (goal, { eq }) => eq(goal.id, input.id),
			})
			return res
		}),
}

