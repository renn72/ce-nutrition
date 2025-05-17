'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import type { GetRecipeById } from '@/types'
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
import { FormRecipeIngredient } from './form-recipe-ingredient'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  recipeCategory: z.string(),
  ingredients: z
    .array(
      z.object({
        index: z.number(),
        ingredientId: z.string(),
        note: z.string(),
        serveSize: z.string(),
        serveUnit: z.string(),
        alternateId: z.string(),
      }),
    )
    .nonempty(),
})

const FormRecipe = ({ recipe }: { recipe: GetRecipeById | null }) => {
  const [initialData, setInitialData] = useState<z.infer<
    typeof formSchema
  > | null>()

  useEffect(() => {
    const loadFormData = () => {
      const savedForm = localStorage.getItem('ce-recipe-formValues') as z.infer<
        typeof formSchema
      > | null

      console.log('savedForm', savedForm)

      // @ts-ignore
      if (savedForm === null || savedForm === '') {
        setInitialData(null)
        return
      }
      // @ts-ignore
      setInitialData(JSON.parse(savedForm))
    }

    loadFormData()
  }, [])

  if (initialData === undefined) return null

  return (
    <MainForm
      recipe={recipe}
      initialData={initialData}
    />
  )
}

const MainForm = ({
  recipe,
  initialData,
}: {
  recipe: GetRecipeById | null
  initialData: z.infer<typeof formSchema> | null
}) => {
  console.log('initialData', initialData)
  const [reset, setReset] = useState(0)
  const isMobile = useIsMobile()

  const ctx = api.useUtils()

  const { data: allIngredients, isLoading: isLoadingAllIngredients } =
    api.ingredient.getAll.useQuery()
  const { mutate: createRecipe } = api.recipe.create.useMutation({
    onSuccess: () => {
      ctx.recipe.invalidate()
      toast.success('Recipe created')
    },
  })
  const { mutate: updateRecipe } = api.recipe.update.useMutation({
    onSuccess: () => {
      ctx.recipe.invalidate()
      toast.success('Recipe updated successfully')
    },
  })

  const initValues = {
    name: recipe?.name || initialData?.name || '',
    description: recipe?.description || initialData?.description || '',
    image: recipe?.image || initialData?.image || '',
    notes: recipe?.notes || initialData?.notes || '',
    recipeCategory: recipe?.recipeCategory || initialData?.recipeCategory || '',
    ingredients: recipe?.recipeToIngredient.map((ingredient) => ({
      index: ingredient.index,
      ingredientId: ingredient.ingredient.id.toString() || '',
      note: ingredient.note || '',
      serveSize: ingredient.serveSize || '',
      serveUnit: ingredient.serveUnit || '',
      alternateId: ingredient.alternateId?.toString() || '',
    })) ||
      initialData?.ingredients?.map((ingredient) => ({
        index: ingredient.index,
        ingredientId: ingredient.ingredientId,
        note: ingredient.note,
        serveSize: ingredient.serveSize,
        serveUnit: ingredient.serveUnit,
        alternateId: ingredient.alternateId,
      })) || [
        {
          index: 1,
          ingredientId: '',
          note: '',
          serveSize: '',
          serveUnit: '',
          alternateId: '',
        },
      ],
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initValues,
  })

  const formData = form.watch()
  console.log('formData', formData)

  const onChange = () => {
    window.localStorage.setItem(
      'ce-recipe-formValues',
      JSON.stringify(formData),
    )
  }

  const onClear =  () => {
    const clearedValues = {
      name: '',
      description: '',
      image: '',
      notes: '',
      recipeCategory: '',
      ingredients: [
        {
          index: 1,
          ingredientId: '',
          note: '',
          serveSize: '',
          serveUnit: '',
          alternateId: '',
        },
      ],
    }
    form.reset(clearedValues)
    setReset(reset + 1)
    window.localStorage.setItem('ce-recipe-formValues', '')
  }

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
          Number(i.caloriesWOFibre) *
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
    console.log('input', data)
    if (recipe) {
      updateRecipe({
        id: recipe.id,
        name: data.name,
        description: data.description,
        image: data.image,
        notes: data.notes,
        recipeCategory: data.recipeCategory,
        calories: Number(calorieTotal),
        ingredients: data.ingredients.map((i) => {
          return {
            index: i.index,
            ingredientId: Number(i.ingredientId),
            note: i.note,
            serveSize: i.serveSize,
            serveUnit: i.serveUnit,
            alternateId: i.alternateId,
          }
        }),
      })
    } else {
      createRecipe({
        name: data.name,
        description: data.description,
        image: data.image,
        notes: data.notes,
        recipeCategory: data.recipeCategory,
        calories: Number(calorieTotal),
        ingredients: data.ingredients.map((i) => {
          return {
            index: i.index,
            ingredientId: Number(i.ingredientId),
            note: i.note,
            serveSize: i.serveSize,
            serveUnit: i.serveUnit,
            alternateId: i.alternateId,
          }
        }),
      })
    }
  }

  if (isLoadingAllIngredients) return null

  return (
    <div className='flex flex-col gap-2 lg:gap-4 p-2 mb-28 lg:mb-0 relative'>
      <BackButton />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyUp={onChange}
          onClick={onChange}
          onChange={onChange}
        >
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
              <div className='flex flex-col divide-y divide-border border rounded-md shadow-md'>
                <div
                  className={cn(
                    'hidden lg:grid grid-cols-15 w-full divide-x divide-border text-sm font-medium capitalize',
                    'items-center tracking-tighter ',
                  )}
                >
                  <div className={cn('col-span-4', 'px-2 py-2')}>
                    ingredient
                  </div>
                  <div className='pl-2 py-2 col-span-3'>Alternate</div>
                  <div className='pl-2 py-2 col-span-2'>size</div>
                  <div className='pl-2 py-2'>serve unit</div>
                  <div className='pl-2 py-2'>calories</div>
                  <div className='pl-2 py-2'>protein</div>
                  <div className='pl-2 py-2'>carb</div>
                  <div className='pl-2 py-2'>fat</div>
                  <div className='pl-2 py-2 col-span-3 hidden'>
                    core attributes
                  </div>
                  <div className='pl-2 py-2'>&#8192;</div>
                </div>
                {fields.map((_ingredient, index) => (
                  <FormRecipeIngredient
                    key={index}
                    index={index}
                    form={form}
                    remove={remove}
                    allIngredients={allIngredients}
                    reset={reset}
                  />
                ))}
                {fields.length > 0 ? (
                  <>
                    {isMobile ? (
                      <div className='flex flex-col divide-y divide-border mt-8 fixed bottom-0 left-0 right-0 w-full z-10 bg-background'>
                        <div
                          className={cn(
                            'grid grid-cols-4 w-full divide-x divid-y divide-border text-base font-bold capitalize',
                            'items-center ',
                          )}
                        >
                          <div className='px-2 py-2 flex justify-center'>
                            Calories
                          </div>
                          <div className='px-2 py-2 flex justify-center'>
                            Protein
                          </div>
                          <div className='px-2 py-2 flex justify-center'>
                            Carbs
                          </div>
                          <div className='px-2 py-2 flex justify-center'>
                            Fat
                          </div>
                        </div>
                        <div
                          className={cn(
                            'grid grid-cols-4 w-full divide-x divid-y divide-border text-base font-bold capitalize',
                            'items-center ',
                          )}
                        >
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
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cn(
                          'grid grid-cols-15 w-full divide-x divide-border text-base font-bold capitalize',
                          'items-center ',
                        )}
                      >
                        <div className={cn('col-span-4', 'px-2 py-2')}>
                          &#8192;
                        </div>
                        <div className='px-2 py-2 col-span-3 hidden'>
                          &#8192;
                        </div>
                        <div className='px-2 py-2 col-span-3'>&#8192;</div>
                        <div className='px-5 py-2 col-span-2'>&#8192;</div>
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
                        <div className='px-2 py-2'>&#8192;</div>
                      </div>
                    )}
                  </>
                ) : null}
              </div>
              <div className='flex justify-center w-full'>
                <PlusCircle
                  size={36}
                  className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer'
                  onClick={() =>
                    append({
                      ingredientId: '',
                      serveSize: '',
                      serveUnit: '',
                      index: fields.length + 1,
                      note: '',
                      alternateId: '',
                    })
                  }
                />
              </div>
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
              <div className='w-full hidden'>
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
              <div className='flex gap-4'>
                <Button type='submit'>Submit</Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onClear()
                  }}
                  variant='outline'
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export { FormRecipe }
