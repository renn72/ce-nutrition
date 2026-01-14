'use client'

import { api } from '@/trpc/react'

import { useRef, useState } from 'react'

import { cn } from '@/lib/utils'
import { useVirtualizer } from '@tanstack/react-virtual'
import { RefreshCcw, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from '@/components/ui/popover'
export default function AdminLogs() {
	const [isHideMe, setIsHideMe] = useState(false)
	const [filter, setFilter] = useState('')
	const [userFilter, setUserFilter] = useState('')
	const ctx = api.useUtils()
	const { data: logs } = api.user.getAdminLogs.useQuery(undefined, {
		refetchInterval: 1000 * 60 * 1,
	})
	const { mutate: deleteAllLogs } = api.user.deleteAllAdminLogs.useMutation({
		onSuccess: () => {
			ctx.user.invalidate()
		},
	})

	const parentRef = useRef(null)

	const virtualizer = useVirtualizer({
		count: 4000,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 20,
		overscan: 100,
	})

	if (!logs) return null

	const l = logs.filter(
		(log) => log.createdAt.toDateString() === new Date().toDateString(),
	)

	const u = l.filter((log, index, arr) => {
		return arr.findIndex((t) => t.user === log.user) === index
	})

	const logYesterday = logs.filter(
		(log) =>
			log.createdAt.toDateString() ===
			new Date(new Date().setDate(new Date().getDate() - 1)).toDateString(),
	)
	const uYesterday = logYesterday.filter((log, index, arr) => {
		return arr.findIndex((t) => t.user === log.user) === index
	})

	const sortedFilterLogs = logs
		?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.filter((log) => {
			if (isHideMe) return log.user?.toLowerCase() !== 'david warner'
			return true
		})
		.filter((log) => log.task?.toLowerCase().includes(filter.toLowerCase()))
		.filter((log) => log.user?.toLowerCase().includes(userFilter.toLowerCase()))

	return (
		<div className='flex flex-col gap-0 px-1 my-16 w-full tracking-tight md:tracking-normal lg:my-0'>
			<div className='flex gap-2 justify-between items-center py-2 w-full lg:gap-8 lg:justify-start'>
				<Switch
					checked={isHideMe}
					onCheckedChange={(checked) => {
						setIsHideMe(checked)
					}}
				/>
				<Input
					value={filter}
					onChange={(e) => {
						setFilter(e.target.value)
					}}
					placeholder='filter'
					className='w-full h-8 lg:w-48 lg:h-10'
				/>
				<Input
					value={userFilter}
					onChange={(e) => {
						setUserFilter(e.target.value)
					}}
					placeholder='user filter'
					className='w-full h-8 lg:w-48 lg:h-10'
				/>
				<RefreshCcw
					size={20}
					className='transition-transform cursor-pointer active:scale-90 text-primary/50 shrink-0 hover:text-primary'
					onClick={() => {
						ctx.user.invalidate()
					}}
				/>
				<Button variant='destructive' onClick={() => deleteAllLogs()}>
					Delete all
				</Button>
			</div>
			<div className='flex gap-8 items-center py-0 w-full text-sm lg:w-min'>
				<div className='flex gap-0 items-center py-0 w-full text-sm'>
					<div className='mr-4'>Today</div>
					<div>{l.length}</div>
					<div>/</div>
					<div>{u.length}</div>
				</div>
				<div className='flex gap-0 items-center py-0 w-full text-sm'>
					<div className='mr-4'>Yesterday</div>
					<div>{logYesterday.length}</div>
					<div>/</div>
					<div>{uYesterday.length}</div>
				</div>
			</div>
			<div
				ref={parentRef}
				className='overflow-y-auto h-[calc(100vh-190px)] lg:h-[calc(100vh-80px)]'
			>
				<div
					className={cn(
						'flex flex-col gap-0',
						`h-[${virtualizer.getTotalSize()}px]`,
						'w-full relative z-0',
					)}
				>
					{virtualizer.getVirtualItems().map((virtualItem) => {
						const log = sortedFilterLogs[virtualItem.index]
						if (!log) return null
						return (
							<div
								key={virtualItem.key}
								className={cn('absolute top-0 left-0 w-full z-20')}
								style={{
									height: `${virtualItem.size}px`,
									transform: `translateY(${virtualItem.start}px)`,
								}}
							>
								<Popover>
									<PopoverTrigger asChild>
										<div
											className={cn(
												'grid grid-cols-9 gap-1 text-[0.7rem] md:text-xs max-w-screen-xl py-[2px] shrink-0 h-[20px] ',
												log.createdAt.getDate() % 2 === 0
													? 'bg-primary/10'
													: 'bg-primary/5',
											)}
										>
											<div className='col-span-2 md:col-span-1 truncate'>
												{log.createdAt.toLocaleString('en-AU', {
													hour: 'numeric',
													minute: 'numeric',
													hour12: false,
												})}
												,{' '}
												{log.createdAt.toLocaleString('en-AU', {
													year: '2-digit',
													month: 'numeric',
													day: 'numeric',
												})}
											</div>
											<div className='col-span-2 md:col-span-1 truncate'>
												{log.user}
											</div>
											<div className='col-span-3 md:col-span-1 truncate'>
												{log.task}
											</div>
											<div className='col-span-2 md:col-span-6 truncate'>
												{log.notes}
											</div>
										</div>
									</PopoverTrigger>
									<PopoverContent className='relative py-0 px-0 w-full max-w-[90vw]'>
										<PopoverClose className='absolute top-1 right-1 z-10 py-1 px-1 transition-transform active:scale-90 text-primary/50 hover:text-primary'>
											<XIcon size={12} />
										</PopoverClose>
										<div
											className={cn(
												'flex flex-col gap-1 text-[0.7rem] md:text-xs shrink-0 px-4 py-6 z-[1000] ',
												'bg-blue-200',
											)}
										>
											<div className='col-span-2 shrink-0'>
												{log.createdAt.toLocaleString('en-AU', {
													year: 'numeric',
													month: 'numeric',
													day: 'numeric',
													hour: 'numeric',
													minute: 'numeric',
													hour12: false,
												})}
											</div>
											<div className='col-span-2'>{log.user}</div>
											<div className='col-span-3'>{log.task}</div>
											<div className='col-span-2'>{log.notes}</div>
										</div>
									</PopoverContent>
								</Popover>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
