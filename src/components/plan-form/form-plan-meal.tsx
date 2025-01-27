'use client'

import { api } from '@/trpc/react'

import { ReactNode, useState } from 'react'

import { cn, getRecipeDetailsByCals } from '@/lib/utils'
import type { GetIngredientById, GetRecipeById } from '@/types'
import { Check, ChevronsUpDown } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
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
  recipe,
  calories,
}: {
  recipe: GetRecipeById | null
  calories: string
}) => {
  if (!recipe) return null
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
        <div className='col-span-4'>{recipe.name}</div>
        <div>
          {recipeDetails.size} {recipeDetails.unit}
        </div>
        <div>{recipeDetails.cals}</div>
        <div>{recipeDetails.protein}</div>
        <div>{recipeDetails.carbs}</div>
        <div>{recipeDetails.fat} </div>
      </div>
      {recipe.recipeToIngredient.map((ingredient) => (
        <Ingredient
          key={ingredient.id}
          ingredient={ingredient.ingredient}
          size={Number(ingredient.serveSize)}
          ratio={recipeDetails.ratio}
        />
      ))}
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

  const [isOpen, setIsOpen] = useState(false)

  const mealId = form.watch(`meals.${index}.mealId`)
  const calories = Number(form.watch(`meals.${index}.calories`)) - Number(form.watch(`meals.${index}.vegeCalories`))
  const selectedMeal = allMeals?.find((meal) => meal.id === Number(mealId))

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
              name={`meals.${index}.mealId`}
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Meal</FormLabel>
                  <Popover
                    open={isOpen}
                    onOpenChange={setIsOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'w-full justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          {field.value
                            ? allMeals?.find(
                                (m) => m.id.toString() === field.value,
                              )?.name
                            : 'Select meal'}
                          <ChevronsUpDown className='opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-[300px] p-0'>
                      <Command>
                        <CommandInput
                          placeholder='Search meals...'
                          className='h-9'
                        />
                        <CommandList>
                          <CommandEmpty>No meal found.</CommandEmpty>
                          <CommandGroup>
                            {allMeals.map((meal) => (
                              <CommandItem
                                value={meal.id.toString()}
                                key={meal.id}
                                onSelect={() => {
                                  form.setValue(
                                    `meals.${index}.mealId`,
                                    meal.id.toString(),
                                  )
                                  setIsOpen(false)
                                }}
                              >
                                {meal.name}
                                <Check
                                  className={cn(
                                    'ml-auto',
                                    meal.id.toString() === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name={`meals.${index}.vegeCalories`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calories</FormLabel>
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
          </div>
          <div className='flex flex-col gap-8 col-span-4'>
            {selectedMeal?.mealToRecipe.map((recipe) => (
              <Recipe
                recipe={recipe.recipe}
                calories={calories.toFixed(2)}
                key={recipe.id}
              />
            ))}
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
