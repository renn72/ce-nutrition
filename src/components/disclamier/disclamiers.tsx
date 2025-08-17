'use client'

import { api } from '@/trpc/react'

import { impersonatedUserAtom } from '@/atoms'
import { useAtomValue } from 'jotai'

import { Supplements } from './supplements'

const Disclaimers = () => {
	const impersonatedUser = useAtomValue(impersonatedUserAtom)
	const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})

	if (isLoading) return null
	if (!currentUser) return null
	return (
		<>
			<Supplements currentUser={currentUser} />
		</>
	)
}

export { Disclaimers }
