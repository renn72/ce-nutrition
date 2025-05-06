'use client'

import { useSearchParams } from 'next/navigation'

import { UserLogs } from '@/components/user-logs/user-logs'

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  return (
    <UserLogs
      isAdmin={true}
      userId={userId}
    />
  )
}
