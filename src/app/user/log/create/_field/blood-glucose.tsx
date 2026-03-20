'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetDailyLogById } from '@/types'
import { Droplet } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'

import {
  BloodGlucoseTimePicker,
  getCurrentRoundedTime,
} from './blood-glucose-time-picker'
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
  const [bloodGlucoseTiming, setBloodGlucoseTiming] = useState<string>(
    () =>
      todaysLog?.fastedBloodGlucoseTiming ??
      prevLog?.fastedBloodGlucoseTiming ??
      '',
  )
  const [isTimingEnabled, setIsTimingEnabled] = useState<boolean>(
    () =>
      Boolean(todaysLog?.fastedBloodGlucoseTiming) ||
      Boolean(prevLog?.fastedBloodGlucoseTiming),
  )

  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')

  const { mutateAsync: updateBloodGlucose } =
    api.dailyLog.updateBloodGlucose.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })
  const { mutateAsync: updateBloodGlucoseTiming } =
    api.dailyLog.updateBloodGlucoseTiming.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })

  return (
    <DialogWrapper
      title='Blood Glucose'
      icon={Droplet}
      value={todaysLog?.fastedBloodGlucose ?? ''}
      prevValue={prevLog?.fastedBloodGlucose ?? ''}
      fixed={1}
    >
      <DialogHeader>
        <DialogTitle>Blood Glucose</DialogTitle>
        <DialogDescription>Enter your blood glucose today</DialogDescription>
      </DialogHeader>
      <div className='flex gap-3 justify-center items-center'>
        <div className='text-xs font-medium tracking-wide uppercase text-muted-foreground'>
          Log time
        </div>
        <Switch
          checked={isTimingEnabled}
          onCheckedChange={(checked) => {
            setIsTimingEnabled(checked)
            if (!checked) {
              setBloodGlucoseTiming('')
              return
            }
            if (!bloodGlucoseTiming) {
              setBloodGlucoseTiming(getCurrentRoundedTime())
            }
          }}
        />
      </div>
      <div className='flex flex-col gap-4 justify-center items-center sm:flex-row sm:items-start'>
        <NumberInput
          value={bloodGlucose}
          setValue={setBloodGlucose}
          fixed={1}
          scale={0.1}
        />
        <div
          aria-hidden={!isTimingEnabled}
          className={cn(
            'overflow-hidden transition-all duration-300 ease-out',
            isTimingEnabled
              ? 'max-h-[220px] max-w-[260px] opacity-100 translate-y-0'
              : 'max-h-0 max-w-0 opacity-0 -translate-y-1 pointer-events-none',
          )}
        >
          <div className='pt-1'>
            <BloodGlucoseTimePicker
              value={bloodGlucoseTiming}
              onChange={setBloodGlucoseTiming}
            />
          </div>
        </div>
      </div>
      <DialogClose asChild>
        <div className='flex justify-around items-center w-full'>
          <Button
            variant='default'
            onClick={async () => {
              if (!bloodGlucose) return
              const currentDate = todaysLogDate.toDateString()
              await Promise.all([
                updateBloodGlucose({
                  date: currentDate,
                  fastedBloodGlucose: bloodGlucose.toFixed(1),
                }),
                updateBloodGlucoseTiming({
                  date: currentDate,
                  fastedBloodGlucoseTiming: isTimingEnabled
                    ? bloodGlucoseTiming
                    : '',
                }),
              ])
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
