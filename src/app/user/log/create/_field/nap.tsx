'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { BedDouble } from 'lucide-react'

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

const Nap = ({
	todaysLog,
	prevLog,
	date,
	userId,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
	userId: string
}) => {
	const [nap, setNap] = useState<number>(() => {
		let r = todaysLog?.nap
			? Number(todaysLog?.nap)
			: prevLog?.nap
				? Number(Number(prevLog?.nap).toFixed(0))
				: 30
		r = r === 0 ? 30 : r
		return r
	})

	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')

	const { mutate: updateNap } = api.dailyLog.updateNap.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})

	return (
		<DialogWrapper
			title='Nap'
			icon={BedDouble}
			value={todaysLog?.nap ?? ''}
			prevValue={prevLog?.nap ?? ''}
		>
			<DialogHeader>
				<DialogTitle>Nap</DialogTitle>
				<DialogDescription>Enter your nap today</DialogDescription>
			</DialogHeader>
			<div className='flex justify-center'>
				<NumberInput
					value={nap}
					setValue={setNap}
					fixed={0}
					scale={5}
					postfix='mins'
				/>
			</div>
			<DialogClose asChild>
				<div className='flex justify-around items-center w-full'>
					<Button
						variant='default'
						onClick={() => {
							if (!nap) return
							updateNap({
								date: todaysLogDate.toDateString(),
								nap: nap?.toString(),
								userId: userId,
							})
						}}
					>
						Save
					</Button>
					<Button
						variant='default'
						onClick={() => {
							if (!nap) return
							setNap(0)
							updateNap({
								date: todaysLogDate.toDateString(),
								nap: '',
								userId: userId,
							})
						}}
					>
						Clear
					</Button>
					<Button variant='default'>Cancel</Button>
				</div>
			</DialogClose>
		</DialogWrapper>
	)
}
export { Nap }
