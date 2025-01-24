'use client'

import { api } from '@/trpc/react'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const Jamie = () => {
  const ctx = api.useUtils()
  const { data: allMeals } = api.meal.getAll.useQuery()
  const { data: allIngredients } = api.ingredient.getAll.useQuery()
  const { data: allRecipes } = api.recipe.getAll.useQuery()
  const { data: allVegeStacks } = api.vege.getAll.useQuery()
  const { mutate: createIngredient } = api.ingredient.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: createRecipe } = api.recipe.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: createPlan } = api.plan.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: createMeal } = api.meal.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  return <div>jamie</div>
}

export { Jamie }
