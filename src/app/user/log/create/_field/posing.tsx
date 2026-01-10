'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { PersonSimpleIcon } from '@phosphor-icons/react'

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

const Posing = ({
	todaysLog,
	prevLog,
	date,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
}) => {
	const [posing, setPosing] = useState<number | null>(
		todaysLog?.posing
			? Number(todaysLog?.posing)
			: prevLog?.posing
				? Number(prevLog?.posing)
				: null,
	)

	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')

	const { mutate: updatePosing } = api.dailyLog.updatePosing.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})

	return (
		<DialogWrapper
			title='Posing'
			icon={PersonSimpleIcon}
			value={todaysLog?.posing ?? ''}
			prevValue={''}
			postfix='mins'
		>
			<DialogHeader>
				<DialogTitle>Posing</DialogTitle>
				<DialogDescription>Enter your minutes of Posing</DialogDescription>
			</DialogHeader>
			<div className='flex justify-center'>
				<NumberInput
					value={posing}
					setValue={setPosing}
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
								if (!posing) return
								updatePosing({
									date: todaysLogDate.toDateString(),
									posing: posing?.toFixed(0),
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
								if (!posing) return
								setPosing(null)
								updatePosing({
									date: todaysLogDate.toDateString(),
									posing: '',
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
export { Posing }
