import { relations, sql } from 'drizzle-orm'
import {
  int,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'
import type {  AdapterAccount } from 'next-auth/adapters'

import { dailyLog, tag } from './daily-logs'
import { message } from './message'
import {
  bodyFat,
  bodyWeight,
  girthMeasurement,
  leanMass,
  skinfold,
} from './metrics'
import { notification } from './notification'
import { userPlan } from './user-plan'

const createTable = sqliteTable

export const user = createTable('user', {
  id: text('id', { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  firstName: text('first_name'),
  lastName: text('last_name'),
  clerkId: text('clerk_id'),
  birthDate: int('birth_date', { mode: 'timestamp' }),
  gender: text('gender'),
  address: text('address'),
  notes: text('notes'),
  instagram: text('instagram'),
  openLifter: text('open_lifter'),
  phone: text('phone'),
  email: text('email').unique(),
  emailVerified: int('email_verified', {
    mode: 'timestamp',
  }),
  password: text('password'),
  currentPlanId: int('current_plan_id'),
  image: text('image'),
  isFake: int('is_fake', { mode: 'boolean' }).default(false),
  isTrainer: int('is_trainer', { mode: 'boolean' }).default(false),
  isRoot: int('is_root', { mode: 'boolean' }).default(false),
  isCreator: int('is_creator', { mode: 'boolean' }).default(false),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
})

export const userRelations = relations(user, ({ one, many }) => ({
  roles: many(role),
  notifications: many(notification),
  messages: many(message, { relationName: 'userMessages' }),
  sentMessages: many(message, { relationName: 'sentMessages' }),
  accounts: many(account),
  trainers: many(userToTrainer, { relationName: 'trainers' }),
  clients: many(userToTrainer, { relationName: 'clients' }),
  userPlans: many(userPlan, { relationName: 'user' }),
  userPlansCreator: many(userPlan, { relationName: 'creator' }),
  dailyLogs: many(dailyLog),
  weighIns: many(weighIn, { relationName: 'user' }),
  weighInsTrainer: many(weighIn, { relationName: 'trainer' }),
  skinfolds: many(skinfold),
  bodyFat: many(bodyFat),
  leanMass: many(leanMass),
  bodyWeight: many(bodyWeight),
  settings: one(userSettings, {
    fields: [user.id],
    references: [userSettings.userId],
  }),
  tags: many(tag),
  girthMeasurements: many(girthMeasurement),
  goals: many(goals, { relationName: 'user' }),
  goalsTrainer: many(goals, { relationName: 'trainer' }),
  trainerNotes: many(trainerNotes, { relationName: 'user' }),
  trainerNotesTrainer: many(trainerNotes, { relationName: 'trainer' }),
}))

export const trainerNotes = createTable('trainer_notes', {
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
  title: text('title'),
  description: text('description'),
  state: text('state'),
  trainerId: text('trainer_id')
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),
})

export const trainerNotesRelations = relations(trainerNotes, ({ one }) => ({
  user: one(user, {
    fields: [trainerNotes.userId],
    references: [user.id],
    relationName: 'user',
  }),
  trainer: one(user, {
    fields: [trainerNotes.trainerId],
    references: [user.id],
    relationName: 'trainer',
  }),
}))

export const goals = createTable('goals', {
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
  title: text('title'),
  description: text('description'),
  state: text('state'),
  completedAt: int('completed_at', { mode: 'timestamp' }),
  trainerId: text('trainer_id')
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),
})

export const goalsRelations = relations(goals, ({ one }) => ({
  user: one(user, {
    fields: [goals.userId],
    references: [user.id],
    relationName: 'user',
  }),
  trainer: one(user, {
    fields: [goals.trainerId],
    references: [user.id],
    relationName: 'trainer',
  }),
}))

export const userSettings = createTable('user_settings', {
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
  defaultWater: text('default_water'),
  defaultChartRange: text('default_chart_range'),
  isPosing: int('is_posing', { mode: 'boolean' }).default(false),
  isBloodGlucose: int('is_blood_glucose', { mode: 'boolean' }).default(false),
  isSleep: int('is_sleep', { mode: 'boolean' }).default(true),
  isSleepQuality: int('is_sleep_quality', { mode: 'boolean' }).default(true),
  isNap: int('is_nap', { mode: 'boolean' }).default(true),
  isWeightTraining: int('is_weight', { mode: 'boolean' }).default(true),
  isHiit: int('is_hiit', { mode: 'boolean' }).default(true),
  isLiss: int('is_liss', { mode: 'boolean' }).default(true),
  isNotes: int('is_notes', { mode: 'boolean' }).default(true),
  isSteps: int('is_steps', { mode: 'boolean' }).default(true),
  isSauna: int('is_sauna', { mode: 'boolean' }).default(true),
  isColdPlunge: int('is_cold_plunge', { mode: 'boolean' }).default(true),
})

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(user, {
    fields: [userSettings.userId],
    references: [user.id],
  }),
}))

export const weighIn = createTable('weigh_in', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  trainerId: text('trainer_id')
    .notNull()
    .references(() => user.id),
  date: int('date', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  bodyWeight: text('body_weight'),
  leanMass: text('lean_mass'),
  bodyFat: text('body_fat'),
  bloodPressure: text('blood_pressure'),
  image: text('image'),
  notes: text('notes'),
})

export const weighInRelations = relations(weighIn, ({ one }) => ({
  user: one(user, {
    fields: [weighIn.userId],
    references: [user.id],
    relationName: 'user',
  }),
  trainer: one(user, {
    fields: [weighIn.trainerId],
    references: [user.id],
    relationName: 'trainer',
  }),
}))

export const userToTrainer = createTable('user_to_trainer', {
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  trainerId: text('trainer_id')
    .notNull()
    .references(() => user.id),
})

export const role = createTable('role', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
    () => new Date(),
  ),
  userId: text('user_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  name: text('name'),
})

export const account = createTable(
  'account',
  {
    userId: text('user_id', { length: 255 })
      .notNull()
      .references(() => user.id),
    type: text('type', { length: 255 })
      .$type<AdapterAccount['type']>()
      .notNull(),
    provider: text('provider', { length: 255 }).notNull(),
    providerAccountId: text('provider_account_id', { length: 255 }).notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: int('expires_at'),
    token_type: text('token_type', { length: 255 }),
    scope: text('scope', { length: 255 }),
    id_token: text('id_token'),
    session_state: text('session_state', { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
)

export const verificationToken = createTable(
  'verification_token',
  {
    identifier: text('identifier', { length: 255 }).notNull(),
    token: text('token', { length: 255 }).notNull(),
    expires: int('expires', { mode: 'timestamp' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
)

export const session = createTable('session', {
  sessionToken: text('session_token', { length: 255 }).notNull().primaryKey(),
  userId: text('userId', { length: 255 })
    .notNull()
    .references(() => user.id),
  expires: int('expires', { mode: 'timestamp' }).notNull(),
})

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}))

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}))

export const roleRelations = relations(role, ({ one }) => ({
  user: one(user, {
    fields: [role.userId],
    references: [user.id],
  }),
}))

export const userToTrainerRelations = relations(
  userToTrainer,
  ({ one, many }) => ({
    user: one(user, {
      fields: [userToTrainer.userId],
      references: [user.id],
      relationName: 'clients',
    }),
    trainer: one(user, {
      fields: [userToTrainer.trainerId],
      references: [user.id],
      relationName: 'trainers',
    }),
  }),
)
