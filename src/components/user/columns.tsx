'use client'

import { formatDate } from '@/lib/utils'
import type {GetUserBasic} from '@/types'
import type { ColumnDef } from '@tanstack/react-table'
import { CircleCheck, ShieldUser } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import WhistleIcon from '../icons/whistle-icon'

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
      <DataTableColumnHeader
        column={column}
        title='id'
      />
    ),
    cell: ({ row }) => <div className='w-max'>{row.getValue('id')}</div>,
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
      <DataTableColumnHeader
        column={column}
        title='Surname'
      />
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
      <DataTableColumnHeader
        column={column}
        title='First Name'
      />
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
      <DataTableColumnHeader
        column={column}
        title='Email'
      />
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
    accessorKey: 'isTrainer',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Trainers'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='w-[50px] truncate font-medium flex items-center justify-center'>
            {row.getValue('isTrainer') ? (
              <WhistleIcon
                size={20}
                strokeWidth={8}
              />
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
      <DataTableColumnHeader
        column={column}
        title='Admin'
      />
    ),
    cell: ({ row }) => {
      const isAdmin = row.original?.roles?.find(
        (role) => role.name === 'admin',
      )
      return (
        <div className='flex space-x-2'>
          <span className='w-[50px] truncate font-medium flex items-center justify-center'>
            {isAdmin ? (
              <ShieldUser size={18} />
            ) : (
              ''
            )}
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
