'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { CreateUserPlan } from '@/components/user-plan/create-user-plan'

export const dynamic = 'force-dynamic'

const EditUserPlan = ({
  userPlanId,
}: {
  userPlanId: string
}) => {
  const { data: userPlan, isLoading: isLoadingUserPlan } =
    api.userPlan.get.useQuery(Number(userPlanId))

  if (isLoadingUserPlan) return null

  if (!userPlan) return null

  return (
    <div className='flex flex-col max-w-7xl w-full mx-auto mt-0'>
      <CreateUserPlan userPlan={userPlan} />
    </div>
  )
}

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')
  const userPlanId = searchParams.get('plan')

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  if (!userPlanId) return null

  return (
    <EditUserPlan
      userPlanId={userPlanId}
    />
  )
}
