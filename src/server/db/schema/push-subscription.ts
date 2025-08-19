import { sql } from 'drizzle-orm'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

const createTable = sqliteTable

export const pushSubscription = createTable(
  'push_subscription',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
    subscription: text('subscription').notNull(),
    userId: text('user_id').notNull(),
  },
)
