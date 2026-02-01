'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { userAtom } from '@/app/admin/_sidebar/sidebar'
import { cn, getRecipeDetails } from '@/lib/utils'
import type { GetPlanById, UserPlan } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { PlusCircle, Undo2 } from 'lucide-react'
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

import { Meal } from '@/components/user-plan/meal'
import { PlanFolders } from './plan-folders'
import { Spinner } from '@/components/spinner'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
	name: z.string().min(1),
	description: z.string(),
	image: z.string().optional(),
	notes: z.string(),
	meals: z.array(
		z.object({
			mealId: z.string(),
			mealTitle: z.string(),
			calories: z.string(),
			protein: z.string().optional(),
			targetProtein: z.string().min(1, 'Please enter a protein value'),
			targetCalories: z.string().min(1, 'Please enter a calories value'),
			vegeCalories: z.string(),
			vege: z.string(),
			vegeNotes: z.string(),
			note: z.string(),
			recipes: z.array(
				z.object({
					recipeId: z.string(),
					name: z.string(),
					note: z.string(),
					description: z.string(),
					index: z.number(),
					ingredients: z.array(
						z.object({
							ingredientId: z.string(),
							alternateId: z.string().nullable(),
							name: z.string(),
							serveSize: z.string(),
							serveUnit: z.string(),
							note: z.string(),
						}),
					),
				}),
			),
		}),
	),
})

