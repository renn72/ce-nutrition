'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { FormSupplement } from '@/components/supplements/form-supplement'

export default function Home() {
	const searchParams = useSearchParams()
	const i = searchParams.get('ingredient')

	const { data, isLoading } = api.ingredient.getFullSupplement.useQuery({
		id: Number(i),
	})

	if (isLoading) return null
	if (!data) return null

	return (
		<div className='flex flex-col max-w-screen-lg mx-auto mt-10 px-2'>
			<FormSupplement supplement={data} />
		</div>
	)
}
