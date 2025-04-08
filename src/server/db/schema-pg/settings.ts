import { boolean, pgTableCreator, serial } from 'drizzle-orm/pg-core'

const createTable = pgTableCreator((name) => `nutrition_${name}`)

export const settings = createTable('settings', {
  id: serial().primaryKey(),
  isCaloriesWithFibre: boolean('is_calories_with_fibre'),
  isPosing: boolean('is_posing'),
})
