'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs, GetUserById } from '@/types'
import { ArrowDown, ArrowUp } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartConfig = {
  weight: {
    label: 'Weight',
    color: '#2563eb',
  },
} satisfies ChartConfig

type Log = {
  date: Date
  weight: number
}

const BodyWeightChart = ({ logs }: { logs: Log[] }) => {
  const dataMin = Math.min(...logs.map((d) => Number(d.weight))) - 0.1
  const dataMax = Math.max(...logs.map((d) => Number(d.weight))) + 0.1
  return (
    <ChartContainer
      config={chartConfig}
      className='w-full min-h-[80px] max-h-[250px]'
    >
      <LineChart data={logs}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='date'
          tickLine={false}
          tickMargin={0}
          axisLine={false}
        />
        <YAxis
          orientation='right'
          width={0}
          allowDecimals={true}
          padding={{ top: 0, bottom: 0 }}
          interval='preserveStartEnd'
          dataKey='weight'
          tickLine={false}
          tickCount={10}
          tickMargin={0}
          axisLine={false}
          type='number'
          allowDataOverflow={false}
          domain={[dataMin, dataMax]}
        />
        <Line
          dataKey='weight'
          dot={false}
          strokeWidth={1}
          type='monotone'
          isAnimationActive={true}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  )
}

const WeightArrow = ({ weight, lastWeight }: { weight: number | null, lastWeight: number | null }) => {
  if (!weight) return null
  if (!lastWeight) return null
  return (
    <>
      {weight > lastWeight ? (
        <ArrowUp
          className='text-secondary-foreground'
          size={20}
        />
      ) : (
        <ArrowDown
          className='text-accent-foreground'
          size={20}
        />
      )}
    </>
  )
}

const UserWeight = ({
  user,
  dailyLogs,
}: {
  user: GetUserById
  dailyLogs: GetAllDailyLogs
}) => {
  console.log('user', user)

  const logs = dailyLogs
    .filter((dailyLog) => dailyLog.morningWeight !== '')
    .filter((dailyLog) => dailyLog.morningWeight)
    .map((dailyLog) => {
      const date = new Date(dailyLog.date)
      return {
        date: date,
        weight: Number(dailyLog.morningWeight),
      }
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 7)

  console.log('logs', logs)

  const weight: number | null = logs.reduce<number | null>((acc, cur) => {
    if (cur.weight && acc === null) {
      return Number(cur.weight)
    }
    return acc
  }, null)

  const lastWeight: number | null = logs
    .reverse()
    .reduce<number | null>((acc, cur) => {
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
          {weight ? (
            <span className='text-xl text-muted-foreground'>kg</span>
          ) : (
            ''
          )}
          <WeightArrow
            weight={weight}
            lastWeight={lastWeight}
          />
        </div>
      </div>
      <BodyWeightChart logs={logs} />
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
