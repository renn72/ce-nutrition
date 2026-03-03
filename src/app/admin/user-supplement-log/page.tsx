'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { UserSupplementsTaken } from '@/app/admin/user-info/user-supplements-taken'

export default function Home() {
	const searchParams = useSearchParams()
	const userId = searchParams.get('user')
	const isValidUserId = !!userId && userId !== 'null'

	const { data: dailyLogs, isLoading } = api.dailyLog.getAllUser.useQuery(
		userId ?? '',
		{
			enabled: isValidUserId,
		},
	)

	if (!isValidUserId) return <div>Select a user</div>

	if (isLoading) return null
	if (!dailyLogs) return null

	return (
		<div className='py-4 px-2 mx-auto w-full max-w-4xl xl:py-6'>
			<UserSupplementsTaken dailyLogs={dailyLogs} />
		</div>
	)
}
