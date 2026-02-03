'use client'

import { forwardRef, useMemo, useState } from 'react'

import { useForwardedRef } from '@/lib/use-forwarded-ref'
import { cn } from '@/lib/utils'
import { HexColorPicker } from 'react-colorful'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

interface ColorPickerProps {
	value: string
	onChange: React.Dispatch<React.SetStateAction<string>>
	onBlur?: () => void
}

const ColorPicker = forwardRef<
	HTMLInputElement,
	Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(
	(
		{ disabled, value, onChange, onBlur, name, className, size, ...props },
		forwardedRef,
	) => {
		const ref = useForwardedRef(forwardedRef)
		const [open, setOpen] = useState(false)

		const parsedValue = useMemo(() => {
			return value || '#FFFFFF'
		}, [value])

		return (
			<Popover onOpenChange={setOpen} open={open}>
				<PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
					<Button
						{...props}
						name={name}
						onClick={() => {
							setOpen(true)
						}}
						size={size}
						style={{
							backgroundColor: parsedValue,
						}}
						variant='ghost'
						className=' hover:ring hover:bg-primary/00 w-10 p-0'
					>
						<div />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-full'>
					<HexColorPicker color={parsedValue} onChange={onChange} />
					<Input
						maxLength={7}
						onChange={(e) => {
							onChange(e?.currentTarget?.value)
						}}
						ref={ref}
						value={parsedValue}
					/>
				</PopoverContent>
			</Popover>
		)
	},
)
ColorPicker.displayName = 'ColorPicker'

export { ColorPicker }
