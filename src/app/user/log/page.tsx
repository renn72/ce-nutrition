'use client'

import { api } from '@/trpc/react'

import { cn, getFormattedDate } from '@/lib/utils'
import { toast } from 'sonner'

import { DailyLog } from '@/components/daily-log/daily-log'

export default function Home() {
  const ctx = api.useUtils()
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const { data: currentUserDailyLogs, isLoading: isLoadingDailyLogs } =
    api.dailyLog.getAllCurrentUser.useQuery()

  const today = new Date()

  return (
    <div className='flex flex-col gap-2 w-full min-h-screen mt-16 '>
      {Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(today.getTime() - i * 86400000)
        return (
          <div
            key={i}
            className='flex gap-2 flex-col'
          >
            <div className='text-sm text-muted-foreground font-semibold text-center'>
              {getFormattedDate(date)}
            </div>
            <DailyLog
              dailyLogs={currentUserDailyLogs}
              day={date}
            />
          </div>
        )
      })}
      blah
    </div>
  )
}
