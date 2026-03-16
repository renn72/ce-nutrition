import { plan, planToMeal } from '@/server/db/schema/plan'
import {
	userIngredient,
	userMeal,
	userPlan,
	userRecipe,
} from '@/server/db/schema/user-plan'
import { notification } from '@/server/db/schema/notification'
import {
	createTRPCContext,
	createTRPCRouter,
	protectedProcedure,
	rootProtectedProcedure,
} from '~/server/api/trpc'
import { eq, and, inArray, isNotNull } from 'drizzle-orm'
import { z } from 'zod'

import { createLog } from '@/server/api/routers/admin-log'

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

const userPlanIngredientInputSchema = z.object({
	ingredientId: z.number(),
	ingredientIndex: z.number(),
	recipeIndex: z.number(),
	mealIndex: z.number(),
	alternateId: z.number().nullable(),
	name: z.string(),
	serve: z.string(),
	serveUnit: z.string(),
	note: z.string(),
})

const userPlanRecipeInputSchema = z.object({
	recipeIndex: z.number(),
	mealIndex: z.number(),
	name: z.string(),
	note: z.string(),
	description: z.string(),
	index: z.number(),
	ingredients: z.array(userPlanIngredientInputSchema),
})

const userPlanMealInputSchema = z.object({
	mealIndex: z.number(),
	mealTitle: z.string(),
	calories: z.string(),
	protein: z.string().optional(),
	targetProtein: z.string(),
	targetCalories: z.string(),
	vegeCalories: z.string(),
	veges: z.string(),
	vegeNotes: z.string(),
	note: z.string(),
	recipes: z.array(userPlanRecipeInputSchema),
})

const userPlanMutationInputSchema = z.object({
	name: z.string().min(1),
	createdAt: z.date(),
	description: z.string(),
	image: z.string(),
	notes: z.string(),
	userId: z.string(),
	meals: z.array(userPlanMealInputSchema),
})

type UserPlanMutationInput = z.infer<typeof userPlanMutationInputSchema>

const getUserPlanRecipesAndIngredients = (
	meals: UserPlanMutationInput['meals'],
) => {
	const recipes = meals.flatMap((meal) => meal.recipes)
	const ingredients = recipes.flatMap((recipe) => recipe.ingredients)

	return { recipes, ingredients }
}

const normalizeAlternateId = (alternateId: number | null) => {
	if (alternateId === 0 || alternateId === null) {
		return null
	}

	return Number(alternateId)
}

const createUserPlanNotification = async ({
	ctx,
	userId,
}: {
	ctx: TRPCContext
	userId: string
}) => {
	const notif = await ctx.db.query.notification.findMany({
		where: and(
			eq(notification.userId, userId),
			eq(notification.code, 'user-plan_update'),
			eq(notification.isViewed, false),
		),
	})

	if (notif.length === 0) {
		await ctx.db.insert(notification).values({
			userId,
			code: 'user-plan_update',
			title: 'Your user meal plan has been updated',
			description: 'You have a new user meal plan update',
			isViewed: false,
			isRead: false,
		})
	}
}

