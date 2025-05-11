'use client'

import { api } from '@/trpc/react'

import { UserPlanView } from '@/components/user-plan/user-plan-view'

import { impersonatedUserAtom } from '@/atoms'
import { useAtom } from 'jotai'

export default function Home() {
  const [impersonatedUser,] = useAtom(impersonatedUserAtom)
  const { data: user, isLoading } = api.user.getCurrentUser.useQuery({
    id: impersonatedUser.id,
  })

  if (isLoading) return null
  const plans = user?.userPlans.filter((plan) => plan.isActive)

  if (!plans) return null

  return (
    <div className='my-16'>
      <div className='flex flex-col gap-4 w-full '>
        {plans?.map((plan) => (
          <UserPlanView
            key={plan.id}
            userPlan={plan}
          />
        ))}
      </div>
    </div>
  )
}
