import { type SQL } from "drizzle-orm"

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

import { appRouter } from '~/server/api/root'

type RouterInputs = inferRouterInputs<typeof appRouter>
type RouterOutputs = inferRouterOutputs<typeof appRouter>

export type GetAllIngredients = RouterOutputs['ingredient']['getAll']
export type GetIngredientById = RouterOutputs['ingredient']['get']

export type GetAllGroceryStores = RouterOutputs['groceryStore']['getAll']
export type GetGroceryStoreById = RouterOutputs['groceryStore']['get']

export type GetAllUsers = RouterOutputs['user']['getAll']
export type GetUserById = RouterOutputs['user']['get']

export type GetAllRecipes = RouterOutputs['recipe']['getAll']
export type GetRecipeById = RouterOutputs['recipe']['get']

export type GetAllMeals = RouterOutputs['meal']['getAll']
export type GetMealById = RouterOutputs['meal']['get']

export type GetAllPlans = RouterOutputs['plan']['getAll']
export type GetPlanById = RouterOutputs['plan']['get']

export type UserPlan = RouterOutputs['userPlan']['get']
