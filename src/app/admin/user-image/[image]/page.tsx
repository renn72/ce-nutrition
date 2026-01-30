'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Menu, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

import { ImageAdd, ImageView } from '@/components/images/image-comparision'

export default function Page({
	params: _,
}: {
	params: Promise<{ image: string }>
}) {
	const searchParams = useSearchParams()
	const imageId = searchParams.get('imageId')
	const user = searchParams.get('user')
	const date = searchParams.get('date') ?? ''
	const dataId = searchParams.get('dataId') ?? ''
	const router = useRouter()

	const [toggleLog, setToggleLog] = useState(false)

	const [noteId, setNoteId] = useState('')

	const [images, setImages] = useState([
		{ url: `https://utfs.io/f/${imageId}`, date: date, dataId: Number(dataId) },
	])
	const { data: userNotes } = api.trainerNotes.getAllUser.useQuery({
		userId: user ?? '',
	})
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(user || '')

	const [day, month, year] = date.split('-').map(Number)
	const dailyLog = dailyLogs?.find((dailyLog) => {
		if (day === undefined || month === undefined || year === undefined)
			return false

		return dailyLog.date === new Date(year, month - 1, day).toDateString()
	})

	console.log('dailyLog', dailyLog, date)

	const ctx = api.useUtils()
	const { mutate: createNote } = api.trainerNotes.create.useMutation({
		onSuccess: () => {
			ctx.trainerNotes.invalidate()
			setNoteId('')
		},
		onMutate: () => {
			setNoteId('')
		},
	})
	const { mutate: deleteNote } = api.trainerNotes.delete.useMutation({
		onSuccess: () => {
			ctx.trainerNotes.invalidate()
		},
	})

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.shiftKey && e.key === 'Enter') return
		if (e.key === 'Enter') {
			createNote({
				title: noteId,
				description: noteId,
				state: 'created',
				userId: user ?? '',
			})
			setNoteId('')
		}
	}

	if (!imageId) return <div>Loading...</div>

	return (
		<div className='grid relative justify-center px-2 w-full'>
			<div className='absolute top-1 right-2 z-20'>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='secondary'
							className='p-0 w-10 h-10 rounded-full hover:outline hover:bg-primary/00'
						>
							<Menu size={24} />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align='end'
						forceMount
						className='flex flex-col gap-1 pr-6 pl-4 w-96'
						onInteractOutside={(e) => {
							e.preventDefault()
						}}
					>
						{userNotes?.map((note, i, a) => (
							<div
								key={note.id}
								className='flex flex-col gap-2 justify-between items-center w-full'
							>
								{a?.[i - 1]?.createdAt?.toLocaleDateString('en-AU', {
									day: 'numeric',
									month: 'short',
									year: 'numeric',
								}) ===
								note.createdAt?.toLocaleDateString('en-AU', {
									day: 'numeric',
									month: 'short',
									year: 'numeric',
								}) ? null : (
									<div className='flex gap-2 justify-between items-center w-full'>
										<div />
										<div className='px-2 rounded-full text-[0.6rem] bg-muted py-[2px] w-fit'>
											{note.createdAt?.toLocaleDateString('en-AU', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</div>
									</div>
								)}
								<div className='relative py-1 px-2 w-full text-sm font-medium rounded-full bg-muted'>
									{note.description}
									<XIcon
										size={16}
										className='absolute -right-5 top-1/2 transition-all -translate-y-1/2 cursor-pointer active:scale-90 hover:text-destructive'
										onClick={() => {
											deleteNote({ id: note.id })
										}}
									/>
								</div>
							</div>
						))}
						<Textarea
							rows={6}
							placeholder='Add a note'
							value={noteId}
							onChange={(e) => setNoteId(e.target.value)}
							onKeyDown={handleKeyDown}
						/>
					</PopoverContent>
				</Popover>
			</div>
			<Button
				onClick={() => router.push(`/admin/user-image?user=${user}`)}
				className='absolute top-2 left-2 z-20'
			>
				Back
			</Button>
			<div className='flex overflow-x-auto relative gap-2'>
				{images.map((image) => (
					<ImageView
						key={image.url}
						src={image.url}
						alt='image'
						date={image.date}
						userId={user ?? ''}
						isAdmin={true}
						dataId={image.dataId}
						isLogs={toggleLog}
						dailyLog={dailyLog}
					/>
				))}
				<ImageAdd setImages={setImages} images={images} />
			</div>
			<div className='absolute bottom-2 left-2 z-20'>
				<Button variant='outline' onClick={() => setToggleLog(!toggleLog)}>
					Toggle Logs
				</Button>
			</div>
		</div>
	)
}
