'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { UploadButton } from '@/lib/uploadthing'
import { GetDailyLogById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'

import { Camera } from '@/components/camera/camera'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  date: z.string(),
  morningWeight: z.string().optional(),
  notes: z.string().optional(),
  sleep: z.string().optional(),
  sleepQuality: z.string().optional(),
  fastedBloodGlucose: z.string().optional(),
  nap: z.string().optional(),
  waistMeasurement: z.string().optional(),
  isHiit: z.boolean().optional(),
  isCardio: z.boolean().optional(),
  isLift: z.boolean().optional(),
  isLiss: z.boolean().optional(),
  image: z.string().optional(),
})

const DialogWrapper = ({
  children,
  title,
  value,
}: {
  children: React.ReactNode
  title: string
  value: string
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='flex gap-2 items-center justify-around flex-col bg-secondary px-4 py-2 rounded-md font-semibold w-40'>
          <div className='text-muted-foreground text-center'>{title}</div>
          {value !== '' && value !== undefined && value !== null ? (
            <div>{value}</div>
          ) : (
            <div className='text-muted-foreground'>...</div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

const DailyLogForm = ({
  todaysLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  date?: string | null
}) => {
  const [weight, setWeight] = useState<number | null>(() =>
    todaysLog?.morningWeight ? Number(todaysLog?.morningWeight) : null,
  )
  const [bloodGlucose, setBloodGlucose] = useState<number | null>(() =>
    todaysLog?.fastedBloodGlucose
      ? Number(todaysLog?.fastedBloodGlucose)
      : null,
  )
  const [sleep, setSleep] = useState<number | null>(() =>
    todaysLog?.sleep ? Number(todaysLog?.sleep) : null,
  )
  const [sleepQuality, setSleepQuality] = useState<number | null>(() =>
    todaysLog?.sleepQuality ? Number(todaysLog?.sleepQuality) : null,
  )
  const [nap, setNap] = useState<number | null>(
    todaysLog?.nap ? Number(todaysLog?.nap) : null,
  )
  const [waistMeasurement, setWaistMeasurement] = useState<number | null>(() =>
    todaysLog?.waistMeasurement ? Number(todaysLog?.waistMeasurement) : null,
  )
  const [hiit, setHiit] = useState<number | null>(
    todaysLog?.hiit ? Number(todaysLog?.hiit) : null,
  )
  const [liss, setLiss] = useState<number | null>(
    todaysLog?.liss ? Number(todaysLog?.liss) : null,
  )
  const [weightTraining, setWeightTraining] = useState<number | null>(() =>
    todaysLog?.weight ? Number(todaysLog?.weight) : null,
  )

  const router = useRouter()
  const ctx = api.useUtils()
  const todaysLogDate = new Date(date ?? '')
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const { mutate: updateImage } = api.dailyLog.updateImage.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })
  const { mutate: updateWeightTraining } =
    api.dailyLog.updateWeightTraining.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })
  const { mutate: updateBloodGlucose } =
    api.dailyLog.updateBloodGlucose.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })
  const { mutate: updateSleep } = api.dailyLog.updateSleep.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })
  const { mutate: updateSleepQuality } =
    api.dailyLog.updateSleepQuality.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })
  const { mutate: updateNap } = api.dailyLog.updateNap.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })
  const { mutate: updateWaistMeasurement } =
    api.dailyLog.updateWaistMeasurement.useMutation({
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })
  const { mutate: updateHiit } = api.dailyLog.updateHiit.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  const { mutate: updateLiss } = api.dailyLog.updateLiss.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })
  const { mutate: updateWeight } = api.dailyLog.updateWeight.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  const onUpdateImage = (url: string) => {
    updateImage({
      date: todaysLogDate.toDateString(),
      image: url,
    })
  }

  return (
    <div className='mt-16 flex flex-col gap-3 px-4'>
      <div className='w-full text-center text-xl font-semibold'>{date}</div>
      <div className='flex gap-4 w-full justify-around'>
        <DialogWrapper
          title='Weight'
          value={todaysLog?.morningWeight ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Weight</DialogTitle>
            <DialogDescription>Enter your weight today</DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Weight'
            className='w-full'
            type='number'
            value={weight ?? ''}
            onChange={(e) => {
              setWeight(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                size='lg'
                onClick={() => {
                  if (!weight) return
                  updateWeight({
                    date: todaysLogDate.toDateString(),
                    morningWeight: weight?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
        <DialogWrapper
          title='Blood Glucose'
          value={todaysLog?.fastedBloodGlucose ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Blood Glucose</DialogTitle>
            <DialogDescription>
              Enter yout blood glucose today
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Blood Glucose'
            className='w-full'
            type='number'
            value={bloodGlucose ?? ''}
            onChange={(e) => {
              setBloodGlucose(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!bloodGlucose) return
                  updateBloodGlucose({
                    date: todaysLogDate.toDateString(),
                    fastedBloodGlucose: bloodGlucose?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
      </div>
      <div className='flex gap-4 w-full justify-around'>
        <DialogWrapper
          title='Sleep'
          value={todaysLog?.sleep ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Sleep</DialogTitle>
            <DialogDescription>Enter your sleep today</DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Sleep'
            className='w-full'
            type='number'
            value={sleep ?? ''}
            onChange={(e) => {
              setSleep(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!sleep) return
                  updateSleep({
                    date: todaysLogDate.toDateString(),
                    sleep: sleep?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
        <DialogWrapper
          title='Sleep Quality'
          value={todaysLog?.sleepQuality ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Sleep Quality</DialogTitle>
            <DialogDescription>
              Enter your sleep quality today
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Sleep Quality'
            className='w-full'
            type='number'
            value={sleepQuality ?? ''}
            onChange={(e) => {
              setSleepQuality(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!sleepQuality) return
                  updateSleepQuality({
                    date: todaysLogDate.toDateString(),
                    sleepQuality: sleepQuality?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
      </div>
      <div className='flex gap-4 w-full justify-around'>
        <DialogWrapper
          title='Nap'
          value={todaysLog?.nap ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Nap</DialogTitle>
            <DialogDescription>Enter your nap today</DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Nap'
            className='w-full'
            type='number'
            value={nap ?? ''}
            onChange={(e) => {
              setNap(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!nap) return
                  updateNap({
                    date: todaysLogDate.toDateString(),
                    nap: nap?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
        <DialogWrapper
          title='Girth'
          value={todaysLog?.waistMeasurement ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Girth</DialogTitle>
            <DialogDescription>
              Enter your waist measurement today
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Girth'
            className='w-full'
            type='number'
            value={waistMeasurement ?? ''}
            onChange={(e) => {
              setWaistMeasurement(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!waistMeasurement) return
                  updateWaistMeasurement({
                    date: todaysLogDate.toDateString(),
                    waistMeasurement: waistMeasurement?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
      </div>
      <div className='flex gap-2 w-full justify-around'>
        <DialogWrapper
          title='Hiit'
          value={todaysLog?.hiit ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Hiit</DialogTitle>
            <DialogDescription>Enter your hiit today</DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Hiit'
            className='w-full'
            type='number'
            value={hiit ?? ''}
            onChange={(e) => {
              setHiit(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!hiit) return
                  updateHiit({
                    date: todaysLogDate.toDateString(),
                    hiit: hiit?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
        <DialogWrapper
          title='Liss'
          value={todaysLog?.liss ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Liss</DialogTitle>
            <DialogDescription>Enter your liss today</DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Liss'
            className='w-full'
            type='number'
            value={liss ?? ''}
            onChange={(e) => {
              setLiss(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!liss) return
                  updateLiss({
                    date: todaysLogDate.toDateString(),
                    liss: liss?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
        <DialogWrapper
          title='Weight Training'
          value={todaysLog?.weight ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Weight Training</DialogTitle>
            <DialogDescription>
              Enter your weight training today
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Weight Training'
            className='w-full'
            type='number'
            value={weightTraining ?? ''}
            onChange={(e) => {
              setWeightTraining(Number(e.target.value))
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!weightTraining) return
                  updateWeightTraining({
                    date: todaysLogDate.toDateString(),
                    weight: weightTraining?.toString(),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
      </div>
      {todaysLog?.image === '' ||
      todaysLog?.image === undefined ||
      todaysLog?.image === null ? (
        <div className='flex gap-4 flex-col w-full items-center'>
          <Image
            className='text-muted-foreground'
            size={64}
            strokeWidth={1}
          />
          <div className='flex gap-4 justify-around w-full'>
            <UploadButton
              appearance={{
                button: {
                  background: '#ccc',
                },
              }}
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                console.log('onClientUploadComplete', res)
                const url = res?.[0]?.url
              }}
            />
            <Camera onUpload={onUpdateImage} />
          </div>
        </div>
      ) : (
        <div className='flex gap-4 flex-col '>
          <div className='flex gap-2 items-center justify-around w-full'>
            <img
              src={todaysLog?.image ?? ''}
              alt='img'
              className='w-full h-full'
            />
          </div>
          <Button
            variant='secondary'
            onClick={() => {}}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}
export { DailyLogForm }
