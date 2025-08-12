import {
	protectedProcedure,
} from '~/server/api/trpc'
import { log } from '~/server/db/schema/log'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const adminLogs = {
	getAdminLogs: protectedProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.query.log.findMany({
			limit: 4000,
			orderBy: (log, { desc }) => [desc(log.createdAt)],
		})
		return res
	}),
	deleteAdminLog: protectedProcedure
		.input(z.number())
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.delete(log).where(eq(log.id, input))
			return res
		}),
}
