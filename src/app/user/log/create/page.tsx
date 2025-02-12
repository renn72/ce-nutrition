'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { DailyLogForm } from './form'

const Log = ({ id, date }: { id: number; date: string }) => {
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
  const date = searchParams.get('date')

  if (!date) return null

  if (!id) return <DailyLogForm todaysLog={null} date={new Date(date).toDateString()} />

  return (
    <Log
      id={Number(id)}
      date={date || ''}
    />
  )
}
