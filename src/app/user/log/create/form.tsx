'use client'

import { api } from '@/trpc/react'

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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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

const DailyLogForm = ({
  todaysLog,
  date,
}: {
  todaysLog: GetDailyLogById | null
  date?: string | null
}) => {
  const router = useRouter()
  const ctx = api.useUtils()
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const { mutate: createDailyLog } = api.dailyLog.create.useMutation({
    onSuccess: () => {
      toast.success('Updated successfully')
      ctx.dailyLog.invalidate()
      setTimeout(() => {
        router.push('/')
      }, 1000)
    },
  })
  const { mutate: updateDailyLog } = api.dailyLog.update.useMutation({
    onSuccess: () => {
      toast.success('Updated successfully')
      ctx.dailyLog.invalidate()
      setTimeout(() => {
        router.push('/')
      }, 1000)
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: todaysLog?.date || new Date().toDateString(),
      morningWeight: todaysLog?.morningWeight || '',
      notes: todaysLog?.notes || '',
      nap: todaysLog?.nap || '',
      sleep: todaysLog?.sleep || '',
      waistMeasurement: todaysLog?.waistMeasurement || '',
      sleepQuality: todaysLog?.sleepQuality || '',
      fastedBloodGlucose: todaysLog?.fastedBloodGlucose || '',
      isHiit: todaysLog?.isHiit || false,
      isCardio: todaysLog?.isCardio || false,
      isLift: todaysLog?.isLift || false,
      isLiss: todaysLog?.isLiss || false,
      image: todaysLog?.image || '',
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('input', data)
    console.log('todaysLog', todaysLog)
    const today = new Date()
    if (!currentUser) return
    if (todaysLog) {
      console.log('update')
      updateDailyLog({
        id: todaysLog.id,
        date: data.date,
        morningWeight: data.morningWeight,
        notes: data.notes,
        nap: data.nap,
        sleep: data.sleep,
        sleepQuality: data.sleepQuality,
        waistMeasurement: data.waistMeasurement,
        fastedBloodGlucose: data.fastedBloodGlucose,
        isHiit: data.isHiit,
        isCardio: data.isCardio,
        isLift: data.isLift,
        isLiss: data.isLiss,
        image: data.image,
        userId: currentUser.id,
      })
    } else {
      console.log('create')
      createDailyLog({
        date: data.date,
        morningWeight: data.morningWeight,
        notes: data.notes,
        sleep: data.sleep,
        sleepQuality: data.sleepQuality,
        fastedBloodGlucose: data.fastedBloodGlucose,
        nap: data.nap,
        waistMeasurement: data.waistMeasurement,
        isHiit: data.isHiit,
        isCardio: data.isCardio,
        isLift: data.isLift,
        isLiss: data.isLiss,
        image: data.image,
        userId: currentUser.id,
      })
    }
  }

  const updateImage = (url: string) => {
    form.setValue('image', url)
  }

  const formDate = form.watch('date')

  const imageUrl = form.watch('image')
  console.log('imageUrl', imageUrl)
  return (
    <div className='mt-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2 mt-8 px-2 mb-16'>
            <h2 className='text-xl font-bold text-muted-foreground'>
              {new Date(formDate).toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </h2>
            <div className='flex items-center gap-8 w-full justify-between px-8'>
              <Button
                className='w-full'
                variant='secondary'
                type='submit'
              >
                Save
              </Button>
              <Button
                className='w-full'
                variant='secondary'
                onClick={(e) => {
                  e.preventDefault()
                  form.reset()
                }}
              >
                Clear
              </Button>
            </div>
            <div className='flex items-center gap-4'>
              <FormField
                control={form.control}
                name='morningWeight'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Morning Weight</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Morning Weight'
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
                name='fastedBloodGlucose'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Blood Glucose</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Blood Glucose'
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
                name='waistMeasurement'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Waist</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Waist'
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex items-center gap-4'>
              <FormField
                control={form.control}
                name='sleep'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Sleep</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Sleep'
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
                name='sleepQuality'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Sleep Quality</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Sleep Quality'
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
                name='nap'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Nap</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Nap'
                        {...field}
                        type='number'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-4 justify-between px-4'>
              <FormField
                control={form.control}
                name='isHiit'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormLabel className='mt-[8px]'>Hiit</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isCardio'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormLabel className='mt-[8px]'>Cardio</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isLift'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormLabel className='mt-[8px]'>Lift</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isLiss'
                render={({ field }) => (
                  <FormItem className='flex items-center gap-2'>
                    <FormLabel className='mt-[8px]'>LISS</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value)
                        }}
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
                      rows={1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {imageUrl === '' ? (
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
                      form.setValue('image', url)
                    }}
                  />
                  <Camera onUpload={updateImage} />
                </div>
              </div>
            ) : (
              <div className='flex gap-4 flex-col '>
                <div className='flex gap-2 items-center justify-around w-full'>
                  <img
                    src={imageUrl}
                    alt='img'
                    className='w-full h-full'
                  />
                </div>
                <Button
                  variant='secondary'
                  onClick={() => {
                    form.setValue('image', '')
                  }}
                >
                  Clear
                </Button>
              </div>
            )}
            <div></div>
          </div>
        </form>
      </Form>
    </div>
  )
}
export { DailyLogForm }
