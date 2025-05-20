'use client'

import { api } from '@/trpc/react'

import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import type { GetUserBasic } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { CircleCheck, CirclePlus, ShieldUser } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
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
				className='translate-y-[2px] mx-2'
			/>
		),
		cell: ({ row }) => (
			<div onClick={(e) => e.stopPropagation()}>
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label='Select row'
					className='translate-y-[2px] mx-2'
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
					<span className='max-w-[500px] truncate font-medium'>
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
					<span className='lg:w-[200px] truncate font-medium'>
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
					<span className='w-[100px] truncate font-medium'>
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
					<span className='w-[100px] truncate font-medium'>
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
							<span className='lg:w-[300px] truncate font-medium'>
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
			return (
				<div className='flex justify-between space-x-2 items-center max-w-[300px]'>
          <div className='flex gap-1 flex-wrap'>
            {clientsTrainers?.map((trainer) => (
              <Dialog key={trainer.id}>
                <DialogTrigger asChild>
              <Badge
                key={trainer.id}
                variant='secondary'
                className='text-[0.7rem] py-[3px] h-min leading-none cursor-pointer hover:text-background hover:bg-foreground'
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
                    <DialogDescription className=''>remove the trainer from this client.</DialogDescription>
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
              <CirclePlus size={20} strokeWidth={2} className='text-secondary-foreground hover:text-primary active:text-primary active:scale-90' />
            </DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Add Trainer</DropdownMenuLabel>
							<DropdownMenuSeparator />
              {
                trainers
                ?.filter((trainer) => trainer.id !== 'f3feb152-06de-4a1e-8c9f-19d5c96c6788')
                .map((trainer) => {
                  return (
                    <DropdownMenuItem key={trainer.id}
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
                })
              }
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
					<span className='w-[50px] truncate font-medium flex items-center justify-center text-blue-600/80 -rotate-[15deg]'>
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
					<span className='w-[50px] truncate font-medium flex items-center justify-center'>
						{isAdmin ? <ShieldUser size={18} /> : ''}
					</span>
				</div>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
