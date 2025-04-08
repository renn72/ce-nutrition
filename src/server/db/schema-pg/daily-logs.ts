import { relations, sql } from 'drizzle-orm'
import {
  date,
  index,
  integer,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

import { user } from './user'
import { userIngredient, userRecipe } from './user-plan'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const dailyLog = createTable(
  'daily_log',
  {
    id: serial().primaryKey(),
    createdAt: date('created_at')
    .default(new Date().getTime().toString())
      .notNull(),
    updatedAt: date('updated_at').$onUpdate(() =>
      new Date().getTime().toString(),
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
  (table) => [index('daily_log_date_index').on(table.date)],
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
  createdAt: date()
    .default(new Date().getTime().toString())
    .notNull(),
  userId: text('user_Id')
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),
})

export const tagRelations = relations(tag, ({ one, many }) => ({
  user: one(user, {
    fields: [tag.userId],
    references: [user.id],
  }),
  dailyLogs: many(tagToDailyLog),
}))

export const tagToDailyLog = createTable('tag_to_daily_log', {
  id: serial().primaryKey(),
  tagId: integer('tag_id')
    .notNull()
    .references(() => tag.id, {
      onDelete: 'cascade',
    }),
  dailyLogId: integer('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
})

export const tagToDailyLogRelations = relations(tagToDailyLog, ({ one }) => ({
  tag: one(tag, {
    fields: [tagToDailyLog.tagId],
    references: [tag.id],
  }),
  dailyLog: one(dailyLog, {
    fields: [tagToDailyLog.dailyLogId],
    references: [dailyLog.id],
  }),
}))

export const poopLog = createTable('poop_log', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(new Date().getTime().toString())
    .notNull(),
  dailyLogId: integer('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
})

export const poopLogRelations = relations(poopLog, ({ one }) => ({
  dailyLog: one(dailyLog, {
    fields: [poopLog.dailyLogId],
    references: [dailyLog.id],
  }),
}))

export const waterLog = createTable('water_log', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  dailyLogId: integer('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
  amount: text('water'),
})

export const waterLogRelations = relations(waterLog, ({ one }) => ({
  dailyLog: one(dailyLog, {
    fields: [waterLog.dailyLogId],
    references: [dailyLog.id],
  }),
}))

export const dailyMeal = createTable('daily_meal', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(new Date().getTime().toString())
    .notNull(),
  dailyLogId: integer('daily_log_id')
    .notNull()
    .references(() => dailyLog.id, {
      onDelete: 'cascade',
    }),
  mealIndex: integer('meal_index').notNull(),
  date: date('date').notNull(),
  recipeId: integer('recipe_id'),
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
