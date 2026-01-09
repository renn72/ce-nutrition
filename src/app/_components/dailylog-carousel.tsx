'use client'

import { cn } from '@/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { DailyLog } from '@/components/daily-log/daily-log'
import { DailyLogCard } from '@/components/daily-log/daily-log-card'

import { DotButton, useDotButton } from './carousel-dots'

import '~/styles/embla.css'

import type { GetDailyLogById, GetUserById } from '@/types'

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

	// @ts-ignore
	const { selectedIndex, scrollSnaps, onDotButtonClick } =
		useDotButton(emblaApi)

	if (!dailyLogs) return null
	const today = new Date()
	const dayArr = Array.from({ length: 5 }).map(
		(_, index) => new Date(today.getTime() - index * 86400000),
	)

	return (
		<section className='relative embla h-min' dir='rtl'>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='flex'>
					{dayArr.map((day, index) => {
						const yesterday = new Date(day.getTime() - 86400000)
						const dailyLog = dailyLogs.find(
							(dailyLog) => dailyLog?.date === day.toDateString(),
						)
						const yesterdayLog = dailyLogs.find(
							(dailyLog) => dailyLog?.date === yesterday.toDateString(),
						)
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
								<DailyLogCard
									title={
										day.getTime() === today.getTime()
											? 'Today'
											: day.toLocaleDateString('en-AU', {
													weekday: 'long',
												})
									}
									dailyLog={dailyLog}
									yesterdaysDailyLog={yesterdayLog}
									date={day}
									currentUser={currentUser}
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
