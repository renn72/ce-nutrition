'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Bookmark, Calendar as CalendarIcon, Star } from 'lucide-react'
import Component from '@/components/comp-510'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { DailyLogForm } from './form'

export default function Home() {
  const ctx = api.useUtils()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [date, setDate] = useState<Date | undefined>(
    () => new Date(Number(searchParams.get('date'))),
  )
  const [isOpen, setIsOpen] = useState(false)
  const { data: dailyLogs, isLoading } =
    api.dailyLog.getAllCurrentUser.useQuery()

  const { mutate: updateIsStarred } = api.dailyLog.updateIsStarred.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
  })

  if (isLoading) return null

  const log = dailyLogs?.find((log) => log.date === date?.toDateString())
  const prevLog = dailyLogs?.find((log) => {
    if (!date) return false
    return log.date === new Date(date?.getTime() - 86400000).toDateString()
  })

  if (!date) return null

  return (
    <div className='mt-16 flex flex-col gap-3'>
      <div className='w-full flex items-center justify-center text-center text-xl font-semibold gap-2'>
        <Bookmark
          size={20}
          />
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
                  'w-[280px] font-semibold text-base mt-[2px] flex items-center justify-center shadow-sm',
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
        <Star
          size={20}
          className={cn('cursor-pointer active:scale-90 transition-transform',
            log?.isStarred === true ? 'text-yellow-500' : 'text-muted-foreground')}
          fill={log?.isStarred === true ? 'currentColor' : 'none'}
          onClick={() => {
            updateIsStarred({
              date: date.toDateString(),
              isStarred: log?.isStarred === true ? false : true,
            })
          }}
        />
      </div>
      <DailyLogForm
        todaysLog={log}
        prevLog={prevLog}
        date={date.toDateString()}
      />
    </div>
  )
}
