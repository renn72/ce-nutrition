

'use client'

import { api } from '@/trpc/react'

import { DataTable } from '@/components/grocery-store/data-table'
import { DataTableSkeleton } from '@/components/grocery-store/data-table-skeleton'

export default function Home() {

  const { data, isLoading } = api.groceryStore.getAll.useQuery()
  console.log('store', data)
  return (
    <div className='flex min-h-screen flex-col items-center w-full'>
      {isLoading ? (
        <DataTableSkeleton
          className='max-w-screen-xl'
          columnCount={6}
          rowCount={20}
        />
      ) : null}
      {data ? (
        <div className='max-w-screen-xl min-w-screen-xl py-6'>
          <DataTable groceryStores={data} />
        </div>
      ) : null}
    </div>
  )
}

