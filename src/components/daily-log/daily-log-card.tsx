'use client'

import { api } from '@/trpc/react'

import { cn, getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetDailyLogById, GetUserById } from '@/types'
import {
	CircleX,
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
	ArrowUp,
	ArrowDown,
	Beef,
} from 'lucide-react'

import { BreadIcon, FireIcon, DropIcon } from '@phosphor-icons/react'

import { Link } from 'next-view-transitions'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const MetricItem = ({
	label,
	value,
	prevValue,
	suffix = '',
	icon: Icon,
	isFullWidth = false,
	accuracy = 1,
}: {
	label: string
	value: string | number | undefined | null
	prevValue: string | number | undefined | null
	suffix?: string
	icon?: React.ElementType
	isFullWidth?: boolean
	accuracy?: number
}) => {
	if (value === undefined || value === null || value === '' || value === '0') {
		if (
			label.toLowerCase() !== 'weight' &&
			label.toLowerCase() !== 'bm' &&
			label.toLowerCase() !== 'water'
		)
			return null
	}

	const change = Number(value) - Number(prevValue)

	return (
		<div
			className={cn(
				'flex items-center gap-2 py-2 px-1 rounded-lg bg-muted/40 border border-primary/15 hover:bg-primary/5 w-full',
				isFullWidth ? 'col-span-2 sm:col-span-3' : 'col-span-1',
			)}
		>
			{Icon && (
				<div className='p-2 rounded-full border shadow-sm bg-background text-primary'>
					<Icon size={16} />
				</div>
			)}
			<div className='flex overflow-hidden flex-col w-full'>
				<span className='font-semibold tracking-wider uppercase text-[10px] text-muted-foreground'>
					{label}
				</span>
				<div className='flex gap-2 justify-between items-baseline w-full'>
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
					{change ? (
						<span className='flex items-baseline font-semibold tracking-wider leading-none uppercase text-[10px] text-muted-foreground'>
							{change === 0 ? null : change < 0 ? (
								<ArrowDown size={11} strokeWidth={1.5} className='pt-[2px]' />
							) : (
								<ArrowUp size={11} strokeWidth={1.5} className='pt-[2px]' />
							)}
							{change.toFixed(accuracy)}
						</span>
					) : null}
				</div>
			</div>
		</div>
	)
}

