'use client'

import { useState } from 'react'

import { GetAllDailyLogs } from '@/types'
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
import { NumberInput } from '@/components/ui/number-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const dynamic = 'force-dynamic'

const chartConfig = {
  value: {
    label: 'value',
    color: '#2563eb',
  },
} satisfies ChartConfig

const Chart = ({
  data,
}: {
  data: {
    value: number
    date: string
  }[]
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
const UserCharts = ({ dailyLogs }: { dailyLogs: GetAllDailyLogs }) => {
  const [range, setRange] = useState(7)
  const [selectValue, setSelectValue] = useState('bodyWeight')

  console.log('dailyLogs', dailyLogs)


  const data = dailyLogs
    .map((log) => {
      let value = null
      if (selectValue === 'bodyWeight') value = log.morningWeight
      if (selectValue === 'bloodGlucose') value = log.fastedBloodGlucose
      return {
        value: value,
        date: log.date,

      }
    })
    .filter((log) => log.value !== '')
    .filter((log) => log.value)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((log) => ({
      value: Number(log.value),
      date: new Date(log.date).toLocaleDateString('en-AU', {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
      }),
    }))
    .slice(-range)

  return (
    <div className='flex flex-col gap-2 w-[600px] p-2 rounded-lg border'>
      <Chart data={data} />
      <div className='flex gap-2 justify-center w-full'>
        <NumberInput
          value={range}
          setValue={setRange}
          fixed={1}
          scale={1}
          postfix=''
          isSmall={true}
        />
        <Select
          value={selectValue}
          onValueChange={(value) => {
            setSelectValue(value)
          }}
        >
          <SelectTrigger className='w-48 h-10 rounded-lg'>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='bodyWeight'>Weight</SelectItem>
            <SelectItem value='bloodGlucose'>Blood Glucose</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export { UserCharts }
