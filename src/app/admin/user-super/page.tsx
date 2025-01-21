'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const UserInfo = ({ userId }: { userId: string }) => {
  const ctx = api.useUtils()

  const { data: user } = api.user.get.useQuery(userId || '')
  const { data: trainer } = api.user.getByEmail.useQuery('renn@warner.systems')
  const { mutate: addDailyLog } = api.dailyLog.create.useMutation({
    onSuccess: () => {
      ctx.dailyLog.invalidate()
      toast.success('Daily Log Added')
    },
  })
  const { mutate: deleteDailyLog } = api.dailyLog.deleteAll.useMutation({
    onSuccess: () => {
      ctx.dailyLog.invalidate()
      toast.success('Daily Log Deleted')
    },
  })
  const { mutate: addWeighIn } = api.weighIn.create.useMutation({
    onSuccess: () => {
      ctx.weighIn.invalidate()
      toast.success('Weight Added')
    },
  })
  const { mutate: deleteAllWeighIn } = api.weighIn.deleteAll.useMutation({
    onSuccess: () => {
      ctx.weighIn.invalidate()
      toast.success('Weight Deleted')
    },
  })

  const onGenerateWeighIn = () => {
    if (!userId) return

    const today = new Date()

    let previousWeight = '95'
    let weight = '95'

    let previousLeanMass = '20'
    let leanMass = '20'

    let previousfat = '20'
    let fat = '20'

    for (let i = 0; i < 10; i++) {
      const day = new Date(new Date().setDate(today.getDate() - (75 - i * 7)))

      weight = (Math.random() * 0.3 - 0.2 + Number(previousWeight)).toFixed(2)
      previousWeight = weight

      fat = (Math.random() * 0.3 - 0.2 + Number(previousfat)).toFixed(2)
      previousfat = fat

      leanMass = (Math.random() * 0.3 - 0.2 + Number(previousLeanMass)).toFixed(
        2,
      )
      previousLeanMass = leanMass

      addWeighIn({
        date: day,
        bodyWeight: weight,
        bodyFat: fat,
        leanMass: leanMass,
        bloodPressure: '',
        image:
          'https://utfs.io/f/fnZ11GC5JP7TJuAZLWzQlUhGn0Yg5u4jVDdi6AkWxtIPEN8b',
        notes: '',
        userId: userId,
        trainerId: trainer?.id || userId,
      })
    }
  }

  const onGenerateDailyLog = () => {
    if (!userId) return

    const today = new Date()

    let previousWeight = '95'
    let weight = '95'

    for (let i = 0; i < 30; i++) {
      const day = new Date(new Date().setDate(today.getDate() - (29 - i)))
      weight = (Math.random() * 0.3 - 0.2 + Number(previousWeight)).toFixed(2)
      previousWeight = weight
      const sleep = (Math.random() * 3 + 6).toFixed(1)
      const sleepQuality = (Math.random() * 3 + 6).toFixed(0)
      const bowelMovements = (Math.random() * 2 + 1).toFixed(0)
      console.log('weight', weight)
      addDailyLog({
        date: day,
        morningWeight: weight,
        notes: day.toDateString(),
        sleep: sleep,
        sleepQuality: sleepQuality,
        isHiit: Math.random() > 0.3,
        isCardio: Math.random() > 0.3,
        isLift: Math.random() > 0.3,
        bowelMovements: bowelMovements,
        userId: userId,
        image:
          'https://utfs.io/f/fnZ11GC5JP7TujgXDjr1YfPNCcKl7sMt9A0TvRGSHi8B5QqE',
      })
    }
  }

  if (!user) return null

  return (
    <div className='flex flex-col gap-4 items-center mt-10 '>
      <div className='flex gap-4 items-center'>
        <Button
          onClick={onGenerateWeighIn}
          variant='secondary'
        >
          Generate Weigh In's
        </Button>
        <Button
          onClick={() => deleteAllWeighIn(userId || '')}
          variant='destructive'
        >
          Delete Weigh In's
        </Button>
      </div>
      <div className='flex gap-4 items-center'>
        <Button
          variant='secondary'
          onClick={onGenerateDailyLog}
        >
          Generate Daily Log
        </Button>
        <Button
          variant='destructive'
          onClick={() => deleteDailyLog(userId || '')}
        >
          Delete Daily Log
        </Button>
      </div>
    </div>
  )
}

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  return <UserInfo userId={userId} />
}
