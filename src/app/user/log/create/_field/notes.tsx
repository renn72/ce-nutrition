'use client'

import { api } from '@/trpc/react'

import { useState, useEffect } from 'react'

import { StickyNote } from 'lucide-react'

import type { GetDailyLogById } from '@/types'

import { Button } from '@/components/ui/button'
import {
	DialogClose,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { DialogWrapper } from './dialog-wrapper'
import { Textarea } from '@/components/ui/textarea'

const Notes = ({
	todaysLog,
	prevLog: _,
	date,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
}) => {
	const [note, setNote] = useState<string | null>(
		todaysLog?.notes ? todaysLog?.notes : '',
	)

	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')

	const { mutate: updateNote } = api.dailyLog.updateNote.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})

	useEffect(() => {
		setNote(todaysLog?.notes ? todaysLog?.notes : '')
	}, [todaysLog])

	return (
		<DialogWrapper
			title='Notes'
			value={note ?? ''}
			isWidthFull={true}
			prevValue={''}
			isString={true}
			icon={StickyNote}
		>
			<DialogHeader>
				<DialogTitle>Note</DialogTitle>
				<DialogDescription>Enter your note today</DialogDescription>
			</DialogHeader>
			<Textarea
				placeholder='Note'
				className='w-full'
				value={note ?? ''}
				onChange={(e) => {
					setNote(e.target.value)
				}}
			/>
			<div className='flex gap-2 justify-around w-full'>
				<DialogClose asChild>
					<div className='flex justify-around items-center w-full'>
						<Button
							variant='default'
							onClick={() => {
								if (!note) return
								updateNote({
									date: todaysLogDate.toDateString(),
									notes: note,
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
								if (!note) return
								setNote(null)
								updateNote({
									date: todaysLogDate.toDateString(),
									notes: '',
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
export { Notes }
