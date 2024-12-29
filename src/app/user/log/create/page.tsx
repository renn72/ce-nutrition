'use client'

import { api } from '@/trpc/react'

import { DailyLogForm } from './form'

export default function Home() {
  const { data: currentUserDailyLogs, isLoading: isLoadingDailyLogs } =
    api.dailyLog.getAllCurrentUser.useQuery()

  if (isLoadingDailyLogs) return null

  const todaysDate = new Date()

  const todaysDailyLog = currentUserDailyLogs?.find(
    (dailyLog) => dailyLog.date.toDateString() === todaysDate.toDateString(),
  )

  return <DailyLogForm todaysLog={todaysDailyLog} />
}
