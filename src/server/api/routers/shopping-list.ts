import {
  formatShoppingAmount,
  shoppingListRecipeItemInputSchema,
  toShoppingAmountNumber,
} from '@/lib/shopping-list'
import { sendShoppingListEmail } from '@/server/api/utils/send-shopping-list-email'
import {
  shoppingList,
  shoppingListItem,
} from '@/server/db/schema/shopping-list'
import { user } from '@/server/db/schema/user'
import { TRPCError } from '@trpc/server'
import {
  createTRPCContext,
  createTRPCRouter,
  protectedProcedure,
} from '~/server/api/trpc'
import { and, asc, desc, eq } from 'drizzle-orm'
import { z } from 'zod'

type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

const createShoppingListName = () =>
  `Shopping List ${new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date())}`

const createSharedShoppingListName = (
  names: Array<string | null | undefined>,
) => {
  const label = names
    .map((name) => name?.trim())
    .filter((name): name is string => Boolean(name))
    .join(' & ')

  return label
    ? `Shared Shopping List ${new Intl.DateTimeFormat('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date())} - ${label}`
    : `Shared ${createShoppingListName()}`
}

const normalizeShoppingText = (value: string | null | undefined) =>
  value?.trim().toLowerCase() ?? ''

const mergeTextList = (...values: (string | null | undefined)[]) => {
  const mergedValues = Array.from(
    new Set(
      values
        .flatMap((value) => value?.split('\n') ?? [])
        .map((value) => value.trim())
        .filter(Boolean),
    ),
  )

  return mergedValues.length > 0 ? mergedValues.join('\n') : null
}

const getItemMergeKey = ({
  ingredientId,
  name,
  unit,
}: {
  ingredientId: number | null
  name: string | null | undefined
  unit: string | null
}) =>
  `${ingredientId ?? `manual:${normalizeShoppingText(name)}`}:${normalizeShoppingText(unit)}`

type MergeableShoppingItem = {
  ingredientId: number | null
  name: string
  amount: number | string
  unit: string | null
  source?: string | null
  note?: string | null
}

type ShoppingListItemInsert = {
  ingredientId: number | null
  name: string
  amount: string
  unit: string
  source: string | null
  note: string | null
}

const mergeShoppingItems = (items: MergeableShoppingItem[]) => {
  const mergedItems = new Map<
    string,
    ShoppingListItemInsert & { amountNumber: number }
  >()

  for (const item of items) {
    const key = getItemMergeKey({
      ingredientId: item.ingredientId,
      name: item.name,
      unit: item.unit,
    })
    const existingItem = mergedItems.get(key)

    if (!existingItem) {
      mergedItems.set(key, {
        ingredientId: item.ingredientId,
        name: item.name.trim() || 'Ingredient',
        amount: formatShoppingAmount(item.amount),
        amountNumber: toShoppingAmountNumber(item.amount),
        unit: item.unit?.trim() ?? '',
        source: item.source ?? null,
        note: item.note ?? null,
      })
      continue
    }

    existingItem.amountNumber += toShoppingAmountNumber(item.amount)
    existingItem.amount = formatShoppingAmount(existingItem.amountNumber)
    existingItem.source = mergeTextList(existingItem.source, item.source)
    existingItem.note = mergeTextList(existingItem.note, item.note)
  }

  return Array.from(mergedItems.values()).map(
    ({ amountNumber: _amountNumber, ...item }) => ({
      ...item,
    }),
  )
}

const assertAuthenticated = (ctx: TRPCContext) => {
  const sessionUser = ctx.session?.user

  if (!sessionUser) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be signed in to manage shopping lists',
    })
  }

  return sessionUser
}

const assertUserAccess = async (ctx: TRPCContext, userId: string) => {
  const sessionUser = assertAuthenticated(ctx)
  const targetUser = await ctx.db.query.user.findFirst({
    where: eq(user.id, userId),
    columns: {
      id: true,
      name: true,
      email: true,
      partnerId: true,
    },
    with: {
      partner: {
        columns: {
          id: true,
          name: true,
          email: true,
        },
      },
      trainers: {
        columns: {
          trainerId: true,
        },
      },
    },
  })

  if (!targetUser) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'User not found',
    })
  }

  const canAccessUser =
    targetUser.id === sessionUser.id ||
    sessionUser.isAdmin ||
    targetUser.trainers.some((trainer: { trainerId: string }) => {
      return trainer.trainerId === sessionUser.id
    })

  if (!canAccessUser) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have access to this shopping list',
    })
  }

  return targetUser
}

