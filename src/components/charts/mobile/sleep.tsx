'use client'

import { GetAllDailyLogs, GetAllWeighIns, GetUserById } from '@/types'
import { Legend, Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

export const dynamic = 'force-dynamic'

const chartConfig = {
  weight: {
    label: 'Weight',
    color: '#2563eb',
  },
} satisfies ChartConfig

const Sleep = ({ dailyLogs }: { dailyLogs: GetAllDailyLogs }) => {
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

export { Sleep }
