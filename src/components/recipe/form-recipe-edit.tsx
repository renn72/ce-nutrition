'use client'

import { api } from '@/trpc/react'

import { ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetIngredientById } from '@/types'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CheckIcon,
  ChevronDownIcon,
  PlusCircle,
  Star,
  XCircle,
} from 'lucide-react'
import { useFieldArray, useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

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

const GridWrapper = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div className={cn('px-2 py-2 flex items-center justify-center', className)}>
    {children}
  </div>
)

const FormRecipeIngredient = ({
  index,
  form,
  remove,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
}) => {
  const ctx = api.useUtils()
  const allIngredients = ctx.ingredient.getAll.getData()

  const [query, setQuery] = useState('')
  const [queryAlt, setQueryAlt] = useState('')

  const [selected, setSelected] = useState<GetIngredientById | null>(null)
  const [selectedAlt, setSelectedAlt] = useState<GetIngredientById | null>(null)

  if (!allIngredients) return <div />
  const filteredIngredients =
    query === ''
      ? allIngredients.sort((a, b) => {
          if (a?.favouriteAt && b?.favouriteAt) {
            return Number(a?.favouriteAt) - Number(b?.favouriteAt)
          }
          if (a?.favouriteAt) return -1
          if (b?.favouriteAt) return 1
          return 0
        })
      : allIngredients
          .filter((i) => {
            return i.name?.toLowerCase().includes(query.toLowerCase())
          })
          .sort((a, b) => {
            if (a?.favouriteAt && b?.favouriteAt) {
              return Number(a?.favouriteAt) - Number(b?.favouriteAt)
            }
            if (a?.favouriteAt) return -1
            if (b?.favouriteAt) return 1
            return 0
          })

  const filteredIngredientsAlt =
    queryAlt === ''
      ? allIngredients.sort((a, b) => {
          if (a?.favouriteAt && b?.favouriteAt) {
            return Number(a?.favouriteAt) - Number(b?.favouriteAt)
          }
          if (a?.favouriteAt) return -1
          if (b?.favouriteAt) return 1
          return 0
        })
      : allIngredients
          .filter((i) => {
            return i.name?.toLowerCase().includes(queryAlt.toLowerCase())
          })
          .sort((a, b) => {
            if (a?.favouriteAt && b?.favouriteAt) {
              return Number(a?.favouriteAt) - Number(b?.favouriteAt)
            }
            if (a?.favouriteAt) return -1
            if (b?.favouriteAt) return 1
            return 0
          })

  const id = form.watch(`ingredients.${index}.ingredientId`)
  const serveSize = form.watch(`ingredients.${index}.serveSize`)
  return (
    <div
      key={index}
      className='grid grid-cols-15 w-full divide-x divide-border'
    >
      <GridWrapper className='col-span-4 px-1'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.ingredientId`}
          render={({ field }) => (
            <FormItem className='flex flex-col w-full'>
              <div className='flex gap-2 items-center w-full'>
                <Combobox
                  value={selected}
                  onChange={(value) => {
                    field.onChange(value?.id.toString())
                    form.setValue(
                      `ingredients.${index}.serveSize`,
                      value?.serveSize ?? '',
                    )
                    form.setValue(
                      `ingredients.${index}.serveUnit`,
                      value?.serveUnit ?? '',
                    )
                    setSelected(value)
                  }}
                  onClose={() => setQuery('')}
                  virtual={{ options: filteredIngredients }}
                  immediate
                >
                  <div className='relative w-full'>
                    <ComboboxInput
                      className={cn(
                        'w-full rounded-lg text-sm font-semibold border bg-background py-1.5 pr-6 pl-3 cursor-pointer',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                      )}
                      // @ts-ignore
                      displayValue={(i) => i?.name.slice(0, 33)}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <ChevronDownIcon className='absolute top-1/2 -translate-y-1/2 right-2 text-secondary-foreground group-data-[hover]:text-black' />
                  </div>

                  <ComboboxOptions
                    anchor='bottom'
                    transition
                    className={cn(
                      'w-[calc(var(--input-width)+100px)] rounded-xl border border-border bg-secondary p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                    )}
                  >
                    {({ option: i }) => (
                      <ComboboxOption
                        key={i.id}
                        value={i}
                        className='group relative w-full flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-card hover:font-medium'
                      >
                        <CheckIcon className='invisible size-4 group-data-[selected]:visible' />
                        <div className='text-sm text-secondary-foreground'>
                          {i.name.slice(0, 60)}
                        </div>
                        {i.favouriteAt && (
                          <Star
                            size={12}
                            fill='#FFB500'
                            className='absolute top-1/2 -translate-y-1/2 right-2 text-[#FFB500]'
                          />
                        )}
                      </ComboboxOption>
                    )}
                  </ComboboxOptions>
                </Combobox>
                <XCircle
                  size={18}
                  className='text-secondary-foreground'
                  onClick={() => {
                    field.onChange('')
                    setSelected(null)
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </GridWrapper>
      <GridWrapper className='col-span-2'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.serveSize`}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder='Serve Size'
                  {...field}
                  type='number'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </GridWrapper>
      <GridWrapper>{selected?.serveUnit}</GridWrapper>
      <GridWrapper>
        {selected &&
          (
            Number(selected.caloriesWFibre) *
            (Number(serveSize) / Number(selected.serveSize))
          ).toFixed(1)}
      </GridWrapper>
      <GridWrapper>
        {selected &&
          (
            Number(selected.protein) *
            (Number(serveSize) / Number(selected.serveSize))
          ).toFixed(1)}
      </GridWrapper>
      <GridWrapper>
        {selected &&
          (
            Number(selected.availableCarbohydrateWithSugarAlcohols) *
            (Number(serveSize) / Number(selected.serveSize))
          ).toFixed(1)}
      </GridWrapper>
      <GridWrapper>
        {selected &&
          (
            Number(selected.fatTotal) *
            (Number(serveSize) / Number(selected.serveSize))
          ).toFixed(1)}
      </GridWrapper>
      <GridWrapper className='hidden'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.isProtein`}
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-center space-x-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormLabel>Is Protein</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </GridWrapper>
      <GridWrapper className='hidden'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.isCarbohydrate`}
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-center space-x-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormLabel>Is Carb</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </GridWrapper>
      <GridWrapper className='hidden'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.isFat`}
          render={({ field }) => (
            <FormItem className='flex flex-row items-center justify-center space-x-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormLabel>Is Fat</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
      </GridWrapper>
      <GridWrapper className='col-span-3 px-1'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.alternateId`}
          render={({ field }) => (
            <FormItem className='flex flex-col w-full'>
              <div className='flex gap-2 items-center w-full'>
                <Combobox
                  value={selectedAlt}
                  onChange={(value) => {
                    field.onChange(value?.id.toString())
                    setSelectedAlt(value)
                  }}
                  onClose={() => setQueryAlt('')}
                  virtual={{ options: filteredIngredientsAlt }}
                  immediate
                >
                  <div className='relative w-full'>
                    <ComboboxInput
                      className={cn(
                        'w-full rounded-lg text-sm font-semibold border bg-background py-1.5 pr-6 pl-3 cursor-pointer',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                      )}
                      // @ts-ignore
                      displayValue={(i) => i?.name.slice(0, 22)}
                      onChange={(event) => setQueryAlt(event.target.value)}
                    />
                    <ChevronDownIcon className='absolute top-1/2 -translate-y-1/2 right-2 text-secondary-foreground group-data-[hover]:text-black' />
                  </div>

                  <ComboboxOptions
                    anchor='bottom'
                    transition
                    className={cn(
                      'w-[calc(var(--input-width)+200px)] rounded-xl border border-border bg-secondary p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                    )}
                  >
                    {({ option: i }) => (
                      <ComboboxOption
                        key={i.id}
                        value={i}
                        className='group relative w-full flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-card hover:font-medium'
                      >
                        <CheckIcon className='invisible size-4 group-data-[selected]:visible' />
                        <div className='text-sm text-secondary-foreground'>
                          {i.name.slice(0, 60)}
                        </div>
                        {i.favouriteAt && (
                          <Star
                            size={12}
                            fill='#FFB500'
                            className='absolute top-1/2 -translate-y-1/2 right-2 text-[#FFB500]'
                          />
                        )}
                      </ComboboxOption>
                    )}
                  </ComboboxOptions>
                </Combobox>
                <XCircle
                  size={18}
                  className='text-secondary-foreground'
                  onClick={() => {
                    field.onChange('')
                    setSelectedAlt(null)
                  }}
                />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </GridWrapper>
      <GridWrapper className=''>
        <XCircle
          size={24}
          className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-125 transition-transform cursor-pointer'
          onClick={() => {
            remove(index)
          }}
        />
      </GridWrapper>
    </div>
  )
}
const FormRecipeEdit = ({ recipe }: { recipe: number }) => {
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
    console.log('input', data)
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
                <div className='pl-2 py-2 col-span-3 hidden'>
                  core attributes
                </div>
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

export { FormRecipeEdit }
