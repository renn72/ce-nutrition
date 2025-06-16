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
}: {
	dailyLogs: GetAllDailyLogs | null | undefined
	deleteWaterLog: ({ id }: { id: number }) => void
	addWaterLog: ({ date, amount }: { date: string; amount: number }) => void
	size: number
	setSize: React.Dispatch<React.SetStateAction<number>>
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [today, setToday] = useState<Date>(new Date())

	const todaysDailyLog = dailyLogs?.find((dailyLog) => {
		return dailyLog.date === today.toDateString()
	})

	const totalPoop =
		todaysDailyLog?.poopLogs.reduce((acc, _curr) => {
			return acc + 1
		}, 0) ?? 0

	const totalWater =
		todaysDailyLog?.waterLogs.reduce((acc, curr) => {
			return acc + Number(curr.amount)
		}, 0) ?? 0

	return (
		<Sheet.Root license='non-commercial'>
			<Sheet.Trigger className='flex gap-2 items-center justify-center mt-1'>
				<ListCollapse size={20} className='text-muted-foreground' />
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
					<Sheet.Content className='min-h-[200px] max-h-[80vh] h-full rounded-t-3xl bg-background relative'>
						<div className='flex flex-col justify-between h-full'>
							<div className='flex flex-col gap-2 '>
								<div className='flex justify-center pt-1'>
									<Sheet.Handle
										className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
										action='dismiss'
									/>
								</div>
								<Popover open={isOpen} onOpenChange={setIsOpen}>
									<PopoverTrigger asChild>
										<div className='flex items-center justify-center'>
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
												<CalendarIcon className='mr-4 h-4 w-4 mt-[0px] shrink-0' />
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
										className='w-auto p-0 z-[2000]'
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
															<div className='font-semibold'>{props.date.getDate()}</div>
															<div className='text-[0.7rem] text-muted-foreground font-medium'>
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
								<div className='flex gap-4 pt-4 border-b-[1px] border-primary pb-4 relative font-medium'>
									<div className='transition-transform '>
										<Sheet.Title className='text-lg ml-4 '>
											Water Log
										</Sheet.Title>
									</div>
									<Sheet.Description className='hidden'>
										Water Log
									</Sheet.Description>
									<div className='border w-px h-6' />
									<div className='flex items-baseline'>
										<NumberFlow
											value={totalWater}
											className='text-lg text-primary ml-2 '
										/>
										<span className='text-xs text-primary/50 ml-[1px]'>ml</span>
									</div>
								</div>
								<div className='flex items-center gap-2 justify-around mx-4'>
									<div className='relative'>
										<Input
											value={size.toString()}
											onChange={(e) => {
												setSize(Number(e.target.value))
											}}
											type='number'
											className='w-28 px-4'
										/>
										<span className='text-xs text-primary/50 mt-[1px] absolute right-2 top-1/2 -translate-y-1/2'>
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

								<ScrollArea className='p-4 h-[calc(80vh-110px)]'>
									<div className='flex flex-col gap-2 '>
										{todaysDailyLog?.waterLogs.length === 0 ||
										!todaysDailyLog ? (
											<div className='text-center'>...</div>
										) : (
											todaysDailyLog?.waterLogs.map((waterLog, i) => (
												<div
													key={waterLog.id}
													className='grid grid-cols-6 gap-2 text-sm w-full bg-secondary rounded-full px-4 py-2 items-center'
												>
													<div className='text-primary font-normal col-span-1'>
														<div className='rounded-full h-6 w-6 bg-primary/20 flex justify-center items-center pt-[1px]'>
															{i + 1}
														</div>
													</div>
													<div className='text-muted-foreground font-normal col-span-2'>
														{waterLog.createdAt.toLocaleTimeString('en-AU')}
													</div>
													<div className='text-muted-foreground font-medium col-span-2'>
														{waterLog.amount}ml
													</div>
													<div className='justify-self-end'>
														<Trash2
															size={16}
															className='cursor-pointer text-destructive hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
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
								className='w-full flex justify-center'
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
