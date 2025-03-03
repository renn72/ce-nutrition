'use client'

import { api } from '@/trpc/react'

import { useRouter, useSearchParams } from 'next/navigation'

import { UploadButton } from '@/lib/uploadthing'
import { zodResolver } from '@hookform/resolvers/zod'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

import { cn } from "@/lib/utils"

import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Camera } from '@/components/camera/camera'

export const dynamic = 'force-dynamic'

const formSchema = z.object({
  date: z.date(),
  bodyWeight: z.string(),
  leanMass: z.string(),
  bloodPressure: z.string(),
  bodyFat: z.string(),
  image: z.string().optional(),
  notes: z.string(),
})

const WeighInForm = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const ctx = api.useUtils()
  const { data: trainer } = api.user.getCurrentUser.useQuery()
  const { mutate: createWeighIn } = api.weighIn.create.useMutation({
    onSuccess: () => {
      toast.success('Updated successfully')
      ctx.weighIn.invalidate()
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      bodyWeight: '',
      leanMass: '',
      bloodPressure: '',
      bodyFat: '',
      image: '',
      notes: '',
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!trainer) return
    createWeighIn({
      date: data.date,
      bodyWeight: data.bodyWeight,
      leanMass: data.leanMass,
      bloodPressure: data.bloodPressure,
      bodyFat: data.bodyFat,
      image: data.image,
      notes: data.notes,
      userId: userId,
      trainerId: trainer.id,
    })
  }

  const updateImage = (url: string) => {
    form.setValue('image', url)
  }

  const imageUrl = form.watch('image')
  console.log('imageUrl', imageUrl)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 mt-10 px-2 mb-16'>
          <FormField
            control={form.control}
            name='date'
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='bodyWeight'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Body Weight</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Weight'
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
            name='leanMass'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Lean Mass</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Lean Mass'
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
            name='bodyFat'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Body Fat</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Body Fat'
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
            name='bloodPressure'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Blood Pressure</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Blood Pressure'
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
          {imageUrl === '' ? (
            <div className='flex gap-4 justify-around w-full'>
              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                  console.log('onClientUploadComplete', res)
                  const url = res?.[0]?.url
                  form.setValue('image', url)
                }}
              />
              <Camera onUpload={updateImage} />
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
          <div>
            <Button
              className='w-full'
              type='submit'
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
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

  return (
    <div className='max-w-xl w-full mx-auto mt-10'>
      <WeighInForm userId={userId} />
    </div>
  )
}
