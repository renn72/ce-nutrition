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

const Hiit = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [hiit, setHiit] = useState<number | null>(
    todaysLog?.hiit
      ? Number(todaysLog?.hiit)
      : prevLog?.hiit
        ? Number(prevLog?.hiit)
        : null,
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateHiit } = api.dailyLog.updateHiit.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  return (
    <DialogWrapper
      title='HIIT'
      value={todaysLog?.hiit ?? ''}
      prevValue={''}
      postfix='mins'
    >
      <DialogHeader>
        <DialogTitle>HIIT</DialogTitle>
        <DialogDescription>Enter your minutes of HIIT</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center '>
        <NumberInput
          value={hiit}
          setValue={setHiit}
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
                if (!hiit) return
                updateHiit({
                  date: todaysLogDate.toDateString(),
                  hiit: hiit?.toFixed(0),
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
                if (!hiit) return
                setHiit(null)
                updateHiit({
                  date: todaysLogDate.toDateString(),
                  hiit: '',
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
export { Hiit }
