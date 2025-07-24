'use client'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'
import type { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
// @ts-ignore
import confetti from 'canvas-confetti'
import { ChevronDown, ListCollapse, Pill, Toilet } from 'lucide-react'
import { toast } from 'sonner'

import type { GetUserById } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const SuppTimes = ({ user, time }: { user: GetUserById; time: string }) => {

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle className='capitalize'>{time}</CardTitle>
				<CardDescription>Supplements</CardDescription>
			</CardHeader>
			<CardContent>
				<div
					className={cn(
						'flex flex-col gap-2',
					)}
				>
					{user.supplementStacks
						.find((stack) => stack.time === time)
						?.supplements.map((supp) => {
							return (
								<div
									key={supp.id}
									className='grid grid-cols-6 gap-2 items-center px-2 text-sm py-1 rounded-full border bg-background shadow-sm'
								>
									<div className='col-span-3 truncate'>
										{supp.supplement?.name}
									</div>
									<div className='place-self-end'>{supp.size}</div>
									<div className='place-self-start'>{supp.unit}</div>
								</div>
							)
						})}
				</div>
			</CardContent>
		</Card>
	)
}

const SuppLog = ({
	userId,
	dailyLogs,
}: {
	userId: string
	dailyLogs: GetAllDailyLogs | null | undefined
}) => {
	const today = new Date()

	const ctx = api.useUtils()

	const todaysDailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === today.toDateString(),
	)
	const { data: user } = api.user.get.useQuery(userId || '')
	const suppTimes = user?.supplementStacks
		.map((stack) => {
			return stack.time
		})
		.filter((item, pos, self) => self.indexOf(item) === pos)

	return (
		<div className='flex flex-col gap-0 w-full items-center'>
			<Sheet.Root license='non-commercial'>
				<div className='flex flex-col gap-0 items-center justify-start w-full'>
					<div className={cn('text-lg font-semibold h-7')} />
					<div
						className={cn(
							'rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center',
							'justify-center active:scale-75 transition-transform cursor-pointer',
						)}
					>
						<Sheet.Trigger onClick={(e) => {}}>
							<Pill
								size={28}
								className={cn(
									'text-primary/80 hover:text-primary active:scale-90 transition-transform cursor-pointer',
								)}
							/>
						</Sheet.Trigger>
					</div>
				</div>
				<Sheet.Portal>
					<Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
						<Sheet.Content className='min-h-[200px] max-h-[95vh] h-full rounded-t-3xl bg-background relative'>
							<div className='flex flex-col justify-between h-full'>
								<div className='flex flex-col '>
									<div className='flex justify-center pt-1'>
										<Sheet.Handle
											className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
											action='dismiss'
										/>
									</div>
									<div className='flex gap-0 pt-2 flex-col border-b-[1px] border-primary pb-2 relative font-medium'>
										<div className='flex justify-center items-center gap-6 mt-1'>
											<Sheet.Title className='text-xl mt-[2px] font-semibold'>
												Supps
											</Sheet.Title>
											<Sheet.Description className='hidden'>
												Meal Log
											</Sheet.Description>
										</div>
									</div>
									<ScrollArea className='pt-4 px-2 h-[calc(95vh-130px)]'>
										{suppTimes?.map((time) => {
											return time ? (
												<SuppTimes key={time} user={user} time={time} />
											) : null
										})}
									</ScrollArea>
								</div>
								<Sheet.Trigger
									className='w-full flex justify-center'
									action='dismiss'
								>
									<ChevronDown
										size={32}
										strokeWidth={2}
										className='text-muted-foreground'
									/>
								</Sheet.Trigger>
							</div>
						</Sheet.Content>
					</Sheet.View>
				</Sheet.Portal>
			</Sheet.Root>
			<ListCollapse size={20} className='text-muted-foreground' />
		</div>
	)
}

export { SuppLog }
