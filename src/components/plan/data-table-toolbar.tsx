'use client'

import Link from 'next/link'

import { Cross2Icon } from '@radix-ui/react-icons'
import type { Table } from '@tanstack/react-table'
import { CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableViewOptions } from './data-table-view-options'

interface DataTableToolbarProps<TData> {
	table: Table<TData>
}

export function DataTableToolbar<TData>({
	table,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	return (
		<div className='flex justify-between items-center'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Filter...'
					value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn('name')?.setFilterValue(event.target.value)
					}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => table.resetColumnFilters()}
						className='px-2 h-8 lg:px-3'
					>
						Reset
						<Cross2Icon className='ml-2 w-4 h-4' />
					</Button>
				)}
			</div>
			<div className='flex gap-2 items-center'>
				<Link href='/admin/plan/create'>
					<CirclePlus
						size={20}
						className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-primary/50 hover:text-primary'
					/>
				</Link>
				<DataTableViewOptions table={table} />
			</div>
		</div>
	)
}
