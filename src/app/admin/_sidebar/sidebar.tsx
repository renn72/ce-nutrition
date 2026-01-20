'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'
import * as React from 'react'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import { atom, useAtom } from 'jotai'
import { Check, ChevronsUpDown, ShieldUser, ChevronLeft } from 'lucide-react'
import { Link } from 'next-view-transitions'

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
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTriggerChevron,
	SidebarRail,
	useSidebar,
} from '@/components/ui/sidebar'
import { Switch } from '@/components/ui/switch'

import WhistleIcon from '@/components/icons/whistle-icon'

export const userAtom = atom<string>('')

const data = {
	navMain: [
		{
			title: 'Testing',
			url: '#',
			items: [
				{
					title: 'Kanban',
					url: '/admin/kanban',
				},
				{
					title: 'Calendar',
					url: '/admin/calendar',
				},
			],
		},
		{
			title: 'User',
			url: '#',
			items: [
				{
					title: 'Info',
					url: '/admin/user-info',
				},
				{
					title: 'Logs',
					url: '/admin/user-logs',
				},
				{
					title: 'Images',
					url: '/admin/user-image',
				},
				{
					title: 'Skinfolds',
					url: '/admin/user-skinfolds',
				},
				{
					title: 'Program',
					url: '/admin/user-program',
				},
				{
					title: 'Create',
					url: '/admin/user-create-plan',
				},
				{
					title: 'Supplements',
					url: '/admin/user-supplement',
				},
				{
					title: 'break-1',
					url: '',
				},
				{
					title: 'Settings',
					url: '/admin/user-settings',
				},
				{
					title: 'User Super',
					url: '/admin/user-super',
				},
			],
		},
		{
			title: 'Views',
			items: [
				{
					title: 'Weight',
					url: '/user-weight-view',
				},
				{
					title: 'Lean Mass',
					url: '/user-lean-mass-view',
				},
				{
					title: 'Body Fat',
					url: '/user-body-fat-view',
				},
			],
		},
		{
			title: 'Building Blocks',
			url: '#',
			items: [
				{
					title: 'Plans',
					url: '/admin/plan',
				},
				// {
				//   title: 'Meals',
				//   url: '/admin/meal',
				// },
				{
					title: 'Recipes',
					url: '/admin/recipe',
				},
				{
					title: 'Ingredients',
					url: '/admin/ingredient',
				},
				{
					title: 'Supplements',
					url: '/admin/supplement',
				},
				// {
				//   title: 'Store',
				//   url: '/admin/store',
				// },
				{
					title: 'Users',
					url: '/admin/users',
				},
			],
		},
		{
			title: 'Admin',
			url: '#',
			items: [
				{
					title: 'Super',
					url: '/admin/super',
				},
				{
					title: 'All Skinfolds',
					url: '/admin/skinfolds',
				},
			],
		},
	],
}

const AdminSidebarContent = () => {
	const [isOpen, setIsOpen] = React.useState(false)
	const { setOpenMobile, isMobile } = useSidebar()
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	const [isOnlyYourClients, setIsOnlyYourClients] = useState(false)

	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const user = searchParams.get('user')

	const [selectedUser, setSelectedUser] = useAtom(userAtom)
	const [impersonatedUser, _setImpersonatedUser] = useAtom(impersonatedUserAtom)

	const { data: userCategories } = api.userCatagories.getAll.useQuery()
	const { data: currentUser } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})
	const { data: yourUsers, isLoading } = api.user.getAllYour.useQuery()

	const allUsers = yourUsers
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

	React.useEffect(() => {
		if (user) {
			setSelectedUser(user)
		}
	}, [user])

	if (isLoading) return null

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem className='flex justify-between items-center'>
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
							<PopoverContent
								forceMount
								className='p-0 w-[900px] max-w-[100vw]'
							>
								<Command>
									<div className='flex flex-col gap-2 w-full lg:flex-row'>
										<CommandInput
											className='w-full'
											placeholder='Search users...'
										/>
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
												?.sort(
													(a, b) => a.name?.localeCompare(b.name ?? '') ?? 0,
												)
												?.map((user) => {
													const isTrainer = user.isTrainer
													const isAdmin = user.roles?.find(
														(role) => role.name === 'admin',
													)
														? true
														: false
													return (
														<CommandItem
															key={user.id}
															value={user.id}
															onSelect={(currentValue) => {
																router.push(`${pathname}?user=${user.id}`)

																setSelectedUser(currentValue)
																setIsOpen(false)
															}}
															className={cn(
																'grid grid-cols-13',
																'px-0 lg:px-2',
																selectedUser === user.id ? 'bg-muted' : '',
															)}
														>
															<Check
																className={cn(
																	'mr-2 h-4 w-4',
																	selectedUser === user.id
																		? 'opacity-100'
																		: 'opacity-0',
																)}
															/>
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
																		className='px-1 tracking-tighter leading-none cursor-pointer text-[0.7rem] py-[3px] h-min hover:text-background hover:bg-foreground'
																	>
																		{category.category.name}
																	</Badge>
																))}
															</span>
															<span
																className={cn(isTrainer ? 'text-blue-600' : '')}
															>
																{isTrainer ? (
																	<WhistleIcon
																		size={20}
																		strokeWidth={6}
																		className='-rotate-[15deg]'
																	/>
																) : null}
															</span>
															<span
																className={cn(isAdmin ? 'text-red-900/80' : '')}
															>
																{isAdmin ? (
																	<ShieldUser size={20} strokeWidth={2} />
																) : null}
															</span>
														</CommandItem>
													)
												})}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
						<SidebarTriggerChevron />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items
									.filter(
										(item) => item.title !== 'Kanban' || currentUser?.isCreator,
									)
									.filter(
										(item) => item.title !== 'Super' || currentUser?.isCreator,
									)
									.filter(
										(item) =>
											item.title !== 'User Super' || currentUser?.isCreator,
									)
									.filter(
										(item) =>
											item.title !== 'All Skinfolds' || currentUser?.isCreator,
									)
									.map((item) => {
										if (item.url === '')
											return <div key={item.title} className='py-1' />
										return (
											<div key={item.title}>
												<SidebarMenuItem key={item.title}>
													<SidebarMenuButton
														asChild
														isActive={pathname === item.url}
														onClick={() => {
															console.log('clicked')
															if (isMobile) setOpenMobile(false)
														}}
													>
														<Link href={`${item.url}?user=${user}`}>
															{item.title}
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											</div>
										)
									})}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}

const AdminSidebar = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	return (
		<SidebarProvider>
			<AdminSidebarContent />
			<SidebarInset className=''>{children}</SidebarInset>
		</SidebarProvider>
	)
}

export { AdminSidebar }
