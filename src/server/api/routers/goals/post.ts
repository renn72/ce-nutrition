import { protectedProcedure } from '~/server/api/trpc'
import { goals } from '~/server/db/schema/user'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const post = {
	create: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				title: z.string(),
				description: z.string(),
				state: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const trainerId = ctx.session?.user.id
			const res = await ctx.db
				.insert(goals)
				.values({
					userId: input.userId,
					title: input.title,
					description: input.description,
					state: input.state,
					trainerId: trainerId,
				})
				.returning({ id: goals.id })
			return res
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				title: z.string(),
				description: z.string(),
				state: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(goals)
				.set({
					title: input.title,
					description: input.description,
					state: input.state,
				})
				.where(eq(goals.id, input.id))
			return res
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.delete(goals).where(eq(goals.id, input.id))
			return res
		}),
}
