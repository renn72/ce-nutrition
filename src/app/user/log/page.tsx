'use client'

import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { UploadButton } from "@/lib/uploadthing"

export const dynamic = 'force-dynamic'

const formSchema = z.object({
  date: z.date(),
  morningWeight: z.string(),
  notes: z.string(),
  sleep: z.string(),
  sleepQuality: z.string().optional(),
  isHiit: z.boolean().optional(),
  isCardio: z.boolean().optional(),
  isLift: z.boolean().optional(),
  bowelMovements: z.string(),
  image: z.string().optional(),
})

export default function Home() {
  const ctx = api.useUtils()
  const { data: currentUser } = api.user.getCurrentUser.useQuery()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      morningWeight: '',
      notes: '',
      sleep: '',
      sleepQuality: '',
      isHiit: false,
      isCardio: false,
      isLift: false,
      bowelMovements: '',
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('input', data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4 mt-10 px-2'>
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
            name='bowelMovements'
            render={({ field }) => (
              <FormItem className='flex flex-col'>
                <FormLabel>Bowel Movements</FormLabel>
                <FormControl>
                  <Input
                    placeholder="poop's"
                    {...field}
                    type='number'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex gap-4 justify-between'>
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
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log('onClientUploadComplete', res)
              const url = res?.[0]?.url
              form.setValue('image', url)
            }}
          />
          <div>
            <Button type='submit'>Save</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
