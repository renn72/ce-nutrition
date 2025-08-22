import { auth } from '@/server/auth'
import { TRPCError } from '@trpc/server'
import { protectedProcedure, publicProcedure } from '~/server/api/trpc'
import { z } from 'zod'

export const get = {
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
		.query(async ({ ctx }) => {
			const userId = ctx.session?.user.id

			const res = await ctx.db.query.user.findMany({
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

			const users = res.filter((user) => {
				if (user.id === userId) return true
				if (ctx.session.user.isAdmin) return true
				if (user.trainers.find((trainer) => trainer.trainer.id === userId))
					return true
				return false
			})

			return users
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
