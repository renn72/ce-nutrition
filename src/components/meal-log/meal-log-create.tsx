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
							'text-sm truncate max-w-[600px]  py-3 px-4 border font-bold h-[62px] rounded-md ',
							'shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0 items-center justify-center',
							'hover:text-primary hover:bg-background',
						)}
					>
						Create
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
										<div className='flex justify-center items-center gap-6'>
											<Sheet.Title className='text-xl mt-[2px] font-semibold'>
												Create Meal
											</Sheet.Title>
											<Sheet.Description className='hidden'>
												create a new meal
											</Sheet.Description>
										</div>
									</div>
										<FormRecipe recipe={null} />
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
