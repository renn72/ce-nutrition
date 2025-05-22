import type { GetDailyLogById, GetRecipeById, UserPlan } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { inv, matrix, multiply } from 'mathjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFormattedDate(date: Date | null) {
  const d = new Date(date || '')
  return d.toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getDateFromDate(date: Date) {
  const d = new Date(date)
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
}

export function getAge(birthDate: Date | null, eventDate?: Date | null) {
  if (!eventDate) {
    eventDate = new Date()
  }
  if (!birthDate) {
    return 0
  }
  const age = eventDate.getFullYear() - birthDate.getFullYear()
  const m = eventDate.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && eventDate.getDate() < birthDate.getDate())) {
    return age - 1
  }
  return age
}

export function formatDate(
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Intl.DateTimeFormat('en-AU', {
    month: opts.month ?? 'numeric',
    day: opts.day ?? 'numeric',
    year: opts.year ?? 'numeric',
    ...opts,
  }).format(new Date(date))
}

export function getRecipeDetailsFromDailyLog(
  dailyLog: GetDailyLogById,
  mealIndex: number,
) {

  const ingredients = dailyLog?.dailyMeals.find((meal) => meal.mealIndex === mealIndex)?.ingredients

  const cals = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWFibre)
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const calsWOFibre = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWOFibre)
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0) || 0

  const protein = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.protein) || 0
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize) || 0
    return acc + cal * scale || 0
  }, 0) || 0

  const carbs = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.availableCarbohydrateWithSugarAlcohols) || 0
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize) || 0
    return acc + cal * scale || 0
  }, 0) || 0

  const fat = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.fatTotal) || 0
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize) || 0
    return acc + cal * scale || 0
  }, 0) || 0


  return {
    calsWFibre: cals?.toFixed(0),
    cals: Number(calsWOFibre).toFixed(1),
    protein: Number(protein).toFixed(1),
    carbs: Number(carbs).toFixed(1),
    fat: Number(fat).toFixed(1),
  }
}

export function getRecipeDetailsForDailyLog(
  userPlan: UserPlan,
  recipeId: number,
) {

  const recipeIndex = userPlan?.userRecipes.find((recipe) => recipe.id === recipeId)?.recipeIndex
  const mealIndex = userPlan?.userRecipes.find((recipe) => recipe.id === recipeId)?.mealIndex

  const ingredients = userPlan?.userIngredients.filter((ingredient) => ingredient.recipeIndex === recipeIndex && ingredient.mealIndex === mealIndex)

  const cals = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWFibre)
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const calsWOFibre = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWOFibre)
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0) || 0

  const protein = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.protein) || 0
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize) || 0
    return acc + cal * scale || 0
  }, 0) || 0

  const carbs = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.availableCarbohydrateWithSugarAlcohols) || 0
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize) || 0
    return acc + cal * scale || 0
  }, 0) || 0

  const fat = ingredients?.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.fatTotal) || 0
    const size = Number(curr.serve) || 100
    const scale = size / Number(curr?.ingredient?.serveSize) || 0
    return acc + cal * scale || 0
  }, 0) || 0


  return {
    calsWFibre: cals?.toFixed(1),
    cals: Number(calsWOFibre).toFixed(1),
    protein: Number(protein).toFixed(1),
    carbs: Number(carbs).toFixed(1),
    fat: Number(fat).toFixed(1),
  }
}

