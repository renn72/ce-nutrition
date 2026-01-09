'use client'

import { useState } from 'react'
import { api } from '@/trpc/react'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { getFormattedDate } from '@/lib/utils'
import type { GetUserById } from '@/types'

import { DailyLog } from '@/components/daily-log/daily-log'
import { DailyLogCard } from '@/components/daily-log/daily-log-card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Switch } from '../ui/switch'

const DailyLogs = ({
	userId,
	user,
	isAdmin = false,
	days = 7,
	isDanger = false,
}: {
	user: GetUserById
	userId: string
	isAdmin?: boolean
	days?: number
	isDanger?: boolean
}) => {
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId || '')
	const today = new Date()
	const isMobile = useClientMediaQuery('(max-width: 600px)')

	const content = (
		<>
			{Array.from({ length: days }).map((_, i) => {
				const date = new Date(today.getTime() - i * 86400000)
				const dailyLog = dailyLogs?.find(
					(dailyLog) => dailyLog.date === date.toDateString(),
				)
				const title = `${date.toLocaleDateString('en-AU', {
					weekday: 'long',
				})} ${getFormattedDate(date)}`
				if (!dailyLog) return null
				return (
					<DailyLogCard
						key={dailyLog.id}
						title={title}
						currentUser={user}
						dailyLog={dailyLog}
						date={date}
						isAdmin={isAdmin}
						isLogPage={true}
						isDanger={isDanger}
					/>
				)
			})}
		</>
	)

	if (isMobile) {
		return (
			<div className='flex flex-col gap-2 items-center w-full'>{content}</div>
		)
	}
	return (
		<div className='grid grid-cols-3 gap-4 w-full max-w-screen-xl'>
			{content}
		</div>
	)
}

const UserLogs = ({
	userId,
	isAdmin = false,
}: {
	userId: string
	isAdmin?: boolean
}) => {
	const isMobile = useClientMediaQuery('(max-width: 600px)')
	const { data: user } = api.user.get.useQuery(userId || '')
	const [days, setDays] = useState(30)
	const [isDanger, setIsDanger] = useState(false)

	if (!user) return null

	const content = (
		<div className='flex flex-col gap-4 items-center px-1 w-full'>
			<div className='flex gap-4 items-center'>
				<ToggleGroup
					type='single'
					variant='outline'
					value={days.toString()}
					onValueChange={(value) => {
						if (value) setDays(Number(value))
					}}
				>
					<ToggleGroupItem value='7' aria-label='Week'>
						Week
					</ToggleGroupItem>
					<ToggleGroupItem value='30' aria-label='Month'>
						Month
					</ToggleGroupItem>
					<ToggleGroupItem value='90' aria-label='3 Months'>
						3 Months
					</ToggleGroupItem>
					<ToggleGroupItem value='365' aria-label='Year'>
						Year
					</ToggleGroupItem>
				</ToggleGroup>
				<Switch checked={isDanger} onCheckedChange={setIsDanger} />
			</div>
			<DailyLogs
				user={user}
				isAdmin={isAdmin}
				userId={userId}
				days={days}
				isDanger={isDanger}
			/>
		</div>
	)

	if (isMobile) {
		return (
			<div className='flex flex-col gap-4 items-center px-1 mt-2 mb-20 w-full'>
				{content}
			</div>
		)
	}
	return <div className='flex flex-col gap-4 items-center my-10'>{content}</div>
}

export { UserLogs }
