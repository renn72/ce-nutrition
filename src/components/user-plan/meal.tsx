'use client'

import { useState } from 'react'

import { cn, getRecipeDetailsByCals } from '@/lib/utils'
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

  const resetMeal = () => {
    form.resetField(`meals.${index}`)
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
        >Reset</Button>
      </CardHeader>
      <CardContent className='flex flex-col gap-2 w-full py-4'>
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
        <div className='grid grid-cols-5 gap-2 w-full items-center '>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'>
              <Label>Calories</Label>
              <div>{formCals}</div>
            </div>
            <div className='flex flex-col gap-2 p-2 rounded-md border border-border'>
              <div>
                <div className='w-full flex justify-between items-center gap-4'>
                  <CircleMinus
                    size={24}
                    className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                    onClick={() => {
                      setCalories((Number(calories) - 1).toString())
                    }}
                  />
                  <Input
                    placeholder='Calories'
                    type='number'
                    value={calories}
                    onChange={(e) => {
                      setCalories(e.target.value)
                    }}
                  />
                  <CirclePlus
                    size={24}
                    className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
                    onClick={() => {
                      setCalories((Number(calories) + 1).toString())
                    }}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name={`meals.${index}.protein`}
                render={({ field }) => (
                  <FormItem>
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
                }}
              >
                Balance Cal/Protien
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
        <div className='flex gap-4 justify-between'>
          <FormField
            control={form.control}
            name={`meals.${index}.vegeCalories`}
            render={({ field }) => (
              <FormItem className='w-full'>
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
      </CardContent>
    </Card>
  )
}

export { Meal }
