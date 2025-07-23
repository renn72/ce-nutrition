'use client'

import { api } from '@/trpc/react'

import { DataTable } from '@/components/supplements/data-table'
import { DataTableSkeleton } from '@/components/table/data-table-skeleton'

export default function Home() {
	const { data, isLoading } = api.ingredient.getAllSupplements.useQuery()
  console.log(data)
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
					<DataTable supplements={data} />
				</div>
			) : null}
		</div>
	)
}
