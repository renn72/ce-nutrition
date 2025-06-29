'use client'

import { api } from '@/trpc/react'

import { useEffect, useState, type ReactNode } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
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
import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
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
	reset,
}: {
	index: number
	form: UseFormReturn<z.infer<typeof formSchema>>
	remove: (index: number) => void
	allIngredients: GetAllIngredients | null | undefined
	reset: number
}) => {
	const isMobile = useIsMobile()

	const ingredientId = form.watch(`ingredients.${index}.ingredientId`)
	const alternateId = form.watch(`ingredients.${index}.alternateId`)

	const [selected, setSelected] = useState<GetIngredientById | null>(null)

	const [selectedAlt, setSelectedAlt] = useState<GetIngredientById | null>(null)

	useEffect(() => {
		if (ingredientId) {
			setSelected(allIngredients?.find((i) => i.id === Number(ingredientId)))
		} else {
			setSelected(null)
		}
		if (alternateId) {
			setSelectedAlt(allIngredients?.find((i) => i.id === Number(alternateId)))
		} else {
			setSelectedAlt(null)
		}
	}, [reset])

	if (!allIngredients) return null

	if (!allIngredients) return <div />

	const serveSize = form.watch(`ingredients.${index}.serveSize`)
	return (
		<div
			key={index}
			className='grid grid-cols-4 lg:grid-cols-15 w-full lg:divide-x divide-border relative'
		>
			<GridWrapper className='col-span-4'>
				<FormField
					control={form.control}
					name={`ingredients.${index}.ingredientId`}
					render={({ field }) => (
						<FormItem className='grid grid-cols-4 lg:flex lg:flex-col w-full items-center gap-2 lg:gap-0'>
							<FormLabel className='block lg:hidden mt-2 text-muted-foreground'>
								Ingredient
							</FormLabel>
							<div className='flex gap-2 items-center w-full lg:w-content col-span-3'>
								<VirtualizedCombobox
                  width='600px'
                  height='800px'
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
                    setSelected(allIngredients?.find((i) => i.id === Number(value)))
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
									className='text-secondary-foreground shrink-0'
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
			<GridWrapper className='col-span-4 lg:col-span-3'>
				<FormField
					control={form.control}
					name={`ingredients.${index}.alternateId`}
					render={({ field }) => (
						<FormItem className='grid grid-cols-4 lg:flex lg:flex-col w-full items-center gap-2 lg:gap-0'>
							<FormLabel className='block lg:hidden mt-2 text-muted-foreground'>
								Alternate
							</FormLabel>
							<div className='flex gap-2 items-center w-full col-span-3'>
								<VirtualizedCombobox
                  width='600px'
                  height='800px'
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
										field.onChange(value)
									}}
								/>
								<XCircle
									size={18}
									className='text-secondary-foreground shrink-0'
									onClick={() => {
										field.onChange('')
										setSelectedAlt(null)
									}}
								/>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>
			</GridWrapper>
			<GridWrapper className='col-span-4 lg:col-span-2 '>
				<FormField
					control={form.control}
					name={`ingredients.${index}.serveSize`}
					render={({ field }) => (
						<FormItem className='grid grid-cols-4 lg:flex items-center justify-start gap-2 w-full relative'>
							<FormLabel className='block lg:hidden mt-2 text-muted-foreground'>
								Size
							</FormLabel>
							<FormControl className='col-span-3'>
								<Input placeholder='Serve Size' {...field} type='number' />
							</FormControl>
							<FormMessage />
							{isMobile ? (
								<div className='absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pb-1'>
									{selected?.serveUnit}
								</div>
							) : null}
						</FormItem>
					)}
				/>
			</GridWrapper>
			{isMobile ? null : (
				<GridWrapper className={cn('text-sm')}>
					{selected?.serveUnit}
				</GridWrapper>
			)}
			{isMobile ? (
				<>
					<div className='col-span-4 px-2 mt-2'>
						<div className='grid grid-cols-4 w-full border divide-x divide-border col-span-4 text-muted-foreground text-sm'>
							<div className='text-center py-1'>Cals</div>
							<div className='text-center py-1'>Protein</div>
							<div className='text-center py-1'>Carbs</div>
							<div className='text-center py-1'>Fat</div>
						</div>
					</div>
					<div className='col-span-4 px-2 mb-1'>
						{selected && (
							<div className='grid grid-cols-4 w-full border-l border-r border-b divide-x divide-border'>
								<GridWrapper className={cn('text-sm')}>
									{selected &&
										(
											Number(selected.caloriesWFibre) *
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
				</>
			) : (
				<>
					<GridWrapper className={cn('text-sm')}>
						{selected &&
							(
								Number(selected.caloriesWFibre) *
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
				</>
			)}

			<GridWrapper className='col-span-4 lg:col-span-1 pb-1'>
				{isMobile ? (
					<Badge
						variant='destructive'
						className='cursor-pointer active:scale-90'
						onClick={() => {
							remove(index)
						}}
					>
						delete
					</Badge>
				) : (
					<Badge
						variant='destructive'
						className='cursor-pointer active:scale-90'
						onClick={() => {
							remove(index)
						}}
					>
						delete
					</Badge>
				)}
			</GridWrapper>
		</div>
	)
}

export { FormRecipeIngredient }
