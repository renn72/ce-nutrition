'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from 'recharts'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

export const dynamic = 'force-dynamic'

const chartConfig = {
  value: {
    label: 'value',
    color: '#2563eb',
  },
} satisfies ChartConfig

const SkinfoldChart = ({
  data,
  label,
}: {
  data: {
    value: number
    date: string
  }[]
  label: string
}) => {
  const dataMin = Math.floor(Math.min(...data.map((d) => Number(d.value)))) - 2
  const dataMax = Math.ceil(Math.max(...data.map((d) => Number(d.value)))) + 2

  return (
    <ChartContainer
      config={chartConfig}
      className='w-full min-h-[200px] max-h-[300px] mt-12'
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
          orientation='left'
          width={20}
          allowDecimals={false}
          padding={{ top: 10, bottom: 0 }}
          interval='preserveStartEnd'
          dataKey='value'
          tickLine={false}
          tickCount={10}
          tickMargin={0}
          axisLine={false}
          type='number'
          allowDataOverflow={true}
          domain={[dataMin, dataMax]}
        />
        <Line
          dataKey='value'
          dot={true}
          strokeWidth={2}
          type='monotone'
          isAnimationActive={true}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
      </LineChart>
    </ChartContainer>
  )
}

export { SkinfoldChart }
