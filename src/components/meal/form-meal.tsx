import { api } from '@/trpc/react'

import { useState } from 'react'

import { GetMealById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CirclePlus, CircleX, } from 'lucide-react'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { BackButton } from '../back-button'
import { FormMealRecipe } from './form-meal-recipe'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  mealCategory: z.string(),
  veges: z.object({
    vegeStackId: z.string(),
    note: z.string(),
    calories: z.string(),
  }),
  recipes: z.array(
    z.object({
      recipeId: z.string(),
      note: z.string(),
      index: z.number(),
    }),
  ),
})

const FormMeal = ({ meal }: { meal: GetMealById | null }) => {
  const [key, setKey] = useState(+new Date())
  const ctx = api.useUtils()
  const { data: veges, isLoading: vegesIsLoading } = api.vege.getAll.useQuery()
  const { mutate: createMeal } = api.meal.create.useMutation({
    onSuccess: () => {
      ctx.meal.invalidate()
      toast.success('Added successfully')
    },
  })
  const { mutate: updateMeal } = api.meal.update.useMutation({
    onSuccess: () => {
      ctx.meal.invalidate()
      toast.success('Updated successfully')
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: meal?.name || '',
      description: meal?.description || '',
      image: meal?.image || '',
      notes: meal?.notes || '',
      mealCategory: meal?.mealCategory || '',
      veges: {
        vegeStackId: meal?.mealToVegeStack?.[0]?.vegeStackId?.toString() || '',
        note: meal?.mealToVegeStack?.[0]?.note || '',
        calories: meal?.mealToVegeStack?.[0]?.calories || '',
      },
      recipes:
        meal?.mealToRecipe?.map((mealToRecipe) => ({
          recipeId: mealToRecipe.recipe?.id.toString(),
          note: mealToRecipe.note || '',
          index: mealToRecipe.index,
        })) || [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'recipes',
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (meal) {
      updateMeal({
        id: meal.id,
        name: data.name,
        description: data.description,
        image: data.image,
        notes: data.notes,
        mealCategory: data.mealCategory,
        veges: {
          vegeStackId: Number(data.veges.vegeStackId),
          note: data.veges.note,
          calories: data.veges.calories,
        },
        recipes: data.recipes.map((recipe) => ({
          recipeId: Number(recipe.recipeId),
          note: recipe.note,
          index: Number(recipe.index),
        })),
      })
    } else {
      createMeal({
        name: data.name,
        description: data.description,
        image: data.image,
        notes: data.notes,
        mealCategory: data.mealCategory,
        veges: {
          vegeStackId: Number(data.veges.vegeStackId),
          note: data.veges.note,
          calories: data.veges.calories,
        },
        recipes: data.recipes.map((recipe) => ({
          recipeId: Number(recipe.recipeId),
          note: recipe.note,
          index: Number(recipe.index),
        })),
      })
    }
  }

  if (vegesIsLoading) return null

  return (
    <div className='flex flex-col gap-4 p-2'>
      <BackButton />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 mt-10'>
            <div className='flex gap-4 justify-between'>
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
                name='mealCategory'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Category</FormLabel>
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
            <div className='flex gap-4 justify-between'>
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
            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Image'
                      {...field}
                      type='text'
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {veges && (
              <>
                <Label>Vege Stack</Label>
                <div className='flex gap-4 justify-between'>
                  <FormField
                    control={form.control}
                    name='veges.vegeStackId'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel className=''>&#8192;</FormLabel>
                        <div className='flex gap-2 items-center'>
                          <Select
                            key={key}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {veges?.map((vege) => (
                                <SelectItem
                                  key={vege.id}
                                  value={vege.id.toString()}
                                >
                                  {vege.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <CircleX
                            size={20}
                            className='cursor-pointer text-primary/50 hover:text-primary active:scale-90'
                            onClick={() => {
                              form.setValue('veges.vegeStackId', '')
                              form.setValue('veges.note', '')
                              form.setValue('veges.calories', '')
                              setKey(+new Date())
                            }}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='veges.calories'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Calories</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Calories'
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value)
                            }
                            type='number'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='veges.note'
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
              </>
            )}
            <div className='grid gap-2 grid-cols-10 items-end capitalize'>
              <div className='col-span-2'>recipe</div>
              <div>size</div>
              <div>cals</div>
              <div>protein</div>
              <div>carbs</div>
              <div>fat</div>
            </div>
            {fields.map((field, index) => (
              <FormMealRecipe
                index={index}
                form={form}
                remove={remove}
                key={field.recipeId}
              />
            ))}
            <CirclePlus
              size={20}
              className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 '
              onClick={() =>
                append({ recipeId: '', note: '', index: fields.length + 1 })
              }
            />
            <div className='flex gap-4 justify-between'></div>
            <div>
              <Button type='submit'>Submit</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { FormMeal }
