'use client'

import { api } from '@/trpc/react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import { atom } from 'jotai'
import { Bell, BellDot } from 'lucide-react'
import { toast } from 'sonner'
import type { PushSubscription } from 'web-push'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Notification } from './notification'

export const subscriptionAtom = atom<PushSubscription | null>(null)

export const dynamic = 'force-dynamic'

export interface Item {
	id: number
	createdAt: Date
	content: string
	isRead: boolean | null
	isViewed: boolean | null
	isNotified: boolean | null
	fromUser: string
	userId: string
	state: string
}

const NotificationsComp = ({ currentUserId }: { currentUserId: string }) => {
	const [isOpen, setIsOpen] = useState(false)
	const ctx = api.useUtils()
	const origin = window.location.origin
	const timing = origin === 'http://localhost:3000' ? 20 : 2
	const { data: userNotifications, isLoading } =
		api.notifications.getAllUserUnread.useQuery(currentUserId, {
			refetchInterval: 1000 * 60 * timing,
		})
	const { data: userMessages } = api.message.getAllUserUnread.useQuery(
		currentUserId,
		{
			refetchInterval: 1000 * 60 * timing,
		},
	)

	const { mutate: markAllNotificationsAsViewed } =
		api.notifications.markAllAsViewed.useMutation({
			onSuccess: () => {
				ctx.notifications.invalidate()
				setIsOpen(false)
			},
			onError: () => {
				toast.error('error')
				ctx.notifications.invalidate()
			},
		})
	const { mutate: markAllMessagesAsViewed } =
		api.message.markAllAsViewed.useMutation({
			onSuccess: () => {
				ctx.message.invalidate()
				setIsOpen(false)
			},
			onError: () => {
				toast.error('error')
				ctx.message.invalidate()
			},
		})

	const fullList: Item[] = [
		...(userMessages?.map((message) => ({
			id: message.id,
			createdAt: message.createdAt,
			content: message.message || '',
			isRead: message.isRead,
			isViewed: message.isViewed,
			isNotified: message.isNotified,
			fromUser: message.fromUser?.name || '',
			userId: message.fromUser?.id || '',
			state: 'message',
		})) || []),
		...(userNotifications?.map((message) => ({
			id: message.id,
			createdAt: message.createdAt,
			content: message.title || '',
			isRead: message.isRead,
			isViewed: message.isViewed,
			isNotified: message.isNotified,
			fromUser: '',
			userId: '',
			state: 'notification',
		})) || []),
	]

	const isNotifications = fullList?.some(
		(message) => message.isViewed === false || message.isViewed === null,
	)

	if (isLoading)
		return (
			<Bell size={36} className='p-1 rounded-full cursor-pointer bg-accentt' />
		)

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				{isNotifications ? (
					<div className={cn('relative', isNotifications ? '' : '')}>
						<BellDot
							size={36}
							className='p-1 rounded-full cursor-pointer bg-accentt'
						/>
						<div className='absolute w-3 h-3 bg-red-600 rounded-full top-[7px] right-[6px]'></div>
						<div className='absolute w-3 h-3 bg-red-600 rounded-full top-[7px] right-[6px]'></div>
					</div>
				) : (
					<Bell
						size={36}
						className='p-1 rounded-full cursor-pointer bg-accentt'
					/>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				forceMount
				alignOffset={-28}
				align='end'
				sideOffset={8}
				className='px-0 pb-0 min-w-[240px] max-w-[98vw]'
			>
				<div className='flex justify-between items-center py-1 px-1'>
					<DropdownMenuLabel>Notifications</DropdownMenuLabel>
					<Button
						className='h-6 font-light text-[0.7rem]'
						size='sm'
						variant='outline'
						onClick={() => {
							markAllNotificationsAsViewed(currentUserId)
							markAllMessagesAsViewed(currentUserId)
						}}
					>
						Clear
					</Button>
				</div>
				<DropdownMenuSeparator className='my-0 bg-primary/20' />
				{fullList
					?.filter(
						(message) => message.isRead === false || message.isRead === null,
					)
					.map((message, index) => (
						<Notification
							key={message.id}
							currentUserId={currentUserId}
							item={message}
							isSeparator={
								fullList?.filter(
									(message) =>
										message.isRead === false || message.isRead === null,
								)?.length ===
								index + 1
									? true
									: false
							}
						/>
					))}
				{fullList?.filter(
					(message) => message.isRead === false || message.isRead === null,
				)?.length === 0 ? (
					<div className='flex py-2 px-2 w-full text-xs text-muted-foreground'>
						No new notifications
					</div>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const Notifications = ({ currentUserId }: { currentUserId: string }) => {
	if (currentUserId === '')
		return (
			<Bell size={36} className='p-1 rounded-full cursor-pointer bg-accentt' />
		)

	return <NotificationsComp currentUserId={currentUserId} />
}

export { Notifications }
