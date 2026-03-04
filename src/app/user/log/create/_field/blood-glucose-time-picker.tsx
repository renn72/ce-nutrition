'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { EmblaCarouselType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { cn } from '@/lib/utils'

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 32
const WHEEL_ITEMS_IN_VIEW = 4

const HOURS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
const MINUTES = [
	'00',
	'05',
	'10',
	'15',
	'20',
	'25',
	'30',
	'35',
	'40',
	'45',
	'50',
	'55',
]
const PERIODS = ['AM', 'PM'] as const

type Period = (typeof PERIODS)[number]

type TimeValue = {
	hour: string
	minute: string
	period: Period
}

const DEFAULT_TIME: TimeValue = {
	hour: '8',
	minute: '00',
	period: 'AM',
}

const to24HourTime = (time: TimeValue) => {
	const hourNumber = Number(time.hour)
	const minuteNumber = Number(time.minute)
	const isAM = time.period === 'AM'
	const hour24 = isAM
		? hourNumber === 12
			? 0
			: hourNumber
		: hourNumber === 12
			? 12
			: hourNumber + 12

	return `${hour24.toString().padStart(2, '0')}:${minuteNumber
		.toString()
		.padStart(2, '0')}`
}

const parseTime = (value?: string | null): TimeValue => {
	if (!value || value.trim() === '') return DEFAULT_TIME

	const normalizedValue = value.trim()
	let hour24: number | null = null
	let minute: number | null = null

	const match24 = normalizedValue.match(/^(\d{1,2}):(\d{2})$/)
	if (match24) {
		hour24 = Number(match24[1])
		minute = Number(match24[2])
	}

	const match12 = normalizedValue.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)
	if (!match24 && match12) {
		const hour12 = Number(match12[1])
		const parsedMinute = Number(match12[2])
		const period = match12[3]?.toUpperCase() as Period

		if (
			hour12 >= 1 &&
			hour12 <= 12 &&
			parsedMinute >= 0 &&
			parsedMinute <= 59
		) {
			hour24 =
				period === 'AM'
					? hour12 === 12
						? 0
						: hour12
					: hour12 === 12
						? 12
						: hour12 + 12
			minute = parsedMinute
		}
	}

	if (
		hour24 === null ||
		minute === null ||
		hour24 < 0 ||
		hour24 > 23 ||
		minute < 0 ||
		minute > 59
	) {
		return DEFAULT_TIME
	}

	const roundedMinute = Math.floor(minute / 5) * 5
	const period: Period = hour24 >= 12 ? 'PM' : 'AM'
	const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12

	return {
		hour: hour12.toString(),
		minute: roundedMinute.toString().padStart(2, '0'),
		period,
	}
}

const isInView = ({
	wheelLocation,
	slidePosition,
	inViewDegrees,
}: {
	wheelLocation: number
	slidePosition: number
	inViewDegrees: number
}) => Math.abs(wheelLocation - slidePosition) < inViewDegrees

const setSlideStyles = ({
	emblaApi,
	index,
	loop,
	slideCount,
	totalRadius,
	itemRadius,
	inViewDegrees,
	wheelRadius,
}: {
	emblaApi: EmblaCarouselType
	index: number
	loop: boolean
	slideCount: number
	totalRadius: number
	itemRadius: number
	inViewDegrees: number
	wheelRadius: number
}) => {
	const slideNode = emblaApi.slideNodes()[index]
	if (!slideNode) return

	const wheelLocation = emblaApi.scrollProgress() * totalRadius
	const snapList = emblaApi.scrollSnapList()
	const snap = snapList[index]
	if (snap === undefined) return

	const positionDefault = snap * totalRadius
	const positionLoopStart = positionDefault + totalRadius
	const positionLoopEnd = positionDefault - totalRadius

	let inView = false
	let angle = index * -itemRadius

	if (
		isInView({
			wheelLocation,
			slidePosition: positionDefault,
			inViewDegrees,
		})
	)
		inView = true

	if (
		loop &&
		isInView({
			wheelLocation,
			slidePosition: positionLoopEnd,
			inViewDegrees,
		})
	) {
		inView = true
		angle = -CIRCLE_DEGREES + (slideCount - index) * itemRadius
	}

	if (
		loop &&
		isInView({
			wheelLocation,
			slidePosition: positionLoopStart,
			inViewDegrees,
		})
	) {
		inView = true
		angle = -(totalRadius % CIRCLE_DEGREES) - index * itemRadius
	}

	if (!inView) {
		slideNode.style.opacity = '0'
		slideNode.style.transform = 'none'
		return
	}

	slideNode.style.opacity = '1'
	slideNode.style.transform = `translateY(-${
		index * 100
	}%) rotateX(${angle}deg) translateZ(${wheelRadius}px)`
}

