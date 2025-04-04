
import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text, sqliteTable } from 'drizzle-orm/sqlite-core'

import { user } from './user'

// export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const message = sqliteTable(
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
  (e) => {
    return {
      userIdIndex: index('message_user_id_idx').on(e.userId),
      fromUserIdIndex: index('message_from_user_id_idx').on(e.fromUserId),
    }
  },
)

export const messageRelations = relations(
  message,
  ({ one, }) => ({
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
  }),
)
