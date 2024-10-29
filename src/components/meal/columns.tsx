'use client'

import { api } from '@/trpc/react'

import { formatDate } from '@/lib/utils'
import type { GetMealById } from '@/types'
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

export const columns: ColumnDef<GetMealById>[] = [
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
        api.meal.updateFavourite.useMutation({
          onSettled: () => {
            ctx.meal.invalidate()
          },
          onMutate: async () => {
            await ctx.meal.getAll.cancel()
            const prev = ctx.meal.getAll.getData()
            if (!prev) return
            const update = prev.map((ingredient) => {
              if (ingredient.id === row.original?.id) {
              // @ts-ignore
                ingredient.favouriteAt = new Date()
              }
              return ingredient
            })
            ctx.meal.getAll.setData(undefined, [
              ...update,
            ])
            return { prev }
          },
          onError: (_e, _new, prev) => {
            if (!prev) return
            ctx.meal.getAll.setData(undefined, { ...prev.prev })
          },
        })
      const { mutate: deleteFavourite } =
        api.meal.deleteFavourite.useMutation({
          onSettled: () => {
            ctx.meal.invalidate()
          },
          onMutate: async () => {
            await ctx.meal.getAll.cancel()
            const prev = ctx.meal.getAll.getData()
            if (!prev) return
            const update = prev.map((ingredient) => {
              if (ingredient.id === row.original?.id) {
              // @ts-ignore
                ingredient.favouriteAt = null
              }
              return ingredient
            })
            ctx.meal.getAll.setData(undefined, [
              ...update,
            ])
            return { prev }
          },
          onError: (_e, _new, prev) => {
            if (!prev) return
            ctx.meal.getAll.setData(undefined, { ...prev.prev })
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
              <span className='w-[100px] truncate font-medium'>
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
    accessorKey: 'vege',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Vegetables'
      />
    ),
    cell: ({ row }) => {
      const vege = row.original?.mealToVegeStack?.[0]?.vegeStack?.name
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[200px] truncate font-medium'>
            {vege}
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
