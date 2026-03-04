'use client'

import { isDuringPeriod } from '@/lib/period'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Fragment, useMemo } from 'react'

type SettingsForGantt =
	| {
			isPeriodOvulaion: boolean | null
			isBulkCut: boolean | null
			periodStartAt: Date | null
			ovulaionStartAt: Date | null
			periodInterval: number | null
			periodLength: number | null
			bulkStartAt: Date | null
			bulkFinishAt: Date | null
			cutStartAt: Date | null
			cutFinishAt: Date | null
	  }
	| null
	| undefined

type DailyLogForGantt = {
	date: string
	isPeriod: boolean | null
	isOvulation: boolean | null
	isBulk: boolean | null
	isCut: boolean | null
}

const DAYS_AROUND_TODAY = 7
const TOTAL_DAYS = DAYS_AROUND_TODAY * 2 + 1

const getDayStart = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate())

const getDayStamp = (date: Date) => getDayStart(date).getTime()

const parseDate = (value: Date | string | number | null | undefined) => {
	if (!value) return null
	const parsed = value instanceof Date ? value : new Date(value)
	if (Number.isNaN(parsed.getTime())) return null
	return parsed
}

const isDateWithinRange = ({
	date,
	start,
	finish,
}: {
	date: Date
	start: Date | null
	finish: Date | null
}) => {
	if (!start || !finish) return false

	const target = getDayStamp(date)
	const startDay = getDayStamp(start)
	const finishDay = getDayStamp(finish)

	const min = Math.min(startDay, finishDay)
	const max = Math.max(startDay, finishDay)

	return target >= min && target <= max
}

const isDuringRecurringRange = ({
	date,
	start,
	interval,
	duration,
}: {
	date: Date
	start: Date | null
	interval: number
	duration: number
}) => {
	if (!start) return false

	try {
		return isDuringPeriod(
			date,
			start,
			interval > 0 ? interval : 28,
			duration > 0 ? duration : 1,
		)
	} catch {
		return false
	}
}