export function getRecipeDetailsForUserPlan(
  recipe: GetRecipeById,
  ingredientsSize: number[],
) {
  const size = ingredientsSize.reduce((acc, curr) => {
    return acc + curr
  }, 0)

  const unit = recipe?.ingredients[0]?.ingredient?.serveUnit

  const cals = recipe?.ingredients.reduce((acc, curr, i) => {
    const cal = Number(curr?.ingredient?.caloriesWFibre)
    const size = ingredientsSize[i] || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const calsWOFibre = recipe?.ingredients.reduce((acc, curr, i) => {
    const cal = Number(curr?.ingredient?.caloriesWOFibre)
    const size = ingredientsSize[i] || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const protein = recipe?.ingredients.reduce((acc, curr, i) => {
    const cal = Number(curr?.ingredient?.protein)
    const size = ingredientsSize[i] || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const carbs = recipe?.ingredients.reduce((acc, curr, i) => {
    const cal = Number(
      curr?.ingredient?.availableCarbohydrateWithSugarAlcohols,
    )
    const size = ingredientsSize[i] || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const fat = recipe?.ingredients.reduce((acc, curr, i) => {
    const cal = Number(curr?.ingredient?.fatTotal)
    const size = ingredientsSize[i] || 100
    const scale = size / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  return {
    size: size.toFixed(0),
    unit: unit,
    calsWFibre: cals?.toFixed(0),
    cals: Number(calsWOFibre).toFixed(0),
    protein: Number(protein).toFixed(0),
    carbs: Number(carbs).toFixed(0),
    fat: Number(fat).toFixed(1),
  }
}

export function getRecipeDetailsByCals(
  recipe: GetRecipeById,
  calories: number,
) {
  const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
    return acc + Number(curr?.serveSize)
  }, 0)

  const unit = recipe?.recipeToIngredient[0]?.ingredient?.serveUnit

  const cals = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWFibre)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const calsWOFibre = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWOFibre)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const protein = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.protein)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const carbs = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(
      curr?.ingredient?.availableCarbohydrateWithSugarAlcohols,
    )
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const fat = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.fatTotal)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const ratio = calories / Number(calsWOFibre)

  return {
    size: (Number(size) * ratio).toFixed(0),
    unit: unit,
    calsWFibre: calories?.toFixed(1),
    cals: (Number(calsWOFibre) * ratio).toFixed(1),
    protein: (Number(protein) * ratio).toFixed(1),
    carbs: (Number(carbs) * ratio).toFixed(1),
    fat: (Number(fat) * ratio).toFixed(1),
    ratio: ratio,
  }
}

export function getRecipeDetails(recipe: GetRecipeById) {
  const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
    return acc + Number(curr?.serveSize)
  }, 0)

  const unit = recipe?.recipeToIngredient[0]?.ingredient?.serveUnit

  const cals = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWFibre)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const calsWOFibre = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.caloriesWOFibre)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const protein = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.protein)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const carbs = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(
      curr?.ingredient?.availableCarbohydrateWithSugarAlcohols,
    )
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)

  const fat = recipe?.recipeToIngredient.reduce((acc, curr) => {
    const cal = Number(curr?.ingredient?.fatTotal)
    const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
    return acc + cal * scale
  }, 0)
  return {
    size: size,
    unit: unit,
    calsWFibre: cals?.toFixed(1),
    cals: calsWOFibre?.toFixed(1),
    protein: protein?.toFixed(1),
    carbs: carbs?.toFixed(1),
    fat: fat?.toFixed(1),
  }
}

/**
 * Solves for ingredient quantities to meet calorie and protein targets.
 *
 * @param proteinPerGram - Array of protein contribution per gram for each ingredient.
 * @param caloriesPerGram - Array of calorie contribution per gram for each ingredient.
 * @param targetProtein - Target protein in grams.
 * @param targetCalories - Target calories.
 * @returns Ingredient quantities in grams or an error message.
 */
export function balanceRecipe(
  proteinPerGram: number[],
  caloriesPerGram: number[],
  targetProtein: number,
  targetCalories: number,
): number[] {
  // Validate input lengths
  if (proteinPerGram.length !== caloriesPerGram.length) {
    throw new Error('Protein and calorie arrays must have the same length.')
  }

  const numIngredients = proteinPerGram.length

  // Create the coefficient matrix
  const coefficients = matrix([proteinPerGram, caloriesPerGram])

  // Create the constants vector
  const constants = matrix([targetProtein, targetCalories])

  // Solve using the inverse of the coefficients matrix
  try {
    const solution = multiply(inv(coefficients), constants)
    return solution.toArray() as number[]
  } catch (error) {
    throw new Error('Unable to solve the system. Ensure the inputs are valid.')
  }
}
