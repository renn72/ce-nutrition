'use client'

import { useEffect, useState } from 'react'

import { cn, getRecipeDetailsForUserPlan } from '@/lib/utils'
import type { GetPlanById } from '@/types'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { formSchema } from './create-user-plan'

export const dynamic = 'force-dynamic'

const Ingredient = ({
  form,
  ingredientIndex,
  recipeIndex,
  mealIndex,
  plan,
  setIngredientsSize,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  ingredientIndex: number
  recipeIndex: number
  mealIndex: number
  plan: GetPlanById
  setIngredientsSize: React.Dispatch<React.SetStateAction<number[]>>
}) => {
  const ingredientsField = useFieldArray({
    control: form.control,
    name: `meals.${mealIndex}.recipes.${recipeIndex}.ingredients`,
  })
  const field = ingredientsField.fields[ingredientIndex]
  const size = form.watch(
    `meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`,
  )
  useEffect(() => {
    setIngredientsSize((prev) => {
      return prev.map((curr, index) => {
        if (index === ingredientIndex) {
          return Number(size)
        }
        return curr
      })
    })
  }, [size])
  if (!field) return null

  if (!plan) return null
  const ingredient =
    plan.planToMeal[mealIndex]?.meal?.mealToRecipe[recipeIndex]?.recipe
      ?.recipeToIngredient[ingredientIndex]
  if (!ingredient) return null

  const ratio = Number(size) / Number(ingredient?.ingredient?.serveSize)

  return (
    <div className='grid grid-cols-10 gap-1 text-muted-foreground items-center'>
      <div />
      <div className='col-span-3'>{ingredient.ingredient.name}</div>
      <FormField
        control={form.control}
        name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`}
        render={({ field }) => (
          <FormItem className='w-full col-span-2'>
            <FormControl>
              <div className='w-full flex justify-between items-center gap-2 px-4'>
                <CircleMinus
                  size={20}
                  className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                  onClick={() => {
                    field.onChange((Number(field.value) - 1).toString())
                  }}
                />
                <Input
                  placeholder=''
                  type='number'
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                  }}
                />
                <CirclePlus
                  size={20}
                  className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                  onClick={() => {
                    field.onChange((Number(field.value) + 1).toString())
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div>
        {(Number(ingredient.ingredient.caloriesWFibre) * ratio).toFixed(1)}
      </div>
      <div>{(Number(ingredient.ingredient.protein) * ratio).toFixed(1)}</div>
      <div>
        {(
          Number(ingredient.ingredient.availableCarbohydrateWithSugarAlcohols) *
          ratio
        ).toFixed(1)}
      </div>
      <div>{(Number(ingredient.ingredient.fatTotal) * ratio).toFixed(1)}</div>
    </div>
  )
}

const Recipe = ({
  form,
  mealIndex,
  recipeIndex,
  plan,
  calories,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  mealIndex: number
  recipeIndex: number
  plan: GetPlanById
  calories: string
}) => {
  const recipesField = useFieldArray({
    control: form.control,
    name: `meals.${mealIndex}.recipes`,
  })
  const field = recipesField.fields[recipeIndex]

  if (!field) return null
  if (!plan) return null

  const recipe =
    plan.planToMeal[mealIndex]?.meal?.mealToRecipe[recipeIndex]?.recipe
  if (!recipe) return null
  const [ingredientsSize, setIngredientsSize] = useState<number[]>(() => recipe?.recipeToIngredient.map((ingredient) => Number(ingredient?.serveSize)))
  const recipeDetails = getRecipeDetailsForUserPlan(recipe, ingredientsSize)

  return (
    <div className='flex flex-col gap-1'>
      <div className='grid grid-cols-10 gap-1 capitalize'>
        <div className='col-span-4 ' />
        <div className='col-span-2 place-self-center'>size</div>
        <div>cals</div>
        <div>protein</div>
        <div>carbs</div>
        <div>fat</div>
      </div>
      <div className='grid grid-cols-10 gap-1 font-bold'>
        <div className='col-span-4'>{recipe.name}</div>
        <div className='col-span-2 place-self-center'>
          {recipeDetails.size} {recipeDetails.unit}
        </div>
        <div>{recipeDetails.cals}</div>
        <div>{recipeDetails.protein}</div>
        <div>{recipeDetails.carbs}</div>
        <div>{recipeDetails.fat} </div>
      </div>
      {field.ingredients.map((ingredient, ingredientIndex) => (
        <Ingredient
          key={ingredient.ingredientId}
          form={form}
          ingredientIndex={ingredientIndex}
          recipeIndex={recipeIndex}
          mealIndex={mealIndex}
          plan={plan}
          setIngredientsSize={setIngredientsSize}
        />
      ))}
    </div>
  )
}

export { Recipe }