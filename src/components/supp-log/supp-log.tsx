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
import { ChevronDown, LockIcon, XIcon } from 'lucide-react'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { DateSelect } from '@/components/date-select'

import { SuppBottomSheet } from './supp-bottom-sheet'
import { PillIcon } from '@phosphor-icons/react'

const formSchema = z.object({
	name: z.string().min(1, { message: 'name is required' }),
	serveSize: z.number().positive(),
	serveUnit: z.string().min(1, { message: 'unit is required' }),
	isPrivate: z.boolean(),
	viewableBy: z.string(),
	stackId: z.string().min(1, { message: 'time is required' }),
})

const SuppUserCreate = ({ user }: { user: GetUserById }) => {
	const [isOpen, setIsOpen] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			serveSize: 10,
			serveUnit: '',
			isPrivate: false,
			viewableBy: '',
			stackId: '',
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
			stackId: Number(data.stackId),
			userId: user.id,
		})
	}

	return (
		<div className='flex flex-col gap-0 items-center w-full'>
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
					<Sheet.View className='z-[1000] h-[100vh] bg-black/50'>
						<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[90vh] bg-background'>
							<div className='flex flex-col justify-between h-full'>
								<div className='flex flex-col'>
									<div className='flex justify-center pt-1'>
										<Sheet.Handle
											className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
											action='dismiss'
										/>
									</div>
									<div className='flex flex-col justify-center items-center'>
										{user.supplementStacks.length === 0 ? (
											<Sheet.Title className='px-6 mx-4 text-xl font-bold text-center rounded-lg border-4 mt-[2px] text-destructive border-destructive/50 bg-muted'>
												Get your trainer to create your a stack timing
											</Sheet.Title>
										) : (
											<Sheet.Title className='text-xl font-semibold mt-[2px]'>
												Supplement
											</Sheet.Title>
										)}
										<Sheet.Description className='hidden'>
											create a new supplement
										</Sheet.Description>
										<Form {...form}>
											<form onSubmit={form.handleSubmit(onSubmit)}>
												<div className='flex flex-col gap-4 px-8 w-full'>
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
																		className='justify-start w-full'
																		value={field.value}
																		onValueChange={(value) => {
																			field.onChange(value)
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
													<Button
														disabled={user.supplementStacks.length === 0}
														type='submit'
													>
														Save
													</Button>
												</div>
											</form>
										</Form>
									</div>
								</div>
								<Sheet.Trigger
									className='flex justify-center w-full'
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

const SuppUser = ({ user }: { user: GetUserById }) => {
	const [isOpen, setIsOpen] = useState(false)

	const ctx = api.useUtils()
	const { mutate: deleteSuppFromUser } =
		api.supplement.deleteFromUser.useMutation({
			onSuccess: () => {
				ctx.user.invalidate()
			},
		})

	return (
		<div className='flex flex-col gap-0 items-center w-full'>
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
						Your Supplements
					</div>
				</Sheet.Trigger>
				<Sheet.Portal>
					<Sheet.View className='z-[1000] h-[100vh] bg-black/50'>
						<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[90vh] bg-background'>
							<div className='flex flex-col justify-between h-full'>
								<div className='flex flex-col'>
									<div className='flex justify-center pt-1'>
										<Sheet.Handle
											className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
											action='dismiss'
										/>
									</div>
									<div className='flex flex-col justify-center items-center'>
										<Sheet.Title className='text-xl font-semibold mt-[2px]'>
											Your Supplement
										</Sheet.Title>
										<Sheet.Description className='hidden'>
											create a new supplement
										</Sheet.Description>
									</div>
								</div>
								<ScrollArea className='px-2 pt-4 h-[calc(95vh-130px)]'>
									<div className='flex flex-col'>
										{user.supplementStacks.map((stack) => {
											const time = stack.time
											return (
												<div key={stack.id}>
													<div
														className={cn(
															'text-base font-semibold',
															stack.supplements.filter(
																(supp) => supp.supplement?.isUserCreated,
															).length === 0 && 'hidden',
														)}
													>
														{time}
													</div>
													{stack.supplements.map((supp) => {
														if (!supp.supplement?.isUserCreated) return null
														return (
															<div
																key={supp.id}
																className='grid grid-cols-6 p-2 my-2 mx-2 rounded-full bg-secondary'
															>
																<div className='col-span-3 text-sm capitalize truncate'>
																	{supp.supplement?.name}
																</div>
																<div className='justify-self-end text-sm truncate'>
																	{supp.supplement?.serveSize}
																</div>
																<div className='pl-2 text-sm truncate'>
																	{supp.supplement?.serveUnit}
																</div>
																<XIcon
																	size={16}
																	strokeWidth={3}
																	className='justify-self-end text-red-500'
																	onClick={() => {
																		deleteSuppFromUser({
																			suppId: supp.supplementId,
																			suppStackId: stack.id,
																		})
																	}}
																/>
															</div>
														)
													})}
												</div>
											)
										})}
										<div className='h-12' />
										<SuppUserCreate user={user} />
									</div>
								</ScrollArea>
								<Sheet.Trigger
									className='flex justify-center w-full'
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
	supp,
	time,
	date,
	todaysDailyLog,
}: {
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
	})
	const { mutate: unLogSupplement } =
		api.supplement.unLogSupplement.useMutation({
			onSuccess: () => {
				ctx.dailyLog.invalidate()
			},
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
				suppName: supp.supplement?.name || '',
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
	const isUser = supp?.supplement?.isUserCreated

	if (!supp) return null
	return (
		<div
			className={cn(
				' px-1 py-1 rounded-full border active:shadow-none active:inset-shadow-sm text-sm',
				isTaken ? 'inset-shadow-sm bg-backound' : 'bg-background shadow-md',
				isUser ? 'bg-yellow-300/50' : '',
				isUser && isTaken ? 'bg-yellow-400/60' : '',
			)}
			key={supp.id}
			onMouseDown={handleClick}
		>
			<div
				className={cn(
					'grid grid-cols-6 gap-2 items-center px-3 py-1.5 rounded-full border relative',
					isTaken ? 'bg-accent' : 'bg-card',
				)}
			>
				<div className='col-span-4 capitalize truncate'>
					{supp.supplement?.name}
				</div>
				<div className='place-self-end'>{supp.size}</div>
				<div className='place-self-start truncate'>{supp.unit}</div>
				{isTaken && takenSupplement ? (
					<div className='absolute -bottom-1 right-1/2 opacity-80 translate-x-1/2 text-[0.6rem]'>
						{new Date(takenSupplement.createdAt).toLocaleTimeString('en-AU', {
							hour: '2-digit', // 'numeric', '2-digit'
							minute: '2-digit', // 'numeric', '2-digit'
							second: '2-digit', // 'numeric', '2-digit'
							hour12: true, // true for AM/PM, false for 24-hour
						})}
					</div>
				) : null}
				{isPrivateAndUser && (
					<LockIcon
						size={10}
						className='absolute right-2 top-1/2 text-red-500 -translate-y-1/2'
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
		<Card className='gap-2 py-2 px-0 w-full'>
			<CardHeader className='py-0'>
				<CardTitle className='capitalize'>{time}</CardTitle>
				<CardDescription>Supplements</CardDescription>
			</CardHeader>
			<CardContent className='py-0 px-4'>
				<div className={cn('flex flex-col gap-1')}>
					{user.supplementStacks
						.find((stack) => stack.time === time)
						?.supplements.map((supp) => {
							return (
								<Supp
									key={supp.id}
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

	const todaysDailyLog = dailyLogs?.find(
		(dailyLog) => dailyLog.date === day.toDateString(),
	)
	const { data: user } = api.user.getCurrentUser.useQuery({ id: userId || '' })
	const suppTimes = user?.supplementStacks
		.map((stack) => {
			return stack.time
		})
		.filter((item, pos, self) => self.indexOf(item) === pos)

	return (
		<div className='flex flex-col gap-0 items-center w-full'>
			<SheetStack.Root>
				<Sheet.Root license='non-commercial'>
					<div className='flex flex-col gap-0 justify-start items-center w-full'>
						<div className={cn('text-lg font-semibold opacity-0')}>0</div>
						<div
							className={cn(
								'rounded-full border w-11 h-11 flex items-center bg-background shadow-inner',
								'justify-center active:scale-75 transition-transform cursor-pointer',
							)}
						>
							<Sheet.Trigger
								onClick={() => {
									setDay(new Date())
								}}
							>
								<PillIcon
									size={28}
									className={cn(
										' hover:text-primary active:scale-90 transition-transform cursor-pointer',
									)}
								/>
							</Sheet.Trigger>
						</div>
					</div>
					<Sheet.Portal>
						<Sheet.View className='z-[999] h-[100vh] bg-black/50'>
							<Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[95vh] bg-background'>
								<div className='flex flex-col justify-between h-full'>
									<div className='flex flex-col'>
										<div className='flex justify-center pt-1'>
											<Sheet.Handle
												className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
												action='dismiss'
											/>
										</div>
										<div className='flex relative flex-col gap-0 pt-2 pb-2 font-medium border-b-[1px] border-primary'>
											<DateSelect today={day} setDay={setDay} />
											<div className='flex gap-6 justify-center items-center mt-1'>
												<Sheet.Title className='text-xl font-semibold mt-[2px]'>
													Supps
												</Sheet.Title>
												<Sheet.Description className='hidden'>
													Meal Log
												</Sheet.Description>
											</div>
										</div>
										<ScrollArea className='px-2 pt-4 h-[calc(95vh-130px)]'>
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
												{user && <SuppUser user={user} />}
											</div>
										</ScrollArea>
									</div>
									<Sheet.Trigger
										className='flex justify-center w-full'
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
