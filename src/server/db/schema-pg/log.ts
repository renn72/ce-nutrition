import { sql } from 'drizzle-orm'
import {
  date,
  integer,
  pgTableCreator,
  serial,
  text,
} from 'drizzle-orm/pg-core'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const log = createTable('log', {
  id: serial().primaryKey(),
  createdAt: date('created_at')
    .default(new Date().getTime().toString())
    .notNull(),
  objectId: integer('object_id'),
  task: text('task'),
  notes: text('notes'),
  user: text('user'),
  userId: text('user_id'),
})
