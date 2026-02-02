'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { format } from 'date-fns'
import { CalendarIcon, ChevronDown, ListCollapse, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar-log'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

const WaterBottomSheet = ({
	dailyLogs,
	deleteWaterLog,
	addWaterLog,
	size,
	setSize,
	today,
	setToday,
}: {
	dailyLogs: GetAllDailyLogs | null | undefined
	deleteWaterLog: ({ id }: { id: number }) => void
	addWaterLog: ({ date, amount }: { date: string; amount: number }) => void
	size: number
	setSize: React.Dispatch<React.SetStateAction<number>>
	today: Date
	setToday: React.Dispatch<React.SetStateAction<Date>>
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const todaysDailyLog = dailyLogs?.find((dailyLog) => {
		return dailyLog.date === today.toDateString()
	})

	const totalWater =
		todaysDailyLog?.waterLogs.reduce((acc, curr) => {
			return acc + Number(curr.amount)
		}, 0) ?? 0

	return (
		<Sheet.Root license='non-commercial'>
			<Sheet.Trigger className='flex gap-2 justify-center items-center mt-1'>
				<ListCollapse size={20} className='text-muted-foreground' />
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View className='z-[999] h-[100vh] bg-black/50'>
					<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[90vh] bg-background'>
						<div className='flex flex-col justify-between h-full'>
							<div className='flex flex-col gap-2'>
								<div className='flex justify-center pt-1'>
									<Sheet.Handle
										className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
										action='dismiss'
									/>
								</div>
								<Popover open={isOpen} onOpenChange={setIsOpen}>
									<PopoverTrigger asChild>
										<div className='flex justify-center items-center'>
											<Button
												variant={'outline'}
												onClick={(e) => {
													e.stopPropagation()
													e.preventDefault()
													setIsOpen(true)
												}}
												className={cn(
													'w-[220px] font-semibold text-base mt-[2px] flex items-center justify-center shadow-sm',
													!today && 'text-muted-foreground',
												)}
											>
												<CalendarIcon className='mr-4 w-4 h-4 mt-[0px] shrink-0' />
												{today ? (
													<span className='mt-[5px]'>
														{format(today, 'PPP')}
													</span>
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</div>
									</PopoverTrigger>
									<PopoverContent
										onClick={(e) => e.stopPropagation()}
										onFocusOutside={(e) => e.preventDefault()}
										forceMount
										className='p-0 w-auto z-[2000]'
									>
										<Calendar
											mode='single'
											disabled={{ after: new Date() }}
											selected={today}
											onSelect={(date) => {
												if (!date) return
												setToday(date)
												setIsOpen(false)
											}}
											components={{
												// @ts-ignore
												DayContent: (props) => {
													const log = dailyLogs?.find(
														(log) => log.date === props.date.toDateString(),
													)
													let totalWater =
														log?.waterLogs.reduce((acc, curr) => {
															return acc + Number(curr.amount)
														}, 0) ?? 0
													if (props.date > new Date())
														return <div>{props.date.getDate()}</div>
													return (
														<div className='flex flex-col gap-[2px]'>
															<div className='font-semibold'>
																{props.date.getDate()}
															</div>
															<div className='font-medium text-[0.7rem] text-muted-foreground'>
																{totalWater === 0
																	? '.'
																	: (totalWater / 1000).toFixed(1)}
															</div>
														</div>
													)
												},
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<div className='flex relative gap-4 pt-4 pb-4 font-medium border-b-[1px] border-primary'>
									<div className='transition-transform'>
										<Sheet.Title className='ml-4 text-lg'>
											Water Log
										</Sheet.Title>
									</div>
									<Sheet.Description className='hidden'>
										Water Log
									</Sheet.Description>
									<div className='w-px h-6 border' />
									<div className='flex items-baseline'>
										<NumberFlow
											value={totalWater}
											className='ml-2 text-lg text-primary'
										/>
										<span className='text-xs text-primary/50 ml-[1px]'>ml</span>
									</div>
								</div>
								<div className='flex gap-2 justify-around items-center mx-4'>
									<div className='relative'>
										<Input
											value={size.toString()}
											onChange={(e) => {
												setSize(Number(e.target.value))
											}}
											type='number'
											className='px-4 w-28'
										/>
										<span className='absolute right-2 top-1/2 text-xs -translate-y-1/2 text-primary/50 mt-[1px]'>
											ml
										</span>
									</div>
									<Button
										size='sm'
										onClick={() => {
											addWaterLog({
												date: today.toDateString(),
												amount: size,
											})
										}}
									>
										Add Water
									</Button>
								</div>

								<ScrollArea className='p-4 h-[calc(80vh-210px)]'>
									<div className='flex flex-col gap-2'>
										{todaysDailyLog?.waterLogs.length === 0 ||
										!todaysDailyLog ? (
											<div className='text-center'>...</div>
										) : (
											todaysDailyLog?.waterLogs.map((waterLog, i) => (
												<div
													key={waterLog.id}
													className='grid grid-cols-6 gap-2 items-center py-2 px-4 w-full text-sm rounded-full bg-secondary'
												>
													<div className='col-span-1 font-normal text-primary'>
														<div className='flex justify-center items-center w-6 h-6 rounded-full bg-primary/20 pt-[1px]'>
															{i + 1}
														</div>
													</div>
													<div className='col-span-2 font-normal text-muted-foreground'>
														{new Date(waterLog.createdAt).toLocaleTimeString(
															'en-AU',
														)}
													</div>
													<div className='col-span-2 font-medium text-muted-foreground'>
														{waterLog.amount}ml
													</div>
													<div className='justify-self-end'>
														<Trash2
															size={16}
															className='transition-transform cursor-pointer active:scale-90 text-destructive mb-[1px] hover:text-primary'
															onClick={() => {
																deleteWaterLog({
																	id: waterLog.id,
																})
															}}
														/>
													</div>
												</div>
											))
										)}
									</div>
								</ScrollArea>
							</div>
							<Sheet.Trigger
								className='flex justify-center w-full'
								action='dismiss'
							>
								<ChevronDown
									size={32}
									strokeWidth={2}
									className='text-muted-foreground'
								/>
							</Sheet.Trigger>
						</div>
					</Sheet.Content>
				</Sheet.View>
			</Sheet.Portal>
		</Sheet.Root>
	)
}

export { WaterBottomSheet }
