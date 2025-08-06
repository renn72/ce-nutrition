'use client'

import { api } from '@/trpc/react'

import type { GetUserById } from '@/types'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const UserRecentMetrics = ({ user }: { user: GetUserById }) => {
	const { data: skinfolds, isLoading } = api.metrics.getUserSkinfolds.useQuery(
		user.id,
	)

	if (isLoading) {
		return (
			<div className='w-[300px]'>
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
			<div className='w-[300px]'>
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
		<div className='border rounded-lg p-4 flex flex-col w-[300px] items-start gap-2 max-h-[450px] min-h-[300px]'>
			<h1 className='text-xl font-semibold'>Recent Metrics</h1>
			{latestMetrics?.map((skinfold) => (
				<Card key={skinfold.id} className='py-2 px-2 gap-0 w-full'>
					<CardHeader className='px-2 py-0'>
						<CardTitle className='pb-0 text-base'>
							{new Date(skinfold.date).toLocaleDateString('en-AU', {
								day: 'numeric',
								month: 'short',
								year: 'numeric',
							})}
						</CardTitle>
					</CardHeader>
					<CardContent className='px-2 py-0'>
						<div className='flex justify-between items-center'>
							<p className='text-sm'>
								{skinfold.bodyWeight
									? `${Number(skinfold.bodyWeight?.[0]?.bodyWeight).toFixed(1)}kg`
									: 'N/A'}
							</p>
							<p className='text-sm'>
								{skinfold.leanMass
									? `${Number(skinfold.leanMass?.[0]?.leanMass).toFixed(1)}kg`
									: 'N/A'}
							</p>
							<p className='text-sm'>
								{skinfold.bodyFat
									? `${Number(skinfold.bodyFat?.[0]?.bodyFat).toFixed(1)}%`
									: 'N/A'}
							</p>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	)
}

export { UserRecentMetrics }
