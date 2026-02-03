'use client'

import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'

import { api } from '@/trpc/react'

import { DataTable } from '@/components/plan/data-table'

import type { GetAllPlansSimple } from '@/types'

import { atomWithStorage } from 'jotai/utils'

import { isAllPlansAtom } from '@/atoms'

const allPlansAtom = atomWithStorage<GetAllPlansSimple | null>(
	'all-plans',
	null,
)
const allYourPlansAtom = atomWithStorage<GetAllPlansSimple | null>(
	'all-your-plans',
	null,
)

const LoadTable = ({ userId }: { userId: string }) => {
	const [allPlansCache, setAllPlansCache] = useAtom(allPlansAtom)
	const [allMyPlansCache, setAllMyPlansCache] = useAtom(allYourPlansAtom)

	const { data: apiAllPlans } = api.plan.getAllSimple.useQuery()
	const { data: apiMyPlans } = api.plan.getAllMySimple.useQuery({
		userId: userId,
	})

	useEffect(() => {
		if (apiAllPlans) setAllPlansCache(apiAllPlans.slice(0, 20))
	}, [apiAllPlans, setAllPlansCache])

	const allPlans = apiAllPlans ?? allPlansCache

	useEffect(() => {
		if (apiMyPlans) setAllMyPlansCache(apiMyPlans.slice(0, 20))
	}, [apiMyPlans, setAllMyPlansCache])

	const myPlans = apiMyPlans ?? allMyPlansCache

	const [isAll, setIsAll] = useAtom(isAllPlansAtom)

	return (
		<div className='flex flex-col items-center px-2 w-full min-h-screen'>
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
		</div>
	)
}

export default function Home() {
	const { data: user } = api.user.isUser.useQuery()
	if (!user) return null
	return <LoadTable userId={user.id} />
}
