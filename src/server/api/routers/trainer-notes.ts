import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { trainerNotes } from '~/server/db/schema/user'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const trainerNotesRouter = createTRPCRouter({
	getAllUser: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.query.trainerNotes.findMany({
				where: (note, { eq }) => eq(note.userId, input.userId),
				with: {
					trainer: true,
				},
			})
			return res
		}),
	get: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.query.trainerNotes.findFirst({
				where: (note, { eq }) => eq(note.id, input.id),
				with: {
					trainer: true,
				},
			})
			return res
		}),
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
				.insert(trainerNotes)
				.values({
					userId: input.userId,
					title: input.title,
					description: input.description,
					state: 'created',
					trainerId: trainerId,
				})
				.returning({ id: trainerNotes.id })
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
				.update(trainerNotes)
				.set({
					title: input.title,
					description: input.description,
					state: input.state,
				})
				.where(eq(trainerNotes.id, input.id))
			return res
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.delete(trainerNotes)
				.where(eq(trainerNotes.id, input.id))
			return res
		}),
})
