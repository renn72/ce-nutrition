'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import {
	cn,
	getRecipeDetailsForDailyLog,
	getRecipeDetailsFromDailyLog,
} from '@/lib/utils'
import type {
	GetAllDailyLogs,
	GetDailyLogById,
	GetUserById,
	UserPlan,
} from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet, SheetStack } from '@silk-hq/components'
import { format } from 'date-fns'
import { useAtom } from 'jotai'
import {
	ArrowBigLeftDash,
	ArrowBigRightDash,
	CalendarIcon,
	ChevronDown,
	Salad,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar-log'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { Label } from '../ui/label'
import { isAllMealsAtom, selectedPlansAtom } from './atoms'
import { MealBottomSheet } from './meal-bottom-sheet'
import { MealLogUserRecipes } from './meal-log-user-recipes'

export const dynamic = 'force-dynamic'

const mealColourMap = {
	0: 'text-blue-700/70',
	1: 'text-green-700/70',
	2: 'text-yellow-700/70',
	3: 'text-red-700/70',
	4: 'text-purple-700/70',
	5: 'text-pink-700/70',
	6: 'text-cyan-700/70',
	7: 'text-sky-700/70',
}

const Meal = ({
	date,
	allPlans,
	todaysLog,
	userId,
	index,
}: {
	date: Date
	todaysLog: GetDailyLogById | null | undefined
	allPlans: UserPlan[]
	userId: string
	index: number
}) => {
	const [selectValue, setSelectValue] = useState<string>('')
	const [recipeName, setRecipeName] = useState<string>('')

	console.log('index', index)
	console.log('todaysLog', todaysLog)

	useEffect(() => {
		setRecipeName(() => {
			const meal = todaysLog?.dailyMeals.find(
				(meal) => meal.mealIndex === index,
			)
			if (!meal) return ''
			return meal.recipe?.[0]?.name ?? ''
		})
		setSelectValue(() => {
			const meal = todaysLog?.dailyMeals.find(
				(meal) => meal.mealIndex === index,
			)
			if (!meal) return ''
			return meal.recipe?.[0]?.parentId?.toString() ?? 'super-secret-recipe-id'
		})
	}, [index, todaysLog])

	const [selectedPlans, setSelectedPlans] = useAtom(selectedPlansAtom)

	useEffect(() => {
		if (allPlans.length === 1)
			setSelectedPlans([allPlans[0]?.id.toString() ?? ''])
	}, [])

	const ctx = api.useUtils()
	const { mutate: addMeal } = api.dailyLog.addMeal.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
		onSuccess: () => {
			toast.success(`${recipeName} Added`)
		},
	})
	const { mutate: deleteMeal } = api.dailyLog.deleteMeal.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
	})

	const recipes = allPlans.flatMap((plan) => plan?.userRecipes)

	const isSelectedInRecipes = !!recipes.find(
		(recipe) => recipe?.id === Number(selectValue),
	)

	console.log('selectValue', selectValue)

	const selectedRecipeMacros = getRecipeDetailsFromDailyLog(todaysLog, index)

	return (
		<div className='flex gap-0 flex flex-col items-start w-full'>
			<div className='pb-4'>
				<ToggleGroup
					orientation='vertical'
					size='sm'
					variant='outline'
					type='multiple'
					className='w-full justify-start flex flex-wrap'
					value={selectedPlans}
					onValueChange={setSelectedPlans}
				>
					{allPlans?.map((plan) => {
						if (!plan) return null
						return (
							<ToggleGroupItem
								key={plan.id}
								value={plan.id.toString()}
								className={cn(
									'text-xs truncate max-w-32 py-1 px-2 tracking-tight h-min',
									'data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none',
									'block rounded-full font-semibold',
								)}
							>
								{plan.name}
							</ToggleGroupItem>
						)
					})}
				</ToggleGroup>
			</div>
			<ToggleGroup
				orientation='vertical'
				size='sm'
				variant='outline'
				type='single'
				className='w-full justify-start'
				value={selectValue}
				onValueChange={(value) => {
					console.log({ value, selectValue })
					if (value === '' && selectValue !== '') {
						if (!todaysLog) return
						deleteMeal({
							mealIndex: Number(index),
							logId: todaysLog.id,
						})
						setSelectValue('')
						setRecipeName('')
						return
					}

					setSelectValue(value)
					const recipe = recipes.find((recipe) => recipe?.id === Number(value))
					setRecipeName(recipe?.name ?? '')
					const plan = allPlans.find((plan) =>
						plan?.userRecipes?.find((recipe) => recipe?.id === Number(value)),
					)
					if (!recipe || !plan) return
					addMeal({
						userId: userId,
						planId: plan.id,
						mealIndex: index,
						recipeIndex: recipe?.recipeIndex,
						recipeId: Number(value),
						date: date,
						logId: todaysLog?.id || null,
					})
				}}
			>
				<div className='flex flex-col ml-2 gap-2'>
					{selectValue !== '' ? (
						<ToggleGroupItem
							value={selectValue}
							className={cn(
								'text-sm truncate max-w-[600px]  py-3 px-4 data-[state=on]:bg-blue-900/70 relative',
								'data-[state=on]:text-slate-100 data-[state=on]:shadow-none',
								'shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0 h-fit',
								'hover:text-primary hover:bg-background',
							)}
						>
							<div className=' flex'>
								<div className='truncate font-semibold'>
									{recipeName && recipeName?.length > 41
										? `${recipeName.slice(0, 41)}...`
										: recipeName}
								</div>
								<div
									className={cn(
										'absolute -top-1 right-1 text-[0.6rem] font-light',
										'text-white/60',
									)}
								>{`${selectedRecipeMacros.cals} cals`}</div>
							</div>

							<div
								className={cn(
									'text-xs flex gap-4 font-medium',
									'text-white/60',
								)}
							>
								<div>{`C:${selectedRecipeMacros.carbs}g`}</div>
								<div>{`P:${selectedRecipeMacros.protein}g`}</div>
								<div>{`F:${selectedRecipeMacros.fat}g`}</div>
							</div>
						</ToggleGroupItem>
					) : null}
					{allPlans
						?.filter((plan) =>
							selectedPlans.includes(plan?.id.toString() ?? 'aabb'),
						)
						?.map((plan) => {
							if (!plan) return null
							if (plan.userRecipes?.length === 0) return null

							return (
								<div key={plan.id} className='flex flex-col'>
									<div className='flex gap-4 items-center'>
										<h3 className='font-semibold text-primary/80'>
											{plan.name}
										</h3>
									</div>
									<div className='flex gap-2 flex-col items-center py-2 w-full'>
										{plan.userRecipes?.map((recipe) => {
                      if (recipe.id === Number(selectValue)) return null
											const meal =
												plan.userMeals.find(
													(meal) => meal.mealIndex === recipe.mealIndex,
												)?.mealTitle ?? ''
											const { cals, protein, carbs, fat } =
												getRecipeDetailsForDailyLog(plan, recipe.id)

											// @ts-ignore
											const mealColour =
											// @ts-ignore
												mealColourMap[recipe.mealIndex ?? 0] ??
												'text-muted-foreground'
											return (
												<ToggleGroupItem
													key={recipe?.id}
													value={recipe?.id.toString() ?? ''}
													className={cn(
														'text-sm truncate max-w-[600px]  py-3 px-4 data-[state=on]:bg-blue-900/70 relative',
														'data-[state=on]:text-slate-100 data-[state=on]:shadow-none',
														'h-full shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0',
														'hover:text-primary hover:bg-background',
													)}
												>
													<div className=' flex'>
														<div className='truncate font-semibold'>
															{recipe?.name && recipe?.name?.length > 41
																? `${recipe?.name.slice(0, 41)}...`
																: recipe?.name}
														</div>
														<div
															className={cn(
																'absolute -top-1 right-1 text-[0.6rem] font-light',
																selectValue === recipe?.id.toString()
																	? 'text-white/60'
																	: 'text-muted-foreground',
															)}
														>{`${cals} cals`}</div>
														<div
															className={cn(
																'absolute -top-1 left-1 text-[0.6rem] font-medium',
																selectValue === recipe?.id.toString()
																	? 'text-white/60'
																	: mealColour,
															)}
														>{`${meal}`}</div>
													</div>

													<div
														className={cn(
															'text-xs flex gap-4 font-medium',
															selectValue === recipe?.id.toString()
																? 'text-white/60'
																: 'text-muted-foreground',
														)}
													>
														<div>{`C:${carbs}g`}</div>
														<div>{`P:${protein}g`}</div>
														<div>{`F:${fat}g`}</div>
													</div>
												</ToggleGroupItem>
											)
										})}
									</div>
								</div>
							)
						})}
				</div>
			</ToggleGroup>
		</div>
	)
}

