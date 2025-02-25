'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { impersonatedUserAtom } from '@/atoms'
import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { BodyFat } from '@/components/charts/mobile/body-fat'
import { BodyWeight } from '@/components/charts/mobile/body-weight'
import { LeanMass } from '@/components/charts/mobile/lean-mass'
import { Sleep } from '@/components/charts/mobile/sleep'
import { DailyLog } from '@/components/daily-log/daily-log'
import { MobileFooter } from '@/components/layout/mobile-footer'
import { MobileHeader } from '@/components/layout/mobile-header'
import { PoopLog } from '@/components/poop-log/poop-log'
import { UserPlanView } from '@/components/user-plan/user-plan-view'
import { WaterLog } from '@/components/water-log/water-log'

export const dynamic = 'force-dynamic'

const PlanPreview = ({ user }: { user: GetUserById }) => {
  const plans = user?.userPlans.filter((plan) => plan.isActive)

  if (!plans) return null

  return (
    <div className='flex flex-col gap-2 w-full '>
      {plans?.map((plan) => (
        <UserPlanView
          key={plan.id}
          userPlan={plan}
        />
      ))}
    </div>
  )
}

const chartRanges = [7, 14, 30, 90]

const Mobile = ({
  userId,
  currentUser,
  isDesktop = false,
}: {
  userId: string
  currentUser: GetUserById
  isDesktop?: boolean
}) => {
  const ctx = api.useUtils()
  const [chartRange, setChartRange] = useState(() =>
    Number(currentUser?.settings?.defaultChartRange ?? 7),
  )
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  const { data: weighIns } = api.weighIn.getAllUser.useQuery(userId)

  const { mutate: updateChartRange } = api.user.updateChartRange.useMutation({
    onSettled: () => {
      ctx.user.invalidate()
    },
  })

  const dailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date === new Date().toDateString(),
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full min-h-screen my-16 items-center ',
      )}
    >
      <MobileHeader isDesktop={false} />
      <div
        id='main-content'
        className={cn(
          'flex flex-col gap-2 w-full max-w-screen-xl main-content',
        )}
      >
        <div className='flex flex-col bg-secondary'>
          <Tabs
            defaultValue='bw'
            className='w-full'
          >
            <TabsList className='flex gap-2 items-center justify-center w-full bg-background '>
              <TabsTrigger
                className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
                value='bw'
              >
                Body Weight
              </TabsTrigger>
              <TabsTrigger
                className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
                value='lm'
              >
                Lean Mass
              </TabsTrigger>
              <TabsTrigger
                className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
                value='bf'
              >
                Body Fat
              </TabsTrigger>
              <TabsTrigger
                className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
                value='sleep'
              >
                Sleep
              </TabsTrigger>
            </TabsList>
            <TabsContent
              className='bg-secondary p-2'
              value='bw'
            >
              {dailyLogs ? (
                <BodyWeight
                  dailyLogs={dailyLogs}
                  range={chartRange}
                />
              ) : null}
            </TabsContent>
            <TabsContent
              value='lm'
              className='bg-secondary p-2'
            >
              {weighIns ? (
                <LeanMass
                  weighIns={weighIns}
                  range={chartRange}
                />
              ) : null}
            </TabsContent>
            <TabsContent
              value='bf'
              className='bg-secondary p-2'
            >
              {weighIns ? (
                <BodyFat
                  weighIns={weighIns}
                  range={chartRange}
                />
              ) : null}
            </TabsContent>
            <TabsContent
              value='sleep'
              className='bg-secondary p-2'
            >
              {dailyLogs ? (
                <Sleep
                  dailyLogs={dailyLogs}
                  range={chartRange}
                />
              ) : null}
            </TabsContent>
          </Tabs>
          <div className='flex gap-6 justify-center font-normal text-xs mt-[-0.5rem]'>
            {chartRanges.map((range) => (
              <div
                key={range}
                className={cn(
                  'cursor-pointer p-1 rounded-full',
                  chartRange === range ? 'underline font-bold' : '',
                )}
                onClick={() => {
                  setChartRange(range)
                  if (!currentUser) return
                  if (!currentUser.settings) return
                  updateChartRange({
                    range: range,
                    id: currentUser.settings?.id,
                  })
                }}
              >
                {range}
              </div>
            ))}
          </div>
        </div>
        <div className='grid grid-cols-2 w-full bg-secondary p-2'>
          <WaterLog
            dailyLogs={dailyLogs}
            defaultAmount={Number(currentUser?.settings?.defaultWater ?? 600)}
          />
          <PoopLog dailyLogs={dailyLogs} />
        </div>
        <div className='flex gap-0 w-full justify-center items-center my-6 flex-col bg-secondary pt-2'>
          <h2 className=' font-bold'>Today</h2>
          <DailyLog
            dailyLog={dailyLog}
            date={new Date()}
          />
        </div>
        <PlanPreview user={currentUser} />
      </div>
      <MobileFooter />
    </div>
  )
}

const Desktop = ({
  userId,
  currentUser,
}: {
  userId: string
  currentUser: GetUserById
}) => {
  return (
    <div className='flex flex-col items-center gap-2 '>
      <Mobile
        userId={userId}
        currentUser={currentUser}
        isDesktop={true}
      />
    </div>
  )
}

export default function Home() {
  const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
  console.log('impersonation', impersonatedUser.id, impersonatedUser.name)
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery({
    id: impersonatedUser.id,
  })
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  if (isLoading) return null
  if (!currentUser) return null
  return (
    <div className='flex min-h-screen flex-col relative'>
      {isMobile ? (
        <Mobile
          userId={currentUser.id}
          currentUser={currentUser}
        />
      ) : (
        <Desktop
          userId={currentUser.id}
          currentUser={currentUser}
        />
      )}
      {impersonatedUser.id !== '' ? (
        <div className='fixed bottom-14 left-1/2 -translate-x-1/2 opacity-80'>
          <Badge
            className='flex gap-4'
          >
        {impersonatedUser.name}
            <XIcon
              size={12}
              className='cursor-pointer'
              onClick={() => {
                setImpersonatedUser({
                  id: '',
                  name: '',
                })
              }}
            />
          </Badge>
        </div>
      ) : null}
    </div>
  )
}
