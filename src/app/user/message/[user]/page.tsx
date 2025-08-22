'use client'

import { api } from '@/trpc/react'

import { use, } from 'react'


import { impersonatedUserAtom } from '@/atoms'
import { useAtom } from 'jotai'
import {  XIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Messages } from './messages'


const Page = ({ params }: { params: Promise<{ user: string }> }) => {
	const { user: userId } = use(params)
	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: currentUser, isLoading: getAllUserLoading } =
		api.user.getCurrentUser.useQuery({
			id: impersonatedUser.id,
		})


	if (!userId) return null
	if (getAllUserLoading) return null
	if (!currentUser) return null
	return (
		<>
			<Messages currentUser={currentUser} userId={userId} />
			{impersonatedUser.id !== '' ? (
				<div className='fixed bottom-14 left-1/2 -translate-x-1/2 opacity-80'>
					<Badge className='flex gap-4'>
						{impersonatedUser.name}
						<XIcon
							size={12}
							className='cursor-pointer'
							onClick={() => {
								setImpersonatedUser({
									id: '',
									name: '',
								})
							}}
						/>
					</Badge>
				</div>
			) : null}
		</>
	)
}

export default Page
