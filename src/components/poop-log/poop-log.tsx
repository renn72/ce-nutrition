'use client'

import { api } from '@/trpc/react'

import { GetAllDailyLogs } from '@/types'
import { ChevronDown, CircleX, ListCollapse, Toilet } from 'lucide-react'
import { toast } from 'sonner'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const PoopLog = ({
  dailyLogs,
}: {
  dailyLogs: GetAllDailyLogs | null | undefined
}) => {
  const ctx = api.useUtils()

  const { mutate: addPoopLog } = api.dailyLog.addPoopLog.useMutation({
    onSuccess: () => {
      ctx.dailyLog.invalidate()
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
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

  const today = new Date()

  const todaysDailyLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date === today.toDateString(),
  )

  const totalPoop = todaysDailyLog?.poopLogs.reduce((acc, curr) => {
    return acc + 1
  }, 0)

  return (
    <div className='flex flex-col gap-0 w-full'>
      <div className='w-full text-center font-bold text-lg'>{totalPoop}</div>
      <div className='grid grid-cols-1 place-items-center gap-2 h-12'>
        <div className='rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center justify-center active:scale-90 transition-transform cursor-pointer'>
          <Toilet
            className='ml-[1px]'
            size={28}
            onClick={() => {
              addPoopLog({
                logId: todaysDailyLog?.id,
              })
            }}
          />
        </div>
        <div />
      </div>
      <Collapsible>
        <CollapsibleTrigger className='flex gap-2 items-center justify-center w-full'>
          <ListCollapse
            size={20}
            className='text-muted-foreground'
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          {todaysDailyLog?.poopLogs.map((poopLog) => (
            <div
              key={poopLog.id}
              className='flex gap-2 text-xs justify-center w-full items-end'
            >
              <div className='text-muted-foreground font-normal'>
                {poopLog.createdAt.toLocaleTimeString('en-AU')}
              </div>
              <CircleX
                size={18}
                className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform cursor-pointer ml-4 mb-[1px]'
                onClick={() => {
                  deletePoopLog({
                    id: poopLog.id,
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

export { PoopLog }
