'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { FormPlan } from '@/components/plan-form/form-plan'

export default function Home() {
	const searchParams = useSearchParams()
	const i = searchParams.get('plan')
	const { data: plan, isLoading } = api.plan.get.useQuery({ id: Number(i) })

	if (isLoading) return null
	if (!plan) return null

	return (
		<div className='flex flex-col mx-auto mt-0 w-full max-w-7xl'>
			<FormPlan plan={plan} />
		</div>
	)
}
