'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs, GetUserById } from '@/types'

const UserWeight = ({
  user,
  dailyLogs,
}: {
  user: GetUserById
  dailyLogs: GetAllDailyLogs
}) => {
  console.log('user', user)

  const logs = dailyLogs
    .map((dailyLog) => {
      const date = new Date(dailyLog.date)
      return {
        date: date,
        weight: dailyLog.morningWeight,
      }
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 7)

  console.log('logs', logs)

  const weight = logs.reduce((acc, cur) => {
    if (cur.weight && acc === null) {
      return Number(cur.weight)
    }
    return acc
  }, null)

  return (
    <div className='border rounded-lg p-4 flex flex-col w-[300px] items-center'>
      <div
        className={cn(
          'flex items-center justify-center rounded-full border-8 border-blue-600/30',
          ' w-56 h-56 text-4xl font-bold text-primary/90',
        )}
      >
        <div className='flex items-baseline'>
          {weight}
          {weight ? <span className='text-xl text-muted-foreground'>kg</span> : ''}
        </div>
      </div>
    </div>
  )
}

const UserInfo = ({ userId }: { userId: string }) => {
  const { data: user } = api.user.get.useQuery(userId || '')
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId || '')

  if (!user) return null
  if (!dailyLogs) return null
  return (
    <div className='p-4'>
      <UserWeight
        user={user}
        dailyLogs={dailyLogs}
      />
    </div>
  )
}

export { UserInfo }
