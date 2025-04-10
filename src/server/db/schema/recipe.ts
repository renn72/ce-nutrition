import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

import { ingredient } from './ingredient'
import { user } from './user'

const createTable = sqliteTable

export const recipe = createTable('recipe', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  notes: text('notes').notNull(),
  calories: int('calories', { mode: 'number' }).notNull(),
  creatorId: text('creator_id')
    .references(() => user.id)
    .notNull(),
  recipeCategory: text('recipe_category').notNull(),
  favouriteAt: int('favourite_at', { mode: 'timestamp' }),
  deletedAt: int('deleted_at', { mode: 'timestamp' }),
  hiddenAt: int('hidden_at', { mode: 'timestamp' }),
})

export const recipeToIngredient = createTable('recipe_to_ingredient', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  recipeId: int('recipe_id')
    .references(() => recipe.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  ingredientId: int('ingredient_id')
    .references(() => ingredient.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  index: int('index', { mode: 'number' }).notNull(),
  alternateId: int('alternate_id').references(() => ingredient.id),
  serveSize: text('serve').notNull(),
  serveUnit: text('serve_unit').notNull(),
  note: text('note'),
})

export const recipeToIngredientRelations = relations(
  recipeToIngredient,
  ({ one }) => ({
    recipe: one(recipe, {
      fields: [recipeToIngredient.recipeId],
      references: [recipe.id],
    }),
    ingredient: one(ingredient, {
      fields: [recipeToIngredient.ingredientId],
      references: [ingredient.id],
      relationName: 'ingredient',
    }),
    alternateIngredient: one(ingredient, {
      fields: [recipeToIngredient.alternateId],
      references: [ingredient.id],
      relationName: 'alternateIngredient',
    })
  }),
)

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  creator: one(user, { fields: [recipe.creatorId], references: [user.id] }),
  recipeToIngredient: many(recipeToIngredient),
}))
