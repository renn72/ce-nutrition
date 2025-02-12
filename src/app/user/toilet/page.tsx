
'use client'

import { api } from '@/trpc/react'

import { GetDailyLogById } from '@/types'

const PoopLog = ({
  dailyLog,
}: {
  dailyLog: GetDailyLogById | null | undefined
}) => {
  return (
    <div className='flex flex-col gap-0 w-full bg-secondary p-2'>
      <div className='w-full flex justify-around items-center'>
        <div className='text-center'>{dailyLog?.date}</div>
        <div className='text-center'>
          {dailyLog?.poopLogs.reduce((acc, curr) => {
            return acc + 1
          }, 0)}
        </div>
      </div>
      {dailyLog?.poopLogs.map((poopLog) => (
        <div
          key={poopLog.id}
          className='flex gap-2 text-xs justify-center w-full items-end'
        >
          <div className='text-muted-foreground font-normal'>
            {poopLog.createdAt.toLocaleTimeString('en-AU')}
          </div>
        </div>
      ))}
    </div>
  )
}

const PoopLogs = ({ userId }: { userId: string }) => {
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  return (
    <div className='w-full mt-12 flex flex-col gap-2'>
      {dailyLogs
        ?.filter((l) => new Date(l.date).getTime() < new Date().getTime())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((dailyLog) => (
          <PoopLog
            key={dailyLog.id}
            dailyLog={dailyLog}
          />
        ))}
    </div>
  )
}

export default function Home() {
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery()

  if (isLoading) return null
  if (!currentUser) return null

  return (
    <div className='w-full mt-12'>
      <PoopLogs userId={currentUser.id} />
    </div>
  )
}
