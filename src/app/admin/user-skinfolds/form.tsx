'use client'

import { api } from '@/trpc/react'

import { formulaOne } from './utils'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { GetSkinfoldById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { useAtom } from 'jotai'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { NumberInput } from '@/components/ui/number-input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { SaveButton } from '@/components/ui/save-button'
import { Textarea } from '@/components/ui/textarea'

import { isFormOpenAtom } from './atom'

export const dynamic = 'force-dynamic'

const formSchema = z.object({
  chin: z.string(),
  cheek: z.string(),
  lowerAbdominal: z.string(),
  pectoral: z.string(),
  biceps: z.string(),
  triceps: z.string(),
  subscapular: z.string(),
  midAxillary: z.string(),
  suprailiac: z.string(),
  umbilical: z.string(),
  lowerBack: z.string(),
  quadriceps: z.string(),
  hamstrings: z.string(),
  medialCalf: z.string(),
  knee: z.string(),
  shoulder: z.string(),
  notes: z.string(),
})

const BodyWeight = ({
  bodyWeight,
  setBodyWeight,
}: {
  bodyWeight: number
  setBodyWeight: React.Dispatch<React.SetStateAction<number>>
}) => {
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
          )}
        >
          <div className='text-muted-foreground text-center'>Body Weight</div>
          <div>{bodyWeight}</div>
        </div>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Weight</DialogTitle>
          <DialogDescription>Enter your weight today</DialogDescription>
        </DialogHeader>

        <div className='flex justify-center '>
          <NumberInput
            value={bodyWeight}
            setValue={setBodyWeight}
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
                setIsOpen(false)
              }}
            >
              Save
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

