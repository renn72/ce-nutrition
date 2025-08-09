'use client'

import { api } from '@/trpc/react'

import { use, useState } from 'react'

import { useRouter } from 'next/navigation'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import type { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { ArrowLeft, Send, XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'

const Messages = ({
	currentUser,
	userId,
}: {
	currentUser: GetUserById
	userId: string
}) => {
	const [message, setMessage] = useState('')
	const [isSending, setIsSending] = useState(false)
	const { data: messages, isLoading: messagesLoading } =
		api.message.getAllUser.useQuery(currentUser.id)
	const { data: sentMessages, isLoading: sentMessageLoading } =
		api.message.getAllFromUser.useQuery(currentUser.id)

	const router = useRouter()

	const ctx = api.useUtils()
	const { mutate: sendMessage } = api.message.create.useMutation({
		onMutate: () => setIsSending(true),
		onSettled: () => setIsSending(false),
		onSuccess: () => {
			ctx.message.invalidate()
			setMessage('')
		},
	})

	if (messagesLoading || sentMessageLoading) return null

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

	console.log('m', m)
	console.log('s', s)

	const l = [...(s ?? []), ...(m ?? [])]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		)
		.filter((message, index, self) => {
			return self.findIndex((t) => t.id === message.id) === index
		})

	const userName = l?.[0]?.user?.name ?? ''

	return (
		<div className='flex flex-col gap-4 w-full mt-16 justify-between h-[calc(100vh-120px)]'>
			<div
				className='flex gap-8 items-start text-primary text-lg font-semibold border-b py-2 border-t'
				onClick={() => router.push('/user/message')}
			>
				<ArrowLeft size={24} strokeWidth={2.5} className='cursor-pointer' />
				<div className=''>{userName}</div>
			</div>
			<ScrollArea className='h-[calc(100vh-170px)]'>
				<div className='flex flex-col gap-4 w-full px-1'>
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
									'max-w-[80vw] px-2 py-1  rounded-lg shadow-sm whitespace-pre-line w-max',
									message.user.status === 'received'
										? 'bg-secondary text-secondary-foreground'
										: 'bg-accent text-accent-foreground',
									message.user.status === 'received' ? '' : '',
								)}
							>
								<div>{message.message}</div>
								<div className={cn('text-[0.7rem]',
                  message.user.status === 'received' ? 'text-secondary-foreground' : 'text-accent-foreground text-end'
                )}>
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
			<div className='flex gap-4 items-center'>
				<Textarea
					placeholder='Message'
					value={message}
					rows={2}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<div className='flex items-center justify-center rounded-full h-12 w-12 border-2 border-primary shrink-0 mr-2'>
					<Send
						size={28}
						className='cursor-pointer mr-[2px]'
						onClick={() => {
							if (message === '') return
							sendMessage({
								message: message,
								subject: '',
								userId: userId,
								fromUserId: currentUser.id,
								isImportant: false,
							})
						}}
					/>
				</div>
			</div>
		</div>
	)
}

const Page = ({ params }: { params: Promise<{ user: string }> }) => {
	const { user: userId } = use(params)
	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: currentUser, isLoading: getAllUserLoading } =
		api.user.getCurrentUser.useQuery({
			id: impersonatedUser.id,
		})

	console.log('userId', userId)

	if (!userId) return null
	if (getAllUserLoading) return null
	if (!currentUser) return null
	return (
		<>
			<Messages currentUser={currentUser} userId={userId} />
			{impersonatedUser.id !== '' ? (
				<div className='fixed bottom-14 left-1/2 -translate-x-1/2 opacity-80'>
					<Badge className='flex gap-4'>
						{impersonatedUser.name}
						<XIcon
							size={12}
							className='cursor-pointer'
							onClick={() => {
								setImpersonatedUser({
									id: '',
									name: '',
								})
							}}
						/>
					</Badge>
				</div>
			) : null}
		</>
	)
}

export default Page
