'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { FormPlan } from '@/components/plan-form/form-plan'

export default function Home() {
  const { data, isLoading } = api.plan.getAll.useQuery()
  const searchParams = useSearchParams()
  const i = searchParams.get('plan')

  const plan = data?.find((plan) => plan.id === Number(i))

  if (isLoading) return null

  return (
    <div className='flex flex-col max-w-screen-lg w-full mx-auto mt-10'>
      <FormPlan plan={plan} />
    </div>
  )
}
