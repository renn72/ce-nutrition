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

const SleepQuality = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [sleepQuality, setSleepQuality] = useState<number[]>(() =>
    todaysLog?.sleepQuality
      ? [Number(todaysLog?.sleepQuality)]
      : prevLog?.sleepQuality
        ? [Number(prevLog?.sleepQuality)]
        : [5],
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateSleepQuality } =
    api.dailyLog.updateSleepQuality.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })

  return (
    <DialogWrapper
      title='Sleep Quality'
      value={todaysLog?.sleepQuality ?? ''}
      prevValue={prevLog?.sleepQuality ?? ''}
    >
      <DialogHeader>
        <DialogTitle>Sleep Quality</DialogTitle>
        <DialogDescription>Enter your sleep quality today</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center '>
        <NumberInput
          value={sleepQuality[0] ?? 5}
          setValue={(e) => setSleepQuality([e])}
          fixed={1}
          scale={0.1}
        />
      </div>
      <Slider
        defaultValue={[5]}
        max={10}
        step={0.1}
        value={sleepQuality}
        onValueChange={(values) => {
          setSleepQuality(values)
        }}
      />
      <DialogClose asChild>
        <div className='flex  w-full items-center justify-around'>
          <Button
            variant='default'
            onClick={() => {
              if (!sleepQuality) return
              if (!sleepQuality?.[0]) return
              updateSleepQuality({
                date: todaysLogDate.toDateString(),
                sleepQuality: sleepQuality?.[0]?.toFixed(0),
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
export { SleepQuality }
