'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

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
  const date = Number(searchParams.get('date'))
  const { data: dailyLogs, isLoading } =
    api.dailyLog.getAllCurrentUser.useQuery()

  if (isLoading) return null

  const log = dailyLogs?.find((log) => log.date === new Date(date).toDateString())
  console.log('log', log)

  if (!date) return null

  if (!id) {
    if (log) {
      return (
        <Log
          id={log.id}
          date={log.date}
        />
      )
    }
    return (
      <DailyLogForm
        todaysLog={null}
        date={new Date(date).toDateString()}
      />
    )
  }

  return (
    <Log
      id={Number(id)}
      date={date || ''}
    />
  )
}
