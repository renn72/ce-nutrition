'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import type { GetDailyLogById, GetUserById } from '@/types'
import { CircleX, CircleParking } from 'lucide-react'
import { Link } from 'next-view-transitions'

import { getPeriodStatusDays } from '@/lib/period'
import { Badge } from '@/components/ui/badge'

const Text = ({
	title,
	text: textRaw,
	suffix = '',
	isWidthFull = false,
	isNumber = false,
	fixed = 1,
}: {
	suffix?: string
	title: string
	text: string | undefined | null
	isWidthFull?: boolean
	isNumber?: boolean
	fixed?: number
}) => {
	const text = isNumber
		? textRaw && textRaw !== ''
			? Number(textRaw).toFixed(fixed)
			: ''
		: textRaw
	return (
		<div
			className={cn(
				'flex gap-2 items-center',
				isWidthFull && 'min-w-[280px]',
				title === 'Notes' && text !== '' && 'flex-col',
			)}
		>
			<div className='text-muted-foreground'>{title}</div>
			<div
				className={cn(
					'text-sm font-semibold ',
					text ? 'text-secondary-foreground' : 'text-muted-foreground/70',
					'max-w-[calc(100vw-50px)]',
					isWidthFull ? 'text-wrap' : 'truncate',
				)}
			>
				{text ? text + suffix : '...'}
			</div>
		</div>
	)
}

const Icon = ({
	title,
	text,
}: {
	title: string
	text: string | undefined | null | boolean
}) => {
	if (!text) return null
	return (
		<Badge variant='default' className=''>
			{title}
		</Badge>
	)
}

