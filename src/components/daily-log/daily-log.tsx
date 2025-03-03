'use client'

import { api } from '@/trpc/react'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { GetDailyLogById } from '@/types'
// import Link from 'next/link'
import { Link } from 'next-view-transitions'

import { Badge } from '@/components/ui/badge'
import { CircleX } from 'lucide-react'

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
    <div
      className={cn(
        'flex gap-2 items-center',
        title === 'Notes' && text !== '' && 'flex-col',
      )}
    >
      <div className='text-muted-foreground'>{title}</div>
      <div
        className={cn(
          'text-sm font-semibold ',
          text ? 'text-secondary-foreground' : 'text-muted-foreground/70',
          title === 'Notes' ? '' : 'truncate',
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
    <Badge
      variant='default'
      className=''
    >
      {title}
    </Badge>
  )
}

const Logs = ({
  todaysDailyLog,
}: {
  todaysDailyLog: GetDailyLogById | undefined
}) => {
  return (
    <div className='flex flex-col gap-2 w-full px-2 py-4 bg-secondary text-sm'>
      <div className='grid grid-cols-2 w-full '>
        <Text
          title='Weight'
          text={todaysDailyLog?.morningWeight}
          suffix='kg'
        />
        <Text
          title='Blood Glucose'
          text={todaysDailyLog?.fastedBloodGlucose}
          suffix=''
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
      <div className='w-full grid grid-cols-2 gap-2'>
        {todaysDailyLog?.waistMeasurement &&
        todaysDailyLog?.waistMeasurement !== '' ? (
          <Text
            title='Waist'
            text={todaysDailyLog?.waistMeasurement}
          />
        ) : null}
        <Text
          title='Bowel Movements'
          text={todaysDailyLog?.poopLogs
            .reduce((acc, curr) => acc + 1, 0)
            .toString()}
        />
      </div>
      <Text
        title='Notes'
        text={todaysDailyLog?.notes}
      />
      <div className='flex gap-2 justify-center'>
        <Icon
          title='HIIT'
          text={todaysDailyLog?.hiit}
        />
        <Icon
          title='LISS'
          text={todaysDailyLog?.liss}
        />
        <Icon
          title='Weight Training'
          text={todaysDailyLog?.weight}
        />
      </div>
    </div>
  )
}
const DailyLog = ({
  dailyLog,
  date,
  isAdmin = false,
}: {
  dailyLog: GetDailyLogById | undefined
  date: Date
  isAdmin?: boolean
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
      <div className='bg-secondary p-2 relative'>
        {
          isAdmin && isCreator.isCreator && (
            <CircleX
              size={16}
              className='absolute right-2 top-2 text-destructive hover:text-red-700 cursor-pointer'
              onClick={() => {
                deleteDailyLog(id)
              }}
            />
          )
        }
        <Logs todaysDailyLog={dailyLog} />
      </div>
    )

  return (
    <Link href={`/user/log/create?id=${id}&date=${date.getTime()}`}>
      <Logs todaysDailyLog={dailyLog} />
    </Link>
  )
}

export { DailyLog }
