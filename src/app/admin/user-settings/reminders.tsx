'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import type { GetNotifications, GetUserById } from '@/types'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Toggle } from '@/components/ui/toggle'

export const dynamic = 'force-dynamic'

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

const DayToggle = ({
	notificationToggles,
	name,
	day,
}: {
	notificationToggles: GetNotifications
	name: string
	day: string
}) => {
	const toggle = notificationToggles.find((toggle) => toggle.type === name)
	const [isValue, setIsValue] = useState(
		toggle?.interval?.includes(day) ? true : false,
	)

	useEffect(() => {
		setIsValue(toggle?.interval?.includes(day) ? true : false)
	}, [notificationToggles])

	const ctx = api.useUtils()
	const { mutate: updateNotification } =
		api.user.updateNotification.useMutation({
			onSuccess: () => {
				ctx.user.invalidate()
			},
			onError: () => {
				toast.error('error')
				ctx.user.invalidate()
			},
		})

	return (
		<Toggle
			className='rounded-full border-2 h-10 w-10 capitalize'
			pressed={isValue}
			onPressedChange={(checked) => {
				if (!toggle) return
				setIsValue(checked)
				const interval = toggle.interval?.split(',') || []
				if (checked) {
					interval.push(day)
				} else {
					interval.splice(interval.indexOf(day), 1)
				}
				console.log(interval)
				updateNotification({
					id: toggle.id,
					interval: interval.filter((day) => day !== '').join(','),
					sleep: '',
				})
			}}
		>
			{day}
		</Toggle>
	)
}

const Toggles = ({
	notificationToggles,
	name,
	userId,
}: {
	notificationToggles: GetNotifications
	name: string
	userId: string
}) => {
	const ctx = api.useUtils()
	const toggle = notificationToggles.find((toggle) => toggle.type === name)
	const [value, setValue] = useState(toggle ? true : false)
	const [isDailyLog, setIsDailyLog] = useState(
		toggle?.interval === 'daily' ? true : false,
	)

	useEffect(() => {
		setValue(toggle ? true : false)
		setIsDailyLog(toggle?.interval === 'daily' ? true : false)
	}, [notificationToggles])

	const { mutate: sendNotification } = api.notifications.create.useMutation({
		onSuccess: () => {
      toast.success('Notification sent')
			ctx.user.invalidate()
		},
		onError: () => {
			toast.error('error')
			ctx.user.invalidate()
		},
	})

	const { mutate: toggleNotification } =
		api.user.toggleNotification.useMutation({
			onSuccess: () => {
				toast.success('Updated')
				ctx.user.invalidate()
			},
			onError: () => {
				toast.error('error')
				ctx.user.invalidate()
			},
		})

	const { mutate: updateNotification } =
		api.user.updateNotification.useMutation({
			onSuccess: () => {
				ctx.user.invalidate()
			},
			onError: () => {
				toast.error('error')
				ctx.user.invalidate()
			},
		})

	return (
		<div className='flex flex-col rounded-lg border px-3 py-4 gap-6 shadow-sm'>
			<div className='flex items-center justify-between gap-2'>
				<div className='space-y-0.5'>
					<Label className='capitalize'>{name}</Label>
					<div className='text-sm text-muted-foreground'>
						Will trigger a notification if the user has not logged {name}.
					</div>
				</div>
				<Switch
					checked={value}
					onCheckedChange={() => {
						setValue(!value)
						toggleNotification({
							userId: userId,
							type: name,
							interval: 'daily',
							sleep: '',
						})
					}}
				/>
				<Button
					className='w-min text-wrap h-12'
					variant='outline'
					onClick={() => {
						sendNotification({
							userId: userId,
							code: 'daily-log',
							title: `Please log your ${name
								.split(' ')
								.map((word) => word[0]?.toUpperCase() + word.slice(1))
								.join(' ')}`,
						})
					}}
				>
					Send Notification
				</Button>
			</div>
			{toggle ? (
				<div className='flex flex-col gap-4 items-center'>
					<Toggle
						className='px-12 h-12 w-max border data-[state=on]:border-none'
						pressed={isDailyLog}
						onPressedChange={(checked) => {
							updateNotification({
								id: toggle.id,
								interval: checked ? 'daily' : '',
								sleep: '',
							})
							setIsDailyLog(checked)
						}}
					>
						Daily
					</Toggle>
					{isDailyLog ? null : (
						<div className='flex w-full justify-between px-4'>
							{days.map((day) => (
								<DayToggle
									key={day}
									notificationToggles={notificationToggles}
									name={name}
									day={day}
								/>
							))}
						</div>
					)}
				</div>
			) : null}
		</div>
	)
}

const reminders = [
	'morning weight',
	'supplements',
	'front pose',
	'steps',
	'sleep',
	'sleep quality',
	'LISS',
	'HIIT',
	'weight training',
	'posing',
]

const Reminders = ({ user }: { user: GetUserById }) => {
	const { data: notificationToggles, isLoading } =
		api.user.getNotifications.useQuery({
			userId: user.id,
		})

	if (isLoading) return null
	return (
		<div className='flex flex-col gap-2 w-full p-4 border rounded-lg max-w-lg'>
			<h2 className='text-base font-semibold'>Reminders</h2>
			{notificationToggles &&
				reminders.map((reminder) => (
					<Toggles
						key={reminder}
						notificationToggles={notificationToggles}
						name={reminder}
						userId={user.id}
					/>
				))}
		</div>
	)
}

export { Reminders }
