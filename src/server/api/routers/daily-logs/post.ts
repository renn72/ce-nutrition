import { createLog } from '@/server/api/routers/admin-log'
import { db } from '@/server/db'
import { dailyLog, dailyMeal } from '@/server/db/schema/daily-logs'
import {
	userIngredient,
	userPlan,
	userRecipe,
} from '@/server/db/schema/user-plan'
import { userSettings } from '@/server/db/schema/user'
import { TRPCError } from '@trpc/server'
import { protectedProcedure } from '~/server/api/trpc'
import { and, eq } from 'drizzle-orm'
import { z } from 'zod'

import { isDuringPeriod } from '@/lib/period'

export const post = {
	create: protectedProcedure
		.input(
			z.object({
				date: z.string(),
				morningWeight: z.string().optional(),
				fastedBloodGlucose: z.string().optional(),
				notes: z.string().optional(),
				sleep: z.string().optional(),
				sleepQuality: z.string().optional(),
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
			const log = await ctx.db.query.dailyLog.findFirst({
				where: and(
					eq(dailyLog.date, input.date),
					eq(dailyLog.userId, input.userId),
				),
			})

			if (log) throw new TRPCError({ code: 'CONFLICT' })

			const userSetting = await ctx.db.query.userSettings.findFirst({
				where: eq(userSettings.userId, input.userId),
			})

			console.log(userSetting)

			const isPeriodEnabled = userSetting?.periodStartAt ? true : false
			const start = userSetting?.periodStartAt ?? new Date()
			const interval = userSetting?.periodInterval ?? 28
			const duration = userSetting?.periodLength ?? 5
			const today = new Date(input.date ?? Date.now())

			const isPeriod = isPeriodEnabled
				? isDuringPeriod(today, start, interval, duration)
				: false

			console.log('-------------------')

			console.log({
				isPeriodEnabled,
				interval,
				duration,
				isPeriod,
			})

			const res = await ctx.db
				.insert(dailyLog)
				.values({
					...input,
					isPeriod: isPeriod,
					date: input.date,
				})
				.returning({ id: dailyLog.id })

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Create Daily Log',
				notes: JSON.stringify(input),
				objectId: res[0]?.id,
			})

			return { res }
		}),
	deleteMeal: protectedProcedure
		.input(
			z.object({
				mealIndex: z.number(),
				logId: z.number(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			await ctx.db
				.delete(userIngredient)
				.where(
					and(
						eq(userIngredient.dailyLogId, input.logId),
						eq(userIngredient.mealIndex, input.mealIndex),
					),
				)

			await ctx.db
				.delete(userRecipe)
				.where(
					and(
						eq(userRecipe.dailyLogId, input.logId),
						eq(userRecipe.mealIndex, input.mealIndex),
					),
				)

			await ctx.db
				.delete(dailyMeal)
				.where(
					and(
						eq(dailyMeal.dailyLogId, input.logId),
						eq(dailyMeal.mealIndex, input.mealIndex),
					),
				)
			return true
		}),
	copyWeek: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				logId: z.number(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const referenceLog = await ctx.db
				.select()
				.from(dailyLog)
				.where(eq(dailyLog.id, input.logId))
				.then((res) => res[0])
			if (!referenceLog || referenceLog.date === null) {
				throw new Error('Reference log not found.')
			}
			const startDate = new Date(referenceLog.date)
			console.log('startDate1', startDate.toDateString())
			const logs = await createBlankLogs(input.userId, startDate)
			await Promise.all(
				logs.map(async (log) => {
					if (log) {
						const meals = await ctx.db.query.dailyMeal.findMany({
							where: eq(dailyMeal.dailyLogId, input.logId),
						})
						meals.forEach(async (meal) => {
							if (meal) {
								const recipes = await db
									.select()
									.from(userRecipe)
									.where(eq(userRecipe.dailyMealId, meal.id))
								const ingredients = await db
									.select()
									.from(userIngredient)
									.where(eq(userIngredient.dailyMealId, meal.id))

								const newMeal = await db
									.insert(dailyMeal)
									.values({
										...meal,
										id: undefined,
										dailyLogId: log.id,
									})
									.returning({ id: dailyMeal.id })

								await Promise.all(
									recipes.map(async (recipe) => {
										await db.insert(userRecipe).values({
											...recipe,
											id: undefined,
											dailyMealId: newMeal[0]?.id,
										})
									}),
								)
								await Promise.all(
									ingredients.map(async (ingredient) => {
										await db.insert(userIngredient).values({
											...ingredient,
											id: undefined,
											dailyMealId: newMeal[0]?.id,
										})
									}),
								)
							}
						})
					}
				}),
			)
			return true
		}),
	clearDay: protectedProcedure
		.input(
			z.object({
				logId: z.number(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const dailyMeals = await ctx.db
				.delete(dailyMeal)
				.where(eq(dailyMeal.dailyLogId, input.logId))

			return dailyMeals
		}),
	addUserCreatedRecipe: protectedProcedure
		.input(
			z.object({
				mealIndex: z.number(),
				logId: z.number(),
				recipe: z.object({
					name: z.string(),
					description: z.string(),
					image: z.string(),
					notes: z.string(),
					recipeCategory: z.string(),
					calories: z.number(),
					ingredients: z.array(
						z.object({
							ingredientId: z.number(),
							alternateId: z.string(),
							note: z.string(),
							serveSize: z.string(),
							serveUnit: z.string(),
							index: z.number(),
							isAlternate: z.boolean().optional(),
						}),
					),
				}),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			console.log('input', input)

			await ctx.db.batch([
				ctx.db
					.delete(userIngredient)
					.where(
						and(
							eq(userIngredient.dailyLogId, input.logId ?? -1),
							eq(userIngredient.mealIndex, input.mealIndex ?? -1),
						),
					),
				ctx.db
					.delete(userRecipe)
					.where(
						and(
							eq(userRecipe.dailyLogId, input.logId ?? -1),
							eq(userRecipe.mealIndex, input.mealIndex ?? -1),
						),
					),
				ctx.db
					.delete(dailyMeal)
					.where(
						and(
							eq(dailyMeal.dailyLogId, input.logId ?? -1),
							eq(dailyMeal.mealIndex, input.mealIndex ?? -1),
						),
					),
			])

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Add Meal',
				notes: input.recipe.name ?? '',
				objectId: input.logId,
			})

			const meal = await ctx.db
				.insert(dailyMeal)
				.values({
					dailyLogId: input.logId,
					mealIndex: input.mealIndex,
					vegeCalories: '',
					veges: '',
				})
				.returning({ id: dailyMeal.id })
			const dailyMealId = meal?.[0]?.id
			console.log('create 1')
			if (!dailyMealId) return

			const recipeInsert = await ctx.db
				.insert(userRecipe)
				.values({
					name: input.recipe.name,
					mealIndex: input.mealIndex,
					recipeIndex: 0,
					dailyMealId: dailyMealId,
					dailyLogId: input.logId,
					isLog: true,
					isUserCreated: true,
				})
				.returning({ id: userRecipe.id })

			const ingredientInsert = await ctx.db
				.insert(userIngredient)
				.values(
					input.recipe.ingredients.map((ingredient) => {
						return {
							ingredientId: ingredient.ingredientId,
							recipeId: recipeInsert?.[0]?.id,
							mealIndex: input.mealIndex,
							recipeIndex: 0,
							alternateId: ingredient.alternateId
								? Number(ingredient.alternateId)
								: null,
							dailyMealId: dailyMealId,
							dailyLogId: input.logId,
							isLog: true,
							serve: ingredient.serveSize,
							serveUnit: ingredient.serveUnit,
							isUserCreated: true,
						}
					}),
				)
				.returning({ id: userIngredient.id })

			return { meal, recipe: recipeInsert, ingredient: ingredientInsert }
		}),
	addMeal: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				planId: z.number(),
				mealIndex: z.number().nullable(),
				recipeIndex: z.number().nullable().optional(),
				recipeId: z.number().nullable().optional(),
				date: z.date(),
				logId: z.number().nullable(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			console.log('input', input)

			const plan = await ctx.db.query.userPlan.findFirst({
				where: eq(userPlan.id, input.planId),
				with: {
					userMeals: true,
					userRecipes: true,
					userIngredients: true,
				},
			})

			if (!plan) return

			// const meal = plan.userMeals.find(
			//   (meal) => meal.mealIndex == input.mealIndex,
			// )
			// if (!meal) return

			const recipe = plan.userRecipes.find(
				(recipe) => recipe.id === input.recipeId,
			)
			if (!recipe) return

			const ingredients = plan.userIngredients.filter(
				(ingredient) =>
					ingredient.recipeIndex === recipe.recipeIndex &&
					ingredient.mealIndex === recipe.mealIndex,
			)
			if (!ingredients) return

			if (input.logId === null || input.logId === undefined) {
				const log = await ctx.db
					.insert(dailyLog)
					.values({
						date: input.date.toDateString(),
						morningWeight: '',
						notes: input.date.toDateString(),
						sleep: '',
						sleepQuality: '',
						waistMeasurement: '',
						isHiit: false,
						isCardio: false,
						isLift: false,
						isLiss: false,
						image: '',
						userId: input.userId,
					})
					.returning({ id: dailyLog.id })

				const logId = log?.[0]?.id
				if (!logId) throw new Error('Log not found')

				const meal = await ctx.db
					.insert(dailyMeal)
					.values({
						dailyLogId: logId,
						mealIndex: input.mealIndex,
						recipeId: input.recipeId,
						vegeCalories: '',
						veges: '',
					})
					.returning({ id: dailyMeal.id })

				const dailyMealId = meal?.[0]?.id
				console.log('dailyMealId', dailyMealId)
				if (!dailyMealId) throw new Error('Daily meal not found')

				const { id, createdAt, updatedAt, userPlanId, ...recipeInput } = recipe
				const recipeInsert = await ctx.db
					.insert(userRecipe)
					.values({
						...recipeInput,
						mealIndex: input.mealIndex,
						dailyMealId: dailyMealId,
						dailyLogId: logId,
						parentId: input.recipeId,
						isLog: true,
					})
					.returning({ id: userRecipe.id })

				const ingredientInsert = await ctx.db
					.insert(userIngredient)
					.values(
						ingredients.map((ingredient) => {
							return {
								id: undefined,
								ingredientId: ingredient.ingredientId,
								recipeId: recipeInsert?.[0]?.id,
								mealIndex: input.mealIndex,
								recipeIndex: input.recipeIndex,
								alternateId: ingredient.alternateId,
								dailyMealId: dailyMealId,
								dailyLogId: logId,
								isLog: true,
								serve: ingredient.serve,
								serveUnit: ingredient.serveUnit,
							}
						}),
					)
					.returning({ id: userIngredient.id })
				return { meal }
			}
			await ctx.db.batch([
				ctx.db
					.delete(userIngredient)
					.where(
						and(
							eq(userIngredient.dailyLogId, input.logId ?? -1),
							eq(userIngredient.mealIndex, input.mealIndex ?? -1),
						),
					),
				ctx.db
					.delete(userRecipe)
					.where(
						and(
							eq(userRecipe.dailyLogId, input.logId ?? -1),
							eq(userRecipe.mealIndex, input.mealIndex ?? -1),
						),
					),
				ctx.db
					.delete(dailyMeal)
					.where(
						and(
							eq(dailyMeal.dailyLogId, input.logId ?? -1),
							eq(dailyMeal.mealIndex, input.mealIndex ?? -1),
						),
					),
			])

			createLog({
				user: ctx.session.user.name,
				userId: ctx.session.user.id,
				task: 'Add Meal',
				notes: recipe.name ?? '',
				objectId: input.logId,
			})

			const meal = await ctx.db
				.insert(dailyMeal)
				.values({
					dailyLogId: input.logId,
					mealIndex: input.mealIndex,
					recipeId: input.recipeId,
					vegeCalories: '',
					veges: '',
				})
				.returning({ id: dailyMeal.id })
			const dailyMealId = meal?.[0]?.id
			console.log('create 1')
			if (!dailyMealId) return

			const { id, createdAt, updatedAt, userPlanId, ...recipeInput } = recipe
			const recipeInsert = await ctx.db
				.insert(userRecipe)
				.values({
					...recipeInput,
					mealIndex: input.mealIndex,
					recipeIndex: input.recipeIndex,
					dailyMealId: dailyMealId,
					dailyLogId: input.logId,
					parentId: input.recipeId,
					isLog: true,
				})
				.returning({ id: userRecipe.id })

			const ingredientInsert = await ctx.db
				.insert(userIngredient)
				.values(
					ingredients.map((ingredient) => {
						return {
							ingredientId: ingredient.ingredientId,
							recipeId: recipeInsert?.[0]?.id,
							mealIndex: input.mealIndex,
							recipeIndex: input.recipeIndex,
							alternateId: ingredient.alternateId,
							dailyMealId: dailyMealId,
							dailyLogId: input.logId,
							isLog: true,
							serve: ingredient.serve,
							serveUnit: ingredient.serveUnit,
						}
					}),
				)
				.returning({ id: userIngredient.id })

			return { meal, recipe: recipeInsert, ingredient: ingredientInsert }
		}),
	delete: protectedProcedure
		.input(z.number())
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db.delete(dailyLog).where(eq(dailyLog.id, input))
			return res
		}),
	deleteAll: protectedProcedure
		.input(z.string())
		.mutation(async ({ input, ctx }) => {
			if (input === '') throw new TRPCError({ code: 'NOT_FOUND' })
			const res = await ctx.db
				.delete(dailyLog)
				.where(eq(dailyLog.userId, input))
			return res
		}),
}
