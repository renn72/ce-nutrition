'use client'

import { useEffect, useState } from 'react'

import {Button} from '@/components/ui/button'
import { cn, getRecipeDetailsForUserPlan } from '@/lib/utils'
import type { GetPlanById } from '@/types'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { useFieldArray, type UseFormReturn, type UseFieldArrayReturn } from 'react-hook-form'
import type { z } from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import type { formSchema } from './create-user-plan'

export const dynamic = 'force-dynamic'

const Ingredient = ({
  ingredient,
  form,
  ingredientIndex,
  recipeIndex,
  mealIndex,
  plan,
  setIngredientsSize,
  ingredientsField,
}: {
  ingredient: any
  form: UseFormReturn<z.infer<typeof formSchema>>
  ingredientIndex: number
  recipeIndex: number
  mealIndex: number
  plan: GetPlanById
  setIngredientsSize: React.Dispatch<React.SetStateAction<number[]>>
  ingredientsField: UseFieldArrayReturn<z.infer<typeof formSchema>['meals']>
}) => {

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

  const ratio = Number(size) / Number(ingredient?.ingredient?.serveSize)

  return (
    <div className='flex flex-col gap-1'>
      <div className='grid md:grid-cols-10 grid-cols-8 md:gap-1 text-muted-foreground items-center'>
        <div className='md:col-span-4 col-span-2 md:ml-2'>{ingredient.ingredient.name}</div>
        <FormField
          control={form.control}
          name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`}
          render={({ field }) => (
            <FormItem className='w-full col-span-2'>
              <FormControl>
                <div className='w-full flex justify-between items-center gap-2 px-2'>
                  <CircleMinus
                    size={20}
                    className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0 hidden md:block'
                    onClick={() => {
                      field.onChange(
                        (Math.ceil(Number(field.value)) - 1).toString(),
                      )
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
                    className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0 hidden md:block'
                    onClick={() => {
                      field.onChange(
                        (Math.floor(Number(field.value)) + 1).toString(),
                      )
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {(Number(ingredient.ingredient.caloriesWOFibre) * ratio).toFixed(1)}
        </div>
        <div>{(Number(ingredient.ingredient.protein) * ratio).toFixed(1)}</div>
        <div>
          {(
            Number(
              ingredient.ingredient.availableCarbohydrateWithSugarAlcohols,
            ) * ratio
          ).toFixed(1)}
        </div>
        <div>{(Number(ingredient.ingredient.fatTotal) * ratio).toFixed(1)}</div>
      </div>
      {ingredient.alternateId && ingredient.alternateIngredient ? (
        <div className='grid grid-cols-10 gap-1 text-muted-foreground items-center text-sm'>
          <div className='col-span-4 truncate ml-4'>
            or {ingredient.alternateIngredient?.name}
          </div>
          <div className='place-self-center col-span-2'>
            {(
              ((Number(ingredient.ingredient.caloriesWOFibre) * ratio) /
                Number(ingredient.alternateIngredient?.caloriesWOFibre)) *
              Number(ingredient.alternateIngredient?.serveSize)
            ).toFixed(1)}
            g
          </div>
        </div>
      ) : null}
    </div>
  )
}

const Recipe = ({
  form,
  mealIndex,
  recipeIndex,
  plan,
  calories,
  recipesField,
  recipe,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  mealIndex: number
  recipeIndex: number
  plan: GetPlanById
  calories: string
  recipesField: UseFieldArrayReturn
  recipe: any
}) => {

  const ingredientsField = useFieldArray({
    control: form.control,
    name: `meals.${mealIndex}.recipes.${recipeIndex}.ingredients`,
  })


  const [ingredientsSize, setIngredientsSize] = useState<number[]>(() =>
    recipe.ingredients.map((ingredient) =>
      Number(ingredient?.serveSize),
    ) || [],
  )
  const recipeDetails = getRecipeDetailsForUserPlan(recipe, ingredientsSize)

  return (
    <div className='flex flex-col gap-1 border rounded-md p-2 relative'>
      <div className='absolute top-1 left-2 text-xs text-muted-foreground'>
        {recipeIndex + 1}
      </div>
      <div className='grid md:grid-cols-10 grid-cols-8 md:gap-1 capitalize place-items-center'>
        <div className='md:col-span-4 col-span-2 ' />
        <div className='col-span-2 place-self-center'>size</div>
        <div>cals</div>
        <div>protein</div>
        <div>carbs</div>
        <div>fat</div>
      </div>
      <div className='grid md:grid-cols-10 grid-cols-8 md:gap-1 font-bold'>
        <div className='md:col-span-4 col-span-2 flex gap-2 justify-between'>
          <div>
          {recipe?.name}
          </div>
          <Button
            variant='destructive'
            size='icon'
            className='rounded-full shrink-0 text-[0.7rem] h-5 w-6'
            onClick={(e) => {
              e.preventDefault()
              recipesField.remove(recipeIndex)
            }}
          >
            Del
          </Button>
        </div>
        <div className='col-span-2 place-self-center'>
        </div>
        <div
          className='text-center bg-secondary rounded-full place-self-center px-6'
        >{recipeDetails.cals}</div>
        <div

          className='text-center bg-secondary rounded-full place-self-center px-6'
        >{recipeDetails.protein}</div>
        <div
          className='text-center bg-secondary rounded-full place-self-center px-6'
        >{recipeDetails.carbs}</div>
        <div
          className='text-center bg-secondary rounded-full place-self-center px-6'
        >{recipeDetails.fat} </div>
      </div>
      {ingredientsField.fields.map((ingredient, ingredientIndex) => (
        <Ingredient
          key={ingredient.ingredientId}
          form={form}
          ingredientIndex={ingredientIndex}
          ingredient={ingredient}
          recipeIndex={recipeIndex}
          mealIndex={mealIndex}
          plan={plan}
          setIngredientsSize={setIngredientsSize}
          ingredientsField={ingredientsField}
        />
      ))}
    </div>
  )
}

export { Recipe }
