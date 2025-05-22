'use client'

import { formatDate } from '@/lib/utils'
import type { GetRecipeById } from '@/types'
import type { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/table/data-table-column-header'

import { DataTableRowActions } from './data-table-row-actions'
import { CheckCircle } from 'lucide-react'

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
			<DataTableColumnHeader column={column} title='id' />
		),
		cell: ({ row }) => <div className='w-min'>{row.getValue('id')}</div>,
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
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='min-w-[250px] max-w-[500px] truncate font-medium'>
						{row.getValue('name')}
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
			<DataTableColumnHeader column={column} title='Category' />
		),
		cell: ({ row }) => {
      console.log('row', row.original)
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[300px] truncate font-medium'>
						{row.getValue('recipeCategory')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'recipeDescription',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Description' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[300px] truncate font-medium'>
						{row.getValue('recipeDescription')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'size',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Size' />
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
			<DataTableColumnHeader column={column} title='Calories w Fibre' />
		),
		cell: ({ row }) => {
			const recipe = row.original as GetRecipeById
			const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
				const cal = Number(curr?.ingredient?.caloriesWFibre)
				const scale =
					Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
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
			<DataTableColumnHeader column={column} title='Calories' />
		),
		cell: ({ row }) => {
			const recipe = row.original as GetRecipeById
			const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
				const cal = Number(curr?.ingredient?.caloriesWOFibre)
				const scale =
					Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
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
		accessorKey: 'protein',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Protein' />
		),
		cell: ({ row }) => {
			const recipe = row.original as GetRecipeById
			const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
				const cal = Number(curr?.ingredient?.protein)
				const scale =
					Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
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
			<DataTableColumnHeader column={column} title="Carb's" />
		),
		cell: ({ row }) => {
			const recipe = row.original as GetRecipeById
			const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
				const cal = Number(
					curr?.ingredient?.availableCarbohydrateWithoutSugarAlcohols,
				)
				const scale =
					Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
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
			<DataTableColumnHeader column={column} title='Fat' />
		),
		cell: ({ row }) => {
			const recipe = row.original as GetRecipeById
			const size = recipe?.recipeToIngredient.reduce((acc, curr) => {
				const cal = Number(curr?.ingredient?.fatTotal)
				const scale =
					Number(curr?.serveSize) / Number(curr?.ingredient?.serveSize)
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
		accessorKey: 'creator',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Creator' />
		),
		cell: ({ row }) => {
			const recipe = row.original as GetRecipeById
			return (
				<div className='flex space-x-2'>
					<Badge
            variant='secondary'
            className='truncate'
          >{recipe?.creator?.name}</Badge>
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
      const recipe = row.original as GetRecipeById
      return (
        <div className='flex space-x-2 justify-center'>
          {
            recipe?.isGlobal ? (
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
