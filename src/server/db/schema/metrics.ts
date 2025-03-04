import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const skinfold = createTable(
  'skinfold',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: text('date').notNull(),
    chin: text('chin'),
    cheek: text('cheek'),
    lowerAbdominal: text('lower_abdominal'),
    pectoral: text('pectoral'),
    biceps: text('biceps'),
    triceps: text('triceps'),
    subscapular: text('subscapular'),
    midAxillary: text('mid_axillary'),
    suprailiac: text('suprailiac'),
    umbilical: text('umbilical'),
    lowerBack: text('lower_back'),
    quadriceps: text('quadriceps'),
    hamstrings: text('hamstrings'),
    medialCalf: text('medial_calf'),
    knee: text('knee'),
    shoulder: text('shoulder'),
    notes: text('notes'),
  },
  (s) => ({
    dateIndex: index('skinfold_date_idx').on(s.date),
  }),
)

export const skinfoldRelations = relations(skinfold, ({ one, many }) => ({
  user: one(user, {
    fields: [skinfold.userId],
    references: [user.id],
  }),
  bodyFat: many(bodyFat),
  leanMass: many(leanMass),
  bodyWeight: many(bodyWeight),
}))

export const bodyFat = createTable(
  'body_fat',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: text('date').notNull(),
    bodyFat: text('body_fat'),
    notes: text('notes'),
    skinfoldId: int('skinfold_id').references(() => skinfold.id, {
      onDelete: 'cascade',
    }),
  },
  (s) => ({
    dateIndex: index('body_fat_date_idx').on(s.date),
  }),
)

export const bodyFatRelations = relations(bodyFat, ({ one }) => ({
  user: one(user, {
    fields: [bodyFat.userId],
    references: [user.id],
  }),
  skinfold: one(skinfold, {
    fields: [bodyFat.skinfoldId],
    references: [skinfold.id],
  }),
}))

export const leanMass = createTable(
  'lean_mass',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: text('date').notNull(),
    leanMass: text('lean_mass'),
    notes: text('notes'),
    skinfoldId: int('skinfold_id').references(() => skinfold.id, {
      onDelete: 'cascade',
    }),
  },
  (s) => ({
    dateIndex: index('lean_mass_date_idx').on(s.date),
  }),
)

export const leanMassRelations = relations(leanMass, ({ one }) => ({
  user: one(user, {
    fields: [leanMass.userId],
    references: [user.id],
  }),
  skinfold: one(skinfold, {
    fields: [leanMass.skinfoldId],
    references: [skinfold.id],
  }),
}))

export const bodyWeight = createTable(
  'body_weight',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: text('date').notNull(),
    bodyWeight: text('body_weight'),
    source: text('source'),
    notes: text('notes'),
    skinfoldId: int('skinfold_id').references(() => skinfold.id, {
      onDelete: 'cascade',
    }),
  },
  (s) => ({
    dateIndex: index('body_weight_date_idx').on(s.date),
  }),
)

export const bodyWeightRelations = relations(bodyWeight, ({ one }) => ({
  user: one(user, {
    fields: [bodyWeight.userId],
    references: [user.id],
  }),
  skinfold: one(skinfold, {
    fields: [bodyWeight.skinfoldId],
    references: [skinfold.id],
  }),
}))
