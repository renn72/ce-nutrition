import { recipe, recipeToIngredient } from '@/server/db/schema/recipe'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const recipeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.recipe.findMany({
      where: (recipe, { eq }) => eq(recipe.isUserRecipe, false),
      orderBy: [desc(recipe.createdAt)],
      with: {
        creator: true,
        recipeToIngredient: {
          with: {
            alternateIngredient: true,
            ingredient: {
              with: {
                ingredientToGroceryStore: {
                  with: {
                    groceryStore: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return res
  }),
  get: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const res = await ctx.db.query.recipe.findFirst({
        where: (recipe, { eq }) => eq(recipe.id, input.id),
        with: {
          recipeToIngredient: {
            with: {
              ingredient: {
                with: {
                  ingredientToGroceryStore: {
                    with: {
                      groceryStore: true,
                    },
                  },
                },
              },
            },
          },
        },
      })
      return res
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        image: z.string(),
        notes: z.string(),
        recipeCategory: z.string(),
        calories: z.number(),
        isUserRecipe: z.boolean().optional(),
        ingredients: z.array(
          z.object({
            ingredientId: z.number(),
            alternateId: z.string(),
            note: z.string(),
            serveSize: z.string(),
            serveUnit: z.string(),
            index: z.number(),
            isAlternate: z.boolean().optional(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { ingredients, ...data } = input
      const res = await ctx.db
        .update(recipe)
        .set(data)
        .where(eq(recipe.id, input.id))
        .returning({ id: recipe.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      await ctx.db
        .delete(recipeToIngredient)
        .where(eq(recipeToIngredient.recipeId, resId))

      const ingredientsRes = await ctx.db
        .insert(recipeToIngredient)
        .values(
          ingredients.map((ingredient) => ({
            index: ingredient.index,
            ingredientId: ingredient.ingredientId,
            isAlternate: ingredient.isAlternate,
            alternateId: ingredient.alternateId === '' ? null : Number(ingredient.alternateId),
            serveSize: ingredient.serveSize,
            serveUnit: ingredient.serveUnit,
            note: ingredient.note,
            recipeId: resId,
          })),
        )
        .returning({ id: recipeToIngredient.id })
      return { res, ingredientsRes }
    }),
  duplicate: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const recipeRes = await ctx.db.query.recipe.findFirst({
        where: eq(recipe.id, input.id),
        with: {
          recipeToIngredient: {
          },
        },
      })
      if (!recipeRes) return
      const { recipeToIngredient :ingredients, id, createdAt, updatedAt, ...data } = recipeRes
      const res = await ctx.db
        .insert(recipe)
        .values({
          ...data,
          name: `${data.name}-copy`,
          creatorId: userId,
        })
        .returning({ id: recipe.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      const ingredientsRes = await ctx.db
        .insert(recipeToIngredient)
        .values(
          ingredients.map((ingredient) => ({
            index: ingredient.index,
            ingredientId: ingredient.ingredientId,
            alternateId: ingredient.alternateId,
            serveSize: ingredient.serveSize,
            serveUnit: ingredient.serveUnit,
            note: ingredient.note,
            recipeId: resId,
          })),
        )
        .returning({ id: recipeToIngredient.id })
      return { res, ingredientsRes }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        notes: z.string(),
        recipeCategory: z.string(),
        calories: z.number(),
        isUserRecipe: z.boolean().optional(),
        ingredients: z.array(
          z.object({
            ingredientId: z.number(),
            alternateId: z.string(),
            note: z.string(),
            serveSize: z.string(),
            serveUnit: z.string(),
            index: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { ingredients, ...data } = input
      const res = await ctx.db
        .insert(recipe)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: recipe.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      const ingredientsRes = await ctx.db
        .insert(recipeToIngredient)
        .values(
          ingredients.map((ingredient) => ({
            index: ingredient.index,
            ingredientId: ingredient.ingredientId,
            alternateId: ingredient.alternateId === '' ? null : Number(ingredient.alternateId),
            serveSize: ingredient.serveSize,
            serveUnit: ingredient.serveUnit,
            note: ingredient.note,
            recipeId: resId,
          })),
        )
        .returning({ id: recipeToIngredient.id })
      return { res, ingredientsRes }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(recipe).where(eq(recipe.id, input.id))
      return res
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(recipe)
    return res
  }),
})
