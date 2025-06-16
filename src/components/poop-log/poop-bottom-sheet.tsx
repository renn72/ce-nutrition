'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetAllDailyLogs } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { format } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import {
	CalendarIcon,
	ChevronDown,
	ListCollapse,
	Shuffle,
	Toilet,
	Trash2,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar-log'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

const transition = {
	duration: 0.15,
	ease: 'easeInOut',
}

const slideAnimation = {
	initial: { y: 20, opacity: 0 },
	animate: { y: 0, opacity: 1 },
	exit: { y: -20, opacity: 0 },
	transition: { transition },
}

const toiletPhrases = [
	'Dropping the kids off',
	'Taking the Browns out',
	'Downloading some logs',
	'Releasing the Kraken',
	'Visiting Uncle John',
	'Answering nature’s call',
	'Launching a torpedo',
	'Sending a fax out',
	'Making a splash',
	'Delivering a package',
	'On the porcelain throne',
	'Filling the royal seat',
	'Deploying the troops',
	'Meeting the plumbing team',
	'Evacuating the floor',
	'Taking the Oval seat',
	'On a secret mission',
	'Handling some business',
	'Unloading the cargo',
	'Sinking the Titanic',
	'Dropping the kids off',
	'Taking the Browns out',
	'Logging off',
	'Making a deposit',
	'Seeing a man about a dog',
	'Spending a penny',
	'Launching torpedoes',
	'Answering nature’s call',
	'Squeezing the cheese',
	'Visiting the throne',
	'Blowing up the bathroom',
	'Downloading a brownload',
	'Deploying the payload',
	'Baking butt brownies',
	'Opening the floodgates',
	'Firing the porcelain cannon',
	'Giving birth to a food baby',
	'Plopping a stink bomb',
	'Waging toilet warfare',
	'Releasing the Kraken',
	'Cooking a butt stew',
	'Painting the bowl',
	'Taking the scenic route',
	'Calling the commode',
	'Meeting the porcelain god',
	'Doing some paperwork',
	'Popping a squat',
	'Evacuating the premises',
	'Blasting off',
	'Unloading cargo',
	'Doing number two',
	'Having a sit-down',
	'Going full torpedo',
	'Reading on the throne',
	'Cracking porcelain',
	'Commode communion',
	'Power flushing',
	'Conducting butt business',
	'Making stink art',
]

