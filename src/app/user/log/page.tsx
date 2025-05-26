'use client'

import { api } from '@/trpc/react'

import { UserLogs } from '@/components/user-logs/user-logs'

import { useAtomValue } from 'jotai'
import { impersonatedUserAtom } from '@/atoms'

export default function Home() {
  const impersonatedUser = useAtomValue(impersonatedUserAtom)
	const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery({ id: impersonatedUser.id })

	if (isLoading) return null
	if (!currentUser) return null

	return (
		<div className='w-full mt-12'>
			<UserLogs userId={currentUser.id} />
		</div>
	)
}
