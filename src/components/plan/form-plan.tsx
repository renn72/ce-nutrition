'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
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

import { FormPlanMeal } from './form-plan-meal'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  planCategory: z.string(),
  numberOfMeals: z.number(),
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

const FormPlan = () => {
  const ctx = api.useUtils()

  const { mutate: createPlan } = api.plan.create.useMutation({
    onSuccess: () => {
      toast.success('Store added successfully')
    },
  })

  const { data: _allMeals, isLoading: isLoadingAllMeals } = api.meal.getAll.useQuery()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      notes: '',
      planCategory: '',
      numberOfMeals: 1,
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('input', data)
  }

  if (isLoadingAllMeals) return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 mt-10'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
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
              <FormItem>
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
          <div className='w-full'>
            <FormField
              control={form.control}
              name='planCategory'
              render={({ field }) => (
                <FormItem>
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
          </div>
          <div className='w-full'>
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
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
          <div className='flex flex-col gap-4'>
            <h2 className='text-4xl font-bold'>Meals</h2>
            {mealsField.fields.map((field, index) => (
              <FormPlanMeal
                key={field.mealId}
                index={index}
                form={form}
                remove={mealsField.remove}
              />
            ))}
          </div>
          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export { FormPlan }
