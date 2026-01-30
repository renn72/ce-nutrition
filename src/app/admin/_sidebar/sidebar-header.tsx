'use client'

import * as React from 'react'

import { Notifications } from '@/components/layout/notifications'

import { api } from '@/trpc/react'

import Image from 'next/image'
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

const SidebarHeader = () => {
	const { data: currentUser } = api.user.getCurrentUser.useQuery()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const userId = searchParams.get('user')
	const { data: user } = api.user.getBasic.useQuery(userId || '')

	if (!currentUser) return null
	return (
		<header className='flex gap-2 justify-between items-center px-4 h-12 border-b'>
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
				<AdminLoader userId={currentUser.id} />
			</div>
			<div className='flex gap-2 items-center'>
				<Notifications currentUser={currentUser} />
				<User />
			</div>
		</header>
	)
}

export { SidebarHeader }
