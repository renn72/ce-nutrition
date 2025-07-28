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
			<Sheet.Trigger className='flex gap-2 items-center justify-center mt-2'>
				<ListCollapse size={20} className='text-muted-foreground' />
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
					<Sheet.Content className='min-h-[200px] max-h-[90vh] h-full rounded-t-3xl bg-background relative'>
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
															<div className='font-semibold'>
																{props.date.getDate()}
															</div>
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
											Supplements Log
										</Sheet.Title>
									</div>
									<Sheet.Description className='hidden'>
										Supplement Log
									</Sheet.Description>
									<div className='border w-px h-6' />
								</div>
								<ScrollArea className='px-4 h-[calc(90vh-170px)]'>
									<div className='flex flex-col gap-2 '>
										{todaysDailyLog?.supplements.length === 0 ||
										!todaysDailyLog ? (
											<div className='text-center'>...</div>
										) : (
											todaysDailyLog?.supplements.map((supp, i) => (
												<div
													key={supp.id}
													className='text-sm w-full bg-secondary rounded-full px-4 py-2 items-center flex flex-col'
												>
													<div className='grid grid-cols-6 gap-2 text-sm w-full items-center'>
														<div className='text-primary text-lg font-semibold col-span-2'>
															{supp.supplement?.name}
														</div>
														<div className='text-primary font-normal col-span-3 justify-self-end'>
                                {supp.time}
                            </div>

													</div>
													<div className='grid grid-cols-6 gap-2 text-sm w-full items-center'>
														<div className='text-muted-foreground font-medium col-span-2'>
															{`${supp.amount} ${supp.unit}`}
														</div>
														<div className='text-muted-foreground font-normal col-span-3 justify-self-end'>
															{supp.createdAt.toLocaleTimeString('en-AU')}
														</div>
														<div className='justify-self-end'>
															<Trash2
																size={16}
																className='cursor-pointer text-destructive hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
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

export { SuppBottomSheet }
