'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { CreateUserPlan } from '@/components/user-plan/create-user-plan'
import { Spinner } from '@/components/spinner'

const UserInfo = ({ userId: _ }: { userId: string }) => {
	const { data: _allPlans, isLoading: isLoadingPlans } =
		api.plan.getAllName.useQuery()

	if (isLoadingPlans) return <Spinner />
	return (
		<div className='flex overflow-y-auto flex-col items-center p-2 min-h-48'>
			<CreateUserPlan />
		</div>
	)
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

	return <UserInfo userId={userId} />
}
