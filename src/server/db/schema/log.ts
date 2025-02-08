import { sql } from 'drizzle-orm'
import {
  int,
  sqliteTableCreator,
  text,
} from 'drizzle-orm/sqlite-core'

export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const log = createTable(
  'log',
  {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
  task: text('task'),
  notes: text('notes'),
  user: text('user'),
  },
)
