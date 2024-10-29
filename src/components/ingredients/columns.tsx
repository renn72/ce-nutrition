'use client'

import { api } from '@/trpc/react'

import { formatDate } from '@/lib/utils'
import type { GetIngredientById } from '@/types'
import { ColumnDef, SortingFn } from '@tanstack/react-table'
import { Bookmark } from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'

import { DataTableRowActions } from './data-table-row-actions'

const floatSortingFn: SortingFn<GetIngredientById> = (a, b, c) => {
  // @ts-ignore
  const aValue = parseFloat(a.getValue(c).replace(',', ''))
  // @ts-ignore
  const bValue = parseFloat(b.getValue(c).replace(',', ''))
  return aValue - bValue
}

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
    accessorKey: 'favouriteAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Favourite'
      />
    ),
    cell: ({ row }) => {
      const ctx = api.useUtils()
      const { mutate: updateFavourite } =
        api.ingredient.updateFavourite.useMutation({
          onSettled: () => {
            ctx.ingredient.invalidate()
          },
          onMutate: async () => {
            await ctx.ingredient.getAll.cancel()
            const prev = ctx.ingredient.getAll.getData()
            if (!prev) return
            const update = prev.map((ingredient) => {
              if (ingredient.id === row.original?.id) {
              // @ts-ignore
                ingredient.favouriteAt = new Date()
              }
              return ingredient
            })
            ctx.ingredient.getAll.setData(undefined, [
              ...update,
            ])
            return { prev }
          },
          onError: (_e, _new, prev) => {
            if (!prev) return
            ctx.ingredient.getAll.setData(undefined, { ...prev.prev })
          },
        })
      const { mutate: deleteFavourite } =
        api.ingredient.deleteFavourite.useMutation({
          onSettled: () => {
            ctx.ingredient.invalidate()
          },
          onMutate: async () => {
            await ctx.ingredient.getAll.cancel()
            const prev = ctx.ingredient.getAll.getData()
            if (!prev) return
            const update = prev.map((ingredient) => {
              if (ingredient.id === row.original?.id) {
              // @ts-ignore
                ingredient.favouriteAt = null
              }
              return ingredient
            })
            ctx.ingredient.getAll.setData(undefined, [
              ...update,
            ])
            return { prev }
          },
          onError: (_e, _new, prev) => {
            if (!prev) return
            ctx.ingredient.getAll.setData(undefined, { ...prev.prev })
          },
        })
      return (
        <div className='w-full flex justify-center'>
          {row.original?.favouriteAt ? (
            <Bookmark
              className='cursor-pointer active:scale-95'
              onClick={() => deleteFavourite({ id: row.original?.id || 0 })}
              fill='#FFB500'
              size={16}
            />
          ) : (
            <Bookmark
              className='cursor-pointer active:scale-95'
              onClick={() => updateFavourite({ id: row.original?.id || 0 })}
              size={16}
            />
          )}
        </div>
      )
    },
    enableSorting: true,
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
    accessorKey: 'publicFoodKey',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Food Key'
      />
    ),
    cell: ({ row }) => (
      <div className='w-min'>{row.getValue('publicFoodKey')}</div>
    ),
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
          <HoverCard>
            <HoverCardTrigger asChild>
              <span className='w-[400px] truncate font-medium'>
                {row.getValue('name')}
              </span>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className='flex space-x-2'>
                <span className='font-medium'>{row.getValue('name')}</span>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )
    },
  },
  {
    accessorKey: 'serveSize',
    sortingFn: floatSortingFn,
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
    accessorKey: 'caloriesWFibre',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Calories w Fibre'
      />
    ),
    sortingFn: floatSortingFn,
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('caloriesWFibre')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'caloriesWOFibre',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Calories w/o Fibre'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[100px] truncate font-medium'>
            {row.getValue('caloriesWOFibre')}
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
        title='Carbs w/o Alcohols'
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
        title='Carbs'
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
