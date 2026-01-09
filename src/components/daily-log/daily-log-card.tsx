'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import type { GetDailyLogById, GetUserById } from '@/types'
import {
	CircleX,
	CircleParking,
	Scale,
	Moon,
	Footprints,
	Droplet,
	GlassWater,
	Flame,
	Dumbbell,
	ThermometerSun,
	Snowflake,
	StickyNote,
	Activity,
	BedDouble,
	PersonStanding,
	Move,
	Toilet,
} from 'lucide-react'
import { Link } from 'next-view-transitions'

import { getPeriodStatusDays } from '@/lib/period'
import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const MetricItem = ({
	label,
	value,
	suffix = '',
	icon: Icon,
	isFullWidth = false,
}: {
	label: string
	value: string | number | undefined | null
	suffix?: string
	icon?: React.ElementType
	isFullWidth?: boolean
}) => {
	if (value === undefined || value === null || value === '' || value === '0') {
		if (
			label.toLowerCase() !== 'weight' &&
			label.toLowerCase() !== 'bm' &&
			label.toLowerCase() !== 'water'
		)
			return null
	}

	console.log({ label, value })

	return (
		<div
			className={cn(
				'flex items-center gap-2 py-2 px-1 rounded-lg bg-muted/40 border border-primary/15',
				isFullWidth ? 'col-span-2 sm:col-span-3' : 'col-span-1',
			)}
		>
			{Icon && (
				<div className='p-2 rounded-full border shadow-sm bg-background text-primary'>
					<Icon size={16} />
				</div>
			)}
			<div className='flex overflow-hidden flex-col'>
				<span className='font-semibold tracking-wider uppercase text-[10px] text-muted-foreground'>
					{label}
				</span>
				<span
					className={cn(
						'text-sm font-bold truncate',
						value === 0 || value === undefined || value === null
							? 'text-muted-foreground/70'
							: '',
					)}
				>
					{value === undefined || value === null ? '.' : value}
					{suffix && !!value && (
						<span className='ml-0.5 text-xs font-normal'>{suffix}</span>
					)}
				</span>
			</div>
		</div>
	)
}

