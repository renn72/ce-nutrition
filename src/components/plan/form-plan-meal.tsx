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
import { Check, CheckIcon, ChevronDownIcon, ChevronsUpDown, XCircle } from 'lucide-react'
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { formSchema } from './form-plan'

export const dynamic = 'force-dynamic'

const FormPlanMeal = ({
  index,
  form,
  remove,
}: {
  index: number
  form: UseFormReturn<z.infer<typeof formSchema>>
  remove: (index: number) => void
}) => {
  const ctx = api.useUtils()
  const allMeals = ctx.meal.getAll.getData()

  const [isOpen, setIsOpen] = useState(false)

  const [query, setQuery] = useState('')
  const [queryAlt, setQueryAlt] = useState('')

  const [selected, setSelected] = useState<GetIngredientById | null>(null)
  const [selectedAlt, setSelectedAlt] = useState<GetIngredientById | null>(null)

  if (!allMeals) return <div />

  return (
    <div
      key={index}
      className='grid grid-cols-6 w-full'
    >
      <FormField
        control={form.control}
        name={`meals.${index}.mealId`}
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormLabel>meal</FormLabel>
            <Popover
              open={isOpen}
              onOpenChange={setIsOpen}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant='outline'
                    role='combobox'
                    className={cn(
                      'w-[200px] justify-between',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value
                      ? allMeals?.find(
                          (m) => m.id.toString() === field.value,
                        )?.name
                      : 'Select meal'}
                    <ChevronsUpDown className='opacity-50' />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandInput
                    placeholder='Search meals...'
                    className='h-9'
                  />
                  <CommandList>
                    <CommandEmpty>No meal found.</CommandEmpty>
                    <CommandGroup>
                      {allMeals.map((meal) => (
                        <CommandItem
                          value={meal.id.toString()}
                          key={meal.id}
                          onSelect={() => {
                            form.setValue(`meals.${index}.mealId`, meal.id.toString())
                            setIsOpen(false)
                          }}
                        >
                          {meal.name}
                          <Check
                            className={cn(
                              'ml-auto',
                              meal.id.toString() === field.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export { FormPlanMeal }
