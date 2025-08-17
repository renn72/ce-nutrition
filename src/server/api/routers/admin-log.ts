import { db } from '@/server/db'
import { log } from '@/server/db/schema/log'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { z } from 'zod'

export const createLog = async ({
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

export const logRouter = createTRPCRouter({
	create: protectedProcedure
		.input(
			z.object({
				task: z.string(),
				notes: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: input.task,
				notes: input.notes,
				objectId: null,
			})

			return true
		}),
})
