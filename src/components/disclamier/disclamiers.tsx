'use client'

import { api } from '@/trpc/react'

import { impersonatedUserAtom } from '@/atoms'
import { useAtomValue } from 'jotai'

import { Supplements } from './supplements'

const Disclaimers = () => {
	const impersonatedUser = useAtomValue(impersonatedUserAtom)
	const { isLoading } = api.user.getCurrentUserRoles.useQuery({
		id: impersonatedUser.id,
	})

	if (isLoading) return null
	return (
		<>
			<Supplements />
		</>
	)
}

export { Disclaimers }
