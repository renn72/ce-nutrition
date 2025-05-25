'use client'

import { api } from '@/trpc/react'


import { useState } from 'react'

import type { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { GlassWater } from 'lucide-react'
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
import { NumberInput } from '@/components/ui/number-input'
import { NumberInputForm } from '@/components/ui/number-input-form'

import { WaterBottomSheet } from './water-bottom-sheet'

const WaterLog = ({
	userId,
	dailyLogs,
	defaultAmount,
  settingsId
}: {
	dailyLogs: GetAllDailyLogs | null | undefined
	defaultAmount: number
	userId: string
  settingsId: number
}) => {
	const ctx = api.useUtils()
	const [size, setSize] = useState(() => defaultAmount)
  const [isOpen, setIsOpen] = useState(false)

	const { mutate: addWaterLog } = api.dailyLog.addWaterLog.useMutation({
		onMutate: async (newWaterLog) => {
			await ctx.dailyLog.getAllCurrentUser.cancel()
			const previousLog = ctx.dailyLog.getAllUser.getData(userId)
			if (!previousLog) return
			ctx.dailyLog.getAllUser.setData(userId, [
				...previousLog.map((log) => {
					if (log.date === newWaterLog.date) {
						return {
							...log,
							waterLogs: [
								...log.waterLogs,
								{
									id: -1,
									createdAt: new Date(),
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
			ctx.dailyLog.invalidate()
      setIsOpen(false)
		},
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
		onError: (_err, _newPoopLog, context) => {
			toast.error('error')
			ctx.dailyLog.getAllUser.setData(userId, context?.previousLog)
		},
	})
	const { mutate: deleteWaterLog } = api.dailyLog.deleteWaterLog.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
		onSettled: () => {
			ctx.dailyLog.invalidate()
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

	const totalWater =
		todaysDailyLog?.waterLogs.reduce((acc, curr) => {
			return acc + Number(curr.amount)
		}, 0) ?? 0

	return (
		<div className='flex flex-col gap-0 w-full relative items-center'>
			<div className='w-full text-center font-bold text-lg'>
				<NumberFlow value={totalWater ?? 0} />
			</div>

			<div className='grid grid-cols-1 place-items-center gap-2 h-12'>
				<Dialog
          open={isOpen}
          onOpenChange={setIsOpen}
        >
					<DialogTrigger asChild>
						<div className='rounded-full border-[3px] border-primary/80 w-10 h-10 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm '>
							<GlassWater size={28} />
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
						<div className='flex flex-col items-center gap-6'>
							<NumberInputForm
								value={size.toString()}
								setValue={(value) => setSize(Number(value))}
								scale={5}
                bigScale={50}
								placeholder='0'
                postfix='ml'
                isBig={true}
							/>
							<div className='flex gap-6 items-center'>
								<Button
									className=''
									onClick={() => {
										addWaterLog({
											date: today.toDateString(),
											amount: size,
										})
									}}
								>
									Add Water
								</Button>
								<Button variant='outline' onClick={() => {
                  updateWater({
                    water: Number(size),
                    id: settingsId,
                  })

                }}>
                  Set as Default
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<WaterBottomSheet
				todaysDailyLog={todaysDailyLog}
				totalWater={totalWater}
				deleteWaterLog={deleteWaterLog}
				size={size}
				setSize={setSize}
			/>
		</div>
	)
}

export { WaterLog }
