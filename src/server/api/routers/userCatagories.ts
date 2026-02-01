import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { userCategory, userToUserCategory } from '~/server/db/schema/user'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

export const userCatagoriesRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.query.userCategory.findMany()
		return res
	}),
	create: protectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.insert(userCategory).values({
				name: input,
			})
			return res
		}),
	update: protectedProcedure
		.input(z.object({ id: z.number(), name: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userCategory)
				.set({
					name: input.name,
				})
				.where(eq(userCategory.id, input.id))
			return res
		}),
	delete: protectedProcedure
		.input(z.number())
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.delete(userCategory)
				.where(eq(userCategory.id, input))
			return res
		}),
	addToUser: protectedProcedure
		.input(z.object({ userId: z.string(), categoryId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.insert(userToUserCategory).values({
				userId: input.userId,
				categoryId: input.categoryId,
			})
			return res
		}),
	removeFromUser: protectedProcedure
		.input(z.object({ userId: z.string(), categoryId: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.delete(userToUserCategory)
				.where(
					and(
						eq(userToUserCategory.userId, input.userId),
						eq(userToUserCategory.categoryId, input.categoryId),
					),
				)
			return res
		}),
})
