import type { GetRecipeById } from '@/types'
import { clsx, type ClassValue } from 'clsx'
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
      curr?.ingredient?.availableCarbohydrateWithoutSugarAlcohols,
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
    cals: cals?.toFixed(1),
    calsWOFibre: calsWOFibre?.toFixed(1),
    protein: protein?.toFixed(1),
    carbs: carbs?.toFixed(1),
    fat: fat?.toFixed(1),
  }
}
