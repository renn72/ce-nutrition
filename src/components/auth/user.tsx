'use client'

import { api } from '@/trpc/react'
import { useClientMediaQuery } from '@/hooks/use-client-media-query'

import { useState } from 'react'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import {
	Database,
	House,
	ImageIcon,
	LogOutIcon,
	MessageSquareMore,
	Settings,
	UserCircle,
	UserRoundCog,
	VenetianMask,
	Warehouse,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'

import { SignInUp } from '@/components/auth/sign-in-up'

const ImpersonateUser = () => {
	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: users } = api.user.getAll.useQuery()

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'>
				<VenetianMask size={20} />
				Impersonate
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent
				sideOffset={-36}
				alignOffset={-180}
				className='max-h-84'
			>
				<DropdownMenuSub>
					<ScrollArea className='w-full h-[450px]'>
						{users
							?.sort((a, b) => {
								if (!a.name) return 1
								if (!b.name) return -1
								return a.name.localeCompare(b.name)
							})
							?.map((user) => (
								<DropdownMenuItem
									key={user.id}
									className='flex gap-2 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
									onClick={() =>
										setImpersonatedUser((prev) => ({
											...prev,
											id: user.id,
											name: user.name ?? '',
										}))
									}
								>
									<UserCircle size={20} />
									<span className='truncate'>{user.name}</span>
								</DropdownMenuItem>
							))}
					</ScrollArea>
				</DropdownMenuSub>
			</DropdownMenuSubContent>
		</DropdownMenuSub>
	)
}

const User = () => {
	const ctx = api.useUtils()
	const { data: user, isLoading } = api.user.getCurrentUser.useQuery()
	const [isOpen, setIsOpen] = useState(false)

	const isMobile = useClientMediaQuery({ query: '(max-width: 768px)' })

	const { theme, setTheme } = useTheme()
	const isTrainer = user?.isTrainer

	const isCreator = user?.isCreator
	const onLogout = async () => {
		try {
			await signOut()
		} catch (_e) {
			toast.error('Error logging out')
			return
		}
		ctx.user.isUser.refetch()
	}

	if (isLoading)
		return (
			<div
				className={cn(
					'flex items-center justify-center rounded-full cursor-pointer ',
					'bg-secondary-foreground/40 h-8 w-8 pt-1 text-sm font-bold',
				)}
			/>
		)
	if (!user) return <SignInUp />
	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<div
					className={cn(
						'flex items-center justify-center rounded-full cursor-pointer ',
						'bg-secondary-foreground/40 h-8 w-8 pt-1 text-sm font-bold',
					)}
				>
					{user.firstName?.slice(0, 1).toUpperCase()}
					{user.lastName?.slice(0, 1).toUpperCase()}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				sideOffset={12}
				className='min-w-48'
				forceMount
			>
				<Link href='/'>
					<DropdownMenuLabel>
						<div className='flex gap-6 items-center'>
							<div
								className={cn(
									'flex items-center justify-center rounded-full cursor-pointer',
									'bg-secondary-foreground/40 h-8 w-8 pt-1 text-sm font-bold',
									'hover:bg-secondary-foreground/70',
								)}
							>
								{user.firstName?.slice(0, 1).toUpperCase()}
								{user.lastName?.slice(0, 1).toUpperCase()}
							</div>
							<div className='pt-1'>{user.name}</div>
						</div>
					</DropdownMenuLabel>
				</Link>
				<DropdownMenuSeparator />
				<Link href='/'>
					<DropdownMenuItem
						onClick={() => setIsOpen(false)}
						className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
					>
						<House size={20} />
						Home{' '}
					</DropdownMenuItem>
				</Link>
				{!isMobile && (
					<>
						<DropdownMenuSeparator />
						<Link href={`/user/user-image`}>
							<DropdownMenuItem className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'>
								<ImageIcon size={20} />
								Gallery
							</DropdownMenuItem>
						</Link>
					</>
				)}

				{isTrainer && (
					<>
						<DropdownMenuSeparator />
						<Link href={`/admin/user-info?user=${user.id}`}>
							<DropdownMenuItem
								onClick={() => setIsOpen(false)}
								className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
							>
								<UserRoundCog size={20} />
								Admin
							</DropdownMenuItem>
						</Link>
					</>
				)}
				{isCreator && (
					<>
						<DropdownMenuSeparator />
						<Link href='/user/admin-logs'>
							<DropdownMenuItem
								onClick={() => setIsOpen(false)}
								className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
							>
								<Warehouse size={20} />
								Admin Logs
							</DropdownMenuItem>
						</Link>
					</>
				)}
				{isCreator && (
					<>
						<DropdownMenuSeparator />
						<ImpersonateUser />
					</>
				)}
				<DropdownMenuSeparator />
				<Link href='/user/message'>
					<DropdownMenuItem
						onClick={() => setIsOpen(false)}
						className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
					>
						<MessageSquareMore size={20} />
						Messages
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<Link href='/user/settings'>
					<DropdownMenuItem
						onClick={() => setIsOpen(false)}
						className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
					>
						<Settings size={20} />
						Settings
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
					onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
				>
					{theme === 'light' ? (
						<MoonIcon className='w-4 h-4' />
					) : (
						<SunIcon className='w-4 h-4' />
					)}
					<span className=''>Toggle theme</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onLogout()}
					className='flex gap-6 items-center py-4 px-4 -m-1 rounded-none cursor-pointer'
				>
					<LogOutIcon size={20} />
					<span className=''>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { User }
