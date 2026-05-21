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
const GRAMS_PER_POUND = 453.59237
const OUNCES_PER_POUND = 16

export type UserShoppingWeightUnit = 'grams' | 'pounds'

type UserSettingsWithTags =
  | {
      tags?: Array<{
        name: string | null
        state: string | null
      }>
    }
  | null
  | undefined

export function getUserShoppingWeightUnit(
  settings: UserSettingsWithTags,
): UserShoppingWeightUnit {
  const shoppingWeightTag = settings?.tags?.find(
    (tag) => tag.name === 'user_shopping_weight',
  )

  return shoppingWeightTag?.state === 'pounds' ? 'pounds' : 'grams'
}

export const toShoppingAmountNumber = (
  amount: number | string | null | undefined,
) => {
  const parsedAmount =
    typeof amount === 'number' ? amount : Number.parseFloat(amount ?? '0')

  if (!Number.isFinite(parsedAmount)) return 0

  return parsedAmount
}

export const isShoppingWeightUnit = (unit: string | null | undefined) =>
  unit === 'grams' || unit === 'g'

export const gramsToShoppingWeight = (
  amount: number | string | null | undefined,
  unitPreference: UserShoppingWeightUnit,
) => {
  const numericAmount = toShoppingAmountNumber(amount)

  return unitPreference === 'pounds'
    ? numericAmount / GRAMS_PER_POUND
    : numericAmount
}

export const shoppingWeightToGrams = (
  amount: number | string | null | undefined,
  unitPreference: UserShoppingWeightUnit,
) => {
  const numericAmount = toShoppingAmountNumber(amount)

  return unitPreference === 'pounds'
    ? numericAmount * GRAMS_PER_POUND
    : numericAmount
}

export const getShoppingDisplayAmount = (
  amount: number | string | null | undefined,
  unit: string | null | undefined,
  unitPreference: UserShoppingWeightUnit,
) => {
  if (!isShoppingWeightUnit(unit)) return toShoppingAmountNumber(amount)

  return gramsToShoppingWeight(amount, unitPreference)
}

export const getShoppingStorageAmount = (
  amount: number | string | null | undefined,
  unit: string | null | undefined,
  unitPreference: UserShoppingWeightUnit,
) => {
  if (!isShoppingWeightUnit(unit)) return toShoppingAmountNumber(amount)

  return shoppingWeightToGrams(amount, unitPreference)
}

export const getShoppingAmountStep = (
  unit: string | null | undefined,
  unitPreference: UserShoppingWeightUnit = 'grams',
) => {
  if (unit === 'grams')
    return unitPreference === 'pounds' ? 1 / OUNCES_PER_POUND : 10
  if (unit === 'g')
    return unitPreference === 'pounds' ? 1 / OUNCES_PER_POUND : 10
  return 1
}

export const formatShoppingUnit = (
  unit: string,
  unitPreference: UserShoppingWeightUnit = 'grams',
) => {
  if (unit === 'each') return 'ea'
  if (unit === 'grams' || unit === 'g')
    return unitPreference === 'pounds' ? 'lb' : 'g'
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

const formatShoppingImperialWeight = (
  amount: number | string | null | undefined,
) => {
  const totalOunceTenths = Math.round(
    gramsToShoppingWeight(amount, 'pounds') * OUNCES_PER_POUND * 10,
  )
  const pounds = Math.floor(totalOunceTenths / (OUNCES_PER_POUND * 10))
  const ounceTenths = totalOunceTenths % (OUNCES_PER_POUND * 10)
  const ounces = (ounceTenths / 10).toFixed(1)

  if (pounds > 0 && ounceTenths > 0) return `${pounds} lb ${ounces} oz`
  if (pounds > 0) return `${pounds} lb`

  return `${ounces} oz`
}

export const formatShoppingQuantity = (
  amount: number | string | null | undefined,
  unit: string | null | undefined,
  unitPreference: UserShoppingWeightUnit = 'grams',
) => {
  if (isShoppingWeightUnit(unit) && unitPreference === 'pounds') {
    return formatShoppingImperialWeight(amount)
  }

  return `${formatShoppingAmount(
    getShoppingDisplayAmount(amount, unit, unitPreference),
  )} ${formatShoppingUnit(unit ?? '', unitPreference)}`.trim()
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
