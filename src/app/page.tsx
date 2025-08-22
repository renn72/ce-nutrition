'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { UserCurrentPlan } from '@/app/admin/user-info/user-current-plan'
import { UserDailyLogsTable } from '@/app/admin/user-info/user-daily-logs-table'
import { UserGoals } from '@/app/admin/user-info/user-goals'
import { UserMeals } from '@/app/admin/user-info/user-meals'
import { UserRecentMetrics } from '@/app/admin/user-info/user-recent-metrics'
import { UserSupplementPlan } from '@/app/admin/user-info/user-supplement-plan'
import { UserWeight } from '@/app/admin/user-info/user-weight'
import { impersonatedUserAtom } from '@/atoms'
import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { cn } from '@/lib/utils'
import type { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { XIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

import { UserCharts } from '@/components/charts/user-charts'
import { MobileFooter } from '@/components/layout/mobile-footer'
import { MobileHeader } from '@/components/layout/mobile-header'
import { MealLog } from '@/components/meal-log/meal-log'
import { PoopLog } from '@/components/poop-log/poop-log'
import { SuppLog } from '@/components/supp-log/supp-log'
import { WaterLog } from '@/components/water-log/water-log'

import DailyLogCarousel from './_components/dailylog-carousel'
import { User } from '@/components/auth/user'
import { Pwa } from '@/components/layout/pwa'

export const dynamic = 'force-dynamic'

const Mobile = ({
	userId,
	currentUser,
}: {
	userId: string
	currentUser: GetUserById
}) => {
	const ctx = api.useUtils()
	const { data: dailyLogs, isLoading: dailyLogsLoading } =
		api.dailyLog.getAllUser.useQuery(userId)
	const [isCreatingLog, setIsCreatingLog] = useState(false)

	const { mutate: createDailyLog } = api.dailyLog.create.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
			setTimeout(() => {
				setIsCreatingLog(false)
			}, 200)
		},
		onError: () => {
			toast.error('error conflict')
		},
	})

	const dailyLog = dailyLogs?.find(
		(log) => log.date === new Date().toDateString(),
	)

	useEffect(() => {
		if (dailyLogsLoading) return
		if (isCreatingLog) return
		if (!dailyLog) {
			setIsCreatingLog(true)
			try {
				setTimeout(() => {
					createDailyLog({
						date: new Date().toDateString(),
						userId: currentUser.id,
					})
				}, 200)
			} catch (_err) {}
		}
	}, [dailyLogs])

	const isSupplements = currentUser.roles.find(
		(role) => role.name === 'supplements',
	)

	if (dailyLogsLoading) return null

	return (
		<div className={cn('flex flex-col gap-2 w-full mt-16 items-center mb-16 ')}>
			<MobileHeader isDesktop={false} />
      <Pwa />
			<div
				className={cn(
					'flex flex-col gap-4 w-full max-w-screen-xl main-content',
				)}
			>
				<UserCharts
					dailyLogs={dailyLogs}
					isMoblie={true}
					currentUser={currentUser}
				/>

				<Card className='py-2 '>
					<CardContent className='px-0 py-0'>
						<div className='flex justify-between w-full'>
							<WaterLog
								userId={userId}
								dailyLogs={dailyLogs}
								defaultAmount={Number(
									currentUser?.settings?.defaultWater ?? 600,
								)}
								settingsId={currentUser.settings.id}
							/>
							<MealLog dailyLogs={dailyLogs} currentUser={currentUser} />
							{isSupplements ? (
								<SuppLog userId={userId} dailyLogs={dailyLogs} />
							) : null}
							<PoopLog userId={userId} dailyLogs={dailyLogs} />
						</div>
					</CardContent>
				</Card>
				<DailyLogCarousel currentUser={currentUser} dailyLogs={dailyLogs} />
			</div>
			<MobileFooter />
		</div>
	)
}

const Desktop = ({
	userId,
	currentUser : user,
}: {
	userId: string
	currentUser: GetUserById
}) => {
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
	const { data: userGoals, isLoading: userGoalsLoading } =
		api.goal.getUser.useQuery({ userId: userId })

	if (!user) return null
	if (!dailyLogs) return null
	if (userGoalsLoading) return null

	return (
		<div className='p-4 flex flex-wrap gap-4 w-screen lg:h-screen relative'>
      <div className='absolute top-1 right-1 z-100'>
      <User />
      </div>

			<div className='grid grid-cols-5 grid-rows-3 gap-4 w-full h-[calc(100vh-32px)]'>
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
				<UserCharts
          className='col-span-3 row-span-1'
          dailyLogs={dailyLogs} currentUser={user} />
				<UserMeals
          className='col-span-2'
          dailyLogs={dailyLogs} currentUser={user} />
				<UserDailyLogsTable
          className='col-span-5'
          dailyLogs={dailyLogs}
        />
			</div>
		</div>
	)
}

export default function Home() {
	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})
	const isMobile = useClientMediaQuery('(max-width: 600px)')

	if (isLoading) return null
	if (!currentUser) return null
	return (
		<div className='flex min-h-screen flex-col relative'>
			{isMobile ? (
				<Mobile userId={currentUser.id} currentUser={currentUser} />
			) : (
				<Desktop userId={currentUser.id} currentUser={currentUser} />
			)}
			{impersonatedUser.id !== '' ? (
				<div className='fixed bottom-14 left-1/2 -translate-x-1/2 opacity-80'>
					<Badge className='flex gap-4'>
						{impersonatedUser.name}
						<XIcon
							size={12}
							className='cursor-pointer'
							onClick={() => {
								setImpersonatedUser({
									id: '',
									name: '',
								})
							}}
						/>
					</Badge>
				</div>
			) : null}
		</div>
	)
}
