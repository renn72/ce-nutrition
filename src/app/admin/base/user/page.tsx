

'use client'
import { Suspense, use  } from 'react'
import { api } from '@/trpc/react'

import { DataTable } from '@/components/user/data-table'
import { DataTableSkeleton } from '@/components/user/data-table-skeleton'

export default function Home() {

  const { data, isLoading } = api.user.getAll.useQuery()
  return (
    <div className='flex flex-col items-center w-full'>
      {isLoading ? (
        <DataTableSkeleton
          className='max-w-screen-xl'
          columnCount={6}
          rowCount={20}
        />
      ) : null}
      {data ? (
        <div className='max-w-screen-xl min-w-screen-xl py-6'>
          <DataTable users={data} />
        </div>
      ) : null}
    </div>
  )
}

