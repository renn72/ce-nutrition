'use client'

import { useState } from 'react'
import { api } from '@/trpc/react'

import { toast } from 'sonner'
import { formatDate } from '@/lib/utils'
import type { GetUserBasic } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { CirclePlus, ShieldUser } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'

import WhistleIcon from '../icons/whistle-icon'
import { DataTableRowActions } from './data-table-row-actions'
import { SpinnerGapIcon } from '@phosphor-icons/react'

export const columns: ColumnDef<GetUserBasic>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label='Select all'
				className='mx-2 translate-y-[2px]'
			/>
		),
		cell: ({ row }) => (
			<div onClick={(e) => e.stopPropagation()}>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
					className='mx-2 translate-y-[2px]'
				/>
			</div>
		),
		enableSorting: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='id' />
		),
		cell: ({ row }) => <div className='w-max'>{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'createdAt',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Created' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='font-medium max-w-[500px] truncate'>
						{formatDate(row.getValue('createdAt'))}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='font-medium truncate lg:w-[200px]'>
						{row.getValue('name')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'lastName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Surname' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='font-medium w-[100px] truncate'>
						{row.getValue('lastName')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'firstName',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='First Name' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='font-medium w-[100px] truncate'>
						{row.getValue('firstName')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
		cell: ({ row }) => {
			return (
				<HoverCard>
					<HoverCardTrigger>
						<div className='flex space-x-2'>
							<span className='font-medium truncate lg:w-[300px]'>
								{row.getValue('email')}
							</span>
						</div>
					</HoverCardTrigger>
					<HoverCardContent>
						<div className='flex flex-col space-y-2'>
							<div className='text-sm font-medium'>{row.getValue('email')}</div>
						</div>
					</HoverCardContent>
				</HoverCard>
			)
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Categories' />
		),
		cell: ({ row }) => {
			const categories = row.original?.category?.map((category) => ({
				id: category.category.id,
				name: category.category.name,
			}))

			const ctx = api.useUtils()
			const { data: userCategories } = api.userCatagories.getAll.useQuery()
			const { mutate: addToUser } = api.userCatagories.addToUser.useMutation({
				onSuccess: () => {
					ctx.user.invalidate()
				},
			})
			const { mutate: removeFromUser } =
				api.userCatagories.removeFromUser.useMutation({
					onSuccess: () => {
						ctx.user.invalidate()
					},
				})
			return (
				<div className='flex justify-between items-center space-x-2'>
					<div className='flex flex-wrap gap-1'>
						{categories?.map((category) => (
							<Dialog key={category.id}>
								<DialogTrigger asChild>
									<Badge
										key={category.id}
										variant='secondary'
										className='leading-none cursor-pointer text-[0.7rem] py-[3px] h-min hover:text-background hover:bg-foreground'
									>
										{category.name}
									</Badge>
								</DialogTrigger>
								<DialogContent
									onOpenAutoFocus={(e) => {
										e.preventDefault()
									}}
								>
									<DialogHeader>
										<DialogTitle>{`Remove ${'category'} as this clients category?`}</DialogTitle>
										<DialogDescription className=''>
											Remove the category from this client.
										</DialogDescription>
									</DialogHeader>
									<div className='flex flex-col gap-4 w-full'>
										<Button
											variant='destructive'
											onClick={(e) => {
												e.stopPropagation()
												if (!row.original) return
												removeFromUser({
													userId: row.original.id,
													categoryId: category.id,
												})
											}}
										>
											Delete
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						))}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<CirclePlus
								size={16}
								strokeWidth={2}
								className='active:scale-90 text-secondary-foreground hover:text-primary active:text-primary'
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Add Category</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{userCategories?.map((category) => {
								return (
									<DropdownMenuItem
										key={category.id}
										onSelect={(e) => {
											e.stopPropagation()
											if (!row.original) return
											addToUser({
												userId: row.original.id,
												categoryId: category.id,
											})
										}}
										onClick={(e) => {
											e.stopPropagation()
										}}
									>
										{category.name}
									</DropdownMenuItem>
								)
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
	{
		accessorKey: 'trainer',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Trainer' />
		),
		cell: ({ row }) => {
			const ctx = api.useUtils()
			const { data: trainers } = api.trainer.getAll.useQuery()
			const { mutate: addTrainer } = api.trainer.add.useMutation({
				onSuccess: () => {
					ctx.user.invalidate()
				},
			})
			const { mutate: deleteTrainer } = api.trainer.delete.useMutation({
				onSuccess: () => {
					ctx.user.invalidate()
				},
			})
			const clientsTrainers = row.original?.trainers.map((trainer) => ({
				id: trainer.trainer.id,
				name: trainer.trainer.name,
			}))
			const { data: currentUser } = api.user.getCurrentUser.useQuery()
			const currentUserId = currentUser?.id || ''
			return (
				<div className='flex justify-between items-center px-4 space-x-2 max-w-[300px]'>
					<div className='flex flex-wrap gap-1'>
						{clientsTrainers?.map((trainer) => (
							<Dialog key={trainer.id}>
								<DialogTrigger asChild>
									<Badge
										key={trainer.id}
										variant='secondary'
										className='leading-none cursor-pointer text-[0.7rem] py-[3px] h-min hover:text-background hover:bg-foreground'
									>
										{trainer.name?.split(' ')[0]}
									</Badge>
								</DialogTrigger>
								<DialogContent
									onOpenAutoFocus={(e) => {
										e.preventDefault()
									}}
								>
									<DialogHeader>
										<DialogTitle>{`Remove ${trainer.name} as this clients trainer?`}</DialogTitle>
										<DialogDescription className=''>
											remove the trainer from this client.
										</DialogDescription>
									</DialogHeader>
									<div className='flex flex-col gap-4 w-full'>
										<Button
											variant='destructive'
											onClick={(e) => {
												e.stopPropagation()
												if (!row.original) return
												deleteTrainer({
													userId: row.original.id,
													trainerId: trainer.id,
												})
											}}
										>
											Delete
										</Button>
									</div>
								</DialogContent>
							</Dialog>
						))}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<CirclePlus
								size={16}
								strokeWidth={2}
								className='active:scale-90 text-secondary-foreground hover:text-primary active:text-primary'
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Add Trainer</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{trainers
								?.filter(
									(trainer) =>
										currentUserId === 'f3feb152-06de-4a1e-8c9f-19d5c96c6788' ||
										trainer.id !== 'f3feb152-06de-4a1e-8c9f-19d5c96c6788',
								)
								?.map((trainer) => {
									return (
										<DropdownMenuItem
											key={trainer.id}
											onSelect={(e) => {
												e.stopPropagation()
												if (!row.original) return
												addTrainer({
													userId: row.original.id,
													trainerId: trainer.id,
												})
											}}
											onClick={(e) => {
												e.stopPropagation()
											}}
										>
											{trainer.name}
										</DropdownMenuItem>
									)
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			)
		},
	},
	{
		accessorKey: 'isTrainer',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Trainers' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='flex justify-center items-center font-medium w-[50px] truncate text-blue-600/80 -rotate-[15deg]'>
						{row.getValue('isTrainer') ? (
							<WhistleIcon size={20} strokeWidth={8} />
						) : (
							''
						)}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'isAdmin',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Admin' />
		),
		cell: ({ row }) => {
			const isAdmin = row.original?.roles?.find((role) => role.name === 'admin')
			return (
				<div className='flex space-x-2'>
					<span className='flex justify-center items-center font-medium w-[50px] truncate'>
						{isAdmin ? <ShieldUser size={18} /> : ''}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'isActive',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Active' />
		),
		cell: ({ row }) => {
			const [isOpen, setIsOpen] = useState(false)
			const [isLoading, setIsLoading] = useState(false)
			const ctx = api.useUtils()
			const { mutate } = api.user.updateIsUserActive.useMutation({
				onMutate: (newData) => {
					setIsLoading(true)
					ctx.user.getAll.cancel()
					const previousData = ctx.user.getAll.getData()
					if (!previousData) return
					ctx.user.getAll.setData(undefined, [
						...previousData.map((user) => {
							if (user.id === newData.id) {
								return {
									...user,
									isActive: newData.isActive,
								}
							}
							return user
						}),
					])

					return { previousData }
				},
				onSettled: () => {
					ctx.user.invalidate()
					setIsLoading(false)
					setIsOpen(false)
				},
				onError: (_err, _newPoopLog, context) => {
					toast.error('error')
					ctx.user.getAll.setData(undefined, context?.previousData)
				},
			})

			const isActive = row.original?.isActive
			const userId = row.original?.id
			return (
				<div className='flex space-x-2'>
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogTrigger className='cursor-pointer'>
							{isActive ? (
								<Badge variant='accent'>Active</Badge>
							) : (
								<Badge variant='destructive'>Inactive</Badge>
							)}
						</DialogTrigger>
						<DialogContent
							onOpenAutoFocus={(e) => {
								e.preventDefault()
							}}
						>
							<DialogHeader>
								<DialogTitle>Activate/Deactivate User</DialogTitle>
								<DialogDescription />
							</DialogHeader>
							{isActive ? (
								<div className='flex gap-4 justify-center w-full'>
									<Button
										className='w-28'
										variant='destructive'
										onMouseDown={(e) => {
											e.preventDefault()
											if (!userId) return
											mutate({
												id: userId,
												isActive: false,
											})
										}}
									>
										{isLoading ? (
											<SpinnerGapIcon className='animate-spin' />
										) : (
											'Deactivate'
										)}
									</Button>
									<Button
										className='w-min'
										onMouseDown={(e) => e.preventDefault()}
									>
										Cancel
									</Button>
								</div>
							) : (
								<div className='flex gap-4 justify-center w-full'>
									<Button
										className='w-min'
										variant='accent'
										onMouseDown={(e) => {
											e.preventDefault()
											if (!userId) return
											mutate({
												id: userId,
												isActive: true,
											})
										}}
									>
										Activate
									</Button>
									<Button
										className='w-min'
										onMouseDown={(e) => e.preventDefault()}
									>
										cancel
									</Button>
								</div>
							)}
						</DialogContent>
					</Dialog>
				</div>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
