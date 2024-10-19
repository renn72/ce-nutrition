import { z } from 'zod'

export const createIngredientSchema = z.object({
  foodName: z.string().min(1),
  servingSize: z.string(),
  servingUnit: z.string().min(1),
  protein: z.string(),
  fatTotal: z.string(),
  totalDietaryFibre: z.string(),
  totalSugars: z.string(),
  addedSugars: z.string(),
  freeSugars: z.string(),
  starch: z.string(),
  resistantStarch: z.string(),
  availableCarbohydrateWithoutSugarAlcohols: z.string(),
  availableCarbohydrateWithSugarAlcohols: z.string(),
})
