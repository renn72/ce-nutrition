'use client'

import { api } from '@/trpc/react'

import Image from 'next/image'
import Link from 'next/link'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { GetAllDailyLogs, GetAllWeighIns, GetUserById } from '@/types'
import { Bell, NotebookText } from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

import { Button } from '@/components/ui/button'
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { User } from '@/components/auth/user'

import { Plan } from './_components/plan'

const chartConfig = {
  weight: {
    label: 'Weight',
    color: '#2563eb',
  },
} satisfies ChartConfig

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
          {
            plan.userRecipes.filter((recipe) => recipe.mealIndex == mealIndex).map((recipe, recipeIndex) => (
              <div
                className='flex gap-2 items-center'
                key={recipe.id}
              >
                <div className='text-muted-foreground'>{recipe.name}</div>
              </div>
            ))
          }
        </div>
        </div>
      ))}
    </div>
  )
}

const BodyFatChart = ({ weighIns }: { weighIns: GetAllWeighIns }) => {
  const data = weighIns
    .slice(0, 15)
    .map((weighIn) => ({
      date: weighIn.date.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
      }),
      weight: weighIn.bodyFat,
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

const Mobile = ({ userId }: { userId: string }) => {
  const { data: currentUser } = api.user.get.useQuery(userId)
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  const { data: weighIns } = api.weighIn.getAllUser.useQuery(userId)

  console.log(currentUser)

  const isTrainer = currentUser?.isTrainer
  const plan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )
  return (
    <div className='flex flex-col gap-2 w-full min-h-screen'>
      <div className='flex gap-2 items-center justify-around w-full'>
        <div className='flex flex-col gap-0 items-center justify-center'>
          <NotebookText
            size={40}
            className='bg-accentt cursor-pointer rounded-full p-1'
          />
          <Label className='text-xs text-muted-foreground'>Program</Label>
        </div>
        <Link
          className='hover:opacity-100 opacity-80 transition-all py-2'
          href='/'
        >
          <Image
            src='/logo/ce.png'
            alt='logo'
            width={40}
            height={40}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <div className='flex flex-col gap-0 items-center justify-center'>
          <Bell
            size={40}
            className='bg-accentt cursor-pointer rounded-full p-1'
          />
          <Label className='text-xs text-muted-foreground'>Notifications</Label>
        </div>
      </div>

      <Tabs
        defaultValue='bw'
        className='w-full'
      >
        <TabsList className='flex gap-2 items-center justify-center w-full bg-background '>
          <TabsTrigger
            className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
            value='bw'>Body Weight</TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
            value='lm'>Lean Mass</TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
            value='bf'>Body Fat</TabsTrigger>
        </TabsList>
        <TabsContent
          className='bg-secondary p-2'
          value='bw'
        >
          {dailyLogs ? (
            <BodyWeightChart dailyLogs={dailyLogs} />
          ) : null}
        </TabsContent>
        <TabsContent
          value='lm'
          className='bg-secondary p-2'
        >
          {weighIns  ? (
            <LeanMassChart weighIns={weighIns} />
          ) : null}
        </TabsContent>
        <TabsContent
          value='bf'
          className='bg-secondary p-2'
        >
          {weighIns  ? (
            <BodyFatChart weighIns={weighIns} />
          ) : null}
        </TabsContent>
      </Tabs>
      <div className='flex gap-2 w-full justify-center my-6'>
        <Button
          variant='accent'
          className='w-full mx-4 text-slate-900/70'
        >
          Daily Log
        </Button>
      </div>
      <PlanPreview user={currentUser} />
      <div className='flex flex-col gap-2 w-full p-2 h-96 bg-secondary'></div>
      <div className='flex flex-col gap-2 w-full p-2 grow'></div>
      <div className='flex gap-2 w-full p-2 justify-center fixed bottom-0 border-t border-border bg-background'>
        <User />
      </div>
    </div>
  )
}

const Desktop = ({ userId }: { userId: string }) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='my-8'>TODO: desktop</div>
      <div>Mobile</div>

      <ScrollArea className='w-[390px] h-[844px] border border-border shadow-md'>
        <Mobile userId={userId} />
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
