'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetDailyLogById } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, ListCollapse, Shuffle, Trash2 } from 'lucide-react'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import { format } from 'date-fns'

import { cn } from '@/lib/utils'

import { CalendarIcon } from 'lucide-react'

import { Calendar } from '@/components/ui/calendar-log'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Button } from '@/components/ui/button'

const MealBottomSheet = ({
	dailyLogs,
}: {
	dailyLogs: GetDailyLogById[] | null | undefined
}) => {
	const ctx = api.useUtils()
	const { mutate: deleteMeal } = api.dailyLog.deleteMeal.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
	})

  const [isOpen, setIsOpen] = useState(false)
	const [today, setToday] = useState<Date>(new Date())

	const todaysDailyLog = dailyLogs?.find((dailyLog) => {
		if (!dailyLog) return false
    if (!dailyLog.date) return false
		return dailyLog.date === today.toDateString()
	})

	if (!todaysDailyLog) return null

	const mealsMacros = todaysDailyLog?.dailyMeals
		.map((meal) => {
			const { cals, protein, carbs, fat } = getRecipeDetailsFromDailyLog(
				todaysDailyLog,
				meal.mealIndex ?? 0,
			)
			return {
				cals: Number(cals),
				protein: Number(protein),
				carbs: Number(carbs),
				fat: Number(fat),
			}
		})
		.reduce(
			(acc, curr) => {
				return {
					cals: acc.cals + curr.cals,
					protein: acc.protein + curr.protein,
					carbs: acc.carbs + curr.carbs,
					fat: acc.fat + curr.fat,
				}
			},
			{
				cals: 0,
				protein: 0,
				carbs: 0,
				fat: 0,
			},
		)

	return (
		<Sheet.Root license='non-commercial'>
			<Sheet.Trigger
        onClick={()=> {
          setToday(new Date())
        }}
        className='flex gap-2 items-center justify-center mt-2'>
				<ListCollapse size={20} className='text-muted-foreground' />
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
					<Sheet.Content className='min-h-[200px] max-h-[95vh] h-full rounded-t-3xl bg-background relative'>
						<div className='flex flex-col justify-between h-full'>
							<div className='flex flex-col gap-2'>
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
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<div className='flex gap-0 pt-0 flex-col border-b-[1px] border-primary pb-4 relative font-medium'>
									<div className='flex justify-center'>
										<Sheet.Title className='text-lg ml-4 '>
											Meal Log
										</Sheet.Title>
										<Sheet.Description className='hidden'>
											Meal Log
										</Sheet.Description>
									</div>
									<div className='flex items-baseline'>
										<div className='flex items-center gap-2'>
											<NumberFlow
												value={mealsMacros?.cals ?? 0}
												className='text-lg text-primary ml-2 '
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												cals
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<NumberFlow
												value={mealsMacros?.carbs ?? 0}
												className='text-lg text-primary ml-2 '
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												carbs
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<NumberFlow
												value={mealsMacros?.protein ?? 0}
												className='text-lg text-primary ml-2 '
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												protein
											</span>
										</div>
										<div className='flex items-center gap-2'>
											<NumberFlow
												value={mealsMacros?.fat ?? 0}
												className='text-lg text-primary ml-2 '
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												fat
											</span>
										</div>
									</div>
								</div>

								<ScrollArea className='pt-0 px-2 h-[calc(90vh-160px)]'>
									<div className='flex flex-col gap-2 '>
										{todaysDailyLog?.dailyMeals.length === 0 ||
										!todaysDailyLog ? (
											<div className='text-center'>...</div>
										) : (
											todaysDailyLog?.dailyMeals
												.sort(
													(a, b) => Number(a.mealIndex) - Number(b.mealIndex),
												)
												.map((meal, i) => {
													const { cals, protein, carbs, fat } =
														getRecipeDetailsFromDailyLog(
															todaysDailyLog,
															meal.mealIndex ?? 0,
														)
													return (
														<div
															key={meal.id}
															className='flex flex-col gap-2 bg-secondary rounded-full w-full px-4 py-2'
														>
															<div className='grid grid-cols-9 gap-0 text-sm w-full  items-baseline'>
																<div className='text-primary font-normal col-span-1'>
																	<div className='rounded-full h-6 w-6 bg-primary/20 flex justify-center items-center pt-[1px]'>
																		{Number(meal.mealIndex) + 1}
																	</div>
																</div>
																<div className='text-[0.7rem] font-light col-span-2 '>
																	{meal.createdAt.toLocaleTimeString('en-AU', {
																		hour: 'numeric',
																		minute: 'numeric',
																		hour12: true,
																	})}
																</div>
																<div className='col-span-5 truncate font-medium  '>
																	{meal.recipe?.[0]?.name}
																</div>
																<div
																	onClick={() => {
																		if (!meal.mealIndex) return
																		deleteMeal({
																			mealIndex: meal.mealIndex,
																			logId: todaysDailyLog.id,
																		})
																	}}
																	className='px-1 items-center flex justify-end '
																>
																	<Trash2
																		size={12}
																		className='text-destructive/70 active:scale-95'
																	/>
																</div>
															</div>
															<div className='grid grid-cols-4 gap-2 text-xs w-full place-items-center px-4'>
																<div>{`${cals} cals`}</div>
																<div>{`C:${carbs}g`}</div>
																<div>{`P:${protein}g`}</div>
																<div>{`F:${fat}g`}</div>
															</div>
														</div>
													)
												})
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

export { MealBottomSheet }
