'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { GetDailyLogById } from '@/types'
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
  Heart,
  Loader,
  Paperclip,
  Pencil,
  Plus,
  Star,
  ThumbsDown,
  ThumbsUp,
  Zap,
} from 'lucide-react'
import { toast } from 'sonner'

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

const borderDict = {
  black: 'border-black',
  red: 'border-red-600',
  green: 'border-green-600',
  blue: 'border-blue-600',
  purple: 'border-purple-600',
  orange: 'border-orange-600',
}

const textDict = {
  black: 'text-black',
  red: 'text-red-600',
  green: 'text-green-600',
  blue: 'text-blue-600',
  purple: 'text-purple-600',
  orange: 'text-orange-600',
}

const bgDict = {
  black: 'bg-black',
  red: 'bg-red-600',
  green: 'bg-green-600',
  blue: 'bg-blue-600',
  purple: 'bg-purple-600',
  orange: 'bg-orange-600',
}

const Icon = ({
  icon,
  classnames,
  size = 16,
}: {
  icon: string
  classnames?: string
  size?: number
}) => {
  switch (icon) {
    case 'bone':
      return (
        <Bone
          size={size}
          className={classnames}
          fill='currentColor'
        />
      )
    case 'fish':
      return (
        <Fish
          size={size}
          className={classnames}
          fill='currentColor'
        />
      )
    case 'zap':
      return (
        <Zap
          size={size}
          className={classnames}
          fill='currentColor'
        />
      )
    case 'pencil':
      return (
        <Pencil
          size={size}
          className={classnames}
          fill='currentColor'
        />
      )
    case 'thumb-up':
      return (
        <ThumbsUp
          size={size}
          className={classnames}
          fill='currentColor'
        />
      )
    case 'heart':
      return (
        <Heart
          size={size}
          className={classnames}
          fill='currentColor'
        />
      )
    default:
      return null
  }
}

