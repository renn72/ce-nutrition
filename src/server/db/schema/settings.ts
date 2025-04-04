import { int, sqliteTable} from 'drizzle-orm/sqlite-core'

export const settings = sqliteTable(
  'settings',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    isCaloriesWithFibre: int('is_calories_with_fibre', { mode: 'boolean' }),
  },
)

