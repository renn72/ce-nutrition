'use client'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs, GetAllWeighIns, GetUserById } from '@/types'
import { Logs, SquareCheckBig, SquareX } from 'lucide-react'

const Text = ({
  title,
  text,
  suffix = '',
}: {
  suffix?: string
  title: string
  text: string | undefined | null
}) => {
  return (
    <div className='flex gap-2 items-center'>
      <div className='text-muted-foreground'>{title}</div>
      <div
        className={cn(
          'text-sm font-semibold truncate',
          text ? 'text-secondary-foreground' : 'text-muted-foreground/70',
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
  return (
    <div className={cn('flex gap-4', text ? 'items-end' : 'items-center')}>
      <div className='text-muted-foreground'>{title}</div>
      <div
        className={cn(
          'text-sm font-semibold',
          text ? 'text-secondary-foreground' : 'text-muted-foreground/20',
        )}
      >
        {text ? <SquareCheckBig size={24} /> : <SquareX size={16} />}
      </div>
    </div>
  )
}
const DailyLog = ({
  dailyLogs,
  day = new Date(),
}: {
  dailyLogs: GetAllDailyLogs | null | undefined
  day?: Date
}) => {
  const todaysDailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date.toDateString() === day.toDateString(),
  )
  if (!dailyLogs) return null
  return (
    <div className='flex flex-col gap-2 w-full px-2 py-4 bg-secondary text-sm'>
      <div className='text-muted-foreground text-center w-full font-semibold'>
        Today
      </div>
      <div className='grid grid-cols-2'>
        <Text
          title='Weight'
          text={todaysDailyLog?.morningWeight}
          suffix='kg'
        />
        <Text
          title='Bowel Movements'
          text={todaysDailyLog?.bowelMovements}
        />
      </div>
      <div className='grid grid-cols-3'>
        <Text
          title='Sleep'
          text={todaysDailyLog?.sleep}
        />
        <Text
          title='Nap'
          text={todaysDailyLog?.nap}
        />
        <Text
          title='Sleep Score'
          text={todaysDailyLog?.sleepQuality}
        />
      </div>
      <div className='grid grid-cols-2'>
        <Text
          title='Notes'
          text={todaysDailyLog?.notes}
        />
        <Icon
          title='Picture'
          text={todaysDailyLog?.image}
        />
      </div>
      <div className='grid grid-cols-3'>
        <Icon
          title='Hiit'
          text={todaysDailyLog?.isHiit}
        />
        <Icon
          title='Cardio'
          text={todaysDailyLog?.isCardio}
        />
        <Icon
          title='Lift'
          text={todaysDailyLog?.isLift}
        />
      </div>
    </div>
  )
}

export { DailyLog }
