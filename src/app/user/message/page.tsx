'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import Link from 'next/link'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import type { GetAllUsers, GetUserById } from '@/types'
import { useAtomValue } from 'jotai'
import {
	Check,
	ChevronsUpDown,
	CirclePlus,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

const SendTo = ({
	sendList,
	value,
	setValue,
}: {
	sendList: GetAllUsers | null | undefined
	value: string
	setValue: (value: string) => void
}) => {
	const [open, setOpen] = useState(false)
	if (!sendList) return null
	return (
		<Popover modal={true} open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className={cn(
						'w-[200px] justify-between px-3',
						value ? '' : 'text-muted-foreground font-normal',
					)}
				>
					{value
						? sendList.find((user) => user.id === value)?.name
						: 'Select recipient'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				className='w-[200px] p-0'
			>
				<Command>
					<CommandInput placeholder='Search...' />
					<CommandList>
						<CommandEmpty>No one found.</CommandEmpty>
						<CommandGroup>
							{sendList.map((user) => (
								<CommandItem
									key={user.id}
									value={user.name ?? user.id}
									className='data-[disabled=true]:pointer-events-auto'
									onSelect={(currentValue) => {
										const user = sendList.find(
											(user) =>
												user.name === currentValue || user.id === currentValue,
										)
										if (!user) return
										setValue(user.name === value ? '' : (user.id ?? ''))
										setOpen(false)
									}}
								>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === user.id ? 'opacity-100' : 'opacity-0',
										)}
									/>
									{user.name}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

const NewMessage = ({
	sendList,
	currentUser,
}: {
	sendList: GetAllUsers | null | undefined
	currentUser: GetUserById
}) => {
	const [message, setMessage] = useState('')
	const [recipient, setRecipient] = useState<string>('')
	const [isSending, setIsSending] = useState(false)
	const [isOpen, setIsOpen] = useState(false)

	const ctx = api.useUtils()
	const { mutate: sendMessage } = api.message.create.useMutation({
		onMutate: () => setIsSending(true),
		onSettled: () => setIsSending(false),
		onSuccess: () => {
			ctx.message.invalidate()
			toast.success('Message sent')
			setIsOpen(false)
			setMessage('')
			setRecipient('')
		},
	})

	if (!currentUser) return null
	return (
		<Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
			<DialogTrigger asChild>
				<div className='flex items-start   gap-2 px-4'>
					<CirclePlus size={20} className='cursor-pointer' />
					<div className=''>New Message Chat</div>
				</div>
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				className='flex flex-col gap-4'
			>
				<DialogHeader>
					<DialogTitle>New Message</DialogTitle>
					<DialogDescription></DialogDescription>
					<SendTo
						sendList={sendList}
						value={recipient}
						setValue={setRecipient}
					/>
				</DialogHeader>

				<Textarea
					placeholder='Message'
					value={message}
					rows={12}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className='flex gap-4'>
					<Button
						className='w-full'
						disabled={isSending}
						onClick={() => {
							if (message === '') return toast.error('Message cannot be empty')
							sendMessage({
								message: message,
								subject: '',
								userId: recipient,
								fromUserId: currentUser.id,
								isImportant: false,
							})
						}}
					>
						{isSending ? 'Sending' : 'Send'}
					</Button>
					<Button
						className='w-full'
						onClick={() => {
							setRecipient('')
							setMessage('')
						}}
					>
						Clear
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

const RecentMessages = ({
	userId,
	currentUser,
}: {
	userId: string
	currentUser: GetUserById
}) => {
	const { data: messages } = api.message.getAllUser.useQuery(currentUser.id)
	const { data: sentMessages } = api.message.getAllFromUser.useQuery(
		currentUser.id,
	)

	if (userId === '') return null

	const m = messages
		?.filter((message) => message.fromUser?.id === userId)
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)[0]
	const s = sentMessages
		?.filter((message) => message.user?.id === userId)
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)[0]

	if (!m && !s) return null

	const r =
		(m?.createdAt ?? -1) > (s?.createdAt ?? -1)
			? { ...m, r: m?.fromUser }
			: { ...s, r: s?.user }

	return (
		<Link key={userId} href={`/user/message/${userId}`}>
			<div className='px-2 py-2 bg-card w-screen '>
				<div className='flex justify-between items-baseline'>
					<div className='font-semibold text-primary/80  text-base'>
						{r.r?.name}
					</div>
					<div className='text-[0.7rem] text-muted-foreground'>
						{new Date(r.createdAt ?? '').toLocaleDateString('en-AU', {
							month: 'short',
							day: 'numeric',
							year: 'numeric',
						})}
					</div>
				</div>
				<div className='truncate text-sm text-muted-foreground'>
					{r.message}
				</div>
			</div>
		</Link>
	)
}

const Messages = ({ currentUser }: { currentUser: GetUserById }) => {
	const { data: messages, isLoading: messagesLoading } =
		api.message.getAllUser.useQuery(currentUser.id)
	const { data: sentMessages, isLoading: sentMessageLoading } =
		api.message.getAllFromUser.useQuery(currentUser.id)
	const { data: getAllUser, isLoading: getAllUserLoading } =
		api.user.getAll.useQuery()

	if (messagesLoading || sentMessageLoading || getAllUserLoading) return null

	const s = sentMessages?.map((message) => {
		return {
			date: message.createdAt,
			user: { ...message.user },
		}
	})
	const m = messages?.map((message) => {
		return {
			date: message.createdAt,
			user: { ...message.fromUser },
		}
	})

	const l = [...(s ?? []), ...(m ?? [])]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.filter((message, index, self) => {
			return self.findIndex((t) => t.user.id === message.user.id) === index
		})

	const sendList = getAllUser?.filter((user) => {
		if (currentUser.isRoot) return true
		if (currentUser.isCreator) return true
		if (currentUser.id === user.id) return false
		if (currentUser.isTrainer) return true

		if (user.isTrainer) return true
		return false
	}).filter((user) => {
    return l.findIndex((message) => message.user.id === user.id) === -1
  })

	return (
		<div className='flex gap-4 flex-col mt-20 max-w-[100vw]'>
			<NewMessage sendList={sendList} currentUser={currentUser} />
			<ScrollArea className='h-[calc(100vh-170px)]'>
				<div className='flex gap-4 flex-col'>
					{l.map((message) => (
						<RecentMessages
							key={message.user.id}
							userId={message.user.id ?? ''}
							currentUser={currentUser}
						/>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export default function Page() {
	const impersonatedUser = useAtomValue(impersonatedUserAtom)
	const { data: currentUser } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})

	if (!currentUser) return null
	return <Messages currentUser={currentUser} />
}
