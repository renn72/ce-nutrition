'use client'

import { api } from '@/trpc/react'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { formatDate } from '@/lib/utils'
import type { GetSupplementById } from '@/types'
import type { ColumnDef, SortingFn } from '@tanstack/react-table'
import { Bookmark, LockKeyhole } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'

import { DataTableRowActions } from './data-table-row-actions'

const floatSortingFn: SortingFn<GetSupplementById> = (a, b, c) => {
	// @ts-ignore
	const aValue = Number.parseFloat(a.getValue(c).replace(',', ''))
	// @ts-ignore
	const bValue = Number.parseFloat(b.getValue(c).replace(',', ''))
	return aValue - bValue
}

export const columns: ColumnDef<GetSupplementById>[] = [
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
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label='Select row'
				className='translate-y-[2px] mx-2'
			/>
		),
		enableSorting: false,
	},
	{
		accessorKey: 'id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='id' />
		),
		cell: ({ row }) => <div className=''>{row.getValue('id')}</div>,
	},
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('createdAt')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'favouriteAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Favourite At' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('favouriteAt')}
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
		filterFn: (row, columnId, filterValue) => {
      // @ts-ignore
			const cell = row.getValue(columnId)?.replace(',', '') as string

      // @ts-ignore
			const values = filterValue.split(' ').filter((v) => v !== '')
			let res = false
			let i = 0
			for (const value of values) {
				if (cell.toLowerCase().includes(value.toLowerCase())) {
					if (i === 0) res = true
				} else {
					i = 1
					res = false
				}
			}
			return res
		},
		cell: ({ row }) => {
			return (
        <div className='flex space-x-2'>
          <span className='w-[200px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
			)
		},
	},
	{
		accessorKey: 'serveSize',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Size' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[100px] truncate font-medium'>
						{row.getValue('serveSize')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'serveUnit',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Unit' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[100px] truncate font-medium'>
						{row.getValue('serveUnit')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'isPrivate',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Private' />
		),
		cell: ({ row }) => {
      const isPrivate = row.getValue('isPrivate') as boolean
			return (
				<div className='flex space-x-2 justify-center text-fuchsia-800'>
						{isPrivate ? <LockKeyhole size={18} strokeWidth={2.5} /> : ''}
				</div>
			)
		},
	},
	{
		accessorKey: 'notes',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Notes' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[100px] truncate font-medium'>
						{row.getValue('notes')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'creator',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Creator' />
		),
		cell: ({ row }) => {
      // if (row.original?.user?.id === 'f3feb152-06de-4a1e-8c9f-19d5c96c6788') return null
			return (
				<div className='flex space-x-2'>
					<Badge variant='secondary'>{row.original?.user?.name?.split(' ')[0]}</Badge>
				</div>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
