'use client'

import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'
import useEmblaCarousel from 'embla-carousel-react'
import { memo, useMemo } from 'react'

import { DailyLogCard } from '@/components/daily-log/daily-log-card'

import { DotButton, useDotButton } from './carousel-dots'

import '~/styles/embla.css'

import type { GetDailyLogById, GetUserById } from '@/types'

const MemoizedDailyLogCard = memo(DailyLogCard)

const DailyLogCarousel = ({
	dailyLogs,
	currentUser,
}: {
	dailyLogs: GetDailyLogById[] | undefined
	currentUser: GetUserById
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		direction: 'rtl',
	})

	const { data: isCreator } = api.user.isCreator.useQuery()

	// @ts-ignore
	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	const dayArr = useMemo(() => {
		const today = new Date()
		return Array.from({ length: 5 }).map(
			(_, index) => new Date(today.getTime() - index * 86400000),
		)
	}, [])

	const logMap = useMemo(() => {
		if (!dailyLogs) return new Map<string, GetDailyLogById>()
		return new Map(dailyLogs.map((log) => [log?.date, log]))
	}, [dailyLogs])

	const today = new Date()
	const yesterday = new Date(today.getTime() - 86400000)

	const todaysDailyLog = logMap.get(today.toDateString())
	const yesterdaysDailyLog = logMap.get(yesterday.toDateString())

	if (!dailyLogs) return null
	return (
		<>
			<MemoizedDailyLogCard
				title={'Today'}
				dailyLog={todaysDailyLog}
				yesterdaysDailyLog={yesterdaysDailyLog}
				date={today}
				currentUser={currentUser}
				isCreator={isCreator?.isCreator ? true : false}
				className='mb-20'
			/>
		</>
	)

	return (
		<section className='relative embla h-min' dir='rtl'>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='flex'>
					{dayArr.map((day, index) => {
						const yesterday = new Date(day.getTime() - 86400000)
						const dailyLog = logMap.get(day.toDateString())
						const yesterdayLog = logMap.get(yesterday.toDateString())

						if (index === 0) {
							// console.log(yesterdayLog)
							// console.log(dailyLog)
						}
						return (
							<div
								key={index}
								dir='ltr'
								className={cn(
									'flex-[0_0_100%]',
									index === 4 ? '' : 'ml-4',
									'mb-12',
								)}
							>
								<MemoizedDailyLogCard
									title={
										index === 0
											? 'Today'
											: day.toLocaleDateString('en-AU', {
													weekday: 'long',
												})
									}
									dailyLog={dailyLog}
									yesterdaysDailyLog={yesterdayLog}
									date={day}
									currentUser={currentUser}
									isCreator={isCreator?.isCreator ? true : false}
									className='pb-16'
								/>
							</div>
						)
					})}
				</div>
			</div>

			<div className='flex absolute bottom-16 left-1/2 gap-2 justify-center w-full -translate-x-1/2'>
				<div className='embla__dots'>
					{scrollSnaps.map((_, index) => (
						<DotButton
							key={index}
							onClick={() => onDotButtonClick(index)}
							className={'embla__dot'.concat(
								index === selectedIndex ? ' embla__dot--selected' : '',
							)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

export default DailyLogCarousel
