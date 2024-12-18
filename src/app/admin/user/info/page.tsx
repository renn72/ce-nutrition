'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { getFormattedDate } from '@/lib/utils'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

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
      const day = new Date(new Date().setDate(today.getDate() - (30 - i)))
      weight = (Math.random() * 0.3 - 0.2 + Number(previousWeight)).toFixed(2)
      previousWeight = weight
      const sleep = (Math.random() * 3 + 6).toFixed(1)
      const bowelMovements = (Math.random() * 2 + 1).toFixed(0)
      console.log('weight', weight)
      addDailyLog({
        date: day,
        morningWeight: weight,
        notes: 'test notes',
        sleep: sleep,
        bowelMovements: bowelMovements,
        userId: userId,
      })
    }
  }

  if (!user) return null
  const plan = user?.userPlans.find((plan) => plan.id == user?.currentPlanId)
  if (!plan) return null
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
      <div className='flex gap-8'>
        <div className='flex flex-col gap-1 items-center'>
          {dailyLogs?.map((dailyLog) => (
            <div
              className='flex gap-6 items-center'
              key={dailyLog.id}
            >
              <div className='text-sm text-muted-foreground'>
                {getFormattedDate(dailyLog.date)}
              </div>
              <div className='text-sm text-muted-foreground'>
                {dailyLog.morningWeight}kg
              </div>
            </div>
          ))}
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
