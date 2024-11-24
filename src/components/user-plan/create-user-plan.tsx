'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

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

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  planCategory: z.string(),
  meals: z.array(
    z.object({
      mealId: z.string(),
      mealTitle: z.string(),
      calories: z.string(),
      vegeCalories: z.string(),
      note: z.string(),
    }),
  ),
})

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
          className='w-[200px] justify-between capitalize'
        >
          {selectedPlan
            ? allPlans.find((plan) => plan.id.toString() === selectedPlan)?.name
            : 'Select plan...'}
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

const CreateUserPlan = () => {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''

  const [selectedPlanId, setSelectedPlanId] = useState('')

  const { data: allPlans } = api.plan.getAll.useQuery()
  const { data: currentUser } = api.user.get.useQuery(user)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      notes: '',
      meals: [
        {
          mealId: '',
          mealTitle: '1',
          calories: '500',
          vegeCalories: '',
          note: '',
        },
      ],
    },
  })
  const mealsField = useFieldArray({
    control: form.control,
    name: 'meals',
  })

  const onSetPlan = (planId: string) => {
    setSelectedPlanId(planId)
    const selectedPlan = allPlans?.find((plan) => plan.id === Number(planId))
    console.log('selectedPlan', selectedPlan)
    form.reset({
      name: selectedPlan?.name || '',
    })
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('input', data)
  }

  return (
    <div className='flex min-h-screen flex-col items-center my-12'>
      <PlanSelect
        selectedPlan={selectedPlanId}
        onSetPlan={onSetPlan}
      />
      {selectedPlanId === '' ? null : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
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
          </form>
        </Form>
      )}
    </div>
  )
}

export { CreateUserPlan }
