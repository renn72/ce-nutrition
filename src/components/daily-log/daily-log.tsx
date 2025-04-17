'use client'

import { api } from '@/trpc/react'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { GetDailyLogById, GetUserById } from '@/types'
import { CircleX } from 'lucide-react'
// import Link from 'next/link'
import { Link } from 'next-view-transitions'

import { Badge } from '@/components/ui/badge'

const Text = ({
  title,
  text,
  suffix = '',
  isWidthFull = false,
}: {
  suffix?: string
  title: string
  text: string | undefined | null
  isWidthFull?: boolean
}) => {
  return (
    <div
      className={cn(
        'flex gap-2 items-center',
        isWidthFull && 'min-w-[300px]',
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
  currentUser,
  isAdmin,
}: {
  todaysDailyLog: GetDailyLogById | undefined
  currentUser: GetUserById
  isAdmin?: boolean
}) => {
  console.log(currentUser)

  const isSleep = isAdmin || currentUser?.settings?.isSleep
  const isSleepQuality = isAdmin || currentUser?.settings?.isSleepQuality
  const isNap = isAdmin || currentUser?.settings?.isNap
  const isBloodGlucose = isAdmin || currentUser?.settings?.isBloodGlucose
  const isHiit = isAdmin || currentUser?.settings?.isHiit
  const isLiss = isAdmin || currentUser?.settings?.isLiss
  const isWeightTraining = isAdmin || currentUser?.settings?.isWeightTraining
  const isSauna = isAdmin || currentUser?.settings?.isSauna
  const isColdPlunge = isAdmin || currentUser?.settings?.isColdPlunge
  const isNotes = isAdmin || currentUser?.settings?.isNotes

  return (
    <div className='flex flex-col gap-2 w-full px-2 py-4 bg-secondary text-sm'>
      <div className='flex gap-3 flex-wrap w-full justify-between'>
        <Text
          title='Weight'
          text={todaysDailyLog?.morningWeight}
          suffix='kg'
        />
        {isSleep && (
          <Text
            title='Sleep'
            text={todaysDailyLog?.sleep}
          />
        )}
        {isNap && (
          <Text
            title='Nap'
            text={todaysDailyLog?.nap}
          />
        )}
        {isSleepQuality && (
          <Text
            title='Sleep Score'
            text={todaysDailyLog?.sleepQuality}
          />
        )}
        {isBloodGlucose && (
          <Text
            title='Blood Glucose'
            text={todaysDailyLog?.fastedBloodGlucose}
            suffix=''
          />
        )}
        {isAdmin && (
          <Text
            title='Bowel Movements'
            text={todaysDailyLog?.poopLogs
              .reduce((acc, curr) => acc + 1, 0)
              .toString()}
          />
        )}
        {isAdmin && (
          <Text
            title='Water'
            text={todaysDailyLog?.waterLogs
              .reduce((acc, curr) => acc + Number(curr.amount), 0)
              .toString()}
            suffix='ml'
          />
        )}
        {isHiit && (
          <Text
            title='HIIT'
            text={todaysDailyLog?.hiit}
          />
        )}
        {isLiss && (
          <Text
            title='LISS'
            text={todaysDailyLog?.liss}
          />
        )}
        {isWeightTraining && (
          <Text
            title='Weight Training'
            text={todaysDailyLog?.weight}
          />
        )}
        {isSauna && (
          <Text
            title='Sauna'
            text={todaysDailyLog?.sauna}
          />
        )}
        {isColdPlunge && (
          <Text
            title='Cold Plunge'
            text={todaysDailyLog?.coldPlunge}
          />
        )}
        {isNotes && (
          <Text
            title='Notes'
            isWidthFull={true}
            text={todaysDailyLog?.notes}
          />
        )}
      </div>
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
        <Icon
          title='Sauna'
          text={todaysDailyLog?.sauna}
        />
        <Icon
          title='Cold Plunge'
          text={todaysDailyLog?.coldPlunge}
        />
      </div>
    </div>
  )
}
const DailyLog = ({
  dailyLog,
  date,
  currentUser,
  isAdmin = false,
}: {
  dailyLog: GetDailyLogById | undefined
  date: Date
  currentUser: GetUserById
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
        {isAdmin && isCreator?.isCreator && (
          <CircleX
            size={16}
            className='absolute right-2 top-2 text-destructive hover:text-red-700 cursor-pointer'
            onClick={() => {
              deleteDailyLog(id)
            }}
          />
        )}
        <Logs
          isAdmin={isAdmin}
          currentUser={currentUser}
          todaysDailyLog={dailyLog}
        />
      </div>
    )

  return (
    <Link href={`/user/log/create?id=${id}&date=${date.getTime()}`}>
      <Logs
        isAdmin={isAdmin}
        todaysDailyLog={dailyLog}
        currentUser={currentUser}
      />
    </Link>
  )
}

export { DailyLog }
