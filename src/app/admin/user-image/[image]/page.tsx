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

	const [noteId, setNoteId] = useState('')

	const [images, setImages] = useState([
		{ url: `https://utfs.io/f/${imageId}`, date: date, dataId: Number(dataId) },
	])
	const { data: userNotes } = api.trainerNotes.getAllUser.useQuery({
		userId: user ?? '',
	})

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
		<div className='w-full grid justify-center px-2 relative'>
			<div className='absolute top-1 right-2 z-20'>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='secondary'
							className=' hover:outline hover:bg-primary/00 w-10 h-10 rounded-full p-0'
						>
							<Menu size={24} />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						align='end'
						forceMount
						className='w-96 flex flex-col gap-1 pl-4 pr-6'
						onInteractOutside={(e) => {
							e.preventDefault()
						}}
					>
						{userNotes?.map((note, i, a) => (
							<div
								key={note.id}
								className='flex gap-2 items-center justify-between w-full flex-col '
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
									<div className='flex gap-2 items-center justify-between w-full'>
										<div />
										<div className='text-[0.6rem] rounded-full bg-muted px-2 py-[2px] w-fit'>
											{note.createdAt?.toLocaleDateString('en-AU', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</div>
									</div>
								)}
								<div className='text-sm font-medium w-full bg-muted rounded-full px-2 py-1 relative'>
									{note.description}
									<XIcon
										size={16}
										className='absolute -right-5 cursor-pointer hover:text-destructive active:scale-90 transition-all top-1/2 -translate-y-1/2'
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
			<div className='relative flex gap-2  overflow-x-auto'>
				{images.map((image) => (
					<ImageView
						key={image.url}
						src={image.url}
						alt='image'
						date={image.date}
						userId={user ?? ''}
						isAdmin={true}
						dataId={image.dataId}
					/>
				))}
				<ImageAdd setImages={setImages} images={images} />
			</div>
		</div>
	)
}
