'use client'

import type { GetUserById } from '@/types'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const UserCurrentPlan = ({ user }: { user: GetUserById }) => {
	if (!user) return null

	const activePlans = user.userPlans.filter((plan) => plan.isActive)

	if (activePlans.length === 0) {
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
    <div className='border rounded-lg p-4 flex flex-col w-[300px] items-start gap-2 max-h-[450px] min-h-[300px] overflow-y-auto'>
      <h1 className='text-xl font-semibold'>Active Plans</h1>
			{activePlans.map((plan) => {
        const cals = plan.userMeals.reduce((acc, meal) => acc + Number(meal.targetCalories), 0)
        const protein = plan.userMeals.reduce((acc, meal) => acc + Number(meal.targetProtein), 0)
        const numMeals = plan.userMeals.length
				return (
					<Card key={plan.id}
            className=' py-2 px-2 gap-0 w-full '
          >
						<CardHeader className='px-0 py-0'>
							<div className='flex justify-between items-center'>
								<CardTitle className='pb-0'>{plan.name}</CardTitle>
							</div>
						</CardHeader>
						<CardContent className='px-0 py-0'>
              <div className='flex justify-between items-center'>
                <p className='text-sm'>{cals} cals</p>
                <p className='text-sm'>{protein}g protein</p>
                <p className='text-sm'>{numMeals} meals</p>
              </div>
						</CardContent>
					</Card>
				)
			})}
		</div>
	)
}

export { UserCurrentPlan }
