'use client'

import { formatDate } from '@/lib/utils'
import type { GetPlanById } from '@/types'
import { ColumnDef, } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'


import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { PlanPreview } from './plan-preview'

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
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='id'
      />
    ),
    cell: ({ row }) => <div className='w-min'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Created'
      />
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
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title=''
      />
    ),
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
      <DataTableColumnHeader
        column={column}
        title='Name'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='w-[210px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'numberOfMeals',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Meals'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='w-[110px] truncate font-medium'>
            {row.getValue('numberOfMeals')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'notes',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Notes'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='w-[100px] truncate font-medium'>
            {row.getValue('notes')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'recipeCategory',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Category'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='w-[100px] truncate font-medium'>
            {row.getValue('recipeCategory')}
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
