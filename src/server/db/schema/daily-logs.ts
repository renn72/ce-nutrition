import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { ingredient } from './ingredient'
import { user } from './user'
import { userIngredient, userRecipe } from './user-plan'

const createTable = sqliteTable

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
		posing: text('posing'),
		steps: text('steps'),
		sauna: text('sauna'),
		coldPlunge: text('cold_plunge'),
		cardioType: text('cardio_type'),
		image: text('image'),
		frontImage: text('front_image'),
		sideImage: text('side_image'),
		backImage: text('back_image'),
		frontImageSvg: text('front_image_svg'),
		sideImageSvg: text('side_image_svg'),
		backImageSvg: text('back_image_svg'),
		frontPoseImage: text('front_pose_image'),
		sidePoseImage: text('side_pose_image'),
		backPoseImage: text('back_pose_image'),
		spareImageOne: text('spare_image'),
		spareImageTwo: text('spare_image'),
		waistMeasurement: text('waist_measurement'),
		nap: text('nap'),
	},
	(table) => [index('daily_log_user_id_index').on(table.userId)],
)

export const dailyLogRelations = relations(dailyLog, ({ one, many }) => ({
	user: one(user, { fields: [dailyLog.userId], references: [user.id] }),
	dailyMeals: many(dailyMeal),
	waterLogs: many(waterLog),
	poopLogs: many(poopLog),
	tags: many(tagToDailyLog),
	supplements: many(dailySupplement),
}))

export const dailySupplement = createTable('daily_supplement', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`(unixepoch())`)
		.notNull(),
	dailyLogId: int('daily_log_id')
		.notNull()
		.references(() => dailyLog.id, {
			onDelete: 'cascade',
		}),
	supplementId: int('supplement_id')
		.notNull()
		.references(() => ingredient.id, {
			onDelete: 'cascade',
		}),
	amount: text('amount'),
	unit: text('unit'),
	time: text('time'),
	notes: text('notes'),
},
  (table) => [index('daily_supplement_daily_log_id_index').on(table.dailyLogId)],
)

export const dailySupplementRelations = relations(
	dailySupplement,
	({ one }) => ({
		dailyLog: one(dailyLog, {
			fields: [dailySupplement.dailyLogId],
			references: [dailyLog.id],
			relationName: 'dailyLog',
		}),
		supplement: one(ingredient, {
			fields: [dailySupplement.supplementId],
			references: [ingredient.id],
			relationName: 'supplement',
		}),
	}),
)

export const tag = createTable('tag', {
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`(unixepoch())`)
		.notNull(),
	name: text('name').notNull(),
	icon: text('icon').notNull(),
	color: text('color').notNull(),
	userId: text('user_id')
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
},
  (table) => [index('tag_to_daily_log_tag_id_index').on(table.tagId)],
)

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
	id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
	createdAt: int('created_at', { mode: 'timestamp' })
		.default(sql`(unixepoch())`)
		.notNull(),
	dailyLogId: int('daily_log_id')
		.notNull()
		.references(() => dailyLog.id, {
			onDelete: 'cascade',
		}),
},
  (table) => [index('poop_log_daily_log_id_index').on(table.dailyLogId)],
)

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
},
  (table) => [index('water_log_daily_log_id_index').on(table.dailyLogId)],
)

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
},
  (table) => [index('daily_meal_daily_log_id_index').on(table.dailyLogId)],
)

export const dailyMealRelations = relations(dailyMeal, ({ one, many }) => ({
	dailyLog: one(dailyLog, {
		fields: [dailyMeal.dailyLogId],
		references: [dailyLog.id],
	}),
	recipe: many(userRecipe),
	ingredients: many(userIngredient),
}))
