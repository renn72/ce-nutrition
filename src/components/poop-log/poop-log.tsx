'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { CircleX, ListCollapse, Toilet } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

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
                { id: -1, createdAt: new Date(), dailyLogId: log.id },
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
    <div className='flex flex-col gap-0 w-full relative'>
      <div className='w-full text-center font-bold text-lg'>
        <NumberFlow value={totalPoop ?? 0} />
      </div>
      <div className='grid grid-cols-1 place-items-center gap-2 h-12'>
        <div className='rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm'>
          <Toilet
            className='ml-[1px]'
            size={28}
            onClick={() => {
              addPoopLog({
                date: today.toDateString(),
              })
            }}
          />
        </div>
        <div />
      </div>
      <Collapsible>
        <CollapsibleTrigger className='flex gap-2 items-center justify-center absolute top-10 right-0'>
          <ListCollapse
            size={20}
            className='text-muted-foreground'
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          {todaysDailyLog?.poopLogs.length === 0 || !todaysDailyLog ? (
            <div className='text-center'>...</div>
          ) : (
            todaysDailyLog?.poopLogs.map((poopLog) => (
              <div
                key={poopLog.id}
                className='grid grid-cols-3 gap-2 text-xs w-full items-center'
              >
                <div className='text-muted-foreground font-normal col-span-2'>
                  {poopLog.createdAt.toLocaleTimeString('en-AU')}
                </div>
                <CircleX
                  size={18}
                  className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
                  onClick={() => {
                    deletePoopLog({
                      id: poopLog.id,
                    })
                  }}
                />
              </div>
            ))
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export { PoopLog }
