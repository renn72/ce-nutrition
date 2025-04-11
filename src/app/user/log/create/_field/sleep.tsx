'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { GetDailyLogById } from '@/types'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'

import { DialogWrapper } from './dialog-wrapper'
import { NumberInput } from './number-input'

const Sleep = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [sleep, setSleep] = useState<number[]>(() =>
    todaysLog?.sleep
      ? [Number(todaysLog?.sleep)]
      : prevLog?.sleep
        ? [Number(prevLog?.sleep)]
        : [5],
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateSleep } = api.dailyLog.updateSleep.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  return (
    <DialogWrapper
      title='Sleep'
      value={todaysLog?.sleep ?? ''}
      prevValue={prevLog?.sleep ?? ''}
    >
      <DialogHeader>
        <DialogTitle>Sleep</DialogTitle>
        <DialogDescription>Enter your sleep today</DialogDescription>
      </DialogHeader>
      <div className='flex flex-col items-center gap-6'>
        <div className='flex justify-center '>
          <NumberInput
            value={sleep[0] ?? 5}
            setValue={(e) => setSleep([Number(e)])}
            fixed={1}
            scale={0.1}
            postfix='hrs'
          />
        </div>
        <Slider
          autoFocus
          defaultValue={[5]}
          min={4}
          max={12}
          step={0.1}
          value={sleep}
          onValueChange={(values) => {
            setSleep(values)
          }}
        />
      </div>
      <DialogClose asChild>
        <div className='flex  w-full items-center justify-around'>
          <Button
            variant='default'
            onClick={() => {
              if (!sleep) return
              if (!sleep?.[0]) return
              updateSleep({
                date: todaysLogDate.toDateString(),
                sleep: sleep[0].toFixed(1),
              })
            }}
          >
            Save
          </Button>
        </div>
      </DialogClose>
    </DialogWrapper>
  )
}
export { Sleep }
