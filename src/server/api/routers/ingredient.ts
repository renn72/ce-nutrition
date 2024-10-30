import {
  createIngredientSchema,
  updateIngredientSchema,
} from '@/server/api/schema/ingredient'
import {
  ingredient,
  ingredientToGroceryStore,
} from '@/server/db/schema/ingredient'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { and, desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const ingredientRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.ingredient.findMany({
      where: (ingredient, { isNull, and }) =>
        and(isNull(ingredient.hiddenAt), isNull(ingredient.deletedAt)),
      with: {
        ingredientToGroceryStore: {
          with: {
            groceryStore: true,
          },
        },
      },
      orderBy: [desc(ingredient.createdAt)],
    })
    return res
  }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.ingredient.findFirst({
        where: (ingredient, { eq }) => eq(ingredient.id, input.id),
        with: {
          ingredientToGroceryStore: {
            with: {
              groceryStore: true,
            },
          },
        },
      })
      return res
    }),
  updateHiddenAt: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(ingredient)
        .set({
          hiddenAt: new Date(),
        })
        .where(eq(ingredient.id, input.id))
      console.log(res)
      return res
    }),
  deleteHiddenAt: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(ingredient)
        .set({
          hiddenAt: null,
        })
        .where(eq(ingredient.id, input.id))
      return res
    }),
  updateFavourite: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(ingredient)
        .set({
          favouriteAt: new Date(),
        })
        .where(eq(ingredient.id, input.id))
      return res
    }),
  deleteFavourite: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(ingredient)
        .set({
          favouriteAt: null,
        })
        .where(eq(ingredient.id, input.id))
      return res
    }),
  update: protectedProcedure
    .input(updateIngredientSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { id, stores, ...rest } = input
      console.log({ stores, ...rest })
      const res = await ctx.db
        .update(ingredient)
        .set({
          ...rest,
          userId,
        })
        .where(eq(ingredient.id, id))
        .returning({ id: ingredient.id })

      const ingredientId = res[0]?.id as number

      if (stores.length > 0 && ingredientId) {
        await ctx.db
          .delete(ingredientToGroceryStore)
          .where(eq(ingredientToGroceryStore.ingredientId, ingredientId))
        await ctx.db.insert(ingredientToGroceryStore).values(
          stores.map((store) => ({
            ingredientId,
            groceryStoreId: Number(store),
          })),
        )
      }
      return res
    }),
  create: protectedProcedure
    .input(createIngredientSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { stores, ...rest } = input
      console.log({ stores, ...rest })
      const res = await ctx.db
        .insert(ingredient)
        .values({
          ...rest,
          userId,
        })
        .returning({ id: ingredient.id })

      const ingredientId = res[0]?.id as number

      if (stores.length > 0 && ingredientId) {
        await ctx.db.insert(ingredientToGroceryStore).values(
          stores.map((store) => ({
            ingredientId,
            groceryStoreId: Number(store),
          })),
        )
      }
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .delete(ingredient)
        .where(eq(ingredient.id, input.id))
      return res
    }),
})
