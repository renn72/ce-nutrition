import { api } from '@/trpc/react'

import { useState, useEffect } from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import { useAtom } from 'jotai'
import { ChevronsUpDown, ShieldUser } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'

import WhistleIcon from '@/components/icons/whistle-icon'
import { atomWithStorage } from 'jotai/utils'

import { userAtom } from './sidebar'

import type { GetAllYourUsers } from '@/types'

import { getRelativeDateLabel } from '@/lib/utils'

const allUserAtom = atomWithStorage<GetAllYourUsers | null>('admin-users', null)

const SidebarUserSelect = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	const [isOnlyYourClients, setIsOnlyYourClients] = useState(false)

	const [cachedUsers, setCachedUsers] = useAtom(allUserAtom)

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const user = searchParams.get('user')

	const [selectedUser, setSelectedUser] = useAtom(userAtom)
	const [impersonatedUser, _setImpersonatedUser] = useAtom(impersonatedUserAtom)

	const { data: userCategories } = api.userCatagories.getAll.useQuery()
	const { data: currentUser } = api.user.getCurrentUserRoles.useQuery({
		id: impersonatedUser.id,
	})
	const { data: apiYourUsers } = api.user.getAllYour.useQuery(
		impersonatedUser.id,
	)

	useEffect(() => {
		if (apiYourUsers) {
			// const stringifiedData = JSON.stringify(apiYourUsers)
			//
			// const bytes = stringifiedData.length * 2
			// const kb = (bytes / 1024).toFixed(2)
			//
			// console.log(`Estimated Size CurrentUserRoles: ${kb} KB`)
			try {
				setCachedUsers(apiYourUsers)
			} catch (_err) {
				console.log('error caching users')
			}
		}
	}, [apiYourUsers, setCachedUsers])

	const yourUsers = apiYourUsers ?? cachedUsers

	const allUsers = yourUsers
		?.filter((user) => user.isActive)
		?.filter((user) => {
			if (!currentUser?.roles?.find((role) => role.name === 'admin'))
				return true
			if (user.id === currentUser?.id) return true
			if (isOnlyYourClients) {
				return user.trainers.find(
					(trainer) => trainer.trainer.id === currentUser?.id,
				)
			}
			return true
		})
		?.filter((user) => {
			if (selectedCategory === 'none') return true
			if (selectedCategory === '') return true
			if (
				!user.category?.find(
					(category) => category.category.name === selectedCategory,
				)
			)
				return false
			return true
		})
		?.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0)

	useEffect(() => {
		if (user) {
			setSelectedUser(user)
		}
	}, [user])

	return (
		<Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					className='justify-between w-[200px] bg-sidebar-background text-sidebar-foreground'
				>
					{selectedUser
						? allUsers?.find((user) => user.id === selectedUser)?.name
						: 'Select user...'}
					<ChevronsUpDown className='ml-2 w-4 h-4 opacity-50 shrink-0' />
				</Button>
			</PopoverTrigger>
			<PopoverContent forceMount className='p-0 w-[900px] max-w-[100vw]'>
				<Command
					filter={(value, search, keywords) => {
						const extendValue =
							value.toLowerCase() + ' ' + keywords?.join(' ').toLowerCase()
						if (extendValue.includes(search.toLowerCase())) return 1
						return 0
					}}
				>
					<div className='flex flex-col gap-2 w-full lg:flex-row'>
						<CommandInput className='w-[200px]' placeholder='Search users...' />
						<div className='flex gap-2 justify-center w-full lg:justify-start'>
							<Select
								value={selectedCategory}
								onValueChange={(value) => {
									setSelectedCategory(value)
								}}
							>
								<SelectTrigger className='mt-1 w-[180px]'>
									<SelectValue placeholder='Category' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='none'>None</SelectItem>
									{userCategories?.map((category) => (
										<SelectItem
											key={category.id}
											value={category.name ?? category.id.toString()}
											className='capitalize'
										>
											{category.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<div className='flex gap-2 items-center'>
								<Label>Only your clients</Label>
								<Switch
									checked={isOnlyYourClients}
									onCheckedChange={setIsOnlyYourClients}
									className=''
								/>
							</div>
						</div>
					</div>
					<CommandList className='max-h-[calc(100vh-100px)]'>
						<CommandEmpty>No user found.</CommandEmpty>
						<CommandGroup>
							{allUsers
								?.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0)
								?.map((user) => {
									const isTrainer = user.isTrainer
									const isAdmin = user.roles?.find(
										(role) => role.name === 'admin',
									)
										? true
										: false
									const lastLog = getRelativeDateLabel(user.latestLog)
									return (
										<CommandItem
											key={user.id}
											value={user.id}
											keywords={[user.name || '']}
											onSelect={(currentValue) => {
												router.push(`${pathname}?user=${user.id}`)
												router.refresh()

												setSelectedUser(currentValue)
												setIsOpen(false)
											}}
											className={cn(
												'grid grid-cols-14',
												'px-0 lg:px-2',
												selectedUser === user.id ? 'bg-muted' : '',
											)}
										>
											<span className='flex flex-wrap col-span-2 lg:col-span-1 gap-[1px]'>
												{user.trainers.map((trainer) => (
													<Badge
														key={trainer.trainer.id}
														variant='secondary'
														className={cn(
															'text-[0.65rem] lg:text-[0.7rem] py-[3px] px-[2px] lg:px-1 h-min leading-none',
															'cursor-pointer hover:text-background hover:bg-foreground tracking-tighter',
															'shadow-sm',
														)}
													>
														{trainer.trainer?.firstName}
													</Badge>
												))}
											</span>
											<span className='col-span-5 lg:col-span-6 truncate'>
												{user.name ?? user.email}
											</span>
											<span className='flex flex-wrap col-span-3 gap-[1px]'>
												{user.category?.map((category) => (
													<Badge
														key={category.category.id}
														variant='accent'
														className='px-1 tracking-tighter leading-none cursor-pointer text-[0.7rem] py-[3px] h-min truncate hover:text-background hover:bg-foreground'
													>
														{category.category.name}
													</Badge>
												))}
											</span>
											<span className={cn(isTrainer ? 'text-blue-600' : '')}>
												{isTrainer ? (
													<WhistleIcon
														size={20}
														strokeWidth={6}
														className='-rotate-[15deg]'
													/>
												) : null}
											</span>
											<span className={cn(isAdmin ? 'text-red-900/80' : '')}>
												{isAdmin ? (
													<ShieldUser size={20} strokeWidth={2} />
												) : null}
											</span>
											<span
												className={cn(
													'col-span-2 justify-self-end font-bold tracking-tighter text-[0.65rem] mr-[5px]',
													'text-muted-foreground',
													lastLog.includes(`y'day`)
														? 'text-muted-foreground/85 '
														: '',
													lastLog.includes('days')
														? 'text-muted-foreground/80 '
														: '',
													lastLog.includes('wk')
														? 'text-muted-foreground/70 '
														: '',
													lastLog.includes('mth')
														? 'text-muted-foreground/60 '
														: '',
													lastLog.includes('yr')
														? 'text-muted-foreground/50 '
														: '',
												)}
											>
												{lastLog}
											</span>
										</CommandItem>
									)
								})}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export { SidebarUserSelect }
