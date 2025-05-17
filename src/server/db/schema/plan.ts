import { relations, sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { meal, } from './meal'
import { user } from './user'

const createTable = sqliteTable

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
  isGlobal: int('is_global', { mode: 'boolean' }).default(false),
  planCategory: text('recipe_category'),
  favouriteAt: int('favourite_at', { mode: 'timestamp' }),
  deletedAt: int('deleted_at', { mode: 'timestamp' }),
  hiddenAt: int('hidden_at', { mode: 'timestamp' }),
})

export const planToMeal = createTable('plan_to_meal', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  planId: int('plan_id').references(() => plan.id, {
    onDelete: 'cascade',
  }),
  mealId: int('meal_id').references(() => meal.id, {
    onDelete: 'cascade',
  }),
  mealIndex: int('index', { mode: 'number' }),
  mealTitle: text('meal_title'),
  calories: text('calories'),
  vegeCalories: text('vege_calories'),
  note: text('note'),
})

export const planRelations = relations(plan, ({ one, many }) => ({
  creator: one(user, { fields: [plan.creatorId], references: [user.id] }),
  planToMeal: many(planToMeal),
  meals: many(meal),
}))

export const planToMealRelations = relations(planToMeal, ({ one }) => ({
  meal: one(meal, {
    fields: [planToMeal.mealId],
    references: [meal.id],
  }),
  plan: one(plan, {
    fields: [planToMeal.planId],
    references: [plan.id],
  }),
}))
