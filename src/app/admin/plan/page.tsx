'use client'

import { useAtom } from 'jotai'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'

import { api } from '@/trpc/react'

import { DataTable } from '@/components/plan/data-table'
import { DataTableSkeleton } from '@/components/table/data-table-skeleton'

import { isAllPlansAtom } from '@/atoms'

const LoadTable = ({ userId }: { userId: string }) => {
	const { data: allPlans } = api.plan.getAll.useQuery()
	const { data: myPlans, isLoading } = api.plan.getAllMy.useQuery({
		userId: userId,
	})

	const [isAll, setIsAll] = useAtom(isAllPlansAtom)

	return (
		<div className='flex flex-col items-center px-2 w-full min-h-screen'>
			{isLoading ? (
				<DataTableSkeleton
					className='max-w-screen-2xl'
					columnCount={6}
					rowCount={20}
				/>
			) : (
				<div className='py-6 max-w-screen-2xl min-w-screen-xl'>
					<div className='flex gap-1 mb-2 w-full text-sm font-semibold text-muted-foreground/50'>
						<div className={cn(isAll ? '' : 'text-foreground')}>My Plans</div>
						<Switch
							onCheckedChange={setIsAll}
							checked={isAll}
							className='data-[state=unchecked]:bg-foreground data-[state=checked]:bg-foreground'
						/>
						<div className={cn(isAll ? 'text-foreground' : '')}>All Plans</div>
					</div>
					{isAll ? (
						<>
							{allPlans ? (
								<DataTable plan={allPlans.filter((plan) => !plan.hiddenAt)} />
							) : null}
						</>
					) : (
						<>
							{myPlans ? (
								<DataTable plan={myPlans.filter((plan) => !plan.hiddenAt)} />
							) : null}
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default function Home() {
	const { data: user } = api.user.isUser.useQuery()
	if (!user) return null
	return <LoadTable userId={user.id} />
}
