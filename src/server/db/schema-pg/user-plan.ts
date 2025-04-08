import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  date,
  integer as int,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

import { dailyLog, dailyMeal } from './daily-logs'
import { ingredient } from './ingredient'
import { user } from './user'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const userPlan = createTable('user_plan', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: date('updated_at').$onUpdate(() =>
    new Date().getTime().toString(),
  ),
  finishedAt: date('finished_at'),
  startAt: date('start_at'),
  isActive: date('is_active'),
  name: text('name').notNull(),
  description: text('description').notNull(),
  image: text('image').notNull(),
  notes: text('notes').notNull(),
  numberOfMeals: int('number_of_meals'),
  creatorId: text('creator_id')
    .references(() => user.id)
    .notNull(),
  userId: text('user_id')
    .references(() => user.id)
    .notNull(),
  favouriteAt: date('favourite_at'),
  deletedAt: date('deleted_at'),
  hiddenAt: date('hidden_at'),
})

export const userMeal = createTable('user_meal', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: date('updated_at').$onUpdate(() =>
    new Date().getTime().toString(),
  ),
  userPlanId: int('user_plan_id')
    .references(() => userPlan.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  mealIndex: int('index'),
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

export const userRecipe = createTable('user_recipe', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: date('updated_at').$onUpdate(() =>
    new Date().getTime().toString(),
  ),
  mealIndex: int('meal_index'),
  recipeIndex: int('recipe_index'),
  userPlanId: int('user_plan_id').references(() => userPlan.id, {
    onDelete: 'cascade',
  }),
  dailyMealId: int('daily_meal_id').references(() => dailyMeal.id, {
    onDelete: 'cascade',
  }),
  name: text('name'),
  index: int('index'),
  serve: text('serve'),
  serveUnit: text('serve_unit'),
  note: text('note'),
  isLog: boolean('is_log'),
  dailyLogId: int('daily_log_id').references(() => dailyLog.id),
})

export const userIngredient = createTable('user_ingredient', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: date('updated_at').$onUpdate(() =>
    new Date().getTime().toString(),
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
  mealIndex: int('meal_index'),
  recipeIndex: int('recipe_index'),
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
