import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  date,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
} from 'drizzle-orm/pg-core'
import { type AdapterAccount } from 'next-auth/adapters'

import { dailyLog, tag } from './daily-logs'
import { message } from './message'
import { bodyFat, bodyWeight, leanMass, skinfold } from './metrics'
import { notification } from './notification'
import { userPlan } from './user-plan'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const user = createTable(
  'user',
  {
    id: text()
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    firstName: text('first_name'),
    lastName: text('last_name'),
    clerkId: text('clerk_id'),
    birthDate: date('birth_date'),
    gender: text('gender'),
    address: text('address'),
    notes: text('notes'),
    instagram: text('instagram'),
    phone: text('phone'),
    email: text('email').unique(),
    emailVerified: date('email_verified'),
    password: text('password'),
    currentPlanId: integer('current_plan_id'),
    image: text('image'),
    isFake: boolean('is_fake').default(false),
    isTrainer: boolean('is_trainer').default(false),
    isRoot: boolean('is_root').default(false),
    isCreator: boolean('is_creator').default(false),
    createdAt: date('created_at')
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: date('updated_at').$onUpdate(() =>
      new Date().getTime().toString(),
    ),
  },
  (u) => [index('email_idx').on(u.email)],
)

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
}))

export const userSettings = createTable('user_settings', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: date('updated_at').$onUpdate(() =>
    new Date().getTime().toString(),
  ),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, {
      onDelete: 'cascade',
    }),
  defaultWater: text('default_water'),
  defaultChartRange: text('default_chart_range'),
})

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
  user: one(user, {
    fields: [userSettings.userId],
    references: [user.id],
  }),
}))

export const weighIn = createTable('weigh_in', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  trainerId: text('trainer_id')
    .notNull()
    .references(() => user.id),
  date: date('date')
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
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  userId: text('user_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  name: text('name'),
})

export const account = createTable(
  'account',
  {
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    index('account_user_id_idx').on(account.userId),
  ],
)

export const verificationToken = createTable(
  'verification_token',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: date('expires').notNull(),
  },
  (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
)

export const session = createTable(
  'session',
  {
    sessionToken: text('session_token').notNull().primaryKey(),
    userId: text('userId')
      .notNull()
      .references(() => user.id),
    expires: date('expires').notNull(),
  },
  (session) => [index('session_userId_idx').on(session.userId)],
)

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

export const userToTrainerRelations = relations(userToTrainer, ({ one }) => ({
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
}))
