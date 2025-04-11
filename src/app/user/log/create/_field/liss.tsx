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

const Liss = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [liss, setLiss] = useState<number | null>(
    todaysLog?.liss
      ? Number(todaysLog?.liss)
      : prevLog?.liss
        ? Number(prevLog?.liss)
        : null,
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateLiss } = api.dailyLog.updateLiss.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  return (
    <DialogWrapper
      title='LISS'
      value={todaysLog?.liss ?? ''}
      prevValue={''}
      postfix='mins'
    >
      <DialogHeader>
        <DialogTitle>LISS</DialogTitle>
        <DialogDescription>Enter your minutes of LISS</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center '>
        <NumberInput
          value={liss}
          setValue={setLiss}
          fixed={0}
          scale={1}
          postfix='mins'
        />
      </div>
      <div className='flex gap-2 w-full justify-around'>
        <DialogClose asChild>
          <div className='flex  w-full items-center justify-around'>
            <Button
              variant='default'
              onClick={() => {
                if (!liss) return
                updateLiss({
                  date: todaysLogDate.toDateString(),
                  liss: liss?.toFixed(0),
                })
              }}
            >
              Save
            </Button>
          </div>
        </DialogClose>
        <DialogClose asChild>
          <div className='flex  w-full items-center justify-around'>
            <Button
              variant='outline'
              onClick={() => {
                if (!liss) return
                setLiss(null)
                updateLiss({
                  date: todaysLogDate.toDateString(),
                  liss: '',
                })
              }}
            >
              Clear
            </Button>
          </div>
        </DialogClose>
      </div>
    </DialogWrapper>
  )
}
export { Liss }
