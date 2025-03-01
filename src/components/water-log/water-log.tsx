'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { CircleX, GlassWater, ListCollapse } from 'lucide-react'
import { toast } from 'sonner'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'

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
    <div className='flex flex-col gap-0 w-full relative'>
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

      <Collapsible>
        <CollapsibleTrigger className='flex gap-2 items-center justify-center absolute top-10 right-0'>
          <ListCollapse
            size={20}
            className='text-muted-foreground'
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Input
            placeholder='Amount'
            className='w-full mb-1'
            type='number'
            value={size}
            onChange={(e) => {
              setSize(Number(e.target.value))
            }}
          />
          {todaysDailyLog?.waterLogs.map((waterLog) => (
            <div
              key={waterLog.id}
              className='gap-1 tracking-tight text-xs w-full items-center grid grid-cols-6'
            >
              <div className='text-muted-foreground font-medium col-span-2'>
                {waterLog.amount}ml
              </div>
              <div className='text-muted-foreground font-normal col-span-3'>
                {waterLog.createdAt.toLocaleTimeString('en-AU', {
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </div>
              <CircleX
                size={18}
                className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
                onClick={() => {
                  deleteWaterLog({
                    id: waterLog.id,
                  })
                }}
              />
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export { WaterLog }
