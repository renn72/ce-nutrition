import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { planToMeal, plan } from './plan'

import { recipe } from './recipe'
import { user } from './user'

const createTable = sqliteTable

export const meal = createTable(
	'meal',
	{
		id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		createdAt: int('created_at', { mode: 'timestamp' })
			.default(sql`(unixepoch())`)
			.notNull(),
		updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
			() => new Date(),
		),
		planId: int('plan_id').references(() => plan.id, {
			onDelete: 'cascade',
		}),
		name: text('name'),
		description: text('description'),
		image: text('image'),
		notes: text('notes'),
		creatorId: text('creator_id').references(() => user.id),
		mealCategory: text('meal_category'),
		favouriteAt: int('favourite_at', { mode: 'timestamp' }),
		deletedAt: int('deleted_at', { mode: 'timestamp' }),
		hiddenAt: int('hidden_at', { mode: 'timestamp' }),
		vegeNotes: text('vege_notes'),
		vege: text('vege'),
		vegeCalories: text('vege_calories'),
		mealIndex: int('index', { mode: 'number' }),
		calories: text('calories'),
	},
	(table) => [index('meal_plan_id_idx').on(table.planId)],
)

export const mealToRecipe = createTable(
	'meal_to_recipe',
	{
		id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		createdAt: int('created_at', { mode: 'timestamp' })
			.default(sql`(unixepoch())`)
			.notNull(),
		mealId: int('meal_id').references(() => meal.id, {
			onDelete: 'cascade',
		}),
		recipeId: int('recipe_id').references(() => recipe.id, {
			onDelete: 'cascade',
		}),
		index: int('index', { mode: 'number' }).notNull(),
		note: text('note'),
	},
	(table) => [
		index('meal_to_recipe_meal_id_idx').on(table.mealId),
		index('meal_to_recipe_recipe_id_idx').on(table.recipeId),
	],
)

export const vegeStack = createTable('vege_stack', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`(unixepoch())`)
		.notNull(),
	updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
		() => new Date(),
	),
	name: text('name'),
	veges: text('veges'),
	notes: text('notes'),
	calories: text('calories'),
})

export const mealToVegeStack = createTable(
	'meal_to_vege_stack',
	{
		id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		createdAt: int('created_at', { mode: 'timestamp' })
			.default(sql`(unixepoch())`)
			.notNull(),
		mealId: int('meal_id').references(() => meal.id, {
			onDelete: 'cascade',
		}),
		vegeStackId: int('vege_stack_id').references(() => vegeStack.id, {
			onDelete: 'cascade',
		}),
		calories: text('calories'),
		note: text('note'),
	},
	(table) => [
		index('meal_to_vege_meal_id_idx').on(table.mealId),
		index('meal_to_vege_vege_id_idx').on(table.vegeStackId),
	],
)

export const mealRelations = relations(meal, ({ one, many }) => ({
	creator: one(user, { fields: [meal.creatorId], references: [user.id] }),
	mealToRecipe: many(mealToRecipe),
	mealToVegeStack: many(mealToVegeStack),
	planToMeal: many(planToMeal),
	plan: one(plan, {
		fields: [meal.planId],
		references: [plan.id],
	}),
}))

export const vegeStackRelations = relations(vegeStack, ({ one, many }) => ({
	mealToVegeStack: many(mealToVegeStack),
}))

export const mealToVegeStackRelations = relations(
	mealToVegeStack,
	({ one }) => ({
		meal: one(meal, {
			fields: [mealToVegeStack.mealId],
			references: [meal.id],
		}),
		vegeStack: one(vegeStack, {
			fields: [mealToVegeStack.vegeStackId],
			references: [vegeStack.id],
		}),
	}),
)

export const mealToRecipeRelations = relations(mealToRecipe, ({ one }) => ({
	meal: one(meal, {
		fields: [mealToRecipe.mealId],
		references: [meal.id],
	}),
	recipe: one(recipe, {
		fields: [mealToRecipe.recipeId],
		references: [recipe.id],
	}),
}))