const Tags = ({ log }: { log: GetDailyLogById }) => {
  const ctx = api.useUtils()
  const { data: tags } = api.tag.getAllTagsCurrentUser.useQuery()

  const { mutate: deleteTag } = api.tag.delete.useMutation({
    onSettled: () => {
      ctx.tag.invalidate()
    },
  })

  const { mutate: updateTagToDailyLog } =
    api.tag.updateTagToDailyLog.useMutation({
      onMutate: async (data) => {
        await ctx.dailyLog.getAllCurrentUser.cancel()
        const previousLog = ctx.dailyLog.getAllCurrentUser.getData()
        if (!previousLog) return
        ctx.dailyLog.getAllCurrentUser.setData(undefined, [
          ...previousLog.map((log) => {
            return {
              ...log,
            }
          }),
        ])
        return { previousLog }
      },
      onSettled: () => {
        ctx.dailyLog.invalidate()
      },
    })

  const { mutate: createTag } = api.tag.create.useMutation({
    onMutate: async () => {
      setIsSaving(true)
    },
    onSettled: () => {
      setIsSaving(false)
      setIsOpen(false)
      setTagName('')
      setTagColor('black')
      setTagIcon('fish')
      ctx.tag.invalidate()
    },
    onError: () => {
      toast.error('error')
    },
  })

  const [tagName, setTagName] = useState('')
  const [tagColor, setTagColor] = useState('black')
  const [tagIcon, setTagIcon] = useState('fish')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = () => {
    if (tagName === '') return
    createTag({
      name: tagName,
      color: tagColor,
      icon: tagIcon,
    })
  }

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
        className='top-36 translate-y-0 px-2 '
      >
        <DialogHeader>
          <DialogTitle>Tags</DialogTitle>
          <DialogDescription>Add tags to your daily log</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 items-center'>
          {tags?.map((tag) => {
            const color = tag.color as
              | 'black'
              | 'red'
              | 'green'
              | 'blue'
              | 'purple'
              | 'orange'
            const icon = tag.icon

            const isTagged = log?.tags?.find((t) => t.tagId === tag.id)

            return (
              <div
                key={tag.id}
                className='w-full flex justify-center relative'
              >
                <div
                  className={cn(
                    'text-sm w-40 h-8 rounded-md border flex items-center justify-center gap-2 cursor-pointer border relative',
                    isTagged ? 'border-0 text-white' : borderDict[color],
                    isTagged ? bgDict[color] : '',
                  )}
                  onClick={() => {
                    if (!log) return
                    updateTagToDailyLog({
                      tagId: tag.id,
                      dailyLogId: log.id,
                    })
                  }}
                >
                  <Icon
                    icon={icon}
                    classnames={isTagged ? 'text-white' : textDict[color]}
                  />

                  <div className='mt-[2px]'>{tag.name}</div>
                  <Plus
                    size={16}
                    className={cn(
                      'absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-primary',
                      isTagged ? textDict[color] : '',
                    )}
                  />
                </div>
                <Button
                  variant='ghost'
                  size='sm'
                  className='absolute right-0 top-1/2 -translate-y-1/2'
                  onClick={() => {
                    if (!log) return
                    deleteTag(tag.id)
                  }}
                >
                  Delete
                </Button>
              </div>
            )
          })}
        </div>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          <div className='flex justify-center w-full'>
            <CollapsibleTrigger asChild>
              <Button
                variant='default'
                size='sm'
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
                  className='col-span-3 capitalize'
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
                    value='black'
                    className='bg-black'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='red'
                    className='bg-red-600'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='green'
                    className='bg-green-600'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='blue'
                    className='bg-blue-600'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='purple'
                    className='bg-purple-600'
                  ></ToggleGroupItem>
                  <ToggleGroupItem
                    value='orange'
                    className='bg-orange-600'
                  ></ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className='grid grid-cols-4 gap-2 w-full items-center'>
                <Label>Icon</Label>
                <ToggleGroup
                  type='single'
                  className={cn(
                    'col-span-3 flex gap-1 flex-wrap text-primary',
                    tagColor === 'red' && 'text-red-500',
                    tagColor === 'green' && 'text-green-500',
                    tagColor === 'blue' && 'text-blue-500',
                    tagColor === 'purple' && 'text-purple-500',
                    tagColor === 'orange' && 'text-orange-500',
                  )}
                  variant='border'
                  value={tagIcon}
                  onValueChange={(value) => {
                    setTagIcon(value)
                  }}
                >
                  <ToggleGroupItem
                    className='px-0'
                    value='bone'
                  >
                    <Bone
                      fill='currentColor'
                      className='h-12 w-12'
                    />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='fish'>
                    <Fish
                      fill='currentColor'
                      size={20}
                    />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='zap'>
                    <Zap
                      fill='currentColor'
                      size={20}
                    />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='pencil'>
                    <Pencil
                      fill='currentColor'
                      size={20}
                    />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='thumb-up'>
                    <ThumbsUp
                      fill='currentColor'
                      size={20}
                    />
                  </ToggleGroupItem>
                  <ToggleGroupItem value='heart'>
                    <Heart
                      fill='currentColor'
                      size={20}
                    />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div className='flex w-full justify-center'>
                <Button
                  variant='default'
                  className='w-40 relative'
                  disabled={isSaving || tagName === ''}
                  onClick={handleSubmit}
                >
                  Save
                  {isSaving ? (
                    <div className='absolute top-1/2 right-4 -translate-y-1/2'>
                      <Loader
                        size={16}
                        className='animate-spin'
                      />
                    </div>
                  ) : null}
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
    onMutate: async (data) => {
      await ctx.dailyLog.getAllCurrentUser.cancel()
      const previousLog = ctx.dailyLog.getAllCurrentUser.getData()
      if (!previousLog) return
      ctx.dailyLog.getAllCurrentUser.setData(undefined, [
        ...previousLog.map((log) => {
          if (log.date === data.date) {
            return {
              ...log,
              isStarred: data.isStarred,
            }
          }
          return log
        }),
      ])
      return { previousLog }
    },
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
    onError: (err, newPoopLog, context) => {
      toast.error('error')
      ctx.dailyLog.getAllCurrentUser.setData(undefined, context?.previousLog)
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
    <div className='mt-16 flex flex-col gap-0'>
      <div className='w-full flex items-center justify-center text-center text-xl font-semibold gap-2'>
        <Tags log={log} />
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
                  const tags = log?.tags?.map((tag) => {
                    return {
                      id: tag.id,
                      name: tag.tag.name,
                      color: tag.tag.color,
                      icon: tag.tag.icon,
                    }
                  })
                  return (
                    <div className='flex flex-col gap-[2px]'>
                      {log ? (
                        <div className='flex items-center justify-center w-full'>
                          <div className='bg-secondary-foreground h-[6px] w-[6px] rounded-full' />
                        </div>
                      ) : null}
                      <div className=''>{props.date.getDate()}</div>

                      <div className='flex justify-center h-[12px] items-center gap-1'>
                        {log?.isStarred === true ? (
                          <Star
                            className='text-yellow-500'
                            fill='currentColor'
                            size={10}
                          />
                        ) : null}
                        {tags?.map((tag) => {
                          const color = tag.color as
                            | 'black'
                            | 'red'
                            | 'green'
                            | 'blue'
                            | 'purple'
                            | 'orange'
                          const icon = tag.icon
                          return (
                            <Icon
                              key={tag.id}
                              icon={icon}
                              size={10}
                              classnames={textDict[color]}
                            />
                          )
                        })}
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
            'cursor-pointer active:scale-75 transition-transform',
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
      <div className='h-8 flex items-center justify-center'>
        {log?.tags?.map((tag) => {
          const color = tag.tag.color as
            | 'black'
            | 'red'
            | 'green'
            | 'blue'
            | 'purple'
            | 'orange'
          const icon = tag.tag.icon
          return (
            <div
              key={tag.id}
              className={cn(
                'text-xs w-24 h-6 text-white rounded-full border flex items-center justify-center gap-0 cursor-pointer border relative',
                bgDict[color],
              )}
            >
              <Icon
                icon={icon}
                classnames={
                  'text-white absolute top-1/2 -translate-y-1/2 left-1'
                }
              />
              <div className='mt-[2px] ml-3'>{tag.tag.name}</div>
            </div>
          )
        })}
      </div>
      <DailyLogForm
        todaysLog={log}
        prevLog={prevLog}
        date={date.toDateString()}
      />
    </div>
  )
}
