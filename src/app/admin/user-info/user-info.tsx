'use client'

import { api } from '@/trpc/react'

import { UserGoals } from './user-goals'
import { UserWeight } from './user-weight'

import { UserCharts } from './user-charts'

const UserInfo = ({ userId }: { userId: string }) => {
  const { data: user } = api.user.get.useQuery(userId)
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  const { data: userGoals, isLoading : userGoalsLoading } = api.goal.getUser.useQuery({ userId : userId})

  if (!user) return null
  if (!dailyLogs) return null
  if (userGoalsLoading) return null

  return (
    <div className='p-4 flex flex-wrap gap-4 w-full'>
      <UserWeight
        user={user}
        dailyLogs={dailyLogs}
      />
      <UserGoals
        user={user}
        userGoals={userGoals}
      />
      <UserCharts
        dailyLogs={dailyLogs}
      />
    </div>
  )
}

export { UserInfo }
