'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs } from '@/types'
import { ChevronDown, CirclePlus, CircleX, GlassWater, ListCollapse } from 'lucide-react'
import { toast } from 'sonner'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
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
    <div className='flex flex-col gap-0 w-full'>
      {totalWater > 0 ? (
        <div className='w-full text-center font-bold text-lg'>
          {totalWater}ml
        </div>
      ) : null}

      <div className='grid grid-cols-2 place-items-center gap-2 h-12'>
        <div className='rounded-full border-[3px] border-primary/80 w-10 h-10 flex items-center justify-center active:scale-90 transition-transform cursor-pointer'>
          <GlassWater
            size={28}
            onClick={() => {
              addWaterLog({
                logId: todaysDailyLog?.id,
                amount: size,
              })
            }}
          />
        </div>
        <Input
          placeholder='Size'
          className='w-14 col-span-1'
          type='number'
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value))
          }}
        />
      </div>

      <Collapsible>
        <CollapsibleTrigger className='flex gap-2 items-center justify-center w-full'>
          <ListCollapse
            size={20}
            className='text-muted-foreground'
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
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
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export { WaterLog }
