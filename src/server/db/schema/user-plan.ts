import { relations, sql } from 'drizzle-orm'
import { int, text, sqliteTable } from 'drizzle-orm/sqlite-core'

import { ingredient } from './ingredient'
import { user, } from './user'
import { dailyLog, dailyMeal } from './daily-logs'


export const userPlan = sqliteTable('user_plan', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  finishedAt: int('finished_at', { mode: 'timestamp' }),
  startAt: int('start_at', { mode: 'timestamp' }),
  isActive: int('is_active', { mode: 'boolean' }),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  notes: text('notes').notNull(),
  numberOfMeals: int('number_of_meals', { mode: 'number' }),
  creatorId: text('creator_id')
    .references(() => user.id)
    .notNull(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  favouriteAt: int('favourite_at', { mode: 'timestamp' }),
  deletedAt: int('deleted_at', { mode: 'timestamp' }),
  hiddenAt: int('hidden_at', { mode: 'timestamp' }),
})

export const userMeal = sqliteTable('user_meal', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  userPlanId: int('user_plan_id')
    .references(() => userPlan.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  mealIndex: int('index', { mode: 'number' }),
  mealTitle: text('meal_title'),
  calories: text('calories'),
  protein: text('protein'),
  targetProtein: text('target_protein'),
  targetCalories: text('target_calories'),
  vegeCalories: text('vege_calories'),
  veges: text('veges'),
  vegeNotes: text('vege_notes'),
  note: text('note'),
})

export const userRecipe = sqliteTable('user_recipe', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  mealIndex: int('meal_index', { mode: 'number' }),
  recipeIndex: int('recipe_index', { mode: 'number' }),
  userPlanId: int('user_plan_id').references(() => userPlan.id, {
    onDelete: 'cascade',
  }),
  dailyMealId: int('daily_meal_id').references(() => dailyMeal.id, {
    onDelete: 'cascade',
  }),
  name: text('name'),
  index: int('index', { mode: 'number' }),
  serve: text('serve'),
  serveUnit: text('serve_unit'),
  note: text('note'),
  isLog: int('is_log', { mode: 'boolean' }),
  dailyLogId: int('daily_log_id').references(() => dailyLog.id),
})

export const userIngredient = sqliteTable('user_ingredient', {
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
  userPlanId: int('user_plan_id').references(() => userPlan.id, {
    onDelete: 'cascade',
  }),
  dailyMealId: int('daily_meal_id').references(() => dailyMeal.id, {
    onDelete: 'cascade',
  }),
  name: text('name'),
  mealIndex: int('meal_index', { mode: 'number' }),
  recipeIndex: int('recipe_index', { mode: 'number' }),
  alternateId: int('alternate_id').references(() => ingredient.id),
  serve: text('serve'),
  serveUnit: text('serve_unit'),
  note: text('note'),
  dailyLogId: int('daily_log_id').references(() => dailyLog.id),
})

export const userPlanRelations = relations(userPlan, ({ one, many }) => ({
  user: one(user, {
    fields: [userPlan.userId],
    references: [user.id],
    relationName: 'user',
  }),
  creator: one(user, {
    fields: [userPlan.creatorId],
    references: [user.id],
    relationName: 'creator',
  }),
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
  dailyMeal: one(dailyMeal, {
    fields: [userRecipe.dailyMealId],
    references: [dailyMeal.id],
  }),
}))

export const userIngredientRelations = relations(userIngredient, ({ one }) => ({
  ingredient: one(ingredient, {
    fields: [userIngredient.ingredientId],
    references: [ingredient.id],
    relationName: 'ingredient',
  }),
  alternateIngredient: one(ingredient, {
    fields: [userIngredient.alternateId],
    references: [ingredient.id],
    relationName: 'alternateIngredient',
  }),
  userPlan: one(userPlan, {
    fields: [userIngredient.userPlanId],
    references: [userPlan.id],
  }),
  dailyMeal: one(dailyMeal, {
    fields: [userIngredient.dailyMealId],
    references: [dailyMeal.id],
  }),
}))
