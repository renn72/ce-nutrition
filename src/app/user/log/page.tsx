'use client'

import { api } from '@/trpc/react'

import { UserLogs } from '@/components/user-logs/user-logs'

export default function Home() {
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery()

  if (isLoading) return null
if (!currentUser) return null

  return (
    <div className='w-full mt-12'>
    <UserLogs userId={currentUser.id} />
    </div>
  )

}
