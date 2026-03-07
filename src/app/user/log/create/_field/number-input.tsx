'use client'
import { useEffect, useState } from 'react'

import { Minus, PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

const NumberInput = ({
	value,
	setValue,
	fixed = 0,
	scale,
	postfix = '',
	isWide = false,
}: {
	value: number | null
	setValue: (value: number | null) => void
	fixed?: number
	scale: number
	postfix?: string
	isWide?: boolean
}) => {
	const formatValue = (nextValue: number | null) => {
		if (nextValue === null) return ''

		return nextValue % 1 === 0
			? nextValue.toString()
			: nextValue.toFixed(fixed)
	}

	const [inputValue, setInputValue] = useState(() => formatValue(value))

	useEffect(() => {
		setInputValue(formatValue(value))
	}, [fixed, value])

	return (
		<div className='flex relative items-center w-60 h-16 rounded-lg border'>
			<Input
				placeholder=''
				className={cn(
					'relative w-full text-xl font-medium rounded-lg text-center',
					' h-min border-none focus-visible:ring-0 focus:border-none shadow-none py-0 active:border-none',
					isWide ? '-ml-4' : '',
				)}
				type='number'
				value={inputValue}
				onChange={(e) => {
					const nextValue = e.target.value
					setInputValue(nextValue)

					if (nextValue === '') return

					setValue(Number(nextValue))
				}}
			/>

			<div className='flex absolute right-16 top-1/2 gap-0 items-start text-xs -translate-y-1/2 text-muted-foreground pt-[2px]'>
				{postfix}
			</div>

			<div
				onClick={() => {
					if (inputValue === '' || value === null) {
						const nextValue = Number(scale.toFixed(fixed))
						setValue(nextValue)
						setInputValue(formatValue(nextValue))
						return
					}

					const nextValue = Number((value + scale).toFixed(fixed))
					setValue(nextValue)
					setInputValue(formatValue(nextValue))
				}}
				className='flex absolute right-0 top-1/2 gap-0 items-start text-xs rounded-r-lg border-l -translate-y-1/2 text-secondary-foreground active:bg-primary/60'
			>
				<div className='flex justify-center items-center w-14 h-16 scale-75'>
					<PlusIcon size={24} />
				</div>
			</div>
			<div
				onClick={() => {
					if (inputValue === '' || value === null) return

					const nextValue = Number((value - scale).toFixed(fixed))
					setValue(nextValue)
					setInputValue(formatValue(nextValue))
				}}
				className='flex absolute left-0 top-1/2 gap-0 items-start text-xs rounded-l-lg border-r -translate-y-1/2 text-secondary-foreground active:bg-primary/30'
			>
				<div className='flex justify-center items-center w-14 h-16 active:scale-75'>
					<Minus size={24} />
				</div>
			</div>
		</div>
	)
}

export { NumberInput }
