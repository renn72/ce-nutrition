import { createLog } from '@/server/api/routers/admin-log'
import {
	dailyLog,
	dailySupplement,
	poopLog,
	waterLog,
} from '@/server/db/schema'
import { TRPCError } from '@trpc/server'
import { protectedProcedure } from '~/server/api/trpc'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'


export const updateDl = {
	update: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				date: z.string(),
				morningWeight: z.string().optional(),
				notes: z.string().optional(),
				sleep: z.string().optional(),
				sleepQuality: z.string().optional(),
				fastedBloodGlucose: z.string().optional(),
				nap: z.string().optional(),
				waistMeasurement: z.string().optional(),
				isHiit: z.boolean().optional(),
				isCardio: z.boolean().optional(),
				isLift: z.boolean().optional(),
				isLiss: z.boolean().optional(),
				image: z.string().optional(),
				userId: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const {
				id,
				date,
				morningWeight,
				notes,
				sleep,
				sleepQuality,
				fastedBloodGlucose,
				waistMeasurement,
				isHiit,
				isCardio,
				isLift,
				isLiss,
				image,
				userId,
				nap,
			} = input
			const res = await ctx.db
				.update(dailyLog)
				.set({
					date: date,
					morningWeight,
					notes,
					sleep,
					sleepQuality,
					fastedBloodGlucose,
					waistMeasurement,
					nap,
					isHiit,
					isCardio,
					isLift,
					isLiss,
					image,
					userId,
				})
				.where(eq(dailyLog.id, id))
			createLog({
				user: ctx.session.user.name,
				task: 'Update Daily Log',
				notes: JSON.stringify(input),
				userId: ctx.session.user.id,
				objectId: id,
			})

			return { res }
		}),
	updateIsStarred: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				isStarred: z.boolean(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Star Daily Log',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					isStarred: input.isStarred,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ isStarred: input.isStarred })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateSupplement: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				suppId: z.number(),
				amount: z.number(),
				unit: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Supplement',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				throw new TRPCError({ code: 'NOT_FOUND' })
			}

			const res = await ctx.db
				.insert(dailySupplement)
				.values({
					dailyLogId: log.id,
					supplementId: input.suppId,
					amount: input.amount.toString(),
					unit: input.unit,
				})
				.returning({ id: dailySupplement.id })

			return res
		}),
	updateNote: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				notes: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			console.log('-------------------------------------enter')
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			console.log('-------------------------------------log')
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Note',
				notes: JSON.stringify(input),
				objectId: null,
			})
			console.log('-------------------------------------log')

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					notes: input.notes,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ notes: input.notes })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updatePosing: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				posing: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Posing',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					posing: input.posing,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ posing: input.posing })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateSleep: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				sleep: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Sleep',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					sleep: input.sleep,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ sleep: input.sleep })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateSleepQuality: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				sleepQuality: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Sleep Qual',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					sleepQuality: input.sleepQuality,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ sleepQuality: input.sleepQuality })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateSteps: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				steps: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			if (!log) return

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Steps',
				notes: JSON.stringify(input),
				objectId: log?.id,
			})

			const res = await ctx.db
				.update(dailyLog)
				.set({ steps: input.steps })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateSauna: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				sauna: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			if (!log) return

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Sauna',
				notes: JSON.stringify(input),
				objectId: log?.id,
			})

			const res = await ctx.db
				.update(dailyLog)
				.set({ sauna: input.sauna })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateColdPlunge: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				coldPlunge: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			if (!log) return

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Cold Plunge',
				notes: JSON.stringify(input),
				objectId: log?.id,
			})

			const res = await ctx.db
				.update(dailyLog)
				.set({ coldPlunge: input.coldPlunge })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateNap: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				nap: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Nap',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					nap: input.nap,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ nap: input.nap })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateHiit: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				hiit: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update hiit',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					hiit: input.hiit,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ hiit: input.hiit })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateCardio: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				cardio: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Cardio',
				notes: JSON.stringify(input),
				objectId: log?.id,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					cardio: input.cardio,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ cardio: input.cardio })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateWeightTraining: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				weight: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Weight Training',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					weight: input.weight,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ weight: input.weight })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateLiss: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				liss: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Liss',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					liss: input.liss,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ liss: input.liss })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateWaistMeasurement: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				waistMeasurement: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Girth',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					waistMeasurement: input.waistMeasurement,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ waistMeasurement: input.waistMeasurement })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateWeight: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				morningWeight: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Update Weight',
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					morningWeight: input.morningWeight,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ morningWeight: input.morningWeight })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateBloodGlucose: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				fastedBloodGlucose: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: `Update Blood Glucose`,
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				const res = await ctx.db.insert(dailyLog).values({
					date: input.date,
					fastedBloodGlucose: input.fastedBloodGlucose,
					userId: ctx.session.user.id,
				})
				return res
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ fastedBloodGlucose: input.fastedBloodGlucose })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return res
		}),
	updateImage: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				image: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: `Update Image' + ${log ? '' : ' and Create Log'}`,
				notes: JSON.stringify(input),
				objectId: null,
			})

			if (!log) {
				throw new Error('Log not found')
			}

			const res = await ctx.db
				.update(dailyLog)
				.set({ image: input.image })
				.where(
					and(
						eq(dailyLog.date, input.date),
						eq(dailyLog.userId, ctx.session.user.id),
					),
				)

			return true
		}),
	addWaterLog: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				amount: z.number(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			let isCreateLog = false

			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			let logId = log?.id as number | undefined

			if (!logId) {
				const res = await ctx.db
					.insert(dailyLog)
					.values({
						date: input.date,
						userId: ctx.session.user.id,
					})
					.returning({ id: dailyLog.id })
				logId = res[0]?.id
				isCreateLog = true
			}
			if (!logId) throw new Error('Log not found')

			const water = await ctx.db
				.insert(waterLog)
				.values({
					amount: input.amount.toString(),
					dailyLogId: logId,
				})
				.returning({ id: waterLog.id })

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: water[0]?.id,
				task: 'Add Water ' + input.amount.toString() + 'ml',
				notes: isCreateLog ? 'Created new log' : '',
			})

			return water
		}),
	deleteWaterLog: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db.delete(waterLog).where(eq(waterLog.id, input.id))
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: input.id,
				task: 'Deleted water',
				notes: '',
			})
			return res
		}),
	addPoopLog: protectedProcedure
		.input(
			z.object({
				date: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			let isCreateLog = false
			console.log('input', input)

			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, ctx.session.user.id),
				),
			})

			// @ts-ignore
			let logId = log?.id as number | undefined
			console.log('logId', logId)
			console.log('logId', !logId)

			if (!logId) {
				console.log('create')
				const res = await ctx.db
					.insert(dailyLog)
					.values({
						date: input.date,
						userId: ctx.session.user.id,
					})
					.returning({ id: dailyLog.id })
				logId = res[0]?.id
				isCreateLog = true
			}
			if (!logId) throw new Error('Log not found')

			const poop = await ctx.db
				.insert(poopLog)
				.values({
					dailyLogId: logId,
				})
				.returning({ id: poopLog.id })

			console.log('poop', poop)

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: poop[0]?.id,
				task: 'Add poo ',
				notes: isCreateLog ? 'Created new log' : '',
			})

			return poop
		}),
	deletePoopLog: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db.delete(poopLog).where(eq(poopLog.id, input.id))
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				objectId: input.id,
				task: 'Deleted Poo',
				notes: '',
			})
			return res
		}),
}