const Logs = ({
	todaysDailyLog,
	currentUser,
	isAdmin,
	isLogPage,
}: {
	todaysDailyLog: GetDailyLogById | undefined
	currentUser: GetUserById
	isAdmin?: boolean
	isLogPage?: boolean
}) => {
	const isSleep = isAdmin || currentUser?.settings?.isSleep
	const isSleepQuality = isAdmin || currentUser?.settings?.isSleepQuality
	const isNap = isAdmin || currentUser?.settings?.isNap
	const isBloodGlucose = isAdmin || currentUser?.settings?.isBloodGlucose
	const isHiit = isAdmin || currentUser?.settings?.isHiit
	const isLiss = isAdmin || currentUser?.settings?.isLiss
	const isMobility = isAdmin || currentUser?.settings?.isMobility
	const isWeightTraining = isAdmin || currentUser?.settings?.isWeightTraining
	const isSauna = isAdmin || currentUser?.settings?.isSauna
	const isColdPlunge = isAdmin || currentUser?.settings?.isColdPlunge
	const isNotes = isAdmin || currentUser?.settings?.isNotes
	const isSteps = isAdmin || currentUser?.settings?.isSteps

	const isPeriodEnabled = currentUser.settings?.periodStartAt ?? false

	const isPeriod = todaysDailyLog?.isPeriod ?? false

	const start = currentUser.settings?.periodStartAt ?? new Date()
	const interval = currentUser.settings?.periodInterval ?? 28
	const duration = currentUser.settings?.periodLength ?? 5
	const today = new Date(todaysDailyLog?.date ?? Date.now())

	const periodStatus = getPeriodStatusDays(today, start, interval, duration)

	return (
		<div className='flex flex-col gap-2 py-4 px-2 w-full text-sm bg-secondary'>
			<div className='flex flex-wrap gap-3 justify-between w-full'>
				<Text
					title='Weight'
					text={todaysDailyLog?.morningWeight}
					suffix='kg'
					isNumber={true}
					fixed={2}
				/>
				{isSleep && (
					<Text
						title='Sleep'
						text={todaysDailyLog?.sleep}
						isNumber={true}
						fixed={1}
					/>
				)}
				{isNap && (
					<Text
						title='Nap'
						text={todaysDailyLog?.nap}
						isNumber={true}
						fixed={1}
					/>
				)}
				{isSleepQuality && (
					<Text
						title='Sleep Score'
						text={todaysDailyLog?.sleepQuality}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isSteps && (
					<Text
						title='Steps'
						text={todaysDailyLog?.steps}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isBloodGlucose && (
					<Text
						title='Blood Glucose'
						text={todaysDailyLog?.fastedBloodGlucose}
						suffix=''
						isNumber={true}
						fixed={1}
					/>
				)}
				{(isAdmin || isLogPage) && (
					<Text
						title='Bowel Movements'
						text={todaysDailyLog?.poopLogs
							.reduce((acc, curr) => acc + 1, 0)
							.toString()}
					/>
				)}
				{(isAdmin || isLogPage) && (
					<Text
						title='Water'
						text={todaysDailyLog?.waterLogs
							.reduce((acc, curr) => acc + Number(curr.amount), 0)
							.toString()}
						suffix='ml'
					/>
				)}
				{isHiit && (
					<Text
						title='HIIT'
						text={todaysDailyLog?.hiit}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isLiss && (
					<Text
						title='LISS'
						text={todaysDailyLog?.liss}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isMobility && (
					<Text
						title='Mobility'
						text={todaysDailyLog?.mobility}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isWeightTraining && (
					<Text
						title='Weight Training'
						text={todaysDailyLog?.weight}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isSauna && (
					<Text
						title='Sauna'
						text={todaysDailyLog?.sauna}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isColdPlunge && (
					<Text
						title='Cold Plunge'
						text={todaysDailyLog?.coldPlunge}
						isNumber={true}
						fixed={0}
					/>
				)}
				{isNotes && (
					<Text title='Notes' isWidthFull={true} text={todaysDailyLog?.notes} />
				)}
				{isPeriodEnabled && (
					<div className='flex justify-center items-center'>
						<div
							className={cn(
								'text-muted-foreground/10 flex gap-0 items-center',
								isPeriod ? 'text-red-400/80' : '',
							)}
						>
							<CircleParking strokeWidth={2.2} size={24} />
							<p
								className={cn(
									'mt-1 text-[0.7rem]',
									isPeriod ? '' : 'hidden',
									periodStatus < 0 ? 'hidden' : '',
								)}
							>
								D{periodStatus}
							</p>
							<p
								className={cn(
									'mt-1 text-[0.7rem] hidden ml-2',
									periodStatus === -1 ? 'block text-muted-foreground' : '',
									periodStatus === -2 ? 'block text-muted-foreground' : '',
									periodStatus === -3 ? 'block text-muted-foreground' : '',
									isPeriod ? 'hidden' : '',
								)}
							>
								In {Math.abs(periodStatus)}d
							</p>
						</div>
					</div>
				)}
			</div>
			<div className='flex flex-wrap gap-2 justify-center'>
				<Icon title='HIIT' text={todaysDailyLog?.hiit} />
				<Icon title='LISS' text={todaysDailyLog?.liss} />
				<Icon title='Weight Training' text={todaysDailyLog?.weight} />
				<Icon title='Sauna' text={todaysDailyLog?.sauna} />
				<Icon title='Cold Plunge' text={todaysDailyLog?.coldPlunge} />
			</div>
		</div>
	)
}
const DailyLog = ({
	dailyLog,
	date,
	currentUser,
	isAdmin = false,
	isLogPage = false,
}: {
	dailyLog: GetDailyLogById | undefined
	date: Date
	currentUser: GetUserById
	isAdmin?: boolean
	isLogPage?: boolean
}) => {
	const ctx = api.useUtils()
	const { data: isCreator } = api.user.isCreator.useQuery()
	const { mutate: deleteDailyLog } = api.dailyLog.delete.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
	})

	const id = dailyLog?.id || 0

	if (isAdmin)
		return (
			<div className='relative p-2 bg-secondary'>
				{isAdmin && isCreator?.isCreator && (
					<CircleX
						size={16}
						className='absolute top-2 right-2 cursor-pointer hover:text-red-700 text-destructive'
						onClick={() => {
							deleteDailyLog(id)
						}}
					/>
				)}
				<Logs
					isAdmin={isAdmin}
					currentUser={currentUser}
					todaysDailyLog={dailyLog}
					isLogPage={isLogPage}
				/>
			</div>
		)

	return (
		<Link href={`/user/log/create?id=${id}&date=${date.getTime()}`}>
			<Logs
				isAdmin={isAdmin}
				todaysDailyLog={dailyLog}
				currentUser={currentUser}
				isLogPage={isLogPage}
			/>
		</Link>
	)
}

export { DailyLog }
