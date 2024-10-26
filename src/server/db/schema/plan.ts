import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

import { user } from './user'
import { ingredient } from './ingredient'
import { recipe } from './recipe'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)


export const plan = createTable('plan', {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
    name: text('name'),
    description: text('description'),
    image: text('image'),
    notes: text('notes'),
    numberOfMeals: int('number_of_meals', { mode: 'number' }),
    creatorId: text('creator_id').references(() => user.id),
    planCategory: text('recipe_category'),
    favouriteAt: int('favourite_at', { mode: 'timestamp' }),
    deletedAt: int('deleted_at', { mode: 'timestamp' }),
    hiddenAt: int('hidden_at', { mode: 'timestamp' }),
})

export const planToRecipe = createTable('plan_to_recipe', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  planId: int('plan_id').references(() => plan.id, {
    onDelete: 'cascade',
  }),
  recipeId: int('recipe_id').references(() => recipe.id, {
    onDelete: 'cascade',
  }),
  index: int('index', { mode: 'number' }),
  mealNumber: int('meal_number', { mode: 'number' }),
  calories: int('calories', { mode: 'number' }),
  note: text('note'),
})


export const planRelations = relations(plan, ({ one, many }) => ({
  creator: one(user, { fields: [plan.creatorId], references: [user.id] }),
  planToRecipe: many(planToRecipe),
}))

export const planToRecipeRelations = relations(
  planToRecipe,
  ({ one }) => ({
    plan: one(plan, {
      fields: [planToRecipe.planId],
      references: [plan.id],
    }),
    recipe: one(recipe, {
      fields: [planToRecipe.recipeId],
      references: [recipe.id],
    }),
  }),
)
