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

import { DialogWrapper } from './dialog-wrapper'
import { NumberInput } from './number-input'

const Steps = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [steps, setSteps] = useState<number | null>(
    todaysLog?.steps
      ? Number(todaysLog?.steps)
      : prevLog?.steps
        ? Number(prevLog?.steps)
        : null,
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateSteps } = api.dailyLog.updateSteps.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  return (
    <DialogWrapper
      title='Steps'
      value={todaysLog?.steps ?? ''}
      prevValue={prevLog?.steps ?? ''}
    >
      <DialogHeader>
        <DialogTitle>Steps</DialogTitle>
        <DialogDescription>Enter your steps today</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center '>
        <NumberInput
          value={steps}
          setValue={setSteps}
          fixed={0}
          scale={50}
          postfix='steps'
        />
      </div>
      <DialogClose asChild>
        <div className='flex  w-full items-center justify-around'>
          <Button
            variant='default'
            onClick={() => {
              if (!steps) return
              updateSteps({
                date: todaysLogDate.toDateString(),
                steps: steps?.toString(),
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
export { Steps }
