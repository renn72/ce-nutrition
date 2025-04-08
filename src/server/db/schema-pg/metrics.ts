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

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const skinfold = createTable(
  'skinfold',
  {
    id: serial().primaryKey(),
    createdAt: date('created_at')
    .default(new Date().getTime().toString())
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
  (s) => [index('skinfold_date_idx').on(s.date)],
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
    id: serial().primaryKey(),
    createdAt: date('created_at')
    .default(new Date().getTime().toString())
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: text('date').notNull(),
    bodyFat: text('body_fat'),
    notes: text('notes'),
    skinfoldId: integer('skinfold_id').references(() => skinfold.id, {
      onDelete: 'cascade',
    }),
  },
  (s) => [index('body_fat_date_idx').on(s.date)],
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
    id: serial().primaryKey(),
    createdAt: date('created_at')
    .default(new Date().getTime().toString())
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: text('date').notNull(),
    leanMass: text('lean_mass'),
    notes: text('notes'),
    skinfoldId: integer('skinfold_id').references(() => skinfold.id, {
      onDelete: 'cascade',
    }),
  },
  (s) => [index('lean_mass_date_idx').on(s.date)],
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
    id: serial().primaryKey(),
    createdAt: date('created_at')
    .default(new Date().getTime().toString())
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id),
    date: text('date').notNull(),
    bodyWeight: text('body_weight'),
    source: text('source'),
    notes: text('notes'),
    skinfoldId: integer('skinfold_id').references(() => skinfold.id, {
      onDelete: 'cascade',
    }),
  },
  (s) => [index('body_weight_date_idx').on(s.date)],
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
