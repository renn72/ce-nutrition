'use client'

import { api } from '@/trpc/react'

import { GetAllDailyLogs } from '@/types'
import { Toilet } from 'lucide-react'
import { CirclePlus, } from 'lucide-react'
import { toast } from 'sonner'

const PoopLog = ({
  dailyLogs,
}: {
  dailyLogs: GetAllDailyLogs | null | undefined
}) => {
  const ctx = api.useUtils()

  const { mutate: addPoopLog } = api.dailyLog.addPoopLog.useMutation({
    onSuccess: () => {
      toast.success('Added poop log')
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  const today = new Date()

  const todaysDailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date === today.toDateString(),
  )

  const totalPoop = todaysDailyLog?.poopLogs.reduce((acc, curr) => {
    return acc + 1
  }, 0)

  if (!todaysDailyLog) return null

  return (
    <div className='flex flex-col gap-0 w-full'>
      <div className='w-full text-center'>{totalPoop}</div>
      <div className='grid grid-cols-4 place-items-center gap-2 h-12'>
        <div />
        <Toilet size={28} />
        <CirclePlus
          size={28}
          onClick={() => {
            addPoopLog({
              logId: todaysDailyLog?.id,
            })
          }}
        />
        <div />
      </div>
      {todaysDailyLog?.poopLogs.map((poopLog) => (
        <div
          key={poopLog.id}
          className='flex gap-2 text-xs justify-center w-full'
        >
          <div className='text-muted-foreground font-normal'>
            {poopLog.createdAt.toLocaleTimeString('en-AU')}
          </div>
        </div>
      ))}
    </div>
  )
}

export { PoopLog }
