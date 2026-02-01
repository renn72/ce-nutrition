'use client'

import { Notifications } from '@/components/layout/notifications'

import { api } from '@/trpc/react'

import Image from 'next/image'
import { useAtom } from 'jotai'
import { usePathname, useSearchParams } from 'next/navigation'

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { User } from '@/components/auth/user'
import { AdminLoader } from './admin-loader'

import { impersonatedUserAtom } from '@/atoms'

import { Badge } from '@/components/ui/badge'
import { XIcon } from 'lucide-react'

const SidebarHeader = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const userId = searchParams.get('user')
	const { data: user } = api.user.getCurrentUserRoles.useQuery({
		id: userId || '',
	})

	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: currentUser } = api.user.getCurrentUserRoles.useQuery({
		id: impersonatedUser.id,
	})

	return (
		<header className='flex relative gap-2 justify-between items-center px-4 h-12 border-b'>
			<div className='flex gap-2 items-center shrink-0'>
				<SidebarTrigger className='-ml-1' />
				<Separator
					// @ts-ignore
					orientation='vertical'
					className='mr-2 h-4'
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className='hidden md:block'>
							<BreadcrumbLink href='/admin/'>
								<Image src='/logo/ce.png' alt='logo' width={20} height={20} />
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className='hidden md:block' />
						<BreadcrumbItem>
							<BreadcrumbPage className='capitalize'>
								{pathname.split('/')[3]?.replaceAll('%', ' ')}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</div>
			<div className='text-lg font-semibold text-center'>
				{user ? `${user?.firstName} ${user?.lastName}` : null}
				<AdminLoader userId={userId || ''} />
			</div>
			<div className='flex gap-2 items-center'>
				<Notifications currentUserId={currentUser?.id || ''} />
				<User />
			</div>
			{impersonatedUser.id !== '' ? (
				<div className='absolute top-4 right-24 opacity-80'>
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
		</header>
	)
}

export { SidebarHeader }
