'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'

import type { GetAllDailyLogs } from '@/types'
import { useAtom, useAtomValue } from 'jotai'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

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

import {
	chartRangeAtom,
	chartSelectValueLeftAtom,
	chartSelectValueRightAtom,
} from './atoms'

export const dynamic = 'force-dynamic'

const chartConfig = {
	value: {
		label: 'value',
		color: '#2563eb',
	},
} satisfies ChartConfig

const selectChoices = [
	{ value: 'morningWeight', label: 'Body Weight' },
	{ value: 'bloodGlucose', label: 'Blood Glucose' },
]

const Chart = ({
	data,
}: {
	data: {
		date: string
		bodyWeight: number | null
		bloodGlucose: number | null
	}[]
}) => {
	const leftValue = useAtomValue(chartSelectValueLeftAtom)
	const rightValue = useAtomValue(chartSelectValueRightAtom)
	const dataMinLeft =
		Math.floor(
			Math.min(
				...data
					// @ts-ignore
					.filter((d) => d[leftValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[leftValue])),
			),
		) - 1
	const dataMaxLeft =
		Math.ceil(
			Math.max(
				...data
					// @ts-ignore
					.filter((d) => d[leftValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[leftValue])),
			),
		) + 1

	const dataMinRight =
		Math.floor(
			Math.min(
				...data
					// @ts-ignore
					.filter((d) => d[rightValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[rightValue])),
			),
		) - 1
	const dataMaxRight =
		Math.ceil(
			Math.max(
				...data
					// @ts-ignore
					.filter((d) => d[rightValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[rightValue])),
			),
		) + 1

	return (
		<ChartContainer
			config={chartConfig}
			className='w-full min-h-[200px] max-h-[300px]'
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
					yAxisId='left'
					orientation='left'
					width={20}
					allowDecimals={false}
					padding={{ top: 5, bottom: 0 }}
					interval='preserveStartEnd'
					dataKey={leftValue}
					tickLine={false}
					tickCount={5}
					tickMargin={1}
					tick={{
						stroke: '#8884d8',
						strokeWidth: 1,
						fontWeight: 200,
					}}
					axisLine={true}
					type='number'
					allowDataOverflow={true}
					domain={[dataMinLeft, dataMaxLeft]}
				/>
				{rightValue !== '' && rightValue !== 'none' ? (
					<YAxis
						yAxisId='right'
						orientation='right'
						width={20}
						allowDecimals={false}
						padding={{ top: 5, bottom: 0 }}
						interval='preserveStartEnd'
						dataKey={rightValue}
						tickLine={false}
						tickCount={5}
						tickMargin={1}
						tick={{
							stroke: '#82ca9d',
							strokeWidth: 1,
							fontWeight: 200,
						}}
						axisLine={true}
						type='number'
						allowDataOverflow={true}
						domain={[dataMinRight, dataMaxRight]}
					/>
				) : null}
				<Line
					yAxisId='left'
					dataKey={leftValue}
					dot={true}
					strokeWidth={2}
					stroke='#8884d895'
					type='monotone'
					isAnimationActive={true}
					connectNulls
				/>
				{rightValue !== '' &&
				rightValue !== 'none' &&
				leftValue !== rightValue ? (
					<Line
						yAxisId='right'
						dataKey={rightValue}
						dot={true}
						strokeWidth={2}
						type='monotone'
						stroke='#82ca9d99'
						isAnimationActive={true}
						connectNulls
					/>
				) : null}
				<ChartTooltip content={<ChartTooltipContent />} />
			</LineChart>
		</ChartContainer>
	)
}

const UserCharts = ({
	dailyLogs,
	isMoblie = false,
}: {
	dailyLogs: GetAllDailyLogs | undefined
	isMoblie?: boolean
}) => {
	const [range, setRange] = useAtom(chartRangeAtom)
	const [selectValueLeft, setSelectValueLeft] = useAtom(
		chartSelectValueLeftAtom,
	)
	const [selectValueRight, setSelectValueRight] = useAtom(
		chartSelectValueRightAtom,
	)

	console.log('dailyLogs', dailyLogs)

	const data = dailyLogs
		?.map((log) => {
			return {
				morningWeight: log.morningWeight,
				bloodGlucose: log.fastedBloodGlucose,
				date: log.date,
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.map((log) => ({
			morningWeight:
				log.morningWeight === null ? null : Number(log.morningWeight),
			bloodGlucose: log.bloodGlucose === null ? null : Number(log.bloodGlucose),
			date: new Date(log.date).toLocaleDateString('en-AU', {
				year: '2-digit',
				month: 'numeric',
				day: 'numeric',
			}),
		}))
		.slice(-range)

	console.log('data', data)

	return (
		<div
			className={cn(
				'flex flex-col gap-2 p-2',
				isMoblie ? '' : 'rounded-lg border',
			)}
		>
			<div className={cn('flex justify-between w-full', isMoblie ? 'gap-2' : '')}>
				<Select
					value={selectValueLeft}
					onValueChange={(value) => {
						setSelectValueLeft(value)
					}}
				>
					<SelectTrigger
            className={cn('rounded-lg', isMoblie ? 'h-8 w-40 ' : 'h-10 w-48 ')}>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent>
						{selectChoices.map((choice) => (
							<SelectItem value={choice.value} key={choice.value}>
								{choice.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Select
					value={selectValueRight}
					onValueChange={(value) => {
						setSelectValueRight(value)
					}}
				>
					<SelectTrigger
            className={cn('rounded-lg', isMoblie ? 'h-8 w-40 ' : 'h-10 w-48 ')}>
						<SelectValue placeholder='Select' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value={'none'}>None</SelectItem>
						{selectChoices.map((choice) => (
							<SelectItem value={choice.value} key={choice.value}>
								{choice.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
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
			</div>
		</div>
	)
}

export { UserCharts }
