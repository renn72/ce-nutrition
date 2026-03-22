'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import {
  buildClipboardText,
  formatRangeLabel,
  getRangeDateInfo,
  getVisibleLogsForDays,
} from '@/lib/daily-log-export'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

import { Spinner } from '@/components/spinner'

type SavedInsight = {
  id: number
  userId: string
  rangeDays: number
  rangeLabel: string
  rangeStart: string
  rangeEnd: string
  sourceLogCount: number
  model: string
  content: string
  createdAt: string
}

const RANGE_OPTIONS = [
  { label: '1 Week', value: 7 },
  { label: '1 Month', value: 30 },
  { label: '3 Months', value: 90 },
] as const

const formatInsightTimestamp = (value: string) =>
  new Date(value).toLocaleString('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })

const AiInsights = ({ userId }: { userId: string }) => {
  const [insights, setInsights] = useState<SavedInsight[]>([])
  const [isLoadingInsights, setIsLoadingInsights] = useState(true)
  const [isStreaming, setIsStreaming] = useState(false)
  const [activeRange, setActiveRange] = useState<number | null>(null)
  const [streamedInsight, setStreamedInsight] = useState('')

  const { data: selectedUser } = api.user.getName.useQuery(userId)
  const {
    data: dailyLogs = [],
    isLoading: isLoadingLogs,
    refetch: refetchDailyLogs,
  } = api.dailyLog.getAllUser.useQuery(userId)

  const loadInsights = async () => {
    setIsLoadingInsights(true)

    try {
      const response = await fetch(
        `/api/admin/ai?userId=${encodeURIComponent(userId)}`,
        {
          cache: 'no-store',
        },
      )

      if (!response.ok) {
        throw new Error('Could not load saved insights')
      }

      const data = (await response.json()) as { insights: SavedInsight[] }
      setInsights(data.insights)
    } catch (error) {
      console.error(error)
      toast.error('Could not load saved insights')
    } finally {
      setIsLoadingInsights(false)
    }
  }

  useEffect(() => {
    setActiveRange(null)
    setStreamedInsight('')
    void loadInsights()
  }, [userId])

  const handleGenerateInsight = async (rangeDays: 7 | 30 | 90) => {
    const selectedLogs = getVisibleLogsForDays(dailyLogs, rangeDays)

    if (selectedLogs.length === 0) {
      toast.error(`No daily logs found for the last ${rangeDays} days`)
      return
    }

    const { startDate, endDate } = getRangeDateInfo(selectedLogs)

    setActiveRange(rangeDays)
    setIsStreaming(true)
    setStreamedInsight('')

    try {
      const response = await fetch('/api/admin/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          rangeDays,
          rangeLabel: formatRangeLabel(String(rangeDays)),
          rangeStart: startDate,
          rangeEnd: endDate,
          sourceLogCount: selectedLogs.length,
          dailyLogsText: buildClipboardText({
            dailyLogs: selectedLogs,
            toggleValue: String(rangeDays),
          }),
        }),
      })

      if (!response.ok) {
        const errorData = (await response.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(errorData?.error ?? 'Could not generate AI insight')
      }

      if (!response.body) {
        throw new Error('The AI provider did not return a stream')
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let nextInsight = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        nextInsight += decoder.decode(value, { stream: true })
        setStreamedInsight(nextInsight)
      }

      nextInsight += decoder.decode()
      setStreamedInsight(nextInsight)

      await Promise.all([loadInsights(), refetchDailyLogs()])
      toast.success('AI insight saved')
    } catch (error) {
      console.error(error)
      toast.error(
        error instanceof Error
          ? error.message
          : 'Could not generate AI insight',
      )
    } finally {
      setIsStreaming(false)
    }
  }

  const selectedUserName =
    selectedUser?.firstName?.trim() ||
    selectedUser?.name?.trim() ||
    'this client'

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-semibold'>AI Insights</h1>
        <p className='text-sm text-muted-foreground'>
          Generate a streamed summary from {selectedUserName}&apos;s recent
          daily logs and keep the previous insights on file.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generate insight</CardTitle>
          <CardDescription>
            The prompt uses the same daily-log export format as the admin logs
            copy action.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <div className='flex flex-wrap gap-3'>
            {RANGE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant={activeRange === option.value ? 'default' : 'outline'}
                disabled={isStreaming || isLoadingLogs}
                onClick={() =>
                  void handleGenerateInsight(option.value as 7 | 30 | 90)
                }
              >
                {option.label}
              </Button>
            ))}
          </div>
          <p className='text-sm text-muted-foreground'>
            {isLoadingLogs
              ? 'Loading daily logs...'
              : `${dailyLogs.length} daily logs available for review.`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Latest response</CardTitle>
          <CardDescription>
            {activeRange
              ? `Streaming insight for the last ${formatRangeLabel(String(activeRange)).toLowerCase()}.`
              : 'Pick a timeframe to generate a new insight.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isStreaming && streamedInsight === '' ? (
            <Spinner />
          ) : (
            <div className='min-h-40 whitespace-pre-wrap rounded-lg border bg-muted/30 p-4 text-sm leading-6'>
              {streamedInsight || 'No insight generated yet.'}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved insights</CardTitle>
          <CardDescription>
            Previous AI summaries for {selectedUserName}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingInsights ? (
            <Spinner />
          ) : insights.length === 0 ? (
            <div className='rounded-lg border border-dashed p-4 text-sm text-muted-foreground'>
              No saved insights yet.
            </div>
          ) : (
            <ScrollArea className='max-h-[42rem] pr-4'>
              <div className='flex flex-col gap-4'>
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className='rounded-lg border bg-background p-4'
                  >
                    <div className='flex flex-col gap-1'>
                      <div className='text-sm font-medium'>
                        {insight.rangeLabel} insight
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        {formatInsightTimestamp(insight.createdAt)} ·{' '}
                        {insight.rangeStart} to {insight.rangeEnd} ·{' '}
                        {insight.sourceLogCount} logs · {insight.model}
                      </div>
                    </div>
                    <div className='mt-3 whitespace-pre-wrap text-sm leading-6'>
                      {insight.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export { AiInsights }
