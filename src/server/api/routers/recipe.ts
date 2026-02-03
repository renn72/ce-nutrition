import { recipe, recipeToIngredient } from '@/server/db/schema/recipe'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq, and, isNull } from 'drizzle-orm'
import { z } from 'zod'
import { user } from '@/server/db/schema/user'
import { ingredient } from '@/server/db/schema/ingredient'
import { aliasedTable } from 'drizzle-orm'

const altIngredient = aliasedTable(ingredient, 'alt_ingredient')

export const recipeRouter = createTRPCRouter({
	getAll: protectedProcedure.query(async ({ ctx }) => {
		const res = await ctx.db.query.recipe.findMany({
			where: (recipe, { eq }) => eq(recipe.isUserRecipe, false),
			orderBy: [desc(recipe.createdAt)],
			with: {
				creator: true,
				recipeToIngredient: {
					with: {
						alternateIngredient: true,
						ingredient: true,
					},
				},
			},
		})
		return res
	}),
	getAllForPlan: protectedProcedure.query(async ({ ctx }) => {
		const rows = await ctx.db
			.select({
				// Recipe Fields
				recipe: {
					id: recipe.id,
					name: recipe.name,
					description: recipe.description,
					image: recipe.image,
					createdAt: recipe.createdAt,
					calories: recipe.calories,
					recipeCategory: recipe.recipeCategory,
				},
				// Creator Fields
				creator: {
					id: user.id,
					name: user.name,
				},
				// Junction/Ingredient Fields
				recipeToIngredient: {
					id: recipeToIngredient.id,
					serveSize: recipeToIngredient.serveSize,
					serveUnit: recipeToIngredient.serveUnit,
					index: recipeToIngredient.index,
				},
				// Ingredient Fields
				ingredient: {
					id: ingredient.id,
					name: ingredient.name,
					caloriesWFibre: ingredient.caloriesWFibre,
					caloriesWOFibre: ingredient.caloriesWOFibre,
					protein: ingredient.protein,
					fatTotal: ingredient.fatTotal,
					totalSugars: ingredient.totalSugars,
					availableCarbohydrateWithSugarAlcohols:
						ingredient.availableCarbohydrateWithSugarAlcohols,
					hiddenAt: ingredient.hiddenAt,
					serveUnit: ingredient.serveUnit,
					serveSize: ingredient.serveSize,
				},
				// Alternate Ingredient Fields (aliased)
				altIngredient: {
					id: altIngredient.id,
					name: altIngredient.name,
					caloriesWFibre: altIngredient.caloriesWFibre,
					caloriesWOFibre: altIngredient.caloriesWOFibre,
					protein: altIngredient.protein,
					fatTotal: altIngredient.fatTotal,
					totalSugars: altIngredient.totalSugars,
					availableCarbohydrateWithSugarAlcohols:
						altIngredient.availableCarbohydrateWithSugarAlcohols,
					hiddenAt: altIngredient.hiddenAt,
					serveUnit: altIngredient.serveUnit,
					serveSize: altIngredient.serveSize,
				},
			})
			.from(recipe)
			.leftJoin(user, eq(recipe.creatorId, user.id))
			.leftJoin(recipeToIngredient, eq(recipe.id, recipeToIngredient.recipeId))
			.leftJoin(ingredient, eq(recipeToIngredient.ingredientId, ingredient.id))
			// We alias the ingredient table again to get the alternate
			.leftJoin(
				altIngredient,
				eq(recipeToIngredient.alternateId, altIngredient.id),
			)
			.where(and(eq(recipe.isUserRecipe, false), isNull(recipe.hiddenAt)))
			.orderBy(desc(recipe.createdAt))

		// --- Transform flat rows into nested objects ---
		const result = rows.reduce<Array<any>>((acc, row) => {
			const { recipe, creator, recipeToIngredient, ingredient, altIngredient } =
				row

			// Check if we already started adding this recipe to our array
			let recipeEntry = acc.find((r) => r.id === recipe.id)

			if (!recipeEntry) {
				recipeEntry = {
					...recipe,
					creator: creator,
					recipeToIngredient: [],
				}
				acc.push(recipeEntry)
			}

			if (recipeToIngredient) {
				recipeEntry.recipeToIngredient.push({
					...recipeToIngredient,
					ingredient: ingredient?.id ? ingredient : null,
					alternateIngredient: altIngredient?.id ? altIngredient : null,
				})
			}

			return acc
		}, [])

		return result
	}),
	getAllUserCreated: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(async ({ ctx, input }) => {
			const res = await ctx.db.query.recipe.findMany({
				where: (recipe, { eq, and }) =>
					and(
						eq(recipe.creatorId, input.userId),
						eq(recipe.isUserRecipe, true),
					),
				orderBy: [desc(recipe.createdAt)],
				with: {
					creator: true,
					recipeToIngredient: {
						with: {
							alternateIngredient: true,
							ingredient: {
								with: {
									ingredientToGroceryStore: {
										with: {
											groceryStore: true,
										},
									},
								},
							},
						},
					},
				},
			})
			return res
		}),
	get: protectedProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input, ctx }) => {
			if (input.id === 0) throw new TRPCError({ code: 'BAD_REQUEST' })
			const res = await ctx.db.query.recipe.findFirst({
				where: (recipe, { eq }) => eq(recipe.id, input.id),
				with: {
					creator: true,
					recipeToIngredient: {
						with: {
							ingredient: true,
							alternateIngredient: true,
						},
					},
				},
			})
			return res
		}),
	update: protectedProcedure
		.input(
			z.object({
				id: z.number(),
				name: z.string(),
				description: z.string(),
				image: z.string(),
				notes: z.string(),
				recipeCategory: z.string(),
				calories: z.number(),
				isUserRecipe: z.boolean().optional(),
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
		)
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id
			const { ingredients, ...data } = input
			const res = await ctx.db
				.update(recipe)
				.set(data)
				.where(eq(recipe.id, input.id))
				.returning({ id: recipe.id })

			const resId = res?.[0]?.id
			if (!resId) return res

			await ctx.db
				.delete(recipeToIngredient)
				.where(eq(recipeToIngredient.recipeId, resId))

			const ingredientsRes = await ctx.db
				.insert(recipeToIngredient)
				.values(
					ingredients.map((ingredient) => ({
						index: ingredient.index,
						ingredientId: ingredient.ingredientId,
						isAlternate: ingredient.isAlternate,
						alternateId:
							ingredient.alternateId === ''
								? null
								: Number(ingredient.alternateId),
						serveSize: ingredient.serveSize,
						serveUnit: ingredient.serveUnit,
						note: ingredient.note,
						recipeId: resId,
					})),
				)
				.returning({ id: recipeToIngredient.id })
			return { res, ingredientsRes }
		}),
	duplicate: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id
			const recipeRes = await ctx.db.query.recipe.findFirst({
				where: eq(recipe.id, input.id),
				with: {
					recipeToIngredient: {},
				},
			})
			if (!recipeRes) return
			const {
				recipeToIngredient: ingredients,
				id,
				createdAt,
				updatedAt,
				...data
			} = recipeRes
			const res = await ctx.db
				.insert(recipe)
				.values({
					...data,
					name: `${data.name}-copy`,
					creatorId: userId,
				})
				.returning({ id: recipe.id })

			const resId = res?.[0]?.id
			if (!resId) return res

			const ingredientsRes = await ctx.db
				.insert(recipeToIngredient)
				.values(
					ingredients.map((ingredient) => ({
						index: ingredient.index,
						ingredientId: ingredient.ingredientId,
						alternateId: ingredient.alternateId,
						serveSize: ingredient.serveSize,
						serveUnit: ingredient.serveUnit,
						note: ingredient.note,
						recipeId: resId,
					})),
				)
				.returning({ id: recipeToIngredient.id })
			return { res, ingredientsRes }
		}),
	create: protectedProcedure
		.input(
			z.object({
				name: z.string(),
				description: z.string(),
				image: z.string(),
				notes: z.string(),
				recipeCategory: z.string(),
				calories: z.number(),
				isUserRecipe: z.boolean().optional(),
				ingredients: z.array(
					z.object({
						ingredientId: z.number(),
						alternateId: z.string(),
						note: z.string(),
						serveSize: z.string(),
						serveUnit: z.string(),
						index: z.number(),
					}),
				),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.session.user.id
			const { ingredients, ...data } = input
			const res = await ctx.db
				.insert(recipe)
				.values({
					...data,
					creatorId: userId,
				})
				.returning({ id: recipe.id })

			const resId = res?.[0]?.id
			if (!resId) return res

			const ingredientsRes = await ctx.db
				.insert(recipeToIngredient)
				.values(
					ingredients.map((ingredient) => ({
						index: ingredient.index,
						ingredientId: ingredient.ingredientId,
						alternateId:
							ingredient.alternateId === ''
								? null
								: Number(ingredient.alternateId),
						serveSize: ingredient.serveSize,
						serveUnit: ingredient.serveUnit,
						note: ingredient.note,
						recipeId: resId,
					})),
				)
				.returning({ id: recipeToIngredient.id })
			return { res, ingredientsRes }
		}),
	delete: protectedProcedure
		.input(z.object({ id: z.number() }))
		.mutation(async ({ input, ctx }) => {
			const res = await ctx.db.delete(recipe).where(eq(recipe.id, input.id))
			return res
		}),
	deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
		const res = await ctx.db.delete(recipe)
		return res
	}),
})
