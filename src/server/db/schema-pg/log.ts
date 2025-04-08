import { relations, sql } from 'drizzle-orm'
import {
  date,
  index,
  integer,
  boolean,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const log = createTable('log', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(sql`(unixepoch())`)
    .notNull(),
  objectId: integer('object_id'),
  task: text('task'),
  notes: text('notes'),
  user: text('user'),
  userId: text('user_id'),
})
