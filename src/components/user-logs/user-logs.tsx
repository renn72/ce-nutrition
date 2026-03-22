'use client'

import { api } from '@/trpc/react'

import { useEffect, useMemo, useState } from 'react'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import {
  buildClipboardDailyLogs,
  buildClipboardText,
  getVisibleLogsForDays,
  getVisibleLogsForRange,
  type DailyLogRecord,
} from '@/lib/daily-log-export'
import { cn, getFormattedDate } from '@/lib/utils'
import { SpinnerGapIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import { Copy } from 'lucide-react'
import type { DateRange } from 'react-day-picker'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { DailyLogCard } from '@/components/daily-log/daily-log-card'

import { DateRangePicker } from './date-range-picker'

const Spinner = () => (
  <div className='flex flex-col justify-center items-center mt-20'>
    <SpinnerGapIcon
      size={48}
      className='animate-spin'
    />
  </div>
)

const DailyLogs = ({
  userId,
  isAdmin = false,
  isDanger = false,
  cols = 3,
  dailyLogs,
  comparisonLogs,
}: {
  userId: string
  isAdmin?: boolean
  isDanger?: boolean
  cols?: number
  dailyLogs: DailyLogRecord[]
  comparisonLogs: DailyLogRecord[]
}) => {
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  const { data: currentUser } = api.user.getCurrentUserRoles.useQuery({
    id: userId,
  })

  const content = (
    <>
      {dailyLogs.map((dailyLog) => {
        const date = new Date(dailyLog.date)
        const yesterdaysDate = new Date(date.getTime() - 86400000)
        const yesterdaysDailyLog = comparisonLogs.find(
          (log) => log.date === yesterdaysDate.toDateString(),
        )
        const title = `${date.toLocaleDateString('en-AU', {
          weekday: 'long',
        })} ${getFormattedDate(date)}`

        return (
          <DailyLogCard
            key={dailyLog.id}
            title={title}
            currentUser={currentUser}
            dailyLog={dailyLog}
            yesterdaysDailyLog={yesterdaysDailyLog}
            date={date}
            isAdmin={isAdmin}
            isLogPage={true}
            isDanger={isDanger}
            isCreator={isDanger}
          />
        )
      })}
    </>
  )

  if (isMobile) {
    return (
      <div className='flex flex-col gap-2 items-center w-full'>{content}</div>
    )
  }

  const gridCols: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
    7: 'grid-cols-7',
  }

  return (
    <div
      className={cn(
        'grid gap-2 w-max place-content-center',
        gridCols[cols] || 'grid-cols-3',
      )}
    >
      {content}
    </div>
  )
}

const UserLogs = ({
  userId,
  isAdmin = false,
}: {
  userId: string
  isAdmin?: boolean
}) => {
  const ctx = api.useUtils()
  const isMobile = useClientMediaQuery('(max-width: 600px)')
  const [isDanger, setIsDanger] = useState(false)
  const [cols, setCols] = useState(3)
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  })

  const [toggleValue, setToggleValue] = useState('7')

  const { data: isRoot } = api.user.isCreator.useQuery()

  const isWeekView = toggleValue === '7'
  const days =
    toggleValue !== 'range' && toggleValue !== '' ? Number(toggleValue) : 7

  const weekLogsQuery = api.dailyLog.getUserLimit.useQuery(
    {
      id: userId,
      limit: 7,
    },
    {
      enabled: isWeekView,
    },
  )
  const allLogsQuery = api.dailyLog.getAllUser.useQuery(userId, {
    enabled: !isWeekView,
  })

  useEffect(() => {
    if (weekLogsQuery.data) {
      void ctx.dailyLog.getAllUser.prefetch(userId)
    }
  }, [ctx, userId, weekLogsQuery.data])

  const comparisonLogs =
    (isWeekView ? weekLogsQuery.data : allLogsQuery.data) ?? []

  const visibleDailyLogs = useMemo(() => {
    if (toggleValue === 'range') {
      return getVisibleLogsForRange(comparisonLogs, date?.from, date?.to)
    }

    return getVisibleLogsForDays(comparisonLogs, days)
  }, [comparisonLogs, date?.from, date?.to, days, toggleValue])

  const clipboardDailyLogs = useMemo(
    () => buildClipboardDailyLogs(visibleDailyLogs),
    [visibleDailyLogs],
  )

  const isLoading = isWeekView
    ? weekLogsQuery.isLoading
    : allLogsQuery.isLoading

  const handleCopyDailyLogs = async () => {
    if (clipboardDailyLogs.length === 0) {
      toast.error('No daily logs to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(
        buildClipboardText({
          dailyLogs: visibleDailyLogs,
          toggleValue,
          from: toggleValue === 'range' ? date?.from : undefined,
          to: toggleValue === 'range' ? date?.to : undefined,
        }),
      )
      toast.success(`Copied ${clipboardDailyLogs.length} daily logs`)
    } catch {
      toast.error('Could not copy daily logs')
    }
  }

  const content = (
    <div className='flex flex-col gap-2 items-center px-1 w-full lg:gap-4'>
      <div className='flex flex-col gap-2 items-center w-full lg:gap-4'>
        <div className='flex flex-wrap gap-4 justify-center items-center'>
          <ToggleGroup
            type='single'
            variant='outline'
            value={toggleValue}
            onValueChange={(value) => {
              if (!value) return
              setToggleValue(value)
            }}
          >
            <ToggleGroupItem
              value='7'
              aria-label='Week'
            >
              Week
            </ToggleGroupItem>
            <ToggleGroupItem
              value='30'
              aria-label='Month'
            >
              Month
            </ToggleGroupItem>
            <ToggleGroupItem
              value='90'
              aria-label='3 Months'
            >
              3 Months
            </ToggleGroupItem>
            <ToggleGroupItem
              value='365'
              aria-label='Year'
            >
              Year
            </ToggleGroupItem>
            <ToggleGroupItem
              value='range'
              aria-label='Range'
            >
              Range
            </ToggleGroupItem>
          </ToggleGroup>
          <Button
            size='sm'
            variant='outline'
            onClick={handleCopyDailyLogs}
            disabled={isLoading || clipboardDailyLogs.length === 0}
          >
            <Copy className='mr-2 h-4 w-4' />
            Copy JSON
          </Button>
          {isRoot?.isCreator && (
            <Switch
              checked={isDanger}
              onCheckedChange={setIsDanger}
            />
          )}
          {!isMobile && (
            <div className='flex gap-2 items-center'>
              <Label className='text-sm'>Columns</Label>
              <Select
                value={cols.toString()}
                onValueChange={(val) => setCols(Number(val))}
              >
                <SelectTrigger className='w-[70px]'>
                  <SelectValue placeholder='Cols' />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 7 }).map((_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={(i + 1).toString()}
                    >
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <AnimatePresence>
          {toggleValue === 'range' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.1, ease: 'easeOut' }}
              className='overflow-hidden' // Prevents content pop during height change
            >
              <DateRangePicker
                date={date}
                setDate={setDate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <DailyLogs
          userId={userId}
          isAdmin={isAdmin}
          isDanger={isDanger}
          cols={cols}
          dailyLogs={visibleDailyLogs}
          comparisonLogs={comparisonLogs}
        />
      )}
    </div>
  )

  if (isMobile) {
    return (
      <div className='flex flex-col items-center px-1 mt-6 mb-20 w-full'>
        {content}
      </div>
    )
  }
  return <div className='flex flex-col gap-4 items-center my-10'>{content}</div>
}

export { UserLogs }
