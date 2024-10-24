
'use client'

import { api } from '@/trpc/react'

import { DataTable } from '@/components/recipe/data-table'
import { DataTableSkeleton } from '@/components/recipe/data-table-skeleton'

export default function Home() {

  const { data, isLoading } = api.recipe.getAll.useQuery()
  console.log('recipe', data)
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
          <DataTable recipe={data} />
        </div>
      ) : null}
    </div>
  )
}