const ensureActiveShoppingList = async (ctx: TRPCContext, userId: string) => {
  let activeList = await getActiveShoppingList(ctx, userId)

  if (activeList) return activeList

  const activeListId = await createActiveShoppingList({
    ctx,
    userId,
  })

  activeList = await getShoppingListWithItems(ctx, activeListId)

  if (!activeList) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to access active shopping list',
    })
  }

  return activeList
}

const getShoppingListWithItems = async (ctx: TRPCContext, listId: number) => {
  return (
    (await ctx.db.query.shoppingList.findFirst({
      where: eq(shoppingList.id, listId),
      with: {
        items: {
          orderBy: [
            asc(shoppingListItem.isChecked),
            asc(shoppingListItem.name),
          ],
        },
      },
    })) ?? null
  )
}

type ShoppingListWithItems = NonNullable<
  Awaited<ReturnType<typeof getShoppingListWithItems>>
>
type ShoppingListItemRecord = ShoppingListWithItems['items'][number]

const getActiveShoppingList = async (ctx: TRPCContext, userId: string) => {
  return (
    (await ctx.db.query.shoppingList.findFirst({
      where: and(
        eq(shoppingList.userId, userId),
        eq(shoppingList.isActive, true),
      ),
      with: {
        items: {
          orderBy: [
            asc(shoppingListItem.isChecked),
            asc(shoppingListItem.name),
          ],
        },
      },
      orderBy: [desc(shoppingList.updatedAt), desc(shoppingList.createdAt)],
    })) ?? null
  )
}

const createActiveShoppingList = async ({
  ctx,
  userId,
  name = createShoppingListName(),
}: {
  ctx: TRPCContext
  userId: string
  name?: string
}) => {
  const sessionUser = assertAuthenticated(ctx)

  await ctx.db
    .update(shoppingList)
    .set({
      isActive: false,
      archivedAt: new Date(),
    })
    .where(
      and(eq(shoppingList.userId, userId), eq(shoppingList.isActive, true)),
    )

  const createdLists = await ctx.db
    .insert(shoppingList)
    .values({
      userId,
      creatorId: sessionUser.id,
      name,
      isActive: true,
      archivedAt: null,
    })
    .returning({ id: shoppingList.id })

  const createdListId = createdLists[0]?.id

  if (!createdListId) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to create shopping list',
    })
  }

  return createdListId
}

const getListItemWithAccess = async (ctx: TRPCContext, itemId: number) => {
  const item = await ctx.db.query.shoppingListItem.findFirst({
    where: eq(shoppingListItem.id, itemId),
    with: {
      shoppingList: true,
    },
  })

  if (!item) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Shopping list item not found',
    })
  }

  await assertUserAccess(ctx, item.shoppingList.userId)

  return item
}

const touchShoppingList = async (ctx: TRPCContext, listId: number) => {
  await ctx.db
    .update(shoppingList)
    .set({
      updatedAt: new Date(),
    })
    .where(eq(shoppingList.id, listId))
}

