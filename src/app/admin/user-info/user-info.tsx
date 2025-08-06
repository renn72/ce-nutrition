'use client'

import { api } from '@/trpc/react'

import { UserCharts } from '@/components/charts/user-charts'

import { UserCurrentPlan } from './user-current-plan'
import { UserDailyLogsTable } from './user-daily-logs-table'
import { UserGoals } from './user-goals'
import { UserMeals } from './user-meals'
import { UserNotes } from './user-notes'
import { UserWeight } from './user-weight'

const UserInfo = ({ userId }: { userId: string }) => {
	const { data: user } = api.user.get.useQuery(userId)
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
	const { data: userGoals, isLoading: userGoalsLoading } =
		api.goal.getUser.useQuery({ userId: userId })

	const { data: userNotes, isLoading: userNotesLoading } =
		api.trainerNotes.getAllUser.useQuery({ userId: userId })

	if (!user) return null
	if (!dailyLogs) return null
	if (userGoalsLoading) return null
	if (userNotesLoading) return null

	return (
		<div className="p-4 flex flex-wrap gap-4 w-full">
			<UserWeight user={user} dailyLogs={dailyLogs} />
			<UserGoals user={user} userGoals={userGoals} />
			<UserCurrentPlan user={user} />
			<div className="w-[616px]">
				<UserNotes user={user} userNotes={userNotes} />
			</div>
			<div className="w-[616px]">
				<UserCharts dailyLogs={dailyLogs} currentUser={user} />
			</div>
			<div className="w-[616px]">
				<UserMeals dailyLogs={dailyLogs} currentUser={user} />
			</div>
			<div className="w-full">
				<UserDailyLogsTable dailyLogs={dailyLogs} />
			</div>
		</div>
	)
}

export { UserInfo }
