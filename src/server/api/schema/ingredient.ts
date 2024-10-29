import { z } from 'zod'

export const createIngredientSchema = z.object({
  name: z.string().min(1),
  serveSize: z.string(),
  serveUnit: z.string().min(1),
  caloriesWFibre: z.string(),
  caloriesWOFibre: z.string(),
  protein: z.string(),
  fatTotal: z.string(),
  totalDietaryFibre: z.string(),
  totalSugars: z.string(),
  starch: z.string(),
  resistantStarch: z.string(),
  availableCarbohydrateWithoutSugarAlcohols: z.string(),
  availableCarbohydrateWithSugarAlcohols: z.string(),
  isAllStores: z.boolean(),
  stores: z.array(z.string()),
})
