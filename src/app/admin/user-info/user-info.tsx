'use client'

import { api } from '@/trpc/react'

import { UserCharts } from '@/components/charts/user-charts'

import { UserGoals } from './user-goals'
import { UserWeight } from './user-weight'
import { UserMeals } from './user-meals'

const UserInfo = ({ userId }: { userId: string }) => {
	const { data: user } = api.user.get.useQuery(userId)
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
	const { data: userGoals, isLoading: userGoalsLoading } =
		api.goal.getUser.useQuery({ userId: userId })

	if (!user) return null
	if (!dailyLogs) return null
	if (userGoalsLoading) return null

	return (
		<div className="p-4 flex flex-wrap gap-4 w-full">
			<UserWeight user={user} dailyLogs={dailyLogs} />
			<UserGoals user={user} userGoals={userGoals} />
			<div className="w-[616px]">
				<UserCharts dailyLogs={dailyLogs} currentUser={user} />
			</div>
			<div className="w-[616px]">
				<UserMeals dailyLogs={dailyLogs} currentUser={user} />
			</div>
		</div>
	)
}

export { UserInfo }
