import { api } from '@/trpc/react'

import { useState } from 'react'

import { getRecipeDetails } from '@/lib/utils'
import { CircleX, } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import {
  FormControl,
  FormField,
  FormItem,
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

import { formSchema } from './form-meal'

export const dynamic = 'force-dynamic'

const FormMealRecipe = ({
  index,
  form,
  remove,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
}) => {
  const [id, setId] = useState('')
  const { data: recipes } = api.recipe.getAll.useQuery()

  const recipe = recipes?.find((recipe) => recipe.id === Number(id))
  const recipeDetails = getRecipeDetails(recipe)

  return (
    <div
      key={index}
      className='grid gap-2 grid-cols-10 items-center'
    >
      <FormField
        control={form.control}
        name={`recipes.${index}.recipeId`}
        render={({ field }) => (
          <FormItem className='w-full col-span-2'>
            <div className='flex gap-2 items-center'>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setId(value)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Recipe' />
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
      <div>
        {recipeDetails.size} {recipeDetails.unit}
      </div>
      <div>{recipeDetails.cals}</div>
      <div>{recipeDetails.protein}</div>
      <div>{recipeDetails.carbs}</div>
      <div>{recipeDetails.fat} </div>
      <FormField
        control={form.control}
        name={`recipes.${index}.note`}
        render={({ field }) => (
          <FormItem className='w-full col-span-2'>
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
      <FormField
        control={form.control}
        name={`recipes.${index}.index`}
        render={({ field }) => (
          <FormItem className='w-full hidden'>
            <FormControl>
              <Input
                placeholder='Index'
                {...field}
                type='number'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <CircleX
        size={24}
        className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 shrink-0'
        onClick={() => remove(index)}
      />
    </div>
  )
}

export { FormMealRecipe }