const MealList = ({
	currentMeal: _currentMeal,
	todaysLog,
	currentUser,
	today,
	setDay,
}: {
	currentMeal: number
	currentUser: GetUserById
	todaysLog: GetDailyLogById | null | undefined
	today: Date
  setDay: React.Dispatch<React.SetStateAction<Date>>
}) => {
	const [currentMeal, setCurrentMeal] = useState(() => _currentMeal)
	const [isAllMeals, setIsAllMeals] = useAtom(isAllMealsAtom)
	const [isOpen, setIsOpen] = useState(false)

	const [selectedPlansId] = useAtom(selectedPlansAtom)

	const isUserCreateRecipe = currentUser.roles.find(
		(role) => role.name === 'create-meals',
	)
	const activePlans = currentUser?.userPlans.filter((plan) => plan.isActive)
	const refinedPlans = activePlans.map((plan) => {
		return {
			...plan,
			userRecipes: plan.userRecipes.filter(
				(recipe) => recipe.mealIndex === currentMeal || isAllMeals,
			),
		}
	})

	const mealsMacros = todaysLog?.dailyMeals
		.map((meal) => {
			const { cals, protein, carbs, fat } = getRecipeDetailsFromDailyLog(
				todaysLog,
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

	const selectedPlans = refinedPlans.filter((plan) =>
		selectedPlansId.includes(plan.id.toString()),
	)

	const calories = selectedPlans.reduce((acc, curr) => {
		let cals = 0
		if (isAllMeals && selectedPlans?.[0] && selectedPlans[0].userMeals?.[0])
			cals = Number(selectedPlans[0].userMeals[0].targetCalories)
		return acc === 0 ? cals : acc
	}, 0)

	const protein = selectedPlans.reduce((acc, curr) => {
		let protein = 0
		if (isAllMeals && selectedPlans?.[0] && selectedPlans[0].userMeals?.[0])
			protein = Number(selectedPlans[0].userMeals[0].targetProtein)
		return acc === 0 ? protein : acc
	}, 0)

	return (
		<Sheet.Content className='min-h-[200px] max-h-[95vh] h-full rounded-t-3xl bg-background relative'>
			<div className='flex flex-col justify-between h-full'>
				<div className='flex flex-col '>
					<div className='flex justify-center pt-1'>
						<Sheet.Handle
							className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
							action='dismiss'
						/>
					</div>
					<div className='flex gap-0 pt-2 flex-col border-b-[1px] border-primary pb-2 relative font-medium'>
						<Popover
              open={isOpen}
              onOpenChange={setIsOpen}
            >
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
											<span className='mt-[5px]'>{format(today, 'PPP')}</span>
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</div>
							</PopoverTrigger>
							<PopoverContent
                onFocusOutside={(e) => e.preventDefault()}
                forceMount
                className='w-auto p-0 z-[2000]'>
								<Calendar
									mode='single'
                  disabled={{ after: new Date() }}
									selected={today}
									onSelect={(date) => {
										if (!date) return
										setDay(date)
										setIsOpen(false)
                    setCurrentMeal(0)
									}}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
						<div className='flex justify-center items-center gap-6 mt-1'>
							<ArrowBigLeftDash
								size={28}
								className='active:scale-90 transition-transform cursor-pointer active:text-muted-foreground'
								onClick={() => {
									currentMeal > 0 && setCurrentMeal(currentMeal - 1)
								}}
							/>
							<Sheet.Title className='text-xl mt-[2px] font-semibold'>
								Meal {currentMeal + 1}
							</Sheet.Title>
							<ArrowBigRightDash
								size={28}
								className='active:scale-90 transition-transform cursor-pointer active:text-muted-foreground'
								onClick={() => {
									setCurrentMeal(currentMeal + 1)
								}}
							/>

							<Sheet.Description className='hidden'>Meal Log</Sheet.Description>
						</div>
						<div className='flex items-baseline justify-center'>
							<div className='flex items-center gap-2'>
								<NumberFlow
									value={mealsMacros?.cals ?? 0}
									className='text-xl font-semibold text-primary ml-2 '
								/>
								<span className='text-xs text-primary/50 ml-[1px]'>cals</span>
							</div>
							<div className='flex items-center gap-2'>
								<NumberFlow
									value={mealsMacros?.carbs ?? 0}
									className='text-xl font-semibold text-primary ml-2 '
								/>
								<span className='text-xs text-primary/50 ml-[1px]'>carbs</span>
							</div>
							<div className='flex items-center gap-2'>
								<NumberFlow
									value={mealsMacros?.protein ?? 0}
									className='text-xl font-semibold text-primary ml-2 '
								/>
								<span className='text-xs text-primary/50 ml-[1px]'>
									protein
								</span>
							</div>
							<div className='flex items-center gap-2'>
								<NumberFlow
									value={mealsMacros?.fat ?? 0}
									className='text-xl font-semibold text-primary ml-2 '
								/>
								<span className='text-xs text-primary/50 ml-[1px]'>fat</span>
							</div>
						</div>
						<div className='flex items-center gap-2 absolute top-14 right-2'>
							<Label className='text-xs mt-1'>All Meals</Label>
							<Checkbox
								checked={isAllMeals}
								onCheckedChange={(checked) => {
									setIsAllMeals(checked === true)
								}}
							/>
						</div>
					</div>
					<ScrollArea className='pt-4 px-2 h-[calc(95vh-130px)]'>
						<div className='flex flex-col gap-2 mb-2 '>
							<Meal
								allPlans={refinedPlans}
								date={today}
								todaysLog={todaysLog}
								userId={currentUser.id}
								index={currentMeal}
							/>
							{isUserCreateRecipe && todaysLog ? (
								<MealLogUserRecipes
									calories={calories}
									protein={protein}
									currentUser={currentUser}
									logId={todaysLog.id}
									mealIndex={currentMeal}
								/>
							) : null}
						</div>
					</ScrollArea>
				</div>
				<Sheet.Trigger className='w-full flex justify-center' action='dismiss'>
					<ChevronDown
						size={32}
						strokeWidth={2}
						className='text-muted-foreground'
					/>
				</Sheet.Trigger>
			</div>
		</Sheet.Content>
	)
}

const MealLog = ({
	currentUser,
	dailyLogs,
}: {
	currentUser: GetUserById
	dailyLogs: GetAllDailyLogs | null | undefined
}) => {
	const [day, setDay] = useState<Date>(new Date())

	const activePlans = currentUser?.userPlans.filter((plan) => plan.isActive)

	const isNotActivePlan = activePlans.length === 0

	const { data: _userRecipes } = api.recipe.getAllUserCreated.useQuery({
		userId: currentUser.id,
	})
	const todaysLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === day.toDateString(),
	)

	const lastMeal =
		todaysLog?.dailyMeals
			?.map((meal) => meal.mealIndex)
			.reduce((acc, curr) => Math.max(acc ?? 0, curr ?? 0), -1) ?? -1
	const currentMeal = lastMeal + 1

	return (
		<div className='flex flex-col gap-0 w-full items-center'>
			<SheetStack.Root>
				<Sheet.Root license='non-commercial'>
					<div className='flex flex-col gap-0 items-center justify-start w-full'>
						<div className={cn('text-lg font-semibold')}>
							Meal {currentMeal + 1}
						</div>
						<div
							className={cn(
								'rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center',
								'justify-center active:scale-75 transition-transform cursor-pointer',
							)}
						>
							<Sheet.Trigger
                onClick={(e) => {
                  setDay(new Date())
                }}
                disabled={isNotActivePlan}>
								<Salad
									size={28}
									className={cn(
										'text-primary/80 hover:text-primary active:scale-90 transition-transform cursor-pointer',
									)}
								/>
							</Sheet.Trigger>
						</div>
					</div>
					<Sheet.Portal>
						<Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
							<MealList
								currentMeal={currentMeal}
								todaysLog={todaysLog}
								currentUser={currentUser}
								today={day}
								setDay={setDay}
							/>
						</Sheet.View>
					</Sheet.Portal>
				</Sheet.Root>
			</SheetStack.Root>
			<MealBottomSheet dailyLogs={dailyLogs} />
		</div>
	)
}

export { MealLog }
