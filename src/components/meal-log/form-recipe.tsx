'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'
import type { GetRecipeById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import NumberFlow from '@number-flow/react'
import { PlusCircle } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

import { FormRecipeIngredient } from './form-recipe-ingredient'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
	name: z.string().min(2, 'Name is required'),
	description: z.string(),
	image: z.string(),
	notes: z.string(),
	recipeCategory: z.string(),
	ingredients: z
		.array(
			z.object({
				index: z.number(),
				ingredientId: z.string(),
				note: z.string(),
				serveSize: z.string(),
				serveUnit: z.string(),
				alternateId: z.string(),
			}),
		)
		.nonempty(),
})

const FormRecipe = ({
	setIsOpen,
	setIsRecipeListOpen,
	recipe,
	logId,
	mealIndex,
  protein,
  calories,
}: {
	recipe: GetRecipeById | null
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	setIsRecipeListOpen: React.Dispatch<React.SetStateAction<boolean>>
	logId: number
	mealIndex: number
  protein: number
  calories: number
}) => {

	return (
		<MainForm
			recipe={recipe}
			initialData={null}
			setIsOpen={setIsOpen}
			setIsRecipeListOpen={setIsRecipeListOpen}
			logId={logId}
			mealIndex={mealIndex}
      protein={protein}
      calories={calories}
		/>
	)
}

