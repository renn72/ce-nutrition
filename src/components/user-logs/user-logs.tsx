'use client'

import { api } from '@/trpc/react'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { getFormattedDate } from '@/lib/utils'
import type { GetUserById } from '@/types'

import { DailyLog } from '@/components/daily-log/daily-log'

const DailyLogs = ({
	userId,
	user,
	isAdmin = false,
}: {
	user: GetUserById
	userId: string
	isAdmin?: boolean
}) => {
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId || '')
	const today = new Date()

	return (
		<div className='flex flex-col gap-0 items-center max-w-md'>
			{Array.from({ length: 21 }).map((_, i) => {
				const date = new Date(today.getTime() - i * 86400000)
				const dailyLog = dailyLogs?.find(
					(dailyLog) => dailyLog.date === date.toDateString(),
				)
				if (!dailyLog) return null
				return (
					<div key={dailyLog.id} className='flex gap-2 flex-col w-full my-2'>
						<div className='text-sm text-muted-foreground font-semibold text-center'>
							{`${date.toLocaleDateString('en-AU', {
								weekday: 'long',
							})} ${getFormattedDate(date)}`}
						</div>
						<DailyLog
							currentUser={user}
							dailyLog={dailyLog}
							date={date}
							isAdmin={isAdmin}
							isLogPage={true}
						/>
					</div>
				)
			})}
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

	if (!user) return null

	if (isMobile) {
		return (
			<div className='flex flex-col gap-4 items-center mb-10 mt-2 max-w-[calc(100vw-40px)] '>
				<DailyLogs userId={userId} user={user} />
			</div>
		)
	}
	return (
		<div className='flex flex-col gap-4 items-center my-10 '>
				<DailyLogs user={user} isAdmin={isAdmin} userId={userId} />
		</div>
	)
}

export { UserLogs }
