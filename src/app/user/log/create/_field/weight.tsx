'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { GetDailyLogById } from '@/types'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { DialogWrapper } from './dialog-wrapper'
import { NumberInput } from './number-input'

const Weight = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [weight, setWeight] = useState<number | null>(() =>
    todaysLog?.morningWeight
      ? Number(todaysLog?.morningWeight)
      : prevLog?.morningWeight
        ? Number(prevLog?.morningWeight)
        : null,
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateWeight } = api.dailyLog.updateWeight.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  return (
    <DialogWrapper
      title='Weight'
      value={todaysLog?.morningWeight ?? ''}
      prevValue={prevLog?.morningWeight ?? ''}
      fixed={1}
    >
      <DialogHeader>
        <DialogTitle>Weight</DialogTitle>
        <DialogDescription>Enter your weight today</DialogDescription>
      </DialogHeader>

      <div className='flex justify-center '>
        <NumberInput
          value={weight}
          setValue={setWeight}
          fixed={1}
          scale={0.1}
          postfix='kg'
        />
      </div>
      <DialogClose asChild>
        <div className='flex  w-full items-center justify-around'>
          <Button
            variant='default'
            size='lg'
            onClick={() => {
              if (!weight) return
              updateWeight({
                date: todaysLogDate.toDateString(),
                morningWeight: weight?.toFixed(2),
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
export { Weight }
