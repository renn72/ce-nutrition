'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetDailyLogById } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, ListCollapse, Trash2 } from 'lucide-react'
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
				onClick={() => {
					setToday(new Date())
				}}
				className='flex gap-2 justify-center items-center mt-2'
			>
				<ListCollapse size={20} className='text-muted-foreground' />
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View className='z-[999] h-[100vh] bg-black/50'>
					<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[95vh] bg-background'>
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
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<div className='flex relative flex-col gap-0 pt-0 pb-4 font-medium border-b-[1px] border-primary'>
									<div className='flex justify-center'>
										<Sheet.Title className='ml-4 text-lg'>Meal Log</Sheet.Title>
										<Sheet.Description className='hidden'>
											Meal Log
										</Sheet.Description>
									</div>
									<div className='flex items-baseline'>
										<div className='flex gap-2 items-center'>
											<NumberFlow
												value={mealsMacros?.cals ?? 0}
												className='ml-2 text-lg text-primary'
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												cals
											</span>
										</div>
										<div className='flex gap-2 items-center'>
											<NumberFlow
												value={mealsMacros?.carbs ?? 0}
												className='ml-2 text-lg text-primary'
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												carbs
											</span>
										</div>
										<div className='flex gap-2 items-center'>
											<NumberFlow
												value={mealsMacros?.protein ?? 0}
												className='ml-2 text-lg text-primary'
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												protein
											</span>
										</div>
										<div className='flex gap-2 items-center'>
											<NumberFlow
												value={mealsMacros?.fat ?? 0}
												className='ml-2 text-lg text-primary'
											/>
											<span className='text-xs text-primary/50 ml-[1px]'>
												fat
											</span>
										</div>
									</div>
								</div>

								<ScrollArea className='px-2 pt-0 h-[calc(90vh-160px)]'>
									<div className='flex flex-col gap-2'>
										{todaysDailyLog?.dailyMeals.length === 0 ||
										!todaysDailyLog ? (
											<div className='text-center'>...</div>
										) : (
											todaysDailyLog?.dailyMeals
												.sort(
													(a, b) => Number(a.mealIndex) - Number(b.mealIndex),
												)
												.map((meal, _i) => {
													const { cals, protein, carbs, fat } =
														getRecipeDetailsFromDailyLog(
															todaysDailyLog,
															meal.mealIndex ?? 0,
														)
													return (
														<div
															key={meal.id}
															className='flex flex-col gap-2 py-2 px-4 w-full rounded-full bg-secondary'
														>
															<div className='grid grid-cols-9 gap-0 items-baseline w-full text-sm'>
																<div className='col-span-1 font-normal text-primary'>
																	<div className='flex justify-center items-center w-6 h-6 rounded-full bg-primary/20 pt-[1px]'>
																		{Number(meal.mealIndex) + 1}
																	</div>
																</div>
																<div className='col-span-2 font-light text-[0.7rem]'>
																	{new Date(meal.createdAt).toLocaleTimeString(
																		'en-AU',
																		{
																			hour: 'numeric',
																			minute: 'numeric',
																			hour12: true,
																		},
																	)}
																</div>
																<div className='col-span-5 font-medium truncate'>
																	{meal.recipe?.[0]?.name}
																</div>
																<div
																	onClick={(e) => {
																		e.preventDefault()
																		e.stopPropagation()
																		if (
																			meal.mealIndex === null ||
																			meal.mealIndex === undefined
																		)
																			return
																		deleteMeal({
																			mealIndex: meal.mealIndex,
																			logId: todaysDailyLog.id,
																		})
																	}}
																	className='flex justify-end items-center px-1'
																>
																	<Trash2
																		size={12}
																		className='active:scale-95 text-destructive/70'
																	/>
																</div>
															</div>
															<div className='grid grid-cols-4 gap-2 place-items-center px-4 w-full text-xs'>
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

export { MealBottomSheet }
