'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { RefreshCcw, } from 'lucide-react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

export default function AdminLogs() {
	const [isHideMe, setIsHideMe] = useState(false)
	const [filter, setFilter] = useState('')
  const [userFilter, setUserFilter] = useState('')
	const ctx = api.useUtils()
	const { data: logs } = api.user.getAdminLogs.useQuery(undefined, {
		refetchInterval: 1000 * 60 * 15,
	})



	return (
		<div className='flex flex-col gap-0 my-16 px-1 w-full tracking-tight md:tracking-normal '>
			<div className='flex items-center gap-8 w-full py-2'>
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
					className='w-48'
				/>
				<Input
					value={userFilter}
					onChange={(e) => {
						setUserFilter(e.target.value)
					}}
					placeholder='user filter'
					className='w-48'
				/>
				<RefreshCcw
					size={20}
					className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform'
					onClick={() => {
						ctx.user.invalidate()
					}}
				/>
			</div>
			{logs
				?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
				.filter((log) => {
					if (isHideMe) return log.user?.toLowerCase() !== 'david warner'
					return true
				})
				.filter((log) => log.task?.toLowerCase().includes(filter.toLowerCase()))
				.filter((log) => log.user?.toLowerCase().includes(userFilter.toLowerCase()))
				.map((log) => (
					<Collapsible key={log.id}>
						<CollapsibleTrigger asChild>
							<div
								className={cn(
									'grid grid-cols-9 gap-1 text-[0.7rem] md:text-xs max-w-screen-xl py-[2px] shrink-0 ',
									log.createdAt.getDate() % 2 === 0
										? 'bg-primary/10'
										: 'bg-primary/5',
								)}
							>
								<div className='md:col-span-1 col-span-2 truncate'>
									{log.createdAt.toLocaleString('en-AU', {
										hour: 'numeric',
										minute: 'numeric',
										hour12: false,
									})},{' '}
									{log.createdAt.toLocaleString('en-AU', {
										year: '2-digit',
										month: 'numeric',
										day: 'numeric',
									})}
								</div>
								<div className='col-span-2 md:col-span-1 truncate'>{log.user}</div>
								<div className='col-span-3 md:col-span-1 truncate'>{log.task}</div>
								<div className='truncate col-span-2 md:col-span-6'>{log.notes}</div>
							</div>
						</CollapsibleTrigger>
						<CollapsibleContent className='p-0 '>
							<div
								className={cn(
									'flex flex-col gap-1 text-[0.7rem] md:text-xs max-w-screen-xl py-[2px] shrink-0 pl-4 ',
                  'bg-blue-200'
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
								<div className='col-span-2 '>{log.user}</div>
								<div className='col-span-3 '>{log.task}</div>
								<div className=' col-span-2'>{log.notes}</div>
							</div>

            </CollapsibleContent>
					</Collapsible>
				))}
		</div>
	)
}
