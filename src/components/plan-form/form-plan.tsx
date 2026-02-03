'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import type { GetPlanById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
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

import { BackButton } from '../back-button'
import { FormPlanMeal } from './form-plan-meal'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
	name: z.string().min(1),
	description: z.string(),
	image: z.string(),
	notes: z.string(),
	planCategory: z.string(),
	meals: z.array(
		z.object({
			mealTitle: z.string(),
			calories: z.string(),
			vegeCalories: z.string().optional(),
			vegeNotes: z.string().optional(),
			vege: z.string().optional(),
			note: z.string(),
			recipes: z.array(
				z.object({
					recipeId: z.string(),
					note: z.string(),
				}),
			),
		}),
	),
})

const FormPlan = ({ plan }: { plan: GetPlanById | null }) => {
	const [initialData, setInitialData] = useState<z.infer<
		typeof formSchema
	> | null>()
	const { data: _recipes, isLoading: isLoadingRecipes } =
		api.recipe.getAll.useQuery()

	useEffect(() => {
		const loadFormData = () => {
			const savedForm = localStorage.getItem('ce-plan-formValues')

			// @ts-ignore
			if (savedForm === null || savedForm === '') {
				setInitialData(null)
				return
			}

			if (JSON.parse(savedForm) satisfies z.infer<typeof formSchema>) {
				setInitialData(JSON.parse(savedForm))
			} else {
				setInitialData(null)
			}
		}

		loadFormData()
	}, [])

	if (initialData === undefined) return null

	if (isLoadingRecipes) return null

	return <MainForm plan={plan} initialData={initialData} />
}

const MainForm = ({
	plan,
	initialData,
}: {
	plan: GetPlanById | null
	initialData: z.infer<typeof formSchema> | null
}) => {
	const ctx = api.useUtils()

	const { mutate: createPlan } = api.plan.create.useMutation({
		onSuccess: () => {
			toast.success('Plan added successfully')
			ctx.plan.getAll.invalidate()
		},
	})
	const { mutate: updatePlan } = api.plan.update.useMutation({
		onSuccess: () => {
			toast.success('Plan updated successfully')
			ctx.plan.getAll.invalidate()
		},
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: plan?.name || initialData?.name || '',
			description: plan?.description || initialData?.description || '',
			image: plan?.image || initialData?.image || '',
			notes: plan?.notes || initialData?.notes || '',
			planCategory: plan?.planCategory || initialData?.planCategory || '',
			meals: plan?.meals?.map((meal) => {
				console.log({ meal })
				return {
					mealId: meal?.id.toString(),
					mealTitle: meal?.name || '',
					calories: meal?.mealToRecipe?.[0]?.recipe?.calories.toString() || '',
					vegeCalories: meal?.mealToVegeStack?.[0]?.vegeStack?.calories || '',
					note: meal?.mealToRecipe?.[0]?.note || '',
					mealIndex: meal.mealIndex,
					recipes: meal.mealToRecipe?.map((recipe) => ({
						recipeId: recipe?.recipeId?.toString(),
						note: recipe?.note || '',
					})),
				}
			}) ||
				initialData?.meals?.map((meal) => ({
					mealTitle: meal.mealTitle,
					calories: meal.calories,
					vegeCalories: meal.vegeCalories || '',
					vegeNotes: meal.vegeNotes || '',
					vege: meal.vege || '',
					note: meal.note,
					recipes: meal.recipes.map((recipe) => ({
						recipeId: recipe.recipeId,
						note: recipe.note,
					})),
				})) || [
					{
						mealTitle: '1',
						calories: '500',
						vegeCalories: '',
						note: '',
						recipes: [
							{
								recipeId: '',
								note: '',
							},
						],
					},
				],
		},
	})

	const mealsField = useFieldArray({
		control: form.control,
		name: 'meals',
	})

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		if (plan?.id) {
			updatePlan({
				id: plan.id,
				name: data.name,
				description: data.description,
				image: data.image,
				notes: data.notes,
				planCategory: data.planCategory,
				numberOfMeals: data.meals.length,
				meals: data.meals.map((meal, i) => ({
					mealIndex: i + 1,
					mealTitle: meal.mealTitle,
					calories: meal.calories,
					vegeCalories: meal.vegeCalories || '',
					vegeNotes: meal.vegeNotes || '',
					vege: meal.vege || '',
					note: meal.note,
					recipes: meal.recipes.map((recipe) => ({
						recipeId: Number(recipe.recipeId),
						note: recipe.note,
					})),
				})),
			})
		} else {
			createPlan({
				name: data.name,
				description: data.description,
				image: data.image,
				notes: data.notes,
				planCategory: data.planCategory,
				numberOfMeals: data.meals.length,
				meals: data.meals.map((meal, i) => ({
					mealIndex: i + 1,
					mealTitle: meal.mealTitle,
					calories: meal.calories,
					vegeCalories: meal.vegeCalories || '',
					vegeNotes: meal.vegeNotes || '',
					vege: meal.vege || '',
					note: meal.note,
					recipes: meal.recipes.map((recipe) => ({
						recipeId: Number(recipe.recipeId),
						note: recipe.note,
					})),
				})),
			})
		}
	}

	const onClear = () => {
		form.reset({
			name: '',
			description: '',
			image: '',
			notes: '',
			planCategory: '',
			meals: [
				{
					mealTitle: '1',
					calories: '500',
					vegeCalories: '',
					note: '',
					recipes: [
						{
							recipeId: '',
							note: '',
						},
					],
				},
			],
		})
		window.localStorage.setItem('ce-plan-formValues', '')
	}

	const formData = form.watch()

	const onChange = () => {
		window.localStorage.setItem('ce-plan-formValues', JSON.stringify(formData))
	}

	return (
		<div className='flex flex-col gap-2 p-2 my-1'>
			<BackButton />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					onKeyUp={onChange}
					onClick={onChange}
					onChange={onChange}
				>
					<div className='flex flex-col gap-1'>
						<div className='flex flex-col gap-1 justify-between lg:flex-row lg:gap-8'>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder='Name' {...field} type='text' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='planCategory'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Plan Category</FormLabel>
										<FormControl>
											<Input placeholder='Category' {...field} type='text' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='image'
								render={({ field }) => (
									<FormItem className='hidden w-full'>
										<FormLabel>Image TODO</FormLabel>
										<FormControl>
											<Input placeholder='Image' {...field} type='text' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex flex-col gap-1 justify-between lg:flex-row lg:gap-8'>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Input placeholder='Description' {...field} type='text' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='notes'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Notes</FormLabel>
										<FormControl>
											<Input placeholder='Notes' {...field} type='text' />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='flex flex-col gap-1 mt-4'>
							<h2 className='text-3xl font-bold text-center'>Meals</h2>
							<div className='flex flex-col gap-2'>
								{mealsField.fields.map((field, index) => (
									<FormPlanMeal
										key={field.id}
										index={index}
										form={form}
										remove={mealsField.remove}
										insert={mealsField.insert}
										move={mealsField.move}
									/>
								))}
							</div>
							<div className='flex justify-center mt-8 w-full'>
								<PlusCircle
									size={36}
									className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground hover:text-foreground'
									onClick={() =>
										mealsField.append({
											mealTitle: (mealsField.fields.length + 1).toString(),
											calories: '500',
											vegeCalories: '',
											note: '',
											recipes: [
												{
													recipeId: '',
													note: '',
												},
											],
										})
									}
								/>
							</div>
						</div>
						<div className='flex gap-4'>
							<Button type='submit'>{plan?.id ? 'Update' : 'Submit'}</Button>
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
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}

export { FormPlan }
