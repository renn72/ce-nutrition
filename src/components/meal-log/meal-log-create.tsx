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
import { Sheet } from '@silk-hq/components'
import { useAtom } from 'jotai'
import {
	ArrowBigLeftDash,
	ArrowBigRightDash,
	ChevronDown,
	Salad,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { Label } from '../ui/label'
import { isAllMealsAtom, selectedPlansAtom } from './atoms'
import { FormRecipe } from './form-recipe'
import { MealBottomSheet } from './meal-bottom-sheet'

export const dynamic = 'force-dynamic'

const UserCreatedRecipes = ({
	currentUser,
	calories,
	protein,
}: {
	currentUser: GetUserById
	calories: number
	protein: number
}) => {
	const { data: userRecipes, isLoading: isLoadingUserRecipes } =
		api.recipe.getAllUserCreated.useQuery({
			userId: currentUser.id,
		})

	const [isFormOpen, setIsFormOpen] = useState(false)

	console.log('userRecipes', userRecipes)

	return (
		<div className='flex flex-col w-full items-center'>
			<div className='h-16 w-full border-b-[1px] border-primary/20' />
			{isFormOpen ? (
				<FormRecipe recipe={null} />
			) : (
				<div className='flex flex-col gap-4 w-full items-center mt-6'>
					{userRecipes?.map((recipe) => {
						const cals = 100
						const protein = 100
						const carbs = 100
						const fat = 100
						return (
							<div
								key={recipe?.id}
								className={cn(
									'text-sm truncate max-w-[600px]  py-3 px-4 relative border rounded-md',
									'h-full shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0',
									'hover:text-primary hover:bg-background items-center justify-center',
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
											'text-muted-foreground',
										)}
									>{`${cals} cals`}</div>
								</div>

								<div
									className={cn(
										'text-xs flex gap-4 font-medium',
										'text-muted-foreground',
									)}
								>
									<div>{`C:${carbs}g`}</div>
									<div>{`P:${protein}g`}</div>
									<div>{`F:${fat}g`}</div>
								</div>
							</div>
						)
					})}
            <Button
              onClick={(e) => {
                e.preventDefault()
                setIsFormOpen(true)
              }}
              variant='outline'
              size='lg'
              className='w-[calc(100vw-2rem)] h-16'
            >
              Create New
            </Button>
				</div>
			)}
		</div>
	)
}

const MealLogCreate = ({
	currentUser,
	calories,
	protein,
}: {
	currentUser: GetUserById
	calories: number
	protein: number
}) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='flex flex-col gap-0 w-full items-center'>
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
						Your Recipes
					</div>
				</Sheet.Trigger>
				<Sheet.Portal>
					<Sheet.View className='z-[1000] h-[100vh] bg-black/50 '>
						<Sheet.Content className='min-h-[200px] max-h-[90vh] h-full rounded-t-3xl bg-background relative'>
							<div className='flex flex-col justify-between h-full'>
								<div className='flex flex-col '>
									<div className='flex justify-center pt-1'>
										<Sheet.Handle
											className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
											action='dismiss'
										/>
									</div>
									<div className=''>
										<div className='flex justify-center items-center flex-col '>
											<Sheet.Title className='text-xl mt-[2px] font-semibold'>
												Recipes
											</Sheet.Title>
											<Sheet.Description className='hidden'>
												create a new meal
											</Sheet.Description>
											<div className='flex gap-4 w-full items-baseline justify-center'>
												<div className='flex items-center  gap-2'>
													<NumberFlow
														value={calories}
														className='text-lg text-primary ml-2 '
													/>
													<span className='text-xs text-primary/50 ml-[1px]'>
														cals
													</span>
												</div>
												<div className='flex items-center gap-2'>
													<NumberFlow
														value={protein}
														className='text-lg text-primary ml-2 '
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
									/>
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
		</div>
	)
}

export { MealLogCreate }
