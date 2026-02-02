'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import type { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
// @ts-ignore
import confetti from 'canvas-confetti'
import { ToiletPaperIcon } from '@phosphor-icons/react/dist/ssr'
import { toast } from 'sonner'

import { PoopBottomSheet } from './poop-bottom-sheet'

const PoopLog = ({
	userId,
	dailyLogs,
}: {
	userId: string
	dailyLogs: GetAllDailyLogs | null | undefined
}) => {
	const today = new Date()

	const [timeoutCodeAdd, setTimeoutCodeAdd] = useState<NodeJS.Timeout | null>(
		null,
	)
	const [timeoutCodeDelete, setTimeoutCodeDelete] =
		useState<NodeJS.Timeout | null>(null)

	const ctx = api.useUtils()

	const { mutate: addPoopLog } = api.dailyLog.addPoopLog.useMutation({
		onMutate: async (newPoopLog) => {
			await ctx.dailyLog.getAllCurrentUser.cancel()

			if (timeoutCodeAdd) clearTimeout(timeoutCodeAdd)
			const timeout = setTimeout(() => {
				ctx.dailyLog.invalidate()
				setTimeoutCodeAdd(null)
			}, 2000)
			setTimeoutCodeAdd(timeout)

			const previousLog = ctx.dailyLog.getAllCurrentUser.getData({ id: userId })
			if (!previousLog) return
			const rndInt = Math.floor(Math.random() * 1000)
			ctx.dailyLog.getAllCurrentUser.setData({ id: userId }, [
				...previousLog.map((log) => {
					if (log.date === newPoopLog.date) {
						return {
							...log,
							poopLogs: [
								...log.poopLogs,
								{
									id: 9999999 + rndInt,
									createdAt: new Date(newPoopLog.date),
									dailyLogId: log.id,
								},
							],
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

	const { mutate: deletePoopLog } = api.dailyLog.deletePoopLog.useMutation({
		onMutate: async (poopLog) => {
			await ctx.dailyLog.getAllCurrentUser.cancel()

			if (timeoutCodeDelete) clearTimeout(timeoutCodeDelete)
			const timeout = setTimeout(() => {
				ctx.dailyLog.invalidate()
				setTimeoutCodeDelete(null)
			}, 2000)
			setTimeoutCodeDelete(timeout)

			const previousLog = ctx.dailyLog.getAllCurrentUser.getData({ id: userId })
			if (!previousLog) return
			ctx.dailyLog.getAllCurrentUser.setData({ id: userId }, [
				...previousLog.map((log) => {
					return {
						...log,
						poopLogs: log.poopLogs.filter(
							(currPoopLog) => currPoopLog.id !== poopLog.id,
						),
					}
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

	const todaysDailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === today.toDateString(),
	)

	const totalPoop =
		todaysDailyLog?.poopLogs.reduce((acc, _curr) => {
			return acc + 1
		}, 0) ?? 0

	return (
		<div className='flex flex-col gap-0 items-center w-full'>
			<div className='w-full text-lg font-bold text-center'>
				<NumberFlow value={totalPoop ?? 0} />
			</div>
			<div className='grid grid-cols-1 gap-2 place-items-center h-12'>
				<div className='flex justify-center items-center w-11 h-11 rounded-full border shadow-inner transition-transform cursor-pointer active:scale-90 bg-background'>
					<ToiletPaperIcon
						className='ml-[1px]'
						size={28}
						weight='regular'
						onClick={() => {
							confetti({
								particleCount: 10,
								spread: 45,
								origin: { x: 0.9, y: 0.9 },
								disableForReducedMotion: true,
							})
							addPoopLog({
								date: today.toDateString(),
							})
						}}
					/>
				</div>
				<div />
			</div>
			<PoopBottomSheet
				dailyLogs={dailyLogs}
				deletePoopLog={deletePoopLog}
				addPoopLog={addPoopLog}
			/>
		</div>
	)
}

export { PoopLog }
