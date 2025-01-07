'use client'

import { GetAllDailyLogs, GetAllWeighIns, GetUserById } from '@/types'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import { ChartContainer, type ChartConfig } from '@/components/ui/chart'

export const dynamic = 'force-dynamic'

const chartConfig = {
  weight: {
    label: 'Weight',
    color: '#2563eb',
  },
} satisfies ChartConfig

const BodyWeight = ({ dailyLogs }: { dailyLogs: GetAllDailyLogs }) => {
  const data = dailyLogs
    .slice(0, 22)
    .map((dailyLog) => ({
      date: dailyLog.date.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
      }),
      weight: dailyLog.morningWeight,
    }))
    .reverse()

  const dataMin = Math.floor(Math.min(...data.map((d) => Number(d.weight)))) - 1
  const dataMax = Math.ceil(Math.max(...data.map((d) => Number(d.weight)))) + 1

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

export { BodyWeight }
