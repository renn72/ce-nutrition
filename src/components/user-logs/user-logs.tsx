'use client'

import { useState } from 'react'
import { api } from '@/trpc/react'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { getFormattedDate } from '@/lib/utils'
import type { GetUserById } from '@/types'

import { DailyLogCard } from '@/components/daily-log/daily-log-card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const DailyLogs = ({
	userId,
	user,
	isAdmin = false,
	days = 7,
	isDanger = false,
	cols = 3,
}: {
	user: GetUserById
	userId: string
	isAdmin?: boolean
	days?: number
	isDanger?: boolean
	cols?: number
}) => {
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId || '')
	const today = new Date()
	const isMobile = useClientMediaQuery('(max-width: 600px)')

	const content = (
		<>
			{Array.from({ length: days }).map((_, i) => {
				const date = new Date(today.getTime() - i * 86400000)
				const yesterdaysDate = new Date(today.getTime() - (i + 1) * 86400000)
				const dailyLog = dailyLogs?.find(
					(dailyLog) => dailyLog.date === date.toDateString(),
				)
				const yesterdaysDailyLog = dailyLogs?.find(
					(dailyLog) => dailyLog.date === yesterdaysDate.toDateString(),
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
						yesterdaysDailyLog={yesterdaysDailyLog}
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

	const gridCols: Record<number, string> = {
		1: 'grid-cols-1',
		2: 'grid-cols-2',
		3: 'grid-cols-3',
		4: 'grid-cols-4',
		5: 'grid-cols-5',
		6: 'grid-cols-6',
		7: 'grid-cols-7',
	}

	return (
		<div
			className={cn(
				'grid gap-4 w-max place-content-center',
				gridCols[cols] || 'grid-cols-3',
			)}
		>
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
	const [cols, setCols] = useState(3)

	if (!user) return null

	const content = (
		<div className='flex flex-col gap-2 items-center px-1 w-full lg:gap-4'>
			<div className='flex flex-wrap gap-4 justify-center items-center'>
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
				{!isMobile && (
					<div className='flex gap-2 items-center'>
						<Label className='text-sm'>Columns</Label>
						<Select
							value={cols.toString()}
							onValueChange={(val) => setCols(Number(val))}
						>
							<SelectTrigger className='w-[70px]'>
								<SelectValue placeholder='Cols' />
							</SelectTrigger>
							<SelectContent>
								{Array.from({ length: 7 }).map((_, i) => (
									<SelectItem key={i + 1} value={(i + 1).toString()}>
										{i + 1}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				)}
			</div>
			<DailyLogs
				user={user}
				isAdmin={isAdmin}
				userId={userId}
				days={days}
				isDanger={isDanger}
				cols={cols}
			/>
		</div>
	)

	if (isMobile) {
		return (
			<div className='flex flex-col items-center px-1 mt-6 mb-20 w-full'>
				{content}
			</div>
		)
	}
	return <div className='flex flex-col gap-4 items-center my-10'>{content}</div>
}

export { UserLogs }
