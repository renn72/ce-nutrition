'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { CreateUserPlan } from '@/components/user-plan/create-user-plan'

export default function Home() {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''

  const [selectedPlan, setSelectedPlan] = useState('')

  const { data: allPlans } = api.plan.getAllSimple.useQuery()
  const { data: currentUser } = api.user.get.useQuery(user)

  return (
    <div className='flex min-h-screen flex-col items-center'>
      <CreateUserPlan />
    </div>
  )
}
