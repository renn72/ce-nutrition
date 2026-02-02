'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetAllDailyLogs } from '@/types'
import { Sheet } from '@silk-hq/components'
import { format } from 'date-fns'
import { CalendarIcon, ChevronDown, ListCollapse, Trash2 } from 'lucide-react'
import { api } from '@/trpc/react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar-log'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'

const SuppBottomSheet = ({
	dailyLogs,
}: {
	dailyLogs: GetAllDailyLogs | null | undefined
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [today, setToday] = useState<Date>(new Date())

	const todaysDailyLog = dailyLogs?.find((dailyLog) => {
		return dailyLog.date === today.toDateString()
	})

	const ctx = api.useUtils()
	const { mutate: deleteSuppLog } = api.supplement.unLogSupplement.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
		onError: (err) => {},
	})

	return (
		<Sheet.Root license='non-commercial'>
			<Sheet.Trigger className='flex gap-2 justify-center items-center mt-2'>
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
											Supplements Log
										</Sheet.Title>
									</div>
									<Sheet.Description className='hidden'>
										Supplement Log
									</Sheet.Description>
									<div className='w-px h-6 border' />
								</div>
								<ScrollArea className='px-4 h-[calc(90vh-170px)]'>
									<div className='flex flex-col gap-2'>
										{todaysDailyLog?.supplements.length === 0 ||
										!todaysDailyLog ? (
											<div className='text-center'>...</div>
										) : (
											todaysDailyLog?.supplements.map((supp, i) => (
												<div
													key={supp.id}
													className='flex flex-col items-center py-2 px-4 w-full text-sm rounded-full bg-secondary'
												>
													<div className='grid grid-cols-6 gap-2 items-center w-full text-sm'>
														<div className='col-span-2 text-lg font-semibold text-primary'>
															{supp.supplement?.name}
														</div>
														<div className='col-span-3 justify-self-end font-normal text-primary'>
															{supp.time}
														</div>
													</div>
													<div className='grid grid-cols-6 gap-2 items-center w-full text-sm'>
														<div className='col-span-2 font-medium text-muted-foreground'>
															{`${supp.amount} ${supp.unit}`}
														</div>
														<div className='col-span-3 justify-self-end font-normal text-muted-foreground'>
															{new Date(supp.createdAt).toLocaleTimeString(
																'en-AU',
															)}
														</div>
														<div className='justify-self-end'>
															<Trash2
																size={16}
																className='transition-transform cursor-pointer active:scale-90 text-destructive mb-[1px] hover:text-primary'
																onClick={() => {
																	deleteSuppLog({
																		id: supp.id,
																	})
																}}
															/>
														</div>
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

export { SuppBottomSheet }