const Log = ({
	todaysDailyLog,
	yesterdaysDailyLog,
	currentUser,
	isAdmin,
	isLogPage,
	title,
	className,
}: {
	todaysDailyLog: GetDailyLogById | undefined
	yesterdaysDailyLog: GetDailyLogById | undefined | null
	currentUser: GetUserById
	isAdmin?: boolean
	isLogPage?: boolean
	title: string
	className?: string
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
	const isOvulation = todaysDailyLog?.isOvulation ?? false

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

	const yesterdaysPoopCount = yesterdaysDailyLog?.poopLogs?.length || 0
	const yesterdaysWaterAmount = yesterdaysDailyLog?.waterLogs?.reduce(
		(acc, curr) => acc + Number(curr.amount),
		0,
	)

	const mealsMacros = todaysDailyLog?.dailyMeals
		.map((meal) => {
			const { cals, protein, carbs, fat } = getRecipeDetailsFromDailyLog(
				todaysDailyLog,
				meal.mealIndex ?? 0,
			)
			return {
				cals: Number(cals),
				protein: Number(protein),
				carbs: Number(carbs),
				fat: Number(fat),
			}
		})
		.reduce(
			(acc, curr) => {
				return {
					cals: acc.cals + curr.cals,
					protein: acc.protein + curr.protein,
					carbs: acc.carbs + curr.carbs,
					fat: acc.fat + curr.fat,
				}
			},
			{
				cals: 0,
				protein: 0,
				carbs: 0,
				fat: 0,
			},
		)
	const yesterdayMealsMacros = yesterdaysDailyLog?.dailyMeals
		.map((meal) => {
			const { cals, protein, carbs, fat } = getRecipeDetailsFromDailyLog(
				yesterdaysDailyLog,
				meal.mealIndex ?? 0,
			)
			return {
				cals: Number(cals),
				protein: Number(protein),
				carbs: Number(carbs),
				fat: Number(fat),
			}
		})
		.reduce(
			(acc, curr) => {
				return {
					cals: acc.cals + curr.cals,
					protein: acc.protein + curr.protein,
					carbs: acc.carbs + curr.carbs,
					fat: acc.fat + curr.fat,
				}
			},
			{
				cals: 0,
				protein: 0,
				carbs: 0,
				fat: 0,
			},
		)

	return (
		<Card
			className={cn(
				'overflow-hidden relative gap-0 py-1 w-full max-w-sm h-full shadow-sm transition-all hover:shadow-md border-border/60',
				className,
			)}
		>
			{isPeriodEnabled && (
				<div
					className={cn(
						'w-[80px] h-6 -rotate-45 -left-9 top-0 absolute',
						isPeriod ? 'bg-red-400/70' : 'bg-transparent',
					)}
				/>
			)}
			{isPeriodEnabled && (
				<div
					className={cn(
						'w-[80px] h-6 rotate-45 -right-9 top-0 absolute',
						isOvulation ? 'bg-purple-400/70' : 'bg-transparent',
					)}
				/>
			)}
			<CardHeader className='pt-4 pb-0'>
				<CardTitle className='font-semibold text-medium'>{title}</CardTitle>
			</CardHeader>
			<CardContent className='p-2'>
				<div className='grid grid-cols-2 gap-2 xl:grid-cols-2'>
					<MetricItem
						label='Weight'
						value={formatNumber(todaysDailyLog?.morningWeight, 2)}
						prevValue={formatNumber(yesterdaysDailyLog?.morningWeight, 2)}
						suffix='kg'
						icon={Scale}
					/>

					{isSleep && (
						<MetricItem
							label='Sleep'
							value={formatNumber(todaysDailyLog?.sleep, 1)}
							prevValue={formatNumber(yesterdaysDailyLog?.sleep, 1)}
							suffix='h'
							icon={Moon}
						/>
					)}

					{isNap && (
						<MetricItem
							label='Nap'
							value={formatNumber(todaysDailyLog?.nap, 1)}
							prevValue={formatNumber(yesterdaysDailyLog?.nap, 1)}
							suffix='h'
							icon={BedDouble}
						/>
					)}

					{isSleepQuality && (
						<MetricItem
							label='Sleep Score'
							value={formatNumber(todaysDailyLog?.sleepQuality, 1)}
							prevValue={formatNumber(yesterdaysDailyLog?.sleepQuality, 1)}
							icon={Activity}
						/>
					)}

					{isSteps && (
						<MetricItem
							label='Steps'
							value={formatNumber(todaysDailyLog?.steps, 0)}
							prevValue={formatNumber(yesterdaysDailyLog?.steps, 0)}
							icon={Footprints}
							accuracy={0}
						/>
					)}

					{isBloodGlucose && (
						<MetricItem
							label='Glucose'
							value={formatNumber(todaysDailyLog?.fastedBloodGlucose, 1)}
							prevValue={formatNumber(
								yesterdaysDailyLog?.fastedBloodGlucose,
								1,
							)}
							suffix='mmol/L'
							icon={Droplet}
							accuracy={0}
						/>
					)}

					{(isAdmin || isLogPage) && (
						<MetricItem
							label='BM'
							value={poopCount}
							prevValue={yesterdaysPoopCount}
							icon={Toilet} // Placeholder, couldn't find a perfect poop icon
							accuracy={0}
						/>
					)}

					{(isAdmin || isLogPage) && (
						<MetricItem
							label='Water'
							value={waterAmount}
							prevValue={yesterdaysWaterAmount}
							suffix='ml'
							icon={GlassWater}
							accuracy={0}
						/>
					)}

					{isHiit && (
						<MetricItem
							label='HIIT'
							value={formatNumber(todaysDailyLog?.hiit, 0)}
							prevValue={formatNumber(yesterdaysDailyLog?.hiit, 0)}
							suffix='m'
							icon={Flame}
							accuracy={0}
						/>
					)}

					{isLiss && (
						<MetricItem
							label='LISS'
							value={formatNumber(todaysDailyLog?.liss, 0)}
							prevValue={formatNumber(yesterdaysDailyLog?.liss, 0)}
							suffix='m'
							icon={PersonStanding}
							accuracy={0}
						/>
					)}

					{isMobility && (
						<MetricItem
							label='Mobility'
							value={formatNumber(todaysDailyLog?.mobility, 0)}
							prevValue={formatNumber(yesterdaysDailyLog?.mobility, 0)}
							suffix='m'
							icon={Move}
							accuracy={0}
						/>
					)}

					{isWeightTraining && (
						<MetricItem
							label='Training'
							value={formatNumber(todaysDailyLog?.weight, 0)}
							prevValue={formatNumber(yesterdaysDailyLog?.weight, 0)}
							suffix='m'
							icon={Dumbbell}
							accuracy={0}
						/>
					)}

					{isSauna && (
						<MetricItem
							label='Sauna'
							value={formatNumber(todaysDailyLog?.sauna, 0)}
							prevValue={formatNumber(yesterdaysDailyLog?.sauna, 0)}
							suffix='m'
							icon={ThermometerSun}
							accuracy={0}
						/>
					)}

					{isColdPlunge && (
						<MetricItem
							label='Plunge'
							value={formatNumber(todaysDailyLog?.coldPlunge, 0)}
							prevValue={formatNumber(yesterdaysDailyLog?.coldPlunge, 0)}
							suffix='m'
							icon={Snowflake}
							accuracy={0}
						/>
					)}
					<MetricItem
						label='Calories'
						value={formatNumber(mealsMacros?.cals, 0)}
						prevValue={formatNumber(yesterdayMealsMacros?.cals, 0)}
						suffix='cals'
						icon={FireIcon}
						accuracy={0}
					/>
					<div className='grid grid-cols-3 col-span-2 gap-1'>
						<MetricItem
							label='Carbs'
							value={formatNumber(mealsMacros?.carbs, 0)}
							prevValue={formatNumber(yesterdayMealsMacros?.carbs, 0)}
							suffix='g'
							icon={BreadIcon}
							accuracy={0}
						/>
						<MetricItem
							label='Protein'
							value={formatNumber(mealsMacros?.protein, 0)}
							prevValue={formatNumber(yesterdayMealsMacros?.protein, 0)}
							suffix='g'
							icon={Beef}
							accuracy={0}
						/>
						<MetricItem
							label='Fat'
							value={formatNumber(mealsMacros?.fat, 0)}
							prevValue={formatNumber(yesterdayMealsMacros?.fat, 0)}
							suffix='g'
							icon={DropIcon}
							accuracy={0}
						/>
					</div>
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
	yesterdaysDailyLog,
	date,
	currentUser,
	title,
	isAdmin = false,
	isLogPage = false,
	isDanger = false,
	className,
}: {
	dailyLog: GetDailyLogById | undefined
	yesterdaysDailyLog: GetDailyLogById | undefined
	date: Date
	currentUser: GetUserById
	title: string
	isAdmin?: boolean
	isLogPage?: boolean
	isDanger?: boolean
	className?: string
}) => {
	const ctx = api.useUtils()
	const { data: isCreator } = api.user.isCreator.useQuery()
	const { mutate: deleteDailyLog } = api.dailyLog.delete.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
	})

	console.log(dailyLog)

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
				yesterdaysDailyLog={yesterdaysDailyLog}
				isLogPage={isLogPage}
				className={className}
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
