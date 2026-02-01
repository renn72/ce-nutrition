'use client'

import { cn } from '@/lib/utils'
import type { GetUserInfo } from '@/types'
import { LockIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const UserSupplementPlan = ({
	user,
	className,
}: {
	user: GetUserInfo
	className?: string
}) => {
	if (!user || !user.supplementStacks) return null

	const supplementStacks = user.supplementStacks.filter(
		(stack) => stack.supplements.length > 0,
	)

	if (supplementStacks.length === 0) {
		return (
			<div className={cn('w-full', className)}>
				<Card>
					<CardHeader>
						<CardTitle>Supplement Plan</CardTitle>
					</CardHeader>
					<CardContent>
						<p>No supplement plan.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div
			className={cn(
				'border rounded-lg p-2 xl:p-4 flex flex-col w-full items-start gap-2',
				className,
			)}
		>
			<h1 className='text-xl font-semibold'>Supplement Plan</h1>
			<ScrollArea className='w-full h-full'>
				<div className='flex flex-col gap-2 pr-2'>
					{supplementStacks.map((stack) => (
						<Card key={stack.id} className='gap-0 py-2 px-1 w-full xl:px-2'>
							<CardHeader className='py-0 px-2'>
								<CardTitle className='pb-0 text-base capitalize'>
									{stack.time}
								</CardTitle>
							</CardHeader>
							<CardContent className='py-0 px-2'>
								<div className='flex flex-col'>
									{stack.supplements.map((supp) => (
										<div
											key={supp.id}
											className='grid grid-cols-4 gap-2 items-center py-1 text-xs xl:text-sm'
										>
											<div className='flex col-span-3 gap-1 items-center truncate'>
												<span className='truncate'>
													{supp.supplement?.name}
												</span>
												{supp.supplement.isPrivate ? (
													<LockIcon
														size={10}
														className='text-red-500 shrink-0'
													/>
												) : null}
											</div>
											<div className='flex col-span-1 gap-1 place-self-end'>
												<span>{supp.size}</span>
												<span className='text-muted-foreground'>
													{supp.unit}
												</span>
											</div>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export { UserSupplementPlan }
