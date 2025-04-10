import { int, sqliteTable } from 'drizzle-orm/sqlite-core'

const createTable = sqliteTable

export const settings = createTable('settings', {
  id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  isCaloriesWithFibre: int('is_calories_with_fibre', { mode: 'boolean' }),
})
