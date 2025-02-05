'use client'

import { api } from '@/trpc/react'

import { ReactNode, useState } from 'react'

import { cn, getRecipeDetailsByCals } from '@/lib/utils'
import type { GetIngredientById, GetRecipeById } from '@/types'
import { Check, ChevronsUpDown, CirclePlus } from 'lucide-react'
import { UseFormReturn, useFieldArray } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { formSchema } from './form-plan'

export const dynamic = 'force-dynamic'

const Ingredient = ({
  ingredient,
  ratio: r,
  size,
}: {
  ingredient: GetIngredientById | null
  ratio: number
  size: number
}) => {
  const ratio = (size * r) / Number(ingredient?.serveSize)

  if (!ingredient) return null
  return (
    <div className='grid grid-cols-9 gap-1 text-muted-foreground'>
      <div />
      <div className='col-span-3'>{ingredient.name}</div>
      <div>{(Number(size) * ratio).toFixed(0)}</div>
      <div>{(Number(ingredient.caloriesWOFibre) * ratio).toFixed(1)}</div>
      <div>{(Number(ingredient.protein) * ratio).toFixed(1)}</div>
      <div>
        {(
          Number(ingredient.availableCarbohydrateWithSugarAlcohols) * ratio
        ).toFixed(1)}
      </div>
      <div>{(Number(ingredient.fatTotal) * ratio).toFixed(1)}</div>
    </div>
  )
}

const Recipe = ({
  recipeId,
  calories,
}: {
  recipeId: string
  calories: string
}) => {
  const { data: recipes } = api.recipe.getAll.useQuery()
  const recipe = recipes?.find((recipe) => recipe.id === Number(recipeId))
  const recipeDetails = getRecipeDetailsByCals(recipe, Number(calories))
  return (
    <div className='flex flex-col gap-1'>
      <div className='grid grid-cols-9 gap-1 capitalize'>
        <div className='col-span-4 ' />
        <div>size</div>
        <div>cals</div>
        <div>protein</div>
        <div>carbs</div>
        <div>fat</div>
      </div>
      <div className='grid grid-cols-9 gap-1 font-bold'>
        <div className='col-span-4'>{recipe?.name}</div>
        <div>
          {recipeDetails.size} {recipeDetails.unit}
        </div>
        <div>{recipeDetails.cals}</div>
        <div>{recipeDetails.protein}</div>
        <div>{recipeDetails.carbs}</div>
        <div>{recipeDetails.fat} </div>
      </div>
    </div>
  )
}

const FormPlanMeal = ({
  index,
  form,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
}) => {
  const ctx = api.useUtils()
  const allMeals = ctx.meal.getAll.getData()

  const [vege, setVege] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const calories =
    Number(form.watch(`meals.${index}.calories`)) -
    Number(form.watch(`meals.${index}.vegeCalories`))
  const selectedMeal = allMeals?.find((meal) => meal.id === Number(0))

  const recipesField = useFieldArray({
    control: form.control,
    name: `meals.${index}.recipes`,
  })

  if (!allMeals) return <div />

  return (
    <Card
      key={index}
      className='w-full'
    >
      <CardHeader className='pb-2 pt-4'>
        <CardTitle className='text-2xl'>Meal {index + 1}</CardTitle>
      </CardHeader>
      <CardContent className=''>
        <FormField
          control={form.control}
          name={`meals.${index}.mealTitle`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder='Title'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          key={index}
          className='grid grid-cols-5 gap-1 w-full items-center py-2'
        >
          <div className='flex flex-col gap-1'>
            <FormField
              control={form.control}
              name={`meals.${index}.calories`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Calories'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {vege !== '' ? (
              <div className='flex gap-4 flex-col'>
              <FormField
                control={form.control}
                name={`meals.${index}.vegeCalories`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vege Calories</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Veg Calories'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <div className='text-xs text-muted-foreground'>{vege}</div>
              </div>
            ) : null}
          </div>
          <div className='flex flex-col gap-8 col-span-4'>
            {
              recipesField.fields.map((field, index) => (
                <Recipe
                  recipeId={field.recipeId}
                  calories={calories.toFixed(2)}
                  key={index}
                />
              ))
            }
            <CirclePlus
              size={36}
              className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer'
              onClick={() =>
                recipesField.append({
                  recipeId: '',
                  note: '',
                })
              }
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name={`meals.${index}.note`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Input
                  placeholder='Notes'
                  {...field}
                  type='text'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

export { FormPlanMeal }
