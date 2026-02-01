'use client'

import { cn, getRecipeDetailsFromDailyLog } from '@/lib/utils'
import type { GetAllDailyLogs, GetUserById } from '@/types'

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
		<div className='flex gap-0 items-baseline xl:gap-1'>
			<span className='ml-2 text-sm xl:text-lg text-primary'>
				{value.toFixed(fixed)}
			</span>
			<span className='text-xs text-primary/50 ml-[1px]'>{postFix}</span>
		</div>
	)
}

const UserMeals = ({
	dailyLogs,
	className,
}: {
	dailyLogs: GetAllDailyLogs
	className?: string
}) => {
	const logs = dailyLogs.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)

	return (
		<div
			className={cn(
				'border rounded-lg py-2 px-1 xl:px-2 w-full overflow-y-auto',
				className,
			)}
		>
			<div className='flex flex-col gap-2'>
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
						<div key={log.id} className='flex flex-col gap-1 w-full text-sm'>
							<div className='py-1 px-2 rounded-full text-[0.6rem] bg-muted w-fit'>
								{new Date(log.date).toLocaleDateString('en-AU', {
									day: 'numeric',
									month: 'short',
									year: 'numeric',
								})}
							</div>
							{mealsMacros?.cals === 0 ? (
								'nil'
							) : (
								<div className='flex flex-col gap-1 w-full'>
									<div className='flex gap-3 items-baseline'>
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
											getRecipeDetailsFromDailyLog(log, meal.mealIndex ?? 0)
										return (
											<div
												key={meal.id}
												className='grid grid-cols-5 gap-0 py-1 px-1 w-full rounded-full lg:px-2 bg-secondary'
											>
												<div className='grid grid-cols-6 col-span-2 gap-1 items-baseline w-full text-sm lg:grid-cols-10 xl:col-span-3'>
													<div className='flex flex-col col-span-1 justify-center items-center w-full h-full font-normal text-primary'>
														<div className='flex justify-center items-center w-4 h-4 text-xs rounded-full xl:w-5 xl:h-5 xl:text-sm bg-primary/20 pt-[2px] xl:pt-[1px]'>
															{Number(meal.mealIndex) + 1}
														</div>
													</div>
													<div className='hidden col-span-2 font-light xl:block text-[0.7rem]'>
														{meal.createdAt.toLocaleTimeString('en-AU', {
															hour: 'numeric',
															minute: 'numeric',
															hour12: true,
														})}
													</div>
													<div className='col-span-5 text-xs font-medium lg:col-span-7 xl:text-sm truncate'>
														{meal.recipe?.[0]?.name}
													</div>
												</div>
												<div className='grid grid-cols-4 col-span-3 gap-0 place-items-center px-0 w-full text-xs tracking-tighter xl:col-span-2'>
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
