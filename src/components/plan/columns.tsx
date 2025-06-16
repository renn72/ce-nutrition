'use client'

import { formatDate } from '@/lib/utils'
import type { GetPlanById } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'

import { DataTableRowActions } from './data-table-row-actions'
import { PlanPreview } from './plan-preview'
import { CheckCircle } from 'lucide-react'

export const columns: ColumnDef<GetPlanById>[] = [
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
		accessorKey: 'preview',
		header: ({ column }) => <DataTableColumnHeader column={column} title='' />,
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<PlanPreview plan={row.original as GetPlanById} />
				</div>
			)
		},
		enableSorting: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='lg:w-[410px] truncate font-medium'>
						{row.getValue('name')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'numberOfMeals',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Meals' />
		),
		cell: ({ row }) => {
      const plan = row.original as GetPlanById
      const numberOfMeals = plan?.meals?.length
			return (
				<div className='flex space-x-2'>
					<span className='lg:w-[110px] truncate font-medium'>
						{numberOfMeals}
					</span>
				</div>
			)
		},
	},
{
		accessorKey: 'numberOfRecipes',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Recipes' />
		),
		cell: ({ row }) => {
      const plan = row.original as GetPlanById
      const numberOfRecipes = plan?.meals?.reduce((acc, meal) => acc + meal.mealToRecipe.length, 0)
			return (
				<div className='flex space-x-2'>
					<span className='lg:w-[110px] truncate font-medium'>
						{numberOfRecipes}
					</span>
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
		accessorKey: 'recipeCategory',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Category' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='lg:w-[100px] truncate font-medium'>
						{row.getValue('recipeCategory')}
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
      const plan = row.original as GetPlanById
      return (
        <div className='flex space-x-2'>
          <Badge
            variant='secondary'
            className='truncate'
          >{plan?.creator?.name}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'isGlobal',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Global' />
    ),
    cell: ({ row }) => {
      const plan = row.original as GetPlanById
      return (
        <div className='flex space-x-2 justify-center'>
          {
            plan?.isGlobal ? (
              <Badge
                variant='secondary'
                className='truncate'
              >
                <CheckCircle size={16} />
              </Badge>
            ) : null
          }
        </div>
      )
    },
  },
	{
		id: 'actions',
		cell: ({ row }) => <DataTableRowActions row={row} />,
	},
]
