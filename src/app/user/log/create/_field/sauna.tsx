'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { ThermometerSun } from 'lucide-react'

import type { GetDailyLogById } from '@/types'

import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { DialogWrapper } from './dialog-wrapper'
import { NumberInput } from './number-input'

const Sauna = ({
	todaysLog,
	prevLog,
	date,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
}) => {
	const [sauna, setSauna] = useState<number | null>(
		todaysLog?.sauna
			? Number(todaysLog?.sauna)
			: prevLog?.sauna
				? Number(prevLog?.sauna)
				: null,
	)

	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')

	const { mutate: updateSauna } = api.dailyLog.updateSauna.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})

	return (
		<DialogWrapper
			title='Sauna'
			icon={ThermometerSun}
			value={todaysLog?.sauna ?? ''}
			prevValue={''}
			postfix='mins'
		>
			<DialogHeader>
				<DialogTitle>Sauna</DialogTitle>
				<DialogDescription>Enter your minutes of Sauna</DialogDescription>
			</DialogHeader>
			<div className='flex justify-center'>
				<NumberInput
					value={sauna}
					setValue={setSauna}
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
								if (!sauna) return
								updateSauna({
									date: todaysLogDate.toDateString(),
									sauna: sauna?.toFixed(0),
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
								if (!sauna) return
								setSauna(null)
								updateSauna({
									date: todaysLogDate.toDateString(),
									sauna: '',
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
export { Sauna }
