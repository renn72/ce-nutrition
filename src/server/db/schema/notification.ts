import { relations, sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

const createTable = sqliteTable

export const notification = createTable(
  'notification',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id').references(() => user.id, {
      onDelete: 'cascade',
    }),
    code: text('code'),
    title: text('title'),
    description: text('description'),
    isRead: int('is_read', { mode: 'boolean' }).default(false),
    isViewed: int('is_viewed', { mode: 'boolean' }).default(false),
    isDeleted: int('is_deleted', { mode: 'boolean' }).default(false),
    isNotified: int('is_notified', { mode: 'boolean' }).default(false),
    notes: text('notes'),
  },
)

export const notificationRelations = relations(
  notification,
  ({ one, }) => ({
    user: one(user, {
      fields: [notification.userId],
      references: [user.id],
    }),
  }),
)