export const shoppingListRouter = createTRPCRouter({
  getAllForUser: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      await assertUserAccess(ctx, input.userId)

      return ctx.db.query.shoppingList.findMany({
        where: eq(shoppingList.userId, input.userId),
        with: {
          items: {
            orderBy: [
              asc(shoppingListItem.isChecked),
              asc(shoppingListItem.name),
            ],
          },
        },
        orderBy: [
          desc(shoppingList.isActive),
          desc(shoppingList.updatedAt),
          desc(shoppingList.createdAt),
        ],
      })
    }),
  getActive: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      await assertUserAccess(ctx, input.userId)
      return getActiveShoppingList(ctx, input.userId)
    }),
  addRecipe: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        items: z.array(shoppingListRecipeItemInputSchema).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertUserAccess(ctx, input.userId)
      const activeList = await ensureActiveShoppingList(ctx, input.userId)

      const existingItemsByKey = new Map<string, ShoppingListItemRecord>(
        activeList.items.map((item): [string, ShoppingListItemRecord] => [
          getItemMergeKey({
            ingredientId: item.ingredientId,
            name: item.name,
            unit: item.unit,
          }),
          item,
        ]),
      )

      const itemsToInsert: Array<{
        shoppingListId: number
        ingredientId: number
        name: string
        amount: string
        unit: string
        source: string | null
        note: string | null
      }> = []

      for (const incomingItem of input.items) {
        const key = getItemMergeKey({
          ingredientId: incomingItem.ingredientId,
          name: incomingItem.name,
          unit: incomingItem.unit,
        })
        const existingItem = existingItemsByKey.get(key)

        if (!existingItem) {
          itemsToInsert.push({
            shoppingListId: activeList.id,
            ingredientId: incomingItem.ingredientId,
            name: incomingItem.name,
            amount: formatShoppingAmount(incomingItem.amount),
            unit: incomingItem.unit,
            source: incomingItem.source ?? null,
            note: incomingItem.note ?? null,
          })
          continue
        }

        await ctx.db
          .update(shoppingListItem)
          .set({
            amount: formatShoppingAmount(
              toShoppingAmountNumber(existingItem.amount) + incomingItem.amount,
            ),
            isChecked: false,
            source: mergeTextList(existingItem.source, incomingItem.source),
            note: mergeTextList(existingItem.note, incomingItem.note),
          })
          .where(eq(shoppingListItem.id, existingItem.id))
      }

      if (itemsToInsert.length > 0) {
        await ctx.db.insert(shoppingListItem).values(itemsToInsert)
      }

      await touchShoppingList(ctx, activeList.id)

      return getShoppingListWithItems(ctx, activeList.id)
    }),
  addCustomItem: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().trim().min(1),
        amount: z.number().positive(),
        unit: z.string().trim().max(40).optional().default(''),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await assertUserAccess(ctx, input.userId)

      const activeList = await ensureActiveShoppingList(ctx, input.userId)
      const itemKey = getItemMergeKey({
        ingredientId: null,
        name: input.name,
        unit: input.unit,
      })
      const existingItem = activeList.items.find(
        (item) =>
          getItemMergeKey({
            ingredientId: item.ingredientId,
            name: item.name,
            unit: item.unit,
          }) === itemKey,
      )

      if (existingItem) {
        await ctx.db
          .update(shoppingListItem)
          .set({
            amount: formatShoppingAmount(
              toShoppingAmountNumber(existingItem.amount) + input.amount,
            ),
            isChecked: false,
          })
          .where(eq(shoppingListItem.id, existingItem.id))
      } else {
        await ctx.db.insert(shoppingListItem).values({
          shoppingListId: activeList.id,
          ingredientId: null,
          name: input.name.trim(),
          amount: formatShoppingAmount(input.amount),
          unit: input.unit.trim(),
          source: null,
          note: null,
        })
      }

      await touchShoppingList(ctx, activeList.id)

      return getShoppingListWithItems(ctx, activeList.id)
    }),
  mergeWithPartner: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const targetUser = await assertUserAccess(ctx, input.userId)
      const partnerUser = targetUser.partner

      if (!partnerUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This user does not have a linked partner',
        })
      }

      const [activeList, partnerActiveList] = await Promise.all([
        getActiveShoppingList(ctx, targetUser.id),
        getActiveShoppingList(ctx, partnerUser.id),
      ])

      const mergedItems = mergeShoppingItems([
        ...(activeList?.items
          .filter((item) => !item.isChecked)
          .map((item) => ({
            ingredientId: item.ingredientId,
            name: item.name,
            amount: item.amount,
            unit: item.unit,
            source: item.source,
            note: item.note,
          })) ?? []),
        ...(partnerActiveList?.items
          .filter((item) => !item.isChecked)
          .map((item) => ({
            ingredientId: item.ingredientId,
            name: item.name,
            amount: item.amount,
            unit: item.unit,
            source: item.source,
            note: item.note,
          })) ?? []),
      ])

      if (mergedItems.length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'There are no active shopping list items to merge',
        })
      }

      const listName = createSharedShoppingListName([
        targetUser.name,
        partnerUser.name,
      ])

      const [userListId, partnerListId] = await Promise.all([
        createActiveShoppingList({
          ctx,
          userId: targetUser.id,
          name: listName,
        }),
        createActiveShoppingList({
          ctx,
          userId: partnerUser.id,
          name: listName,
        }),
      ])

      await ctx.db.insert(shoppingListItem).values(
        mergedItems.flatMap((item) => [
          {
            shoppingListId: userListId,
            ingredientId: item.ingredientId,
            name: item.name,
            amount: item.amount,
            unit: item.unit,
            isChecked: false,
            source: item.source,
            note: item.note,
          },
          {
            shoppingListId: partnerListId,
            ingredientId: item.ingredientId,
            name: item.name,
            amount: item.amount,
            unit: item.unit,
            isChecked: false,
            source: item.source,
            note: item.note,
          },
        ]),
      )

      return {
        success: true,
        partnerUserId: partnerUser.id,
      }
    }),
  setItemChecked: protectedProcedure
    .input(
      z.object({
        itemId: z.number(),
        checked: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await getListItemWithAccess(ctx, input.itemId)

      await ctx.db
        .update(shoppingListItem)
        .set({
          isChecked: input.checked,
        })
        .where(eq(shoppingListItem.id, item.id))

      await touchShoppingList(ctx, item.shoppingList.id)

      return true
    }),
  updateItemAmount: protectedProcedure
    .input(
      z.object({
        itemId: z.number(),
        amount: z.number().positive(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const item = await getListItemWithAccess(ctx, input.itemId)

      await ctx.db
        .update(shoppingListItem)
        .set({
          amount: formatShoppingAmount(input.amount),
          isChecked: false,
        })
        .where(eq(shoppingListItem.id, item.id))

      await touchShoppingList(ctx, item.shoppingList.id)

      return true
    }),
  deleteItem: protectedProcedure
    .input(z.object({ itemId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const item = await getListItemWithAccess(ctx, input.itemId)

      await ctx.db
        .delete(shoppingListItem)
        .where(eq(shoppingListItem.id, item.id))
      await touchShoppingList(ctx, item.shoppingList.id)

      return true
    }),
  deleteList: protectedProcedure
    .input(z.object({ listId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const list = await getShoppingListWithItems(ctx, input.listId)

      if (!list) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Shopping list not found',
        })
      }

      await assertUserAccess(ctx, list.userId)

      await ctx.db.delete(shoppingList).where(eq(shoppingList.id, list.id))

      return true
    }),
  createNew: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await assertUserAccess(ctx, input.userId)

      const newListId = await createActiveShoppingList({
        ctx,
        userId: input.userId,
      })

      return getShoppingListWithItems(ctx, newListId)
    }),
  duplicate: protectedProcedure
    .input(z.object({ listId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const sourceList = await getShoppingListWithItems(ctx, input.listId)

      if (!sourceList) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Shopping list not found',
        })
      }

      await assertUserAccess(ctx, sourceList.userId)

      const duplicatedListId = await createActiveShoppingList({
        ctx,
        userId: sourceList.userId,
        name: `${sourceList.name} copy`,
      })

      if (sourceList.items.length > 0) {
        await ctx.db.insert(shoppingListItem).values(
          sourceList.items.map((item: ShoppingListItemRecord) => ({
            shoppingListId: duplicatedListId,
            ingredientId: item.ingredientId,
            name: item.name,
            amount: item.amount,
            unit: item.unit,
            isChecked: false,
            source: item.source,
            note: item.note,
          })),
        )
      }

      return getShoppingListWithItems(ctx, duplicatedListId)
    }),
  email: protectedProcedure
    .input(z.object({ listId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const list = await getShoppingListWithItems(ctx, input.listId)

      if (!list) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Shopping list not found',
        })
      }

      const targetUser = await assertUserAccess(ctx, list.userId)

      if (!targetUser.email) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This user does not have an email address',
        })
      }

      if (list.items.length === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'There are no shopping list items to email',
        })
      }

      await sendShoppingListEmail({
        recipientEmail: targetUser.email,
        recipientName: targetUser.name,
        shoppingList: {
          name: list.name,
          updatedAt: list.updatedAt ?? list.createdAt,
          items: list.items.map((item: ShoppingListItemRecord) => ({
            name: item.name,
            amount: item.amount,
            unit: item.unit,
            isChecked: item.isChecked,
            source: item.source,
            note: item.note,
          })),
        },
      })

      await ctx.db
        .update(shoppingList)
        .set({
          updatedAt: new Date(),
          emailedAt: new Date(),
        })
        .where(eq(shoppingList.id, list.id))

      return { success: true }
    }),
})
