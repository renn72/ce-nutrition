'use client'

import { api } from '@/trpc/react'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { formatDate } from '@/lib/utils'
import type { GetSupplementById } from '@/types'
import type { ColumnDef, SortingFn } from '@tanstack/react-table'
import { Bookmark } from 'lucide-react'

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
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
		filterFn: (row, columnId, filterValue) => {
			const cell = row.getValue(columnId)?.replace(',', '') as string

			const values = filterValue.split(' ').filter((v) => v !== '')
			console.log(values)
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
			const isMobile = useClientMediaQuery('(max-width: 600px)')
			return (
				<div className='flex space-x-2'>
					{isMobile ? (
						<Popover>
							<PopoverTrigger asChild>
								<span className='w-[200px] lg:w-[400px] truncate font-medium lg:tracking-tighter'>
									{row.getValue('name')}
								</span>
							</PopoverTrigger>
							<PopoverContent className='w-[280px] p-4 text-xs'>
								<div className='flex space-x-2'>
									<span className='font-medium'>{row.getValue('name')}</span>
								</div>
							</PopoverContent>
						</Popover>
					) : (
						<HoverCard>
							<HoverCardTrigger asChild>
								<span className='w-[200px] lg:w-[400px] truncate font-medium lg:tracking-tighter'>
									{row.getValue('name')}
								</span>
							</HoverCardTrigger>
							<HoverCardContent>
								<div className='flex space-x-2'>
									<span className='font-medium'>{row.getValue('name')}</span>
								</div>
							</HoverCardContent>
						</HoverCard>
					)}
				</div>
			)
		},
	},
	{
		accessorKey: 'notes',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Carbs' />
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
      if (row.original?.user?.id === 'f3feb152-06de-4a1e-8c9f-19d5c96c6788') return null
			return (
				<div className='flex space-x-2'>
					<Badge variant='secondary'>{row.original?.user?.name}</Badge>
				</div>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
