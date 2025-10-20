'use client'

import { api } from '@/trpc/react'
import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetUserById } from '@/types'
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
import { NotificationTrigger } from './notification-trigger'
import { PushNotificationManager } from './push-notifications'

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

const Notifications = ({ currentUser }: { currentUser: GetUserById }) => {
	const [isOpen, setIsOpen] = useState(false)
	const ctx = api.useUtils()
  const origin = window.location.origin
  const timing = origin === 'http://localhost:3000' ? 20 : 2
	const { data: userNotifications, isLoading } =
		api.notifications.getAllUserUnread.useQuery(currentUser.id, {
			refetchInterval: 1000 * 60 * timing,
		})
	const { data: userMessages } = api.message.getAllUserUnread.useQuery(
		currentUser.id,
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
			<Bell
				size={36}
				className='bg-accentt cursor-pointer rounded-full p-1'
			/>
		)

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<NotificationTrigger currentUser={currentUser} items={fullList} />
			<DropdownMenuTrigger asChild>
				{isNotifications ? (
					<div className={cn('relative', isNotifications ? '' : '')}>
						<BellDot
							size={36}
							className='bg-accentt cursor-pointer rounded-full p-1'
						/>
						<div className='absolute top-[7px] right-[6px] w-3 h-3 bg-red-600 rounded-full '></div>
						<div className='absolute top-[7px] right-[6px] w-3 h-3 bg-red-600 rounded-full '></div>
					</div>
				) : (
					<Bell
						size={36}
						className='bg-accentt cursor-pointer rounded-full p-1'
					/>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				forceMount
				alignOffset={-28}
				align='end'
				sideOffset={8}
				className='min-w-[240px] px-0 pb-0 max-w-[98vw]'
			>
				<div className='flex items-center justify-between py-1 px-1'>
					<DropdownMenuLabel>Notifications</DropdownMenuLabel>
					<Button
						className='text-[0.7rem] font-light h-6'
						size='sm'
						variant='outline'
						onClick={() => {
							markAllNotificationsAsViewed(currentUser.id)
              markAllMessagesAsViewed(currentUser.id)
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
							currentUser={currentUser}
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
					<div className='w-full flex py-2 px-2 text-muted-foreground text-xs'>
						No new notifications
					</div>
				) : null}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { Notifications }
