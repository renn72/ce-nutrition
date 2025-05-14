'use client'

import { useState } from 'react'

import { cn, getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetAllDailyLogs, GetUserById } from '@/types'
import { useAtom, useAtomValue } from 'jotai'
import { CircleMinus, CirclePlus } from 'lucide-react'
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
	leftChartZoomAtom,
	rightChartZoomAtom,
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
	{ value: 'calories', label: 'Calories' },
  { value: 'carbs', label: 'Carbohydrates' },
  { value: 'protein', label: 'Protein' },
  { value: 'fat', label: 'Fat' },
	{ value: 'water', label: 'Water' },
	{ value: 'toilet', label: 'Toilet' },
	{ value: 'bloodGlucose', label: 'Blood Glucose' },
	{ value: 'sleep', label: 'Sleep' },
	{ value: 'sleepQuality', label: 'Sleep Quality' },
	{ value: 'hiit', label: 'HIIT' },
	{ value: 'cardio', label: 'Cardio' },
	{ value: 'weight', label: 'Weight' },
	{ value: 'liss', label: 'LISS' },
	{ value: 'posing', label: 'Posing' },
	{ value: 'steps', label: 'Steps' },
	{ value: 'sauna', label: 'Sauna' },
	{ value: 'coldPlunge', label: 'Cold Plunge' },
	{ value: 'nap', label: 'Nap' },
]