const UserStatusGantt = ({
	dailyLogs,
	settings,
}: {
	dailyLogs: DailyLogForGantt[]
	settings: SettingsForGantt
}) => {
	const today = useMemo(() => getDayStart(new Date()), [])
	const todayStamp = getDayStamp(today)

	const days = useMemo(
		() =>
			Array.from({ length: TOTAL_DAYS }, (_, index) => {
				const offset = index - DAYS_AROUND_TODAY
				return new Date(
					today.getFullYear(),
					today.getMonth(),
					today.getDate() + offset,
				)
			}),
		[today],
	)

	const logMapByDate = useMemo(() => {
		const logMap = new Map<number, DailyLogForGantt>()

		for (const log of dailyLogs) {
			const logDate = parseDate(log.date)
			if (!logDate) continue
			const dayStamp = getDayStamp(logDate)

			// getUserLimit returns latest-first by createdAt, keep the first seen per day.
			if (!logMap.has(dayStamp)) logMap.set(dayStamp, log)
		}

		return logMap
	}, [dailyLogs])

	const periodStart = parseDate(settings?.periodStartAt)
	const ovulationStart = parseDate(settings?.ovulaionStartAt)
	const bulkStart = parseDate(settings?.bulkStartAt)
	const bulkFinish = parseDate(settings?.bulkFinishAt)
	const cutStart = parseDate(settings?.cutStartAt)
	const cutFinish = parseDate(settings?.cutFinishAt)

	const periodInterval = settings?.periodInterval ?? 28
	const periodDuration = settings?.periodLength ?? 5
	const showPeriodRows = settings?.isPeriodOvulaion === true
	const showBulkCutRows = settings?.isBulkCut === true

	const statusByDay = useMemo(
		() =>
			days.map((day) => {
				const dayStamp = getDayStamp(day)
				const isPastOrToday = dayStamp <= todayStamp

				if (isPastOrToday) {
					const log = logMapByDate.get(dayStamp)
					return {
						period: log?.isPeriod === true,
						ovulation: log?.isOvulation === true,
						bulk: log?.isBulk === true,
						cut: log?.isCut === true,
					}
				}

				return {
					period: isDuringRecurringRange({
						date: day,
						start: periodStart,
						interval: periodInterval,
						duration: periodDuration,
					}),
					ovulation: isDuringRecurringRange({
						date: day,
						start: ovulationStart,
						interval: periodInterval,
						duration: 1,
					}),
					bulk: isDateWithinRange({
						date: day,
						start: bulkStart,
						finish: bulkFinish,
					}),
					cut: isDateWithinRange({
						date: day,
						start: cutStart,
						finish: cutFinish,
					}),
				}
			}),
		[
			bulkFinish,
			bulkStart,
			cutFinish,
			cutStart,
			days,
			logMapByDate,
			ovulationStart,
			periodDuration,
			periodInterval,
			periodStart,
			todayStamp,
		],
	)

	const rows = useMemo(() => {
		const nextRows: {
			key: string
			label: string
			activeClass: string
			values: boolean[]
		}[] = []

		if (showPeriodRows) {
			nextRows.push(
				{
					key: 'period',
					label: 'Period',
					activeClass: 'bg-[#F43F5E] border-[#F43F5E]',
					values: statusByDay.map((day) => day.period),
				},
				{
					key: 'ovulation',
					label: 'Ovulation',
					activeClass: 'bg-[#8B5CF6] border-[#8B5CF6]',
					values: statusByDay.map((day) => day.ovulation),
				},
			)
		}

		if (showBulkCutRows) {
			nextRows.push(
				{
					key: 'bulk',
					label: 'Bulk',
					activeClass: 'bg-[#22C55E] border-[#22C55E]',
					values: statusByDay.map((day) => day.bulk),
				},
				{
					key: 'cut',
					label: 'Cut',
					activeClass: 'bg-[#EAB308] border-[#EAB308]',
					values: statusByDay.map((day) => day.cut),
				},
			)
		}

		return nextRows
	}, [showBulkCutRows, showPeriodRows, statusByDay])

	return (
		<div className='p-3 mb-2 w-full rounded-xl border min-h-[90px] bg-card'>
			<div
				className='grid gap-1'
				style={{ gridTemplateColumns: '84px minmax(0, 1fr)' }}
			>
				<div />
				<div
					className='grid gap-1'
					style={{
						gridTemplateColumns: `repeat(${TOTAL_DAYS}, minmax(0, 1fr))`,
					}}
				>
					{days.map((day) => {
						const isToday = getDayStamp(day) === todayStamp
						return (
							<div
								key={day.toISOString()}
								className={cn(
									'flex flex-col items-center py-0.5 text-[10px] leading-none rounded border',
									isToday
										? 'bg-primary/10 text-primary border-primary/30'
										: 'text-muted-foreground border-transparent',
								)}
							>
								<span>{format(day, 'EEE')}</span>
								<span className='mt-1 font-semibold text-[11px]'>
									{format(day, 'dd')}
								</span>
							</div>
						)
					})}
				</div>

				{rows.map((row) => (
					<Fragment key={row.key}>
						<div className='flex items-center text-xs font-medium text-muted-foreground'>
							{row.label}
						</div>
						<div
							className='grid gap-0'
							style={{
								gridTemplateColumns: `repeat(${TOTAL_DAYS}, minmax(0, 1fr))`,
							}}
						>
							{row.values.map((active, index) => {
								const previous = row.values[index - 1] ?? false
								const next = row.values[index + 1] ?? false
								return (
									<div
										key={`${row.key}-${index}`}
										className={cn('flex items-center h-5')}
									>
										<div
											className={cn(
												'h-2 w-full border',
												active
													? row.activeClass
													: 'border-border/40 bg-muted/30 rounded-sm',
												active && !previous ? 'rounded-l-sm' : '',
												active && !next ? 'rounded-r-sm' : '',
											)}
										/>
									</div>
								)
							})}
						</div>
					</Fragment>
				))}
			</div>
		</div>
	)
}

export { UserStatusGantt }
