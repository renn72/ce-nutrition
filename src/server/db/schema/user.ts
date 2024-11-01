import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from 'drizzle-orm/sqlite-core'
import { type AdapterAccount } from 'next-auth/adapters'

import { notification } from './notification'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const user = createTable(
  'user',
  {
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
  },
  (u) => ({
    nameIndex: index('name_idx').on(u.name),
    clerkIdIndex: index('clerk_id_idx').on(u.clerkId),
    emailIndex: index('email_idx').on(u.email),
  }),
)

export const userToTrainer = createTable('user_to_trainer', {
  userId: text('user_id').notNull().references(() => user.id),
  trainerId: text('trainer_id').notNull().references(() => user.id),
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
    userIdIdx: index('account_user_id_idx').on(account.userId),
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

export const session = createTable(
  'session',
  {
    sessionToken: text('session_token', { length: 255 }).notNull().primaryKey(),
    userId: text('userId', { length: 255 })
      .notNull()
      .references(() => user.id),
    expires: int('expires', { mode: 'timestamp' }).notNull(),
  },
  (session) => ({
    userIdIdx: index('session_userId_idx').on(session.userId),
  }),
)

export const sessionsRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}))

export const accountsRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}))

export const roleRelations = relations(role, ({ one, many }) => ({
  user: one(user, {
    fields: [role.userId],
    references: [user.id],
  }),
}))

export const userRelations = relations(user, ({ one, many }) => ({
  roles: many(role),
  notifications: many(notification),
  accounts: many(account),
  trainers: many(userToTrainer, { relationName: 'trainers' }),
  clients: many(userToTrainer, { relationName: 'clients' }),
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
