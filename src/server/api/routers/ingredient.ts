import { createIngredientSchema } from '@/server/api/schema/ingredient'
import {
  ingredient,
  ingredientToGroceryStore,
} from '@/server/db/schema/ingredient'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const ingredientRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.number().optional())
    .query(async ({ input, ctx }) => {
      if (input) {
        const res = await ctx.db.query.ingredient.findMany({
          limit: input,
          columns: {
            id: true,
            foodName: true,
            createdAt: true,
          },
          orderBy: [desc(ingredient.createdAt)],
        })
      }
      const res = await ctx.db.query.ingredient.findMany({
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
  create: protectedProcedure
    .input(createIngredientSchema)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { stores, ...rest } = input
      const res = await ctx.db.insert(ingredient).values({
        ...rest,
        userId,
      })
      console.log(res)
      if (stores) {
        // await ctx.db
        //   .insert(ingredientToGroceryStore)
        //   .values({
        //     ingredientId: res[0].id as number,
        //     groceryStoreId: stores,
        //   })
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
