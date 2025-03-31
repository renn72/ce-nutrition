import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from 'drizzle-orm/sqlite-core'

import { user } from './user'
import { userIngredient, userRecipe } from './user-plan'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const dailyLog = createTable(
  'daily_log',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
      }),
    date: text('date').notNull(),
    morningWeight: text('morning_weight'),
    notes: text('notes'),
    fastedBloodGlucose: text('fasted_blood_glucose'),
    sleep: text('sleep'),
    sleepQuality: text('sleep_quality'),
    isHiit: int('is_hiit', { mode: 'boolean' }),
    isCardio: int('is_cardio', { mode: 'boolean' }),
    isLift: int('is_lift', { mode: 'boolean' }),
    isLiss: int('is_liss', { mode: 'boolean' }),
    isStarred: int('is_starred', { mode: 'boolean' }).default(false),
    hiit: text('hiit'),
    cardio: text('cardio'),
    weight: text('weight'),
    liss: text('liss'),
    cardioType: text('cardio_type'),
    image: text('image'),
    waistMeasurement: text('waist_measurement'),
    nap: text('nap'),
  },
  (l) => ({
    dateIndex: index('date_idx').on(l.date),
  }),
)

export const dailyLogRelations = relations(dailyLog, ({ one, many }) => ({
  user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
  dailyMeals: many(dailyMeal),
  waterLogs: many(waterLog),
  poopLogs: many(poopLog),
}))

export const poopLog = createTable('poop_log', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  dailyLogId: int('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
})

export const poopLogRelations = relations(poopLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [poopLog.dailyLogId],
    references: [dailyLog.id],
  }),
}))

export const waterLog = createTable('water_log', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  dailyLogId: int('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
  amount: text('water'),
})

export const waterLogRelations = relations(waterLog, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [waterLog.dailyLogId],
    references: [dailyLog.id],
  }),
}))

export const dailyMeal = createTable('daily_meal', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  dailyLogId: int('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
  mealIndex: int('meal_index', { mode: 'number' }),
  date: int('date', { mode: 'timestamp' }),
  recipeId: int('recipe_id'),
  vegeCalories: text('vege_calories'),
  veges: text('veges'),
})

export const dailyMealRelations = relations(dailyMeal, ({ one, many }) => ({
  dailyLog: one(dailyLog, {
    fields: [dailyMeal.dailyLogId],
    references: [dailyLog.id],
  }),
  recipe: many(userRecipe),
  ingredients: many(userIngredient),
}))
