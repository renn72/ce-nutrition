'use client'

import { useSearchParams } from 'next/navigation'
import { api } from '@/trpc/react'

export default function Home() {

  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  const { data: user} = api.user.get.useQuery(userId || '')

  if (!user) return null
  const plan = user?.userPlans.find((plan) => plan.id == user?.currentPlanId)
  if (!plan) return null
  return (
    <div className='flex flex-col items-center mt-10 capitalize'>
      current program: {plan.name}
    </div>
  )
}
