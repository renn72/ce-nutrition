import { relations, sql } from 'drizzle-orm'
import {
  date,
  integer,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

import { ingredient } from './ingredient'
import { user } from './user'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const recipe = createTable('recipe', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: date('updated_at').$onUpdate(() =>
    new Date().getTime().toString(),
  ),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  notes: text('notes').notNull(),
  calories: integer('calories').notNull(),
  creatorId: text('creator_id')
    .references(() => user.id)
    .notNull(),
  recipeCategory: text('recipe_category').notNull(),
  favouriteAt: date('favourite_at'),
  deletedAt: date('deleted_at'),
  hiddenAt: date('hidden_at'),
})

export const recipeToIngredient = createTable('recipe_to_ingredient', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  recipeId: integer('recipe_id')
    .references(() => recipe.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  ingredientId: integer('ingredient_id')
    .references(() => ingredient.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  index: integer('index').notNull(),
  alternateId: integer('alternate_id').references(() => ingredient.id),
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
    }),
  }),
)

export const recipeRelations = relations(recipe, ({ one, many }) => ({
  creator: one(user, { fields: [recipe.creatorId], references: [user.id] }),
  recipeToIngredient: many(recipeToIngredient),
}))
