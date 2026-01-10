'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { Snowflake } from 'lucide-react'

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

const ColdPlunge = ({
	todaysLog,
	prevLog,
	date,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
}) => {
	const [coldPlunge, setColdPlunge] = useState<number | null>(
		todaysLog?.coldPlunge
			? Number(todaysLog?.coldPlunge)
			: prevLog?.sauna
				? Number(prevLog?.coldPlunge)
				: null,
	)

	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')

	const { mutate: updateColdPlunge } =
		api.dailyLog.updateColdPlunge.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	return (
		<DialogWrapper
			title='Cold Plunge'
			icon={Snowflake}
			value={todaysLog?.coldPlunge ?? ''}
			prevValue={''}
			postfix='mins'
		>
			<DialogHeader>
				<DialogTitle>Cold Plunge</DialogTitle>
				<DialogDescription>Enter your minutes of Cold Plunge</DialogDescription>
			</DialogHeader>
			<div className='flex justify-center'>
				<NumberInput
					value={coldPlunge}
					setValue={setColdPlunge}
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
								if (!coldPlunge) return
								updateColdPlunge({
									date: todaysLogDate.toDateString(),
									coldPlunge: coldPlunge?.toFixed(0),
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
							variant='outline'
							onClick={() => {
								if (!coldPlunge) return
								setColdPlunge(null)
								updateColdPlunge({
									date: todaysLogDate.toDateString(),
									coldPlunge: '',
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
export { ColdPlunge }
