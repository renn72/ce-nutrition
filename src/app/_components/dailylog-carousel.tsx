'use client'

import { DailyLogCard } from '@/components/daily-log/daily-log-card'

import type { GetDailyLogById, GetUserWRoles } from '@/types'

const DailyLogCarousel = ({
	dailyLogs,
	currentUser,
}: {
	dailyLogs: GetDailyLogById[]
	currentUser: GetUserWRoles
}) => {
	// 1. Define your dates
	const todayStr = new Date().toDateString()
	const yesterdayStr = new Date(Date.now() - 86400000).toDateString()

	// 2. Find the logs directly from your display data (the cached + fresh array)
	const todaysDailyLog = dailyLogs?.find((log) => log?.date === todayStr)
	const yesterdaysDailyLog = dailyLogs?.find(
		(log) => log?.date === yesterdayStr,
	)

	return (
		<>
			<DailyLogCard
				title={'Today'}
				dailyLog={todaysDailyLog}
				yesterdaysDailyLog={yesterdaysDailyLog}
				date={new Date()}
				currentUser={currentUser}
				isCreator={false}
				className='pb-10 mb-20'
				isWidthFull={true}
			/>
		</>
	)
}

export default DailyLogCarousel
