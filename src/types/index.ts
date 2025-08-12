import type {  SQL } from "drizzle-orm"

export interface SearchParams {
  [key: string]: string | string[] | undefined
}

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
  withCount?: boolean
}

export interface DataTableFilterField<TData> {
  label: string
  value: keyof TData
  placeholder?: string
  options?: Option[]
}

export interface DataTableFilterOption<TData> {
  id: string
  label: string
  value: keyof TData
  options: Option[]
  filterValues?: string[]
  filterOperator?: string
  isMulti?: boolean
}

export type DrizzleWhere<T> =
  | SQL<unknown>
  | ((aliases: T) => SQL<T> | undefined)
  | undefined


import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import type { appRouter } from '~/server/api/root'

type RouterInputs = inferRouterInputs<typeof appRouter>
type RouterOutputs = inferRouterOutputs<typeof appRouter>

export type GetAllIngredients = RouterOutputs['ingredient']['getAll']
export type GetIngredientById = RouterOutputs['ingredient']['get']

export type GetAllSupplements = RouterOutputs['supplement']['getAll']
export type GetSupplementById = RouterOutputs['supplement']['getSupplement']
export type GetFullSupplementById = RouterOutputs['supplement']['getFullSupplement']

export type GetAllGroceryStores = RouterOutputs['groceryStore']['getAll']
export type GetGroceryStoreById = RouterOutputs['groceryStore']['get']

export type GetAllUsers = RouterOutputs['user']['getAll']
export type GetUserBasic = RouterOutputs['user']['getBasic']
export type GetUserById = RouterOutputs['user']['getGaurenteed']

export type GetAllRecipes = RouterOutputs['recipe']['getAll']
export type GetRecipeById = RouterOutputs['recipe']['get']

export type GetAllMeals = RouterOutputs['meal']['getAll']
export type GetMealById = RouterOutputs['meal']['get']

export type GetAllPlans = RouterOutputs['plan']['getAll']
export type GetPlanById = RouterOutputs['plan']['get']

export type UserPlan = RouterOutputs['userPlan']['get']

export type GetUserGoals = RouterOutputs['goal']['getUser']
export type GetGoal = RouterOutputs['goal']['get']

export type UserMeal = RouterOutputs['userPlan']['getMeal']
export type UserRecipe = RouterOutputs['userPlan']['getRecipe']
export type UserIngredient = RouterOutputs['userPlan']['getIngredient']

export type GetSimpleDailyLogById = RouterOutputs['dailyLog']['getSimple']
export type GetAllDailyLogs = RouterOutputs['dailyLog']['getAllUser']
export type GetDailyLogById = RouterOutputs['dailyLog']['get']

export type GetAllWeighIns = RouterOutputs['weighIn']['getAllUser']
export type GetWeighInById = RouterOutputs['weighIn']['get']

export type GetSkinfoldById = RouterOutputs['metrics']['getSkinfold']
export type GetUserSkinfolds = RouterOutputs['metrics']['getUserSkinfolds']

export type GetSupplementFromStack = RouterOutputs['supplement']['getSuppFromPlan']

export type GetAllTrainerNotes = RouterOutputs['trainerNotes']['getAllUser']
export type GetTrainerNoteById = RouterOutputs['trainerNotes']['get']

export type GetNotifications = RouterOutputs['user']['getNotifications']
