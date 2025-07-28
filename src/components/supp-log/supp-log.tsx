'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type {
	GetAllDailyLogs,
	GetDailyLogById,
	GetSupplementFromStack,
	GetUserById,
} from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Sheet, SheetStack } from '@silk-hq/components'
import { ChevronDown, ListCollapse, LockIcon, Pill, Toilet } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { DateSelect } from '@/components/date-select'

import { SuppBottomSheet } from './supp-bottom-sheet'

const formSchema = z.object({
	name: z.string().min(1),
	serveSize: z.number().positive(),
	serveUnit: z.string().min(1),
	isPrivate: z.boolean(),
	viewableBy: z.string().optional(),
	stackId: z.number(),
})

const SuppUserCreate = ({
	user,
	todaysDailyLog,
}: {
	user: GetUserById
	todaysDailyLog: GetDailyLogById | null | undefined
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			serveSize: 10,
			serveUnit: '',
			isPrivate: false,
			viewableBy: '',
			stackId: -1,
		},
	})

	const ctx = api.useUtils()
	const { mutate: createSupplement } = api.supplement.userCreate.useMutation({
		onSettled: () => {
			ctx.user.invalidate()
			ctx.dailyLog.invalidate()
			setIsOpen(false)
      form.reset()
		},
		onError: () => {
			toast.error('error conflict')
		},
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		createSupplement({
			...data,
			userId: user.id,
		})
	}

	return (
		<div className='flex flex-col gap-0 w-full items-center'>
			<Sheet.Root
				license='non-commercial'
				presented={isOpen}
				onPresentedChange={setIsOpen}
			>
				<Sheet.Trigger>
					<div
						className={cn(
							'text-sm truncate max-w-[600px]  py-3 px-4 border font-bold h-[40px] rounded-md bg-secondary ',
							'shadow-sm flex flex-col w-[calc(100vw-2rem)] gap-0 items-center justify-center',
							'hover:text-primary hover:bg-background',
						)}
					>
						Add Supplement
					</div>
				</Sheet.Trigger>
				<Sheet.Portal>
					<Sheet.View className='z-[1000] h-[100vh] bg-black/50 '>
						<Sheet.Content className='min-h-[200px] max-h-[90vh] h-full rounded-t-3xl bg-background relative'>
							<div className='flex flex-col justify-between h-full'>
								<div className='flex flex-col '>
									<div className='flex justify-center pt-1'>
										<Sheet.Handle
											className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
											action='dismiss'
										/>
									</div>
									<div className='flex justify-center items-center flex-col '>
										<Sheet.Title className='text-xl mt-[2px] font-semibold'>
											Supplement
										</Sheet.Title>
										<Sheet.Description className='hidden'>
											create a new supplement
										</Sheet.Description>
										<Form {...form}>
											<form onSubmit={form.handleSubmit(onSubmit)}>
												<div className='flex flex-col gap-4 w-full px-8'>
													<FormField
														control={form.control}
														name='name'
														render={({ field }) => (
															<FormItem>
																<FormLabel>Supplement Name</FormLabel>
																<FormControl>
																	<Input
																		placeholder='Name'
																		{...field}
																		type='text'
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name='serveSize'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Supplement Size</FormLabel>
																<FormControl>
																	<Input
																		placeholder='size'
																		{...field}
																		onChange={(e) =>
																			field.onChange(Number(e.target.value))
																		}
																		type='number'
																		className='w-full'
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name='serveUnit'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Supplement Unit Measure</FormLabel>
																<FormControl>
																	<Input
																		placeholder='unit measure'
																		{...field}
																		className='w-full'
																	/>
																</FormControl>

																<FormDescription />
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name='stackId'
														render={({ field }) => (
															<FormItem className='w-full'>
																<FormLabel>Time</FormLabel>
																<FormControl>
																	<ToggleGroup
																		orientation='vertical'
																		size='sm'
																		variant='outline'
																		type='single'
																		className='w-full justify-start'
																		value={field.value.toString()}
																		onValueChange={(value) => {
																			field.onChange(Number(value))
																		}}
																	>
																		{user.supplementStacks.map((stack) => {
																			return (
																				<ToggleGroupItem
																					key={stack.id}
																					value={stack.id.toString()}
																					className={cn(
																						'text-sm truncate py-3 px-4 data-[state=on]:bg-blue-900/70 relative',
																						'data-[state=on]:text-slate-100 data-[state=on]:shadow-none',
																						'h-full shadow-sm flex flex-col gap-0',
																						'hover:text-primary hover:bg-background',
																					)}
																				>
																					{stack.time}
																				</ToggleGroupItem>
																			)
																		})}
																	</ToggleGroup>
																</FormControl>

																<FormDescription />
																<FormMessage />
															</FormItem>
														)}
													/>

													<FormField
														control={form.control}
														name='isPrivate'
														render={({ field }) => (
															<FormItem>
																<FormLabel>Keep Private</FormLabel>
																<FormControl>
																	<Switch
																		checked={field.value}
																		onCheckedChange={field.onChange}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<Button type='submit'>Save</Button>
												</div>
											</form>
										</Form>
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
		</div>
	)
}

const Supp = ({
	user,
	supp,
	time,
	date,
	todaysDailyLog,
}: {
	user: GetUserById
	supp: GetSupplementFromStack
	time: string
	date: Date
	todaysDailyLog: GetDailyLogById | null | undefined
}) => {
	const ctx = api.useUtils()
	const { mutate: logSupplement } = api.supplement.logSupplement.useMutation({
		onSuccess: () => {
			ctx.dailyLog.invalidate()
		},
		onError: (err) => {},
	})
	const { mutate: unLogSupplement } =
		api.supplement.unLogSupplement.useMutation({
			onSuccess: () => {
				ctx.dailyLog.invalidate()
			},
			onError: (err) => {},
		})

	const [isTaken, setIsTaken] = useState(() =>
		todaysDailyLog?.supplements.find((s) => {
			return (
				s.supplementId === supp?.supplementId &&
				s.time?.toLowerCase() === time.toLowerCase()
			)
		})
			? true
			: false,
	)

	const takenSupplement = todaysDailyLog?.supplements.find((s) => {
		return (
			s.supplementId === supp?.supplementId &&
			s.time?.toLowerCase() === time.toLowerCase()
		)
	})

	const { data: suppFromDailyLog, isSuccess } =
		api.supplement.getSupplementFromDailyLog.useQuery({
			id: takenSupplement?.id || -1,
		})

	useEffect(() => {
		if (isSuccess) setIsTaken(suppFromDailyLog ? true : false)
	}, [suppFromDailyLog])

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
		e.preventDefault()
		if (!supp) return
		if (!supp.supplementId) return
		if (!supp.supplementStackId) return
		if (!supp.size) return
		if (!supp.unit) return
		setIsTaken(!isTaken)
		if (isTaken && takenSupplement) {
			unLogSupplement({
				id: takenSupplement.id,
			})
		} else {
			logSupplement({
				suppId: supp.supplementId,
				date: date.toDateString(),
				time: time,
				amount: supp.size,
				unit: supp.unit,
				stackId: supp.supplementStackId.toString(),
			})
		}
	}

	const isPrivateAndUser =
		supp?.supplement?.isPrivate && supp?.supplement?.isUserCreated

	if (!supp) return null
	return (
		<div
			className={cn(
				' px-1 py-1 rounded-full border active:shadow-none active:inset-shadow-sm text-sm',
				isTaken ? 'inset-shadow-sm bg-backound' : 'bg-background shadow-md',
			)}
			key={supp.id}
			onClick={handleClick}
		>
			<div
				className={cn(
					'grid grid-cols-6 gap-2 items-center px-3 py-1.5 rounded-full border relative',
					isTaken ? 'bg-accent' : 'bg-card',
				)}
			>
				<div className='col-span-4 truncate'>{supp.supplement?.name}</div>
				<div className='place-self-end'>{supp.size}</div>
				<div className='place-self-start truncate'>{supp.unit}</div>
				{isTaken && takenSupplement ? (
					<div className='absolute -bottom-1 right-1/2 translate-x-1/2 opacity-80 text-[0.6rem]'>
						{`${new Date(takenSupplement.createdAt).getHours()}:${new Date(takenSupplement.createdAt).getMinutes()}`}
					</div>
				) : null}
				{isPrivateAndUser && (
					<LockIcon
						size={10}
						className='text-red-500 absolute right-2 top-1/2 -translate-y-1/2'
					/>
				)}
			</div>
		</div>
	)
}

const SuppTimes = ({
	user,
	time,
	date,
	todaysDailyLog,
}: {
	user: GetUserById
	time: string
	date: Date
	todaysDailyLog: GetDailyLogById | null | undefined
}) => {
	return (
		<Card className='w-full px-0 py-2 gap-2'>
			<CardHeader className='py-0'>
				<CardTitle className='capitalize'>{time}</CardTitle>
				<CardDescription>Supplements</CardDescription>
			</CardHeader>
			<CardContent className='px-4 py-0'>
				<div className={cn('flex flex-col gap-1')}>
					{user.supplementStacks
						.find((stack) => stack.time === time)
						?.supplements.map((supp) => {
							return (
								<Supp
									key={supp.id}
									user={user}
									supp={supp}
									time={time}
									date={date}
									todaysDailyLog={todaysDailyLog}
								/>
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
	const [day, setDay] = useState<Date>(new Date())

	const ctx = api.useUtils()

	const todaysDailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === day.toDateString(),
	)
	const { data: user } = api.user.get.useQuery(userId || '')
	const suppTimes = user?.supplementStacks
		.map((stack) => {
			return stack.time
		})
		.filter((item, pos, self) => self.indexOf(item) === pos)

	return (
		<div className='flex flex-col gap-0 w-full items-center'>
			<SheetStack.Root>
				<Sheet.Root license='non-commercial'>
					<div className='flex flex-col gap-0 items-center justify-start w-full'>
						<div className={cn('text-lg font-semibold opacity-0')}>0</div>
						<div
							className={cn(
								'rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center',
								'justify-center active:scale-75 transition-transform cursor-pointer',
							)}
						>
							<Sheet.Trigger
								onClick={(e) => {
									setDay(new Date())
								}}
							>
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
											<DateSelect today={day} setDay={setDay} />
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
											<div className='flex flex-col gap-2'>
												{suppTimes?.map((time) => {
													return time && user ? (
														<SuppTimes
															key={time}
															user={user}
															time={time}
															date={day}
															todaysDailyLog={todaysDailyLog}
														/>
													) : null
												})}
												{user && (
													<SuppUserCreate
														user={user}
														todaysDailyLog={todaysDailyLog}
													/>
												)}
											</div>
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
			</SheetStack.Root>
			<SuppBottomSheet dailyLogs={dailyLogs} />
		</div>
	)
}

export { SuppLog }
