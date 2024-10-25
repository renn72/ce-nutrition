'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetIngredientById } from '@/types'
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, CheckIcon, ChevronsUpDown, PlusCircle } from 'lucide-react'
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

import { formSchema } from './form-dialog'

export const dynamic = 'force-dynamic'

const FormDialogIngredient = ({
  index,
  form,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
}) => {
  const ctx = api.useUtils()
  const allIngredients = ctx.ingredient.getAll.getData()
  console.log('allIngredients', allIngredients)

  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<GetIngredientById | null>()
  const [query, setQuery] = useState('')

  if (!allIngredients) return <div />

  const filteredIngredients =
    query === ''
      ? allIngredients
      : allIngredients.filter((i) => {
          return i.foodName?.toLowerCase().includes(query.toLowerCase())
        })
  return (
    <div
      key={index}
      className='flex flex-col gap-4'
    >
      <FormField
        control={form.control}
        name={`ingredients.${index}.ingredientId`}
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>Ingredient</FormLabel>
            <Combobox
              value={value}
              onChange={setValue}
              onClose={() => setQuery('')}
              virtual={{ options: filteredIngredients }}
            >
              <ComboboxInput
                aria-label='Search ingredients'
                className='w-[200px] border rounded-md p-2 text-sm'
                displayValue={(i) => i?.foodName || ''}
                onChange={(event) => setQuery(event.target.value)}
              />
              <ComboboxOptions
                anchor='bottom'
                className='border'
              >
                {({ option: i }) => (
                  <ComboboxOption
                    value={i}
                    className='data-[focus]:bg-blue-100 z-99'
                  >
                    {i.foodName || ''}
                  </ComboboxOption>
                )}
              </ComboboxOptions>
            </Combobox>
            <FormMessage />
          </FormItem>
        )}
      />
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

export { FormDialogIngredient }
