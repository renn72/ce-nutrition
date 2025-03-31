'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import {
  AlarmClock,
  Beer,
  Bone,
  Bookmark,
  Calendar as CalendarIcon,
  Dot,
  Fish,
  Hand,
  Plus,
  Star,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar-log'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { DailyLogForm } from './form'

const Tags = () => {
  const ctx = api.useUtils()
  const { data: tags } = api.dailyLog.getAllTagsCurrentUser.useQuery()

  const [tagName, setTagName] = useState('')
  const [tagColor, setTagColor] = useState('')
  const [tagIcon, setTagIcon] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Bookmark
          size={20}
          className='cursor-pointer'
        />
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className='top-20 translate-y-0 px-2 '
      >
        <DialogHeader>
          <DialogTitle>Tags</DialogTitle>
          <DialogDescription>Add tags to your daily log</DialogDescription>
        </DialogHeader>
        {tags?.map((tag) => (
          <div
            key={tag.id}
            className='flex gap-2 items-center justify-center w-full p-2 rounded-lg bg-secondary-foreground/10 hover:bg-secondary-foreground/20'
          >
            <div className='flex gap-2 items-center justify-center w-full'>
              <div className='flex gap-2 items-center justify-center w-full'>
                {tag.name}
              </div>
            </div>
          </div>
        ))}
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className='flex justify-center w-full'>
            <CollapsibleTrigger asChild>
              <Button
                variant='default'
                className='flex gap-2 items-center justify-center'
              >
                <Plus size={16} />
                <span className='text-sm mt-[2px]'>Create Tag</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <div className='flex flex-col gap-4 w-full mt-4'>
              <div className='grid grid-cols-4 gap-2 w-full items-center'>
                <Label>Name</Label>
                <Input
                  placeholder='Tag Name'
                  className='col-span-3'
                  value={tagName}
                  onChange={(e) => {
                    setTagName(e.target.value)
                  }}
                />
              </div>
              <div className='grid grid-cols-4 gap-2 w-full items-center'>
                <Label>Colour</Label>
                <ToggleGroup
                  type='single'
                  variant='border'
                  className='col-span-3 flex gap-2'
                  value={tagColor}
                  onValueChange={(value) => {
                    setTagColor(value)
                  }}
                >
                  <ToggleGroupItem
                    value='red'
                    className='bg-red-500'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='green'
                    className='bg-green-500'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='blue'
                    className='bg-blue-500'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='purple'
                    className='bg-purple-500'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='orange'
                    className='bg-orange-500'
                  ></ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className='grid grid-cols-4 gap-2 w-full items-center'>
                <Label>Icon</Label>
                <ToggleGroup
                  type='single'
                  className='col-span-3 flex gap-1 flex-wrap'
                  variant='border'
                  value={tagIcon}
                  onValueChange={(value) => {
                    setTagIcon(value)
                  }}
                >
                  <ToggleGroupItem
                    className='px-0'
                    value='bone'>
                    <Bone
                      className='h-12 w-12'
                    />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='fish'>
                    <Fish size={20} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='hand'>
                    <Hand size={20} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='zap'>
                    <Zap size={20} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='beer'>
                    <Beer size={20} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='alarm'>
                    <AlarmClock size={20} />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className='flex w-full justify-center'>
              <Button
                variant='default'
                className='w-40'
                disabled
              >
                Save
              </Button>
            </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </DialogContent>
    </Dialog>
  )
}

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
        <Tags />
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
                {date ? (
                  <span className='mt-[5px]'>{format(date, 'PPP')}</span>
                ) : (
                  <span>Pick a date</span>
                )}
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
              components={{
                // @ts-ignore
                DayContent: (props) => {
                  const log = dailyLogs?.find(
                    (log) => log.date === props.date.toDateString(),
                  )
                  return (
                    <div className='flex flex-col'>
                      <div className=''>{props.date.getDate()}</div>

                      <div className='flex justify-center h-[16px] items-center gap-1'>
                        {log ? (
                          <div className='bg-secondary-foreground h-[7px] w-[7px] rounded-full' />
                        ) : null}
                        {log?.isStarred === true ? (
                          <Star
                            className='text-yellow-500'
                            fill='currentColor'
                            size={12}
                          />
                        ) : null}
                      </div>
                    </div>
                  )
                },
              }}
            />
          </PopoverContent>
        </Popover>
        <Star
          size={20}
          className={cn(
            'cursor-pointer active:scale-90 transition-transform',
            log?.isStarred === true
              ? 'text-yellow-500'
              : 'text-muted-foreground',
          )}
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
