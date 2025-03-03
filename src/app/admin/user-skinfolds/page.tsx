'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

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

const SkinFoldsForm = ({ userId, date }: { userId: string; date: Date }) => {
  const router = useRouter()
  const ctx = api.useUtils()
  const { data: trainer } = api.user.getCurrentUser.useQuery()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chin: '',
      cheek: '',
      lowerAbdominal: '',
      pectoral: '',
      biceps: '',
      triceps: '',
      subscapular: '',
      midAxillary: '',
      suprailiac: '',
      umbilical: '',
      lowerBack: '',
      quadriceps: '',
      hamstrings: '',
      medialCalf: '',
      knee: '',
      shoulder: '',
      notes: '',
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('data', data)
    if (!trainer) return
  }

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

  const constOne = 0.291
  const constTwo = 0.3427
  const constThree = 0.4078
  const constFour = 0.4245
  const constFive = 0.3785
  const constSix = 0.2887
  const constSeven = 0.3699
  const constEight = 0.3622
  const constNine = 0.4222
  const constTen = 0.3449
  const constEleven = 0.4016
  const constTwelve = 0.3789
  const constThirteen = 0.3431
  const constFourteen = 0.3573
  const constFifteen = 0.2986
  const constSixteen = 0.039

  const bodyFat =
    0.3 +
    constOne * chin +
    constTwo * cheek +
    constThree * lowerAbdominal +
    constFour * pectoral +
    constFive * biceps +
    constSix * triceps +
    constSeven * subscapular +
    constEight * midAxillary +
    constNine * suprailiac +
    constTen * umbilical +
    constEleven * lowerBack +
    constTwelve * quadriceps +
    constThirteen * hamstrings +
    constFourteen * medialCalf +
    constFifteen * knee +
    constSixteen * shoulder

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 mt-10 px-2 mb-16'>
          <div className='font-semibold text-center text-3xl'>
            BodyFat {bodyFat === 0.3 ? 0 : bodyFat.toFixed(2)}%
          </div>
          <div className='grid grid-cols-4 gap-4'>
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
                  <FormLabel>Lower Abdominal</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Lower Abdominal'
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
        </div>
      </form>
    </Form>
  )
}
export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  const [date, setDate] = useState<Date | undefined>(new Date())

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  return (
    <div className='max-w-2xl w-full mx-auto mt-10'>
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
        userId={userId}
        date={date ?? new Date()}
      />
    </div>
  )
}