const setContainerStyles = ({
	emblaApi,
	wheelRotation,
	wheelRadius,
}: {
	emblaApi: EmblaCarouselType
	wheelRotation: number
	wheelRadius: number
}) => {
	emblaApi.containerNode().style.transform = `translateZ(${wheelRadius}px) rotateX(${wheelRotation}deg)`
}

const IosWheelColumn = ({
	items,
	value,
	onValueChange,
	perspective,
}: {
	items: readonly string[]
	value: string
	onValueChange: (value: string) => void
	perspective: 'left' | 'right' | 'center'
}) => {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		axis: 'y',
		dragFree: true,
		containScroll: false,
	})

	const valueRef = useRef(value)
	const itemRadius = CIRCLE_DEGREES / items.length
	const inViewDegrees = itemRadius * WHEEL_ITEMS_IN_VIEW
	const wheelRadius = Math.round(
		WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / items.length),
	)
	const totalRadius = items.length * itemRadius
	const rotationOffset = 0

	useEffect(() => {
		valueRef.current = value
	}, [value])

	const inactivateEmblaTransform = useCallback((api: EmblaCarouselType) => {
		const engine = api.internalEngine()

		engine.translate.clear()
		engine.translate.toggleActive(false)

		engine.slideLooper.loopPoints.forEach((loopPoint) => {
			loopPoint.translate.clear()
			loopPoint.translate.toggleActive(false)
		})
	}, [])

	const rotateWheel = useCallback(
		(api: EmblaCarouselType) => {
			const rotation = items.length * itemRadius - rotationOffset
			const wheelRotation = rotation * api.scrollProgress()

			setContainerStyles({ emblaApi: api, wheelRotation, wheelRadius })

			const selected = api.selectedScrollSnap()
			api.slideNodes().forEach((slideNode, index) => {
				setSlideStyles({
					emblaApi: api,
					index,
					loop: true,
					slideCount: items.length,
					totalRadius,
					itemRadius,
					inViewDegrees,
					wheelRadius,
				})
				slideNode.dataset.selected = selected === index ? 'true' : 'false'
			})
		},
		[
			items.length,
			itemRadius,
			inViewDegrees,
			rotationOffset,
			totalRadius,
			wheelRadius,
		],
	)

	const syncValueFromSelection = useCallback(
		(api: EmblaCarouselType) => {
			const selectedIndex = api.selectedScrollSnap()
			const nextValue = items[selectedIndex]
			if (!nextValue || nextValue === valueRef.current) return
			onValueChange(nextValue)
		},
		[items, onValueChange],
	)

	useEffect(() => {
		if (!emblaApi) return

		const handlePointerUp = (api: EmblaCarouselType) => {
			const engine = api.internalEngine()
			const displacement = engine.target.get() - engine.location.get()
			const factor = Math.abs(displacement) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
			engine.scrollTo.distance(displacement * factor, true)
		}

		const handleScroll = (api: EmblaCarouselType) => {
			rotateWheel(api)
		}

		const handleSelect = (api: EmblaCarouselType) => {
			syncValueFromSelection(api)
			rotateWheel(api)
		}

		const handleReInit = (api: EmblaCarouselType) => {
			inactivateEmblaTransform(api)
			rotateWheel(api)
		}

		emblaApi.on('pointerUp', handlePointerUp)
		emblaApi.on('scroll', handleScroll)
		emblaApi.on('select', handleSelect)
		emblaApi.on('reInit', handleReInit)

		inactivateEmblaTransform(emblaApi)
		rotateWheel(emblaApi)

		return () => {
			emblaApi.off('pointerUp', handlePointerUp)
			emblaApi.off('scroll', handleScroll)
			emblaApi.off('select', handleSelect)
			emblaApi.off('reInit', handleReInit)
		}
	}, [emblaApi, inactivateEmblaTransform, rotateWheel, syncValueFromSelection])

	useEffect(() => {
		if (!emblaApi) return

		const targetIndex = items.findIndex((item) => item === value)
		if (targetIndex < 0) return

		if (emblaApi.selectedScrollSnap() !== targetIndex) {
			emblaApi.scrollTo(targetIndex, true)
		}

		rotateWheel(emblaApi)
	}, [emblaApi, items, rotateWheel, value])

	const perspectiveClass =
		perspective === 'left'
			? '[perspective-origin:calc(50%+130px)_50%] translate-x-[27px]'
			: perspective === 'right'
				? '[perspective-origin:calc(50%-130px)_50%] -translate-x-[27px]'
				: '[perspective-origin:50%_50%]'

	return (
		<div className='flex flex-1 justify-center items-center min-w-0 h-full leading-none'>
			<div className='flex overflow-hidden items-center min-w-full h-full touch-pan-x'>
				<div
					ref={emblaRef}
					className={cn(
						'h-8 w-full select-none [perspective:1000px] [touch-action:pan-y]',
						perspectiveClass,
					)}
				>
					<div className='w-full h-full [transform-style:preserve-3d] will-change-transform'>
						{items.map((item, index) => (
							<div
								className='flex justify-center items-center h-full w-full text-[19px] font-medium text-muted-foreground opacity-0 [backface-visibility:hidden] transition-colors data-[selected=true]:font-bold data-[selected=true]:text-foreground'
								key={`${item}-${index}`}
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

const BloodGlucoseTimePicker = ({
	value,
	onChange,
}: {
	value?: string | null
	onChange: (value: string) => void
}) => {
	const parsedTime = useMemo(() => parseTime(value), [value])

	const [hour, setHour] = useState(parsedTime.hour)
	const [minute, setMinute] = useState(parsedTime.minute)
	const [period, setPeriod] = useState<Period>(parsedTime.period)

	useEffect(() => {
		setHour(parsedTime.hour)
		setMinute(parsedTime.minute)
		setPeriod(parsedTime.period)
	}, [parsedTime.hour, parsedTime.minute, parsedTime.period])

	const handleHourChange = useCallback(
		(nextHour: string) => {
			setHour(nextHour)
			onChange(
				to24HourTime({
					hour: nextHour,
					minute,
					period,
				}),
			)
		},
		[minute, onChange, period],
	)

	const handleMinuteChange = useCallback(
		(nextMinute: string) => {
			setMinute(nextMinute)
			onChange(
				to24HourTime({
					hour,
					minute: nextMinute,
					period,
				}),
			)
		},
		[hour, onChange, period],
	)

	const handlePeriodChange = useCallback(
		(nextPeriod: string) => {
			const parsedPeriod = nextPeriod as Period
			setPeriod(parsedPeriod)
			onChange(
				to24HourTime({
					hour,
					minute,
					period: parsedPeriod,
				}),
			)
		},
		[hour, minute, onChange],
	)

	return (
		<div className='p-3 rounded-lg border w-[220px] bg-muted/20'>
			<div className='flex relative w-full h-36'>
				<div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-[calc(50%-16px)] border-b border-border/50 bg-gradient-to-t from-background/65 to-background' />
				<div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[calc(50%-16px)] border-t border-border/50 bg-gradient-to-b from-background/65 to-background' />
				<IosWheelColumn
					items={HOURS}
					value={hour}
					onValueChange={handleHourChange}
					perspective='left'
				/>
				<IosWheelColumn
					items={MINUTES}
					value={minute}
					onValueChange={handleMinuteChange}
					perspective='right'
				/>
			</div>
			<div className='grid grid-cols-2 gap-1 p-1 mt-2 rounded-md border bg-background/50'>
				{PERIODS.map((item) => (
					<button
						type='button'
						key={item}
						onClick={() => handlePeriodChange(item)}
						className={cn(
							'py-1.5 rounded-sm text-xs font-semibold transition-colors',
							item === period
								? 'bg-primary text-primary-foreground'
								: 'text-muted-foreground hover:bg-muted',
						)}
					>
						{item}
					</button>
				))}
			</div>
		</div>
	)
}

export { BloodGlucoseTimePicker }
