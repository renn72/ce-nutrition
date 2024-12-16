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
      mealId: z.string(),
      mealTitle: z.string(),
      calories: z.string(),
      vegeCalories: z.string(),
      note: z.string(),
    }),
  ),
})

const FormPlan = ({ plan }: { plan: GetPlanById | null }) => {
  const ctx = api.useUtils()

  const { mutate: createPlan } = api.plan.create.useMutation({
    onSuccess: () => {
      toast.success('Store added successfully')
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
      meals: plan?.planToMeal?.map((planToMeal) => ({
        mealId: planToMeal.meal?.id.toString(),
        mealTitle: planToMeal.meal?.name || '',
        calories:
          planToMeal.meal?.mealToRecipe?.[0]?.recipe?.calories.toString() || '',
        vegeCalories:
          planToMeal.meal?.mealToVegeStack?.[0]?.vegeStack?.calories || '',
        note: planToMeal.meal?.mealToRecipe?.[0]?.note || '',
        mealIndex: planToMeal.mealIndex,
      })) || [
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createPlan({
      name: data.name,
      description: data.description,
      image: data.image,
      notes: data.notes,
      planCategory: data.planCategory,
      numberOfMeals: data.meals.length,
      meals: data.meals.map((meal, i) => ({
        mealId: Number(meal.mealId),
        mealIndex: i + 1,
        mealTitle: meal.mealTitle,
        calories: meal.calories,
        vegeCalories: meal.vegeCalories,
        note: meal.note,
      })),
    })
  }

  if (isLoadingAllMeals) return null

  return (
    <div className='my-10 flex flex-col gap-4'>
      <BackButton />
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
                    <FormLabel>Recipe Description</FormLabel>
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
              <h2 className='text-3xl font-bold text-center'>Meals</h2>
              <div className='flex flex-col gap-4'>
                {mealsField.fields.map((field, index) => (
                  <FormPlanMeal
                    key={field.mealId}
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
                      mealId: '',
                      mealTitle: (mealsField.fields.length + 1).toString(),
                      calories: '500',
                      vegeCalories: '',
                      note: '',
                    })
                  }
                />
              </div>
            </div>
            <div>
              <Button type='submit'>Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { FormPlan }
