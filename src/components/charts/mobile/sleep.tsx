'use client'

import { GetAllDailyLogs, GetAllWeighIns, GetUserById } from '@/types'
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
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

export const dynamic = 'force-dynamic'

const chartConfig = {
  weight: {
    label: 'Weight',
    color: '#2563eb',
  },
} satisfies ChartConfig

const Sleep = ({ dailyLogs }: { dailyLogs: GetAllDailyLogs }) => {
  const data = dailyLogs
    .slice(0, 21)
    .map((dailyLog, i, arr) => ({
      date: dailyLog.date.toLocaleDateString(undefined, {
        month: 'numeric',
        day: 'numeric',
      }),
      sleep: dailyLog.sleep === '' ? arr[i - 1]?.sleep : dailyLog.sleep,
      sleepQuality:
        dailyLog.sleepQuality === ''
          ? arr[i - 1]?.sleepQuality
          : dailyLog.sleepQuality,
      bowelMovements:
        dailyLog.bowelMovements === ''
          ? arr[i - 1]?.bowelMovements
          : dailyLog.bowelMovements,
    }))
    .reverse()

  const dataMin = 0 //Math.floor(Math.min(...data.map((d) => Number(d.sleep)))) - 1
  const dataMax = Math.ceil(Math.max(...data.map((d) => Number(d.sleep)))) < 10 ? 10 : Math.ceil(Math.max(...data.map((d) => Number(d.sleep)))) + 1

  return (
    <ChartContainer
      config={chartConfig}
      className='w-full min-h-[200px]'
    >
      <ComposedChart data={data}>
        <defs>
          <linearGradient
            id='colorUv'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#8884d8'
              stopOpacity={0.8}
            />
            <stop
              offset='95%'
              stopColor='#8884d8'
              stopOpacity={0}
            />
          </linearGradient>
          <linearGradient
            id='colorPv'
            x1='0'
            y1='0'
            x2='0'
            y2='1'
          >
            <stop
              offset='5%'
              stopColor='#82ca9d'
              stopOpacity={0.8}
            />
            <stop
              offset='95%'
              stopColor='#82ca9d'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={true} strokeDasharray='3 3' />
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
        <Area
          dataKey='sleep'
          fill='url(#colorPv)'
          fillOpacity={1}
          stroke='#82ca9d'
          dot={false}
          strokeWidth={2}
          type='monotone'
          isAnimationActive={true}
        />
        <Line
          dataKey='sleepQuality'
          label='Sleep Quality'
          stroke='#D2042D6A'
          dot={false}
          strokeWidth={2}
          type='monotone'
          isAnimationActive={true}
        />
        <Bar
          dataKey='bowelMovements'
          label='Bowel Movements'
          fill='#8B451390'
          isAnimationActive={true}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Legend />
      </ComposedChart>
    </ChartContainer>
  )
}

export { Sleep }
