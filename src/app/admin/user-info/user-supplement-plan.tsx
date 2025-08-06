'use client'

import type { GetUserById } from '@/types'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LockIcon } from 'lucide-react'

const UserSupplementPlan = ({ user }: { user: GetUserById }) => {
	if (!user || !user.supplementStacks) return null

	const supplementStacks = user.supplementStacks.filter(
		(stack) => stack.supplements.length > 0,
	)

	if (supplementStacks.length === 0) {
		return (
			<div className='w-[300px]'>
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
		<div className='border rounded-lg p-4 flex flex-col w-[300px] items-start gap-2 max-h-[450px] min-h-[300px]'>
			<h1 className='text-xl font-semibold'>Supplement Plan</h1>
			<ScrollArea className='h-full w-full'>
				<div className='flex flex-col gap-2 pr-2'>
					{supplementStacks.map((stack) => (
						<Card key={stack.id} className='py-2 px-2 gap-0 w-full'>
							<CardHeader className='px-2 py-0'>
								<CardTitle className='pb-0 text-base capitalize'>
									{stack.time}
								</CardTitle>
							</CardHeader>
							<CardContent className='px-2 py-0'>
								<div className='flex flex-col'>
									{stack.supplements.map((supp) => (
										<div
											key={supp.id}
											className='grid grid-cols-4 gap-2 items-center text-sm py-1'
										>
											<div className='col-span-3 truncate flex items-center gap-1'>
												<span className='truncate'>{supp.supplement?.name}</span>
												{supp.supplement.isPrivate ? (
													<LockIcon size={10} className='text-red-500 shrink-0' />
												) : null}
											</div>
											<div className='place-self-end col-span-1 flex gap-1'>
												<span>{supp.size}</span>
												<span className='text-muted-foreground'>{supp.unit}</span>
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