const PoopBottomSheet = ({
	dailyLogs,
	deletePoopLog,
	addPoopLog,
}: {
	dailyLogs: GetAllDailyLogs | null | undefined
	deletePoopLog: ({ id }: { id: number }) => void
	addPoopLog: ({ date }: { date: string }) => void
}) => {
	const [title, setTitle] = useState(() => {
		const rnd = Math.floor(Math.random() * toiletPhrases.length)
		return toiletPhrases[rnd] ?? 'Toilet Log'
	})
	const [isOpen, setIsOpen] = useState(false)
	const [today, setToday] = useState<Date>(new Date())

	const todaysDailyLog = dailyLogs?.find((dailyLog) => {
		return dailyLog.date === today.toDateString()
	})

	const totalPoop =
		todaysDailyLog?.poopLogs.reduce((acc, _curr) => {
			return acc + 1
		}, 0) ?? 0

	return (
		<Sheet.Root license='non-commercial'>
			<Sheet.Trigger
				onClick={() => {
					const rnd = Math.floor(Math.random() * toiletPhrases.length)
					const phrase = toiletPhrases[rnd] ?? 'Toilet Log'
					setTitle(phrase)
				}}
				className='flex gap-2 items-center justify-center mt-1'
			>
				<ListCollapse size={20} className='text-muted-foreground' />
			</Sheet.Trigger>
			<Sheet.Portal>
				<Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
					<Sheet.Content className='min-h-[200px] max-h-[90vh] h-full rounded-t-3xl bg-background relative'>
						<div className='flex flex-col justify-between h-full'>
							<div className='flex flex-col '>
								<div className='flex justify-center pt-1 mb-2'>
									<Sheet.Handle
										className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
										action='dismiss'
									/>
								</div>
								<Popover open={isOpen} onOpenChange={setIsOpen}>
									<PopoverTrigger asChild>
										<div className='flex items-center justify-center'>
											<Button
												variant={'outline'}
												onClick={(e) => {
													e.stopPropagation()
													e.preventDefault()
													setIsOpen(true)
												}}
												className={cn(
													'w-[220px] font-semibold text-base mt-[2px] flex items-center justify-center shadow-sm',
													!today && 'text-muted-foreground',
												)}
											>
												<CalendarIcon className='mr-4 h-4 w-4 mt-[0px] shrink-0' />
												{today ? (
													<span className='mt-[5px]'>
														{format(today, 'PPP')}
													</span>
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</div>
									</PopoverTrigger>
									<PopoverContent
										onFocusOutside={(e) => e.preventDefault()}
										forceMount
										className='w-auto p-0 z-[2000]'
									>
										<Calendar
											mode='single'
											disabled={{ after: new Date() }}
											selected={today}
											onSelect={(date) => {
												if (!date) return
												setToday(date)
												setIsOpen(false)
											}}
											components={{
												// @ts-ignore
												DayContent: (props) => {
													const log = dailyLogs?.find(
														(log) => log.date === props.date.toDateString(),
													)
													const totalPoop =
														log?.poopLogs.reduce((acc, _curr) => {
															return acc + 1
														}, 0) ?? 0
                          if (props.date > new Date()) return <div>{props.date.getDate()}</div>
													return (
														<div className='flex flex-col gap-[2px]'>
															<div className=''>{props.date.getDate()}</div>
															<div className='text-[0.7rem] text-muted-foreground font-light'>{totalPoop === 0 ? '.' : totalPoop}</div>
														</div>
													)
												},
											}}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<div className='flex gap-4 pt-4 border-b-[1px] border-primary pb-4 relative font-medium items-center'>
									<div className='transition-transform '>
										<Sheet.Title className='text-lg ml-4 '>
											<AnimatePresence mode='wait'>
												<motion.div
													key={title}
													className=''
													initial={slideAnimation.initial}
													animate={slideAnimation.animate}
													exit={slideAnimation.exit}
													transition={slideAnimation.transition}
												>
													{title}
												</motion.div>
											</AnimatePresence>
										</Sheet.Title>
									</div>
									<Sheet.Description className='hidden'>
										Toilet Log
									</Sheet.Description>
									<div className='border w-px h-6' />
									<NumberFlow
										value={totalPoop}
										className='text-lg text-primary ml-2 '
									/>

									<div className='rounded-full border-[3px] border-primary/80 w-9 h-9 flex items-center justify-center active:scale-90 transition-transform cursor-pointer shadow-sm'>
										<Toilet
											className='ml-[1px]'
											size={22}
											onClick={() => {
												addPoopLog({
													date: today.toDateString(),
												})
											}}
										/>
									</div>
								</div>
								<div className='flex flex-col gap-2 p-4'>
									{todaysDailyLog?.poopLogs.length === 0 || !todaysDailyLog ? (
										<div className='text-center'>...</div>
									) : (
										todaysDailyLog?.poopLogs.map((poopLog, i) => (
											<div
												key={poopLog.id}
												className='grid grid-cols-4 gap-2 text-sm w-full bg-secondary rounded-full px-4 py-2 items-center'
											>
												<div className='text-primary font-normal col-span-1'>
													<div className='rounded-full h-6 w-6 bg-primary/20 flex justify-center items-center pt-[1px]'>
														{i + 1}
													</div>
												</div>
												<div className='text-muted-foreground font-normal col-span-2'>
													{poopLog.createdAt.toLocaleTimeString('en-AU')}
												</div>
												<div className='justify-self-end'>
													<Trash2
														size={16}
														className='cursor-pointer text-destructive hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
														onClick={() => {
															deletePoopLog({
																id: poopLog.id,
															})
														}}
													/>
												</div>
											</div>
										))
									)}
								</div>
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
	)
}

export { PoopBottomSheet }
