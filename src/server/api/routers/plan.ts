import { plan, planToMeal } from '@/server/db/schema/plan'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

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
        planToMeal: {
          with: {
            meal: {
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
        },
      },
    })
    return res
  }),
  get: protectedProcedure.input(z.number()).query(async ({ input, ctx }) => {
    const res = await ctx.db.query.plan.findFirst({
      where: (plan, { eq }) => eq(plan.id, input),
      with: {
        planToMeal: {
          with: {
            meal: {
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
            mealId: z.number(),
            mealIndex: z.number(),
            mealTitle: z.string(),
            calories: z.string(),
            vegeCalories: z.string(),
            note: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { meals, ...data } = input
      const res = await ctx.db
        .update(plan)
        .set(data)
        .where(eq(plan.id, input.id))

      await ctx.db.delete(planToMeal).where(eq(planToMeal.planId, input.id))
      const mealRes = await ctx.db
        .insert(planToMeal)
        .values(
          meals.map((meal) => ({
            ...meal,
            planId: input.id,
          })),
        )
        .returning({ id: planToMeal.id })

      return { res, mealRes }
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
            mealId: z.number(),
            mealIndex: z.number(),
            mealTitle: z.string(),
            calories: z.string(),
            vegeCalories: z.string(),
            note: z.string(),
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
      const mealRes = await ctx.db
        .insert(planToMeal)
        .values(
          meals.map((meal) => ({
            ...meal,
            planId: resId,
          })),
        )
        .returning({ id: planToMeal.id })

      return { res, mealRes }
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
