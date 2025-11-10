'use client'

import { cn, getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetAllDailyLogs, GetUserById } from '@/types'
import { ArrowDown, ArrowUp, Weight } from 'lucide-react'

import { ScrollArea } from '@/components/ui/scroll-area'

const MacroValue = ({
	value,
	postFix,
	fixed = 1,
}: {
	value: number
	postFix: string
	fixed?: number
}) => {
	return (
		<div className='flex items-baseline gap-0 xl:gap-1'>
			<span className='text-sm xl:text-lg text-primary ml-2 '>{value.toFixed(fixed)}</span>
			<span className='text-xs text-primary/50 ml-[1px]'>{postFix}</span>
		</div>
	)
}

const UserMeals = ({
	currentUser,
	dailyLogs,
  className,
}: {
	currentUser: GetUserById
	dailyLogs: GetAllDailyLogs
  className?: string
}) => {
	const logs = dailyLogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)



	return (
		<div className={cn('border rounded-lg py-2 px-1 xl:px-2 w-full overflow-y-auto', className)}>
        <div className='flex flex-col gap-2 '>
				{logs.map((log) => {
					const mealsMacros = log?.dailyMeals
						.map((meal) => {
							const { cals, protein, carbs, fat } =
								getRecipeDetailsFromDailyLog(log, meal.mealIndex ?? 0)
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
						<div key={log.id} className='flex gap-1 flex-col w-full text-sm'>
							<div className='text-[0.6rem] rounded-full bg-muted px-2 py-1 w-fit'>
								{new Date(log.date).toLocaleDateString('en-AU', {
									day: 'numeric',
									month: 'short',
									year: 'numeric',
								})}
							</div>
							{mealsMacros?.cals === 0 ? (
								'nil'
							) : (
								<div className='flex gap-1 flex-col w-full'>
									<div className='flex items-baseline gap-3'>
										<MacroValue
											value={mealsMacros?.cals ?? 0}
											postFix='cals'
											fixed={0}
										/>
										<MacroValue
											value={mealsMacros?.carbs ?? 0}
											postFix='carbs'
										/>
										<MacroValue
											value={mealsMacros?.protein ?? 0}
											postFix='protein'
										/>
										<MacroValue value={mealsMacros?.fat ?? 0} postFix='fat' />
									</div>
									{log.dailyMeals.map((meal, i) => {
										const { cals, protein, carbs, fat } =
											getRecipeDetailsFromDailyLog(
												log,
												meal.mealIndex ?? 0,
											)
										return (
											<div
												key={meal.id}
												className='grid grid-cols-5 gap-0 bg-secondary rounded-full w-full px-1 lg:px-2 py-1'
											>
												<div className='grid grid-cols-6 lg:grid-cols-10 gap-1 text-sm w-full  items-baseline col-span-2 xl:col-span-3'>
													<div className='text-primary font-normal col-span-1 h-full w-full flex flex-col justify-center items-center'>
														<div className='rounded-full h-4 w-4  xl:h-5 xl:w-5 text-xs xl:text-sm bg-primary/20 flex justify-center items-center pt-[2px] xl:pt-[1px]'>
															{Number(meal.mealIndex) + 1}
														</div>
													</div>
													<div className='text-[0.7rem] font-light col-span-2 hidden xl:block '>
														{meal.createdAt.toLocaleTimeString('en-AU', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
														})}
													</div>
													<div className='col-span-5 lg:col-span-7 truncate font-medium text-xs xl:text-sm'>
														{meal.recipe?.[0]?.name}
													</div>
												</div>
												<div className='grid grid-cols-4 gap-0 text-xs w-full place-items-center px-0 tracking-tighter col-span-3 xl:col-span-2'>
													<div>{`${cals} KJ`}</div>
													<div>{`C:${carbs}g`}</div>
													<div>{`P:${protein}g`}</div>
													<div>{`F:${fat}g`}</div>
												</div>
											</div>
										)
									})}
								</div>
							)}
						</div>
					)
				})}
        </div>
		</div>
	)
}

export { UserMeals }
