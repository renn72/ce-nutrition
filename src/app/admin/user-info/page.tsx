'use client'

import { useSearchParams } from 'next/navigation'

import { UserInfo } from './user-info'


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
    <UserInfo
      userId={userId}
    />
  )
}
