import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { db } from '~/server/db'
import { log } from '~/server/db/schema/log'
import { userToTrainer } from '~/server/db/schema/user'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

const createLog = async ({
	user,
	task,
	notes,
	userId,
	objectId,
}: {
	user: string
	task: string
	notes: string
	userId: string
	objectId: number | null | undefined
}) => {
	await db.insert(log).values({
		task: task,
		notes: notes,
		user: user,
		userId: userId,
		objectId: objectId,
	})
}

export const trainerRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.query.user.findMany({
			where: (user, { eq }) => eq(user.isTrainer, true),
			columns: {
				id: true,
				name: true,
			},
		})
		return res
	}),
	add: protectedProcedure
		.input(z.object({ userId: z.string(), trainerId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.insert(userToTrainer).values({
				userId: input.userId,
				trainerId: input.trainerId,
			})

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'Add trainer to client',
        notes: JSON.stringify(input),
      })

			return res
		}),
	delete: protectedProcedure
		.input(z.object({ userId: z.string(), trainerId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.delete(userToTrainer)
				.where(
					and(
						eq(userToTrainer.userId, input.userId),
						eq(userToTrainer.trainerId, input.trainerId),
					),
				)
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'Delete trainer from client',
        notes: JSON.stringify(input),
      })

			return res
		}),
})
