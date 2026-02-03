import { auth } from '@/server/auth'
import { TRPCError } from '@trpc/server'
import { protectedProcedure, publicProcedure } from '~/server/api/trpc'
import { dailyLog } from '~/server/db/schema/daily-logs'
import { eq, sql } from 'drizzle-orm'
import { z } from 'zod'

export const get = {
	getName: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, input),
				columns: {
					id: true,
					firstName: true,
					lastName: true,
					name: true,
				},
			})
			return res
		}),
	getBasic: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, input),
				columns: {
					password: false,
				},
				with: {
					category: {
						with: {
							category: true,
						},
					},
					roles: true,
					trainers: {
						with: {
							trainer: true,
						},
					},
				},
			})
			return res
		}),
	getAllYour: protectedProcedure
		.input(z.string().optional())
		.query(async ({ ctx, input }) => {
			const userId = input && input !== '' ? input : ctx.session?.user.id

			const res = await ctx.db.query.user.findMany({
				columns: {
					id: true,
					name: true,
					isTrainer: true,
					email: true,
				},
				with: {
					category: {
						with: {
							category: true,
						},
					},
					roles: true,
					trainers: {
						with: {
							trainer: true,
						},
					},
				},
			})

			const latestLogsSq = ctx.db.$with('latest_logs').as(
				ctx.db
					.select({
						userId: dailyLog.userId,
						updatedAt: dailyLog.updatedAt,
						// Assign 1 to the most recent log for each userId
						rowNumber:
							sql`row_number() OVER (PARTITION BY ${dailyLog.userId} ORDER BY ${dailyLog.updatedAt} DESC)`.as(
								'rn',
							),
					})
					.from(dailyLog),
			)

			// 2. Select only the top-ranked rows
			const latestLogs = await ctx.db
				.with(latestLogsSq)
				.select()
				.from(latestLogsSq)
				.where(eq(latestLogsSq.rowNumber, 1))

			// console.log({ latestLogs })

			const users = res.filter((user) => {
				if (user.id === userId) return true
				if (ctx.session.user.isAdmin) return true
				if (user.trainers.find((trainer) => trainer.trainer.id === userId))
					return true
				return false
			})
			const logMap = new Map(
				latestLogs.map((log) => [log.userId, log.updatedAt]),
			)

			// 2. Attach the attribute to the filtered users
			const usersWithLogs = users.map((user) => ({
				...user,
				latestLog: logMap.get(user.id) ?? null, // Returns the updatedAt date or null if no log exists
			}))

			return usersWithLogs
		}),
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.query.user.findMany({
			columns: {
				password: false,
			},
			with: {
				roles: true,
				category: {
					with: {
						category: true,
					},
				},
				trainers: {
					with: {
						trainer: true,
					},
				},
			},
		})
		return res
	}),
	checkEmail: publicProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.email, input),
			})
			return res ? true : false
		}),
	getGaurenteed: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, input),
				columns: {
					password: false,
				},
				with: {
					settings: true,
					images: true,
					roles: true,
					supplementStacks: {
						with: {
							supplements: {
								with: {
									supplement: true,
								},
							},
						},
					},
					userPlans: {
						with: {
							userMeals: true,
							userRecipes: true,
							userIngredients: {
								with: {
									ingredient: true,
									alternateIngredient: true,
								},
							},
						},
					},
				},
			})
			if (!res) throw new TRPCError({ code: 'NOT_FOUND' })
			return res
		}),
	getCurrentUserRoles: protectedProcedure
		.input(z.object({ id: z.string() }).optional())
		.query(async ({ ctx, input }) => {
			let userId = ctx.session?.user.id

			if (input?.id && input.id !== '') userId = input.id

			if (!userId) return null

			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, userId),
				columns: {
					id: true,
					isCreator: true,
					isTrainer: true,
					firstName: true,
					lastName: true,
					name: true,
				},
				with: {
					settings: true,
					roles: true,
				},
			})
			return res
		}),
	getCurrentUser: protectedProcedure
		.input(z.object({ id: z.string() }).optional())
		.query(async ({ ctx, input }) => {
			let userId = ctx.session?.user.id

			if (input?.id && input.id !== '') userId = input.id

			if (!userId) return null

			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, userId),
				columns: {
					password: false,
				},
				with: {
					images: true,
					settings: true,
					roles: true,
					trainers: true,
					supplementStacks: {
						with: {
							supplements: {
								with: {
									supplement: true,
								},
							},
						},
					},
					userPlans: {
						with: {
							userMeals: true,
							userRecipes: true,
							userIngredients: {
								with: {
									ingredient: true,
									alternateIngredient: true,
								},
							},
						},
					},
				},
			})
			return res
		}),
	getByEmail: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.email, input),
				columns: {
					password: false,
				},
			})
			return res
		}),

	getInfoPage: protectedProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
			const res = await ctx.db.query.user.findFirst({
				where: (user, { eq }) => eq(user.id, input),
				columns: {
					id: true,
				},
				with: {
					settings: true,
					roles: true,
					images: true,
					trainers: true,
					supplementStacks: {
						with: {
							supplements: {
								with: {
									supplement: true,
								},
							},
						},
					},
				},
			})
			return res
		}),
	get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
		if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
		const res = await ctx.db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, input),
			columns: {
				password: false,
			},
			with: {
				settings: true,
				roles: true,
				images: true,
				trainers: true,
				supplementStacks: {
					with: {
						supplements: {
							with: {
								supplement: true,
							},
						},
					},
				},
				userPlans: {
					with: {
						userMeals: true,
						userRecipes: true,
						userIngredients: {
							with: {
								ingredient: true,
								alternateIngredient: true,
							},
						},
					},
				},
			},
		})
		return res
	}),
	isUser: publicProcedure.query(async () => {
		const session = await auth()
		if (!session?.user) return null
		if (!session?.user?.id) return null
		return session.user
	}),
	isCreator: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session?.user.id

		if (!userId) return null

		const res = await ctx.db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, userId),
			columns: {
				isCreator: true,
			},
		})

		return res
	}),
	isTrainer: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session?.user.id

		if (!userId) return null

		const res = await ctx.db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, userId),
			columns: {
				isTrainer: true,
			},
		})
		return res
	}),
	isRoot: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session?.user.id

		if (!userId) return null

		const res = await ctx.db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, userId),
			columns: {
				isRoot: true,
			},
		})
		return res
	}),
	isAdmin: protectedProcedure.query(async ({ ctx }) => {
		const userId = ctx.session?.user.id

		if (!userId) return null

		const res = await ctx.db.query.user.findFirst({
			where: (user, { eq }) => eq(user.id, userId),
			with: {
				roles: true,
			},
		})

		if (!res) return false
		const isAdmin = res?.roles?.find((role) => role.name === 'admin')
			? true
			: false
		return isAdmin
	}),
}
