'use client'

import { api } from '@/trpc/react'

import { UserCharts } from '@/components/charts/user-charts'

import { UserCurrentPlan } from './user-current-plan'
import { UserDailyLogsTable } from './user-daily-logs-table'
import { UserGoals } from './user-goals'
import { UserMeals } from './user-meals'
import { UserMessages } from './user-messages'
import { UserNotes } from './user-notes'
import { UserRecentMetrics } from './user-recent-metrics'
import { UserSupplementPlan } from './user-supplement-plan'
import { UserWeight } from './user-weight'

const UserInfo = ({ userId }: { userId: string }) => {
	const { data: user } = api.user.get.useQuery(userId)
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
	const { data: userGoals, isLoading: userGoalsLoading } =
		api.goal.getUser.useQuery({ userId: userId })
	const { data: currentUser } = api.user.getCurrentUser.useQuery()

	const { data: userNotes, isLoading: userNotesLoading } =
		api.trainerNotes.getAllUser.useQuery({ userId: userId })

	if (!currentUser) return null
	if (!user) return null
	if (!dailyLogs) return null
	if (userGoalsLoading) return null
	if (userNotesLoading) return null

	return (
		<div className='p-4 w-full'>
			<div className='grid grid-cols-5 grid-rows-3 gap-4 w-full'>
				<UserMessages
          className='row-span-2'
          currentUser={currentUser} userId={userId} />
				<UserWeight
          className='h-[454px]'
          user={user} dailyLogs={dailyLogs} />
				<UserGoals
          className='h-[454px]'
          user={user} userGoals={userGoals} />
				<UserCurrentPlan
          className='h-[454px]'
          user={user} />
				<UserSupplementPlan
          className='h-[454px]'
          user={user} />
				<UserRecentMetrics
          className='h-[454px]'
          user={user} />
				<UserNotes
          className='h-[454px]'
          user={user} userNotes={userNotes} />
				<UserCharts
          className='col-span-2 row-span-1'
          dailyLogs={dailyLogs} currentUser={user} />
				<UserMeals
          className='h-[454px] col-span-2'
          dailyLogs={dailyLogs} currentUser={user} />
				<UserDailyLogsTable
          className='h-[454px] col-span-3'
          dailyLogs={dailyLogs}
        />
			</div>
		</div>
	)
}

export { UserInfo }
