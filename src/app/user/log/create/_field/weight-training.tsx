'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'
import { Dumbbell } from 'lucide-react'
import { GetDailyLogById } from '@/types'

import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { DialogWrapper } from './dialog-wrapper'
import { NumberInput } from './number-input'

const WeightTraining = ({
	todaysLog,
	prevLog,
	date,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
}) => {
	const [weightTraining, setWeightTraining] = useState<number | null>(() =>
		todaysLog?.weight
			? Number(todaysLog?.weight)
			: prevLog?.weight
				? Number(prevLog?.weight)
				: null,
	)

	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')

	const { mutate: updateWeightTraining } =
		api.dailyLog.updateWeightTraining.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	return (
		<DialogWrapper
			title='Weight Training'
			icon={Dumbbell}
			value={todaysLog?.weight ?? ''}
			prevValue={''}
			postfix='mins'
		>
			<DialogHeader>
				<DialogTitle>Weight Training</DialogTitle>
				<DialogDescription>
					Enter your minutes of weight training
				</DialogDescription>
			</DialogHeader>
			<div className='flex justify-center'>
				<NumberInput
					value={weightTraining}
					setValue={setWeightTraining}
					fixed={0}
					scale={1}
					postfix='mins'
				/>
			</div>
			<div className='flex gap-2 justify-around w-full'>
				<DialogClose asChild>
					<div className='flex justify-around items-center w-full'>
						<Button
							variant='default'
							onClick={() => {
								if (!weightTraining) return
								updateWeightTraining({
									date: todaysLogDate.toDateString(),
									weight: weightTraining?.toFixed(0),
								})
							}}
						>
							Save
						</Button>
					</div>
				</DialogClose>
				<DialogClose asChild>
					<div className='flex justify-around items-center w-full'>
						<Button
							variant='default'
							onClick={() => {
								if (!weightTraining) return
								setWeightTraining(null)
								updateWeightTraining({
									date: todaysLogDate.toDateString(),
									weight: '',
								})
							}}
						>
							Clear
						</Button>
					</div>
				</DialogClose>
			</div>
		</DialogWrapper>
	)
}
export { WeightTraining }
