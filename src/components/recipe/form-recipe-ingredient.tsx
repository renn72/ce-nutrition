'use client'

import { api } from '@/trpc/react'

import { ReactNode, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetIngredientById, GetAllIngredients } from '@/types'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, Star, XCircle } from 'lucide-react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
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
  <div className={cn('px-2 py-2 flex items-center justify-center', className)}>
    {children}
  </div>
)

const FormRecipeIngredient = ({
  index,
  form,
  remove,
  allIngredients,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
  allIngredients: GetAllIngredients | null | undefined
}) => {
  const ctx = api.useUtils()

  const [query, setQuery] = useState('')
  const [queryAlt, setQueryAlt] = useState('')

  const ingredientId = form.watch(`ingredients.${index}.ingredientId`)
  const alternateId = form.watch(`ingredients.${index}.alternateId`)

  const [selected, setSelected] = useState<GetIngredientById | null>(() => {
    if (ingredientId) {
      return allIngredients?.find((i) => i?.id === Number(ingredientId))
    }
    return null
  })

  console.log('selected', ingredientId, alternateId)

  const [selectedAlt, setSelectedAlt] = useState<GetIngredientById | null>(
    () => {
      if (alternateId) {
        return allIngredients?.find((i) => i?.id === Number(alternateId))
      }
      return null
    },
  )

  if (!allIngredients) return null

  // useEffect(() => {
  //   if (ingredientId) {
  //     setSelected(allIngredients?.find((i) => i.id === Number(ingredientId)))
  //   }
  //   if (alternateId) {
  //     setSelectedAlt(allIngredients?.find((i) => i.id === Number(alternateId)))
  //   }
  // }, [ingredientId, alternateId, allIngredients])

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
                    return
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
                    return
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

export { FormRecipeIngredient }
