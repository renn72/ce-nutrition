'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { DailyLogForm } from './form'

const Log = ({ id, date }: { id: number; date: string | number }) => {
  const { data: log, isLoading } = api.dailyLog.get.useQuery(id)
  if (isLoading) return null
  return (
    <DailyLogForm
      todaysLog={log}
      date={new Date(date).toDateString()}
    />
  )
}

export default function Home() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [date, setDate] = useState<Date | undefined>(
    () => new Date(Number(searchParams.get('date'))),
  )
  const [ isOpen, setIsOpen ] = useState(false)
  const { data: dailyLogs, isLoading } =
    api.dailyLog.getAllCurrentUser.useQuery()

  if (isLoading) return null

  const log = dailyLogs?.find((log) => log.date === date?.toDateString())
  console.log('log', log)

  if (!date) return null

  return (
    <div className='mt-16 flex flex-col gap-3'>
      <div className='w-full text-center text-xl font-semibold'>
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              size={'lg'}
              className={cn(
                'w-[280px] justify-start text-left font-semibold text-base',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className='mr-4 h-4 w-4 mt-[-5px]' />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0'>
            <Calendar
              mode='single'
              selected={date}
              onSelect={(date) => {
                setDate(date)
                setIsOpen(false)
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <DailyLogForm
        todaysLog={log}
        date={date.toDateString()}
      />
    </div>
  )
}
