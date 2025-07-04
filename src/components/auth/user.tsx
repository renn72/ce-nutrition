'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useAtom } from 'jotai'
import {
	Database,
	House,
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
			<DropdownMenuSubTrigger className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'>
				<VenetianMask size={20} />
				Impersonate
			</DropdownMenuSubTrigger>
			<DropdownMenuSubContent
				sideOffset={-36}
				alignOffset={-180}
				className='max-h-84'
			>
				<DropdownMenuSub>
					<ScrollArea className='h-[450px] w-full'>
						{users?.map((user) => (
							<DropdownMenuItem
								key={user.id}
								className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-2'
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

	const { mutate: sync } = api.user.sync.useMutation({
		onSuccess: () => {
			ctx.invalidate()
			toast.success('Synced')
		},
	})
	const { theme, setTheme } = useTheme()
	const isTrainer = user?.isTrainer

	const isCreator = user?.isCreator
	const onLogout = async () => {
		try {
			await signOut()
		} catch (error) {
			toast.error('Error logging out')
			return
		}
		ctx.user.isUser.refetch()
	}

	// @ts-ignore
	if (isLoading) return <div className='w-8' />
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
						className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
					>
						<House size={20} />
						Home{' '}
					</DropdownMenuItem>
				</Link>

				{isTrainer && (
					<>
						<DropdownMenuSeparator />
						<Link href={`/admin/user-info?user=${user.id}`}>
							<DropdownMenuItem
								onClick={() => setIsOpen(false)}
								className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
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
								className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
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
						className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
					>
						<MessageSquareMore size={20} />
						Messages
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<Link href='/user/settings'>
					<DropdownMenuItem
						onClick={() => setIsOpen(false)}
						className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
					>
						<Settings size={20} />
						Settings
					</DropdownMenuItem>
				</Link>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
					onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
				>
					{theme === 'light' ? (
						<MoonIcon className='h-4 w-4' />
					) : (
						<SunIcon className='h-4 w-4' />
					)}
					<span className=''>Toggle theme</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onLogout()}
					className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
				>
					<LogOutIcon size={20} />
					<span className=''>Logout</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { User }
