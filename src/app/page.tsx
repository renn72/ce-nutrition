'use client'

import { api } from '@/trpc/react'

import Link from 'next/link'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { cn } from '@/lib/utils'
import { GetAllDailyLogs, GetAllWeighIns, GetUserById } from '@/types'
import { SquareCheck, SquareX } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/ui/button'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { User } from '@/components/auth/user'
import { BodyFat } from '@/components/charts/mobile/body-fat'
import MobileHeader from '@/components/layout/mobile-header'

export const dynamic = 'force-dynamic'

const chartConfig = {
  weight: {
    label: 'Weight',
    color: '#2563eb',
  },
} satisfies ChartConfig

const DailyLog = ({
  dailyLogs,
}: {
  dailyLogs: GetAllDailyLogs | null | undefined
}) => {
  const today = new Date()
  const todaysDailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date.toDateString() === today.toDateString(),
  )
  console.log('todaysDailyLog', todaysDailyLog)
  if (!dailyLogs) return null
  return (
    <div className='flex flex-col gap-2 w-full px-2 py-4 bg-secondary text-sm'>
      <div className='text-muted-foreground text-center w-full font-semibold'>
        Today
      </div>
      <div className='grid grid-cols-2'>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Weight</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.morningWeight ? 'text-muted-foreground' : 'text-muted-foreground/70')}>
            {todaysDailyLog && todaysDailyLog?.morningWeight
              ? todaysDailyLog?.morningWeight + 'kg'
              : '......'}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Bowel Movements</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.bowelMovements ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.bowelMovements
              ? todaysDailyLog?.bowelMovements
              : '......'}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3'>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Sleep</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.sleep ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.sleep
              ? todaysDailyLog?.sleep
              : '......'}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Nap</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.nap ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.nap
              ? todaysDailyLog?.nap
              : '......'}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Sleep Score</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.sleepQuality ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.sleepQuality
              ? todaysDailyLog?.sleepQuality
              : '......'}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2'>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Notes</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.bowelMovements ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.bowelMovements
              ? todaysDailyLog?.bowelMovements
              : '......'}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Picture</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.image ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.image ? (
              <SquareCheck size={16} />
            ) : (
              <SquareX size={16} />
            )}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-3' >
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Hiit</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.isHiit ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.isHiit ? (
              <SquareCheck size={16} />
            ) : (
              <SquareX size={16} />
            )}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Cardio</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.isCardio ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.isCardio ? (
              <SquareCheck size={16} />
            ) : (
              <SquareX size={16} />
            )}
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='text-muted-foreground'>Lift</div>
          <div className={cn('text-sm', todaysDailyLog && todaysDailyLog?.isLift ? 'text-muted-foreground' : 'text-muted-foreground/50')}>
            {todaysDailyLog && todaysDailyLog?.isLift ? (
              <SquareCheck size={16} />
            ) : (
              <SquareX size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
const PlanPreview = ({ user }: { user: GetUserById }) => {
  const plan = user?.userPlans.find((plan) => plan.id == user?.currentPlanId)

  if (!plan) return null

  return (
    <div className='flex flex-col gap-2 w-full p-2 bg-secondary min-h-[200px] text-xs'>
      {plan.userMeals.map((meal, mealIndex) => (
        <div
          className='flex gap-0 flex-col'
          key={meal.id}
        >
          <div className='flex gap-2 items-center'>
            <div className='text-muted-foreground'>{meal.mealTitle}</div>
            <div className='text-sm text-muted-foreground'>
              {meal.targetCalories}cals
            </div>
          </div>
          <div className='flex gap-0 flex-col pl-4'>
            {plan.userRecipes
              .filter((recipe) => recipe.mealIndex == mealIndex)
              .map((recipe, recipeIndex) => (
                <div
                  className='flex gap-2 items-center'
                  key={recipe.id}
                >
                  <div className='text-muted-foreground'>{recipe.name}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const LeanMassChart = ({ weighIns }: { weighIns: GetAllWeighIns }) => {
  const data = weighIns
    .slice(0, 15)
    .map((weighIn) => ({
      date: weighIn.date.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
      }),
      weight: weighIn.leanMass,
    }))
    .reverse()

  const dataMin = Math.floor(Math.min(...data.map((d) => Number(d.weight))))
  const dataMax = Math.ceil(Math.max(...data.map((d) => Number(d.weight))))

  return (
    <ChartContainer
      config={chartConfig}
      className='w-full min-h-[200px]'
    >
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickLine={false}
          tickMargin={10}
          axisLine={true}
        />
        <YAxis
          orientation='right'
          width={20}
          allowDecimals={false}
          padding={{ top: 0, bottom: 0 }}
          interval='preserveStartEnd'
          dataKey='weight'
          tickLine={false}
          tickCount={10}
          tickMargin={0}
          axisLine={false}
          type='number'
          allowDataOverflow={true}
          domain={[dataMin, dataMax]}
        />
        <Area
          dataKey='weight'
          dot={false}
          strokeWidth={2}
          type='monotone'
          isAnimationActive={true}
        />
      </AreaChart>
    </ChartContainer>
  )
}

const SleepChart = ({ dailyLogs }: { dailyLogs: GetAllDailyLogs }) => {
  const data = dailyLogs
    .slice(0, 14)
    .map((dailyLog) => ({
      date: dailyLog.date.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
      }),
      sleep: dailyLog.sleep,
      sleepQuality: dailyLog.sleepQuality,
    }))
    .reverse()

  const dataMin = Math.floor(Math.min(...data.map((d) => Number(d.sleep))))
  const dataMax = Math.ceil(Math.max(...data.map((d) => Number(d.sleep))))

  return (
    <ChartContainer
      config={chartConfig}
      className='w-full min-h-[200px]'
    >
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickLine={false}
          tickMargin={10}
          axisLine={true}
        />
        <YAxis
          orientation='right'
          width={20}
          allowDecimals={false}
          padding={{ top: 0, bottom: 0 }}
          interval='preserveStartEnd'
          dataKey='sleep'
          tickLine={false}
          tickCount={10}
          tickMargin={0}
          axisLine={false}
          type='number'
          allowDataOverflow={true}
          domain={[dataMin, dataMax]}
        />
        <Line
          dataKey='sleep'
          dot={false}
          strokeWidth={2}
          type='monotone'
          isAnimationActive={true}
        />
        <Line
          dataKey='sleepQuality'
          label='Sleep Quality'
          stroke='#FFB50050'
          dot={false}
          strokeWidth={1}
          type='monotone'
          isAnimationActive={true}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
      </LineChart>
    </ChartContainer>
  )
}

const BodyWeightChart = ({ dailyLogs }: { dailyLogs: GetAllDailyLogs }) => {
  const data = dailyLogs
    .slice(0, 15)
    .map((dailyLog) => ({
      date: dailyLog.date.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
      }),
      weight: dailyLog.morningWeight,
    }))
    .reverse()

  const dataMin = Math.floor(Math.min(...data.map((d) => Number(d.weight))))
  const dataMax = Math.ceil(Math.max(...data.map((d) => Number(d.weight))))

  return (
    <ChartContainer
      config={chartConfig}
      className='w-full min-h-[200px]'
    >
      <AreaChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickLine={false}
          tickMargin={10}
          axisLine={true}
        />
        <YAxis
          orientation='right'
          width={20}
          allowDecimals={false}
          padding={{ top: 0, bottom: 0 }}
          interval='preserveStartEnd'
          dataKey='weight'
          tickLine={false}
          tickCount={10}
          tickMargin={0}
          axisLine={false}
          type='number'
          allowDataOverflow={true}
          domain={[dataMin, dataMax]}
        />
        <Area
          dataKey='weight'
          dot={false}
          strokeWidth={2}
          type='monotone'
          isAnimationActive={true}
        />
      </AreaChart>
    </ChartContainer>
  )
}

const Mobile = ({
  userId,
  isDesktop = false,
}: {
  userId: string
  isDesktop?: boolean
}) => {
  const { data: currentUser } = api.user.get.useQuery(userId)
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  const { data: weighIns } = api.weighIn.getAllUser.useQuery(userId)

  const isTrainer = currentUser?.isTrainer
  const plan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )
  return (
    <div className='flex flex-col gap-2 w-full min-h-screen mt-16 '>
      <MobileHeader />

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
          {dailyLogs ? <BodyWeightChart dailyLogs={dailyLogs} /> : null}
        </TabsContent>
        <TabsContent
          value='lm'
          className='bg-secondary p-2'
        >
          {weighIns ? <LeanMassChart weighIns={weighIns} /> : null}
        </TabsContent>
        <TabsContent
          value='bf'
          className='bg-secondary p-2'
        >
          {weighIns ? <BodyFat weighIns={weighIns} /> : null}
        </TabsContent>
        <TabsContent
          value='sleep'
          className='bg-secondary p-2'
        >
          {dailyLogs ? <SleepChart dailyLogs={dailyLogs} /> : null}
        </TabsContent>
      </Tabs>
      <div className='flex gap-2 w-full justify-center my-6'>
        <Link
          className='w-full'
          href='/user/log'
        >
          <DailyLog dailyLogs={dailyLogs} />
        </Link>
      </div>
      <PlanPreview user={currentUser} />
      <div className='flex flex-col gap-2 w-full p-2 h-96 bg-secondary'></div>
      <div className='flex flex-col gap-2 w-full p-2 h-96 bg-secondary'></div>
      <div className='flex flex-col gap-2 w-full p-2 grow'></div>
      <div
        className={cn(
          'flex gap-2 w-full p-2 justify-center fixed border-t border-border bg-background w-full',
          !isDesktop ? 'bottom-0 w-full' : 'top-[924px] w-[389px]',
        )}
      >
        <User />
      </div>
    </div>
  )
}

const Desktop = ({ userId }: { userId: string }) => {
  return (
    <div className='flex flex-col items-center gap-2 '>
      <div className='my-8'>TODO: desktop</div>
      <div>Mobile</div>

      <ScrollArea className='w-[390px] h-[844px] border border-border shadow-md relative '>
        <Mobile
          userId={userId}
          isDesktop={true}
        />
      </ScrollArea>
    </div>
  )
}

export default function Home() {
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  if (!currentUser) return null
  return (
    <div className='flex min-h-screen flex-col'>
      {isMobile ? (
        <Mobile userId={currentUser.id} />
      ) : (
        <Desktop userId={currentUser.id} />
      )}
    </div>
  )
}
