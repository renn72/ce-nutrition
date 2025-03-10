'use client'

import { api } from '@/trpc/react'

import { ReactNode, useEffect, useState } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import type { GetAllIngredients, GetIngredientById } from '@/types'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, Star, XCircle } from 'lucide-react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { formSchema } from './form-recipe'

export const dynamic = 'force-dynamic'

const GridWrapper = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={cn(
      'px-1 lg:px-2 py-0 lg:py-2 flex items-center justify-center',
      className,
    )}
  >
    {children}
  </div>
)

const FormRecipeIngredient = ({
  index,
  form,
  remove,
  allIngredients,
  reset,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
  allIngredients: GetAllIngredients | null | undefined
  reset: number
}) => {
  const ctx = api.useUtils()

  const isMobile = useIsMobile()

  const [query, setQuery] = useState('')
  const [queryAlt, setQueryAlt] = useState('')

  const ingredientId = form.watch(`ingredients.${index}.ingredientId`)
  const alternateId = form.watch(`ingredients.${index}.alternateId`)

  const [selected, setSelected] = useState<GetIngredientById | null>(null)

  const [selectedAlt, setSelectedAlt] = useState<GetIngredientById | null>(null)

  useEffect(() => {
    if (ingredientId) {
      setSelected(allIngredients?.find((i) => i.id === Number(ingredientId)))
    } else {
      setSelected(null)
    }
    if (alternateId) {
      setSelectedAlt(allIngredients?.find((i) => i.id === Number(alternateId)))
    } else {
      setSelectedAlt(null)
    }
  }, [reset])

  if (!allIngredients) return null

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
            return i?.name?.toLowerCase().includes(query.toLowerCase())
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
            return i?.name?.toLowerCase().includes(queryAlt.toLowerCase())
          })
          .sort((a, b) => {
            if (a?.favouriteAt && b?.favouriteAt) {
              return Number(a?.favouriteAt) - Number(b?.favouriteAt)
            }
            if (a?.favouriteAt) return -1
            if (b?.favouriteAt) return 1
            return 0
          })

  const serveSize = form.watch(`ingredients.${index}.serveSize`)
  return (
    <div
      key={index}
      className='grid grid-cols-4 lg:grid-cols-15 w-full lg:divide-x divide-border relative'
    >
      <GridWrapper className='col-span-4'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.ingredientId`}
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 lg:flex lg:flex-col w-full items-center gap-2 lg:gap-0'>
              <FormLabel className='block lg:hidden mt-2 text-muted-foreground'>
                Ingredient
              </FormLabel>
              <div className='flex gap-2 items-center w-full lg:w-content col-span-3'>
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
                  <div className='relative w-full lg:w-content'>
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
                      'w-[calc(var(--input-width)+200px)] max-h-[300px] rounded-xl border border-border bg-secondary p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
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
      <GridWrapper className='col-span-4 lg:col-span-3'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.alternateId`}
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 lg:flex lg:flex-col w-full items-center gap-2 lg:gap-0'>
              <FormLabel className='block lg:hidden mt-2 text-muted-foreground'>
                Alternate
              </FormLabel>
              <div className='flex gap-2 items-center w-full col-span-3'>
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
                      'w-[calc(var(--input-width)+200px)]  max-h-[300px] rounded-xl border border-border bg-secondary p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
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
      <GridWrapper className='col-span-4 lg:col-span-2 '>
        <FormField
          control={form.control}
          name={`ingredients.${index}.serveSize`}
          render={({ field }) => (
            <FormItem className='grid grid-cols-4 lg:flex items-center justify-start gap-2 w-full relative'>
              <FormLabel className='block lg:hidden mt-2 text-muted-foreground'>
                Size
              </FormLabel>
              <FormControl className='col-span-3'>
                <Input
                  placeholder='Serve Size'
                  {...field}
                  type='number'
                />
              </FormControl>
              <FormMessage />
        {isMobile ? (
          <div className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pb-1'>
            {selected?.serveUnit}
          </div>
        ) : null}
            </FormItem>
          )}
        />
      </GridWrapper>
      {isMobile ? null : (
        <GridWrapper className={cn('text-sm')}>
          {selected?.serveUnit}
        </GridWrapper>
      )}
      {isMobile ? (
        <>
          <div className='col-span-4 px-2 mt-2'>
            <div className='grid grid-cols-4 w-full border divide-x divide-border col-span-4 text-muted-foreground text-sm'>
              <div className='text-center py-1'>Cals</div>
              <div className='text-center py-1'>Protein</div>
              <div className='text-center py-1'>Carbs</div>
              <div className='text-center py-1'>Fat</div>
            </div>
          </div>
          <div className='col-span-4 px-2 mb-1'>
            {selected && (
              <div className='grid grid-cols-4 w-full border-l border-r border-b divide-x divide-border'>
                <GridWrapper className={cn('text-sm')}>
                  {selected &&
                    (
                      Number(selected.caloriesWFibre) *
                      (Number(serveSize) / Number(selected.serveSize))
                    ).toFixed(1)}
                </GridWrapper>
                <GridWrapper className={cn('text-sm')}>
                  {selected &&
                    (
                      Number(selected.protein) *
                      (Number(serveSize) / Number(selected.serveSize))
                    ).toFixed(1)}
                </GridWrapper>
                <GridWrapper className={cn('text-sm')}>
                  {selected &&
                    (
                      Number(selected.availableCarbohydrateWithSugarAlcohols) *
                      (Number(serveSize) / Number(selected.serveSize))
                    ).toFixed(1)}
                </GridWrapper>
                <GridWrapper className={cn('text-sm')}>
                  {selected &&
                    (
                      Number(selected.fatTotal) *
                      (Number(serveSize) / Number(selected.serveSize))
                    ).toFixed(1)}
                </GridWrapper>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <GridWrapper className={cn('text-sm')}>
            {selected &&
              (
                Number(selected.caloriesWFibre) *
                (Number(serveSize) / Number(selected.serveSize))
              ).toFixed(1)}
          </GridWrapper>
          <GridWrapper className={cn('text-sm')}>
            {selected &&
              (
                Number(selected.protein) *
                (Number(serveSize) / Number(selected.serveSize))
              ).toFixed(1)}
          </GridWrapper>
          <GridWrapper className={cn('text-sm')}>
            {selected &&
              (
                Number(selected.availableCarbohydrateWithSugarAlcohols) *
                (Number(serveSize) / Number(selected.serveSize))
              ).toFixed(1)}
          </GridWrapper>
          <GridWrapper className={cn('text-sm')}>
            {selected &&
              (
                Number(selected.fatTotal) *
                (Number(serveSize) / Number(selected.serveSize))
              ).toFixed(1)}
          </GridWrapper>
        </>
      )}

      <GridWrapper className='col-span-4 lg:col-span-1 pb-1'>
        {isMobile ? (
          <Badge
            variant='destructive'
            className='cursor-pointer active:scale-90'
            onClick={() => {
              remove(index)
            }}
          >delete</Badge>

        ) : (
          <Badge
            variant='destructive'
            className='cursor-pointer active:scale-90'
            onClick={() => {
              remove(index)
            }}
          >delete</Badge>
        )}
      </GridWrapper>
    </div>
  )
}

export { FormRecipeIngredient }
