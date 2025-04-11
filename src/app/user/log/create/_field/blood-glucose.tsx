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

const BloodGlucose = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [bloodGlucose, setBloodGlucose] = useState<number | null>(() =>
    todaysLog?.fastedBloodGlucose
      ? Number(todaysLog?.fastedBloodGlucose)
      : prevLog?.fastedBloodGlucose
        ? Number(prevLog?.fastedBloodGlucose)
        : null,
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateBloodGlucose } =
    api.dailyLog.updateBloodGlucose.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })

  return (
    <DialogWrapper
      title='Blood Glucose'
      value={todaysLog?.fastedBloodGlucose ?? ''}
      prevValue={prevLog?.fastedBloodGlucose ?? ''}
      fixed={1}
    >
      <DialogHeader>
        <DialogTitle>Blood Glucose</DialogTitle>
        <DialogDescription>Enter yout blood glucose today</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center '>
        <NumberInput
          value={bloodGlucose}
          setValue={setBloodGlucose}
          fixed={1}
          scale={0.1}
        />
      </div>
      <DialogClose asChild>
        <div className='flex  w-full items-center justify-around'>
          <Button
            variant='default'
            onClick={() => {
              if (!bloodGlucose) return
              updateBloodGlucose({
                date: todaysLogDate.toDateString(),
                fastedBloodGlucose: bloodGlucose?.toFixed(1),
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
export { BloodGlucose }
