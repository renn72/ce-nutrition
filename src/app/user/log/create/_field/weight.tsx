'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetDailyLogById } from '@/types'
import { Scale } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'

import { BloodGlucoseTimePicker } from './blood-glucose-time-picker'
import { DialogWrapper } from './dialog-wrapper'
import { NumberInput } from './number-input'

const Weight = ({
	todaysLog,
	prevLog,
	date,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
}) => {
	const [weight, setWeight] = useState<number | null>(() =>
		todaysLog?.morningWeight
			? Number(todaysLog?.morningWeight)
			: prevLog?.morningWeight
				? Number(prevLog?.morningWeight)
				: null,
	)
	const [weightTiming, setWeightTiming] = useState<string>(
		() => todaysLog?.morningWeightTiming ?? prevLog?.morningWeightTiming ?? '',
	)
	const [isTimingEnabled, setIsTimingEnabled] = useState<boolean>(
		() =>
			Boolean(todaysLog?.morningWeightTiming) ||
			Boolean(prevLog?.morningWeightTiming),
	)

	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')

	const { mutateAsync: updateWeight } = api.dailyLog.updateWeight.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})
	const { mutateAsync: updateWeightTiming } =
		api.dailyLog.updateWeightTiming.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	return (
		<DialogWrapper
			title='Weight'
			icon={Scale}
			value={todaysLog?.morningWeight ?? ''}
			prevValue={prevLog?.morningWeight ?? ''}
			fixed={1}
		>
			<DialogHeader>
				<DialogTitle>Weight</DialogTitle>
				<DialogDescription>Enter your weight today</DialogDescription>
			</DialogHeader>
			<div className='flex gap-3 justify-center items-center'>
				<div className='text-xs font-medium tracking-wide uppercase text-muted-foreground'>
					Log time
				</div>
				<Switch
					checked={isTimingEnabled}
					onCheckedChange={(checked) => {
						setIsTimingEnabled(checked)
						if (!checked) {
							setWeightTiming('')
							return
						}
						if (!weightTiming) setWeightTiming('08:00')
					}}
				/>
			</div>
			<div className='flex flex-col gap-4 justify-center items-center sm:flex-row sm:items-start'>
				<NumberInput
					value={weight}
					setValue={setWeight}
					fixed={1}
					scale={0.1}
					postfix='kg'
				/>
				<div
					aria-hidden={!isTimingEnabled}
					className={cn(
						'overflow-hidden transition-all duration-300 ease-out',
						isTimingEnabled
							? 'max-h-[220px] max-w-[260px] opacity-100 translate-y-0'
							: 'max-h-0 max-w-0 opacity-0 -translate-y-1 pointer-events-none',
					)}
				>
					<div className='pt-1'>
						<BloodGlucoseTimePicker
							value={weightTiming}
							onChange={setWeightTiming}
						/>
					</div>
				</div>
			</div>
			<DialogClose asChild>
				<div className='flex justify-around items-center w-full'>
					<Button
						variant='default'
						size='lg'
						onClick={async () => {
							if (!weight) return
							const currentDate = todaysLogDate.toDateString()
							await Promise.all([
								updateWeight({
									date: currentDate,
									morningWeight: weight.toFixed(2),
								}),
								updateWeightTiming({
									date: currentDate,
									morningWeightTiming: isTimingEnabled ? weightTiming : '',
								}),
							])
						}}
					>
						Save
					</Button>
				</div>
			</DialogClose>
		</DialogWrapper>
	)
}
export { Weight }
