'use client'

import { cn, getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetAllDailyLogs, GetUserById } from '@/types'
import { useAtom, useAtomValue } from 'jotai'
import { CircleMinus, CirclePlus } from 'lucide-react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { useIsMobile } from '@/hooks/use-mobile'

import { v4 as uuidv4 } from 'uuid'

import { api } from '@/trpc/react'

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
	{ value: 'leanMass', label: 'Lean Mass' },
	{ value: 'bodyFat', label: 'Body Fat' },
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
				morningWeight: number | null | undefined
				calories: number | null | undefined
				carbs: number | null | undefined
				protein: number | null | undefined
				fat: number | null | undefined
				bloodGlucose: number | null | undefined
				sleep: number | null | undefined
				sleepQuality: number | null | undefined
				hiit: number | null | undefined
				cardio: number | null | undefined
				weight: number | null | undefined
				liss: number | null | undefined
				posing: number | null | undefined
				steps: number | null | undefined
				sauna: number | null | undefined
				coldPlunge: number | null | undefined
				nap: number | null | undefined
				water: number | null | undefined
				toilet: number | null | undefined
				bodyFat: number | null | undefined
				leanMass: number | null | undefined
				isPeriod: boolean | null | undefined
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

	const isMobile = useIsMobile()

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

	const renderDot = (props: any) => {
		const { cx, cy, stroke: _stroke, payload } = props

		const isPeriod = payload?.isPeriod ?? false

		let stroke = _stroke?.slice(0, 7)
		let adjust = 1
		if (isPeriod) {
			stroke = stroke + '52'
			adjust = 0.8
		}

		const size = isMobile ? 4 * adjust : 6 * adjust
		const doubleSize = size * 2

		if (cx === null || cy === null) return <g key={cx || cy} />

		return (
			<svg
				key={cx}
				width={doubleSize}
				height={doubleSize}
				viewBox={`0 0 ${doubleSize} ${doubleSize}`}
				xmlns='http://www.w3.org/2000/svg'
				x={cx - size}
				y={cy - size}
			>
				<circle
					cx={size}
					cy={size}
					r={size - 1}
					stroke={stroke}
					strokeWidth='1'
					fill={stroke}
				/>
			</svg>
		)
	}

	return (
		<ChartContainer
			config={chartConfig}
			className='w-full min-h-[110px] max-h-[340px]'
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
					dot={renderDot}
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
	className,
}: {
	dailyLogs: GetAllDailyLogs | undefined
	isMoblie?: boolean
	currentUser: GetUserById
	className?: string
}) => {
	const [range, setRange] = useAtom(chartRangeAtom)
	const [selectValueLeft, setSelectValueLeft] = useAtom(
		chartSelectValueLeftAtom,
	)
	const [selectValueRight, setSelectValueRight] = useAtom(
		chartSelectValueRightAtom,
	)

	const { data: userSkinfolds } = api.metrics.getUserSkinfolds.useQuery(
		currentUser.id,
	)

	const [leftChartZoom, setLeftChartZoom] = useAtom(leftChartZoomAtom)
	const [rightChartZoom, setRightChartZoom] = useAtom(rightChartZoomAtom)

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
				isPeriod: log.isPeriod,
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
			isPeriod: log.isPeriod,
			bodyFat: null,
			leanMass: null,
			date: new Date(log.date).toLocaleDateString('en-AU', {
				month: 'numeric',
				day: 'numeric',
			}),
		}))
		.slice(-(range > 30 ? 30 : range))

	const skinfolds = userSkinfolds
		?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		?.map((skinfold) => {
			return {
				date: new Date(skinfold.date).toLocaleDateString('en-AU', {
					month: 'numeric',
					day: 'numeric',
				}),
				morningWeight: null,
				bloodGlucose: null,
				sleep: null,
				sleepQuality: null,
				hiit: null,
				cardio: null,
				weight: null,
				liss: null,
				posing: null,
				steps: null,
				sauna: null,
				coldPlunge: null,
				nap: null,
				water: null,
				toilet: null,
				carbs: null,
				protein: null,
				fat: null,
				calories: null,
				isPeriod: false,
				bodyFat: Number(skinfold.bodyFat?.[0]?.bodyFat),
				leanMass: Number(skinfold.leanMass?.[0]?.leanMass),
			}
		})
		.slice(-(range > 30 ? 30 : range))

	return (
		<div
			className={cn(
				'flex flex-col gap-1 p-2',
				isMoblie ? 'bg-card shadow-md' : 'rounded-lg border',
				className,
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
						className={cn(
							'rounded-lg',
							isMoblie ? 'h-8 w-40 ' : 'h-8 w-36 xl:w-48 ',
						)}
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
						className={cn(
							'rounded-lg',
							isMoblie ? 'h-8 w-40 ' : 'h-8 w-36 xl:w-48 ',
						)}
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
			{selectValueLeft === 'bodyFat' || selectValueLeft === 'leanMass' ? (
				<Chart data={skinfolds} />
			) : (
				<Chart data={data} />
			)}
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
					value={range > 30 ? 30 : range}
					setValue={setRange}
					fixed={1}
					scale={1}
					postfix=''
					isSmall={true}
					height='h-6'
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
