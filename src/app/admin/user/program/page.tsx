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

export default function Home() {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''

  const [selectedPlan, setSelectedPlan] = useState('')

  const { data: currentUser } = api.user.get.useQuery(user)

  return (

    <div className='flex flex-col items-center'>
      program
    </div>
  )
}