const CreateUserPlan = ({
	userPlan = null,
}: {
	userPlan?: UserPlan | null
}) => {
	const searchParams = useSearchParams()
	const user = searchParams.get('user') ?? ''
	const router = useRouter()

	const [selectedPlanId, setSelectedPlanId] = useState(0)
	const [selectedPlan, setSelectedPlan] = useState<GetPlanById | null>(null)

	const [userId] = useAtom(userAtom)

	const { data: userAdmin } = api.user.isUser.useQuery()

	const { data: plan, isLoading: planLoading } = api.plan.get.useQuery({
		id: selectedPlanId,
	})

	const ctx = api.useUtils()

	const { mutate: createPlan } = api.userPlan.create.useMutation({
		onSuccess: () => {
			toast.success('Created')
			ctx.user.get.invalidate()
			setTimeout(() => {
				router.push(`/admin/user-program?user=${user}`)
			}, 100)
		},
		onError: (e) => {
			toast.error(JSON.stringify(e))
			console.log(e)
		},
	})

	const { mutate: finishPlan } = api.userPlan.finishPlan.useMutation()

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: userPlan?.name || '',
			description: userPlan?.description || '',
			image: userPlan?.image || '',
			notes: userPlan?.notes || '',
			meals:
				userPlan?.userMeals.map((meal, mealIndex) => ({
					mealId: mealIndex.toString(),
					mealTitle: meal.mealTitle || '',
					calories: meal.calories || '',
					targetCalories:
						(Number(meal.calories) + Number(meal.vegeCalories)).toString() ||
						'',
					targetProtein: meal.targetProtein || '',
					vegeCalories: meal.vegeCalories || '',
					vege: meal.veges || '',
					vegeNotes: meal.vegeNotes || '',
					protein: '',
					note: '',
					recipes: userPlan?.userRecipes
						.filter((recipe) => recipe.mealIndex === mealIndex)
						.map((recipe) => ({
							recipeId: recipe.id.toString(),
							name: recipe.name || '',
							note: recipe.note || '',
							description: '',
							index: recipe.index || 0,
							ingredients: userPlan?.userIngredients
								.filter(
									(ingredient) =>
										ingredient.recipeIndex === recipe.recipeIndex &&
										ingredient.mealIndex === recipe.mealIndex,
								)
								.map((ingredient) => ({
									ingredientId: ingredient.ingredientId?.toString() || '',
									recipeIndex: recipe.recipeIndex,
									mealIndex: recipe.mealIndex,
									alternateId: ingredient.alternateId?.toString() || null,
									name: ingredient.name || '',
									serveSize: ingredient.serve || '',
									serveUnit: ingredient.serveUnit || '',
									note: ingredient.note || '',
									ingredient: {
										...ingredient.ingredient,
									},
									alternateIngredient: {
										...ingredient.alternateIngredient,
									},
								})),
						})),
				})) || [],
		},
	})
	const mealsField = useFieldArray({
		control: form.control,
		name: 'meals',
	})

	useEffect(() => {
		if (userPlan) {
			setSelectedPlan({
				id: -1,
				name: userPlan?.name || '',
				description: userPlan?.description || '',
				notes: userPlan?.notes || '',
				image: userPlan?.image || '',
				numberOfMeals: userPlan?.numberOfMeals || 0,
				creatorId: userPlan?.creatorId || '',
				isGlobal: false,
				planCategory: '',
				favouriteAt: userPlan?.favouriteAt || null,
				deletedAt: userPlan?.deletedAt || null,
				hiddenAt: userPlan?.hiddenAt || null,
				createdAt: userPlan?.createdAt || new Date(),
				updatedAt: userPlan?.updatedAt || new Date(),
				creator: null,
				planFolderId: null,
				meals:
					userPlan?.userMeals.map((meal, mealIndex) => ({
						id: -1,
						createdAt: new Date(),
						calories: meal.calories || '',
						mealIndex: mealIndex + 1,
						name: meal.mealTitle || '',
						notes: meal.note || '',
						vege: meal.veges || '',
						vegeCalories: meal.vegeCalories || '',
						vegeNotes: meal.vegeNotes || '',
						description: null,
						creatorId: userPlan.creatorId,
						favouriteAt: null,
						deletedAt: null,
						hiddenAt: null,
						image: null,
						mealCategory: null,
						updatedAt: new Date(),
						planId: -1,
						mealToVegeStack: [],
						mealToRecipe: userPlan?.userRecipes
							.filter((recipe) => recipe.mealIndex === mealIndex)
							.map((recipe, recipeIndex) => ({
								id: -1,
								createdAt: new Date(),
								index: recipeIndex,
								mealId: -1,
								note: '',
								recipeId: -1,
								recipe: {
									id: -1,
									createdAt: new Date(),
									calories: Number(meal.calories) || 0,
									creatorId: userPlan.creatorId,
									deletedAt: null,
									favouriteAt: null,
									notes: '',
									hiddenAt: null,
									updatedAt: new Date(),
									image: '',
									description: '',
									name: recipe.name || '',
									recipeCategory: '',
									isGlobal: false,
									isUserRecipe: false,
									recipeToIngredient: userPlan?.userIngredients
										.filter(
											(ingredient) =>
												ingredient.recipeIndex === recipe.recipeIndex &&
												ingredient.mealIndex === recipe.mealIndex,
										)
										?.map((ingredient, ingredientIndex) => ({
											id: -1,
											createdAt: new Date(),
											index: ingredientIndex,
											isUserCreated: false,
											note: '',
											serveSize: ingredient.serve || '',
											serveUnit: ingredient.serveUnit || '',
											recipeId: -1,
											alternateId: ingredient.alternateId,
											ingredientId: ingredient.ingredientId || -1,
											ingredient: {
												...ingredient.ingredient,
												createdAt:
													ingredient.ingredient?.createdAt || new Date(),
												updatedAt:
													ingredient.ingredient?.updatedAt || new Date(),
												favouriteAt: ingredient.ingredient?.favouriteAt || null,
												deletedAt: ingredient.ingredient?.deletedAt || null,
												hiddenAt: ingredient.ingredient?.hiddenAt || null,
												isAusFood: ingredient.ingredient?.isAusFood || false,
												isAllStores: ingredient.ingredient?.isAllStores || true,
												isUserCreated:
													ingredient.ingredient?.isUserCreated || false,
												isSupplement:
													ingredient.ingredient?.isSupplement || false,
												isPrivate: ingredient.ingredient?.isPrivate || false,
												viewableBy: ingredient.ingredient?.viewableBy || null,
												intervale: ingredient.ingredient?.intervale || null,
												userId: ingredient.ingredient?.userId || null,
												id: ingredient.ingredient?.id || -1,
												notes: '',
												ingredientToGroceryStore: [],
												serveSize: ingredient.ingredient?.serveSize || '',
												serveUnit: ingredient.ingredient?.serveUnit || '',
												publicFoodKey:
													ingredient.ingredient?.publicFoodKey || '',
												classification:
													ingredient.ingredient?.classification || '',
												foodName: ingredient.ingredient?.foodName || '',
												name: ingredient.ingredient?.name || '',
												caloriesWFibre:
													ingredient.ingredient?.caloriesWFibre || '',
												caloriesWOFibre:
													ingredient.ingredient?.caloriesWOFibre || '',
												protein: ingredient.ingredient?.protein || '',
												fatTotal: ingredient.ingredient?.fatTotal || '',
												totalDietaryFibre:
													ingredient.ingredient?.totalDietaryFibre || '',
												totalSugars: ingredient.ingredient?.totalSugars || '',
												starch: ingredient.ingredient?.starch || '',
												resistantStarch:
													ingredient.ingredient?.resistantStarch || '',
												availableCarbohydrateWithoutSugarAlcohols:
													ingredient.ingredient
														?.availableCarbohydrateWithoutSugarAlcohols || '',
												availableCarbohydrateWithSugarAlcohols:
													ingredient.ingredient
														?.availableCarbohydrateWithSugarAlcohols || '',
											},
											alternateIngredient: {
												...ingredient.alternateIngredient,
												createdAt:
													ingredient.alternateIngredient?.createdAt ||
													new Date(),
												updatedAt:
													ingredient.alternateIngredient?.updatedAt ||
													new Date(),
												favouriteAt:
													ingredient.alternateIngredient?.favouriteAt || null,
												deletedAt:
													ingredient.alternateIngredient?.deletedAt || null,
												hiddenAt:
													ingredient.alternateIngredient?.hiddenAt || null,
												isAusFood:
													ingredient.alternateIngredient?.isAusFood || false,
												isAllStores:
													ingredient.alternateIngredient?.isAllStores || true,
												isUserCreated:
													ingredient.alternateIngredient?.isUserCreated ||
													false,
												isSupplement:
													ingredient.alternateIngredient?.isSupplement || false,
												isPrivate:
													ingredient.alternateIngredient?.isPrivate || false,
												viewableBy:
													ingredient.alternateIngredient?.viewableBy || null,
												intervale: null,
												notes: '',
												userId: ingredient.alternateIngredient?.userId || null,
												id: ingredient.alternateIngredient?.id || -1,
												name: ingredient.alternateIngredient?.name || '',
												ingredientToGroceryStore: [],
												serveSize:
													ingredient.alternateIngredient?.serveSize || '',
												serveUnit:
													ingredient.alternateIngredient?.serveUnit || '',
												publicFoodKey:
													ingredient.alternateIngredient?.publicFoodKey || '',
												classification:
													ingredient.alternateIngredient?.classification || '',
												foodName:
													ingredient.alternateIngredient?.foodName || '',
												caloriesWFibre:
													ingredient.alternateIngredient?.caloriesWFibre || '',
												caloriesWOFibre:
													ingredient.alternateIngredient?.caloriesWOFibre || '',
												protein: ingredient.alternateIngredient?.protein || '',
												fatTotal:
													ingredient.alternateIngredient?.fatTotal || '',
												totalDietaryFibre:
													ingredient.alternateIngredient?.totalDietaryFibre ||
													'',
												totalSugars:
													ingredient.alternateIngredient?.totalSugars || '',
												starch: ingredient.alternateIngredient?.starch || '',
												resistantStarch:
													ingredient.alternateIngredient?.resistantStarch || '',
												availableCarbohydrateWithoutSugarAlcohols:
													ingredient.alternateIngredient
														?.availableCarbohydrateWithoutSugarAlcohols || '',
												availableCarbohydrateWithSugarAlcohols:
													ingredient.alternateIngredient
														?.availableCarbohydrateWithSugarAlcohols || '',
											},
										})),
								},
							})),
					})) || [],
			})
		}
	}, [userPlan])

	const onSetPlan = async (planId: number) => {
		setSelectedPlanId(planId)
	}

	useEffect(() => {
		if (!plan) return
		setSelectedPlan(plan)
		form.reset({
			name: plan?.name || '',
			description: plan?.description || '',
			image: plan?.image || '',
			notes: plan?.notes || '',
			meals:
				plan?.meals?.map((meal, mealIndex) => {
					const recipe = meal?.mealToRecipe?.[0]?.recipe

					// @ts-ignore
					const recipeDetails = recipe ? getRecipeDetails(recipe) : null

					return {
						mealId: mealIndex.toString(),
						mealTitle: meal.name || '',
						calories: meal.calories || '',
						targetCalories:
							(Number(meal.calories) + Number(meal.vegeCalories)).toString() ||
							'',
						targetProtein: Number(recipeDetails?.protein).toFixed(1) || '',
						vegeCalories: meal.vegeCalories || '',
						vege: meal.vege || '',
						vegeNotes: meal.vegeNotes || '',
						protein: '',
						note: '',
						recipes:
							meal?.mealToRecipe.map((recipe, recipeIndex) => ({
								recipeId: recipeIndex.toString(),
								name: recipe.recipe?.name || '',
								note: recipe.note || '',
								description: recipe.recipe?.description || '',
								index: recipe.index,
								ingredients:
									recipe?.recipe?.recipeToIngredient.map(
										(ingredient, _ingredientIndex) => {
											const serve = (
												(Number(ingredient.serveSize) * Number(meal.calories)) /
												Number(recipe.recipe?.calories)
											).toFixed(2)
											return {
												ingredientId: ingredient.ingredient?.id.toString(),
												alternateId: ingredient.alternateId?.toString() || null,
												name: ingredient.ingredient?.name || '',
												serveSize: serve,
												serveUnit: ingredient.serveUnit,
												note: ingredient.note || '',
												ingredient: {
													...ingredient.ingredient,
												},
												alternateIngredient: {
													...ingredient.alternateIngredient,
												},
											}
										},
									) || [],
							})) || [],
					}
				}) || [],
		})
	}, [plan])

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		if (userPlan) finishPlan(userPlan.id)
		console.log('data', data)
		createPlan({
			name: data.name,
			description: data.description,
			image: '',
			notes: data.notes,
			meals: data.meals.map((meal, mealIndex) => ({
				mealIndex: mealIndex,
				mealTitle: meal.mealTitle,
				calories: meal.calories,
				targetCalories: meal.targetCalories,
				targetProtein: meal.targetProtein,
				vegeCalories: meal.vegeCalories,
				veges: meal.vege,
				vegeNotes: meal.vegeNotes,
				protein: meal.protein?.toString(),
				note: meal.note || '',
				recipes: meal?.recipes.map((recipe, recipeIndex) => ({
					recipeIndex: recipeIndex,
					mealIndex: mealIndex,
					name: recipe.name || '',
					note: recipe.note || '',
					description: recipe.description || '',
					index: recipe.index,
					ingredients: recipe?.ingredients.map(
						(ingredient, ingredientIndex) => ({
							ingredientId: Number(ingredient.ingredientId),
							ingredientIndex: ingredientIndex,
							recipeIndex: recipeIndex,
							mealIndex: mealIndex,
							name: ingredient.name || '',
							serve: ingredient.serveSize,
							serveUnit: ingredient.serveUnit,
							alternateId:
								ingredient.alternateId === '' ||
								ingredient.alternateId === '0' ||
								ingredient.alternateId === null
									? null
									: Number(ingredient.alternateId),
							note: ingredient.note || '',
						}),
					),
				})),
			})),
			userId: userId,
		})
	}

	if (userId === '') return <div>Select a user</div>

	if (planLoading) return <Spinner />

	return (
		<div className='flex flex-col my-12 w-full max-w-screen-xl'>
			<div className={cn('flex gap-8 items-center', userPlan ? 'hidden' : '')}>
				<PlanFolders
					selectedPlan={selectedPlanId}
					onSetPlan={onSetPlan}
					userId={userAdmin?.id}
				/>
			</div>
			{selectedPlan === null && userPlan === null ? null : (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className='flex flex-col lg:gap-2'>
							<div className='flex justify-between w-full'>
								<Button type='submit' className=''>
									Save
								</Button>
								<Button
									variant='outline'
									className='flex items-center'
									onMouseDown={(e) => {
										e.preventDefault()
										setSelectedPlanId(0)
										setSelectedPlan(null)
										form.reset()
									}}
								>
									<Undo2 size={20} className='mr-1 mb-1' />
									Back
								</Button>
							</div>
							<div className='flex flex-col justify-between lg:flex-row lg:gap-8'>
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
									name='description'
									render={({ field }) => (
										<FormItem className='w-full'>
											<FormLabel>Description</FormLabel>
											<FormControl>
												<Input
													placeholder='Description'
													{...field}
													type='text'
												/>
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
							<div className='flex flex-col gap-2 mt-4'>
								<div className='flex flex-col gap-3 rounded-lg'>
									{mealsField.fields.map((field, index) => (
										<Meal
											key={field.mealId}
											index={index}
											form={form}
											meal={field}
											plan={selectedPlan}
											mealsField={mealsField}
										/>
									))}
								</div>
							</div>
							<div className='flex justify-center my-8 w-full'>
								<Button
									onClick={(e) => {
										e.preventDefault()
										mealsField.append({
											mealId: (mealsField.fields.length + 1).toString(),
											mealTitle: (mealsField.fields.length + 1).toString(),
											calories: '500',
											targetCalories: '',
											targetProtein: '',
											vege: '',
											vegeCalories: '',
											vegeNotes: '',
											protein: '',
											note: '',
											recipes: [],
										})
									}}
								>
									Add Meal
									<PlusCircle size={20} className='mb-1 ml-4' />
								</Button>
							</div>
							<div className='my-8'>
								<Button type='submit'>Save</Button>
							</div>
						</div>
					</form>
				</Form>
			)}
		</div>
	)
}

export { CreateUserPlan }
