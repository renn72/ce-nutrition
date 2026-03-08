import type { UserPlan } from '@/types'
import { z } from 'zod'

export const shoppingListRecipeItemInputSchema = z.object({
  ingredientId: z.number(),
  name: z.string(),
  amount: z.number(),
  unit: z.string(),
  source: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
})

export type ShoppingListRecipeItemInput = z.infer<
  typeof shoppingListRecipeItemInputSchema
>

const roundAmount = (amount: number) => Math.round(amount * 100) / 100

export const toShoppingAmountNumber = (
  amount: number | string | null | undefined,
) => {
  const parsedAmount =
    typeof amount === 'number' ? amount : Number.parseFloat(amount ?? '0')

  if (!Number.isFinite(parsedAmount)) return 0

  return parsedAmount
}

export const formatShoppingUnit = (unit: string) => {
  if (unit === 'each') return 'ea'
  if (unit === 'grams') return 'g'
  return unit
}

export const formatShoppingAmount = (
  amount: number | string | null | undefined,
) => {
  const numericAmount = toShoppingAmountNumber(amount)

  if (Number.isInteger(numericAmount)) return numericAmount.toString()

  return numericAmount
    .toFixed(numericAmount >= 10 ? 1 : 2)
    .replace(/\.0+$/, '')
    .replace(/(\.\d*[1-9])0+$/, '$1')
}

export const formatShoppingQuantity = (
  amount: number | string | null | undefined,
  unit: string | null | undefined,
) => `${formatShoppingAmount(amount)} ${formatShoppingUnit(unit ?? '')}`.trim()

export const getShoppingAmountStep = (unit: string | null | undefined) => {
  if (unit === 'grams') return 10
  return 1
}

export const buildShoppingListItemsFromRecipe = ({
  userPlan,
  mealIndex,
  recipeIndex,
  scale,
}: {
  userPlan: UserPlan
  mealIndex: number | null
  recipeIndex: number | null
  scale: number
}): ShoppingListRecipeItemInput[] => {
  if (!userPlan || !Number.isFinite(scale) || scale <= 0) return []

  const recipe = userPlan.userRecipes.find(
    (currentRecipe) =>
      currentRecipe.mealIndex === mealIndex &&
      currentRecipe.recipeIndex === recipeIndex,
  )

  if (!recipe) return []

  return userPlan.userIngredients.reduce<ShoppingListRecipeItemInput[]>(
    (acc, ingredient) => {
      if (
        ingredient.mealIndex !== mealIndex ||
        ingredient.recipeIndex !== recipeIndex
      ) {
        return acc
      }

      const ingredientId = ingredient.ingredient?.id ?? ingredient.ingredientId
      const amount = roundAmount(scale * Number(ingredient.serve))

      if (!ingredientId || !Number.isFinite(amount) || amount <= 0) {
        return acc
      }

      acc.push({
        ingredientId,
        name: ingredient.name ?? ingredient.ingredient?.name ?? 'Ingredient',
        amount,
        unit: ingredient.serveUnit ?? ingredient.ingredient?.serveUnit ?? '',
        source: recipe.name ?? null,
        note: ingredient.note ?? null,
      })

      return acc
    },
    [],
  )
}
