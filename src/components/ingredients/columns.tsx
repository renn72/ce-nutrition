'use client'

import { formatDate } from '@/lib/utils'
import type { GetIngredientById } from '@/types'
import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<GetIngredientById>[] = [
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
    accessorKey: 'foodName',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Name'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className='w-[400px] truncate font-medium'>
                {row.getValue('foodName')}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className='flex space-x-2'>
                <span className='font-medium'>{row.getValue('foodName')}</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )
    },
  },
  {
    accessorKey: 'serveSize',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Serve Size'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[50px] truncate font-medium'>
            {row.getValue('serveSize')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'serveUnit',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Serve Unit'
      />
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
    accessorKey: 'energyWithDietaryFibre',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Energy w Fibre'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('energyWithDietaryFibre')}kJ
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'energyWithoutDietaryFibre',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Energy w/o Fibre'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('energyWithoutDietaryFibre')}kJ
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'protein',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Protein'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('protein')}g
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'fatTotal',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Fat'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('fatTotal')}g
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'availableCarbohydrateWithoutSugarAlcohols',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Carbs w Alcohols'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('availableCarbohydrateWithoutSugarAlcohols')}g
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'availableCarbohydrateWithSugarAlcohols',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Carbs w/o Alcohols'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('availableCarbohydrateWithSugarAlcohols')}g
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
