import { int, sqliteTableCreator, } from 'drizzle-orm/sqlite-core'


export const createTable = sqliteTableCreator((name) => `ce-nu_${name}`)

export const settings = createTable(
  'settings',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    isCaloriesWithFibre: int('is_calories_with_fibre', { mode: 'boolean' }),
  },
)