const SkinFoldsForm = ({
  userId,
  date,
  bodyWeight: _bodyWeight,
  setIsOpen,
  skinfold,
}: {
  userId: string
  date: Date
  bodyWeight: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  skinfold: GetSkinfoldById | null
}) => {
  const router = useRouter()
  const ctx = api.useUtils()

  const [skinfoldId, setSkinfoldId] = useState<number | null>(() => {
    if (skinfold) return skinfold.id
    return null
  })

  const [isMutating, setIsMutating] = useState(false)

  console.log('bodyWeight', _bodyWeight)

  const { mutate: createSkinfold } = api.metrics.createSkinfold.useMutation({
    onMutate: () => {
      setIsMutating(true)
    },
    onSuccess: () => {
      toast.success('Skinfold saved')
      setIsOpen(false)
    },
    onSettled: () => {
      setIsMutating(false)
      ctx.metrics.invalidate()
    },
  })

  const { mutate: deleteSkinfold } = api.metrics.deleteSkinfold.useMutation()

  const [bodyWeight, setBodyWeight] = useState<number>(() =>
    Number(_bodyWeight),
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chin: skinfold?.chin ?? '',
      cheek: skinfold?.cheek ?? '',
      lowerAbdominal: skinfold?.lowerAbdominal ?? '',
      pectoral: skinfold?.pectoral ?? '',
      biceps: skinfold?.biceps ?? '',
      triceps: skinfold?.triceps ?? '',
      subscapular: skinfold?.subscapular ?? '',
      midAxillary: skinfold?.midAxillary ?? '',
      suprailiac: skinfold?.suprailiac ?? '',
      umbilical: skinfold?.umbilical ?? '',
      lowerBack: skinfold?.lowerBack ?? '',
      quadriceps: skinfold?.quadriceps ?? '',
      hamstrings: skinfold?.hamstrings ?? '',
      medialCalf: skinfold?.medialCalf ?? '',
      knee: skinfold?.knee ?? '',
      shoulder: skinfold?.shoulder ?? '',
      notes: skinfold?.notes ?? '',
    },
  })

  const chin = Number(form.watch('chin'))
  const cheek = Number(form.watch('cheek'))
  const lowerAbdominal = Number(form.watch('lowerAbdominal'))
  const pectoral = Number(form.watch('pectoral'))
  const biceps = Number(form.watch('biceps'))
  const triceps = Number(form.watch('triceps'))
  const subscapular = Number(form.watch('subscapular'))
  const midAxillary = Number(form.watch('midAxillary'))
  const suprailiac = Number(form.watch('suprailiac'))
  const umbilical = Number(form.watch('umbilical'))
  const lowerBack = Number(form.watch('lowerBack'))
  const quadriceps = Number(form.watch('quadriceps'))
  const hamstrings = Number(form.watch('hamstrings'))
  const medialCalf = Number(form.watch('medialCalf'))
  const knee = Number(form.watch('knee'))
  const shoulder = Number(form.watch('shoulder'))

  const { bodyFat, leanMass, } = formulaOne({
    chin,
    cheek,
    lowerAbdominal,
    pectoral,
    biceps,
    triceps,
    subscapular,
    midAxillary,
    suprailiac,
    umbilical,
    lowerBack,
    quadriceps,
    hamstrings,
    medialCalf,
    knee,
    shoulder,
    bodyWeight,
  })

  let bodyFatOutput = bodyFat < 0 ? '...' : `${bodyFat.toFixed(2)}%`
  let leanMassOutput = bodyFat < 0 ? '...' : `${leanMass.toFixed(2)}kg`

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('data', data, bodyWeight, leanMass, bodyFat)
    if (skinfoldId) {
      deleteSkinfold(skinfoldId)
    }
    setSkinfoldId(null)
    createSkinfold({
      date: date.toDateString(),
      chin: data.chin,
      cheek: data.cheek,
      lowerAbdominal: data.lowerAbdominal,
      pectoral: data.pectoral,
      biceps: data.biceps,
      triceps: data.triceps,
      subscapular: data.subscapular,
      midAxillary: data.midAxillary,
      suprailiac: data.suprailiac,
      umbilical: data.umbilical,
      lowerBack: data.lowerBack,
      quadriceps: data.quadriceps,
      hamstrings: data.hamstrings,
      medialCalf: data.medialCalf,
      knee: data.knee,
      shoulder: data.shoulder,
      notes: data.notes,
      userId: userId,
      bodyWeight: bodyWeight.toFixed(1),
      leanMass: leanMass.toFixed(1),
      bodyFat: bodyFat.toFixed(1),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 my-2 px-2 mb-16'>
          <div className='grid grid-cols-3 gap-4'>
            <BodyWeight
              bodyWeight={bodyWeight}
              setBodyWeight={setBodyWeight}
            />
            <div className='flex gap-2 items-center justify-around flex-col bg-secondary px-4 py-2 rounded-md shadow-sm'>
              <div className='text-muted-foreground text-center'>Body Fat</div>
              <div>{bodyFatOutput}</div>
            </div>
            <div className='flex gap-2 items-center justify-around flex-col bg-secondary px-4 py-2 rounded-md shadow-sm'>
              <div className='text-muted-foreground text-center'>Lean Mass</div>
              <div>{leanMassOutput}</div>
            </div>
          </div>

          <div className='grid grid-cols-3 lg:grid-cols-4 gap-4'>
            <FormField
              control={form.control}
              name='chin'
              render={({ field }) => (
                <FormItem className='flex flex-col w-full'>
                  <FormLabel>Chin</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Chin'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='cheek'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Cheek</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Cheek'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lowerAbdominal'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className='truncate'>Upper Abdominal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Upper Abdominal'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pectoral'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Pectoral</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Pectoral'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='biceps'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Biceps</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Biceps'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='triceps'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Triceps</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Triceps'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subscapular'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Subscapular</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Subscapular'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='midAxillary'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Mid Axillary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Mid Axillary'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='suprailiac'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Suprailiac</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Suprailiac'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='umbilical'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Umbilical</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Umbilical'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lowerBack'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Lower Back</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Lower Back'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quadriceps'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Quadriceps</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Quadriceps'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='hamstrings'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Hamstrings</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Hamstrings'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='medialCalf'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Medial Calf</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Medial Calf'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='knee'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Knee</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Knee'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='shoulder'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Shoulder</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Shoulder'
                      {...field}
                      type='number'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='notes'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Notes'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-4 justify-around'>
            <SaveButton isSaving={isMutating} />
            <Button
              variant='outline'
              onClick={(e) => {
                e.preventDefault()
                const value = 6
                form.setValue('chin', (Math.random() * value).toFixed(2))
                form.setValue('cheek', (Math.random() * value).toFixed(2))
                form.setValue(
                  'lowerAbdominal',
                  (Math.random() * value).toFixed(2),
                )
                form.setValue('pectoral', (Math.random() * value).toFixed(2))
                form.setValue('biceps', (Math.random() * value).toFixed(2))
                form.setValue('triceps', (Math.random() * value).toFixed(2))
                form.setValue('subscapular', (Math.random() * value).toFixed(2))
                form.setValue('midAxillary', (Math.random() * value).toFixed(2))
                form.setValue('suprailiac', (Math.random() * value).toFixed(2))
                form.setValue('umbilical', (Math.random() * value).toFixed(2))
                form.setValue('lowerBack', (Math.random() * value).toFixed(2))
                form.setValue('quadriceps', (Math.random() * value).toFixed(2))
                form.setValue('hamstrings', (Math.random() * value).toFixed(2))
                form.setValue('medialCalf', (Math.random() * value).toFixed(2))
                form.setValue('knee', (Math.random() * value).toFixed(2))
                form.setValue('shoulder', (Math.random() * value).toFixed(2))
              }}
            >
              Generate
            </Button>
            <Button
              variant='outline'
              onClick={(e) => {
                e.preventDefault()
                form.reset()
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

const SkinfoldFormContent = ({
  userId,
  bodyWeight,
  setIsOpen,
  skinfold = null,
}: {
  userId: string
  bodyWeight: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  skinfold?: GetSkinfoldById | null
}) => {
  const [date, setDate] = useState<Date | undefined>(() => {
    if (skinfold) return new Date(skinfold.date)
    return new Date()
  })

  const _bodyWeight = skinfold
    ? skinfold.bodyWeight?.[0]?.bodyWeight
    : bodyWeight

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Skinfold</DialogTitle>
      </DialogHeader>
      <DialogDescription>Enter your skinfold data</DialogDescription>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            size='lg'
            className={cn(
              'pr-12 pl-6  text-left font-normal relative',
              !date && 'text-muted-foreground',
            )}
          >
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
            <CalendarIcon className=' h-4 w-4 opacity-50 absolute right-2 top-2' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto p-0'
          align='start'
        >
          <Calendar
            mode='single'
            selected={date}
            onSelect={setDate}
            disabled={(value) =>
              value > new Date() || value < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <SkinFoldsForm
        setIsOpen={setIsOpen}
        userId={userId}
        date={date ?? new Date()}
        bodyWeight={_bodyWeight ?? ''}
        skinfold={skinfold}
      />
    </>
  )
}

const SkinfoldForm = ({
  userId,
  bodyWeight,
}: {
  userId: string
  bodyWeight: string
}) => {
  const [isOpen, setIsOpen] = useAtom(isFormOpenAtom)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button>Create Skinfold</Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-2xl'>
        <SkinfoldFormContent
          userId={userId}
          bodyWeight={bodyWeight}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  )
}

export { SkinfoldForm, SkinfoldFormContent }
