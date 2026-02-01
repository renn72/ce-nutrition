'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldLabel } from '@/components/ui/field'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import type { DateRange } from 'react-day-picker'

const DateRangePicker = ({
	date,
	setDate,
}: {
	date: DateRange | undefined
	setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}) => {
	return (
		<Field className='mx-auto w-60'>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						id='date-picker-range'
						className='justify-start px-2.5 font-normal'
					>
						<CalendarIcon />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'LLL dd, y')} -{' '}
									{format(date.to, 'LLL dd, y')}
								</>
							) : (
								format(date.from, 'LLL dd, y')
							)
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='p-0 w-auto' align='start'>
					<Calendar
						mode='range'
						defaultMonth={date?.from}
						selected={date}
						onSelect={setDate}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>
		</Field>
	)
}

export { DateRangePicker }
