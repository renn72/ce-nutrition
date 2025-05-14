'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import type { GetDailyLogById } from '@/types'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { DialogWrapper } from './dialog-wrapper'
import { NumberInput } from './number-input'

const Nap = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [nap, setNap] = useState<number | null>(
    todaysLog?.nap
      ? Number(todaysLog?.nap)
      : prevLog?.nap
        ? Number(Number(prevLog?.nap).toFixed(0))
        : null,
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateNap } = api.dailyLog.updateNap.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  return (
    <DialogWrapper
      title='Nap'
      value={todaysLog?.nap ?? ''}
      prevValue={prevLog?.nap ?? ''}
    >
      <DialogHeader>
        <DialogTitle>Nap</DialogTitle>
        <DialogDescription>Enter your nap today</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center '>
        <NumberInput
          value={nap}
          setValue={setNap}
          fixed={1}
          scale={0.1}
          postfix='hrs'
        />
      </div>
      <DialogClose asChild>
        <div className='flex  w-full items-center justify-around'>
          <Button
            variant='default'
            onClick={() => {
              if (!nap) return
              updateNap({
                date: todaysLogDate.toDateString(),
                nap: nap?.toString(),
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
export { Nap }
