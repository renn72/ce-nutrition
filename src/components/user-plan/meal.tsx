'use client'

import { useState } from 'react'

import { balanceRecipe, cn } from '@/lib/utils'
import type { GetPlanById } from '@/types'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { formSchema } from './create-user-plan'
import { Recipe } from './recipe'

export const dynamic = 'force-dynamic'

const Meal = ({
  form,
  index,
  plan,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  index: number
  plan: GetPlanById | null
}) => {
  const mealsField = useFieldArray({
    control: form.control,
    name: 'meals',
  })
  const field = mealsField.fields[index]
  const [calories, setCalories] = useState(
    plan?.planToMeal[index]?.calories || '',
  )
  const formCals = form.watch(`meals.${index}.calories`)
  const formProtien = form.watch(`meals.${index}.protein`)
  const formVege = form.watch(`meals.${index}.vege`)

  const [isVege, setIsVege] = useState(() => formVege !== '')

  const resetMeal = () => {
    form.resetField(`meals.${index}`)
  }
  const balanceCals = () => {
    const meal = plan?.planToMeal[index]?.meal
    if (!meal) return

    for (const [recipeIndex, recipe] of meal.mealToRecipe.entries()) {
      if (
        recipe.recipe?.recipeToIngredient &&
        recipe.recipe?.recipeToIngredient?.length > 0
      ) {
        for (const [
          ingredientIndex,
          ingredient,
        ] of recipe.recipe?.recipeToIngredient.entries()) {
          const serve = (
            (Number(ingredient.serveSize) * Number(calories)) /
            Number(recipe.recipe?.calories)
          ).toFixed(2)
          form.setValue(
            `meals.${index}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`,
            serve,
          )
        }
      }
    }
  }
  const balanceCalsProtien = () => {
    const meal = plan?.planToMeal[index]?.meal
    if (!meal) return
    if (Number(formProtien) == 0) return

    for (const [recipeIndex, recipe] of meal.mealToRecipe.entries()) {
      const calsPerGram = recipe.recipe?.recipeToIngredient.map(
        (ingredient) =>
          Number(ingredient.ingredient.caloriesWOFibre) /
          Number(ingredient.ingredient.serveSize),
      )
      const proteinPerGram = recipe.recipe?.recipeToIngredient.map(
        (ingredient) =>
          Number(ingredient.ingredient.protein) /
          Number(ingredient.ingredient.serveSize),
      )
      const carbsPerGram = recipe.recipe?.recipeToIngredient.map(
        (ingredient) =>
          Number(ingredient.ingredient.availableCarbohydrateWithSugarAlcohols) /
          Number(ingredient.ingredient.serveSize),
      )
      if (!calsPerGram || !proteinPerGram || !carbsPerGram) return
      if (calsPerGram.length == 2 && proteinPerGram.length == 2) {
        try {
          const serve = balanceRecipe(
            proteinPerGram,
            calsPerGram,
            Number(formProtien),
            Number(formCals),
          )
          if (!serve) return
          if (serve.length != 2) return
          const value1 = Number(serve[0]).toFixed(2)
          const value2 = Number(serve[1]).toFixed(2)
          form.setValue(
            `meals.${index}.recipes.${recipeIndex}.ingredients.0.serveSize`,
            // @ts-ignore
            value1,
          )
          form.setValue(
            `meals.${index}.recipes.${recipeIndex}.ingredients.1.serveSize`,
            // @ts-ignore
            value2,
          )
        } catch (error) {
          console.log('error', error)
        }
      } else {
        if (calsPerGram.length == 1) return
        if (proteinPerGram.length == 1) return

        const indexCals = carbsPerGram.findIndex(
          (cals) => cals == Math.max(...carbsPerGram),
        )
        const indexProtein = proteinPerGram.findIndex(
          (protein) => protein == Math.max(...proteinPerGram),
        )
        const indexs = calsPerGram
          .map((_, i) => i)
          .filter((i) => !(i == indexCals || i == indexProtein))

        const calsToRemove = calsPerGram.reduce((acc, curr, i) => {
          if (indexs.includes(i)) {
            return (
              acc +
              Number(
                form.getValues(
                  `meals.${index}.recipes.${recipeIndex}.ingredients.${i}.serveSize`,
                ),
              ) *
                Number(curr)
            )
          }
          return acc
        }, 0)
        const proteinToRemove = proteinPerGram.reduce((acc, curr, i) => {
          if (indexs.includes(i)) {
            return (
              acc +
              Number(
                form.getValues(
                  `meals.${index}.recipes.${recipeIndex}.ingredients.${i}.serveSize`,
                ),
              ) *
                Number(curr)
            )
          }
          return acc
        }, 0)

        if (indexCals == -1 || indexProtein == -1) return
        if (indexCals === indexProtein) return
        try {
          const serve = balanceRecipe(
            proteinPerGram.filter(
              (_, i) => i == indexProtein || i == indexCals,
            ),
            calsPerGram.filter((_, i) => i == indexProtein || i == indexCals),
            Number(formProtien) - proteinToRemove,
            Number(formCals) - calsToRemove,
          )
          if (!serve) return
          if (serve.length != 2) return
          const value1 = Number(serve[0]).toFixed(2)
          const value2 = Number(serve[1]).toFixed(2)
          const i = calsPerGram
            .map((_, i) => i)
            .filter((i) => i == indexCals || i == indexProtein)
          const index1 = i[0] as number
          const index2 = i[1] as number
          form.setValue(
            `meals.${index}.recipes.${recipeIndex}.ingredients.${index1}.serveSize`,
            // @ts-ignore
            value1,
          )
          form.setValue(
            `meals.${index}.recipes.${recipeIndex}.ingredients.${index2}.serveSize`,
            // @ts-ignore
            value2,
          )
        } catch (error) {
          console.log('error', error)
        }
      }
    }
  }

  if (!field) return null
  if (!plan) return null

  return (
    <Card>
      <CardHeader className='pb-0 flex flex-row justify-between'>
        <CardTitle className='text-xl font-medium'>Meal {index + 1}</CardTitle>
        <Button
          variant='secondary'
          onClick={resetMeal}
        >
          Reset
        </Button>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 w-full py-4'>
        <div className='flex gap-2 items-center'>
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
          <FormField
            control={form.control}
            name={`meals.${index}.targetCalories`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Calories</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Calories'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`meals.${index}.targetProtein`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Protein</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Protein'
                    {...field}
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
              <FormItem className='w-full'>
                <FormLabel>Note</FormLabel>
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
        </div>
        <div className='flex gap-4 items-center w-full tracking-tighter'>
          <div className='flex gap-2 flex-col items-center'>
          <Label>Veg</Label>
          <Checkbox
            checked={isVege}
            onCheckedChange={(e) => {
              setIsVege(e === true)
            }}
          />
          </div>
          <div className={cn('flex gap-2 items-center w-full', !isVege && 'hidden')}>
            <FormField
              control={form.control}
              name={`meals.${index}.vege`}
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Veg</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Veg'
                      {...field}
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
                <FormItem className=''>
                  <FormLabel>Veg Calories</FormLabel>
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
            <FormField
              control={form.control}
              name={`meals.${index}.vegeNotes`}
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Veg Notes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Notes'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='grid grid-cols-5 gap-2 w-full items-center '>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-col gap-2 px-2 py-4 rounded-md border border-border'>
              <div className='flex gap-1 flex-col items-center'>
                <Label>Calories</Label>
                <div className='w-full flex justify-between items-center gap-4'>
                  <CircleMinus
                    size={24}
                    className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                    onClick={() => {
                      setCalories((Number(calories) - 1).toString())
                      form.setValue(
                        `meals.${index}.calories`,
                        (Number(calories) - 1).toString(),
                      )
                    }}
                  />
                  <Input
                    placeholder='Calories'
                    type='number'
                    value={calories}
                    onChange={(e) => {
                      setCalories(e.target.value)
                      form.setValue(`meals.${index}.calories`, e.target.value)
                    }}
                  />
                  <CirclePlus
                    size={24}
                    className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                    onClick={() => {
                      setCalories((Number(calories) + 1).toString())
                      form.setValue(
                        `meals.${index}.calories`,
                        (Number(calories) + 1).toString(),
                      )
                    }}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name={`meals.${index}.protein`}
                render={({ field }) => (
                  <FormItem className='flex flex-col items-center'>
                    <FormLabel className=''>Protein</FormLabel>
                    <FormControl>
                      <div className='w-full flex justify-between items-center gap-4'>
                        <CircleMinus
                          size={24}
                          className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                          onClick={() =>
                            field.onChange(Number(field.value) - 1)
                          }
                        />
                        <Input
                          placeholder='Protein'
                          {...field}
                          type='number'
                        />
                        <CirclePlus
                          size={24}
                          className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                          onClick={() =>
                            field.onChange(Number(field.value) + 1)
                          }
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant='outline'
                onClick={(e) => {
                  e.preventDefault()
                  balanceCals()
                }}
              >
                Balance Cals
              </Button>
              <Button
                variant='outline'
                onClick={(e) => {
                  e.preventDefault()
                  balanceCalsProtien()
                }}
              >
                Balance Cal+Protien
              </Button>
            </div>
          </div>

          <div className='flex flex-col gap-8 col-span-4 select-none'>
            {field.recipes.map((_recipe, recipeIndex) => (
              <Recipe
                key={recipeIndex}
                form={form}
                mealIndex={index}
                recipeIndex={recipeIndex}
                plan={plan}
                calories={formCals}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { Meal }
