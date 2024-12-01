'use client'

import { useSession } from "next-auth/react"
import { api } from '@/trpc/react'

import { DataTable } from '@/components/user/data-table'
import { DataTableSkeleton } from '@/components/user/data-table-skeleton'

export default function Home() {
  const { data: isRoot, isLoading: isLoadingRoot } = api.user.isRoot.useQuery()
  const { data, isLoading } = api.user.getAll.useQuery()
  if (isLoadingRoot) return null
  const users = data?.filter((user) => !user.isRoot || isRoot)
  return (
    <div className='flex flex-col items-center w-full'>
      {isLoading ? (
        <DataTableSkeleton
          className='max-w-screen-xl'
          columnCount={6}
          rowCount={20}
        />
      ) : null}
      {users ? (
        <div className='max-w-screen-xl min-w-screen-xl py-6'>
          <DataTable users={users} />
        </div>
      ) : null}
    </div>
  )
}
