'use client'

import { api } from '@/trpc/react'

import { useState, useEffect } from 'react'

import { cn } from '@/lib/utils'
import type { GetUserById } from '@/types'
import { Send } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

import { SpinnerGapIcon } from '@phosphor-icons/react'

const UserMessages = ({
	currentUserId,
	userId,
	className,
}: {
	currentUserId: string
	userId: string
	className?: string
}) => {
	const [message, setMessage] = useState('')
	const { data: messages, isLoading: messagesLoading } =
		api.message.getAllUser.useQuery(currentUserId)
	const { data: sentMessages, isLoading: sentMessageLoading } =
		api.message.getAllFromUser.useQuery(currentUserId)

	const ctx = api.useUtils()
	const { mutate: sendMessage } = api.message.create.useMutation({
		onSuccess: () => {
			ctx.message.invalidate()
			setMessage('')
		},
	})

	const { mutate: markViewed } =
		api.message.markFromUserAsViewedAndRead.useMutation({
			onSuccess: () => {
				console.log('success')
				ctx.message.invalidate()
			},
		})

	const s = sentMessages
		?.map((message) => {
			return {
				...message,
				user: { ...message.user, status: 'sent' },
			}
		})
		?.filter((message) => message.user?.id === userId)
	const m = messages
		?.map((message) => {
			return {
				...message,
				user: { ...message.fromUser, status: 'received' },
			}
		})
		?.filter((message) => message.user?.id === userId)

	const l = [...(s ?? []), ...(m ?? [])]
		.sort(
			(a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
		)
		.filter((message, index, self) => {
			return self.findIndex((t) => t.id === message.id) === index
		})

	useEffect(() => {
		const shouldSkip =
			m?.reduce((acc, curr) => {
				if (curr.isViewed) return acc
				return true
			}, false) || true

		console.log('check')
		if (shouldSkip) return
		markViewed(userId)
		console.log('mark')
	}, [userId, m])

	if (messagesLoading || sentMessageLoading)
		return (
			<div className='flex flex-col justify-center items-center mt-20'>
				<SpinnerGapIcon size={48} className='animate-spin' />
			</div>
		)

	return (
		<div
			className={cn(
				'flex flex-col gap-4 justify-between rounded-md border p-2 w-full',
				className,
			)}
		>
			<ScrollArea className=''>
				<div className='flex flex-col gap-4 px-1 w-full'>
					{l.map((message) => (
						<div
							key={message.id}
							className={cn(
								'flex w-full flex-col',
								message.user.status === 'received' ? '' : 'items-end',
							)}
						>
							<div
								className={cn(
									' px-2 py-1 rounded-lg shadow-sm whitespace-pre-line w-full',
									message.user.status === 'received'
										? 'bg-secondary text-secondary-foreground'
										: 'bg-accent text-accent-foreground',
									message.user.status === 'received' ? '' : '',
								)}
							>
								<div className='word-wrap'>{message.message}</div>
								<div
									className={cn(
										'text-[0.7rem]',
										message.user.status === 'received'
											? 'text-secondary-foreground'
											: 'text-accent-foreground text-end',
									)}
								>
									{message.createdAt.toLocaleDateString('en-AU', {
										hour: 'numeric',
										minute: 'numeric',
									})}
								</div>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
			<div className='flex gap-2 items-center px-2'>
				<Textarea
					placeholder='Message'
					value={message}
					rows={2}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className='flex justify-center items-center w-12 h-12 rounded-full border-2 border-primary shrink-0'>
					<Send
						size={28}
						className='cursor-pointer mr-[3px]'
						onClick={() => {
							if (message === '') return
							sendMessage({
								message: message,
								subject: '',
								userId: userId,
								fromUserId: currentUserId,
								isImportant: false,
							})
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export { UserMessages }
