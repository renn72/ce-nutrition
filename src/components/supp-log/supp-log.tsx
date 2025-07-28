'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type {
	GetAllDailyLogs,
	GetDailyLogById,
	GetSupplementFromStack,
	GetUserById,
} from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, ListCollapse, Pill, Toilet } from 'lucide-react'
import { toast } from 'sonner'

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { DateSelect } from '@/components/date-select'

import { SuppBottomSheet } from './supp-bottom-sheet'

const Supp = ({
	user,
	supp,
	time,
	date,
	todaysDailyLog,
}: {
	user: GetUserById
	supp: GetSupplementFromStack
	time: string
	date: Date
	todaysDailyLog: GetDailyLogById | null | undefined
}) => {
	const ctx = api.useUtils()
	const { mutate: logSupplement } = api.supplement.logSupplement.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
		onError: (err) => {},
	})
	const { mutate: unLogSupplement } =
		api.supplement.unLogSupplement.useMutation({
			onSuccess: () => {
				ctx.dailyLog.invalidate()
			},
			onError: (err) => {},
		})

	const [isTaken, setIsTaken] = useState(() =>
		todaysDailyLog?.supplements.find((s) => {
			return (
				s.supplementId === supp?.supplementId &&
				s.time?.toLowerCase() === time.toLowerCase()
			)
		})
			? true
			: false,
	)

	const takenSupplement = todaysDailyLog?.supplements.find((s) => {
		return (
			s.supplementId === supp?.supplementId &&
			s.time?.toLowerCase() === time.toLowerCase()
		)
	})

	const { data: suppFromDailyLog, isSuccess } =
		api.supplement.getSupplementFromDailyLog.useQuery(
			{
				id: takenSupplement?.id || -1,
			},
		)

	if (supp?.supplement.name?.toLowerCase() === 'magnesium') {
		console.log('suppFromDailyLog', suppFromDailyLog)
		console.log('isTaken', isTaken)
		console.log('takenSupplement', takenSupplement)
		console.log('supp', supp)
	}
	useEffect(() => {
		if (isSuccess) setIsTaken(suppFromDailyLog ? true : false)
	}, [suppFromDailyLog])

	const handleClick = (e) => {
		e.stopPropagation()
		e.preventDefault()
		if (!supp) return
		if (!supp.supplementId) return
		if (!supp.supplementStackId) return
		if (!supp.size) return
		if (!supp.unit) return
		setIsTaken(!isTaken)
		if (isTaken && takenSupplement) {
			unLogSupplement({
				id: takenSupplement.id,
			})
		} else {
			logSupplement({
				suppId: supp.supplementId,
				date: date.toDateString(),
				time: time,
				amount: supp.size,
				unit: supp.unit,
				stackId: supp.supplementStackId.toString(),
			})
		}
	}

	if (!supp) return null
	return (
		<div
			className={cn(
				' px-1 py-1 rounded-full border active:shadow-none active:inset-shadow-sm text-sm',
				isTaken ? 'inset-shadow-sm bg-backound' : 'bg-background shadow-md',
			)}
			key={supp.id}
			onClick={handleClick}
		>
			<div
				className={cn(
					'grid grid-cols-6 gap-2 items-center px-3 py-1.5 rounded-full border relative',
					isTaken ? 'bg-accent' : 'bg-card',
				)}
			>
				<div className='col-span-4 truncate'>{supp.supplement?.name}</div>
				<div className='place-self-end'>{supp.size}</div>
				<div className='place-self-start'>{supp.unit}</div>
				{isTaken && takenSupplement ? (
					<div className='absolute -bottom-1 right-1/2 translate-x-1/2 opacity-80 text-[0.6rem]'>
						{`${new Date(takenSupplement.createdAt).getHours()}:${new Date(takenSupplement.createdAt).getMinutes()}`}
					</div>
				) : null}
			</div>
		</div>
	)
}

