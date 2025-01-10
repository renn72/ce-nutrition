'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn, getFormattedDate } from '@/lib/utils'

import { DailyLog } from '@/components/daily-log/daily-log'

export default function Home() {
  const { data: currentUserDailyLogs, isLoading: _isLoadingDailyLogs } =
    api.dailyLog.getAllCurrentUser.useQuery()
  const [length, setLength] = useState(7)

  const today = new Date()

  if (!currentUserDailyLogs) return null

  return (
    <div className='w-full mt-16 flex flex-col items-center'>
      <div className='flex flex-col gap-2 w-full max-w-xl'>
        {Array.from({ length: length }).map((_, i) => {
          const date = new Date(today.getTime() - i * 86400000)
          const dailyLog = currentUserDailyLogs?.find(
            (dailyLog) => dailyLog.date.toDateString() === date.toDateString(),
          )
          return (
            <div
              key={i}
              className='flex gap-2 flex-col'
            >
              <div className='text-sm text-muted-foreground font-semibold text-center'>
                {getFormattedDate(date)}
              </div>
              <DailyLog dailyLog={dailyLog} />
            </div>
          )
        })}
        blah
      </div>
    </div>
  )
}
