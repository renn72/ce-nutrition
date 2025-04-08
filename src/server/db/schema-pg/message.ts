import { relations, sql } from 'drizzle-orm'
import {
  boolean,
  date,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

import { user } from './user'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const message = createTable('message', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(new Date().getTime().toString())
    .notNull(),
  userId: text('user_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
  subject: text('subject'),
  isImportant: boolean('is_important'),
  isRead: boolean('is_read'),
  isViewed: boolean('is_viewed'),
  isDeleted: boolean('is_deleted'),
  message: text('message'),
  image: text('image'),
  fromUserId: text('from_user_id').references(() => user.id, {
    onDelete: 'cascade',
  }),
})

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
