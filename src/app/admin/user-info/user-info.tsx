'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs, GetUserById } from '@/types'

import { UserWeight } from './user-weight'

const UserGoals = () => {
  return (
    <div className='border rounded-lg p-4 flex flex-col w-[300px] items-center'>
      goals
    </div>
  )
}

const UserInfo = ({ userId }: { userId: string }) => {
  const { data: user } = api.user.get.useQuery(userId || '')
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId || '')

  if (!user) return null
  if (!dailyLogs) return null
  return (
    <div className='p-4 flex flex-wrap gap-4 w-full'>
      <UserWeight
        user={user}
        dailyLogs={dailyLogs}
      />
      <UserGoals />
    </div>
  )
}

export { UserInfo }
