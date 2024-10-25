'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

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
import {
  Check,
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDown,
  PlusCircle,
} from 'lucide-react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { formSchema } from './form-recipe'

export const dynamic = 'force-dynamic'
const FormRecipeIngredient = ({
  index,
  form,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
}) => {
  const ctx = api.useUtils()
  const allIngredients = ctx.ingredient.getAll.getData()

  const [selectedPerson, setSelectedPerson] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState({ id: '', foodName: '' })
  const [query, setQuery] = useState('')

  const [selected, setSelected] = useState<GetIngredientById | null>(null)

  if (!allIngredients) return <div />
  const filteredIngredients =
    query === ''
      ? allIngredients
      : allIngredients.filter((i) => {
          return i.foodName?.toLowerCase().includes(query.toLowerCase())
        })

  const id = form.watch(`ingredients.${index}.ingredientId`)
  const serveSize = form.watch(`ingredients.${index}.serveSize`)
  console.log('id', selected)
  return (
    <div
      key={index}
      className='flex flex-col gap-4'
    >
      <div className='flex gap-2 items-end'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.ingredientId`}
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Ingredient</FormLabel>
              <div className='flex gap-2 items-center'>
                <Combobox
                  value={selected}
                  onChange={(value) => {
                    field.onChange(value?.id)
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
                  <div className='relative'>
                    <ComboboxInput
                      className={cn(
                        'w-full rounded-lg border bg-background py-1.5 pr-8 pl-3 text-sm/6 cursor-pointer',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25',
                      )}
                      displayValue={(i) => i?.foodName}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <ChevronDownIcon className='absolute top-1/2 -translate-y-1/2 right-2 text-secondary-foreground group-data-[hover]:text-black' />
                  </div>

                  <ComboboxOptions
                    anchor='bottom'
                    transition
                    className={cn(
                      'w-[var(--input-width)] rounded-xl border border-border bg-secondary p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                      'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
                    )}
                  >
                    {({ option: i }) => (
                      <ComboboxOption
                        key={i.id}
                        value={i}
                        className='group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10'
                      >
                        <CheckIcon className='invisible size-4 group-data-[selected]:visible' />
                        <div className='text-sm/6 text-secondary-foreground'>
                          {i.foodName}
                        </div>
                      </ComboboxOption>
                    )}
                  </ComboboxOptions>
                </Combobox>
                <CrossCircledIcon
                  className='h-6 w-6 text-secondary-foreground'
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
        {selected && (
          <div className='flex gap-4 items-center'>
            <FormField
              control={form.control}
              name={`ingredients.${index}.serveSize`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Serve Size</FormLabel>
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
            <div>{selected.serveUnit}</div>
            <div>
              <div>Calories</div>
            <div>
              {(Number(selected.caloriesWFibre) *
                (Number(serveSize) / Number(selected.serveSize))).toFixed(1)}
            </div>
            </div>
            <div>
              <div>Protein</div>
              <div>{selected.protein}</div>
            </div>
            <div>{selected.availableCarbohydrateWithSugarAlcohols}</div>
            <div>{selected.fatTotal}</div>
          </div>
        )}
      </div>
      <div className='flex gap-2 justify-between'>
        <FormField
          control={form.control}
          name={`ingredients.${index}.isProtein`}
          render={({ field }) => (
            <FormItem className='flex flex-row items-end space-x-6 space-y-0 rounded-md border p-4 shadow'>
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
        <FormField
          control={form.control}
          name={`ingredients.${index}.isCarbohydrate`}
          render={({ field }) => (
            <FormItem className='flex flex-row items-end space-x-6 space-y-0 rounded-md border p-4 shadow'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(value) => {
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormLabel>Is Carbohydrate</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`ingredients.${index}.isFat`}
          render={({ field }) => (
            <FormItem className='flex flex-row items-end space-x-6 space-y-0 rounded-md border p-4 shadow'>
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
      </div>
    </div>
  )
}

export { FormRecipeIngredient }
