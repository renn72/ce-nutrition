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
  recipeCategory: z.string(),
  ingredients: z.array(
    z.object({
      index: z.number(),
      ingredientId: z.string(),
      isProtein: z.boolean(),
      isCarbohydrate: z.boolean(),
      isFat: z.boolean(),
      note: z.string(),
      serveSize: z.string(),
      serveUnit: z.string(),
      isAlternate: z.boolean().optional(),
      alternateId: z.string(),
    }),
  ),
})

const FormRecipe = () => {
  const ctx = api.useUtils()
  const { data: allIngredients } = api.ingredient.getAll.useQuery()
  const { mutate: createRecipe } = api.recipe.create.useMutation({
    onSuccess: () => {
      ctx.recipe.invalidate()
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
      recipeCategory: '',
      ingredients: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })
  const ingredients = form.watch('ingredients')

  const sizeTotal = ingredients.reduce((acc, ingredient) => {
    return acc + Number(ingredient.serveSize)
  }, 0)

  const calorieTotal = ingredients
    .reduce((acc, ingredient) => {
      const i = allIngredients?.find(
        (ai) => Number(ai.id) === Number(ingredient.ingredientId),
      )
      if (i) {
        return (
          acc +
          Number(i.caloriesWFibre) *
            (Number(ingredient.serveSize) / Number(i.serveSize))
        )
      }
      return acc
    }, 0)
    .toFixed(1)
  const proteinTotal = ingredients
    .reduce((acc, ingredient) => {
      const i = allIngredients?.find(
        (ai) => Number(ai.id) === Number(ingredient.ingredientId),
      )
      if (i) {
        return (
          acc +
          Number(i.protein) *
            (Number(ingredient.serveSize) / Number(i.serveSize))
        )
      }
      return acc
    }, 0)
    .toFixed(1)

  const carbTotal = ingredients
    .reduce((acc, ingredient) => {
      const i = allIngredients?.find(
        (ai) => Number(ai.id) === Number(ingredient.ingredientId),
      )
      if (i) {
        return (
          acc +
          Number(i.availableCarbohydrateWithSugarAlcohols) *
            (Number(ingredient.serveSize) / Number(i.serveSize))
        )
      }
      return acc
    }, 0)
    .toFixed(1)

  const fatTotal = ingredients
    .reduce((acc, ingredient) => {
      const i = allIngredients?.find(
        (ai) => Number(ai.id) === Number(ingredient.ingredientId),
      )
      if (i) {
        return (
          acc +
          Number(i.fatTotal) *
            (Number(ingredient.serveSize) / Number(i.serveSize))
        )
      }
      return acc
    }, 0)
    .toFixed(1)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('input',data)
    createRecipe({
      name: data.name,
      description: data.description,
      image: data.image,
      notes: data.notes,
      recipeCategory: data.recipeCategory,
      ingredients: data.ingredients.map((i) => {
        return {
          index: i.index,
          ingredientId: Number(i.ingredientId),
          isProtein: i.isProtein,
          isCarbohydrate: i.isCarbohydrate,
          isFat: i.isFat,
          note: i.note,
          serveSize: i.serveSize,
          serveUnit: i.serveUnit,
          isAlternate: i.isAlternate,
          alternateId: i.alternateId,
        }
      }),
    })
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
            <h2>Ingredients</h2>
            <div className='flex flex-col divide-y divide-border border rounded-md '>
              <div
                className={cn(
                  'grid grid-cols-15 w-full divide-x divide-border text-sm font-medium capitalize',
                  'items-center tracking-tighter ',
                )}
              >
                <div className={cn('col-span-4', 'px-2 py-2')}>ingredient</div>
                <div className='pl-2 py-2 col-span-2'>serve size</div>
                <div className='pl-2 py-2'>serve unit</div>
                <div className='pl-2 py-2'>calories</div>
                <div className='pl-2 py-2'>protein</div>
                <div className='pl-2 py-2'>carb</div>
                <div className='pl-2 py-2'>fat</div>
                <div className='pl-2 py-2 col-span-3 hidden'>core attributes</div>
                <div className='pl-2 py-2 col-span-3'>Alternate</div>
                <div className='pl-2 py-2'>delete</div>
              </div>
              {fields.map((_ingredient, index) => (
                <FormRecipeIngredient
                  key={index}
                  index={index}
                  form={form}
                  remove={remove}
                />
              ))}
              {fields.length > 0 ? (
                <div
                  className={cn(
                    'grid grid-cols-15 w-full divide-x divide-border text-base font-bold capitalize',
                    'items-center ',
                  )}
                >
                  <div className={cn('col-span-4', 'px-2 py-2')}>&#8192;</div>
                  <div className='px-5 py-2 col-span-2'>{sizeTotal}</div>
                  <div className='px-2 py-2'>&#8192;</div>
                  <div className='px-2 py-2 flex justify-center'>
                    {calorieTotal}
                  </div>
                  <div className='px-2 py-2 flex justify-center'>
                    {proteinTotal}
                  </div>
                  <div className='px-2 py-2 flex justify-center'>
                    {carbTotal}
                  </div>
                  <div className='px-2 py-2 flex justify-center'>
                    {fatTotal}
                  </div>
                  <div className='px-2 py-2 col-span-3 hidden'>&#8192;</div>
                  <div className='px-2 py-2 col-span-3'>&#8192;</div>
                  <div className='px-2 py-2'>&#8192;</div>
                </div>
              ) : null}
            </div>
            <PlusCircle
              size={24}
              className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-125 transition-transform cursor-pointer'
              onClick={() =>
                append({
                  ingredientId: '',
                  isProtein: false,
                  isCarbohydrate: false,
                  isFat: false,
                  serveSize: '',
                  serveUnit: '',
                  index: fields.length + 1,
                  isAlternate: false,
                  note: '',
                  alternateId: '',
                })
              }
            />
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
                name='recipeCategory'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe Category</FormLabel>
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

export { FormRecipe }
