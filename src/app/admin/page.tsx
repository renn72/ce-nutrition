'use client'

import { api } from '@/trpc/react'

import { DataTable } from '@/components/ingredients/data-table'
import { DataTableSkeleton } from '@/components/ingredients/data-table-skeleton'

export default function Home() {

  const { data, isLoading } = api.ingredient.getAll.useQuery()
  return (
    <div className='flex min-h-screen flex-col items-center'>
      {isLoading ? (
        <DataTableSkeleton
          columnCount={8}
          rowCount={20}
        />
      ) : null}
      {data ? (
        <div className='px-4 py-8 space-y-4'>
          <DataTable ingredients={data} />
        </div>
      ) : null}
    </div>
  )
}
