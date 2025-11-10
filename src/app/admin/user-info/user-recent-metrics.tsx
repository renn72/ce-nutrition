'use client'

import { api } from '@/trpc/react'

import type { GetUserById } from '@/types'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const UserRecentMetrics = ({ user, className }: { user: GetUserById, className?: string }) => {
	const { data: skinfolds, isLoading } = api.metrics.getUserSkinfolds.useQuery(
		user.id,
	)

	if (isLoading) {
		return (
			<div className={cn(className)}>
				<Card>
					<CardHeader>
						<CardTitle>Recent Metrics</CardTitle>
					</CardHeader>
					<CardContent>
						<p>Loading...</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	if (!skinfolds || skinfolds.length === 0) {
		return (
			<div className={cn(className)}>
				<Card>
					<CardHeader>
						<CardTitle>Recent Metrics</CardTitle>
					</CardHeader>
					<CardContent>
						<p>No metrics available.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	const latestMetrics = skinfolds.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	)

	return (
		<div className={cn('border rounded-lg py-2 px-1 xl:py-4 xl:px-2 flex flex-col items-start gap-2', className)}>
			<h1 className='text-lg xl:text-xl font-semibold pl-1 xl:pl-0'>Recent Metrics</h1>
      <ScrollArea className='w-full'>
      <div className='flex flex-col gap-2 w-full px-1 xl:px-4'>
			{latestMetrics?.map((skinfold) => (
				<Card key={skinfold.id} className='py-2 px-2 gap-0 w-full'>
					<CardHeader className='px-2 py-0'>
						<CardTitle className='pb-0 text-sm xl:text-base'>
							{new Date(skinfold.date).toLocaleDateString('en-AU', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})}
						</CardTitle>
					</CardHeader>
					<CardContent className='px-2 py-0'>
						<div className='flex justify-between items-center'>
							<p className='text-xs xl:text-sm'>
								{skinfold.bodyWeight
									? `${Number(skinfold.bodyWeight?.[0]?.bodyWeight).toFixed(1)}kg`
									: 'N/A'}
							</p>
							<p className='text-xs xl:text-sm'>
								{skinfold.leanMass
									? `${Number(skinfold.leanMass?.[0]?.leanMass).toFixed(1)}kg`
									: 'N/A'}
							</p>
							<p className='text-xs xl:text-sm'>
								{skinfold.bodyFat
									? `${Number(skinfold.bodyFat?.[0]?.bodyFat).toFixed(1)}%`
									: 'N/A'}
							</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
    </ScrollArea>
		</div>
	)
}

export { UserRecentMetrics }
