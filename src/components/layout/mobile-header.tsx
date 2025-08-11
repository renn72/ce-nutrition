'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import Image from 'next/image'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import type { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { Bell, BellDot, NotebookText } from 'lucide-react'
import { Link, useTransitionRouter } from 'next-view-transitions'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'

const Notifications = ({ currentUser }: { currentUser: GetUserById }) => {
	const ctx = api.useUtils()
	const { data: userNotifications } = api.notifications.getAllUser.useQuery(
		currentUser.id,
	)
	const { data: userMessages } = api.message.getAllUser.useQuery(currentUser.id)
	const { mutate: markNotificationAsViewed } =
		api.notifications.markAsViewed.useMutation({
			onMutate: async (newMessage) => {
				await ctx.notifications.getAllUser.cancel()
				const previousLog = ctx.notifications.getAllUser.getData(currentUser.id)
				if (!previousLog) return
				ctx.notifications.getAllUser.setData(currentUser.id, [
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
					currentUser.id,
					context?.previousLog,
				)
			},
		})
	const { mutate: markAsViewed } = api.message.markAsViewed.useMutation({
		onMutate: async (newMessage) => {
			await ctx.message.getAllUser.cancel()
			const previousLog = ctx.message.getAllUser.getData(currentUser.id)
			if (!previousLog) return
			ctx.message.getAllUser.setData(currentUser.id, [
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
			ctx.message.getAllUser.setData(currentUser.id, context?.previousLog)
		},
	})
	const { mutate: markAsRead } = api.message.markAsRead.useMutation({
		onMutate: async (newMessage) => {
			await ctx.message.getAllUser.cancel()
			const previousLog = ctx.message.getAllUser.getData(currentUser.id)
			if (!previousLog) return
			ctx.message.getAllUser.setData(currentUser.id, [
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
			ctx.message.getAllUser.setData(currentUser.id, context?.previousLog)
		},
	})

	const fullList = [
		...(userMessages?.map((message) => ({
			id: message.id,
			createdAt: message.createdAt,
			content: message.message,
			isRead: message.isRead,
			isViewed: message.isViewed,
			fromUser: message.fromUser?.name || '',
      userId: message.fromUser?.id,
			state: 'message',
		})) || []),
		...(userNotifications?.map((message) => ({
			id: message.id,
			createdAt: message.createdAt,
			content: message.title,
			isRead: message.isRead,
			isViewed: message.isViewed,
			fromUser: '',
      userId: '',
			state: 'notification',
		})) || []),
	]

	const isNotifications = fullList?.some(
		(message) => message.isViewed === false || message.isViewed === null,
	)

	return (
		<DropdownMenu>
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
				alignOffset={-28}
				align='end'
				sideOffset={8}
				className='min-w-[240px] px-0 pb-0'
			>
				<DropdownMenuLabel>Notifications</DropdownMenuLabel>
				<DropdownMenuSeparator className='my-0 bg-primary/20' />
				{fullList
					?.filter(
						(message) => message.isRead === false || message.isRead === null,
					)
					.map((message, index) => (
						<div key={message.id}>
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
								<Collapsible
                  className='w-full'
                >
									<CollapsibleTrigger asChild>
										<div
											className={cn(
												'flex items-center justify-between w-full',
												message.isViewed === false || message.isViewed === null
													? 'text-foreground font-semibold'
													: '',
											)}
										>
											{message.state === 'message' ? (
												<>
													<div className='truncate'>
														{message.isViewed === false ||
														message.isViewed === null
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
																<div className='h-2 w-2 rounded-full bg-red-600' />
															) : (
																<div className='w-2' />
															)}
														</div>
													</div>
												</>
											) : (
												<>
													<div className='truncate'>{message.content}</div>
													<div className='text-sm text-muted-foreground'>
														{message.isViewed === false ||
														message.isViewed === null ? (
															<div className='h-2 w-2 rounded-full bg-red-600' />
														) : (
															<div className='w-2' />
														)}
													</div>
												</>
											)}
										</div>
									</CollapsibleTrigger>
									<CollapsibleContent>
										<div className='flex gap-2 items-center flex-col'>
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
							{fullList?.filter(
								(message) =>
									message.isRead === false || message.isRead === null,
							)?.length ===
							index + 1 ? null : (
								<DropdownMenuSeparator className='my-0 bg-primary/20' />
							)}
						</div>
					))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
const MobileHeader = ({ isDesktop = false }: { isDesktop?: boolean }) => {
	const [impersonatedUser, _setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})
	if (isLoading) return null
	if (!currentUser) return null
	return (
		<div
			className={cn(
				'grid grid-cols-3 items-center justify-around fixed z-10 bg-background',
				isDesktop ? 'top-[129px] w-[388px]' : 'top-0 w-full ',
			)}
		>
			<div className='flex flex-col gap-0 items-center justify-center'>
				<Link href='/user/program'>
					<NotebookText
						size={36}
						className='bg-accentt cursor-pointer rounded-full p-1'
					/>
				</Link>
				<Label className='text-xs text-muted-foreground'>Plans</Label>
			</div>
			<div className='flex items-center justify-center rounded-full border-2 border-primary/50 m-1 w-max place-self-center'>
				<Link
					className='hover:opacity-100 opacity-80 transition-all active:scale-90 p-[2px]'
					href='/'
				>
					<Image
						src='/logo/ce.png'
						alt='logo'
						width={42}
						height={42}
						priority
						style={{
							height: 'auto',
						}}
					/>
				</Link>
			</div>
			<div className='flex flex-col gap-0 items-center justify-center'>
				<Notifications currentUser={currentUser} />
				<Label className='text-xs text-muted-foreground'>Notifications</Label>
			</div>
		</div>
	)
}

export { MobileHeader }
