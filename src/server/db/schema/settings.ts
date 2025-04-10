import { int, sqliteTableCreator, } from 'drizzle-orm/sqlite-core'


import { createTable } from '@/server/db/'

export const settings = createTable(
  'settings',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    isCaloriesWithFibre: int('is_calories_with_fibre', { mode: 'boolean' }),
  },
)

