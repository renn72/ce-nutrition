import { relations, sql } from 'drizzle-orm'
import {
  int,
  primaryKey,
  sqliteTableCreator,
} from 'drizzle-orm/sqlite-core'

import {
  pgTableCreator,
  serial,
  text,
  integer,
  date,
  index
} from  'drizzle-orm/pg-core'

import { user } from './user'
import { userIngredient, userRecipe } from './user-plan'

// export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const dailyLog = createTable('daily_log', {
  id: serial().primaryKey(),
  createdAt: date('created_at').default(sql`(unixepoch())`).notNull(),
  updatedAt: date('updated_at').$onUpdate(() => new Date().getTime().toString()),
  userId: text('user_id').notNull().references(() => user.id),
  date: text('date').notNull(),
  morningWeight: text('morning_weight'),
  notes: text('notes'),
  fastedBloodGlucose: text('fasted_blood_glucose'),
  sleep: text('sleep'),
  sleepQuality: text('sleep_quality'),
  isHiit: integer('is_hiit').default(0),
  isCardio: integer('is_cardio').default(0),
  isLift: integer('is_lift').default(0),
  isLiss: integer('is_liss').default(0),
  isStarred: integer('is_starred').default(0),
  hiit: text('hiit'),
  cardio: text('cardio'),
  weight: text('weight'),
  liss: text('liss'),
  cardioType: text('cardio_type'),
  image: text('image'),
  waistMeasurement: text('waist_measurement'),
  nap: text('nap'),
  },
  (table) => [index('daily_log_date_index').on(table.date)]
)

export const dailyLogRelations = relations(dailyLog, ({ one, many }) => ({
  user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
  dailyMeals: many(dailyMeal),
  waterLogs: many(waterLog),
  poopLogs: many(poopLog),
  tags: many(tagToDailyLog),
}))

export const tag = createTable('tag', {
  id: serial().primaryKey(),
  createdAt: date().default(sql`(unixepoch())`).notNull(),
})

export const tagRelations = relations(tag, ({ one, many }) => ({
  user: one(user, {
    fields: [tag.userId],
    references: [user.id],
  }),
  dailyLogs: many(tagToDailyLog),
}))

export const tagToDailyLog = createTable('tag_to_daily_log', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  tagId: int('tag_id')
    .notNull()
    .references(() => tag.id, {
      onDelete: 'cascade',
    }),
  dailyLogId: int('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
})

export const tagToDailyLogRelations = relations(
  tagToDailyLog,
  ({ one, }) => ({
    tag: one(tag, {
      fields: [tagToDailyLog.tagId],
      references: [tag.id],
    }),
    dailyLog: one(dailyLog, {
      fields: [tagToDailyLog.dailyLogId],
      references: [dailyLog.id],
    }),
  }),
)

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
