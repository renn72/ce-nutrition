import { sql } from 'drizzle-orm'
import { int, sqliteTableCreator, text, sqliteTable } from 'drizzle-orm/sqlite-core'

// export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const log = sqliteTable('log', {
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
