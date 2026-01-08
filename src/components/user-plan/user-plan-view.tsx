'use client'

import { useState } from 'react'

import {
	cn,
	getRecipeDetailsForDailyLog,
	getRecipeDetailsFromDailyLog,
} from '@/lib/utils'
import type { UserPlan } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, RotateCcw } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'

const UserPlanVege = ({
	userPlan,
	mealIndex,
}: {
	userPlan: UserPlan
	mealIndex: number | null
}) => {
	if (!userPlan) return null
	const meal = userPlan.userMeals.find((meal) => meal.mealIndex === mealIndex)

	if (!meal) return null
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Badge className='cursor-pointer'>Vege</Badge>
			</DialogTrigger>
			<DialogContent
				className='py-14'
				onOpenAutoFocus={(e) => {
					e.preventDefault()
				}}
			>
				<DialogHeader>
					<DialogTitle>Vege</DialogTitle>
					<DialogDescription />
				</DialogHeader>
				<div className='flex flex-col gap-4 items-center'>
					<div>{meal.veges}</div>
					<div>{meal.vegeNotes}</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
const UserPlanRecipe = ({
	userPlan,
	mealIndex,
	recipeIndex,
}: {
	userPlan: UserPlan
	mealIndex: number | null
	recipeIndex: number | null
}) => {
	const [scale, setScale] = useState(1)

	if (!userPlan) return null
	const recipe = userPlan.userRecipes.find(
		(recipe) =>
			recipe.mealIndex === mealIndex && recipe.recipeIndex === recipeIndex,
	)
	if (!recipe) return null

	const { cals, protein, carbs, fat } = getRecipeDetailsForDailyLog(
		userPlan,
		recipe.id,
	)

	return (
		<Sheet.Root license='non-commercial'>
			<Sheet.Trigger>
				<Badge className='cursor-pointer' variant='accent'>
					{recipe.name}
				</Badge>
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View className='z-[999] h-[100vh] bg-black/50'>
					<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[90vh] bg-background'>
						<div className='flex flex-col justify-between h-full'>
							<div className='flex flex-col gap-4'>
								<div className='flex justify-center pt-1'>
									<Sheet.Handle
										className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
										action='dismiss'
									/>
								</div>
								<div className='flex flex-col gap-2 px-4'>
									<Sheet.Title className='text-lg font-semibold'>
										{recipe.name}
									</Sheet.Title>
									<Sheet.Description className='flex gap-1 justify-between items-center py-1 px-4 text-xs font-normal rounded-full shadow-md bg-primary text-background'>
										<span>{`${(Number(cals) * scale).toFixed(0)} cals`}</span>
										<span>{`${(Number(protein) * scale).toFixed(0)} protein`}</span>
										<span>{`${(Number(carbs) * scale).toFixed(0)} carbs`}</span>
										<span>{`${(Number(fat) * scale).toFixed(0)} fat`}</span>
									</Sheet.Description>
									<div className='grid grid-cols-4 gap-2 place-items-center mt-4'>
										<Label>Serves</Label>
										<div className='flex col-span-3 gap-3 items-center w-full'>
											<Input
												placeholder='Scale'
												className='max-w-[52px]'
												type='number'
												value={scale}
												onChange={(e) => {
													setScale(Number(e.target.value))
												}}
											/>
											<Slider
												min={0}
												max={10}
												step={0.25}
												value={[scale]}
												onValueChange={(newValue) => {
													if (!newValue[0]) return
													setScale(newValue[0])
												}}
											/>
											<RotateCcw
												size={32}
												className='text-muted-foreground'
												onClick={() => {
													setScale(1)
												}}
											/>
										</div>
									</div>
								</div>
								<ScrollArea className='px-0 pt-0 h-[calc(90vh-190px)]'>
									{userPlan.userIngredients
										.filter(
											(ingredient) =>
												ingredient.mealIndex === mealIndex &&
												ingredient.recipeIndex === recipeIndex,
										)
										.map((ingredient) => {
											const serve = scale * Number(ingredient.serve)
											const calories =
												(Number(serve) /
													Number(ingredient.ingredient?.serveSize)) *
												Number(ingredient.ingredient?.caloriesWOFibre)
											const altSize =
												(calories /
													Number(
														ingredient.alternateIngredient?.caloriesWOFibre,
													)) *
												Number(ingredient.alternateIngredient?.serveSize)
											return (
												<div
													key={ingredient.id}
													className='flex flex-col gap-0'
												>
													<div className='grid grid-cols-6 py-2 px-1 w-full text-sm bg-secondary'>
														<div className='col-span-5 truncate'>
															{ingredient.name}
														</div>
														<div className='place-self-end'>{`${serve.toFixed(0)}${
															ingredient.serveUnit === 'each'
																? 'ea'
																: ingredient.serveUnit === 'grams'
																	? 'g'
																	: ingredient.serveUnit
														}`}</div>
													</div>
													{ingredient.alternateIngredient ? (
														<div className='grid grid-cols-6 py-0 px-1 w-full text-xs font-light bg-secondary'>
															<div className='col-span-5 truncate'>
																or {ingredient.alternateIngredient.name}
															</div>
															<div className='place-self-end'>{`${altSize.toFixed(0)}${ingredient.alternateIngredient?.serveUnit?.slice(0, 1)}`}</div>
														</div>
													) : null}
												</div>
											)
										})}
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

const UserPlanView = ({ userPlan }: { userPlan: UserPlan }) => {
	return (
		<Card className=''>
			<CardHeader className='pb-0'>
				<CardTitle className='text-center'>{userPlan?.name}</CardTitle>
			</CardHeader>
			<CardContent className='flex flex-col gap-2 px-2'>
				{userPlan?.userMeals.map((meal) => (
					<div className='flex flex-col gap-2' key={meal.id}>
						<div className='flex gap-2 justify-between items-center'>
							<Label className=''>{meal.mealTitle}</Label>
							<div className='flex gap-1 text-xs tracking-tighter text-muted-foreground'>
								{meal.targetCalories !== '' ? (
									<div>{`${meal.targetCalories} cals`}</div>
								) : null}
								{meal.targetProtein !== '' ? (
									<div>{`${meal.targetProtein}g Protien`}</div>
								) : null}
							</div>
						</div>
						<div className='flex flex-row flex-wrap gap-2 pl-0'>
							{userPlan.userRecipes
								.filter((recipe) => recipe.mealIndex === meal.mealIndex)
								.map((recipe) => (
									<UserPlanRecipe
										key={recipe.id}
										userPlan={userPlan}
										mealIndex={meal.mealIndex}
										recipeIndex={recipe.recipeIndex}
									/>
								))}
						</div>
						{meal.veges !== '' && (
							<div className='grid grid-cols-1 place-items-center w-[50px]'>
								<div className='w-min'>&</div>
								<UserPlanVege userPlan={userPlan} mealIndex={meal.mealIndex} />
							</div>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	)
}

export { UserPlanView }
