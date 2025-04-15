'use client'

import { api } from '@/trpc/react'

import { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { Toilet } from 'lucide-react'
import { toast } from 'sonner'

import { PoopBottomSheet } from './poop-bottom-sheet'

// @ts-ignore
import confetti from 'canvas-confetti'

const PoopLog = ({
  userId,
  dailyLogs,
}: {
  userId: string
  dailyLogs: GetAllDailyLogs | null | undefined
}) => {
  const today = new Date()

  const ctx = api.useUtils()

  const { mutate: addPoopLog } = api.dailyLog.addPoopLog.useMutation({
    onMutate: async (newPoopLog) => {
      await ctx.dailyLog.getAllCurrentUser.cancel()
      const previousLog = ctx.dailyLog.getAllUser.getData(userId)
      if (!previousLog) return
      ctx.dailyLog.getAllUser.setData(userId, [
        ...previousLog.map((log) => {
          if (log.date === newPoopLog.date) {
            return {
              ...log,
              poopLogs: [
                ...log.poopLogs,
                { id: 9999999, createdAt: new Date(), dailyLogId: log.id },
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
  const { mutate: deletePoopLog } = api.dailyLog.deletePoopLog.useMutation({
    onSuccess: () => {
      ctx.dailyLog.invalidate()
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
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
    <div className='flex flex-col gap-0 w-full items-center'>
      <div className='w-full text-center font-bold text-lg'>
        <NumberFlow value={totalPoop ?? 0} />
      </div>
      <div className='grid grid-cols-1 place-items-center gap-2 h-12'>
        <div className='rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm'>
          <Toilet
            className='ml-[1px]'
            size={28}
            onClick={() => {
              confetti({
                particleCount: 20,
                spread: 30,
                angle: 120,
                origin: { x: 0.80, y: 0.60 },
              })
              addPoopLog({
                date: today.toDateString(),
              })
            }}
          />
        </div>
        <div />
      </div>
      <PoopBottomSheet totalPoop={totalPoop} todaysDailyLog={todaysDailyLog} deletePoopLog={deletePoopLog} />
    </div>
  )
}

export { PoopLog }

