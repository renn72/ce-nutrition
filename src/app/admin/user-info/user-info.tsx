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

import { useAtomValue } from 'jotai'
import { impersonatedUserAtom } from '@/atoms'

const UserInfo = ({ userId }: { userId: string }) => {
	const { data: user } = api.user.getInfoPage.useQuery(userId)
	const { data: dailyLogs } = api.dailyLog.getUserLimit.useQuery({
		id: userId,
		limit: 30,
	})
	const { data: userGoals, isLoading: userGoalsLoading } =
		api.goal.getUser.useQuery({ userId: userId })
	const impersonatedUser = useAtomValue(impersonatedUserAtom)
	const { data: currentUser } = api.user.getCurrentUserRoles.useQuery(
		impersonatedUser || '',
	)

	const { data: userNotes, isLoading: userNotesLoading } =
		api.trainerNotes.getAllUser.useQuery({ userId: userId })

	if (!currentUser) return null
	if (!user) return null
	if (!dailyLogs) return null
	if (userGoalsLoading) return null
	if (userNotesLoading) return null

	return (
		<div className='p-2 w-full xl:p-4'>
			<div className='grid grid-cols-1 gap-2 lg:grid-cols-5 lg:grid-rows-3 lg:gap-4 lg:w-full w-[calc(100vw-16px)] lg:h-[calc(100vh-65px)] xl:h-[calc(100vh-80px)]'>
				<UserMessages
					className='lg:row-span-1'
					currentUserId={currentUser.id}
					userId={userId}
				/>
				<UserWeight dailyLogs={dailyLogs} />
				<UserGoals userId={userId} userGoals={userGoals} />
				<UserCurrentPlan userId={userId} />
				<UserSupplementPlan user={user} />
				<UserRecentMetrics userId={userId} />
				<UserNotes userId={userId} userNotes={userNotes} />
				<UserCharts
					className='row-span-1 lg:col-span-3'
					dailyLogs={dailyLogs}
					// @ts-ignore
					currentUser={user}
				/>
				<UserMeals
					className='lg:col-span-2 max-h-[450px]'
					dailyLogs={dailyLogs}
				/>
				<UserDailyLogsTable
					className='lg:col-span-3 max-h-[450px]'
					dailyLogs={dailyLogs}
				/>
			</div>
		</div>
	)
}

export { UserInfo }
