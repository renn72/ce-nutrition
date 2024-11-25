'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  planCategory: z.string(),
  meals: z.array(
    z.object({
      mealId: z.string(),
      mealTitle: z.string(),
      calories: z.string(),
      protein: z.string(),
      vegeCalories: z.string(),
      note: z.string(),
      recipes: z.array(
        z.object({
          recipeId: z.string(),
          name: z.string(),
          note: z.string(),
          description: z.string(),
          index: z.number(),
          ingredients: z.array(
            z.object({
              ingredientId: z.string(),
              name: z.string(),
              serveSize: z.string(),
              serveUnit: z.string(),
              note: z.string(),
            }),
          ),
        }),
      ),
    }),
  ),
})

const PlanSelect = ({
  selectedPlan,
  onSetPlan,
}: {
  selectedPlan: string
  onSetPlan: (planId: string) => void
}) => {
  const ctx = api.useUtils()
  const allPlans = ctx.plan.getAllSimple.getData()

  const [open, setOpen] = useState(false)
  if (!allPlans) return null
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between my-2 capitalize'
        >
          {selectedPlan
            ? allPlans.find((plan) => plan.id.toString() === selectedPlan)?.name
            : 'Select plan...'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {allPlans.map((plan) => (
                <CommandItem
                  className='capitalize'
                  key={plan.id}
                  value={plan.id.toString()}
                  onSelect={(currentValue) => {
                    onSetPlan(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedPlan === plan.id.toString()
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {plan.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const Recipe = ({
  form,
  mealIndex,
  recipeIndex,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  mealIndex: number
  recipeIndex: number
}) => {
  const recipesField = useFieldArray({
    control: form.control,
    name: `meals.${mealIndex}.recipes`,
  })
  const field = recipesField.fields[recipeIndex]

  if (!field) return null

  return (
    <div className='flex flex-col gap-1 w-full ml-4'>
      <FormField
        control={form.control}
        name={`meals.${mealIndex}.recipes.${recipeIndex}.name`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder='Name'
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
        name={`meals.${mealIndex}.recipes.${recipeIndex}.note`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Input
                placeholder='Note'
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
        name={`meals.${mealIndex}.recipes.${recipeIndex}.description`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Input
                placeholder='Description'
                {...field}
                type='text'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {field.ingredients.map((ingredient, ingredientIndex) => (
        <Ingredient
          key={ingredient.ingredientId}
          form={form}
          ingredientIndex={ingredientIndex}
          recipeIndex={recipeIndex}
          mealIndex={mealIndex}
        />
      ))}
    </div>
  )
}

const Ingredient = ({
  form,
  ingredientIndex,
  recipeIndex,
  mealIndex,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  ingredientIndex: number
  recipeIndex: number
  mealIndex: number
}) => {
  const ingredientsField = useFieldArray({
    control: form.control,
    name: `meals.${mealIndex}.recipes.${recipeIndex}.ingredients`,
  })
  const field = ingredientsField.fields[ingredientIndex]
  if (!field) return null

  return (
    <div className='flex flex-col gap-1 w-full ml-4'>
      <FormField
        control={form.control}
        name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.name`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder='Name'
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
        name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Serve Size</FormLabel>
            <FormControl>
              <Input
                placeholder='Serve Size'
                {...field}
                type='numer'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveUnit`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Serve Unit</FormLabel>
            <FormControl>
              <Input
                placeholder='Serve Unit'
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
        name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.note`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Note</FormLabel>
            <FormControl>
              <Input
                placeholder='Note'
                {...field}
                type='text'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

const Meal = ({
  form,
  index,
}: {
  form: UseFormReturn<z.infer<typeof formSchema>>
  index: number
}) => {
  const mealsField = useFieldArray({
    control: form.control,
    name: 'meals',
  })
  const field = mealsField.fields[index]

  if (!field) return null

  return (
    <div className='flex flex-col gap-1 w-full'>
      <FormField
        control={form.control}
        name={`meals.${index}.mealTitle`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input
                placeholder='Meal'
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
        name={`meals.${index}.calories`}
        render={({ field }) => (
          <FormItem className='w-full'>
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
        name={`meals.${index}.protein`}
        render={({ field }) => (
          <FormItem className='w-full'>
            <FormLabel>Protein</FormLabel>
            <FormControl>
              <Input
                placeholder=''
                {...field}
                type='numer'
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {field.recipes.map((recipe, recipeIndex) => (
        <Recipe
          key={recipe.recipeId}
          form={form}
          mealIndex={index}
          recipeIndex={recipeIndex}
        />
      ))}
    </div>
  )
}

const CreateUserPlan = () => {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''

  const [selectedPlanId, setSelectedPlanId] = useState('')

  const { data: allPlans } = api.plan.getAll.useQuery()
  const { data: currentUser } = api.user.get.useQuery(user)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      notes: '',
      meals: [
        {
          mealId: '',
          mealTitle: '1',
          calories: '500',
          vegeCalories: '',
          note: '',
        },
      ],
    },
  })
  const mealsField = useFieldArray({
    control: form.control,
    name: 'meals',
  })

  const onSetPlan = (planId: string) => {
    setSelectedPlanId(planId)
    const selectedPlan = allPlans?.find((plan) => plan.id === Number(planId))
    console.log('selectedPlan', selectedPlan)
    form.reset({
      name: selectedPlan?.name || '',
      description: selectedPlan?.description || '',
      image: selectedPlan?.image || '',
      notes: selectedPlan?.notes || '',
      meals:
        selectedPlan?.planToMeal.map((meal, mealIndex) => ({
          mealId: mealIndex.toString(),
          mealTitle: meal.mealTitle || '',
          calories: meal.calories || '',
          vegeCalories: meal.vegeCalories || '',
          note: meal.note || '',
          recipes:
            meal?.meal?.mealToRecipe.map((recipe, recipeIndex) => ({
              recipeId: recipeIndex.toString(),
              name: recipe.recipe?.name || '',
              note: recipe.note || '',
              description: recipe.recipe?.description || '',
              index: recipe.index,
              ingredients:
                recipe?.recipe?.recipeToIngredient.map(
                  (ingredient, ingredientIndex) => ({
                    ingredientId: ingredientIndex.toString(),
                    name: ingredient.ingredient?.name || '',
                    serveSize: ingredient.serveSize,
                    serveUnit: ingredient.serveUnit,
                    note: ingredient.note || '',
                  }),
                ) || [],
            })) || [],
        })) || [],
    })
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('input', data)
  }

  return (
    <div className='flex min-h-screen flex-col max-w-screen-lg w-full my-12'>
      <PlanSelect
        selectedPlan={selectedPlanId}
        onSetPlan={onSetPlan}
      />
      {selectedPlanId === '' ? null : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 '>
              <div className='flex justify-between gap-8'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Name'
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
                  name='description'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Description'
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
                  name='notes'
                  render={({ field }) => (
                    <FormItem className='w-full'>
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
              </div>
              <div className='flex flex-col gap-2 mt-4'>
                <h2 className='text-2xl font-bold'>Meals</h2>
                <div className='flex flex-col gap-0 divide-1 divide-y divide-dashed divide-border'>
                  {mealsField.fields.map((field, index) => (
                    <Meal
                      key={field.mealId}
                      index={index}
                      form={form}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Button type='submit'>Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export { CreateUserPlan }
