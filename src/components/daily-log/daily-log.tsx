'use client'

import Image from 'next/image'
// import Link from 'next/link'
import { Link } from 'next-view-transitions'

import { cn } from '@/lib/utils'
import { GetDailyLogById } from '@/types'

import { Badge } from '@/components/ui/badge'

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
const DailyLog = ({
  dailyLog,
  date,
}: {
  dailyLog: GetDailyLogById | undefined
  date: Date
}) => {
  const todaysDailyLog = dailyLog

  const id = dailyLog?.id || ''

  if (todaysDailyLog?.image && todaysDailyLog?.image !== '' && false) {
    return (
      <Link href={`/user/log/create?id=${id}&date=${date.getTime()}`}>
        <div className='grid grid-cols-3 w-full px-4 py-2 bg-secondary text-sm w-full'>
          <div className='flex flex-col gap-1 items-start col-span-2 w-full'>
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
            <Text
              title='Notes'
              text={todaysDailyLog?.notes}
            />
            <div className='flex gap-2 justify-center'>
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
              <Icon
                title='LISS'
                text={todaysDailyLog?.isLiss}
              />
            </div>
          </div>
          <Image
            src={todaysDailyLog.image}
            alt='img'
            width={400}
            height={500}
            style={{
              width: '100%',
              height: 'auto',
            }}
            className=''
          />
        </div>
      </Link>
    )
  }
  return (
    <Link href={`/user/log/create?id=${id}&date=${date.getTime()}`}>
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
          {
            todaysDailyLog?.waistMeasurement &&todaysDailyLog?.waistMeasurement !== ''? (
          <Text
            title='Waist'
            text={todaysDailyLog?.waistMeasurement}
          />

            ): null
           }
          <Text
            title='Bowel Movements'
                text={todaysDailyLog?.poopLogs.reduce(
                  (acc, curr) => acc + 1,
                  0,
                ).toString()}
          />
          <Text
            title='Notes'
            text={todaysDailyLog?.notes}
          />
        </div>
        <div className='flex gap-2 justify-center'>
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
    </Link>
  )
}

export { DailyLog }
