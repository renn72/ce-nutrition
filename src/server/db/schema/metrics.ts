import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

const createTable = sqliteTable

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
		creatorId: text('creator_id').references(() => user.id),
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
		formula: text('formula'),
		test: text('test'),
	},
	(table) => [index('skinfold_user_id_idx').on(table.userId)],
)

export const girthMeasurement = createTable('girth_measurement', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`(unixepoch())`)
		.notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id, {
			onDelete: 'cascade',
		}),
	date: text('date').notNull(),
	waist: text('waist'),
	glutePeak: text('glute_peaks'),
	bicep: text('bicep'),
	cheastPeak: text('chest_peak'),
	thighPeak: text('thigh_peak'),
	calfPeak: text('calf_peak'),
	frontRelaxedImage: text('front_relaxed_image'),
	frontPosedImage: text('front_posed_image'),
	sideRelaxedImage: text('side_relaxed_image'),
	sidePosedImage: text('side_posed_image'),
	backRelaxedImage: text('back_relaxed_image'),
	backPosedImage: text('back_posed_image'),
	gluteRelaxedImage: text('glute_relaxed_image'),
	glutePosedImage: text('glute_posed_image'),
	isDailyLog: int('is_daily_log', { mode: 'boolean' }).default(false),
})

export const images = createTable(
	'images',
	{
		id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
		createdAt: int('created_at', { mode: 'timestamp' })
			.default(sql`(unixepoch())`)
			.notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, {
				onDelete: 'cascade',
			}),
		name: text('name').notNull(),
		date: text('date').notNull(),
		image: text('image').notNull(),
		svg: text('svg'),
	},
	(table) => [index('images_user_id_idx').on(table.userId)],
)

export const imagesRelations = relations(images, ({ one }) => ({
	user: one(user, {
		fields: [images.userId],
		references: [user.id],
	}),
}))

export const girthMeasurementRelations = relations(
	girthMeasurement,
	({ one }) => ({
		user: one(user, {
			fields: [girthMeasurement.userId],
			references: [user.id],
		}),
	}),
)

export const skinfoldRelations = relations(skinfold, ({ one, many }) => ({
	user: one(user, {
		fields: [skinfold.userId],
		references: [user.id],
		relationName: 'user',
	}),
	creator: one(user, {
		fields: [skinfold.creatorId],
		references: [user.id],
		relationName: 'creator',
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
		formula: text('formula'),
		skinfoldId: int('skinfold_id').references(() => skinfold.id, {
			onDelete: 'cascade',
		}),
	},
	(table) => [index('body_fat_user_id_idx').on(table.userId)],
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
		formula: text('formula'),
		skinfoldId: int('skinfold_id').references(() => skinfold.id, {
			onDelete: 'cascade',
		}),
	},
	(table) => [index('lean_mass_user_id_idx').on(table.userId)],
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
	(table) => [index('body_weight_user_id_idx').on(table.userId)],
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
