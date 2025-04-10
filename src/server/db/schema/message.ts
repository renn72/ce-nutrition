import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'
const createTable = sqliteTable

export const message = createTable(
  'message',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id').references(() => user.id, {
      onDelete: 'cascade',
    }),
    subject: text('subject'),
    isImportant: int('is_important', { mode: 'boolean' }),
    isRead: int('is_read', { mode: 'boolean' }),
    isViewed: int('is_viewed', { mode: 'boolean' }),
    isDeleted: int('is_deleted', { mode: 'boolean' }),
    message: text('message'),
    image: text('image'),
    fromUserId: text('from_user_id').references(() => user.id, {
      onDelete: 'cascade',
    }),
  },
)

export const messageRelations = relations(message, ({ one }) => ({
  user: one(user, {
    fields: [message.userId],
    references: [user.id],
    relationName: 'userMessages',
  }),
  fromUser: one(user, {
    fields: [message.fromUserId],
    references: [user.id],
    relationName: 'sentMessages',
  }),
}))
