'use client'

import { formatDate } from '@/lib/utils'
import type { GetRecipeById } from '@/types'
import { ColumnDef, } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<GetRecipeById>[] = [
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
    accessorKey: 'size',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Size'
      />
    ),
    cell: ({ row }) => {
      const recipe = row.original as GetRecipeById
      const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
        return acc + Number(curr?.serveSize)
      }, 0)
      return (
        <div className='flex space-x-2'>
          <span className='w-[90px] truncate font-medium'>
            {size} {recipe?.recipeToIngredient[0]?.ingredient?.serveUnit}
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
    cell: ({ row }) => {
      const recipe = row.original as GetRecipeById
      const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
        const cal = Number(curr?.ingredient?.caloriesWFibre)
        const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
        return acc + cal * scale
      }, 0)

      return (
        <div className='flex space-x-2'>
          <span className='w-[100px] truncate font-medium'>
            {size?.toFixed(2)}
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
        title='Calories wo Fibre'
      />
    ),
    cell: ({ row }) => {
      const recipe = row.original as GetRecipeById
      const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
        const cal = Number(curr?.ingredient?.caloriesWOFibre)
        const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
        return acc + cal * scale
      }, 0)
      return (
        <div className='flex space-x-2'>
          <span className='w-[100px] truncate font-medium'>
            {size?.toFixed(2)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'protien',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Protien'
      />
    ),
    cell: ({ row }) => {
      const recipe = row.original as GetRecipeById
      const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
        const cal = Number(curr?.ingredient?.protein)
        const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
        return acc + cal * scale
      }, 0)
      return (
        <div className='flex space-x-2'>
          <span className='w-[100px] truncate font-medium'>
            {size?.toFixed(2)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'carbs',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Carbohydrates'
      />
    ),
    cell: ({ row }) => {
      const recipe = row.original as GetRecipeById
      const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
        const cal = Number(curr?.ingredient?.availableCarbohydrateWithoutSugarAlcohols)
        const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
        return acc + cal * scale
      }, 0)
      return (
        <div className='flex space-x-2'>
          <span className='w-[100px] truncate font-medium'>
            {size?.toFixed(2)}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'fat',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Fat'
      />
    ),
    cell: ({ row }) => {
      const recipe = row.original as GetRecipeById
      const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
        const cal = Number(curr?.ingredient?.fatTotal)
        const scale = Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
        return acc + cal * scale
      }, 0)
      return (
        <div className='flex space-x-2'>
          <span className='w-[100px] truncate font-medium'>
            {size?.toFixed(2)}
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