const SuppTimes = ({
	user,
	time,
	date,
	todaysDailyLog,
}: {
	user: GetUserById
	time: string
	date: Date
	todaysDailyLog: GetDailyLogById | null | undefined
}) => {
	return (
		<Card className='w-full px-0 py-2 gap-2'>
			<CardHeader className='py-0'>
				<CardTitle className='capitalize'>{time}</CardTitle>
				<CardDescription>Supplements</CardDescription>
			</CardHeader>
			<CardContent className='px-4 py-0'>
				<div className={cn('flex flex-col gap-1')}>
					{user.supplementStacks
						.find((stack) => stack.time === time)
						?.supplements.map((supp) => {
							return (
								<Supp
									key={supp.id}
									user={user}
									supp={supp}
									time={time}
									date={date}
									todaysDailyLog={todaysDailyLog}
								/>
							)
						})}
				</div>
			</CardContent>
		</Card>
	)
}

const SuppLog = ({
	userId,
	dailyLogs,
}: {
	userId: string
	dailyLogs: GetAllDailyLogs | null | undefined
}) => {
	const [day, setDay] = useState<Date>(new Date())

	const ctx = api.useUtils()

	const todaysDailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === day.toDateString(),
	)
	const { data: user } = api.user.get.useQuery(userId || '')
	const suppTimes = user?.supplementStacks
		.map((stack) => {
			return stack.time
		})
		.filter((item, pos, self) => self.indexOf(item) === pos)

	console.log('log', todaysDailyLog)

	return (
		<div className='flex flex-col gap-0 w-full items-center'>
			<Sheet.Root license='non-commercial'>
				<div className='flex flex-col gap-0 items-center justify-start w-full'>
					<div className={cn('text-lg font-semibold opacity-0')}>0</div>
					<div
						className={cn(
							'rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center',
							'justify-center active:scale-75 transition-transform cursor-pointer',
						)}
					>
						<Sheet.Trigger
							onClick={(e) => {
								setDay(new Date())
							}}
						>
							<Pill
								size={28}
								className={cn(
									'text-primary/80 hover:text-primary active:scale-90 transition-transform cursor-pointer',
								)}
							/>
						</Sheet.Trigger>
					</div>
				</div>
				<Sheet.Portal>
					<Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
						<Sheet.Content className='min-h-[200px] max-h-[95vh] h-full rounded-t-3xl bg-background relative'>
							<div className='flex flex-col justify-between h-full'>
								<div className='flex flex-col '>
									<div className='flex justify-center pt-1'>
										<Sheet.Handle
											className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
											action='dismiss'
										/>
									</div>
									<div className='flex gap-0 pt-2 flex-col border-b-[1px] border-primary pb-2 relative font-medium'>
										<DateSelect today={day} setDay={setDay} />
										<div className='flex justify-center items-center gap-6 mt-1'>
											<Sheet.Title className='text-xl mt-[2px] font-semibold'>
												Supps
											</Sheet.Title>
											<Sheet.Description className='hidden'>
												Meal Log
											</Sheet.Description>
										</div>
									</div>
									<ScrollArea className='pt-4 px-2 h-[calc(95vh-130px)]'>
										<div className='flex flex-col gap-2'>
											{suppTimes?.map((time) => {
												return time && user ? (
													<SuppTimes
														key={time}
														user={user}
														time={time}
														date={day}
														todaysDailyLog={todaysDailyLog}
													/>
												) : null
											})}
										</div>
									</ScrollArea>
								</div>
								<Sheet.Trigger
									className='w-full flex justify-center'
									action='dismiss'
								>
									<ChevronDown
										size={32}
										strokeWidth={2}
										className='text-muted-foreground'
									/>
								</Sheet.Trigger>
							</div>
						</Sheet.Content>
					</Sheet.View>
				</Sheet.Portal>
			</Sheet.Root>
			<SuppBottomSheet dailyLogs={dailyLogs} />
		</div>
	)
}

export { SuppLog }
