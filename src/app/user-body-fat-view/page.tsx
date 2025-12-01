'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { InstaView } from '@/components/user-insta'

const View = ({ userId }: { userId: string }) => {
	const { data: skinfolds, isLoading } =
		api.metrics.getUserSkinfolds.useQuery(userId)

	const data = skinfolds
		?.map((skinfold) => ({
			value: Number(skinfold.bodyFat?.[0]?.bodyFat || 0),
			date: skinfold.date,
		}))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	if (isLoading) return null

	return <InstaView data={data} type='body fat' postfixType='%' />
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

	return <View userId={userId} />
}
