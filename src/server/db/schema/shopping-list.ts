import { relations, sql } from 'drizzle-orm'
import { index, int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { ingredient } from './ingredient'
import { user } from './user'

const createTable = sqliteTable

export const shoppingList = createTable(
  'shopping_list',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
    userId: text('user_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    creatorId: text('creator_id')
      .references(() => user.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    name: text('name').notNull(),
    isActive: int('is_active', { mode: 'boolean' }).default(true).notNull(),
    archivedAt: int('archived_at', { mode: 'timestamp' }),
    emailedAt: int('emailed_at', { mode: 'timestamp' }),
  },
  (table) => [
    index('shopping_list_user_id_idx').on(table.userId),
    index('shopping_list_creator_id_idx').on(table.creatorId),
    index('shopping_list_user_active_idx').on(table.userId, table.isActive),
  ],
)

export const shoppingListItem = createTable(
  'shopping_list_item',
  {
    id: int('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    createdAt: int('created_at', { mode: 'timestamp' })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int('updated_at', { mode: 'timestamp' }).$onUpdate(
      () => new Date(),
    ),
    shoppingListId: int('shopping_list_id')
      .references(() => shoppingList.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    ingredientId: int('ingredient_id').references(() => ingredient.id, {
      onDelete: 'set null',
    }),
    name: text('name').notNull(),
    amount: text('amount').notNull(),
    unit: text('unit').notNull(),
    isChecked: int('is_checked', { mode: 'boolean' }).default(false).notNull(),
    source: text('source'),
    note: text('note'),
  },
  (table) => [
    index('shopping_list_item_list_id_idx').on(table.shoppingListId),
    index('shopping_list_item_ingredient_id_idx').on(table.ingredientId),
  ],
)

export const shoppingListRelations = relations(
  shoppingList,
  ({ one, many }) => ({
    user: one(user, {
      fields: [shoppingList.userId],
      references: [user.id],
      relationName: 'shoppingLists',
    }),
    creator: one(user, {
      fields: [shoppingList.creatorId],
      references: [user.id],
      relationName: 'shoppingListsCreator',
    }),
    items: many(shoppingListItem),
  }),
)

export const shoppingListItemRelations = relations(
  shoppingListItem,
  ({ one }) => ({
    shoppingList: one(shoppingList, {
      fields: [shoppingListItem.shoppingListId],
      references: [shoppingList.id],
    }),
    ingredient: one(ingredient, {
      fields: [shoppingListItem.ingredientId],
      references: [ingredient.id],
    }),
  }),
)
