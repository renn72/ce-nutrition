'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { impersonatedUserAtom } from '@/atoms'
import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { Loader, XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { BodyFat } from '@/components/charts/mobile/body-fat'
import { BodyWeight } from '@/components/charts/mobile/body-weight'
import { LeanMass } from '@/components/charts/mobile/lean-mass'
import { Sleep } from '@/components/charts/mobile/sleep'
import { MobileFooter } from '@/components/layout/mobile-footer'
import { MobileHeader } from '@/components/layout/mobile-header'
import { MealLog } from '@/components/meal-log/meal-log'
import { PoopLog } from '@/components/poop-log/poop-log'
import { UserPlanView } from '@/components/user-plan/user-plan-view'
import { WaterLog } from '@/components/water-log/water-log'

import DailyLogCarousel from './_components/dailylog-carousel'

export const dynamic = 'force-dynamic'

const PlanPreview = ({ user }: { user: GetUserById }) => {
  const plans = user?.userPlans.filter((plan) => plan.isActive)

  if (!plans) return null

  return (
    <div className='flex flex-col gap-4 w-full '>
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
  const { data: dailyLogs, isLoading: dailyLogsLoading } =
    api.dailyLog.getAllUser.useQuery(userId)
  const { data: weighIns, isLoading: weighInsLoading } =
    api.weighIn.getAllUser.useQuery(userId)
  const [isCreatingLog, setIsCreatingLog] = useState(false)

  const { mutate: updateChartRange } = api.user.updateChartRange.useMutation({
    onSettled: () => {
      ctx.user.invalidate()
    },
  })
  const { mutate: createDailyLog } = api.dailyLog.create.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
    onError: (err) => {
      toast.error('error conflict')
      ctx.dailyLog.getAllUser.setData(userId, dailyLogs)
    },
  })

  const dailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date === new Date().toDateString(),
  )

  useEffect(() => {
    if (dailyLogsLoading) return
    if (isCreatingLog) return
    if (!dailyLog) {
      setIsCreatingLog(true)
      try {
        createDailyLog({
          date: new Date().toDateString(),
          userId: currentUser.id,
        })
      } catch (err) {
        // toast.error('error', err.message)
      }
    }
  }, [dailyLogs])

  if (dailyLogsLoading) return null

  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full mt-16 items-center ',
      )}
    >
      <MobileHeader isDesktop={false} />
      <div
        id='main-content'
        className={cn(
          'flex flex-col gap-4 w-full max-w-screen-xl main-content',
        )}
      >
        <Card className=''>
          <CardContent className='pb-2 px-0'>
            <Tabs
              defaultValue='bw'
              className='w-full'
            >
              <TabsList className='flex gap-2 items-center justify-center w-full bg-secondary '>
                <TabsTrigger
                  className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none data-[state=active]:bg-secondary'
                  value='bw'
                >
                  Body Weight
                </TabsTrigger>
                <TabsTrigger
                  className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none data-[state=active]:bg-secondary'
                  value='sleep'
                >
                  Sleep
                </TabsTrigger>
              </TabsList>
              <TabsContent
                className='bg-secondary p-2'
                value='bw'
              >
                {dailyLogsLoading ? (
                  <div className='flex flex-col items-center justify-center w-full min-h-[200px]'>
                    <Loader
                      size={32}
                      className='animate-spin text-primary/70'
                    />
                  </div>
                ) : (
                  <>
                    {dailyLogs ? (
                      <BodyWeight
                        dailyLogs={dailyLogs}
                        range={chartRange}
                      />
                    ) : null}
                  </>
                )}
              </TabsContent>
              <TabsContent
                value='lm'
                className='bg-secondary p-2'
              >
                {weighInsLoading ? (
                  <div className='flex flex-col items-center justify-center w-full min-h-[200px]'>
                    <Loader
                      size={32}
                      className='animate-spin text-primary/70'
                    />
                  </div>
                ) : (
                  <>
                    {weighIns ? (
                      <LeanMass
                        weighIns={weighIns}
                        range={chartRange}
                      />
                    ) : null}
                  </>
                )}
              </TabsContent>
              <TabsContent
                value='bf'
                className='bg-secondary p-2'
              >
                {weighInsLoading ? (
                  <div className='flex flex-col items-center justify-center w-full min-h-[200px]'>
                    <Loader
                      size={32}
                      className='animate-spin text-primary/70'
                    />
                  </div>
                ) : (
                  <>
                    {weighIns ? (
                      <BodyFat
                        weighIns={weighIns}
                        range={chartRange}
                      />
                    ) : null}
                  </>
                )}
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
            <div className='flex gap-4 justify-center font-normal text-xs mt-[-0.5rem]'>
              {chartRanges.map((range) => (
                <div
                  key={range}
                  className={cn(
                    'cursor-pointer p-2 rounded-lg',
                    chartRange === range
                      ? 'underline font-bold bg-accent-foreground/10'
                      : '',
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
          </CardContent>
        </Card>
        <Card className='py-2 '>
          <CardContent className='px-0 py-0'>
            <div className='flex justify-between w-full'>
              <WaterLog
                userId={userId}
                dailyLogs={dailyLogs}
                defaultAmount={Number(
                  currentUser?.settings?.defaultWater ?? 600,
                )}
              />
              <MealLog
                dailyLogs={dailyLogs}
                currentUser={currentUser}
              />
              <PoopLog
                userId={userId}
                dailyLogs={dailyLogs}
              />
            </div>
          </CardContent>
        </Card>
        <DailyLogCarousel
          currentUser={currentUser}
          dailyLogs={dailyLogs} />
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
          <Badge className='flex gap-4'>
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
