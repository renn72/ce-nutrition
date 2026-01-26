'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'

import { getMealMacro } from '@/lib/utils'

const UserInfo = ({ userId }: { userId: string }) => {
	const ctx = api.useUtils()

	const { mutate: finishPlan } = api.userPlan.finishPlan.useMutation({
		onSuccess: () => {
			toast.success('Deleted')
			ctx.invalidate()
		},
	})
	const { mutate: activePlan } = api.userPlan.activePlan.useMutation({
		onSuccess: () => {
			toast.success('Actived')
			ctx.invalidate()
		},
	})
	const { mutate: deletePlan } = api.userPlan.delete.useMutation({
		onSuccess: () => {
			toast.success('Deleted')
			ctx.invalidate()
		},
	})

	const { data: currentUser } = api.user.get.useQuery(userId)
	const plans = currentUser?.userPlans
		.filter((_plan) => true)
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.sort((a, b) => {
			if (!a.isActive && !b.isActive) return 0
			if (a.isActive && !b.isActive) return -1
			if (!a.isActive && b.isActive) return 1
			return 0
		})

	const { mutate: saveAsPlan } = api.plan.saveAsPlan.useMutation({
		onSuccess: () => {
			toast.success('Saved as Plan')
			ctx.invalidate()
		},
	})
	const { mutate: createPlan } = api.userPlan.create.useMutation({
		onSuccess: () => {
			toast.success('Created')
			ctx.user.get.invalidate()
		},
		onError: (e) => {
			toast.error(JSON.stringify(e))
			console.log(e)
		},
	})

	const onSaveAsPlan = (id: number) => {
		const plan = plans?.find((plan) => plan.id === id)
		if (!plan) return
		saveAsPlan({
			name: plan.name + '-copy',
			description: plan.description,
			image: plan.image,
			notes: plan.notes,
			planCategory: `${currentUser?.firstName} ${currentUser?.lastName}`,
			numberOfMeals: plan.numberOfMeals || plan.userMeals.length,
			meals: plan.userMeals.map((meal) => ({
				mealIndex: meal.mealIndex || 0,
				mealTitle: meal.mealTitle || '',
				calories: meal.calories || '',
				vegeCalories: meal.vegeCalories || '',
				vegeNotes: meal.vegeNotes || '',
				vege: meal.veges || '',
				note: meal.note || '',
				recipes: plan.userRecipes
					.filter((recipe) => recipe.mealIndex === meal.mealIndex)
					.map((recipe) => ({
						id: recipe.id,
						name: recipe.name || '',
						calories: meal.calories || '',
						note: recipe.note || '',
						ingredients: plan.userIngredients
							.filter(
								(ingredient) =>
									ingredient.recipeIndex === recipe.recipeIndex &&
									ingredient.mealIndex === recipe.mealIndex,
							)
							.map((ingredient) => ({
								ingredientId: ingredient.ingredientId || -1,
								alternateId: ingredient.alternateId,
								name: ingredient.name || '',
								serve: ingredient.serve || '',
								serveUnit: ingredient.serveUnit || '',
								note: ingredient.note || '',
							})),
					})),
			})),
		})
	}

	const onDuplicatePlan = (id: number) => {
		const data = plans?.find((plan) => plan.id === id)
		console.log('data', data)
		if (!data) return
		createPlan({
			name: data.name + '-dup',
			description: data.description,
			image: '',
			notes: data.notes,
			meals: data.userMeals.map((meal, mealIndex) => ({
				mealIndex: mealIndex,
				mealTitle: meal.mealTitle || '',
				calories: meal.calories || '',
				targetCalories: meal.targetCalories || '',
				targetProtein: meal.targetProtein || '',
				vegeCalories: meal.vegeCalories || '',
				veges: meal.veges || '',
				vegeNotes: meal.vegeNotes || '',
				protein: meal.protein?.toString(),
				note: meal.note || '',
				recipes: data.userRecipes
					.filter((recipe) => recipe.mealIndex === mealIndex)
					.map((recipe, recipeIndex) => ({
						recipeIndex: recipeIndex,
						mealIndex: mealIndex,
						name: recipe.name || '',
						note: recipe.note || '',
						index: recipeIndex,
						description: '',
						ingredients: data?.userIngredients
							.filter(
								(ingredient) =>
									ingredient.recipeIndex === recipe.recipeIndex &&
									ingredient.mealIndex === recipe.mealIndex,
							)
							.map((ingredient, ingredientIndex) => ({
								ingredientId: Number(ingredient.ingredientId),
								ingredientIndex: ingredientIndex,
								recipeIndex: recipeIndex,
								mealIndex: mealIndex,
								name: ingredient.name || '',
								serve: ingredient.serve || '',
								serveUnit: ingredient.serveUnit || '',
								alternateId:
									ingredient.alternateId === null
										? null
										: Number(ingredient.alternateId),
								note: ingredient.note || '',
							})),
					})),
			})),
			userId: userId,
		})
	}

	if (!plans) return null

	return (
		<div className='flex flex-col gap-4 items-center px-2 my-10 capitalize'>
			{plans.map((plan) => (
				<Card
					key={plan.id}
					className={cn(
						'w-full max-w-screen-xl rounded-lg px-6 pt-3 pb-6 shadow-sm',
						plan.isActive ? ' border-green-500/90' : '',
					)}
				>
					<Collapsible>
						<CardHeader className='flex relative flex-col justify-between pb-2'>
							<CollapsibleTrigger className='absolute -bottom-6 right-1/2 -translate-x-1/2'>
								<ChevronDown size={40} />
							</CollapsibleTrigger>
							<div
								className={cn(
									'flex gap-2 items-center w-full justify-between',
									plan.isActive ? 'hidden' : '',
								)}
							>
								<div className='flex gap-2 items-center'>
									<CardTitle className={cn('text-xl font-medium')}>
										<Badge className='mb-2'>Finished</Badge>
									</CardTitle>
									<div className='flex gap-2 items-center font-light text-[0.8rem] text-muted-foreground'>
										<div>
											{plan.createdAt.toLocaleDateString('en-AU', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</div>
										{plan.finishedAt ? (
											<div>
												-{' '}
												{plan.finishedAt.toLocaleDateString('en-AU', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												})}
											</div>
										) : null}
									</div>
								</div>
								<div className='flex gap-2 items-center'>
									<Button
										variant='outline'
										size='sm'
										onClick={() => {
											onSaveAsPlan(plan.id)
										}}
									>
										Save As Plan
									</Button>
									<Button
										variant='default'
										size='sm'
										onClick={() => {
											activePlan(plan.id)
										}}
									>
										Reactivate Plan
									</Button>
									<Button
										className='font-semibold'
										variant='destructive'
										size='sm'
										onClick={() => {
											deletePlan(plan.id)
										}}
									>
										Delete
									</Button>
								</div>
							</div>
							<div
								className={cn(
									'flex gap-2 items-center w-full justify-between',
									plan.isActive ? '' : 'hidden',
								)}
							>
								<div className='flex gap-2 items-center'>
									<CardTitle className={cn('text-xl font-medium')}>
										<Badge className='mb-2 bg-green-600'>Active</Badge>
									</CardTitle>
									<div className='flex gap-2 items-center font-light text-[0.8rem] text-muted-foreground'>
										<div>
											{plan.createdAt.toLocaleDateString('en-AU', {
												day: 'numeric',
												month: 'short',
												year: 'numeric',
											})}
										</div>
										{plan.finishedAt ? (
											<div>
												-{' '}
												{plan.finishedAt.toLocaleDateString('en-AU', {
													day: 'numeric',
													month: 'short',
													year: 'numeric',
												})}
											</div>
										) : null}
									</div>
								</div>
								<div className='flex gap-2 items-center'>
									<Link
										className=''
										href={`/admin/user-program-edit?user=${userId}&plan=${plan.id}`}
										prefetch={false}
									>
										<Button variant='outline' size='sm'>
											Edit Plan
										</Button>
									</Link>
									<Button
										variant='outline'
										size='sm'
										onClick={() => {
											onSaveAsPlan(plan.id)
										}}
									>
										Save As Plan
									</Button>
									<Button
										variant='outline'
										size='sm'
										onClick={() => {
											onDuplicatePlan(plan.id)
										}}
									>
										Duplicate Plan
									</Button>
									<Button
										variant='destructive'
										size='sm'
										onClick={() => {
											finishPlan(plan.id)
										}}
									>
										Finish Plan
									</Button>
								</div>
							</div>

							<div className='flex gap-4 items-center'>
								<div className='text-xl font-medium'>{plan.name}</div>
								<div className='px-2 text-sm font-normal rounded-full bg-accent-foreground/10 py-[2px]'>
									Cals:
									{plan.userMeals
										.reduce((acc, meal) => {
											if (meal.mealIndex === null) return acc
											return (
												acc + Number(getMealMacro(plan, meal.mealIndex).cals)
											)
										}, 0)
										.toFixed(0)}
								</div>
								<div className='px-2 text-sm font-normal rounded-full bg-accent-foreground/10 py-[2px]'>
									Protein:
									{plan.userMeals
										.reduce((acc, meal) => {
											if (meal.mealIndex === null) return acc
											return (
												acc + Number(getMealMacro(plan, meal.mealIndex).protein)
											)
										}, 0)
										.toFixed(0)}
								</div>
								<div className='px-2 text-sm font-normal rounded-full bg-accent-foreground/10 py-[2px]'>
									Carbs:
									{plan.userMeals
										.reduce((acc, meal) => {
											if (meal.mealIndex === null) return acc
											return (
												acc + Number(getMealMacro(plan, meal.mealIndex).carbs)
											)
										}, 0)
										.toFixed(0)}
								</div>
								<div className='px-2 text-sm font-normal rounded-full bg-accent-foreground/10 py-[2px]'>
									Fat:
									{plan.userMeals
										.reduce((acc, meal) => {
											if (meal.mealIndex === null) return acc
											return (
												acc + Number(getMealMacro(plan, meal.mealIndex).fat)
											)
										}, 0)
										.toFixed(0)}
								</div>
							</div>
						</CardHeader>
						<CollapsibleContent className=''>
							<CardContent className='flex flex-col gap-2 py-4 w-full'>
								<Card>
									<CardHeader className='pb-0'>
										<CardTitle className='text-xl font-medium'>Meals</CardTitle>
									</CardHeader>
									<CardContent className='flex flex-col gap-2 pt-1 pb-4 w-full'>
										{plan.userMeals.map((meal, mealIndex) => {
											const recipes = plan.userRecipes.filter(
												(recipe) => recipe.mealIndex === mealIndex,
											)
											return (
												<div
													className='flex flex-col gap-1 w-full'
													key={meal.id}
												>
													<div className='flex gap-1 items-center'>
														<div>{meal.mealTitle}</div>
														<div className='flex gap-1 items-center'>
															<div className='text-sm text-muted-foreground'>
																Calories
															</div>
															<div className='text-sm text-muted-foreground'>
																{meal.targetCalories}
															</div>
															{meal.targetProtein !== '' ? (
																<>
																	<div className='text-sm text-muted-foreground'>
																		Protein
																	</div>
																	<div className='text-sm text-muted-foreground'>
																		{meal.targetProtein}
																	</div>
																</>
															) : null}
														</div>
													</div>
													<div className='flex flex-col gap-1 ml-4 w-full'>
														{recipes.map((recipe) => {
															return (
																<div
																	className='flex flex-col gap-1 w-full'
																	key={recipe.id}
																>
																	<div>{recipe.name}</div>
																</div>
															)
														})}
													</div>
													{meal.veges !== '' && (
														<div className='flex gap-1 items-center'>
															<div className='text-sm text-muted-foreground'>
																Vege
															</div>
															<div className='text-sm text-muted-foreground'>
																{meal.veges}
															</div>
															<div className='text-sm text-muted-foreground'>
																Notes
															</div>
															<div className='text-sm text-muted-foreground'>
																{meal.vegeNotes}
															</div>
														</div>
													)}
												</div>
											)
										})}
									</CardContent>
								</Card>
							</CardContent>
						</CollapsibleContent>
					</Collapsible>
				</Card>
			))}
		</div>
	)
}

export default function Home() {
	const searchParams = useSearchParams()
	const userId = searchParams.get('user')

	if (
		userId === '' ||
		userId === undefined ||
		userId === null ||
		userId === 'null'
	)
		return <div>Select a user</div>

	return <UserInfo userId={userId} />
}
