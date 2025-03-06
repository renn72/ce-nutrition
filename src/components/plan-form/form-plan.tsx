'use client'

import { api } from '@/trpc/react'

import { GetPlanById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { BackButton } from '../back-button'
import { FormPlanMeal } from './form-plan-meal'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  planCategory: z.string(),
  meals: z.array(
    z.object({
      mealTitle: z.string(),
      calories: z.string(),
      vegeCalories: z.string().optional(),
      vegeNotes: z.string().optional(),
      vege: z.string().optional(),
      note: z.string(),
      recipes: z.array(
        z.object({
          recipeId: z.string(),
          note: z.string(),
        }),
      ),
    }),
  ),
})

const FormPlan = ({ plan }: { plan: GetPlanById | null }) => {
  const ctx = api.useUtils()

  const { mutate: createPlan } = api.plan.create.useMutation({
    onSuccess: () => {
      toast.success('Plan added successfully')
      ctx.plan.getAll.invalidate()
    },
  })
  const { mutate: updatePlan } = api.plan.update.useMutation({
    onSuccess: () => {
      toast.success('Plan updated successfully')
      ctx.plan.getAll.invalidate()
    },
  })

  const { data: _allMeals, isLoading: isLoadingAllMeals } =
    api.meal.getAll.useQuery()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: plan?.name || '',
      description: plan?.description || '',
      image: plan?.image || '',
      notes: plan?.notes || '',
      planCategory: plan?.planCategory || '',
      meals: plan?.meals?.map((meal) => ({
        mealId: meal?.id.toString(),
        mealTitle: meal?.name || '',
        calories: meal?.mealToRecipe?.[0]?.recipe?.calories.toString() || '',
        vegeCalories: meal?.mealToVegeStack?.[0]?.vegeStack?.calories || '',
        note: meal?.mealToRecipe?.[0]?.note || '',
        mealIndex: meal.mealIndex,
        recipes: meal.mealToRecipe?.map((recipe) => ({
          recipeId: recipe?.recipeId?.toString(),
          note: recipe?.note || '',
        })),
      })) || [
        {
          mealTitle: '1',
          calories: '500',
          vegeCalories: '',
          note: '',
          recipes: [
            {
              recipeId: '',
              note: '',
            },
          ],
        },
      ],
    },
  })
  const mealsField = useFieldArray({
    control: form.control,
    name: 'meals',
  })

  console.log(form.getValues())

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (plan?.id) {
      updatePlan({
        id: plan.id,
        name: data.name,
        description: data.description,
        image: data.image,
        notes: data.notes,
        planCategory: data.planCategory,
        numberOfMeals: data.meals.length,
        meals: data.meals.map((meal, i) => ({
          mealIndex: i + 1,
          mealTitle: meal.mealTitle,
          calories: meal.calories,
          vegeCalories: meal.vegeCalories || '',
          vegeNotes: meal.vegeNotes || '',
          vege: meal.vege || '',
          note: meal.note,
          recipes: meal.recipes.map((recipe) => ({
            recipeId: Number(recipe.recipeId),
            note: recipe.note,
          })),
        })),
      })
    } else {
      createPlan({
        name: data.name,
        description: data.description,
        image: data.image,
        notes: data.notes,
        planCategory: data.planCategory,
        numberOfMeals: data.meals.length,
        meals: data.meals.map((meal, i) => ({
          mealIndex: i + 1,
          mealTitle: meal.mealTitle,
          calories: meal.calories,
          vegeCalories: meal.vegeCalories || '',
          vegeNotes: meal.vegeNotes || '',
          vege: meal.vege || '',
          note: meal.note,
          recipes: meal.recipes.map((recipe) => ({
            recipeId: Number(recipe.recipeId),
            note: recipe.note,
          })),
        })),
      })
    }
  }

  if (isLoadingAllMeals) return null

  return (
    <div className='my-1 flex flex-col gap-2 p-2'>
      <BackButton />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-1 '>
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
                name='planCategory'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Plan Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Category'
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
                name='image'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Image TODO</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Image'
                        {...field}
                        type='text'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex justify-between gap-8'>
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
            <div className='flex flex-col gap-1 mt-4'>
              <h2 className='text-3xl font-bold text-center'>Meals</h2>
              <div className='flex flex-col gap-2'>
                {mealsField.fields.map((field, index) => (
                  <FormPlanMeal
                    key={index}
                    index={index}
                    form={form}
                    remove={mealsField.remove}
                  />
                ))}
              </div>
              <div className='w-full flex justify-center mt-8'>
                <PlusCircle
                  size={36}
                  className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer'
                  onClick={() =>
                    mealsField.append({
                      mealTitle: (mealsField.fields.length + 1).toString(),
                      calories: '500',
                      vegeCalories: '',
                      note: '',
                      recipes: [
                        {
                          recipeId: '',
                          note: '',
                        },
                      ],
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Button type='submit'>{ plan?.id ? 'Update' : 'Submit' }</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { FormPlan }
