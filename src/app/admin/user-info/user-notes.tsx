'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetTrainerNoteById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { EllipsisVertical } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

export const formSchema = z.object({
	title: z.string(),
	description: z.string(),
	state: z.string(),
})

const Note = ({
	note,
	setNoteId,
	form,
	setIsEdit,
	setIsOpen,
	deleteNote,
}: {
	note: GetTrainerNoteById
	setNoteId: React.Dispatch<React.SetStateAction<number | null>>
	form: any
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	deleteNote: any
}) => {
	if (!note) return null

	return (
		<div className='flex flex-col gap-0 w-full leading-none'>
			<div
				className={cn(
					'flex gap-2 items-center justify-between w-full',
					note.state === 'created' ? '' : 'line-through opacity-50',
				)}
			>
				<div
					className={cn(
						'text-sm text-muted-foreground',
						note.state === 'created' ? '' : 'hidden',
					)}
				>
					{note.description}
				</div>
				<div className='hidden text-base font-medium'>{note.title}</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant='ghost'
							className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
						>
							<EllipsisVertical className='w-4 h-4' />
							<span className='sr-only'>Open menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end' className='w-[160px]'>
						<DropdownMenuItem
							onSelect={() => {
								setNoteId(note.id)
								form.reset({
									title: note.title || '',
									description: note.description || '',
									state: note.state || '',
								})
								setIsEdit(true)
								setIsOpen(true)
							}}
						>
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem
							onSelect={() => {
								deleteNote({ id: note.id })
							}}
						>
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className='flex gap-2 justify-between items-center w-full'>
				<div className='py-1 px-2 rounded-full text-[0.6rem] bg-muted w-fit'>
					{note.updatedAt?.toLocaleDateString('en-AU', {
						day: 'numeric',
						month: 'short',
						year: 'numeric',
					})}
				</div>
				<div className='py-1 px-2 rounded-full text-[0.6rem] bg-secondary text-secondary-foreground w-fit'>
					{note.trainer.name}
				</div>
			</div>
		</div>
	)
}

const UserNotes = ({
	userId,
	userNotes,
	className,
}: {
	className?: string
	userId: string
	userNotes: GetTrainerNoteById[] | undefined
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isEdit, setIsEdit] = useState(false)
	const [noteId, setNoteId] = useState<number | null>(null)

	const ctx = api.useUtils()
	const { mutate: createNote } = api.trainerNotes.create.useMutation({
		onSuccess: () => {
			toast.success('Note created')
			ctx.invalidate()
			setIsOpen(false)
			form.reset({
				title: '',
				description: '',
				state: 'created',
			})
		},
	})
	const { mutate: deleteNote } = api.trainerNotes.delete.useMutation({
		onSuccess: () => {
			toast.success('Note deleted')
			ctx.invalidate()
		},
	})
	const { mutate: updateNote } = api.trainerNotes.update.useMutation({
		onSuccess: () => {
			toast.success('Note updated successfully')
			ctx.invalidate()
			setIsOpen(false)
			form.reset({
				title: '',
				description: '',
				state: 'created',
			})
		},
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			description: '',
			state: 'created',
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		if (isEdit) {
			if (!noteId) return
			updateNote({
				id: noteId,
				title: data.title,
				description: data.description,
				state: data.state,
			})
		} else {
			createNote({
				title: data.title,
				description: data.description,
				state: data.state,
				userId: userId,
			})
		}
	}

	return (
		<div
			className={cn(
				'border rounded-lg p-4 flex flex-col w-full items-center justify-between gap-2 max-h-[450px] h-full',
				className,
			)}
		>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-xl font-semibold'>Notes</h2>
				<div className='flex flex-col gap-2'>
					<ScrollArea className='max-h-[284px]'>
						{userNotes
							?.filter((note) => note?.state === 'created')
							.sort(
								(a, b) =>
									(b?.updatedAt?.getTime() || 0) -
									(a?.updatedAt?.getTime() || 0),
							)
							.map((note) => {
								if (!note) return null
								return (
									<Note
										key={note.id}
										note={note}
										setNoteId={setNoteId}
										form={form}
										setIsEdit={setIsEdit}
										setIsOpen={setIsOpen}
										deleteNote={deleteNote}
									/>
								)
							})}
					</ScrollArea>
				</div>
			</div>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button
						onClick={() => {
							setIsEdit(false)
						}}
					>
						Add Check Up Note
					</Button>
				</DialogTrigger>
				<DialogContent className='overflow-y-auto p-4 max-w-4xl h-[70vh]'>
					<div className='flex flex-col gap-4 justify-between w-full h-full'>
						<DialogHeader>
							<DialogTitle>Add Note</DialogTitle>
							<DialogDescription>
								Add a new note for this user
							</DialogDescription>
						</DialogHeader>
						<div className='grow'>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(onSubmit)}>
									<div className='flex flex-col gap-4 w-full'>
										<FormField
											control={form.control}
											name='title'
											render={({ field }) => (
												<FormItem className='hidden'>
													<FormLabel>Title</FormLabel>
													<FormControl>
														<Input placeholder='Title' {...field} type='text' />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name='description'
											render={({ field }) => (
												<FormItem>
													<FormLabel>Description</FormLabel>
													<FormControl>
														<Textarea
															rows={20}
															placeholder='Description'
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<div className='flex gap-4 w-full'>
											<Button className='w-full' type='submit'>
												Save
											</Button>
											<Button
												variant='outline'
												className='w-full'
												onClick={(e) => {
													e.preventDefault()
													e.stopPropagation()
													form.reset({
														title: '',
														description: '',
														state: 'created',
													})
												}}
											>
												Clear
											</Button>
										</div>
									</div>
								</form>
							</Form>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export { UserNotes }
