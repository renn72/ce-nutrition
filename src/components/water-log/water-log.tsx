'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import {
	formatUserWater,
	getUserWaterFixed,
	getUserWaterSuffix,
	getUserWaterUnit,
	mlToUserWater,
	userWaterToMl,
} from '@/lib/utils'
import type { GetAllDailyLogs, GetUserWRoles } from '@/types'
import NumberFlow from '@number-flow/react'
import { PintGlassIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { NumberInputForm } from '@/components/ui/number-input-form'

import { WaterBottomSheet } from './water-bottom-sheet'

const WaterLog = ({
	userId,
	dailyLogs,
	defaultAmount,
	settingsId,
	currentUser,
}: {
	dailyLogs: GetAllDailyLogs | null | undefined
	defaultAmount: number
	userId: string
	settingsId: number
	currentUser: NonNullable<GetUserWRoles>
}) => {
	const ctx = api.useUtils()
	const userWaterUnit = getUserWaterUnit(currentUser.settings)
	const userWaterSuffix = getUserWaterSuffix(userWaterUnit)
	const waterFixed = getUserWaterFixed(userWaterUnit)
	const defaultDisplayAmount = Number(
		formatUserWater(
			mlToUserWater(defaultAmount, userWaterUnit),
			userWaterUnit,
		) || defaultAmount,
	)
	const waterScale = userWaterUnit === 'mls' ? 5 : 0.01
	const waterBigScale = userWaterUnit === 'mls' ? 50 : 0.1
	const [size, setSize] = useState(() => defaultDisplayAmount)
	const [isOpen, setIsOpen] = useState(false)

	const [timeoutCodeAdd, setTimeoutCodeAdd] = useState<NodeJS.Timeout | null>(
		null,
	)
	const [timeoutCodeDelete, setTimeoutCodeDelete] =
		useState<NodeJS.Timeout | null>(null)

	const [day, setDay] = useState<Date>(new Date())

	useEffect(() => {
		setSize(defaultDisplayAmount)
	}, [defaultDisplayAmount])

	const { mutate: addWaterLog } = api.dailyLog.addWaterLog.useMutation({
		onMutate: async (newWaterLog) => {
			if (timeoutCodeAdd) clearTimeout(timeoutCodeAdd)
			const timeout = setTimeout(() => {
				ctx.dailyLog.invalidate()
				setTimeoutCodeAdd(null)
			}, 2000)
			setTimeoutCodeAdd(timeout)

			await ctx.dailyLog.getAllCurrentUser.cancel()
			const previousLog = ctx.dailyLog.getAllCurrentUser.getData({ id: userId })
			if (!previousLog) return
			ctx.dailyLog.getAllCurrentUser.setData({ id: userId }, [
				...previousLog.map((log) => {
					if (log.date === newWaterLog.date) {
						return {
							...log,
							waterLogs: [
								...log.waterLogs,
								{
									id: -1 * Math.floor(Math.random() * 10000),
									createdAt: new Date(newWaterLog.date),
									dailyLogId: log.id,
									amount: newWaterLog.amount.toString(),
								},
							],
						}
					}
					return log
				}),
			])
			return { previousLog }
		},
		onSuccess: () => {
			setIsOpen(false)
		},
		onError: (_err, _newPoopLog, context) => {
			toast.error('error')
			ctx.dailyLog.getAllCurrentUser.setData(
				{ id: userId },
				context?.previousLog,
			)
		},
	})
	const { mutate: deleteWaterLog } = api.dailyLog.deleteWaterLog.useMutation({
		onMutate: async (waterLog) => {
			if (timeoutCodeDelete) clearTimeout(timeoutCodeDelete)
			const timeout = setTimeout(() => {
				ctx.dailyLog.invalidate()
				setTimeoutCodeDelete(null)
			}, 2000)
			setTimeoutCodeDelete(timeout)

			await ctx.dailyLog.getAllCurrentUser.cancel()
			const previousLog = ctx.dailyLog.getAllCurrentUser.getData({ id: userId })
			if (!previousLog) return
			ctx.dailyLog.getAllCurrentUser.setData({ id: userId }, [
				...previousLog.map((log) => {
					if (log.date === day.toDateString()) {
						return {
							...log,
							waterLogs: log.waterLogs.filter((log) => log.id !== waterLog.id),
						}
					}
					return log
				}),
			])
			return { previousLog }
		},
		onError: (_err, _newPoopLog, context) => {
			toast.error('error')
			ctx.dailyLog.getAllCurrentUser.setData(
				{ id: userId },
				context?.previousLog,
			)
		},
	})

	const { mutate: updateWater } = api.user.updateWater.useMutation({
		onSuccess: () => {
			ctx.user.invalidate()
			toast.success('Updated')
		},
	})

	const today = new Date()

	const todaysDailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === today.toDateString(),
	)

	const totalWaterMl =
		todaysDailyLog?.waterLogs.reduce((acc, curr) => {
			return acc + Number(curr.amount)
		}, 0) ?? 0
	const totalWater = Number(
		formatUserWater(
			mlToUserWater(totalWaterMl, userWaterUnit),
			userWaterUnit,
		) || 0,
	)

	return (
		<div className='flex relative flex-col gap-0 items-center w-full'>
			<div className='w-full text-lg font-bold text-center'>
				<NumberFlow value={totalWater ?? 0} />
				<span className='ml-1 text-xs text-muted-foreground'>
					{userWaterSuffix}
				</span>
			</div>

			<div className='grid grid-cols-1 gap-2 place-items-center h-12'>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<div className='flex justify-center items-center w-11 h-11 rounded-full border shadow-inner transition-transform cursor-pointer active:scale-90 bg-background'>
							<PintGlassIcon size={28} strokeWidth={1} />
						</div>
					</DialogTrigger>
					<DialogContent
						onOpenAutoFocus={(e) => {
							e.preventDefault()
						}}
					>
						<DialogHeader>
							<DialogTitle>Add Water</DialogTitle>
							<DialogDescription className='hidden'>
								Water is used to keep your body hydrated. It helps to regulate
							</DialogDescription>
						</DialogHeader>
						<div className='flex flex-col gap-6 items-center'>
							<NumberInputForm
								value={size.toString()}
								setValue={(value) => setSize(Number(value))}
								scale={waterScale}
								bigScale={waterBigScale}
								fixed={waterFixed}
								placeholder='0'
								postfix={userWaterSuffix}
								isBig={true}
							/>
							<div className='flex gap-6 items-center'>
								<Button
									className=''
									onClick={() => {
										const waterMl = userWaterToMl(size, userWaterUnit)
										if (waterMl === null) return

										addWaterLog({
											date: today.toDateString(),
											amount: Math.round(waterMl),
										})
									}}
								>
									Add Water
								</Button>
								<Button
									variant='outline'
									onClick={() => {
										const waterMl = userWaterToMl(size, userWaterUnit)
										if (waterMl === null) return

										updateWater({
											water: Math.round(waterMl),
											id: settingsId,
										})
									}}
								>
									Set as Default
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<WaterBottomSheet
				today={day}
				setToday={setDay}
				dailyLogs={dailyLogs}
				deleteWaterLog={deleteWaterLog}
				addWaterLog={addWaterLog}
				size={size}
				setSize={setSize}
				userWaterUnit={userWaterUnit}
				userWaterSuffix={userWaterSuffix}
			/>
		</div>
	)
}

export { WaterLog }
