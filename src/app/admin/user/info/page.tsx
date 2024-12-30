'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { getFormattedDate } from '@/lib/utils'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

import { DailyLog } from '@/components/daily-log/daily-log'

export default function Home() {
  const ctx = api.useUtils()
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  const { data: user } = api.user.get.useQuery(userId || '')
  const { data: trainer } = api.user.getByEmail.useQuery('renn@warner.systems')
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId || '')
  const { data: weighIns } = api.weighIn.getAllUser.useQuery(userId || '')
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
        notes: 'test notes',
        sleep: sleep,
        sleepQuality: sleepQuality,
        isHiit: Math.random() > 0.3,
        isCardio: Math.random() > 0.3,
        isLift: Math.random() > 0.3,
        bowelMovements: bowelMovements,
        userId: userId,
        image:
          'https://utfs.io/f/fnZ11GC5JP7TQYL3jL86fSlZ2KgctYiQ5PGL3nHRhJIMW0CE',
      })
    }
  }

  if (!user) return null
  const plan = user?.userPlans.find((plan) => plan.id == user?.currentPlanId)
  if (!plan) return null
  const length = dailyLogs ? (dailyLogs?.length > 30 ? 30 : dailyLogs?.length) : 0
  const today = new Date()

  return (
    <div className='flex flex-col gap-4 items-center mt-10 '>
      current program: {plan.name}
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
      <div className='flex gap-8 flex-col'>
        <div className='flex flex-col gap-1 items-center'>
          {Array.from({ length: length }).map((_, i) => {
            const date = new Date(today.getTime() - i * 86400000)
            return (
              <div
                key={i}
                className='flex gap-2 flex-col'
              >
                <div className='text-sm text-muted-foreground font-semibold text-center'>
                  {getFormattedDate(date)}
                </div>
                <DailyLog
                  dailyLogs={dailyLogs}
                  day={date}
                  isLog={true}
                />
              </div>
            )
          })}
        </div>
        <div className='flex flex-col gap-1 items-center'>
          {weighIns?.map((weighIn) => (
            <div
              className='flex gap-6 items-center'
              key={weighIn.id}
            >
              <div className='text-sm text-muted-foreground'>
                {getFormattedDate(weighIn.date)}
              </div>
              <div className='text-sm text-muted-foreground'>
                {weighIn.bodyWeight}kg
              </div>
              <div className='text-sm text-muted-foreground'>
                {weighIn.leanMass}kg
              </div>
              <div className='text-sm text-muted-foreground'>
                {weighIn.bodyFat}kg
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
