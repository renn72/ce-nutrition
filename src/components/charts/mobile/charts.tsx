'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetAllDailyLogs, GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { toast } from 'sonner'

import { Card, CardContent } from '@/components/ui/card'

const chartRanges = [7, 14, 30, 90]

const Charts = ({
	userId,
	currentUser,
	dailyLogs,
}: {
	userId: string
	currentUser: GetUserById
	isDesktop?: boolean
	dailyLogs: GetAllDailyLogs
}) => {
	const [chartRange, setChartRange] = useState(() =>
		Number(currentUser?.settings?.defaultChartRange ?? 7),
	)

  const ctx = api.useUtils()
	const { mutate: updateChartRange } = api.user.updateChartRange.useMutation({
		onSettled: () => {
			ctx.user.invalidate()
		},
	})
	return (
		<Card className="">
			<CardContent className="pb-2 px-0">
				<div className="flex gap-4 justify-center font-normal text-xs mt-[-0.5rem]">
					{chartRanges.map((range) => (
						<div
							key={range}
							className={cn(
								'cursor-pointer p-2 rounded-lg',
								chartRange === range
									? 'underline font-bold bg-accent-foreground/10'
									: '',
							)}
							onClick={() => {
								setChartRange(range)
								if (!currentUser) return
								if (!currentUser.settings) return
								updateChartRange({
									range: range,
									id: currentUser.settings?.id,
								})
							}}
						>
							{range}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export  { Charts }
