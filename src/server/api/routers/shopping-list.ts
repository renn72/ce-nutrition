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
  unit,
}: {
  ingredientId: number | null
  unit: string | null
}) => `${ingredientId ?? 'unknown'}:${unit ?? ''}`

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
    },
    with: {
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

const getShoppingListWithItems = async (ctx: TRPCContext, listId: number) => {
  return ctx.db.query.shoppingList.findFirst({
    where: eq(shoppingList.id, listId),
    with: {
      items: {
        orderBy: [asc(shoppingListItem.isChecked), asc(shoppingListItem.name)],
      },
    },
  })
}

type ShoppingListWithItems = NonNullable<
  Awaited<ReturnType<typeof getShoppingListWithItems>>
>
type ShoppingListItemRecord = ShoppingListWithItems['items'][number]

const getActiveShoppingList = async (ctx: TRPCContext, userId: string) => {
  return ctx.db.query.shoppingList.findFirst({
    where: and(
      eq(shoppingList.userId, userId),
      eq(shoppingList.isActive, true),
    ),
    with: {
      items: {
        orderBy: [asc(shoppingListItem.isChecked), asc(shoppingListItem.name)],
      },
    },
    orderBy: [desc(shoppingList.updatedAt), desc(shoppingList.createdAt)],
  })
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

      let activeList = await getActiveShoppingList(ctx, input.userId)

      if (!activeList) {
        const activeListId = await createActiveShoppingList({
          ctx,
          userId: input.userId,
        })
        activeList = await getShoppingListWithItems(ctx, activeListId)
      }

      if (!activeList) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Unable to access active shopping list',
        })
      }

      const existingItemsByKey = new Map<string, ShoppingListItemRecord>(
        activeList.items.map((item): [string, ShoppingListItemRecord] => [
          getItemMergeKey({
            ingredientId: item.ingredientId,
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
