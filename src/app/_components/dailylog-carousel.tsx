'use client'

import { cn } from '@/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DailyLog } from '@/components/daily-log/daily-log'

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
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  if (!dailyLogs) return null
  const today = new Date()
  const dayArr = Array.from({ length: 5 }).map(
    (_, index) => new Date(today.getTime() - index * 86400000),
  )

  return (
    <section
      className='embla relative h-min'
      dir='rtl'
    >
      <div
        className='embla__viewport'
        ref={emblaRef}
      >
        <div className='flex'>
          {dayArr.map((day, index) => {
            const dailyLog = dailyLogs.find(
              (dailyLog) => dailyLog?.date === day.toDateString(),
            )
            return (
              <Card
                key={index}
                dir='ltr'
                className={cn('flex-[0_0_100%]', index === 4 ? '' : 'ml-4')}
              >
                <CardContent
                  className='px-0'
                >
                  <CardHeader className='pb-0'>
                    <CardTitle className='text-center'>
                      {day.getTime() === today.getTime()
                        ? 'Today'
                        : day.toLocaleDateString('en-AU', {
                            weekday: 'long',
                          })}
                    </CardTitle>
                  </CardHeader>
                  <DailyLog
                    dailyLog={dailyLog}
                    date={day}
                    currentUser={currentUser}
                  />
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className='flex gap-2 justify-center w-full absolute bottom-2 left-1/2 -translate-x-1/2'>
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
