import { createLog } from '@/server/api/routers/admin-log'
import { protectedProcedure } from '~/server/api/trpc'
import { user, userSettings } from '~/server/db/schema/user'
import { hash } from 'bcryptjs'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'
import { dailyLog } from '~/server/db/schema/daily-logs'

import { isDuringPeriod } from '@/lib/period'

export const update = {
	updateChartRange: protectedProcedure
		.input(z.object({ range: z.number(), id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					defaultChartRange: input.range.toString(),
				})
				.where(eq(userSettings.id, input.id))
			return res
		}),
	updateIsPeriodOvualtion: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				isPeriodOvulaion: z.boolean(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isPeriodOvulaion: input.isPeriodOvulaion,
				})
				.where(eq(userSettings.id, input.id))

			return res
		}),
	updateOvulationStart: protectedProcedure
		.input(
			z.object({
				start: z.date().nullable(),
				id: z.number(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					ovulaionStartAt: input.start,
				})
				.where(eq(userSettings.id, input.id))
			return res
		}),

	updatePeriodStart: protectedProcedure
		.input(
			z.object({
				start: z.date().nullable(),
				id: z.number(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					periodStartAt: input.start,
				})
				.where(eq(userSettings.id, input.id))
			return res
		}),
	updatePeriodLength: protectedProcedure
		.input(z.object({ length: z.number(), id: z.number(), userId: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					periodLength: input.length,
				})
				.where(eq(userSettings.id, input.id))
			return res
		}),
	updatePeriodInterval: protectedProcedure
		.input(
			z.object({ interval: z.number(), id: z.number(), userId: z.string() }),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					periodInterval: input.interval,
				})
				.where(eq(userSettings.id, input.id))
			return res
		}),
	updateWater: protectedProcedure
		.input(z.object({ water: z.number(), id: z.number() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					defaultWater: input.water.toString(),
				})
				.where(eq(userSettings.id, input.id))
			return res
		}),
	updateIsPosing: protectedProcedure
		.input(z.object({ id: z.string(), isPosing: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isPosing: input.isPosing,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsBloodGlucose: protectedProcedure
		.input(z.object({ id: z.string(), isBloodGlucose: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isBloodGlucose: input.isBloodGlucose,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsSleep: protectedProcedure
		.input(z.object({ id: z.string(), isSleep: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isSleep: input.isSleep,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsSleepQuality: protectedProcedure
		.input(z.object({ id: z.string(), isSleepQuality: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isSleepQuality: input.isSleepQuality,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsNap: protectedProcedure
		.input(z.object({ id: z.string(), isNap: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isNap: input.isNap,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsWeightTraining: protectedProcedure
		.input(z.object({ id: z.string(), isWeightTraining: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isWeightTraining: input.isWeightTraining,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsHiit: protectedProcedure
		.input(z.object({ id: z.string(), isHiit: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isHiit: input.isHiit,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsMobility: protectedProcedure
		.input(z.object({ id: z.string(), isMobility: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isMobility: input.isMobility,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsLiss: protectedProcedure
		.input(z.object({ id: z.string(), isLiss: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isLiss: input.isLiss,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsNote: protectedProcedure
		.input(z.object({ id: z.string(), isNote: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isNotes: input.isNote,
				})
				.where(eq(userSettings.userId, input.id))

			return res
		}),
	updateIsSauna: protectedProcedure
		.input(z.object({ id: z.string(), isSauna: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isSauna: input.isSauna,
				})
				.where(eq(userSettings.userId, input.id))
			return res
		}),
	updateIsColdPlunge: protectedProcedure
		.input(z.object({ id: z.string(), isColdPlunge: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isColdPlunge: input.isColdPlunge,
				})
				.where(eq(userSettings.userId, input.id))
			return res
		}),
	updateIsSteps: protectedProcedure
		.input(z.object({ id: z.string(), isSteps: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(userSettings)
				.set({
					isSteps: input.isSteps,
				})
				.where(eq(userSettings.userId, input.id))
			return res
		}),
	updateTrainer: protectedProcedure
		.input(z.object({ id: z.string(), isTrainer: z.boolean() }))
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(user)
				.set({
					isTrainer: input.isTrainer,
				})
				.where(eq(user.id, input.id))

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'Update Trainer',
				notes: JSON.stringify(input),
			})

			return res
		}),
	updateFirstName: protectedProcedure
		.input(
			z.object({
				firstName: z.string(),
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(user)
				.set({
					firstName: input.firstName,
				})
				.where(eq(user.id, input.id))

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'Update First Name',
				notes: JSON.stringify(input),
			})
			return res
		}),
	updateLastName: protectedProcedure
		.input(
			z.object({
				lastName: z.string(),
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(user)
				.set({
					lastName: input.lastName,
				})
				.where(eq(user.id, input.id))

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'Update Last Name',
				notes: JSON.stringify(input),
			})
			return res
		}),
	updateEmail: protectedProcedure
		.input(
			z.object({
				email: z.string(),
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db
				.update(user)
				.set({
					email: input.email,
				})
				.where(eq(user.id, input.id))

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'Update Email',
				notes: JSON.stringify(input),
			})
			return res
		}),
	updatePassword: protectedProcedure
		.input(
			z.object({
				password: z.string(),
				id: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const hashedPassword = await hash(input.password, 10)
			const res = await ctx.db
				.update(user)
				.set({
					password: hashedPassword,
				})
				.where(eq(user.id, input.id))

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: null,
				task: 'Update Password',
				notes: JSON.stringify(input),
			})
			return res
		}),
}
