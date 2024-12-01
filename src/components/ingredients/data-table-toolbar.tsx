'use client'

import Link from 'next/link'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
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

  console.log(table.getState())

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter questions...'
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
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2'>
        <Link href='/admin/base/ingredient/create'>
          <CirclePlus
            size={24}
            className='text-primary/50 hover:text-primary active:scale-90 transition-transform cursor-pointer'
          />
        </Link>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

// {table.getColumn('tags') && (
//   <div />
//   // <DataTableFacetedFilter
//   //   column={table.getColumn('tags')}
//   //   title='Tags'
//   //   options={tags?.map((tag) => tag.name ?? '')}
//   // />
// )}
//

// {table.getColumn('hiddenAt') && (
//   <div>
//     <DataTableFacetedFilter
//       column={table.getColumn('hiddenAt')}
//       title='Hidden'
//       options={['Hidden']}
//     />
//   </div>
// )}
