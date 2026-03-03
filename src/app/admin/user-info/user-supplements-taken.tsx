'use client'

import { cn } from '@/lib/utils'
import type { GetAllDailyLogs } from '@/types'
import { LockIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'

const UserSupplementsTaken = ({
	dailyLogs,
	className,
}: {
	dailyLogs: NonNullable<GetAllDailyLogs>
	className?: string
}) => {
	const logsWithSupplements = [...dailyLogs]
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.filter((log) => log.supplements.length > 0)

	if (logsWithSupplements.length === 0) {
		return (
			<div className={cn('w-full', className)}>
				<Card>
					<CardHeader>
						<CardTitle>Supplements Taken</CardTitle>
					</CardHeader>
					<CardContent>
						<p>No supplements logged.</p>
					</CardContent>
				</Card>
			</div>
		)
	}

	return (
		<div
			className={cn(
				'border rounded-lg py-2 px-1 xl:py-4 xl:px-2 flex flex-col w-full items-start gap-2',
				className,
			)}
		>
			<h1 className='pl-1 text-lg font-semibold xl:pl-0 xl:text-xl'>
				Supplements Taken
			</h1>
			<ScrollArea className='w-full h-full'>
				<div className='flex flex-col gap-2 px-1 w-full xl:px-4'>
					{logsWithSupplements.map((log) => (
						<Card key={log.id} className='gap-0 py-2 px-2 w-full'>
							<CardHeader className='py-0 px-2'>
								<div className='flex justify-between items-center gap-2'>
									<CardTitle className='pb-0 text-sm xl:text-base'>
										{new Date(log.date).toLocaleDateString('en-AU', {
											day: 'numeric',
											month: 'short',
											year: 'numeric',
										})}
									</CardTitle>
									<div className='py-1 px-2 rounded-full text-[0.6rem] bg-muted leading-none'>
										{log.supplements.length} logged
									</div>
								</div>
							</CardHeader>
							<CardContent className='py-0 px-2'>
								<div className='flex flex-col divide-y divide-border'>
									{[...log.supplements]
										.sort(
											(a, b) =>
												new Date(a.createdAt).getTime() -
												new Date(b.createdAt).getTime(),
										)
										.map((supp) => {
											const amountUnit = [supp.amount, supp.unit]
												.filter(Boolean)
												.join(' ')

											return (
												<div key={supp.id} className='flex flex-col py-1 gap-1'>
													<div className='grid grid-cols-5 gap-2 items-center text-xs xl:text-sm'>
														<div className='flex col-span-3 gap-1 items-center truncate'>
															<span className='truncate'>
																{supp.supplement?.name ?? 'Unknown supplement'}
															</span>
															{supp.supplement?.isPrivate ? (
																<LockIcon
																	size={10}
																	className='text-red-500 shrink-0'
																/>
															) : null}
														</div>
														<div className='flex col-span-2 justify-end gap-1 whitespace-nowrap'>
															{amountUnit ? <span>{amountUnit}</span> : null}
															{supp.time ? (
																<span className='text-muted-foreground'>
																	{supp.time}
																</span>
															) : null}
														</div>
													</div>
													{supp.notes ? (
														<div className='text-[0.65rem] text-muted-foreground truncate'>
															{supp.notes}
														</div>
													) : null}
												</div>
											)
										})}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</ScrollArea>
		</div>
	)
}

export { UserSupplementsTaken }
