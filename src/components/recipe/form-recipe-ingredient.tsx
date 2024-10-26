'use client'

import { api } from '@/trpc/react'

import { ReactNode, useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetIngredientById } from '@/types'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CrossCircledIcon } from '@radix-ui/react-icons'
import { CheckIcon, ChevronDownIcon, XCircle } from 'lucide-react'
import { useForm, UseFormReturn } from 'react-hook-form'
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
      ? allIngredients
      : allIngredients.filter((i) => {
          return i.foodName?.toLowerCase().includes(query.toLowerCase())
        })
  const filteredIngredientsAlt =
    queryAlt === ''
      ? allIngredients
      : allIngredients.filter((i) => {
          return i.foodName?.toLowerCase().includes(queryAlt.toLowerCase())
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
                      displayValue={(i) => i?.foodName}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <ChevronDownIcon className='absolute top-1/2 -translate-y-1/2 right-2 text-secondary-foreground group-data-[hover]:text-black' />
                  </div>

                  <ComboboxOptions
                    anchor='bottom'
                    transition
                    className={cn(
                      'w-[calc(var(--input-width))] rounded-xl border border-border bg-secondary p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                    )}
                  >
                    {({ option: i }) => (
                      <ComboboxOption
                        key={i.id}
                        value={i}
                        className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-card hover:font-medium'
                      >
                        <CheckIcon className='invisible size-4 group-data-[selected]:visible' />
                        <div className='text-sm text-secondary-foreground'>
                          {i.foodName}
                        </div>
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
                      displayValue={(i) => i?.foodName}
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
                        className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-card hover:font-medium'
                      >
                        <CheckIcon className='invisible size-4 group-data-[selected]:visible' />
                        <div className='text-sm text-secondary-foreground'>
                          {i.foodName}
                        </div>
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
