'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import type { Item } from './notifications'

export const dynamic = 'force-dynamic'

const Notification = ({
	currentUserId,
	item: message,
	isSeparator,
}: {
	currentUserId: string
	item: Item
	isSeparator: boolean
}) => {
	const ctx = api.useUtils()
	const { mutate: markNotificationAsViewed } =
		api.notifications.markAsViewed.useMutation({
			onMutate: async (newMessage) => {
				await ctx.notifications.getAllUser.cancel()
				const previousLog = ctx.notifications.getAllUser.getData(currentUserId)
				if (!previousLog) return
				ctx.notifications.getAllUser.setData(currentUserId, [
					...previousLog.map((message) => {
						if (message.id === newMessage) {
							return {
								...message,
								isViewed: true,
								isRead: true,
							}
						}
						return message
					}),
				])
				return { previousLog }
			},
			onSettled: () => {
				ctx.notifications.invalidate()
			},
			onError: (_err, _newNotification, context) => {
				toast.error('error')
				ctx.notifications.getAllUser.setData(
					currentUserId,
					context?.previousLog,
				)
			},
		})
	const { mutate: markAsViewed } = api.message.markAsViewed.useMutation({
		onMutate: async (newMessage) => {
			await ctx.message.getAllUser.cancel()
			const previousLog = ctx.message.getAllUser.getData(currentUserId)
			if (!previousLog) return
			ctx.message.getAllUser.setData(currentUserId, [
				...previousLog.map((message) => {
					if (message.id === newMessage) {
						return {
							...message,
							isViewed: true,
						}
					}
					return message
				}),
			])
			return { previousLog }
		},
		onSettled: () => {
			ctx.message.invalidate()
		},
		onError: (_err, _newPoopLog, context) => {
			toast.error('error')
			ctx.message.getAllUser.setData(currentUserId, context?.previousLog)
		},
	})
	const { mutate: markAsRead } = api.message.markAsRead.useMutation({
		onMutate: async (newMessage) => {
			await ctx.message.getAllUser.cancel()
			const previousLog = ctx.message.getAllUser.getData(currentUserId)
			if (!previousLog) return
			ctx.message.getAllUser.setData(currentUserId, [
				...previousLog.map((message) => {
					if (message.id === newMessage) {
						return {
							...message,
							isRead: true,
						}
					}
					return message
				}),
			])
			return { previousLog }
		},
		onSettled: () => {
			ctx.message.invalidate()
		},
		onError: (_err, _newPoopLog, context) => {
			toast.error('error')
			ctx.message.getAllUser.setData(currentUserId, context?.previousLog)
		},
	})

	return (
		<div>
			<DropdownMenuItem
				className={cn(
					'm-0 py-2 w-full',
					message.isViewed === false || message.isViewed === null
						? 'bg-yellow-200/80'
						: '',
				)}
				onSelect={(e) => {
					e.preventDefault()
				}}
				onClick={() => {
					if (message.isRead === false || message.isRead === null) {
						if (message.state === 'message') {
							markAsViewed(message.id)
						}
						if (message.state === 'notification') {
							markNotificationAsViewed(message.id)
						}
					}
				}}
				key={message.id}
			>
				<Collapsible className='w-full'>
					<CollapsibleTrigger asChild>
						<div
							className={cn(
								'flex items-center justify-between w-full gap-4',
								message.isViewed === false || message.isViewed === null
									? 'text-foreground font-semibold'
									: '',
							)}
						>
							{message.state === 'message' ? (
								<>
									<div className='text-xs truncate'>
										{message.isViewed === false || message.isViewed === null
											? 'New Message'
											: `${message.content}`}
									</div>
									<div className='flex'>
										<div className='font-normal text-[0.65rem] text-muted-foreground'>
											{`from ${message.fromUser}`}
										</div>
										<div className='text-sm text-muted-foreground'>
											{message.isViewed === false ||
											message.isViewed === null ? (
												<div className='w-2 h-2 bg-red-600 rounded-full' />
											) : (
												<div className='w-2' />
											)}
										</div>
									</div>
								</>
							) : (
								<>
									<div className='text-sm truncate'>{message.content}</div>
									<div className='text-sm text-muted-foreground'>
										{message.isViewed === false || message.isViewed === null ? (
											<div className='w-2 h-2 bg-red-600 rounded-full' />
										) : (
											<div className='w-2' />
										)}
									</div>
								</>
							)}
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className='flex flex-col gap-2 items-center'>
							{message.state === 'message' ? (
								<Link href={`/user/message/${message.userId}`}>
									<Button
										className=''
										variant='outline'
										size='sm'
										onClick={() => {
											markAsRead(message.id)
										}}
									>
										Go to message
									</Button>
								</Link>
							) : null}
						</div>
					</CollapsibleContent>
				</Collapsible>
			</DropdownMenuItem>
			{isSeparator ? (
				<DropdownMenuSeparator className='my-0 bg-primary/20' />
			) : null}
		</div>
	)
}

export { Notification }
