'use client'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { formatDate } from '@/lib/utils'
import type { GetSkinfoldById } from '@/types'
import type  { ColumnDef, SortingFn } from '@tanstack/react-table'

import { formulaOne } from '../utils'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from './data-table-column-header'

import { DataTableRowActions } from './data-table-row-actions'

const cell = (value: string) => {
  return {
    accessorKey: value,
    // @ts-ignore
    header: ({ column }) => {
      let title = value.slice(0, 1).toUpperCase() + value.slice(1)
      if (title === 'LowerAbdominal') title = 'U.Ab'
      if (title === 'Quadriceps') title = 'Quad'
      if (title === 'LowerBack') title = 'L.Back'
      if (title === 'Pectoral') title = 'Pec'
      if (title === 'Subscapular') title = 'Subscap.'

      return (
        <DataTableColumnHeader
          column={column}
          title={title}
          className='text-xs tracking-tighter'
        />
      )
    },
    // @ts-ignore
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[50px] truncate font-medium'>
            {row.getValue(value)}
          </span>
        </div>
      )
    },
    enableSorting: false,
  }
}

export const columns: ColumnDef<GetSkinfoldById>[] = [
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
    accessorKey: 'date',
    sortingFn: (a, b, c) => {
      const aValue = a?.getValue('date') as string
      const bValue = b?.getValue('date') as string
      return new Date(bValue).getTime() - new Date(aValue).getTime()
    },
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Date'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {new Date(row.getValue('date')).toLocaleDateString(
              'en-AU',
              {
                year: '2-digit',
                month: 'numeric',
                day: 'numeric',
              },
            )}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'bodyWeight',
    // @ts-ignore
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={'Weight'}
          className='text-xs tracking-tighter'
        />
      )
    },
    // @ts-ignore
    cell: ({ row }) => {
      // @ts-ignore
      const value = Number(row.getValue('bodyWeight')?.[0]?.bodyWeight).toFixed(1)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[50px] font-medium'>
            {value}kg
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'leanMass',
    // @ts-ignore
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={'LM'}
          className='text-xs tracking-tighter'
        />
      )
    },
    // @ts-ignore
    cell: ({ row }) => {
      // @ts-ignore
      const value = Number(row.getValue('leanMass')?.[0]?.leanMass).toFixed(1)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[50px] font-medium'>
            {value}kg
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'bodyFat',
    // @ts-ignore
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={'BF'}
          className='text-xs tracking-tighter'
        />
      )
    },
    // @ts-ignore
    cell: ({ row }) => {
      const chin = Number(row.getValue('chin'))
      const cheek = Number(row.getValue('cheek'))
      const lowerAbdominal = Number(row.getValue('lowerAbdominal'))
      const pectoral = Number(row.getValue('pectoral'))
      const biceps = Number(row.getValue('biceps'))
      const triceps = Number(row.getValue('triceps'))
      const subscapular = Number(row.getValue('subscapular'))
      const midAxillary = Number(row.getValue('midAxillary'))
      const suprailiac = Number(row.getValue('suprailiac'))
      const umbilical = Number(row.getValue('umbilical'))
      const lowerBack = Number(row.getValue('lowerBack'))
      const quadriceps = Number(row.getValue('quadriceps'))
      const hamstrings = Number(row.getValue('hamstrings'))
      const medialCalf = Number(row.getValue('medialCalf'))
      const knee = Number(row.getValue('knee'))
      const shoulder = Number(row.getValue('shoulder'))
      // @ts-ignore
      const bodyWeight = Number(row.getValue('bodyWeight')?.[0]?.bodyWeight)

      const { bodyFat, leanMass, } =
        formulaOne({
          chin,
          cheek,
          lowerAbdominal,
          pectoral,
          biceps,
          triceps,
          subscapular,
          midAxillary,
          suprailiac,
          umbilical,
          lowerBack,
          quadriceps,
          hamstrings,
          medialCalf,
          knee,
          shoulder,
          bodyWeight,
        })
      // @ts-ignore
      const value = Number(row.getValue('bodyFat')?.[0]?.bodyFat).toFixed(1)
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[50px] font-medium'>
            {value}%
          </span>
        </div>
      )
    },
  },
  cell('chin'),
  cell('cheek'),
  cell('lowerAbdominal'),
  cell('pectoral'),
  cell('biceps'),
  cell('triceps'),
  cell('subscapular'),
  cell('midAxillary'),
  cell('suprailiac'),
  cell('umbilical'),
  cell('lowerBack'),
  cell('quadriceps'),
  cell('hamstrings'),
  cell('medialCalf'),
  cell('knee'),
  cell('shoulder'),
  {
    accessorKey: 'notes',
    // @ts-ignore
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={'Notes'}
          className='text-xs tracking-tighter'
        />
      )
    },
    // @ts-ignore
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <HoverCard>
            <HoverCardTrigger asChild>
          <span className='max-w-[50px] font-medium truncate'>

            {row.getValue('notes')}
          </span>
            </HoverCardTrigger>
            <HoverCardContent className=''>
              <div className='flex flex-col gap-2'>
                <div className='text-sm'>{row.getValue('notes')}</div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
