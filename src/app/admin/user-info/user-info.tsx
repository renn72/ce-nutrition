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
		<div className='p-2 xl:p-4 w-full'>
			<div className='grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-3 gap-2 lg:gap-4 w-[calc(100vw-16px)] lg:w-full lg:h-[calc(100vh-65px)] xl:h-[calc(100vh-80px)] '>
				<UserMessages
          className='lg:row-span-2'
          currentUser={currentUser} userId={userId} />
				<UserWeight
          user={user} dailyLogs={dailyLogs} />
				<UserGoals
          user={user} userGoals={userGoals} />
				<UserCurrentPlan
          user={user} />
				<UserSupplementPlan
          user={user} />
				<UserRecentMetrics
          user={user} />
				<UserNotes
          user={user} userNotes={userNotes} />
				<UserCharts
          className='lg:col-span-2 row-span-1'
          dailyLogs={dailyLogs} currentUser={user} />
				<UserMeals
          className=' lg:col-span-2 max-h-[450px]'
          dailyLogs={dailyLogs} currentUser={user} />
				<UserDailyLogsTable
          className=' lg:col-span-3 max-h-[450px]'
          dailyLogs={dailyLogs}
        />
			</div>
		</div>
	)
}

export { UserInfo }
