import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  date,
  index,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

import { user } from './user'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const notification = createTable(
  'notification',
  {
    id: serial().primaryKey(),
    createdAt: date('created_at')
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id').references(() => user.id, {
      onDelete: 'cascade',
    }),
    title: text('title'),
    description: text('description'),
    isRead: boolean('is_read'),
    isViewed: boolean('is_viewed'),
    isDeleted: boolean('is_deleted'),
    notes: text('notes'),
  },
  (e) => {
    return [index('notification_user_id_idx').on(e.userId)]
  },
)

export const notificationRelations = relations(notification, ({ one }) => ({
  user: one(user, {
    fields: [notification.userId],
    references: [user.id],
  }),
}))
