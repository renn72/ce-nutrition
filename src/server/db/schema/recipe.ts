
import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

import { user } from './user'
import { ingredient } from './ingredient'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)


export const recipe = createTable('recipe', {
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
    creatorId: text('creator_id').references(() => user.id),
    recipeCategory: text('recipe_category'),
    favouriteAt: int('favourite_at', { mode: 'timestamp' }),
    deletedAt: int('deleted_at', { mode: 'timestamp' }),
    hiddenAt: int('hidden_at', { mode: 'timestamp' }),
})

export const recipeToIngredient = createTable('recipe_to_ingredient', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  recipeId: int('recipe_id').references(() => recipe.id, {
    onDelete: 'cascade',
  }),
  ingredientId: int('ingredient_id').references(() => ingredient.id, {
    onDelete: 'cascade',
  }),
  index: int('index', { mode: 'number' }),
  isAlternate: int('is_alternate', { mode: 'boolean' }).default(false),
  serveSize: text('serve'),
  serveUnit: text('serve_unit'),
  isProtein: int('is_protein', { mode: 'boolean' }),
  isCarbohydrate: int('is_carbohydrate', { mode: 'boolean' }),
  isFat: int('is_fat', { mode: 'boolean' }),
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
    }),
  }),
)

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  creator: one(user, { fields: [recipe.creatorId], references: [user.id] }),
  recipeToIngredient: many(recipeToIngredient),
}))

