'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs } from '@/types'
import { CirclePlus, CircleX, GlassWater } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'

const WaterLog = ({
  dailyLogs,
  defaultAmount,
}: {
  dailyLogs: GetAllDailyLogs | null | undefined
  defaultAmount: number
}) => {
  const ctx = api.useUtils()
  const [size, setSize] = useState(() => defaultAmount)

  const { mutate: addWaterLog } = api.dailyLog.addWaterLog.useMutation({
    onSuccess: () => {
      ctx.dailyLog.invalidate()
      toast.success('Added water')
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
      ctx.dailyLog.invalidate()
    },
  })
  const { mutate: deleteWaterLog } = api.dailyLog.deleteWaterLog.useMutation({
    onSuccess: () => {
      ctx.dailyLog.invalidate()
      toast.success('Deleted water')
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
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
    <div className='flex flex-col gap-0 w-full'>
      {totalWater > 0 ? (
        <div className='w-full text-center'>{totalWater}ml</div>
      ) : null}

      <div className='grid grid-cols-4 place-items-center gap-2 h-12'>
        <GlassWater size={28} />
        <Input
          placeholder='Size'
          className='w-full col-span-2'
          type='number'
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value))
          }}
        />
        <CirclePlus
          size={28}
          onClick={() => {
            addWaterLog({
              logId: todaysDailyLog?.id,
              amount: size,
            })
          }}
        />
      </div>
      {todaysDailyLog?.waterLogs.map((waterLog) => (
        <div
          key={waterLog.id}
          className='flex gap-2 text-xs justify-center w-full items-end'
        >
          <div className='text-muted-foreground font-medium'>
            {waterLog.amount}ml
          </div>
          <div className='text-muted-foreground font-normal'>
            {waterLog.createdAt.toLocaleTimeString('en-AU')}
          </div>
          <CircleX
            size={18}
            className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform cursor-pointer ml-4 mb-[1px]'
            onClick={() => {
              deleteWaterLog({
                id: waterLog.id,
              })
            }}
          />
        </div>
      ))}
    </div>
  )
}

export { WaterLog }