export const userPlanRouter = createTRPCRouter({
	delete: protectedProcedure
		.input(z.number())
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db.delete(userPlan).where(eq(userPlan.id, input))
			return res
		}),
	finishPlan: protectedProcedure
		.input(z.number())
		.mutation(async ({ input, ctx }) => {
			try {
				const res = await ctx.db
					.update(userPlan)
					.set({
						isActive: false,
						finishedAt: new Date(),
					})
					.where(eq(userPlan.id, input))
				console.log({ finishPlan: res })
				return res
			} catch (e) {
				console.log({ finishPlanError: e })
				return e
			}
		}),
	activePlan: protectedProcedure
		.input(z.number())
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db
				.update(userPlan)
				.set({
					isActive: true,
					finishedAt: null,
				})
				.where(eq(userPlan.id, input))
			return res
		}),
	getMeal: protectedProcedure
		.input(z.number())
		.query(async ({ input, ctx }) => {
			const res = await ctx.db.query.userMeal.findFirst({
				where: eq(userMeal.id, input),
			})
			return res
		}),
	getRecipe: protectedProcedure
		.input(z.number())
		.query(async ({ input, ctx }) => {
			const res = await ctx.db.query.userRecipe.findFirst({
				where: eq(userRecipe.id, input),
			})
			return res
		}),
	getIngredient: protectedProcedure
		.input(z.number())
		.query(async ({ input, ctx }) => {
			const res = await ctx.db.query.userIngredient.findFirst({
				where: eq(userIngredient.id, input),
				with: {
					ingredient: true,
					alternateIngredient: true,
				},
			})
			return res
		}),
	getUserActivePlan: protectedProcedure
		.input(z.string())
		.query(async ({ input, ctx }) => {
			const res = await ctx.db.query.userPlan.findMany({
				where: and(eq(userPlan.userId, input), eq(userPlan.isActive, true)),
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
			})
			return res
		}),
	get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
		const res = await ctx.db.query.userPlan.findFirst({
			where: eq(userPlan.id, input),
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
		})
		return res
	}),
	create: protectedProcedure
		.input(userPlanMutationInputSchema)
		.mutation(async ({ input, ctx }) => {
			const creatorId = ctx.session.user.id
			const { meals, ...data } = input
			const { recipes, ingredients } = getUserPlanRecipesAndIngredients(meals)

			const res = await ctx.db
				.insert(userPlan)
				.values({
					...data,
					isActive: true,
					numberOfMeals: meals.length,
					creatorId: creatorId,
				})
				.returning({ id: plan.id })

			const resId = res?.[0]?.id
			if (!resId) return res

			const batchRes = await ctx.db.batch([
				ctx.db
					.insert(userMeal)
					.values(
						meals.map((meal) => ({
							...meal,
							userPlanId: resId,
						})),
					)
					.returning({ id: planToMeal.id }),
				ctx.db
					.insert(userRecipe)
					.values(
						recipes.map((recipe) => ({
							...recipe,
							userPlanId: resId,
						})),
					)
					.returning({ id: userRecipe.id }),
				ctx.db
					.insert(userIngredient)
					.values(
						ingredients.map((ingredient) => ({
							...ingredient,
							alternateId: normalizeAlternateId(ingredient.alternateId),
							userPlanId: resId,
						})),
					)
					.returning({ id: userIngredient.id }),
			])
			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'User Create Plan',
				notes: JSON.stringify(input),
				objectId: resId,
			})
			await createUserPlanNotification({ ctx, userId: input.userId })
			console.log({ res, batchRes })
			return { res, batchRes }
		}),
	update: protectedProcedure
		.input(
			userPlanMutationInputSchema.extend({
				id: z.number(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { id, meals, ...data } = input
			const { recipes, ingredients } = getUserPlanRecipesAndIngredients(meals)

			await ctx.db.transaction(async (tx) => {
				await tx
					.update(userPlan)
					.set({
						...data,
						numberOfMeals: meals.length,
					})
					.where(eq(userPlan.id, id))

				await tx.delete(userIngredient).where(eq(userIngredient.userPlanId, id))
				await tx.delete(userRecipe).where(eq(userRecipe.userPlanId, id))
				await tx.delete(userMeal).where(eq(userMeal.userPlanId, id))

				if (meals.length > 0) {
					await tx.insert(userMeal).values(
						meals.map((meal) => ({
							...meal,
							userPlanId: id,
						})),
					)
				}

				if (recipes.length > 0) {
					await tx.insert(userRecipe).values(
						recipes.map((recipe) => ({
							...recipe,
							userPlanId: id,
						})),
					)
				}

				if (ingredients.length > 0) {
					await tx.insert(userIngredient).values(
						ingredients.map((ingredient) => ({
							...ingredient,
							alternateId: normalizeAlternateId(ingredient.alternateId),
							userPlanId: id,
						})),
					)
				}
			})

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'User Update Plan',
				notes: JSON.stringify(input),
				objectId: id,
			})
			await createUserPlanNotification({ ctx, userId: input.userId })

			return { id }
		}),
	deleteShortFinishedPlans: rootProtectedProcedure.mutation(async ({ ctx }) => {
		const twelveHoursMs = 12 * 60 * 60 * 1000

		const finishedPlans = await ctx.db
			.select({
				id: userPlan.id,
				createdAt: userPlan.createdAt,
				finishedAt: userPlan.finishedAt,
			})
			.from(userPlan)
			.where(isNotNull(userPlan.finishedAt))

		const planIdsToDelete = finishedPlans
			.filter((plan) => {
				if (!plan.createdAt || !plan.finishedAt) return false

				const durationMs = plan.finishedAt.getTime() - plan.createdAt.getTime()

				return durationMs >= 0 && durationMs < twelveHoursMs
			})
			.map((plan) => plan.id)

		if (planIdsToDelete.length === 0) {
			return {
				deletedCount: 0,
				deletedPlanIds: [],
			}
		}

		await ctx.db.delete(userPlan).where(inArray(userPlan.id, planIdsToDelete))

		createLog({
			user: ctx.session?.user.name ?? '',
			userId: ctx.session?.user.id ?? '',
			task: 'Delete Short Finished User Plans',
			notes: JSON.stringify({
				deletedPlanIds: planIdsToDelete,
				hoursThreshold: 12,
			}),
			objectId: null,
		})

		return {
			deletedCount: planIdsToDelete.length,
			deletedPlanIds: planIdsToDelete,
		}
	}),
})
