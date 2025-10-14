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

const Mobility = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [mobility, setMobility] = useState<number | null>(
    todaysLog?.mobility
      ? Number(todaysLog?.mobility)
      : prevLog?.mobility
        ? Number(prevLog?.mobility)
        : null,
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutate: updateMobility } = api.dailyLog.updateMobility.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  return (
    <DialogWrapper
      title='Mobility'
      value={todaysLog?.mobility ?? ''}
      prevValue={''}
      postfix='mins'
    >
      <DialogHeader>
        <DialogTitle>Mobility</DialogTitle>
        <DialogDescription>Enter your minutes of mobility</DialogDescription>
      </DialogHeader>
      <div className='flex justify-center '>
        <NumberInput
          value={mobility}
          setValue={setMobility}
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
                if (!mobility) return
                updateMobility({
                  date: todaysLogDate.toDateString(),
                  mobility: mobility?.toFixed(0),
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
                if (!mobility) return
                setMobility(null)
                updateMobility({
                  date: todaysLogDate.toDateString(),
                  mobility: '',
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
export { Mobility }
