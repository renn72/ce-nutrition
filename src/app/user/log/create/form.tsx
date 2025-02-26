'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { UploadButton } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { GetDailyLogById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDownIcon, ArrowUpIcon, Image, Minus, PlusIcon } from 'lucide-react'
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
import { Slider } from '@/components/ui/slider'
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
  prevValue,
  isWidthFull = false,
  fixed = 0,
}: {
  children: React.ReactNode
  title: string
  value: string
  prevValue: string
  isWidthFull?: boolean
  fixed?: number
}) => {
  const diff = Number(prevValue) - Number(value)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            'flex gap-2 items-center justify-around flex-col bg-secondary px-4 py-2 rounded-md ',
            isWidthFull ? 'w-full' : 'w-40 font-semibold',
          )}
        >
          <div className='text-muted-foreground text-center'>{title}</div>
          {value !== '' && value !== undefined && value !== null ? (
            <div
              className={cn(
                'relative',
                isWidthFull ? 'text-sm text-secondary-foreground' : '',
              )}
            >
              {value}
              {prevValue !== '' &&
              prevValue !== undefined &&
              prevValue !== null ? (
                <div className='absolute right-[-2.5rem] top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start'>
                  {diff === 0 ? null : diff < 0 ? (
                    <ArrowUpIcon size={12} />
                  ) : (
                    <ArrowDownIcon size={12} />
                  )}
                  {Math.abs(diff).toFixed(fixed)}
                </div>
              ) : null}
            </div>
          ) : (
            <div className='text-muted-foreground'>...</div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

const DailyLogForm = ({
  todaysLog,
  prevLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  prevLog: GetDailyLogById | null
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
  const [sleep, setSleep] = useState<number[]>(() =>
    todaysLog?.sleep ? [Number(todaysLog?.sleep)] : [0],
  )
  const [sleepQuality, setSleepQuality] = useState<number[]>(() =>
    todaysLog?.sleepQuality ? [Number(todaysLog?.sleepQuality)] : [0],
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
  const [note, setNote] = useState<string | null>(
    todaysLog?.notes ? todaysLog?.notes : null,
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
  const { mutate: updateNote } = api.dailyLog.updateNote.useMutation({
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
    <div className='flex flex-col gap-3 px-4'>
      <div className='flex gap-4 w-full justify-around'>
        <DialogWrapper
          title='Weight'
          value={todaysLog?.morningWeight ?? ''}
          prevValue={prevLog?.morningWeight ?? ''}
          fixed={1}
        >
          <DialogHeader>
            <DialogTitle>Weight</DialogTitle>
            <DialogDescription>Enter your weight today</DialogDescription>
          </DialogHeader>

          <div className='flex justify-center '>
            <div className='w-48 relative border rounded-lg h-12 flex items-center'>
              <Input
                placeholder='Weight'
                className='relative w-full text-base rounded-lg text-center h-min border-none focus:ring-0 focus:border-none shadow-none py-0'
                type='number'
                value={weight?.toFixed(1) ?? ''}
                onChange={(e) => {
                  setWeight(Number(e.target.value))
                }}
              />

              <div
                onClick={() => {
                  if (!weight) return
                  setWeight(weight + 0.1)
                }}
                className='absolute right-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-l'>
                <div className='h-12 w-10 flex items-center justify-center'>
                  <PlusIcon size={24} />
                </div>
              </div>
              <div
                onClick={() => {
                  if (!weight) return
                  setWeight(weight - 0.1)
                }}
                className='absolute left-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-r'>
                <div className='h-12 w-10 flex items-center justify-center'>
                  <Minus size={24} />
                </div>
              </div>
            </div>
          </div>
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
          prevValue={prevLog?.fastedBloodGlucose ?? ''}
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
          prevValue={prevLog?.sleep ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Sleep</DialogTitle>
            <DialogDescription>Enter your sleep today</DialogDescription>
          </DialogHeader>
          <div className='flex flex-col items-center gap-6'>
            <Input
              placeholder='Sleep'
              className=''
              type='number'
              value={sleep?.[0] ?? ''}
              onChange={(e) => {
                setSleep([Number(e.target.value)])
              }}
            />
            <Slider
              autoFocus
              defaultValue={[0]}
              min={4}
              max={12}
              step={1}
              value={sleep}
              onValueChange={(values) => {
                setSleep(values)
              }}
            />
          </div>
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!sleep) return
                  if (!sleep?.[0]) return
                  updateSleep({
                    date: todaysLogDate.toDateString(),
                    sleep: sleep[0].toString(),
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
          prevValue={prevLog?.sleepQuality ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Sleep Quality</DialogTitle>
            <DialogDescription>
              Enter your sleep quality today
            </DialogDescription>
          </DialogHeader>
          <div className='text-muted-foreground text-center text-xl font-bold'>
            {sleepQuality?.[0] ?? ''}
          </div>
          <Slider
            defaultValue={[0]}
            max={10}
            step={1}
            value={sleepQuality}
            onValueChange={(values) => {
              setSleepQuality(values)
              console.log('values', values)
            }}
          />
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!sleepQuality) return
                  if (!sleepQuality?.[0]) return
                  updateSleepQuality({
                    date: todaysLogDate.toDateString(),
                    sleepQuality: sleepQuality?.[0]?.toString(),
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
          prevValue={prevLog?.nap ?? ''}
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
          prevValue={''}
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
          prevValue={''}
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
          <div className='flex gap-2 w-full justify-around'>
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
        <DialogWrapper
          title='Liss'
          value={todaysLog?.liss ?? ''}
          prevValue={''}
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
          <div className='flex gap-2 w-full justify-around'>
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
        <DialogWrapper
          title='Weight Training'
          value={todaysLog?.weight ?? ''}
          prevValue={''}
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
          <div className='flex gap-2 w-full justify-around'>
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
            <DialogClose asChild>
              <div className='flex  w-full items-center justify-around'>
                <Button
                  variant='default'
                  onClick={() => {
                    if (!weightTraining) return
                    setWeightTraining(null)
                    updateWeightTraining({
                      date: todaysLogDate.toDateString(),
                      weight: '',
                    })
                  }}
                >
                  Clear
                </Button>
              </div>
            </DialogClose>
          </div>
        </DialogWrapper>
      </div>
      <DialogWrapper
        title='Notes'
        value={note ?? ''}
        isWidthFull={true}
        prevValue={''}
      >
        <DialogHeader>
          <DialogTitle>Note</DialogTitle>
          <DialogDescription>Enter your note today</DialogDescription>
        </DialogHeader>
        <Textarea
          placeholder='Note'
          className='w-full'
          value={note ?? ''}
          onChange={(e) => {
            setNote(e.target.value)
          }}
        />
        <div className='flex gap-2 w-full justify-around'>
          <DialogClose asChild>
            <div className='flex  w-full items-center justify-around'>
              <Button
                variant='default'
                onClick={() => {
                  if (!note) return
                  updateNote({
                    date: todaysLogDate.toDateString(),
                    notes: note,
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
                  if (!note) return
                  setNote(null)
                  updateNote({
                    date: todaysLogDate.toDateString(),
                    notes: '',
                  })
                }}
              >
                Clear
              </Button>
            </div>
          </DialogClose>
        </div>
      </DialogWrapper>
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
