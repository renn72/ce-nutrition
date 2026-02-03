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
import type { GetUserWRoles, GetAllDailyLogs } from '@/types'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
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

const currentUserAtom = atomWithStorage<GetUserWRoles | null>(
	'currentUser',
	null,
)
const dailyLogsCacheAtom = atomWithStorage<GetAllDailyLogs | null>(
	'cached_daily_logs',
	null,
)

const Mobile = ({
	userId,
	currentUser,
}: {
	userId: string
	currentUser: GetUserWRoles
}) => {
	const [cachedLogs, setCachedLogs] = useAtom(dailyLogsCacheAtom)
	const ctx = api.useUtils()
	const { data: apiDailyLogs, isLoading: dailyLogsLoading } =
		api.dailyLog.getAllCurrentUser.useQuery({ id: userId })
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

	useEffect(() => {
		if (apiDailyLogs) {
			try {
				setCachedLogs(apiDailyLogs.slice(-20))
			} catch (err) {
				// @ts-ignore
				toast(err.toString())
			}
		}
	}, [apiDailyLogs, setCachedLogs])

	const dailyLogs = apiDailyLogs ?? cachedLogs

	const dailyLog = dailyLogs?.find(
		(log) => log.date === new Date().toDateString(),
	)

	useEffect(() => {
		if (dailyLogsLoading) return
		if (isCreatingLog) return
		if (!dailyLog) {
			setIsCreatingLog(true)
			if (!currentUser) return
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

	if (!currentUser) return null
	const isSupplements = currentUser.roles.find(
		(role) => role.name === 'supplements',
	)

	if (!dailyLogs) return null

	return (
		<div className={cn('flex flex-col gap-0 w-full mt-16 items-center mb-1 ')}>
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

				<Card className='py-2'>
					<CardContent className='py-0 px-0'>
						<div className='flex justify-between w-full'>
							<WaterLog
								userId={userId}
								dailyLogs={dailyLogs}
								defaultAmount={Number(
									currentUser?.settings?.defaultWater ?? 600,
								)}
								settingsId={currentUser.settings.id}
							/>
							<MealLog dailyLogs={dailyLogs} currentUserId={userId} />
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

const Desktop = ({ userId }: { userId: string }) => {
	const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
	const { data: user } = api.user.getInfoPage.useQuery(userId)
	const { data: userGoals, isLoading: userGoalsLoading } =
		api.goal.getUser.useQuery({ userId: userId })

	if (!user) return null
	if (!dailyLogs) return null
	if (userGoalsLoading) return null

	return (
		<div className='flex relative flex-wrap gap-4 p-4 w-screen lg:h-screen'>
			<div className='absolute top-1 right-1 z-100'>
				<User />
			</div>

			<div className='grid grid-cols-5 grid-rows-3 gap-4 w-full h-[calc(100vh-32px)]'>
				<UserWeight dailyLogs={dailyLogs} />
				<UserGoals userId={user.id} userGoals={userGoals} />
				<UserCurrentPlan userId={user.id} />
				<UserSupplementPlan user={user} />
				<UserRecentMetrics userId={user.id} />
				<UserCharts
					className='col-span-3 row-span-1'
					dailyLogs={dailyLogs}
					// @ts-ignore
					currentUser={user}
				/>
				<UserMeals className='col-span-2' dailyLogs={dailyLogs} />
				<UserDailyLogsTable className='col-span-5' dailyLogs={dailyLogs} />
			</div>
		</div>
	)
}

export default function Home() {
	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const [cachedUser, setCachedUser] = useAtom(currentUserAtom) // Our persistent atom

	const { data: currentUser } = api.user.getCurrentUserRoles.useQuery(
		{ id: impersonatedUser.id },
		{
			placeholderData: (previousData) => previousData,
		},
	)
	useEffect(() => {
		if (currentUser) {
			const stringifiedData = JSON.stringify(currentUser)

			const bytes = stringifiedData.length * 2
			const kb = (bytes / 1024).toFixed(2)

			console.log(`Estimated Size CurrentUserRoles: ${kb} KB`)
			try {
				setCachedUser(currentUser)
			} catch (_err) {
				toast('error caching user')
			}
		}
	}, [currentUser, setCachedUser])

	const userToDisplay = currentUser ?? cachedUser
	const isMobile = useClientMediaQuery('(max-width: 800px)')

	if (!userToDisplay || !userToDisplay.id) return null

	return (
		<div className='flex relative flex-col min-h-screen'>
			{isMobile ? (
				<Mobile userId={userToDisplay.id} currentUser={userToDisplay} />
			) : (
				<Desktop userId={userToDisplay.id} />
			)}
			{impersonatedUser.id !== '' ? (
				<div className='fixed bottom-14 left-1/2 opacity-80 -translate-x-1/2'>
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
