'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { CreateUserPlan } from '@/components/user-plan/create-user-plan'

const UserInfo = ({ userId }: { userId: string }) => {
  const { data: _allPlans, isLoading: isLoadingPlans } = api.plan.getAllSimple.useQuery()
  const { data: _currentUser, isLoading: isLoadingUser } = api.user.get.useQuery(userId)

  if (isLoadingUser || isLoadingPlans) return null
  return (
    <div className='flex flex-col items-center p-2 '>
      <CreateUserPlan />
    </div>
  )
}


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

  return <UserInfo userId={userId} />
}
