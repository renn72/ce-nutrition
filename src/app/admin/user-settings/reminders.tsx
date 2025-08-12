'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import type { GetNotifications, GetUserById } from '@/types'
import { toast } from 'sonner'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export const dynamic = 'force-dynamic'

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
	useEffect(() => {
		setValue(toggle ? true : false)
	}, [notificationToggles])

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

	return (
		<div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
			<div className='space-y-0.5'>
				<Label>Set Interval for {name}</Label>
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
		</div>
	)
}

const Reminders = ({ user }: { user: GetUserById }) => {
	const { data: notificationToggles, isLoading } =
		api.user.getNotifications.useQuery({
			userId: user.id,
		})

	if (isLoading) return null
	return (
		<div className='flex flex-col gap-2 w-full p-4 border rounded-lg max-w-lg'>
			<h2 className='text-base font-semibold'>Reminders</h2>
			{notificationToggles && (
				<Toggles
					notificationToggles={notificationToggles}
					name='supplements'
					userId={user.id}
				/>
			)}
		</div>
	)
}

export { Reminders }
