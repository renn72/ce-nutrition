'use client'

import { api } from '@/trpc/react'

import PlanView from '@/components/user-plan/detailed-plan-view'

export default function Home() {
  const { data: currentUser } = api.user.getCurrentUser.useQuery()

  const plans = currentUser?.userPlans.filter((plan) => plan.isActive)

  return (
    <div className='mt-16'>
      {plans?.map((plan) => (
        <PlanView
          plan={plan}
          key={plan.id}
        />
      ))}
    </div>
  )
}
