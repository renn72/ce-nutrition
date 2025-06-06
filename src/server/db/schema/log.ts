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
