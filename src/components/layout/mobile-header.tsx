'use client'

import { api } from '@/trpc/react'

import Image from 'next/image'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import {  NotebookText } from 'lucide-react'
import { Link } from 'next-view-transitions'

import { Label } from '@/components/ui/label'


import { Notifications } from './notifications'

export const dynamic = 'force-dynamic'

const MobileHeader = ({ isDesktop = false }: { isDesktop?: boolean }) => {
	const [impersonatedUser, _setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})
	if (isLoading) return null
	if (!currentUser) return null
	return (
		<div
			className={cn(
				'grid grid-cols-3 items-center justify-around fixed z-10 bg-background',
				isDesktop ? 'top-[129px] w-[388px]' : 'top-0 w-full ',
			)}
		>
			<div className='flex flex-col gap-0 items-center justify-center'>
				<Link href='/user/program'>
					<NotebookText
						size={36}
						className='bg-accentt cursor-pointer rounded-full p-1'
					/>
				</Link>
				<Label className='text-xs text-muted-foreground'>Plans</Label>
			</div>
			<div className='flex items-center justify-center rounded-full border-2 border-primary/50 m-1 w-max place-self-center'>
				<Link
					className='hover:opacity-100 opacity-80 transition-all active:scale-90 p-[2px]'
					href='/'
				>
					<Image
						src='/logo/ce.png'
						alt='logo'
						width={42}
						height={42}
						priority
						style={{
							height: 'auto',
						}}
					/>
				</Link>
			</div>
			<div className='flex flex-col gap-0 items-center justify-center'>
				<Notifications currentUser={currentUser} />
				<Label className='text-xs text-muted-foreground'>Notifications</Label>
			</div>
		</div>
	)
}

export { MobileHeader }
