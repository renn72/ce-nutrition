'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { NotebookText } from 'lucide-react'
import { Link } from 'next-view-transitions'

import { Label } from '@/components/ui/label'

import { Notifications } from './notifications'

import { impersonatedUserAtom } from '@/atoms'
import { api } from '@/trpc/react'
import { useAtomValue } from 'jotai'

export const dynamic = 'force-dynamic'

const MobileHeader = ({ isDesktop = false }: { isDesktop?: boolean }) => {
	const impersonatedUser = useAtomValue(impersonatedUserAtom)
	const { data: currentUser } = api.user.getCurrentUserRoles.useQuery({
		id: impersonatedUser.id,
	})
	return (
		<div
			className={cn(
				'grid grid-cols-3 items-center justify-around fixed z-10 bg-background',
				isDesktop ? 'top-[129px] w-[388px]' : 'top-0 w-full ',
			)}
		>
			<div className='flex flex-col gap-0 justify-center items-center'>
				<Link href='/user/program'>
					<NotebookText
						size={36}
						className='p-1 rounded-full cursor-pointer bg-accentt'
					/>
				</Link>
				<Label className='text-xs text-muted-foreground'>Plans</Label>
			</div>
			<div className='flex justify-center items-center place-self-center m-1 w-max rounded-full border-2 border-primary/50'>
				<Link
					className='opacity-80 transition-all hover:opacity-100 active:scale-90 p-[2px]'
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
			<div className='flex flex-col gap-0 justify-center items-center'>
				<Notifications currentUserId={currentUser?.id || ''} />
				<Label className='text-xs text-muted-foreground'>Notifications</Label>
			</div>
		</div>
	)
}

export { MobileHeader }
