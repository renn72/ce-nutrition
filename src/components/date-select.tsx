'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar-log'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import { CalendarIcon } from 'lucide-react'

const DateSelect = ({
	today,
	setDay,
}: {
	today: Date
	setDay: React.Dispatch<React.SetStateAction<Date>>
}) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div className='flex items-center justify-center'>
					<Button
						variant={'outline'}
						onClick={(e) => {
							e.stopPropagation()
							e.preventDefault()
							setIsOpen(true)
						}}
						className={cn(
							'w-[220px] font-semibold text-base mt-[2px] flex items-center justify-center shadow-sm',
							!today && 'text-muted-foreground',
						)}
					>
						<CalendarIcon className='mr-4 h-4 w-4 mt-[0px] shrink-0' />
						{today ? (
							<span className='mt-[5px]'>{format(today, 'PPP')}</span>
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</div>
			</PopoverTrigger>
			<PopoverContent
				onFocusOutside={(e) => e.preventDefault()}
				forceMount
				className='w-auto p-0 z-[2000]'
			>
				<Calendar
					mode='single'
					disabled={{ after: new Date() }}
					selected={today}
					onSelect={(date) => {
						if (!date) return
						setDay(date)
						setIsOpen(false)
					}}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	)
}

export { DateSelect }
