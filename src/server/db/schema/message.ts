
import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTableCreator, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

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
    title: text('title'),
    subject: text('subject'),
    isRead: int('is_read', { mode: 'boolean' }),
    isViewed: int('is_viewed', { mode: 'boolean' }),
    isDeleted: int('is_deleted', { mode: 'boolean' }),
    message: text('message'),
  },
  (e) => {
    return {
      userIdIndex: index('message_user_id_idx').on(e.userId),
    }
  },
)

export const messageRelations = relations(
  message,
  ({ one, }) => ({
    user: one(user, {
      fields: [message.userId],
      references: [user.id],
    }),
  }),
)
