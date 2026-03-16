'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const UserInfo = ({ userId }: { userId: string }) => {
	const ctx = api.useUtils()

	const { data: user } = api.user.get.useQuery(userId || '')

	if (!user) return null

	return (
		<div className='flex flex-col gap-4 items-center mt-10'>
			<div className='flex gap-4 items-center'></div>
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
