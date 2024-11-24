import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'
import { z } from 'zod'

import { ingredient } from './ingredient'
import { meal } from './meal'
import { recipe } from './recipe'
import { user } from './user'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const userPlan = createTable('user-plan', {
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
  userId: text('user_id').references(() => user.id),
  favouriteAt: int('favourite_at', { mode: 'timestamp' }),
  deletedAt: int('deleted_at', { mode: 'timestamp' }),
  hiddenAt: int('hidden_at', { mode: 'timestamp' }),
})

export const userMeal = createTable('user-meal', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  userPlanId: int('user_plan_id').references(() => userPlan.id),
  mealIndex: int('index', { mode: 'number' }),
  mealTitle: text('meal_title'),
  calories: text('calories'),
  protein: text('protein'),
  vegeCalories: text('vege_calories'),
  note: text('note'),
})

export const userRecipe = createTable('user-recipe', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  mealIndex: int('meal_index', { mode: 'number' }),
  recipeIndex: int('recipe_index', { mode: 'number' }),
  userPlanId: int('user_plan_id').references(() => userPlan.id),
  index: int('index', { mode: 'number' }),
  serve: text('serve'),
  serveUnit: text('serve_unit'),
  note: text('note'),
})

export const userIngredient = createTable('user-ingredient', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  ingredientId: int('ingredient_id').references(() => ingredient.id, {
    onDelete: 'cascade',
  }),
  userPlanId: int('user_plan_id').references(() => userPlan.id),
  mealIndex: int('meal_index', { mode: 'number' }),
  recipeIndex: int('recipe_index', { mode: 'number' }),
  isAlternate: int('is_alternate', { mode: 'boolean' }),
  serve: text('serve'),
  serveUnit: text('serve_unit'),
  note: text('note'),
})

export const userPlanRelations = relations(userPlan, ({ one, many }) => ({
  user: one(user, { fields: [userPlan.userId], references: [user.id] }),
  userMeals: many(userMeal),
  userRecipes: many(userRecipe),
  userIngredients: many(userIngredient),
}))

export const userMealRelations = relations(userMeal, ({ one }) => ({
  userPlan: one(userPlan, {
    fields: [userMeal.userPlanId],
    references: [userPlan.id],
  }),
}))

export const userRecipeRelations = relations(userRecipe, ({ one }) => ({
  userPlan: one(userPlan, {
    fields: [userRecipe.userPlanId],
    references: [userPlan.id],
  }),
}))

export const userIngredientRelations = relations(userIngredient, ({ one }) => ({
  ingredient: one(ingredient, {
    fields: [userIngredient.ingredientId],
    references: [ingredient.id],
  }),
  userPlan: one(userPlan, {
    fields: [userIngredient.userPlanId],
    references: [userPlan.id],
  }),
}))
