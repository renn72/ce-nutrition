'use client'

import { api } from '@/trpc/react'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { DataTableViewOptions } from './data-table-view-options'

import { FormDialog } from './form-dialog'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  const ctx = api.useUtils()

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Filter questions...'
          value={
            (table.getColumn('foodName')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('foodName')?.setFilterValue(event.target.value)
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
        <FormDialog />
      <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

// {table.getColumn('topics') && (
//   <div />
//   // <DataTableFacetedFilter
//   //   column={table.getColumn('topics')}
//   //   title='Topics'
//   //   options={topics?.map((topic) => topic.name ?? '')}
//   // />
// )}
// {table.getColumn('tags') && (
//   <div />
//   // <DataTableFacetedFilter
//   //   column={table.getColumn('tags')}
//   //   title='Tags'
//   //   options={tags?.map((tag) => tag.name ?? '')}
//   // />
// )}