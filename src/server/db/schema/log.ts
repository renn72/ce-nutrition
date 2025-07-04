import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'


const createTable = sqliteTable

export const log = createTable('log', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  objectId: int('object_id'),
  task: text('task'),
  notes: text('notes'),
  user: text('user'),
  userId: text('user_id'),
})

export const logNew = createTable('log_new', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  createdAt: int('created_at', { mode: 'timestamp' })
    .default(sql`(unixepoch())`)
    .notNull(),
  input: text('input'),
  type: text('type'),
  path: text('path'),
  duration: int('duration'),
  source: text('source'),
  info: text('info'),
  error: text('error'),
  user: text('user'),
  userId: text('user_id'),
})
