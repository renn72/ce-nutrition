'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { UploadButton } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { GetDailyLogById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Image,
  Minus,
  PlusIcon,
} from 'lucide-react'
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

const NumberInput = ({
  value,
  setValue,
  fixed = 0,
  scale,
  postfix = '',
}: {
  value: number | null
  setValue: (value: number) => void
  fixed?: number
  scale: number
  postfix?: string
}) => {
  return (
    <div className='w-60 relative border rounded-lg h-16 flex items-center'>
      <Input
        placeholder=''
        className='relative w-full text-xl font-medium rounded-lg text-center h-min border-none focus-visible:ring-0 focus:border-none shadow-none py-0 active:border-none'
        type='number'
        value={value && value % 1 === 0 ? value : (value?.toFixed(fixed) ?? '')}
        onChange={(e) => {
          setValue(Number(e.target.value))
        }}
      />

      <div className='absolute right-16 top-1/2 -translate-y-1/2 text-xs text-muted-foreground flex gap-0 items-start pt-[2px]'>
        {postfix}
      </div>

      <div
        onClick={() => {
          if (!value) {
            setValue(scale)
            return
          }
          setValue(value + scale)
        }}
        className='absolute right-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-l active:bg-primary/60 rounded-r-lg'
      >
        <div className='h-16 w-14 flex items-center justify-center scale-75'>
          <PlusIcon size={24} />
        </div>
      </div>
      <div
        onClick={() => {
          if (!value) return
          setValue(value - scale)
        }}
        className='absolute left-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-r active:bg-primary/30 rounded-l-lg'
      >
        <div className='h-16 w-14 flex items-center justify-center active:scale-75'>
          <Minus size={24} />
        </div>
      </div>
    </div>
  )
}

const DialogWrapper = ({
  children,
  title,
  value,
  prevValue,
  isWidthFull = false,
  fixed = 0,
  isString = false,
  postfix = '',
}: {
  children: React.ReactNode
  title: string
  value: string
  prevValue: string
  isWidthFull?: boolean
  fixed?: number
  isString?: boolean
  postfix?: string
}) => {
  const diff = Number(prevValue) - Number(value)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <div
          className={cn(
            'flex gap-2 items-center justify-around flex-col bg-secondary px-4 py-2 rounded-md shadow-sm',
            'active:scale-90 active:shadow-none transition-transform cursor-pointer',
            isOpen ? 'scale-90 shadow-none' : '',
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
              {postfix !== '' ? (
                <div className='absolute right-[-2.5rem] top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start'>
                  {postfix}
                </div>
              ) : null}
              {isString ? value : Number(value).toFixed(fixed)}
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
        className='top-20 translate-y-0 '
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
    todaysLog?.morningWeight
      ? Number(todaysLog?.morningWeight)
      : prevLog?.morningWeight
        ? Number(prevLog?.morningWeight)
        : null,
  )
  const [bloodGlucose, setBloodGlucose] = useState<number | null>(() =>
    todaysLog?.fastedBloodGlucose
      ? Number(todaysLog?.fastedBloodGlucose)
      : prevLog?.fastedBloodGlucose
        ? Number(prevLog?.fastedBloodGlucose)
        : null,
  )
  const [sleep, setSleep] = useState<number[]>(() =>
    todaysLog?.sleep
      ? [Number(todaysLog?.sleep)]
      : prevLog?.sleep
        ? [Number(prevLog?.sleep)]
        : [5],
  )
  const [sleepQuality, setSleepQuality] = useState<number[]>(() =>
    todaysLog?.sleepQuality
      ? [Number(todaysLog?.sleepQuality)]
      : prevLog?.sleepQuality
        ? [Number(prevLog?.sleepQuality)]
        : [5],
  )
  const [nap, setNap] = useState<number | null>(
    todaysLog?.nap
      ? Number(todaysLog?.nap)
      : prevLog?.nap
        ? Number(prevLog?.nap)
        : null,
  )
  const [waistMeasurement, setWaistMeasurement] = useState<number | null>(() =>
    todaysLog?.waistMeasurement
      ? Number(todaysLog?.waistMeasurement)
      : prevLog?.waistMeasurement
        ? Number(prevLog?.waistMeasurement)
        : null,
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
            <NumberInput
              value={weight}
              setValue={setWeight}
              fixed={1}
              scale={0.1}
              postfix='kg'
            />
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
                    morningWeight: weight?.toFixed(2),
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
          fixed={1}
        >
          <DialogHeader>
            <DialogTitle>Blood Glucose</DialogTitle>
            <DialogDescription>
              Enter yout blood glucose today
            </DialogDescription>
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
            <div className='flex justify-center '>
              <NumberInput
                value={sleep[0] ?? 5}
                setValue={(e) => setSleep([Number(e)])}
                fixed={1}
                scale={0.1}
                postfix='hrs'
              />
            </div>
            <Slider
              autoFocus
              defaultValue={[5]}
              min={4}
              max={12}
              step={0.1}
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
                    sleep: sleep[0].toFixed(1),
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
          <div className='flex justify-center '>
            <NumberInput
              value={sleepQuality[0] ?? 5}
              setValue={(e) => setSleepQuality([e])}
              fixed={1}
              scale={0.1}
            />
          </div>
          <Slider
            defaultValue={[5]}
            max={10}
            step={0.1}
            value={sleepQuality}
            onValueChange={(values) => {
              setSleepQuality(values)
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
                    sleepQuality: sleepQuality?.[0]?.toFixed(0),
                  })
                }}
              >
                Save
              </Button>
            </div>
          </DialogClose>
        </DialogWrapper>
        <DialogWrapper
          title='Nap'
          value={todaysLog?.nap ?? ''}
          prevValue={prevLog?.nap ?? ''}
        >
          <DialogHeader>
            <DialogTitle>Nap</DialogTitle>
            <DialogDescription>Enter your nap today</DialogDescription>
          </DialogHeader>
          <div className='flex justify-center '>
            <NumberInput
              value={nap}
              setValue={setNap}
              fixed={1}
              scale={0.1}
              postfix='hrs'
            />
          </div>
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
      </div>
      <div className='flex gap-2 w-full justify-around'>
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
        <DialogWrapper
          title='Weight Training'
          value={todaysLog?.weight ?? ''}
          prevValue={''}
          postfix='mins'
        >
          <DialogHeader>
            <DialogTitle>Weight Training</DialogTitle>
            <DialogDescription>
              Enter your minutes of weight training
            </DialogDescription>
          </DialogHeader>
          <div className='flex justify-center '>
            <NumberInput
              value={weightTraining}
              setValue={setWeightTraining}
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
                    if (!weightTraining) return
                    updateWeightTraining({
                      date: todaysLogDate.toDateString(),
                      weight: weightTraining?.toFixed(0),
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
        isString={true}
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
                  background: 'hsl(var(--secondary))',
                  color: 'hsl(var(--secondary-foreground))',
                  fontSize: '14px',
                  fontWeight: '550',
                },
              }}
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                console.log('onClientUploadComplete', res)
                const url = res?.[0]?.url
                onUpdateImage(url ?? '')
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
