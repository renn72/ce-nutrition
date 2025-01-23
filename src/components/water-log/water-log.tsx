'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'

import { GetAllDailyLogs } from '@/types'
import { CirclePlus, GlassWater } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const WaterLog = ({ dailyLogs }: { dailyLogs: GetAllDailyLogs | null | undefined }) => {
  const ctx = api.useUtils()
  const [ size, setSize ] = useState(600)

  const { mutate: addWaterLog } = api.dailyLog.addWaterLog.useMutation({
    onSuccess: () => {
      toast.success('Added water log')
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  const today = new Date()

  const todaysDailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date.toDateString() === today.toDateString(),
  )

  const totalWater = todaysDailyLog?.waterLogs.reduce((acc, curr) => {
    return acc + Number(curr.amount)
  }, 0)

  console.log('todaysDailyLog', todaysDailyLog)
  if (!todaysDailyLog) return null

  return (
    <div className='flex flex-col gap-0 w-full'>
      <div className='w-full text-center'>
        {totalWater}ml
      </div>
      <div className='grid grid-cols-4 place-items-center gap-2 h-12'>
      <GlassWater
        size={28}
      />
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
      {
        todaysDailyLog?.waterLogs.map((waterLog) => (
          <div
            key={waterLog.id}
            className='flex gap-2 text-xs justify-center w-full'
          >
              <div className='text-muted-foreground font-medium'>
                {waterLog.amount}ml
            </div>
            <div className='text-muted-foreground font-normal'>
              {waterLog.createdAt.toLocaleTimeString('en-AU')}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export { WaterLog }
