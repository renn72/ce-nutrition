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
}: {
	recipe: GetRecipeById | null
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	setIsRecipeListOpen: React.Dispatch<React.SetStateAction<boolean>>
  logId: number
  mealIndex: number
}) => {
	const [initialData, setInitialData] = useState<z.infer<
		typeof formSchema
	> | null>()

	useEffect(() => {
		const loadFormData = () => {
			const savedForm = localStorage.getItem('ce-recipe-formValues') as z.infer<
				typeof formSchema
			> | null

			// @ts-ignore
			if (savedForm === null || savedForm === '') {
				setInitialData(null)
				return
			}
			// @ts-ignore
			setInitialData(JSON.parse(savedForm))
		}

		loadFormData()
	}, [])

	if (initialData === undefined) return null

	return (
		<MainForm
			recipe={recipe}
			initialData={initialData}
			setIsOpen={setIsOpen}
			setIsRecipeListOpen={setIsRecipeListOpen}
      logId={logId}
      mealIndex={mealIndex}
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
}: {
	recipe: GetRecipeById | null
	initialData: z.infer<typeof formSchema> | null
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
	setIsRecipeListOpen: React.Dispatch<React.SetStateAction<boolean>>
	logId: number
	mealIndex: number
}) => {
	const [reset, setReset] = useState(0)
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

	const formData = form.watch()

	const onChange = () => {
		window.localStorage.setItem(
			'ce-recipe-formValues',
			JSON.stringify(formData),
		)
	}

	const onClear = () => {
		const clearedValues = {
			name: '',
			description: '',
			image: '',
			notes: '',
			recipeCategory: '',
			ingredients: [
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
		form.reset(clearedValues)
		setReset(reset + 1)
		window.localStorage.setItem('ce-recipe-formValues', '')
	}

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'ingredients',
	})
	const ingredients = form.watch('ingredients')

	const sizeTotal = ingredients.reduce((acc, ingredient) => {
		return acc + Number(ingredient.serveSize)
	}, 0)

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

	if (isLoadingAllIngredients) return null

	return (
		<div className='flex flex-col gap-2 relative'>
			<div className='flex items-baseline justify-center border-b-[1px] border-primary/20 pb-2'>
				<div className='flex items-center gap-2'>
					<NumberFlow
						value={Number(calorieTotal)}
						className='text-xl font-semibold text-primary ml-2 '
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
						className='text-xl font-semibold text-primary ml-2 '
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
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					onKeyUp={onChange}
					onClick={onChange}
					onChange={onChange}
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
							<h2>Ingredients</h2>
							<div className='flex flex-col divide-y divide-border border rounded-md shadow-md'>
								<div
									className={cn(
										'hidden lg:grid grid-cols-15 w-full divide-x divide-border text-sm font-medium capitalize',
										'items-center tracking-tighter ',
									)}
								>
									<div className={cn('col-span-4', 'px-2 py-2')}>
										ingredient
									</div>
									<div className='pl-2 py-2 col-span-3'>Alternate</div>
									<div className='pl-2 py-2 col-span-2'>size</div>
									<div className='pl-2 py-2'>serve unit</div>
									<div className='pl-2 py-2'>calories</div>
									<div className='pl-2 py-2'>protein</div>
									<div className='pl-2 py-2'>carb</div>
									<div className='pl-2 py-2'>fat</div>
									<div className='pl-2 py-2 col-span-3 hidden'>
										core attributes
									</div>
									<div className='pl-2 py-2'>&#8192;</div>
								</div>
								{fields.map((_ingredient, index) => (
									<FormRecipeIngredient
										key={index}
										index={index}
										form={form}
										remove={remove}
										allIngredients={allIngredients}
										reset={reset}
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
						<div className='flex gap-4 justify-center'>
							<Button type='submit'>Save</Button>
							<Button
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
									onClear()
								}}
								variant='outline'
							>
								Clear
							</Button>
							<Button
								onClick={(e) => {
									e.preventDefault()
									e.stopPropagation()
									onClear()
									setIsOpen(false)
									setIsRecipeListOpen(false)
								}}
								variant='secondary'
							>
								Cancel
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}

export { FormRecipe }
