'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { GlassWater, } from 'lucide-react'
import { toast } from 'sonner'

import { WaterBottomSheet } from './water-bottom-sheet'

const WaterLog = ({
  userId,
  dailyLogs,
  defaultAmount,
}: {
  dailyLogs: GetAllDailyLogs | null | undefined
  defaultAmount: number
  userId: string
}) => {
  const ctx = api.useUtils()
  const [size, setSize] = useState(() => defaultAmount)

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
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
    onError: (err, newPoopLog, context) => {
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

  const today = new Date()

  const todaysDailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date === today.toDateString(),
  )

  const totalWater =
    todaysDailyLog?.waterLogs.reduce((acc, curr) => {
      return acc + Number(curr.amount)
    }, 0) ?? 0

  return (
    <div className='flex flex-col gap-0 w-full relative col-span-2'>
      <div className='w-full text-center font-bold text-lg'>
        <NumberFlow value={totalWater ?? 0} />
      </div>

      <div className='grid grid-cols-1 place-items-center gap-2 h-12'>
        <div className='rounded-full border-[3px] border-primary/80 w-10 h-10 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm '>
          <GlassWater
            size={28}
            onClick={() => {
              addWaterLog({
                date: today.toDateString(),
                amount: size,
              })
            }}
          />
        </div>
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
