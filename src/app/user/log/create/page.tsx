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

export default function Home() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [date, setDate] = useState<Date | undefined>(
    () => new Date(Number(searchParams.get('date'))),
  )
  const [isOpen, setIsOpen] = useState(false)
  const { data: dailyLogs, isLoading } =
    api.dailyLog.getAllCurrentUser.useQuery()

  if (isLoading) return null

  const log = dailyLogs?.find((log) => log.date === date?.toDateString())
  const prevLog = dailyLogs?.find((log) => {
    if (!date) return false
    return log.date === new Date(date?.getTime() - 86400000).toDateString()
  })
  console.log('log', log)
  console.log('prevLog', prevLog)

  if (!date) return null

  return (
    <div className='mt-16 flex flex-col gap-3'>
      <div className='w-full text-center text-xl font-semibold'>
        <Popover
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <PopoverTrigger asChild>
            <div className='flex items-center justify-center'>
              <Button
                variant={'secondary'}
                size={'lg'}
                className={cn(
                  'w-[280px] font-semibold text-base mt-[2px] flex items-center justify-center shadow-md',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className='mr-4 h-4 w-4 mt-[0px]' />
                {date ? <span className='mt-[5px]'>{format(date, 'PPP')}</span> : <span>Pick a date</span>}
              </Button>
            </div>
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
        prevLog={prevLog}
        date={date.toDateString()}
      />
    </div>
  )
}
