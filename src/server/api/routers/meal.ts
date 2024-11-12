import { meal, mealToRecipe, mealToVegeStack } from '@/server/db/schema/meal'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const mealRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.meal.findMany({
      orderBy: [desc(meal.createdAt)],
      with: {
        mealToVegeStack: {
          with: {
            vegeStack: true,
          },
        },
        mealToRecipe: {
          with: {
            recipe: {
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
      const res = await ctx.db.query.meal.findFirst({
        where: (meal, { eq }) => eq(meal.id, input.id),
        with: {
          mealToVegeStack: {
            with: {
              vegeStack: true,
            },
          },
          mealToRecipe: {
            with: {
              recipe: {
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
              },
            },
          },
        },
      })
      return res
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        notes: z.string(),
        mealCategory: z.string(),
        veges: z
          .object({
            vegeStackId: z.number(),
            note: z.string(),
            calories: z.string(),
          })
          .optional(),
        recipes: z.array(
          z.object({
            recipeId: z.number(),
            note: z.string(),
            index: z.number(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { veges, recipes, ...data } = input
      const res = await ctx.db
        .insert(meal)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: meal.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      const recipeRes = await ctx.db
        .insert(mealToRecipe)
        .values(
          recipes.map((recipe) => ({
            ...recipe,
            mealId: resId,
          })),
        )
        .returning({ id: mealToRecipe.id })

      if (veges) {
        await ctx.db.insert(mealToVegeStack).values({
          ...veges,
          mealId: resId,
        })
      }

      return { res, recipeRes }
    }),
  updateFavourite: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(meal)
        .set({
          favouriteAt: new Date(),
        })
        .where(eq(meal.id, input.id))
      return res
    }),
  deleteFavourite: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(meal)
        .set({
          favouriteAt: null,
        })
        .where(eq(meal.id, input.id))
      return res
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(meal).where(eq(meal.id, input.id))
      return res
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(meal)
    return res
  }),
})
