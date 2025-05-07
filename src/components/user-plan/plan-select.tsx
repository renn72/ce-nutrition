'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'


import { cn, } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const dynamic = 'force-dynamic'

const PlanSelect = ({
  selectedPlan,
  onSetPlan,
}: {
  selectedPlan: string
  onSetPlan: (planId: string) => void
}) => {
  const ctx = api.useUtils()
  const allPlans = ctx.plan.getAllSimple.getData()

  const [open, setOpen] = useState(false)
  if (!allPlans) return null
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[350px] justify-between my-2 capitalize flex gap-1 items-center'
        >
          <span className='truncate'>
          {selectedPlan
            ? allPlans.find((plan) => plan.id.toString() === selectedPlan)?.name
            : 'Select plan...'}
            </span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search framework...' />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {allPlans.map((plan) => (
                <CommandItem
                  className='capitalize'
                  key={plan.id}
                  value={plan.id.toString()}
                  onSelect={(currentValue) => {
                    onSetPlan(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedPlan === plan.id.toString()
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  {plan.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { PlanSelect }
