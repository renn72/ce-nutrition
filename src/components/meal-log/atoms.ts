import { atomWithStorage } from 'jotai/utils'

export const isAllMealsAtom = atomWithStorage('isAllMeals', false)

export const selectedPlansAtom = atomWithStorage('selectedPlans', [''])
