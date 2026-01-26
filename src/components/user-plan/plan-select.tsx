'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export const dynamic = 'force-dynamic'

const PlanSelect = ({
	selectedPlan,
	onSetPlan,
}: {
	selectedPlan: string
	onSetPlan: (planId: string) => void
}) => {
	const [trainer, setTrainer] = useState('all')
	const [selectValue, setSelectValue] = useState('')
	const ctx = api.useUtils()
	const _allPlans = ctx.plan.getAllSimple.getData()

	const allPlans = _allPlans?.filter((plan) => {
		if (trainer === 'all') return true
		if (plan.creator?.id === trainer) return true
		return false
	})

	const { data: users } = api.user.getAll.useQuery()
	const trainers = users?.filter((user) => user.isTrainer)

	const [open, setOpen] = useState(false)

	if (!allPlans) return null
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					disabled={allPlans.length === 0}
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='flex gap-1 justify-between items-center my-2 capitalize w-[350px]'
				>
					<span className='truncate'>
						{selectedPlan
							? allPlans.find((plan) => plan.id.toString() === selectedPlan)
									?.name
							: 'Select plan...'}
					</span>
					<ChevronsUpDown className='ml-2 w-4 h-4 opacity-50 shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='p-0 w-full max-w-[100vw] md:max-w-[600px]'>
				<Command>
					<div className='flex gap-2 items-center p-1'>
						<CommandInput
							placeholder='Search plans...'
							className='w-max grow'
						/>
						<Select
							value={selectValue}
							onValueChange={(e) => {
								console.log('e', e)
								setSelectValue(e)
								setTrainer(e)
							}}
						>
							<SelectTrigger className='w-[180px]'>
								<SelectValue placeholder='Trainers' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem
									value='all'
									onSelect={() => {
										setTrainer('all')
									}}
								>
									All
								</SelectItem>
								{trainers?.map((trainer) => (
									<SelectItem
										value={trainer.id}
										key={trainer.id}
										onSelect={() => {
											setTrainer(trainer.id)
										}}
									>
										{trainer.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<CommandList className='max-h-[600px]'>
						<CommandEmpty>No plan found.</CommandEmpty>
						<CommandGroup>
							{allPlans.map((plan) => (
								<CommandItem
									className='grid relative grid-cols-10 capitalize'
									key={plan.id}
									value={plan.id.toString()}
									onSelect={() => {
										onSetPlan(plan.id.toString())
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4 absolute top-1/2 -translate-y-1/2 left-0',
											selectedPlan === plan.id.toString()
												? 'opacity-100'
												: 'opacity-0',
										)}
									/>
									<span className='col-span-8 ml-4 cursor-pointer truncate'>
										{plan.name}
									</span>
									<span className='col-span-2 text-right'>
										<Badge variant='secondary'>
											{plan.creator?.name?.split(' ')[0]}
										</Badge>
									</span>
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
