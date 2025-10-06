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

  const [timeoutCodeAdd, setTimeoutCodeAdd] = useState<NodeJS.Timeout | null>(null)
  const [timeoutCodeDelete, setTimeoutCodeDelete] = useState<NodeJS.Timeout | null>(null)

	const [day, setDay] = useState<Date>(new Date())

	const { mutate: addWaterLog } = api.dailyLog.addWaterLog.useMutation({
		onMutate: async (newWaterLog) => {
      if (timeoutCodeAdd) clearTimeout(timeoutCodeAdd)
      const timeout = setTimeout(() => {
        ctx.dailyLog.invalidate()
        setTimeoutCodeAdd(null)
      }, 2000)
      setTimeoutCodeAdd(timeout)

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
			ctx.dailyLog.getAllUser.setData(userId, context?.previousLog)
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
      const previousLog = ctx.dailyLog.getAllUser.getData(userId)
      if (!previousLog) return
      ctx.dailyLog.getAllUser.setData(userId, [
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
        today={day}
        setToday={setDay}
        dailyLogs={dailyLogs}
				deleteWaterLog={deleteWaterLog}
        addWaterLog={addWaterLog}
				size={size}
				setSize={setSize}
			/>
		</div>
	)
}

export { WaterLog }
