'use client'

import { api } from '@/trpc/react'

import { impersonatedUserAtom } from '@/atoms'
import { getUserShoppingWeightUnit } from '@/lib/shopping-list'
import { useAtom } from 'jotai'

import { ShoppingListDialog } from '@/components/shopping-list/shopping-list-dialog'
import { UserPlanView } from '@/components/user-plan/user-plan-view'

export default function Home() {
	const [impersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: user, isLoading } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})

	if (isLoading || !user) return null
	const plans = user?.userPlans.filter((plan) => plan.isActive)
	const shoppingWeightUnit = getUserShoppingWeightUnit(user.settings)

	if (!plans) return null

	return (
		<div className='my-16'>
			<div className='flex flex-col gap-8 w-full'>
				{plans?.map((plan, index) => (
					<UserPlanView
						key={plan.id}
						userPlan={plan}
						accentIndex={index}
						isDefaultOpen={false}
						shoppingWeightUnit={shoppingWeightUnit}
					/>
				))}
			</div>
			<ShoppingListDialog
				userId={user.id}
				userName={user.name}
				shoppingWeightUnit={shoppingWeightUnit}
			/>
		</div>
	)
}
