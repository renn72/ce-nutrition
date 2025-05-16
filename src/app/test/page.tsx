'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import DailyLogCarousel from '@/app/_components/dailylog-carousel'
import { impersonatedUserAtom } from '@/atoms'
import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { cn } from '@/lib/utils'
import type { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { XIcon } from 'lucide-react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import { UserCharts } from '@/components/charts/user-charts'
import { MobileFooter } from '@/components/layout/mobile-footer'
import { MobileHeader } from '@/components/layout/mobile-header'
import { MealLog } from '@/components/meal-log/meal-log'
import { PoopLog } from '@/components/poop-log/poop-log'
import { WaterLog } from '@/components/water-log/water-log'

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

	const [isLocked, setIsLocked] = useState(false)
	const [showRotatePrompt, setShowRotatePrompt] = useState(false)
	const [isIOS, setIsIOS] = useState(false)

	useEffect(() => {
		// Detect iOS
		const ua = window.navigator.userAgent
		setIsIOS(/iPad|iPhone|iPod/.test(ua) && !window.MSStream)
	}, [])

	// Detect current orientation
	useEffect(() => {
		const handleOrientationChange = () => {
			const isLandscape = window.innerWidth > window.innerHeight
			setShowRotatePrompt(isIOS && !isLandscape)
		}

		window.addEventListener('resize', handleOrientationChange)
		handleOrientationChange() // Run once on mount

		return () => {
			window.removeEventListener('resize', handleOrientationChange)
		}
	}, [isIOS])

	const enterFullscreenAndLock = async () => {
		const elem = document.documentElement

		if (isIOS) {
			// Show prompt for manual rotation
			const isLandscape = window.innerWidth > window.innerHeight
			setShowRotatePrompt(!isLandscape)
			return
		}

		try {
			// Request fullscreen
			if (elem.requestFullscreen) {
				await elem.requestFullscreen()
			} else if ((elem as any).webkitRequestFullscreen) {
				await (elem as any).webkitRequestFullscreen()
			}

			// Lock orientation
			if (screen.orientation?.lock) {
				await screen.orientation.lock('landscape')
				setIsLocked(true)
			} else {
				console.warn('Orientation lock not supported.')
			}
		} catch (err) {
			console.error('Failed to enter fullscreen or lock orientation:', err)
		}
	}

	const exitFullscreenAndUnlock = async () => {
		try {
			if (screen.orientation?.unlock) {
				screen.orientation.unlock() // Not always necessary
			}

			if (document.fullscreenElement) {
				await document.exitFullscreen()
			} else if ((document as any).webkitExitFullscreen) {
				await (document as any).webkitExitFullscreen()
			}

			setIsLocked(false)
		} catch (err) {
			console.error('Error exiting fullscreen/unlocking:', err)
		}
	}

	if (dailyLogsLoading) return null

  if (isLocked) return (
				<div
					className='w-full relative'
				>
          <Button
            onClick={exitFullscreenAndUnlock}
            variant='outline'
            className='absolute right-1/2 transform -translate-x-1/2 top-2'
          >
            Exit
          </Button>
					<UserCharts
						dailyLogs={dailyLogs}
						isMoblie={true}
						currentUser={currentUser}
					/>
				</div>

  )

	return (
		<div className={cn('flex flex-col gap-2 w-full mt-16 items-center ')}>
			<MobileHeader isDesktop={false} />
			<div
				id='main-content'
				className={cn(
					'flex flex-col gap-4 w-full max-w-screen-xl main-content',
				)}
			>
				<div
					className='w-full'
					onClick={enterFullscreenAndLock}
				>
					<UserCharts
						dailyLogs={dailyLogs}
						isMoblie={true}
						currentUser={currentUser}
					/>
				</div>
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
