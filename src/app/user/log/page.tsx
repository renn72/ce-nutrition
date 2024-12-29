'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import { toast } from 'sonner'
export default function Home() {
  const ctx = api.useUtils()
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const { data: currentUserDailyLogs, isLoading: isLoadingDailyLogs } =
    api.dailyLog.getAllCurrentUser.useQuery()

  return (
    <div className='flex flex-col gap-2 w-full min-h-screen mt-16 '>
     blah
    </div>
  )
}
