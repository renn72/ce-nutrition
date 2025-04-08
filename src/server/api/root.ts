import { ingredientRouter } from '@/server/api/routers/ingredient'
import { groceryStoreRouter } from '@/server/api/routers/store'
import { testRouter } from '@/server/api/routers/testing'
import { userRouter } from '@/server/api/routers/user'
import { settingsRouter } from '@/server/api/routers/settings'
import { recipeRouter } from '@/server/api/routers/recipe'
import { planRouter } from '@/server/api/routers/plan'
import { mealRouter } from '@/server/api/routers/meal'
import { vegeRouter } from '@/server/api/routers/vege'
import { userPlanRouter } from '@/server/api/routers/user-plan'
import { dailyLogRouter } from '@/server/api/routers/daily-log'
import { weighInRouter } from '@/server/api/routers/weigh-in'
import { messageRouter } from '@/server/api/routers/message'
import { metricsRouter } from '@/server/api/routers/metric'
import { tagRouter } from '@/server/api/routers/tag'
import { migrationRouter } from '@/server/api/routers/migration'

import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  migration: migrationRouter,
  tag: tagRouter,
  dailyLog: dailyLogRouter,
  user: userRouter,
  ingredient: ingredientRouter,
  test: testRouter,
  groceryStore: groceryStoreRouter,
  settings: settingsRouter,
  recipe: recipeRouter,
  plan: planRouter,
  vege: vegeRouter,
  meal: mealRouter,
  userPlan: userPlanRouter,
  weighIn: weighInRouter,
  message: messageRouter,
  metrics: metricsRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
