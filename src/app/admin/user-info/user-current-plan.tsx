'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserSpinner } from './user-spinner'

const UserCurrentPlan = ({
	userId,
	className,
}: {
	userId: string
	className?: string
}) => {
	const { data: activePlans, isLoading: activePlanLoading } =
		api.userPlan.getUserActivePlan.useQuery(userId)

	if (activePlanLoading) return <UserSpinner />

	if (activePlans?.length === 0 || !activePlans) {
		return (
			<div className='w-[300px]'>
				<Card>
					<CardHeader>
						<CardTitle>Active Plan</CardTitle>
					</CardHeader>
					<CardContent>
						<p>No active plan.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div
			className={cn(
				'border rounded-lg p-2 xl:p-4 flex flex-col items-start gap-2 overflow-y-auto',
				className,
			)}
		>
			<h1 className='text-xl font-semibold'>Active Plans</h1>
			{activePlans.map((plan) => {
				const cals = plan.userMeals.reduce(
					(acc, meal) => acc + Number(meal.targetCalories),
					0,
				)
				const protein = plan.userMeals.reduce(
					(acc, meal) => acc + Number(meal.targetProtein),
					0,
				)
				const numMeals = plan.userMeals.length
				return (
					<Card
						key={plan.id}
						className='gap-0 py-2 px-1 w-full xl:py-2 xl:px-2'
					>
						<CardHeader className='py-0 px-0'>
							<div className='flex justify-between items-center'>
								<CardTitle className='pb-0'>{plan.name}</CardTitle>
							</div>
						</CardHeader>
						<CardContent className='py-0 px-0'>
							<div className='flex justify-between items-center'>
								<p className='text-xs xl:text-sm'>{cals.toFixed(0)} cals</p>
								<p className='text-xs xl:text-sm'>{protein.toFixed(1)} g</p>
								<p className='text-xs xl:text-sm'>{numMeals} meals</p>
							</div>
						</CardContent>
					</Card>
				)
			})}
		</div>
	)
}

export { UserCurrentPlan }
