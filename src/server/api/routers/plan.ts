import { meal, mealToRecipe } from '@/server/db/schema/meal'
import { plan, planToMeal } from '@/server/db/schema/plan'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { recipe, recipeToIngredient } from '@/server/db/schema/recipe'
import { api } from '~/trpc/server'

export const planRouter = createTRPCRouter({
  getAllSimple: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc(plan.createdAt)],
    })
    return res
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.plan.findMany({
      orderBy: [desc(plan.createdAt)],
      with: {
        creator: true,
        meals: {
          with: {
            mealToRecipe: {
              with: {
                recipe: {
                  with: {
                    recipeToIngredient: {
                      with: {
                        ingredient: true,
                        alternateIngredient: true,
                      },
                    },
                  },
                },
              },
            },
            mealToVegeStack: {
              with: {
                vegeStack: true,
              },
            },
          },
        },
      },
    })
    return res
  }),
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.plan.findFirst({
      where: (plan, { eq }) => eq(plan.id, input),
      with: {
        creator: true,
        meals: {
          with: {
            mealToRecipe: {
              with: {
                recipe: {
                  with: {
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
                },
              },
            },
            mealToVegeStack: {
              with: {
                vegeStack: true,
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
        planCategory: z.string(),
        numberOfMeals: z.number(),
        meals: z.array(
          z.object({
            mealIndex: z.number(),
            mealTitle: z.string(),
            calories: z.string(),
            vegeCalories: z.string(),
            vegeNotes: z.string(),
            vege: z.string(),
            note: z.string(),
            recipes: z.array(
              z.object({
                recipeId: z.number(),
                note: z.string(),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(plan).where(eq(plan.id, input.id))
      const userId = ctx.session.user.id
      const { id, meals, ...data } = input
      const res = await ctx.db
        .insert(plan)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: plan.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      for (const _m of meals) {
        const { recipes, ...m } = _m
        const mealRes = await ctx.db
          .insert(meal)
          .values({
            name: m.mealTitle,
            notes: m.note,
            vegeNotes: m.vegeNotes,
            vege: m.vege,
            vegeCalories: m.vegeCalories,
            planId: resId,
            mealIndex: m.mealIndex,
            calories: m.calories,
            creatorId: userId,
          })
          .returning({ id: meal.id })

        const mealId = mealRes?.[0]?.id || 0

        const recipeRes = await ctx.db
          .insert(mealToRecipe)
          .values(
            recipes.map((recipe, i) => ({
              recipeId: recipe.recipeId,
              index: i,
              note: recipe.note,
              mealId: mealId,
            })),
          )
          .returning({ id: mealToRecipe.id })
      }

      return { res }
    }),
  saveAsPlan: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        notes: z.string(),
        planCategory: z.string(),
        numberOfMeals: z.number(),
        meals: z.array(
          z.object({
            mealIndex: z.number(),
            mealTitle: z.string(),
            calories: z.string(),
            vegeCalories: z.string(),
            vegeNotes: z.string(),
            vege: z.string(),
            note: z.string(),
            recipes: z.array(
              z.object({
                id: z.number(),
                note: z.string(),
                name: z.string(),
                calories: z.string(),
                ingredients: z.array(
                  z.object({
                    ingredientId: z.number(),
                    alternateId: z.number().nullable(),
                    name: z.string(),
                    serve: z.string(),
                    serveUnit: z.string(),
                    note: z.string(),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { meals, ...data } = input

      const recipes = meals.map((meal) => meal.recipes).flat()


      const recipeIdMap = new Map()

      for (const r of recipes) {
       const res = await ctx.db
        .insert(recipe)
        .values({
          name: r.name,
          description: '',
          image: '',
          hiddenAt: new Date(),
          notes: r.note,
          recipeCategory: r.id.toString(),
          calories: Number(r.calories),
          creatorId: userId,
        })
        .returning({ id: recipe.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      recipeIdMap.set(r.id, resId)

      await ctx.db
        .insert(recipeToIngredient)
        .values(
          r.ingredients.map((ingredient, i) => ({
            index: i,
            ingredientId: ingredient.ingredientId,
            alternateId: ingredient.alternateId,
            serveSize: ingredient.serve,
            serveUnit: ingredient.serveUnit,
            note: ingredient.note,
            recipeId: resId,
          })),
        )
    }

      const res = await ctx.db
        .insert(plan)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: plan.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      for (const _m of meals) {
        const { recipes, ...m } = _m
        const mealRes = await ctx.db
          .insert(meal)
          .values({
            name: m.mealTitle,
            notes: m.note,
            vegeNotes: m.vegeNotes,
            vege: m.vege,
            vegeCalories: m.vegeCalories,
            planId: resId,
            mealIndex: m.mealIndex,
            calories: m.calories,
            creatorId: userId,
          })
          .returning({ id: meal.id })

        const mealId = mealRes?.[0]?.id || 0

        const recipeRes = await ctx.db
          .insert(mealToRecipe)
          .values(
            recipes.map((recipe, i) => ({
              recipeId: recipeIdMap.get(recipe.id),
              index: i,
              note: recipe.note,
              mealId: mealId,
            })),
          )
          .returning({ id: mealToRecipe.id })
      }

      return { res }
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        notes: z.string(),
        planCategory: z.string(),
        numberOfMeals: z.number(),
        meals: z.array(
          z.object({
            mealIndex: z.number(),
            mealTitle: z.string(),
            calories: z.string(),
            vegeCalories: z.string(),
            vegeNotes: z.string(),
            vege: z.string(),
            note: z.string(),
            recipes: z.array(
              z.object({
                recipeId: z.number(),
                note: z.string(),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id
      const { meals, ...data } = input
      const res = await ctx.db
        .insert(plan)
        .values({
          ...data,
          creatorId: userId,
        })
        .returning({ id: plan.id })

      const resId = res?.[0]?.id
      if (!resId) return res

      for (const _m of meals) {
        const { recipes, ...m } = _m
        const mealRes = await ctx.db
          .insert(meal)
          .values({
            name: m.mealTitle,
            notes: m.note,
            vegeNotes: m.vegeNotes,
            vege: m.vege,
            vegeCalories: m.vegeCalories,
            planId: resId,
            mealIndex: m.mealIndex,
            calories: m.calories,
            creatorId: userId,
          })
          .returning({ id: meal.id })

        const mealId = mealRes?.[0]?.id || 0

        const recipeRes = await ctx.db
          .insert(mealToRecipe)
          .values(
            recipes.map((recipe, i) => ({
              recipeId: recipe.recipeId,
              index: i,
              note: recipe.note,
              mealId: mealId,
            })),
          )
          .returning({ id: mealToRecipe.id })
      }

      return { res }
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(plan).where(eq(plan.id, input.id))
      return res
    }),
  deleteAll: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(plan)
    return res
  }),
})
