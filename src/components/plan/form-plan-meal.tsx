'use client'

import { api } from '@/trpc/react'

import { ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetIngredientById, GetRecipeById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import {
  Check,
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDown,
  XCircle,
} from 'lucide-react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Form,
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

const Recipe = ({ recipe, calories, key }: { recipe: GetRecipeById | null, calories: string, key: number }) => {
  if (!recipe) return null
  return (
    <div
      key={key}
      className='flex flex-col gap-1'>
      <div>{recipe.name}</div>
      {
        recipe.recipeToIngredient.map((ingredient) => (
          <div className='flex gap-1'>
            <div>{ingredient.ingredient?.name}</div>
          </div>
        ))
      }
    </div>
  )
}

const FormPlanMeal = ({
  index,
  form,
  remove,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
}) => {
  const ctx = api.useUtils()
  const allMeals = ctx.meal.getAll.getData()

  const [isOpen, setIsOpen] = useState(false)

  const [query, setQuery] = useState('')
  const [queryAlt, setQueryAlt] = useState('')

  const [selected, setSelected] = useState<GetIngredientById | null>(null)
  const [selectedAlt, setSelectedAlt] = useState<GetIngredientById | null>(null)

  const mealId = form.watch(`meals.${index}.mealId`)
  const calories = form.watch(`meals.${index}.calories`)
  const selectedMeal = allMeals?.find((meal) => meal.id === Number(mealId))

  console.log('selectedMeal', selectedMeal)

  if (!allMeals) return <div />

  return (
    <div
      key={index}
      className='grid grid-cols-5 gap-2 w-full items-center'
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
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value
                        ? allMeals?.find((m) => m.id.toString() === field.value)
                            ?.name
                        : 'Select meal'}
                      <ChevronsUpDown className='opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
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
        <FormField
          control={form.control}
          name={`meals.${index}.note`}
          render={({ field }) => (
            <FormItem>
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
      <div className='flex flex-col gap-1 col-span-4'>
        {selectedMeal?.mealToRecipe.map((recipe) => (
          <Recipe recipe={recipe.recipe} calories={calories} key={recipe.id} />
        ))}
      </div>
    </div>
  )
}

export { FormPlanMeal }
