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

import { FormRecipeIngredient } from './form-recipe-ingredient'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  planCategory: z.string(),
  numberOfMeals: z.number(),
  veges: z.array(
    z.object({
      vegeStackId: z.number(),
      note: z.string(),
      mealNumber: z.number(),
      calories: z.string(),
    }),
  ),
  recipes: z.array(
    z.object({
      recipeId: z.number(),
      note: z.string(),
      index: z.number(),
      mealNumber: z.number(),
      calories: z.string(),
    }),
  ),
})

const FormPlan = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ctx = api.useUtils()
  const { data: allRecipes } = api.recipe.getAll.useQuery()
  const { data: allVeges } = api.vege.getAll.useQuery()

  const { mutate: createPlan } = api.plan.create.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      toast.success('Store added successfully')
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      notes: '',
      planCategory: '',
      numberOfMeals: 0,
      veges: [],
      recipes: [],
    },
  })
  const recipesField  = useFieldArray({
    control: form.control,
    name: 'recipes',
  })
  const vegesField  = useFieldArray({
    control: form.control,
    name: 'veges',
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('input', data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
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
          <div className='flex flex-col gap-4'>
            <h2>Meals</h2>
          </div>
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
          <div className='flex justify-between gap-4'>
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
