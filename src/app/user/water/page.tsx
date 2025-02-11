'use client'

import { api } from '@/trpc/react'

import { GetDailyLogById } from '@/types'

const WaterLog = ({
  dailyLog,
}: {
  dailyLog: GetDailyLogById | null | undefined
}) => {
  return (
    <div className='flex flex-col gap-0 w-full bg-secondary p-2'>
      <div className='w-full flex justify-around items-center'>
        <div className='text-center'>{dailyLog?.date}</div>
        <div className='text-center'>
          {dailyLog?.waterLogs.reduce((acc, curr) => {
            return acc + Number(curr.amount)
          }, 0)}
          ml
        </div>
      </div>
      {dailyLog?.waterLogs.map((waterLog) => (
        <div
          key={waterLog.id}
          className='flex gap-2 text-xs justify-center w-full items-end'
        >
          <div className='text-muted-foreground font-medium'>
            {waterLog.amount}ml
          </div>
          <div className='text-muted-foreground font-normal'>
            {waterLog.createdAt.toLocaleTimeString('en-AU')}
          </div>
        </div>
      ))}
    </div>
  )
}

const WaterLogs = ({ userId }: { userId: string }) => {
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  return (
    <div className='w-full mt-12 flex flex-col gap-2'>
      {dailyLogs
        ?.filter((l) => new Date(l.date).getTime() < new Date().getTime())
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((dailyLog) => (
          <WaterLog
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
      <WaterLogs userId={currentUser.id} />
    </div>
  )
}
