'use client'

import { api } from '@/trpc/react'
import { PeriodIcon } from '@/components/period-icon'
import { OvulationIcon } from '@/components/ovulation-icon'
import { getPeriodStatusDays } from '@/lib/period'

import { useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import type { GetDailyLogById } from '@/types'
import { format } from 'date-fns'
import { useAtom } from 'jotai'
import {
	Bone,
	Bookmark,
	Calendar as CalendarIcon,
	Fish,
	Heart,
	Loader,
	Pencil,
	Plus,
	Star,
	ThumbsUp,
	Zap,
	XIcon,
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar-log'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { DailyLogForm } from './form'
import { BookmarksIcon } from '@phosphor-icons/react'

export const dynamic = 'force-dynamic'

const borderDict = {
	black: 'border-black',
	red: 'border-red-600',
	green: 'border-green-600',
	blue: 'border-blue-600',
	purple: 'border-purple-600',
	orange: 'border-orange-600',
}

const textDict = {
	black: 'text-black',
	red: 'text-red-600',
	green: 'text-green-600',
	blue: 'text-blue-600',
	purple: 'text-purple-600',
	orange: 'text-orange-600',
}

const bgDict = {
	black: 'bg-black',
	red: 'bg-red-600',
	green: 'bg-green-600',
	blue: 'bg-blue-600',
	purple: 'bg-purple-600',
	orange: 'bg-orange-600',
}

const Icon = ({
	icon,
	classnames,
	size = 16,
}: {
	icon: string
	classnames?: string
	size?: number
}) => {
	switch (icon) {
		case 'bone':
			return <Bone size={size} className={classnames} fill='currentColor' />
		case 'fish':
			return <Fish size={size} className={classnames} fill='currentColor' />
		case 'zap':
			return <Zap size={size} className={classnames} fill='currentColor' />
		case 'pencil':
			return <Pencil size={size} className={classnames} fill='currentColor' />
		case 'thumb-up':
			return <ThumbsUp size={size} className={classnames} fill='currentColor' />
		case 'heart':
			return <Heart size={size} className={classnames} fill='currentColor' />
		default:
			return null
	}
}

const Tags = ({ log }: { log: GetDailyLogById }) => {
	const ctx = api.useUtils()
	const { data: tags } = api.tag.getAllTagsCurrentUser.useQuery()

	const { mutate: deleteTag } = api.tag.delete.useMutation({
		onSettled: () => {
			ctx.tag.invalidate()
		},
	})

	const { mutate: updateTagToDailyLog } =
		api.tag.updateTagToDailyLog.useMutation({
			onMutate: async (_data) => {
				await ctx.dailyLog.getAllCurrentUser.cancel()
				const previousLog = ctx.dailyLog.getAllCurrentUser.getData()
				if (!previousLog) return
				ctx.dailyLog.getAllCurrentUser.setData(undefined, [
					...previousLog.map((log) => {
						return {
							...log,
						}
					}),
				])
				return { previousLog }
			},
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	const { mutate: createTag } = api.tag.create.useMutation({
		onMutate: async () => {
			setIsSaving(true)
		},
		onSettled: () => {
			setIsSaving(false)
			setIsOpen(false)
			setTagName('')
			setTagColor('black')
			setTagIcon('fish')
			ctx.tag.invalidate()
		},
		onError: () => {
			toast.error('error')
		},
	})

	const [tagName, setTagName] = useState('')
	const [tagColor, setTagColor] = useState('black')
	const [tagIcon, setTagIcon] = useState('fish')
	const [isOpen, setIsOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)

	const handleSubmit = () => {
		if (tagName === '') return
		createTag({
			name: tagName.slice(0, 1).toUpperCase() + tagName.slice(1),
			color: tagColor,
			icon: tagIcon,
		})
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className='flex justify-center items-center w-8 h-8 rounded-full border bg-background'>
					<BookmarksIcon
						size={20}
						strokeWidth={1.5}
						className='cursor-pointer'
					/>
				</div>
			</DialogTrigger>
			<DialogContent
				onOpenAutoFocus={(e) => e.preventDefault()}
				className='top-36 px-2 translate-y-0 min-h-[300px]'
			>
				<DialogHeader>
					<DialogTitle>Tags</DialogTitle>
					<DialogDescription>Add tags to your daily log</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col gap-2 items-center'>
					{tags?.map((tag) => {
						const color = tag.color as
							| 'black'
							| 'red'
							| 'green'
							| 'blue'
							| 'purple'
							| 'orange'
						const icon = tag.icon

						const isTagged = log?.tags?.find((t) => t.tagId === tag.id)

						return (
							<div
								key={tag.id}
								className='grid grid-cols-5 justify-items-center w-full'
							>
								<div
									className={cn(
										'text-sm w-40 h-8 rounded-md flex items-center justify-center gap-2 cursor-pointer border relative  active:scale-90 transition-transform col-span-3',
										isTagged ? 'border-0 text-white' : borderDict[color],
										isTagged ? bgDict[color] : '',
									)}
									onClick={() => {
										if (!log) return
										updateTagToDailyLog({
											tagId: tag.id,
											dailyLogId: log.id,
										})
									}}
								>
									<Icon
										icon={icon}
										classnames={isTagged ? 'text-white' : textDict[color]}
									/>

									<div className='mt-[2px]'>{tag.name}</div>
									<Plus
										size={16}
										className={cn(
											'absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer text-primary',
											isTagged ? textDict[color] : '',
										)}
									/>
								</div>
								<div className='col-span-2'>
									<Collapsible>
										<CollapsibleTrigger asChild>
											<div className='flex justify-center'>
												<Button
													variant='ghost'
													size='sm'
													className='hover:bg-muted/00'
												>
													Delete
												</Button>
											</div>
										</CollapsibleTrigger>
										<CollapsibleContent className='text-xs'>
											<div className='text-center'>
												If you delete this tag, it will be removed from all your
												logs.
											</div>
											<div className='flex gap-2 items-center'>
												<Button
													size='sm'
													variant='destructive'
													className='h-6 transition-transform active:scale-90'
													onClick={() => {
														if (!log) return
														deleteTag(tag.id)
													}}
												>
													Confirm
												</Button>
												<Button
													size='sm'
													variant='ghost'
													className='hover:bg-muted/00'
													onClick={() => {}}
												>
													Cancel
												</Button>
											</div>
										</CollapsibleContent>
									</Collapsible>
								</div>
							</div>
						)
					})}
				</div>
				<Collapsible open={isOpen} onOpenChange={setIsOpen}>
					<div
						className={cn(
							'flex justify-center w-full',
							isOpen ? '' : 'h-full items-end',
						)}
					>
						<CollapsibleTrigger asChild>
							<Button
								variant='default'
								size='sm'
								className='flex gap-2 justify-center items-center transition-transform active:scale-90'
							>
								<Plus size={16} />
								<span className='text-sm mt-[2px]'>Create Tag</span>
							</Button>
						</CollapsibleTrigger>
					</div>
					<CollapsibleContent>
						<div className='flex flex-col gap-4 mt-4 w-full'>
							<div className='grid grid-cols-4 gap-2 items-center w-full'>
								<Label>Name</Label>
								<Input
									placeholder='Tag Name'
									className='col-span-3 capitalize'
									value={tagName}
									onChange={(e) => {
										setTagName(e.target.value)
									}}
								/>
							</div>
							<div className='grid grid-cols-4 gap-2 items-center w-full'>
								<Label>Colour</Label>
								<ToggleGroup
									type='single'
									variant='border'
									className='flex col-span-3 gap-2'
									value={tagColor}
									onValueChange={(value) => {
										setTagColor(value)
									}}
								>
									<ToggleGroupItem value='black' className='bg-black' />
									<ToggleGroupItem value='red' className='bg-red-600' />
									<ToggleGroupItem value='green' className='bg-green-600' />
									<ToggleGroupItem value='blue' className='bg-blue-600' />
									<ToggleGroupItem value='purple' className='bg-purple-600' />
									<ToggleGroupItem value='orange' className='bg-orange-600' />
								</ToggleGroup>
							</div>
							<div className='grid grid-cols-4 gap-2 items-center w-full'>
								<Label>Icon</Label>
								<ToggleGroup
									type='single'
									className={cn(
										'col-span-3 flex gap-1 flex-wrap text-primary',
										tagColor === 'red' && 'text-red-500',
										tagColor === 'green' && 'text-green-500',
										tagColor === 'blue' && 'text-blue-500',
										tagColor === 'purple' && 'text-purple-500',
										tagColor === 'orange' && 'text-orange-500',
									)}
									variant='border'
									value={tagIcon}
									onValueChange={(value) => {
										setTagIcon(value)
									}}
								>
									<ToggleGroupItem className='px-0' value='bone'>
										<Bone fill='currentColor' className='w-12 h-12' />
									</ToggleGroupItem>
									<ToggleGroupItem value='fish'>
										<Fish fill='currentColor' size={20} />
									</ToggleGroupItem>
									<ToggleGroupItem value='zap'>
										<Zap fill='currentColor' size={20} />
									</ToggleGroupItem>
									<ToggleGroupItem value='pencil'>
										<Pencil fill='currentColor' size={20} />
									</ToggleGroupItem>
									<ToggleGroupItem value='thumb-up'>
										<ThumbsUp fill='currentColor' size={20} />
									</ToggleGroupItem>
									<ToggleGroupItem value='heart'>
										<Heart fill='currentColor' size={20} />
									</ToggleGroupItem>
								</ToggleGroup>
							</div>
							<div className='flex justify-center w-full'>
								<Button
									variant='default'
									className='relative w-40 transition-transform active:scale-90'
									disabled={isSaving || tagName === ''}
									onClick={handleSubmit}
								>
									Save
									{isSaving ? (
										<div className='absolute right-4 top-1/2 -translate-y-1/2'>
											<Loader size={16} className='animate-spin' />
										</div>
									) : null}
								</Button>
							</div>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</DialogContent>
		</Dialog>
	)
}

export default function Home() {
	const ctx = api.useUtils()
	const searchParams = useSearchParams()
	// const id = searchParams.get('id')
	const [date, setDate] = useState<Date | undefined>(
		() => new Date(Number(searchParams.get('date'))),
	)
	const [isOpen, setIsOpen] = useState(false)
	const [isCreatingLog, setIsCreatingLog] = useState(false)
	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)

	const { data: dailyLogs, isLoading } =
		api.dailyLog.getAllCurrentUser.useQuery({ id: impersonatedUser.id })

	const { data: currentUser } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})

	const { mutate: createDailyLog } = api.dailyLog.create.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
			setTimeout(() => {
				setIsCreatingLog(false)
			}, 200)
		},
		onError: () => {
			toast.error('error conflict')
		},
	})

	const { mutate: updateTagToDailyLog } =
		api.tag.updateTagToDailyLog.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	const { mutate: updateIsStarred } = api.dailyLog.updateIsStarred.useMutation({
		onMutate: async (data) => {
			await ctx.dailyLog.getAllCurrentUser.cancel()
			const previousLog = ctx.dailyLog.getAllCurrentUser.getData()
			if (!previousLog) return
			ctx.dailyLog.getAllCurrentUser.setData(undefined, [
				...previousLog.map((log) => {
					if (log.date === data.date) {
						return {
							...log,
							isStarred: data.isStarred,
						}
					}
					return log
				}),
			])
			return { previousLog }
		},
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
		onError: (_err, _newPoopLog, context) => {
			toast.error('error')
			ctx.dailyLog.getAllCurrentUser.setData(undefined, context?.previousLog)
		},
	})

	const { mutate: updateIsPeriod } = api.dailyLog.updateIsPeriod.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})
	const { mutate: updateIsOvulation } =
		api.dailyLog.updateIsOvulation.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	const log = dailyLogs?.find((log) => log.date === date?.toDateString())

	useEffect(() => {
		if (isLoading) return
		if (isCreatingLog) return
		if (!currentUser) return
		if (!date) return
		if (!log) {
			setIsCreatingLog(true)
			try {
				setTimeout(() => {
					createDailyLog({
						date: new Date(date).toDateString(),
						userId: currentUser.id,
					})
				}, 50)
			} catch (err) {
				// toast.error('error', err.message)
			}
		}
	}, [dailyLogs, currentUser, date])

	const prevLog = dailyLogs?.find((log) => {
		if (!date) return false
		return log.date === new Date(date?.getTime() - 86400000).toDateString()
	})

	if (!currentUser) return null

	const isPeriodEnabled = currentUser?.settings?.isPeriodOvulaion ?? false

	const isPeriod = log?.isPeriod ?? false
	const isOvulation = log?.isOvulation ?? false

	const ovulaionStartAt = currentUser.settings?.ovulaionStartAt ?? new Date()
	const start = currentUser.settings?.periodStartAt ?? new Date()
	const interval = currentUser.settings?.periodInterval ?? 28
	const duration = currentUser.settings?.periodLength ?? 5
	const today = new Date(date ?? Date.now())

	const periodStatus = getPeriodStatusDays(today, start, interval, duration)
	const ovulationStatus = getPeriodStatusDays(
		today,
		ovulaionStartAt,
		interval,
		1,
	)

	if (!date) return null

	return (
		<>
			hi
			<div className='flex relative flex-col gap-1 mt-16 transition-transform px-[2px]'>
				{impersonatedUser.id !== '' ? (
					<div className='fixed bottom-14 left-1/2 opacity-80 -translate-x-1/2 z-[2009]'>
						<Badge className='flex gap-4'>
							{impersonatedUser.name}
							<XIcon
								size={12}
								className='cursor-pointer'
								onClick={() => {
									setImpersonatedUser({
										id: '',
										name: '',
									})
								}}
							/>
						</Badge>
					</div>
				) : null}
				<div className='flex gap-2 justify-around items-center py-2 w-full text-xl font-semibold text-center rounded-md border bg-card'>
					<Tags log={log} />
					<Popover open={isOpen} onOpenChange={setIsOpen}>
						<PopoverTrigger asChild>
							<div className='flex justify-center items-center'>
								<Button
									variant={'outline'}
									size={'sm'}
									className={cn(
										'w-[240px] font-semibold text-base mt-[2px] flex items-center justify-center shadow-sm',
										!date && 'text-muted-foreground',
									)}
								>
									<CalendarIcon className='mr-4 w-4 h-4 mt-[0px]' />
									{date ? (
										<span className='mt-[5px]'>{format(date, 'PPP')}</span>
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</div>
						</PopoverTrigger>
						<PopoverContent className='p-0 w-full'>
							<Calendar
								mode='single'
								selected={date}
								disabled={{ after: new Date() }}
								// @ts-ignore
								onSelect={(date) => {
									setDate(date)
									setIsOpen(false)
								}}
								initialFocus
								className='w-full'
								formatters={{
									// @ts-ignore
									formatDay: (date) => {
										const log = dailyLogs?.find(
											(log) => log.date === date.toDateString(),
										)
										const tags = log?.tags?.map((tag) => {
											return {
												id: tag.id,
												name: tag.tag.name,
												color: tag.tag.color,
												icon: tag.tag.icon,
											}
										})
										return (
											<div className='flex flex-col gap-[2px] h-[14vw] w-[12.5vw]'>
												{log ? (
													<div className='flex justify-center items-center w-full h-4'>
														<div className='rounded-full bg-secondary-foreground h-[6px] w-[6px]' />
													</div>
												) : (
													<div className='h-4' />
												)}
												<div className=''>{date.getDate()}</div>

												<div className='flex gap-1 justify-center items-center h-[12px]'>
													{log?.isStarred === true ? (
														<Star
															className='text-yellow-500'
															fill='currentColor'
															size={10}
														/>
													) : null}
													{tags?.map((tag) => {
														const color = tag.color as
															| 'black'
															| 'red'
															| 'green'
															| 'blue'
															| 'purple'
															| 'orange'
														const icon = tag.icon
														return (
															<Icon
																key={tag.id}
																icon={icon}
																size={10}
																classnames={textDict[color]}
															/>
														)
													})}
												</div>
											</div>
										)
									},
								}}
								components={{
									// @ts-ignore
									DayContent: (props) => {
										const log = dailyLogs?.find(
											(log) => log.date === props.date.toDateString(),
										)
										const tags = log?.tags?.map((tag) => {
											return {
												id: tag.id,
												name: tag.tag.name,
												color: tag.tag.color,
												icon: tag.tag.icon,
											}
										})
										return (
											<div className='flex flex-col gap-[2px]'>
												{log ? (
													<div className='flex justify-center items-center w-full'>
														<div className='rounded-full bg-secondary-foreground h-[6px] w-[6px]' />
													</div>
												) : null}
												<div className=''>{props.date.getDate()}</div>

												<div className='flex gap-1 justify-center items-center h-[12px]'>
													{log?.isStarred === true ? (
														<Star
															className='text-yellow-500'
															fill='currentColor'
															size={10}
														/>
													) : null}
													{tags?.map((tag) => {
														const color = tag.color as
															| 'black'
															| 'red'
															| 'green'
															| 'blue'
															| 'purple'
															| 'orange'
														const icon = tag.icon
														return (
															<Icon
																key={tag.id}
																icon={icon}
																size={10}
																classnames={textDict[color]}
															/>
														)
													})}
												</div>
											</div>
										)
									},
								}}
							/>
						</PopoverContent>
					</Popover>
					<div className='flex justify-center items-center w-8 h-8 rounded-full border bg-background'>
						<Star
							size={20}
							className={cn(
								'cursor-pointer active:scale-75 transition-transform',
								log?.isStarred === true ? 'text-yellow-500' : 'text-primary',
							)}
							fill={log?.isStarred === true ? 'currentColor' : 'none'}
							strokeWidth={1.5}
							onClick={() => {
								updateIsStarred({
									date: date.toDateString(),
									isStarred: log?.isStarred === true ? false : true,
								})
							}}
						/>
					</div>
				</div>
				<div
					className={cn(
						'flex justify-between items-center py-1 px-1 w-full rounded-lg border bg-card',
						!isPeriodEnabled && log?.tags.length === 0 ? 'hidden' : '',
					)}
				>
					<div>
						<div
							onClick={() => {
								if (!log) return
								updateIsPeriod({
									date: log.date,
									isPeriod: !isPeriod,
								})
							}}
							className={cn(
								'text-muted-foreground/10 flex gap-0 items-center justify-center h-8 w-8 rounded-full bg-background border shadow-inner',
								isPeriodEnabled ? '' : 'hidden',
								isPeriod ? 'border-[#E11D48]' : '',
							)}
						>
							<PeriodIcon
								color={isPeriod ? '#E11D48' : '#88888855'}
								size={36}
							/>
							<p
								className={cn(
									'mt-1 text-[0.7rem] hidden ml-2',
									periodStatus === -1 ? 'block text-muted-foreground' : '',
									isPeriod ? 'hidden' : '',
								)}
							>
								tomorrow
							</p>
						</div>
					</div>
					<div className='flex gap-2 items-center'>
						{log?.tags?.map((tag) => {
							const color = tag.tag.color as
								| 'black'
								| 'red'
								| 'green'
								| 'blue'
								| 'purple'
								| 'orange'
							const icon = tag.tag.icon
							console.log(tag)
							return (
								<div
									key={tag.id}
									className={cn(
										'flex items-center justify-center h-8 w-8 rounded-lg bg-background border shadow-inner',
									)}
									onClick={() => {
										if (!log) return
										updateTagToDailyLog({
											tagId: tag.tag.id,
											dailyLogId: log.id,
										})
									}}
								>
									<Icon
										icon={icon}
										classnames={cn(textDict[color])}
										size={16}
									/>
								</div>
							)
						})}
					</div>
					<div>
						<div
							onClick={() => {
								if (!log) return
								updateIsOvulation({
									date: log.date,
									isOvulation: !isOvulation,
								})
							}}
							className={cn(
								'text-muted-foreground/10 flex gap-0 items-center justify-center h-8 w-8 rounded-full bg-background border shadow-inner',
								isPeriodEnabled ? '' : 'hidden',
								isOvulation ? 'border-[#8B5CF6]' : '',
							)}
						>
							<OvulationIcon
								color={isOvulation ? '#8B5CF6' : '#88888855'}
								size={26}
							/>
							<p
								className={cn(
									'mt-1 text-[0.7rem] hidden ml-2',
									ovulationStatus === -1 ? 'block text-muted-foreground' : '',
									isPeriod ? 'hidden' : '',
								)}
							>
								tomorrow
							</p>
						</div>
					</div>
				</div>
				<DailyLogForm
					todaysLog={log}
					prevLog={prevLog}
					currentUser={currentUser}
					date={date.toDateString()}
				/>
			</div>
		</>
	)
}
