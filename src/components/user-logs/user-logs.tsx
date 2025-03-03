'use client'

import { api } from '@/trpc/react'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { getFormattedDate } from '@/lib/utils'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { CheckIn } from '@/components/check-in/check-in'
import { DailyLog } from '@/components/daily-log/daily-log'

const DailyLogs = ({ userId, isAdmin = false }: { userId: string, isAdmin?: boolean }) => {
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId || '')
  const today = new Date()

  return (
    <div className='flex flex-col gap-0 items-center max-w-md'>
      {Array.from({ length: 21 }).map((_, i) => {
        const date = new Date(today.getTime() - i * 86400000)
        const dailyLog = dailyLogs?.find(
          (dailyLog) => dailyLog.date === date.toDateString(),
        )
        if (!dailyLog) return null
        return (
          <div
            key={i}
            className='flex gap-2 flex-col w-full my-2'
          >
            <div className='text-sm text-muted-foreground font-semibold text-center'>
              {getFormattedDate(date)}
            </div>
            <DailyLog
              dailyLog={dailyLog}
              date={date}
              isAdmin={isAdmin}
            />
          </div>
        )
      })}
    </div>
  )
}

const CheckIns = ({ userId }: { userId: string }) => {
  const { data: checkIns } = api.weighIn.getAllUser.useQuery(userId || '')

  return (
    <div className='flex flex-col gap-1 items-center max-w-md'>
      {checkIns?.slice(0, 7).map((checkIn) => (
        <div
          key={checkIn.id}
          className='flex gap-2 flex-col w-full'
        >
          <div className='text-sm text-muted-foreground font-semibold text-center'>
            {getFormattedDate(checkIn.date)}
          </div>
          <CheckIn weighIn={checkIn} />
        </div>
      ))}
    </div>
  )
}

const UserLogs = ({
  userId,
  isAdmin = false,
}: {
  userId: string
  isAdmin?: boolean
}) => {
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const { data: user } = api.user.get.useQuery(userId || '')
  console.log('user', user)

  if (!user) return null
  const plan = user?.userPlans.find((plan) => plan.id == user?.currentPlanId)

  if (isMobile) {
    return (
      <div className='flex flex-col gap-4 items-center my-10 '>
        <Tabs defaultValue='log'>
          <div className='w-full flex justify-center'>
            <TabsList className='px-6'>
              <TabsTrigger value='log'>Daily Log</TabsTrigger>
              <TabsTrigger value='checkin'>Check-in</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value='log'>
            <DailyLogs userId={userId} />
          </TabsContent>
          <TabsContent value='checkin'>
            <CheckIns userId={userId} />
          </TabsContent>
        </Tabs>
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-4 items-center my-10 '>
      <div className='flex gap-4 items-center'>
        <DailyLogs
          isAdmin={isAdmin}
          userId={userId} />
        <CheckIns userId={userId} />
      </div>
    </div>
  )
}

export { UserLogs }
