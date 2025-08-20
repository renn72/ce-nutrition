import { createLog } from '@/server/api/routers/admin-log'
import {
	protectedProcedure,
  rootProtectedProcedure,
} from '~/server/api/trpc'
import { role, user } from '~/server/db/schema/user'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const roles = {
	updateRoot: rootProtectedProcedure
		.input(z.object({ isRoot: z.boolean(), id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(user)
				.set({
					isRoot: input.isRoot,
				})
				.where(eq(user.id, input.id))

			return res
		}),
	updateRoleNotifyFrontImage: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.query.role.findFirst({
				where: (role, { eq, and }) =>
					and(
						eq(role.userId, input.userId),
						eq(role.name, 'notify-trainer-front-image'),
					),
			})

			if (res) {
				await ctx.db.delete(role).where(eq(role.id, res.id))
			} else {
				await ctx.db.insert(role).values({
					name: 'notify-trainer-front-image',
					userId: input.userId,
				})
			}

			return res
		}),
	updateRoleNotifyTrainerAllImages: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.query.role.findFirst({
				where: (role, { eq, and }) =>
					and(
						eq(role.userId, input.userId),
						eq(role.name, 'notify-trainer-all-images'),
					),
			})

			if (res) {
				await ctx.db.delete(role).where(eq(role.id, res.id))
			} else {
				await ctx.db.insert(role).values({
					name: 'notify-trainer-all-images',
					userId: input.userId,
				})
			}

			return res
		}),
	updateRoleBodyBuilderImages: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.query.role.findFirst({
				where: (role, { eq, and }) =>
					and(
						eq(role.userId, input.userId),
						eq(role.name, 'body-builder-images'),
					),
			})

			if (res) {
				await ctx.db.delete(role).where(eq(role.id, res.id))
			} else {
				await ctx.db.insert(role).values({
					name: 'body-builder-images',
					userId: input.userId,
				})
			}

			return res
		}),
  updateRoleSupplementDisclaimer: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.query.role.findFirst({
				where: (role, { eq, and }) =>
					and(
						eq(role.userId, input.userId),
						eq(role.name, 'supplement_disclaimer_v1'),
					),
			})

			if (res) {
				await ctx.db.delete(role).where(eq(role.id, res.id))
			} else {
				await ctx.db.insert(role).values({
					name: 'supplement_disclaimer_v1',
					userId: input.userId,
				})
			}

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'accept supplement disclaimer',
        notes: JSON.stringify(input),
      })

			return res
		}),
	updateRoleSupplements: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.query.role.findFirst({
				where: (role, { eq, and }) =>
					and(eq(role.userId, input.userId), eq(role.name, 'supplements')),
			})

			if (res) {
				await ctx.db.delete(role).where(eq(role.id, res.id))
			} else {
				await ctx.db.insert(role).values({
					userId: input.userId,
					name: 'supplements',
				})
			}

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'toggle user ability to log supplements',
				notes: JSON.stringify(input),
			})

			return res
		}),
	updateRoleCreateMeals: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.query.role.findFirst({
				where: (role, { eq, and }) =>
					and(eq(role.userId, input.userId), eq(role.name, 'create-meals')),
			})

			if (res) {
				await ctx.db.delete(role).where(eq(role.id, res.id))
			} else {
				await ctx.db.insert(role).values({
					userId: input.userId,
					name: 'create-meals',
				})
			}

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'toggle user ability to create meals',
				notes: JSON.stringify(input),
			})

			return res
		}),
	updateRoleAdmin: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.query.role.findFirst({
				where: (role, { eq, and }) =>
					and(eq(role.userId, input.userId), eq(role.name, 'admin')),
			})

			if (res) {
				await ctx.db.delete(role).where(eq(role.id, res.id))
			} else {
				await ctx.db.insert(role).values({
					userId: input.userId,
					name: 'admin',
				})
			}

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'toggle admin',
				notes: JSON.stringify(input),
			})

			return res
		}),
}
