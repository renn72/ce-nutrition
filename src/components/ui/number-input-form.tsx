'use client'

import { cn } from '@/lib/utils'
import { Minus, PlusIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

const NumberInputForm = ({
	value,
	setValue,
	fixed = 0,
	scale,
	bigScale = 10,
	placeholder = '',
	isBig = false,
  postfix = '',
}: {
	value: string | null
	setValue: (value: string) => void
	fixed?: number
	scale: number
	bigScale?: number
	placeholder?: string
	isBig?: boolean
  postfix?: string
}) => {
	return (
		<div
			className={cn(
				'h-10 w-52 relative border rounded-lg flex items-center shadow-sm',
				isBig ? 'h-16 w-76' : '',
			)}
		>
			<Input
				placeholder={placeholder}
				className={cn(
					'relative w-full text-sm font-medium rounded-lg text-center h-min border-none',
					' focus-visible:ring-0 focus:border-none shadow-none py-0 active:border-none',
            isBig ? 'text-2xl' : '',
				)}
				type='number'
				value={
					value && Number(value) % 1 === 0
						? value
						: (Number(value)?.toFixed(fixed) ?? '')
				}
				onChange={(e) => {
					setValue(e.target.value)
				}}
			/>
      {
        postfix !== '' ? (
          <div className='absolute right-28 top-1/2 -translate-y-1/2 text-xs text-muted-foreground flex gap-0 items-start pt-[2px]'>
            {postfix}
          </div>
        ) : null
      }
			<div
				onClick={() => {
					if (!value) {
						setValue(scale.toFixed(fixed))
						return
					}
					setValue((Number(value) + scale).toFixed(fixed))
				}}
				className={cn('absolute right-8 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-l active:bg-primary/60 rounded-r-lg',
          isBig ? 'right-12' : '',
        )}
			>
				<div
					className={cn(
						'flex items-center justify-center active:scale-75',
						'w-12 h-10',
						isBig ? 'h-16' : '',
					)}
				>
					<PlusIcon size={isBig ? 16 : 12} strokeWidth={3} />
				</div>
			</div>
			<div
				onClick={() => {
					if (!value) {
						setValue(bigScale.toFixed(fixed))
						return
					}
					setValue((Number(value) + bigScale).toFixed(fixed))
				}}
				className='absolute right-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-l active:bg-primary/60 rounded-r-lg'
			>
				<div
					className={cn(
						'flex items-center justify-center active:scale-75',
						'w-8 h-10',
						isBig ? 'h-16 w-12' : '',
					)}
				>
					<PlusIcon size={isBig ? 28 : 20} strokeWidth={3} />
				</div>
			</div>
			<div
				onClick={() => {
					if (!value) return
					setValue((Number(value) - bigScale).toFixed(fixed))
				}}
				className='absolute left-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-r active:bg-primary/30 rounded-l-lg'
			>
				<div
					className={cn(
						'flex items-center justify-center active:scale-75',
						'w-8 h-10',
						isBig ? 'h-16 w-12' : '',
					)}
				>
					<Minus size={isBig ? 28 : 20} strokeWidth={3} />
				</div>
			</div>
			<div
				onClick={() => {
					if (!value) return
					setValue((Number(value) - scale).toFixed(fixed))
				}}
				className={cn('absolute left-8 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-r active:bg-primary/30 rounded-l-lg',
          isBig ? 'left-12' : '',
        )}
			>
				<div
					className={cn(
						'flex items-center justify-center active:scale-75',
						'w-8 h-10',
						isBig ? 'h-16 w-12' : '',
					)}
				>
					<Minus size={isBig ? 16 : 12} />
				</div>
			</div>
		</div>
	)
}

export { NumberInputForm }
