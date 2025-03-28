'use client'

import { api } from '@/trpc/react'

import { DataTable } from '@/components/meal/data-table'
import { DataTableSkeleton } from '@/components/table/data-table-skeleton'

export default function Home() {
  const { data, isLoading } = api.meal.getAll.useQuery()
  return (
    <div className='flex min-h-screen flex-col items-center w-full px-2'>
      {isLoading ? (
        <DataTableSkeleton
          className='max-w-screen-2xl'
          columnCount={6}
          rowCount={20}
        />
      ) : null}
      {data ? (
        <div className='max-w-screen-2xl min-w-screen-xl py-6'>
          <DataTable meals={data} />
        </div>
      ) : null}
    </div>
  )
}
