'use client'

import { api } from '@/trpc/react'

import { ReactNode, useState } from 'react'

import { cn, getRecipeDetailsByCals } from '@/lib/utils'
import type { GetIngredientById, GetRecipeById } from '@/types'
import { Check, ChevronsUpDown, CirclePlus, CircleX } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import { formSchema } from './form-plan'
import { Textarea } from '@/components/ui/textarea'

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
  calories,
  form,
  mealIndex,
  recipeIndex,
  remove,
}: {
  calories: string
  form: UseFormReturn<z.infer<typeof formSchema>>
  mealIndex: number
  recipeIndex: number
  remove: (index: number) => void
}) => {
  const { data: recipes } = api.recipe.getAll.useQuery()
  const recipeId = form.watch(
    `meals.${mealIndex}.recipes.${recipeIndex}.recipeId`,
  )
  const recipe = recipes?.find((recipe) => recipe.id === Number(recipeId))
  const recipeDetails = getRecipeDetailsByCals(recipe, Number(calories))

  return (
    <div className='grid grid-cols-9 gap-1 py-1 items-center text-sm relative'>
      <FormField
        control={form.control}
        name={`meals.${mealIndex}.recipes.${recipeIndex}.recipeId`}
        render={({ field }) => (
          <FormItem className='w-full col-span-4'>
            <div className='flex gap-2 items-center max-w-sm'>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className='border-none shadow-none focus:ring-0 bg-transparent'>
                    <SelectValue placeholder='Pick a recipe' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {recipes?.map((recipe) => (
                    <SelectItem
                      key={recipe.id}
                      value={recipe.id.toString()}
                    >
                      {recipe.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      {recipe?.name && (
        <>
          <div>
            {recipeDetails.size} {recipeDetails.unit?.slice(0, 1)}
          </div>
          <div>{recipeDetails.cals}</div>
          <div>{recipeDetails.protein}</div>
          <div>{recipeDetails.carbs}</div>
          <div>{recipeDetails.fat} </div>
        </>
      )}
      <CircleX
        size={20}
        className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer absolute right-0 top-1/2 -translate-y-1/2'
        onClick={() =>
          remove(recipeIndex)
        }
      />
    </div>
  )
}

const FormPlanMeal = ({
  index,
  form,
  remove : removeMeal,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
}) => {
  const ctx = api.useUtils()
  const allMeals = ctx.meal.getAll.getData()

  const [isVege, setIsVege] = useState(false)

  const calories =
    Number(form.watch(`meals.${index}.calories`)) -
    Number(form.watch(`meals.${index}.vegeCalories`))
  const selectedMeal = allMeals?.find((meal) => meal.id === Number(0))

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `meals.${index}.recipes`,
  })



  if (!allMeals) return <div />

  return (
    <Card
      key={index}
      className='w-full'
    >
      <CardHeader className='pb-2 pt-4 bg-background  w-full'>
        <div className='flex w-full justify-between'>
        <CardTitle className='text-2xl'>Meal {index + 1}</CardTitle>
        <CircleX
          size={24}
          className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer'
          onClick={() =>
            removeMeal(index)
          }
        />
        </div>
      </CardHeader>
      <CardContent className='bg-background'>
        <div
          key={index}
          className='grid grid-cols-5 gap-1 w-full py-2 '
        >
          <div className='flex flex-col gap-2'>
            <FormField
              control={form.control}
              name={`meals.${index}.mealTitle`}
              render={({ field }) => (
                <FormItem className=''>
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
            <div className='flex gap-2 items-center'>
              <Label>Vege</Label>
              <Checkbox
                checked={isVege}
                onCheckedChange={(e) => {
                  setIsVege(e === true)
                  if (e === true) {
                    form.setValue(`meals.${index}.vege`, 'Lettuce, Onion, Green Beans, Zucchini, Kale, Spinach, Broccoli, Cauliflower, Capsicum, Cucumber')
                    form.setValue(`meals.${index}.vegeCalories`, '50')
                    form.setValue(`meals.${index}.vegeNotes`, '2 Cups')
                  } else {
                    form.setValue(`meals.${index}.vegeCalories`, '')
                    form.setValue(`meals.${index}.vege`, '')
                    form.setValue(`meals.${index}.vegeNotes`, '')
                  }
                }}
              />
            </div>
            {isVege && (
              <>
                <FormField
                  control={form.control}
                  name={`meals.${index}.vegeCalories`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veg Calories</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Veg Calories'
                          type='number'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`meals.${index}.vege`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veg</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Veg'
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`meals.${index}.vegeNotes`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Veg Notes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Veg Notes'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className='flex flex-col gap-0 col-span-4 ml-4 divide-y divide-border'>
            <div className='grid grid-cols-9 gap-1 capitalize py-1'>
              <div className='col-span-4 ' />
              <div>size</div>
              <div>cals</div>
              <div>protein</div>
              <div>carbs</div>
              <div>fat</div>
            </div>
            {fields.map((field, recipeIndex) => (
              <Recipe
                mealIndex={index}
                recipeIndex={recipeIndex}
                form={form}
                calories={calories.toFixed(2)}
                key={field.id}
                remove={remove}
              />
            ))}
            <div className='flex justify-center w-full pt-4'>
              <CirclePlus
                size={20}
                className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer'
                onClick={() =>
                  append({
                    recipeId: '',
                    note: '',
                  })
                }
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { FormPlanMeal }