const MainForm = ({
	recipe,
	initialData,
	setIsOpen,
	setIsRecipeListOpen,
	logId,
	mealIndex,
  protein,
  calories,
}: {
	recipe: GetRecipeById | null
	initialData: z.infer<typeof formSchema> | null
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	setIsRecipeListOpen: React.Dispatch<React.SetStateAction<boolean>>
	logId: number
	mealIndex: number
  protein: number
  calories: number
}) => {
	const isMobile = useIsMobile()

	const ctx = api.useUtils()

	const { data: allIngredients, isLoading: isLoadingAllIngredients } =
		api.ingredient.getAll.useQuery()
	const { mutate: createRecipe } = api.recipe.create.useMutation({
		onSuccess: () => {
			ctx.recipe.invalidate()
			toast.success('Recipe created')
		},
	})
	const { mutate: updateRecipe } = api.recipe.update.useMutation({
		onSuccess: () => {
			ctx.recipe.invalidate()
			toast.success('Recipe updated successfully')
		},
	})

	const { mutate: addUserCreatedRecipe } =
		api.dailyLog.addUserCreatedRecipe.useMutation({
			onSuccess: () => {
				ctx.dailyLog.invalidate()
				ctx.user.invalidate()
			},
		})

	const initValues = {
		name: recipe?.name || initialData?.name || '',
		description: recipe?.description || initialData?.description || '',
		image: recipe?.image || initialData?.image || '',
		notes: recipe?.notes || initialData?.notes || '',
		recipeCategory: recipe?.recipeCategory || initialData?.recipeCategory || '',
		ingredients: recipe?.recipeToIngredient.map((ingredient) => ({
			index: ingredient.index,
			ingredientId: ingredient.ingredient.id.toString() || '',
			note: ingredient.note || '',
			serveSize: ingredient.serveSize || '',
			serveUnit: ingredient.serveUnit || '',
			alternateId: ingredient.alternateId?.toString() || '',
		})) ||
			initialData?.ingredients?.map((ingredient) => ({
				index: ingredient.index,
				ingredientId: ingredient.ingredientId,
				note: ingredient.note,
				serveSize: ingredient.serveSize,
				serveUnit: ingredient.serveUnit,
				alternateId: ingredient.alternateId,
			})) || [
				{
					index: 1,
					ingredientId: '',
					note: '',
					serveSize: '',
					serveUnit: '',
					alternateId: '',
				},
			],
	}

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initValues,
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'ingredients',
	})
	const ingredients = form.watch('ingredients')

	const calorieTotal = ingredients
		.reduce((acc, ingredient) => {
			const i = allIngredients?.find(
				(ai) => Number(ai.id) === Number(ingredient.ingredientId),
			)
			if (i) {
				return (
					acc +
					Number(i.caloriesWOFibre) *
						(Number(ingredient.serveSize) / Number(i.serveSize))
				)
			}
			return acc
		}, 0)
		.toFixed(1)
	const proteinTotal = ingredients
		.reduce((acc, ingredient) => {
			const i = allIngredients?.find(
				(ai) => Number(ai.id) === Number(ingredient.ingredientId),
			)
			if (i) {
				return (
					acc +
					Number(i.protein) *
						(Number(ingredient.serveSize) / Number(i.serveSize))
				)
			}
			return acc
		}, 0)
		.toFixed(1)

	const carbTotal = ingredients
		.reduce((acc, ingredient) => {
			const i = allIngredients?.find(
				(ai) => Number(ai.id) === Number(ingredient.ingredientId),
			)
			if (i) {
				return (
					acc +
					Number(i.availableCarbohydrateWithSugarAlcohols) *
						(Number(ingredient.serveSize) / Number(i.serveSize))
				)
			}
			return acc
		}, 0)
		.toFixed(1)

	const fatTotal = ingredients
		.reduce((acc, ingredient) => {
			const i = allIngredients?.find(
				(ai) => Number(ai.id) === Number(ingredient.ingredientId),
			)
			if (i) {
				return (
					acc +
					Number(i.fatTotal) *
						(Number(ingredient.serveSize) / Number(i.serveSize))
				)
			}
			return acc
		}, 0)
		.toFixed(1)

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		if (recipe) {
			updateRecipe({
				id: recipe.id,
				name: data.name,
				description: data.description,
				image: data.image,
				notes: data.notes,
				recipeCategory: data.recipeCategory,
				calories: Number(calorieTotal),
				isUserRecipe: true,
				ingredients: data.ingredients.map((i) => {
					return {
						index: i.index,
						ingredientId: Number(i.ingredientId),
						note: i.note,
						serveSize: i.serveSize,
						serveUnit: i.serveUnit,
						alternateId: i.alternateId,
					}
				}),
			})
			addUserCreatedRecipe({
				mealIndex: mealIndex,
				logId: logId,
				recipe: {
					name: data.name,
					description: data.description,
					image: data.image,
					notes: data.notes,
					recipeCategory: data.recipeCategory,
					calories: Number(calorieTotal),
					ingredients: data.ingredients.map((i) => {
						return {
							index: i.index,
							ingredientId: Number(i.ingredientId),
							note: i.note,
							serveSize: i.serveSize,
							serveUnit: i.serveUnit,
							alternateId: i.alternateId,
						}
					}),
				},
			})
		} else {
			createRecipe({
				name: data.name,
				description: data.description,
				image: data.image,
				notes: data.notes,
				recipeCategory: data.recipeCategory,
				calories: Number(calorieTotal),
				isUserRecipe: true,
				ingredients: data.ingredients.map((i) => {
					return {
						index: i.index,
						ingredientId: Number(i.ingredientId),
						note: i.note,
						serveSize: i.serveSize,
						serveUnit: i.serveUnit,
						alternateId: i.alternateId,
					}
				}),
			})
			addUserCreatedRecipe({
				mealIndex: mealIndex,
				logId: logId,
				recipe: {
					name: data.name,
					description: data.description,
					image: data.image,
					notes: data.notes,
					recipeCategory: data.recipeCategory,
					calories: Number(calorieTotal),
					ingredients: data.ingredients.map((i) => {
						return {
							index: i.index,
							ingredientId: Number(i.ingredientId),
							note: i.note,
							serveSize: i.serveSize,
							serveUnit: i.serveUnit,
							alternateId: i.alternateId,
						}
					}),
				},
			})
		}
		setIsOpen(false)
		setIsRecipeListOpen(false)
	}

  const isBigCalories = Math.abs(calories - Number(calorieTotal)) / calories > 0.5
  const isMediumCalories = Math.abs(calories - Number(calorieTotal)) / calories > 0.25
  const isSmallCalories = Math.abs(calories - Number(calorieTotal)) / calories > 0.1
  const isTinyCalories = Math.abs(calories - Number(calorieTotal)) / calories > 0.02

  const isBigProtein = Math.abs(protein - Number(proteinTotal)) / protein > 0.5
  const isMediumProtein = Math.abs(protein - Number(proteinTotal)) / protein > 0.25
  const isSmallProtein = Math.abs(protein - Number(proteinTotal)) / protein > 0.1
  const isTinyProtein = Math.abs(protein - Number(proteinTotal)) / protein > 0.02

  console.log({ isBigCalories, isMediumCalories, isSmallCalories })

  console.log(Math.abs(calories - Number(calorieTotal)) / calories)

	if (isLoadingAllIngredients) return null

	return (
		<div className='flex flex-col gap-2 relative'>
			<div className='flex items-baseline justify-center border-b-[1px] border-primary/20 pb-2'>
				<div className='flex items-center gap-2'>
					<NumberFlow
						value={Number(calorieTotal)}
						className={cn('text-xl font-semibold text-primary ml-2 ',
              isTinyCalories ? 'text-red-900 font-black' : '',
              isSmallCalories ? 'text-red-800 font-black' : '',
              isMediumCalories ? 'text-red-700 font-black' : '',
              isBigCalories ? 'text-red-500 font-black' : '',
            )}
					/>
					<span className='text-xs text-primary/50 ml-[1px]'>cals</span>
				</div>
				<div className='flex items-center gap-2'>
					<NumberFlow
						value={Number(carbTotal)}
						className='text-xl font-semibold text-primary ml-2 '
					/>
					<span className='text-xs text-primary/50 ml-[1px]'>carbs</span>
				</div>
				<div className='flex items-center gap-2'>
					<NumberFlow
						value={Number(proteinTotal)}
						className={cn('text-xl font-semibold text-primary ml-2 ',
              isTinyProtein ? 'text-red-900 font-black' : '',
              isSmallProtein ? 'text-red-800 font-black' : '',
              isMediumProtein ? 'text-red-700 font-black' : '',
              isBigProtein ? 'text-red-500 font-black' : '',
            )}
					/>
					<span className='text-xs text-primary/50 ml-[1px]'>protein</span>
				</div>
				<div className='flex items-center gap-2'>
					<NumberFlow
						value={Number(fatTotal)}
						className='text-xl font-semibold text-primary ml-2 '
					/>
					<span className='text-xs text-primary/50 ml-[1px]'>fat</span>
				</div>
			</div>
			<ScrollArea className='pt-4 px-2 h-[calc(90vh-160px)]'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className='flex flex-col gap-4 px-4'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Name' {...field} type='text' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='flex flex-col gap-4'>
								<div className='flex flex-col divide-y divide-border border rounded-md shadow-md'>
										{fields.map((_ingredient, index) => (
											<FormRecipeIngredient
												key={_ingredient.id}
												index={index}
												form={form}
												remove={remove}
												allIngredients={allIngredients}
											/>
										))}
								</div>
								<div className='flex justify-center w-full'>
									<PlusCircle
										size={36}
										className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer'
										onClick={() =>
											append({
												ingredientId: '',
												serveSize: '',
												serveUnit: '',
												index: fields.length + 1,
												note: '',
												alternateId: '',
											})
										}
									/>
								</div>
							</div>
							<div className='flex gap-4 justify-center mt-4'>
								<Button type='submit'>Save</Button>
								<Button
									onClick={(e) => {
										e.preventDefault()
										e.stopPropagation()
										setIsOpen(false)
									}}
									variant='secondary'
								>
									Cancel
								</Button>
							</div>
						</div>
					</form>
				</Form>
			</ScrollArea>
		</div>
	)
}

export { FormRecipe }