const Log = ({
	todaysDailyLog,
	currentUser,
	isAdmin,
	isLogPage,
	title,
}: {
	todaysDailyLog: GetDailyLogById | undefined
	currentUser: GetUserById
	isAdmin?: boolean
	isLogPage?: boolean
	title: string
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

	const formatNumber = (
		val: string | number | undefined | null,
		fixed: number,
	) => {
		if (val === undefined || val === null || val === '') return undefined
		return Number(val).toFixed(fixed)
	}

	const poopCount = todaysDailyLog?.poopLogs?.length || 0
	const waterAmount = todaysDailyLog?.waterLogs?.reduce(
		(acc, curr) => acc + Number(curr.amount),
		0,
	)

	return (
		<Card className='overflow-hidden relative gap-0 py-1 w-full max-w-lg shadow-sm transition-all hover:shadow-md border-border/60'>
			{isPeriodEnabled && (
				<div
					className={cn(
						'w-[40px] h-3 -rotate-45 -left-4 top-0 absolute',
						isPeriod ? 'bg-red-400/70' : 'bg-transparent',
					)}
				/>
			)}
			<CardHeader className='pt-4 pb-0'>
				<CardTitle className='font-semibold text-medium'>{title}</CardTitle>
			</CardHeader>
			<CardContent className='p-2'>
				<div className='grid grid-cols-2 gap-2 xl:grid-cols-3'>
					<MetricItem
						label='Weight'
						value={formatNumber(todaysDailyLog?.morningWeight, 2)}
						suffix='kg'
						icon={Scale}
					/>

					{isSleep && (
						<MetricItem
							label='Sleep'
							value={formatNumber(todaysDailyLog?.sleep, 1)}
							suffix='h'
							icon={Moon}
						/>
					)}

					{isNap && (
						<MetricItem
							label='Nap'
							value={formatNumber(todaysDailyLog?.nap, 1)}
							suffix='h'
							icon={BedDouble}
						/>
					)}

					{isSleepQuality && (
						<MetricItem
							label='Sleep Score'
							value={formatNumber(todaysDailyLog?.sleepQuality, 0)}
							icon={Activity}
						/>
					)}

					{isSteps && (
						<MetricItem
							label='Steps'
							value={formatNumber(todaysDailyLog?.steps, 0)}
							icon={Footprints}
						/>
					)}

					{isBloodGlucose && (
						<MetricItem
							label='Glucose'
							value={formatNumber(todaysDailyLog?.fastedBloodGlucose, 1)}
							suffix='mmol/L'
							icon={Droplet}
						/>
					)}

					{(isAdmin || isLogPage) && (
						<MetricItem
							label='BM'
							value={poopCount}
							icon={Toilet} // Placeholder, couldn't find a perfect poop icon
						/>
					)}

					{(isAdmin || isLogPage) && (
						<MetricItem
							label='Water'
							value={waterAmount}
							suffix='ml'
							icon={GlassWater}
						/>
					)}

					{isHiit && (
						<MetricItem
							label='HIIT'
							value={formatNumber(todaysDailyLog?.hiit, 0)}
							suffix='m'
							icon={Flame}
						/>
					)}

					{isLiss && (
						<MetricItem
							label='LISS'
							value={formatNumber(todaysDailyLog?.liss, 0)}
							suffix='m'
							icon={PersonStanding}
						/>
					)}

					{isMobility && (
						<MetricItem
							label='Mobility'
							value={formatNumber(todaysDailyLog?.mobility, 0)}
							suffix='m'
							icon={Move}
						/>
					)}

					{isWeightTraining && (
						<MetricItem
							label='Training'
							value={formatNumber(todaysDailyLog?.weight, 0)}
							suffix='m'
							icon={Dumbbell}
						/>
					)}

					{isSauna && (
						<MetricItem
							label='Sauna'
							value={formatNumber(todaysDailyLog?.sauna, 0)}
							suffix='m'
							icon={ThermometerSun}
						/>
					)}

					{isColdPlunge && (
						<MetricItem
							label='Plunge'
							value={formatNumber(todaysDailyLog?.coldPlunge, 0)}
							suffix='m'
							icon={Snowflake}
						/>
					)}
				</div>

				{isNotes && todaysDailyLog?.notes && (
					<div className='pt-3 mt-4 border-t border-primary/10'>
						<div className='flex gap-2 items-start text-sm text-muted-foreground'>
							<StickyNote size={14} className='mt-1 shrink-0' />
							<p className='italic line-clamp-3'>{todaysDailyLog.notes}</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

const DailyLogCard = ({
	dailyLog,
	date,
	currentUser,
	title,
	isAdmin = false,
	isLogPage = false,
	isDanger = false,
}: {
	dailyLog: GetDailyLogById | undefined
	date: Date
	currentUser: GetUserById
	title: string
	isAdmin?: boolean
	isLogPage?: boolean
	isDanger?: boolean
}) => {
	const ctx = api.useUtils()
	const { data: isCreator } = api.user.isCreator.useQuery()
	const { mutate: deleteDailyLog } = api.dailyLog.delete.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
	})

	const id = dailyLog?.id || 0

	const content = (
		<div className='relative group'>
			{isAdmin && isCreator?.isCreator && isDanger && (
				<button
					onClick={(e) => {
						e.preventDefault()
						deleteDailyLog(id)
					}}
					className='absolute -top-2 -right-2 z-10 p-1 rounded-full shadow-sm opacity-0 transition-opacity group-hover:opacity-100 bg-destructive/90 text-destructive-foreground hover:bg-destructive'
				>
					<CircleX size={16} />
				</button>
			)}
			<Log
				title={title}
				isAdmin={isAdmin}
				currentUser={currentUser}
				todaysDailyLog={dailyLog}
				isLogPage={isLogPage}
			/>
		</div>
	)

	if (isAdmin) return content

	return (
		<Link
			href={`/user/log/create?id=${id}&date=${date.getTime()}`}
			className='block w-full transition-transform active:scale-[0.99]'
		>
			{content}
		</Link>
	)
}

export { DailyLogCard }
