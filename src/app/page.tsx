'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

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
import { WaterLog } from '@/components/water-log/water-log'

import DailyLogCarousel from './_components/dailylog-carousel'

export const dynamic = 'force-dynamic'

const Mobile = ({
	userId,
	currentUser,
	isDesktop = false,
}: {
	userId: string
	currentUser: GetUserById
	isDesktop?: boolean
}) => {
	const ctx = api.useUtils()
	const { data: dailyLogs, isLoading: dailyLogsLoading } =
		api.dailyLog.getAllUser.useQuery(userId)
	const [isCreatingLog, setIsCreatingLog] = useState(false)

	const { mutate: createDailyLog } = api.dailyLog.create.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
		onError: () => {
			toast.error('error conflict')
			ctx.dailyLog.getAllUser.setData(userId, dailyLogs)
		},
	})

	const dailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === new Date().toDateString(),
	)

	useEffect(() => {
		if (dailyLogsLoading) return
		if (isCreatingLog) return
		if (!dailyLog) {
			setIsCreatingLog(true)
			try {
				createDailyLog({
					date: new Date().toDateString(),
					userId: currentUser.id,
				})
			} catch (err) {
				// toast.error('error', err.message)
			}
		}
	}, [dailyLogs])

	if (dailyLogsLoading) return null

	return (
		<div className={cn('flex flex-col gap-2 w-full mt-16 items-center ')}>
			<MobileHeader isDesktop={false} />
			<div
				id='main-content'
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
							/>
							<MealLog dailyLogs={dailyLogs} currentUser={currentUser} />
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
	currentUser,
}: {
	userId: string
	currentUser: GetUserById
}) => {
	return (
		<div className='flex flex-col items-center gap-2 '>
			<Mobile userId={userId} currentUser={currentUser} isDesktop={true} />
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
