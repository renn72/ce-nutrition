'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetRecipeById, GetUserById } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, Loader, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { FormRecipe } from './form-recipe'

export const dynamic = 'force-dynamic'

const CreateRecipe = ({
	calories,
	protein,
	currentUser,
	isOpen,
	setIsOpen,
	recipe,
	setSelectedRecipe,
	setIsRecipeListOpen,
	logId,
	mealIndex,
}: {
	calories: number
	protein: number
	currentUser: GetUserById
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	recipe: GetRecipeById | null
	setSelectedRecipe: React.Dispatch<React.SetStateAction<GetRecipeById | null>>
	setIsRecipeListOpen: React.Dispatch<React.SetStateAction<boolean>>
	logId: number
	mealIndex: number
}) => {
	return (
		<Sheet.Root
			license='non-commercial'
			presented={isOpen}
			onPresentedChange={setIsOpen}
		>
			<Sheet.Trigger
				onClick={() => {
					setSelectedRecipe(null)
				}}
			>
				<div
					className={cn(
						'text-sm truncate max-w-[600px]  py-3 px-4 border font-bold h-[40px] rounded-md ',
						'shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0 items-center justify-center',
						'hover:text-primary hover:bg-background',
					)}
				>
					Create New
				</div>
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View
					onClickOutside={(e) => {
						e.changeDefault({ dismiss: false })
					}}
					className='z-[1002] h-[100vh] bg-black/50'
				>
					<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[90vh] bg-background'>
						<div className='flex flex-col justify-between h-full'>
							<div className='flex flex-col'>
								<div className='flex justify-center pt-1'>
									<Sheet.Handle
										className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
										action='dismiss'
									/>
								</div>
								<div className=''>
									<div className='flex flex-col justify-center items-center'>
										<Sheet.Title className='text-xl font-semibold mt-[2px]'>
											Recipes
										</Sheet.Title>
										<Sheet.Description className='hidden'>
											create a new meal
										</Sheet.Description>
										<div className='flex gap-4 justify-center items-baseline rounded-full w-[calc(100vw-2rem)] bg-secondary'>
											<div className='flex gap-1 items-center text-lg font-bold tracking-tight'>
												{`Meal ${mealIndex + 1} Target`}
											</div>
											<div className='flex gap-2 items-center'>
												<NumberFlow
													value={calories}
													className='ml-2 text-lg font-bold text-primary'
												/>
												<span className='text-xs text-primary/50 ml-[1px]'>
													cals
												</span>
											</div>
											<div className='flex gap-2 items-center'>
												<NumberFlow
													value={protein}
													className='ml-2 text-lg font-bold text-primary'
												/>
												<span className='text-xs text-primary/50 ml-[1px]'>
													protein
												</span>
											</div>
										</div>
									</div>
								</div>
								<FormRecipe
									recipe={recipe}
									setIsOpen={setIsOpen}
									setIsRecipeListOpen={setIsRecipeListOpen}
									logId={logId}
									mealIndex={mealIndex}
									protein={protein}
									calories={calories}
								/>
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

const UserCreatedRecipes = ({
	currentUser,
	calories,
	protein,
	setIsRecipeListOpen,
	logId,
	mealIndex,
}: {
	currentUser: GetUserById
	calories: number
	protein: number
	setIsRecipeListOpen: React.Dispatch<React.SetStateAction<boolean>>
	logId: number
	mealIndex: number
}) => {
	const [timeoutCodeAdd, setTimeoutCodeAdd] = useState<NodeJS.Timeout | null>(
		null,
	)

	const ctx = api.useUtils()
	const { data: userRecipes, isLoading: isLoadingUserRecipes } =
		api.recipe.getAllUserCreated.useQuery({
			userId: currentUser.id,
		})
	const { mutate: deleteRecipe } = api.recipe.delete.useMutation({
		onSuccess: () => {
			ctx.recipe.invalidate()
		},
		onSettled: () => {
			ctx.recipe.invalidate()
		},
		onMutate: async (recipe) => {
			await ctx.recipe.getAllUserCreated.cancel()

			if (timeoutCodeAdd) clearTimeout(timeoutCodeAdd)
			const timeout = setTimeout(() => {
				ctx.dailyLog.invalidate()
				setTimeoutCodeAdd(null)
			}, 2000)
			setTimeoutCodeAdd(timeout)

			const previousRecipes = ctx.recipe.getAllUserCreated.getData({
				userId: currentUser.id,
			})
			ctx.recipe.getAllUserCreated.setData(
				{ userId: currentUser.id },
				previousRecipes?.filter((currRecipe) => currRecipe.id !== recipe.id),
			)
			return { previousRecipes }
		},
		onError: (err, recipe, context) => {
			ctx.recipe.getAllUserCreated.setData(
				{ userId: currentUser.id },
				context?.previousRecipes,
			)
		},
	})

	const [selectedRecipe, setSelectedRecipe] = useState<GetRecipeById | null>(
		null,
	)
	const [isRecipeFormOpen, setIsRecipeFormOpen] = useState(false)

	return (
		<div className='flex flex-col items-center w-full'>
			<div className='w-full h-10 border-b-[1px] border-primary/20' />
			<div className='flex flex-col gap-4 items-center mt-6 w-full'>
				{userRecipes?.map((recipe) => {
					const cals = recipe?.recipeToIngredient.reduce((acc, curr) => {
						const cal = Number(curr?.ingredient?.caloriesWOFibre)
						const scale =
							Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
						return acc + cal * scale
					}, 0)

					const protein = recipe?.recipeToIngredient.reduce((acc, curr) => {
						const cal = Number(curr?.ingredient?.protein)
						const scale =
							Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
						return acc + cal * scale
					}, 0)

					const carbs = recipe?.recipeToIngredient.reduce((acc, curr) => {
						const cal = Number(
							curr?.ingredient?.availableCarbohydrateWithoutSugarAlcohols,
						)
						const scale =
							Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
						return acc + cal * scale
					}, 0)

					const fat = recipe?.recipeToIngredient.reduce((acc, curr) => {
						const cal = Number(curr?.ingredient?.fatTotal)
						const scale =
							Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
						return acc + cal * scale
					}, 0)

					return (
						<div
							key={recipe?.id}
							className={cn(
								'text-sm truncate max-w-[600px]  py-3 px-4 relative border rounded-md',
								'shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0',
								'hover:text-primary hover:bg-background items-center justify-center',
								'relative',
							)}
							onClick={() => {
								setSelectedRecipe(recipe)
								setIsRecipeFormOpen(true)
							}}
						>
							<div className='flex'>
								<div className='font-semibold truncate'>
									{recipe?.name && recipe?.name?.length > 41
										? `${recipe?.name.slice(0, 41)}...`
										: recipe?.name}
								</div>
								<div
									className={cn(
										'absolute -top-1 left-1 text-[0.6rem] font-light',
										'text-muted-foreground',
									)}
								>{`${cals.toFixed(0)} cals`}</div>
							</div>

							<div
								className={cn(
									'text-xs flex gap-4 font-medium',
									'text-muted-foreground',
								)}
							>
								<div>{`C:${carbs.toFixed(0)}g`}</div>
								<div>{`P:${protein.toFixed(1)}g`}</div>
								<div>{`F:${fat.toFixed(1)}g`}</div>
							</div>
							<Button
								size='icon'
								className='absolute right-1 top-1/2 h-6 text-xs rounded-full transition-transform transform -translate-y-1/2 cursor-pointer active:scale-90'
								variant='destructive'
								onClick={(e) => {
									e.stopPropagation()
									e.preventDefault()
									deleteRecipe({
										id: recipe.id,
									})
								}}
							>
								<Trash2 size={16} strokeWidth={2} className='' />
							</Button>
						</div>
					)
				})}
				<CreateRecipe
					calories={calories}
					protein={protein}
					currentUser={currentUser}
					isOpen={isRecipeFormOpen}
					setIsOpen={setIsRecipeFormOpen}
					recipe={selectedRecipe}
					setSelectedRecipe={setSelectedRecipe}
					setIsRecipeListOpen={setIsRecipeListOpen}
					logId={logId}
					mealIndex={mealIndex}
				/>
			</div>
		</div>
	)
}

const MealLogUserRecipes = ({
	currentUser,
	calories,
	protein,
	logId,
	mealIndex,
}: {
	currentUser: GetUserById
	calories: number
	protein: number
	logId: number
	mealIndex: number
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='flex flex-col gap-0 items-center w-full'>
			<Sheet.Root
				license='non-commercial'
				presented={isOpen}
				onPresentedChange={setIsOpen}
			>
				<Sheet.Trigger>
					<div
						className={cn(
							'text-sm truncate max-w-[600px]  py-3 px-4 border font-bold h-[40px] rounded-md ',
							'shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0 items-center justify-center',
							'hover:text-primary hover:bg-background',
						)}
					>
						Create a Meal
					</div>
				</Sheet.Trigger>
				<Sheet.Portal>
					<Sheet.View className='z-[1000] h-[100vh] bg-black/50'>
						<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[90vh] bg-background'>
							<div className='flex flex-col justify-between h-full'>
								<div className='flex flex-col'>
									<div className='flex justify-center pt-1'>
										<Sheet.Handle
											className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
											action='dismiss'
										/>
									</div>
									<div className=''>
										<div className='flex flex-col justify-center items-center'>
											<Sheet.Title className='text-xl font-semibold mt-[2px]'>
												Recipes
											</Sheet.Title>
											<Sheet.Description className='hidden'>
												create a new meal
											</Sheet.Description>
											<div className='flex gap-4 justify-center items-baseline rounded-full w-[calc(100vw-5rem)] bg-secondary'>
												<div className='flex gap-2 items-center text-lg font-bold'>
													{`Meal ${mealIndex + 1}`}
												</div>
												<div className='flex gap-2 items-center'>
													<NumberFlow
														value={calories}
														className='ml-2 text-lg font-bold text-primary'
													/>
													<span className='text-xs text-primary/50 ml-[1px]'>
														cals
													</span>
												</div>
												<div className='flex gap-2 items-center'>
													<NumberFlow
														value={protein}
														className='ml-2 text-lg font-bold text-primary'
													/>
													<span className='text-xs text-primary/50 ml-[1px]'>
														protein
													</span>
												</div>
											</div>
										</div>
									</div>
									<UserCreatedRecipes
										currentUser={currentUser}
										calories={calories}
										protein={protein}
										setIsRecipeListOpen={setIsOpen}
										logId={logId}
										mealIndex={mealIndex}
									/>
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
		</div>
	)
}

export { MealLogUserRecipes }
