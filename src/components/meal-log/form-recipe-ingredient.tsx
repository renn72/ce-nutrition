'use client'

import { useEffect, useState, type ReactNode } from 'react'

import { cn } from '@/lib/utils'
import type { GetAllIngredients, GetIngredientById } from '@/types'
import {
	Combobox,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
} from '@headlessui/react'
import { CheckIcon, ChevronDownIcon, Star, XCircle } from 'lucide-react'
import type { UseFormReturn } from 'react-hook-form'
import type { z } from 'zod'

import { Badge } from '@/components/ui/badge'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { NumberInputForm } from '@/components/ui/number-input-form'

import { VirtualizedCombobox } from '@/components/ui/virtualized-combobox'
import type { formSchema } from './form-recipe'

export const dynamic = 'force-dynamic'

const GridWrapper = ({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) => (
	<div
		className={cn(
			'px-1 lg:px-2 py-0 lg:py-2 flex items-center justify-center',
			className,
		)}
	>
		{children}
	</div>
)

const FormRecipeIngredient = ({
	index,
	form,
	remove,
	allIngredients,
}: {
	index: number
	form: UseFormReturn<z.infer<typeof formSchema>>
	remove: (index: number) => void
	allIngredients: GetAllIngredients | null | undefined
}) => {
	const ingredientId = form.watch(`ingredients.${index}.ingredientId`)

	const [selected, setSelected] = useState<GetIngredientById | null>(null)

	useEffect(() => {
		if (ingredientId) {
			setSelected(allIngredients?.find((i) => i.id === Number(ingredientId)))
		} else {
			setSelected(null)
		}
	}, [])

	if (!allIngredients) return null

	if (!allIngredients) return <div />

	const serveSize = form.watch(`ingredients.${index}.serveSize`)

	console.log({ serveSize, selected })

	return (
		<div
			key={index}
			className='grid relative grid-cols-4 w-full lg:divide-x divide-border lg:grid-cols-15'
		>
			<GridWrapper className='col-span-4'>
				<FormField
					control={form.control}
					name={`ingredients.${index}.ingredientId`}
					render={({ field }) => (
						<FormItem className='grid grid-cols-4 gap-2 items-center w-full lg:flex lg:flex-col lg:gap-0'>
							<FormLabel className='block mt-2 lg:hidden text-muted-foreground'>
								Ingredient
							</FormLabel>
							<div className='flex col-span-3 gap-2 items-center w-full lg:w-content'>
								<VirtualizedCombobox
									options={allIngredients
										?.sort((a, b) => {
											if (a.favouriteAt) return -1
											if (b.favouriteAt) return 1
											return 0
										})
										?.map((i) => {
											return {
												value: i.id.toString(),
												label: i.name ?? '',
											}
										})}
									selectedOption={field.value}
									onSelectOption={(value) => {
										setSelected(
											allIngredients?.find((i) => i.id === Number(value)),
										)
										field.onChange(value)
										form.setValue(
											`ingredients.${index}.serveSize`,
											allIngredients?.find((i) => i.id === Number(value))
												?.serveSize ?? '',
										)
										form.setValue(
											`ingredients.${index}.serveUnit`,
											allIngredients?.find((i) => i.id === Number(value))
												?.serveUnit ?? '',
										)
									}}
								/>

								<XCircle
									size={18}
									className='text-secondary-foreground'
									onClick={() => {
										field.onChange('')
										setSelected(null)
									}}
								/>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</GridWrapper>
			<GridWrapper className='col-span-4 lg:col-span-2'>
				<FormField
					control={form.control}
					name={`ingredients.${index}.serveSize`}
					render={({ field }) => (
						<FormItem className='grid relative grid-cols-4 gap-2 justify-start items-center w-full lg:flex'>
							<FormLabel className='block mt-2 lg:hidden text-muted-foreground'>
								Size
							</FormLabel>
							<FormControl className='col-span-3'>
								<NumberInputForm
									placeholder='Serve Size'
									value={field.value}
									setValue={field.onChange}
									scale={1}
								/>
							</FormControl>
							<FormMessage />
							<div className='absolute right-3 top-1/2 pb-1 text-xs -translate-y-1/2 text-muted-foreground'>
								{selected?.serveUnit}
							</div>
						</FormItem>
					)}
				/>
			</GridWrapper>
			<div className='col-span-4 px-2 mt-2'>
				<div className='grid grid-cols-4 col-span-4 w-full text-sm border divide-x divide-border text-muted-foreground'>
					<div className='py-1 text-center'>Cals</div>
					<div className='py-1 text-center'>Protein</div>
					<div className='py-1 text-center'>Carbs</div>
					<div className='py-1 text-center'>Fat</div>
				</div>
			</div>
			<div className='col-span-4 px-2 mb-1'>
				{selected && (
					<div className='grid grid-cols-4 w-full border-r border-b border-l divide-x divide-border'>
						<GridWrapper className={cn('text-sm')}>
							{selected &&
								(
									Number(selected.caloriesWOFibre) *
									(Number(serveSize) / Number(selected.serveSize))
								).toFixed(1)}
						</GridWrapper>
						<GridWrapper className={cn('text-sm')}>
							{selected &&
								(
									Number(selected.protein) *
									(Number(serveSize) / Number(selected.serveSize))
								).toFixed(1)}
						</GridWrapper>
						<GridWrapper className={cn('text-sm')}>
							{selected &&
								(
									Number(selected.availableCarbohydrateWithSugarAlcohols) *
									(Number(serveSize) / Number(selected.serveSize))
								).toFixed(1)}
						</GridWrapper>
						<GridWrapper className={cn('text-sm')}>
							{selected &&
								(
									Number(selected.fatTotal) *
									(Number(serveSize) / Number(selected.serveSize))
								).toFixed(1)}
						</GridWrapper>
					</div>
				)}
			</div>
			<GridWrapper className='col-span-4 pb-1 lg:col-span-1'>
				<Badge
					variant='destructive'
					className='active:scale-90'
					onClick={(e) => {
						e.preventDefault()
						remove(index)
					}}
				>
					delete
				</Badge>
			</GridWrapper>
		</div>
	)
}

export { FormRecipeIngredient }
