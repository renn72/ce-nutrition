import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './user'

const createTable = sqliteTable

export const aiInsight = createTable(
  'ai_insight',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, {
        onDelete: 'cascade',
      }),
    rangeDays: int('range_days', { mode: 'number' }).notNull(),
    rangeLabel: text('range_label').notNull(),
    rangeStart: text('range_start').notNull(),
    rangeEnd: text('range_end').notNull(),
    sourceLogCount: int('source_log_count', { mode: 'number' }).notNull(),
    model: text('model').notNull(),
    content: text('content').notNull(),
  },
  (table) => [
    index('ai_insight_user_id_idx').on(table.userId),
    index('ai_insight_created_at_idx').on(table.createdAt),
  ],
)

export const aiInsightRelations = relations(aiInsight, ({ one }) => ({
  user: one(user, {
    fields: [aiInsight.userId],
    references: [user.id],
  }),
}))
