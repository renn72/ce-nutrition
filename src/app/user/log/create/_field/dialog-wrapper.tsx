'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

const DialogWrapper = ({
	children,
	title,
	value,
	prevValue,
	isWidthFull = false,
	fixed: accuracy = 1,
	isString = false,
	postfix = '',
	icon: Icon,
}: {
	children: React.ReactNode
	title: string
	value: string
	prevValue: string
	isWidthFull?: boolean
	fixed?: number
	isString?: boolean
	postfix?: string
	icon?: React.ElementType
}) => {
	const change = Number(prevValue) - Number(value)
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div
					className={cn(
						'flex items-center gap-2 py-2 px-1 rounded-lg bg-muted/40 border border-primary/15 hover:bg-primary/5 w-full',
						isWidthFull ? 'col-span-2' : 'col-span-1',
					)}
				>
					{Icon && (
						<div className='p-2 rounded-full border shadow-sm bg-background text-primary'>
							<Icon size={16} />
						</div>
					)}
					<div className='flex overflow-hidden flex-col w-full'>
						<span className='font-semibold tracking-wider uppercase text-[10px] text-muted-foreground'>
							{title}
						</span>
						<div className='flex gap-2 justify-between items-baseline w-full'>
							<span
								className={cn(
									'text-sm font-bold truncate',
									value == 0 || value === undefined || value === null
										? 'text-muted-foreground/70'
										: '',
								)}
							>
								{value === undefined || value === null || value === ''
									? '...'
									: value}
								{postfix && !!value && (
									<span className='ml-0.5 text-xs font-normal'>{postfix}</span>
								)}
							</span>
							{change ? (
								<span className='flex items-baseline font-semibold tracking-wider leading-none uppercase text-[10px] text-muted-foreground'>
									{change === 0 ? null : change < 0 ? (
										<ArrowDown
											size={11}
											strokeWidth={1.5}
											className='pt-[2px]'
										/>
									) : (
										<ArrowUp size={11} strokeWidth={1.5} className='pt-[2px]' />
									)}
									{change.toFixed(accuracy)}
								</span>
							) : null}
						</div>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent
				className='top-20 py-8 rounded-xl translate-y-0'
				onOpenAutoFocus={(e) => {
					e.preventDefault()
				}}
			>
				{children}
			</DialogContent>
		</Dialog>
	)
}

export { DialogWrapper }
