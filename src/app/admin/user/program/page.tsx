'use client'

import { api } from '@/trpc/react'
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

const PlanSelect = ({ selectedPlan, setSelectedPlan } : { selectedPlan: string, setSelectedPlan: React.Dispatch<React.SetStateAction<string>>}) => {
  const ctx = api.useUtils()
  const allPlans = ctx.plan.getAllSimple.getData()

  const [open, setOpen] =useState(false)
  if (!allPlans) return null
  return (
<Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedPlan
            ? allPlans.find((plan) => plan.id.toString() === selectedPlan)
                ?.name
            : "Select plan..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {allPlans.map((plan) => (
                <CommandItem
                  key={plan.id}
                  value={plan.id.toString()}
                  onSelect={(currentValue) => {
                    setSelectedPlan(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedPlan === plan.id.toString() ? "opacity-100" : "opacity-0"
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

export default function Home() {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''

  const [selectedPlan, setSelectedPlan] = useState('')

  const { data: allPlans } = api.plan.getAllSimple.useQuery()
  const { data: currentUser } = api.user.get.useQuery(user)

  return (

    <div className='flex min-h-screen flex-col items-center'>
      {user}
      <PlanSelect selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
    </div>
  )
}
