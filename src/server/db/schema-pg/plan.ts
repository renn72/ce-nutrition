import { relations, sql } from 'drizzle-orm'
import {
  date,
  integer,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

import { meal } from './meal'
import { user } from './user'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const plan = createTable('plan', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: date('updated_at').$onUpdate(() =>
    new Date().getTime().toString(),
  ),
  name: text('name'),
  description: text('description'),
  image: text('image'),
  notes: text('notes'),
  numberOfMeals: integer('number_of_meals'),
  creatorId: text('creator_id').references(() => user.id),
  planCategory: text('recipe_category'),
  favouriteAt: date('favourite_at'),
  deletedAt: date('deleted_at'),
  hiddenAt: date('hidden_at'),
})

export const planToMeal = createTable('plan_to_meal', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  planId: integer('plan_id').references(() => plan.id, {
    onDelete: 'cascade',
  }),
  mealId: integer('meal_id').references(() => meal.id, {
    onDelete: 'cascade',
  }),
  mealIndex: integer('index'),
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