const Chart = ({
	data,
}: {
	data:
		| {
				date: string
				morningWeight: number | null
				calories: number | null
        carbs: number | null
        protein: number | null
        fat: number | null
				bloodGlucose: number | null
				sleep: number | null
				sleepQuality: number | null
				hiit: number | null
				cardio: number | null
				weight: number | null
				liss: number | null
				posing: number | null
				steps: number | null
				sauna: number | null
				coldPlunge: number | null
				nap: number | null
				water: number | null
				toilet: number | null
		  }[]
		| undefined
}) => {
	const leftValue = useAtomValue(chartSelectValueLeftAtom)
	const rightValue = useAtomValue(chartSelectValueRightAtom)

	const leftChartZoom = useAtomValue(leftChartZoomAtom)
	const rightChartZoom = useAtomValue(rightChartZoomAtom)

	let leftChartZoomConst = leftValue === 'water' ? 100 : 1
	let rightChartZoomConst = rightValue === 'water' ? 100 : 1

  leftChartZoomConst = leftValue === 'carbs' ? 10 : leftChartZoomConst
  leftChartZoomConst = leftValue === 'protein' ? 5 : leftChartZoomConst
  leftChartZoomConst = leftValue === 'fat' ? 1 : leftChartZoomConst
  leftChartZoomConst = leftValue === 'calories' ? 100 : leftChartZoomConst

  rightChartZoomConst = rightValue === 'carbs' ? 10 : rightChartZoomConst
  rightChartZoomConst = rightValue === 'protein' ? 5 : rightChartZoomConst
  rightChartZoomConst = rightValue === 'fat' ? 1 : rightChartZoomConst
  rightChartZoomConst = rightValue === 'calories' ? 100 : rightChartZoomConst


	if (!data) return null

	let dataMinLeft =
		Math.floor(
			Math.min(
				...data
					// @ts-ignore
					.filter((d) => d[leftValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[leftValue])),
			),
		) -
		leftChartZoom * leftChartZoomConst
	let dataMaxLeft =
		Math.ceil(
			Math.max(
				...data
					// @ts-ignore
					.filter((d) => d[leftValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[leftValue])),
			),
		) +
		leftChartZoom * leftChartZoomConst

	let dataMinRight =
		Math.floor(
			Math.min(
				...data
					// @ts-ignore
					.filter((d) => d[rightValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[rightValue])),
			),
		) -
		rightChartZoom * rightChartZoomConst
	let dataMaxRight =
		Math.ceil(
			Math.max(
				...data
					// @ts-ignore
					.filter((d) => d[rightValue] !== null)
					// @ts-ignore
					.map((d) => Number(d?.[rightValue])),
			),
		) +
		rightChartZoom * rightChartZoomConst

	dataMinLeft = dataMinLeft < 0 ? 0 : dataMinLeft
	dataMinRight = dataMinRight < 0 ? 0 : dataMinRight

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
					width={30}
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
						direction: 'horizontal',
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
						width={30}
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
	currentUser,
	dailyLogs,
	isMoblie = false,
}: {
	dailyLogs: GetAllDailyLogs | undefined
	isMoblie?: boolean
	currentUser: GetUserById
}) => {
	const [range, setRange] = useAtom(chartRangeAtom)
	const [selectValueLeft, setSelectValueLeft] = useAtom(
		chartSelectValueLeftAtom,
	)
	const [selectValueRight, setSelectValueRight] = useAtom(
		chartSelectValueRightAtom,
	)

	const [leftChartZoom, setLeftChartZoom] = useAtom(leftChartZoomAtom)
	const [rightChartZoom, setRightChartZoom] = useAtom(rightChartZoomAtom)

	console.log(
		'dailyLogs',
		dailyLogs?.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		),
	)

	const data = dailyLogs
		?.map((log) => {
			return {
				morningWeight: log.morningWeight,
				bloodGlucose: log.fastedBloodGlucose,
				sleep: log.sleep,
				sleepQuality: log.sleepQuality,
				hiit: log.isHiit,
				cardio: log.isCardio,
				weight: log.isLift,
				liss: log.isLiss,
				posing: log.isStarred,
				steps: log.steps,
				sauna: log.sauna,
				coldPlunge: log.coldPlunge,
				nap: log.nap,
				date: log.date,
				toilet: log.poopLogs.length,
				water: log.waterLogs.reduce((acc, log) => acc + Number(log.amount), 0),
				calories: log.dailyMeals.reduce((acc, meal) => {
					const { cals } = getRecipeDetailsFromDailyLog(
						log,
						meal.mealIndex ?? 0,
					)
					return acc + Number(cals)
				}, 0),
				fat: log.dailyMeals.reduce((acc, meal) => {
					const { fat } = getRecipeDetailsFromDailyLog(log, meal.mealIndex ?? 0)
					return acc + Number(fat)
				}, 0),
				carbs: log.dailyMeals.reduce((acc, meal) => {
					const { carbs } = getRecipeDetailsFromDailyLog(
						log,
						meal.mealIndex ?? 0,
					)
					return acc + Number(carbs)
				}, 0),
				protein: log.dailyMeals.reduce((acc, meal) => {
					const { protein } = getRecipeDetailsFromDailyLog(
						log,
						meal.mealIndex ?? 0,
					)
					return acc + Number(protein)
				}, 0),
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		.map((log) => ({
			morningWeight:
				log.morningWeight === null ? null : Number(log.morningWeight),
			bloodGlucose: log.bloodGlucose === null ? null : Number(log.bloodGlucose),
			sleep: log.sleep === null ? null : Number(log.sleep),
			sleepQuality: log.sleepQuality === null ? null : Number(log.sleepQuality),
			hiit: log.hiit === null ? null : Number(log.hiit),
			cardio: log.cardio === null ? null : Number(log.cardio),
			weight: log.weight === null ? null : Number(log.weight),
			liss: log.liss === null ? null : Number(log.liss),
			posing: log.posing === null ? null : Number(log.posing),
			steps: log.steps === null ? null : Number(log.steps),
			sauna: log.sauna === null ? null : Number(log.sauna),
			coldPlunge: log.coldPlunge === null ? null : Number(log.coldPlunge),
			nap: log.nap === null ? null : Number(log.nap),
			toilet: log.toilet === 0 ? null : Number(log.toilet),
			water: log.water === 0 ? null : Number(log.water),
      carbs: log.carbs === 0 ? null : Number(log.carbs),
      protein: log.protein === 0 ? null : Number(log.protein),
      fat: log.fat === 0 ? null : Number(log.fat),
      calories: log.calories === 0 ? null : Number(log.calories),
			date: new Date(log.date).toLocaleDateString('en-AU', {
				year: '2-digit',
				month: 'numeric',
				day: 'numeric',
			}),
		}))
		.slice(-range)

	const filteredSelectChoices = selectChoices.filter((choice) => {
		if (
			currentUser?.settings?.isBloodGlucose &&
			choice.value === 'bloodGlucose' &&
			isMoblie
		)
			return true
		if (currentUser?.settings?.isSleep && choice.value === 'sleep' && isMoblie)
			return true
		if (
			currentUser?.settings?.isSleepQuality &&
			choice.value === 'sleepQuality' &&
			isMoblie
		)
			return true
		if (currentUser?.settings?.isNap && choice.value === 'nap' && isMoblie)
			return true
		if (currentUser?.settings?.isSteps && choice.value === 'steps' && isMoblie)
			return true
		if (
			currentUser?.settings?.isWeightTraining &&
			choice.value === 'weightTraining' &&
			isMoblie
		)
			return true
		if (currentUser?.settings?.isHiit && choice.value === 'hiit' && isMoblie)
			return true
		if (currentUser?.settings?.isLiss && choice.value === 'liss' && isMoblie)
			return true
		if (
			currentUser?.settings?.isPosing &&
			choice.value === 'posing' &&
			isMoblie
		)
			return true
		if (currentUser?.settings?.isSauna && choice.value === 'sauna' && isMoblie)
			return true
		if (
			currentUser?.settings?.isColdPlunge &&
			choice.value === 'coldPlunge' &&
			isMoblie
		)
			return true
		return false
	})

	console.log('data', data)

	return (
		<div
			className={cn(
				'flex flex-col gap-2 p-2',
				isMoblie ? 'bg-card' : 'rounded-lg border',
			)}
		>
			<div
				className={cn('flex justify-between w-full', isMoblie ? 'gap-2' : '')}
			>
				<Select
					value={selectValueLeft}
					onValueChange={(value) => {
						setSelectValueLeft(value)
					}}
				>
					<SelectTrigger
						className={cn('rounded-lg', isMoblie ? 'h-8 w-40 ' : 'h-10 w-48 ')}
					>
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
						className={cn('rounded-lg', isMoblie ? 'h-8 w-40 ' : 'h-10 w-48 ')}
					>
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
			<div className='flex gap-2 justify-between w-full'>
				<div className='flex gap-2 items-center'>
					<CirclePlus
						size={20}
						strokeWidth={1}
						className='cursor-pointer text-secondary-foreground'
						onClick={() => {
							if (leftChartZoom === 0) return
							setLeftChartZoom(leftChartZoom - 1)
						}}
					/>
					<CircleMinus
						size={20}
						strokeWidth={1}
						className='cursor-pointer text-secondary-foreground'
						onClick={() => {
							setLeftChartZoom(leftChartZoom + 1)
						}}
					/>
				</div>
				<NumberInput
					value={range}
					setValue={setRange}
					fixed={1}
					scale={1}
					postfix=''
					isSmall={true}
				/>
				<div className='flex gap-2 items-center'>
					<CirclePlus
						size={20}
						strokeWidth={1}
						className='cursor-pointer text-secondary-foreground'
						onClick={() => {
							if (leftChartZoom === 0) return
							setRightChartZoom(rightChartZoom - 1)
						}}
					/>
					<CircleMinus
						size={20}
						strokeWidth={1}
						className='cursor-pointer text-secondary-foreground'
						onClick={() => {
							setRightChartZoom(rightChartZoom + 1)
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export { UserCharts }
