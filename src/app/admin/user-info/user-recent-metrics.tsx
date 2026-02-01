'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const UserRecentMetrics = ({
	userId,
	className,
}: {
	userId: string
	className?: string
}) => {
	const { data: skinfolds, isLoading } =
		api.metrics.getUserSkinfolds.useQuery(userId)

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
		<div
			className={cn(
				'border rounded-lg py-2 px-1 xl:py-4 xl:px-2 flex flex-col items-start gap-2',
				className,
			)}
		>
			<h1 className='pl-1 text-lg font-semibold xl:pl-0 xl:text-xl'>
				Recent Metrics
			</h1>
			<ScrollArea className='w-full'>
				<div className='flex flex-col gap-2 px-1 w-full xl:px-4'>
					{latestMetrics?.map((skinfold) => (
						<Card key={skinfold.id} className='gap-0 py-2 px-2 w-full'>
							<CardHeader className='py-0 px-2'>
								<CardTitle className='pb-0 text-sm xl:text-base'>
									{new Date(skinfold.date).toLocaleDateString('en-AU', {
										day: 'numeric',
										month: 'short',
										year: 'numeric',
									})}
								</CardTitle>
							</CardHeader>
							<CardContent className='py-0 px-2'>
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
