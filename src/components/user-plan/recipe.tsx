'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { cn, getRecipeDetailsForUserPlan } from '@/lib/utils'
import { toast } from 'sonner'
import type { GetPlanById } from '@/types'
import {
	CircleMinus,
	CirclePlus,
	EllipsisVertical,
	XCircle,
} from 'lucide-react'
import {
	useFieldArray,
	type UseFieldArrayReturn,
	type UseFormReturn,
} from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu'
import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { VirtualizedCombobox } from '@/components/ui/virtualized-combobox'

import type { formSchema } from './create-user-plan'

export const dynamic = 'force-dynamic'

const Ingredient = ({
	form,
	ingredientIndex,
	recipeIndex,
	mealIndex,
	ingredientsSize,
	setIngredientsSize,
	ingredientsField,
}: {
	form: UseFormReturn<z.infer<typeof formSchema>>
	ingredientIndex: number
	recipeIndex: number
	mealIndex: number
	setIngredientsSize: React.Dispatch<React.SetStateAction<number[]>>
	ingredientsSize: number[]
	ingredientsField: UseFieldArrayReturn<z.infer<typeof formSchema>['meals']>
}) => {
	const ingredient = form.watch(
		`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}`,
	)

	const [isOpen, setIsOpen] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)
	const [selectedAlt, setSelectedAlt] = useState<string | null>(null)

	useEffect(() => {
		setSelected(ingredient?.ingredientId)
		setSelectedAlt(ingredient?.alternateId)
	}, [ingredient])

	const { data: allIngredients } = api.ingredient.getAll.useQuery()

	const size = form.watch(
		`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`,
	)
	const unit = form.watch(
		`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveUnit`,
	)
	useEffect(() => {
		setIngredientsSize((prev) => {
			return prev.map((curr, index) => {
				if (index === ingredientIndex) {
					return Number(size)
				}
				return curr
			})
		})
	}, [size])

	const ratio = Number(size) / Number(ingredient?.ingredient?.serveSize)

	return (
		<div className='flex flex-col gap-1'>
			<div className='grid relative grid-cols-8 items-center md:grid-cols-10 md:gap-1 text-muted-foreground'>
				<div className='col-span-2 md:col-span-4 md:ml-2'>
					{ingredient?.name}
				</div>
				<FormField
					control={form.control}
					name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`}
					render={({ field }) => (
						<FormItem className='col-span-2 w-full'>
							<FormControl>
								<div className='flex gap-2 justify-between items-center px-2 w-full'>
									<CircleMinus
										size={20}
										className='hidden transition-transform cursor-pointer md:block hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
										onClick={() => {
											field.onChange(
												(Math.ceil(Number(field.value)) - 1).toString(),
											)
										}}
									/>
									<Input
										placeholder=''
										type='number'
										{...field}
										onChange={(e) => {
											field.onChange(e)
										}}
									/>
									<CirclePlus
										size={20}
										className='hidden transition-transform cursor-pointer md:block hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
										onClick={() => {
											field.onChange(
												(Math.floor(Number(field.value)) + 1).toString(),
											)
										}}
									/>
									<div className='w-12 text-xs'>
										{unit === 'each' ? 'ea' : unit === 'grams' ? 'g' : unit}
									</div>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='place-self-center'>
					{(Number(ingredient.ingredient.caloriesWOFibre) * ratio).toFixed(1)}
				</div>
				<div className='place-self-center'>
					{(Number(ingredient.ingredient.protein) * ratio).toFixed(1)}
				</div>
				<div className='place-self-center'>
					{(
						Number(
							ingredient.ingredient.availableCarbohydrateWithSugarAlcohols,
						) * ratio
					).toFixed(1)}
				</div>
				<div className='place-self-center'>
					{(Number(ingredient.ingredient.fatTotal) * ratio).toFixed(1)}
				</div>

				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<EllipsisVertical
								size={20}
								className={cn(
									'text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90',
									' transition-transform cursor-pointer shrink-0 absolute right-2 top-1/2 -translate-y-1/2',
								)}
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Action</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DialogTrigger asChild>
								<DropdownMenuItem>Edit</DropdownMenuItem>
							</DialogTrigger>
							<DropdownMenuItem
								onSelect={(e) => {
									e.preventDefault()
									ingredientsField.remove(ingredientIndex)
									setIngredientsSize(
										ingredientsSize.filter((_, i) => i !== ingredientIndex),
									)
								}}
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
						<DialogContent className='top-[30%] max-w-2xl'>
							<DialogHeader className='col-span-3 mb-6'>
								<DialogTitle>Add a new ingredient</DialogTitle>
								<DialogDescription>
									Select an ingredient to add to this recipe
								</DialogDescription>
							</DialogHeader>
							<div className='flex flex-col gap-2 w-full'>
								<div className='flex flex-col gap-2 w-full'>
									<h2 className='font-semibold'>Ingredient</h2>
									{!allIngredients ? null : (
										<div className='flex col-span-3 gap-2 items-center mb-8 w-full lg:w-content'>
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
												selectedOption={selected ?? ''}
												onSelectOption={(value) => {
													setSelected(value)
												}}
											/>

											<XCircle
												size={28}
												className='text-secondary-foreground shrink-0'
												onClick={() => {
													setSelected(null)
												}}
											/>
										</div>
									)}
								</div>
								<div className='flex flex-col gap-2 w-full'>
									<h2 className='font-semibold'>Alt Ingredient</h2>
									{!allIngredients ? null : (
										<div className='flex col-span-3 gap-2 items-center mb-8 w-full lg:w-content'>
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
												selectedOption={selectedAlt ?? ''}
												onSelectOption={(value) => {
													setSelectedAlt(value)
												}}
											/>

											<XCircle
												size={18}
												className='text-secondary-foreground shrink-0'
												onClick={() => {
													setSelectedAlt(null)
												}}
											/>
										</div>
									)}
								</div>
							</div>
							<div className='flex col-span-3 gap-4 justify-center w-full'>
								<Button
									onClick={(e) => {
										e.preventDefault()
										const newIngredient = allIngredients?.find(
											(i) => i.id === Number(selected),
										)
										const newAltIngredient = allIngredients?.find(
											(i) => i.id === Number(selectedAlt),
										)
										if (!newIngredient) return
										if (!selected) return
										form.setValue(
											`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.ingredientId`,
											selected,
											{ shouldTouch: true },
										)
										form.setValue(
											`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.name`,
											newIngredient.name ?? 'error',
											{ shouldTouch: true },
										)
										form.setValue(
											`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.alternateId`,
											selectedAlt ?? null,
											{ shouldTouch: true },
										)

										// @ts-ignore
										form.setValue(
											`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.ingredient`,
											{ ...newIngredient },
											{ shouldTouch: true },
										)
										// @ts-ignore
										form.setValue(
											`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.alternateIngredient`,
											{ ...newAltIngredient },
											{ shouldTouch: true },
										)

										setIsOpen(false)
									}}
								>
									Save
								</Button>
								<Button
									onClick={(e) => {
										e.preventDefault()
										setIsOpen(false)
									}}
								>
									cancel
								</Button>
							</div>
						</DialogContent>
					</DropdownMenu>
				</Dialog>
			</div>
			{ingredient.alternateId && ingredient.alternateIngredient ? (
				<div className='grid grid-cols-10 gap-1 items-center text-xs text-muted-foreground'>
					<div className='col-span-4 ml-4 truncate'>
						or {ingredient.alternateIngredient?.name}
					</div>
					<div className='col-span-2 place-self-center text-xs'>
						{(
							((Number(ingredient.ingredient.caloriesWOFibre) * ratio) /
								Number(ingredient.alternateIngredient?.caloriesWOFibre)) *
							Number(ingredient.alternateIngredient?.serveSize)
						).toFixed(1)}
						g
					</div>
				</div>
			) : null}
		</div>
	)
}

const Recipe = ({
	form,
	mealIndex,
	recipeIndex,
	plan,
	calories,
	recipesField,
	recipe,
}: {
	form: UseFormReturn<z.infer<typeof formSchema>>
	mealIndex: number
	recipeIndex: number
	plan: GetPlanById
	calories: string
	recipesField: UseFieldArrayReturn
	recipe: any
}) => {
	const { data: allIngredients } = api.ingredient.getAll.useQuery()

	const ingredientsField = useFieldArray({
		control: form.control,
		name: `meals.${mealIndex}.recipes.${recipeIndex}.ingredients`,
	})
	const mealsField = useFieldArray({
		control: form.control,
		name: `meals`,
	})

	const ctx = api.useUtils()
	const { mutate: createRecipe } = api.recipe.create.useMutation({
		onSuccess: () => {
			ctx.recipe.invalidate()
			toast.success('Recipe saved')
		},
	})

	const mealsLength = mealsField.fields.length

	const [ingredientsSize, setIngredientsSize] = useState<number[]>(
		() =>
			recipe.ingredients.map((ingredient) => Number(ingredient?.serveSize)) ||
			[],
	)
	const [selected, setSelected] = useState<string | null>(null)
	const [selectedAlt, setSelectedAlt] = useState<string | null>(null)
	const [isOpen, setIsOpen] = useState(false)

	const formRecipe = form.watch(`meals.${mealIndex}.recipes.${recipeIndex}`)

	// const recipeDetails = getRecipeDetailsForUserPlan(recipe, ingredientsSize)
	const recipeDetails = getRecipeDetailsForUserPlan(formRecipe, ingredientsSize)

	// if (
	// 	form.watch(`meals.${mealIndex}.recipes.${recipeIndex}`).recipeId === '4829'
	// ) {
	// 	console.log('recipe', formRecipe)
	// 	console.log('ingredientsSize', ingredientsSize)
	// }

	return (
		<div className='flex relative flex-col gap-1 p-2 rounded-md border bg-card'>
			<div className='flex justify-between items-baseline'>
				<div className='text-base font-medium text-muted-foreground'>
					Recipe {recipeIndex + 1}
				</div>
				<div className='text-sm text-muted-foreground'>
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<EllipsisVertical
									size={22}
									className={cn(
										'text-foreground/90 hover:text-foreground hover:scale-110 active:scale-90',
										' transition-transform cursor-pointer shrink-0',
									)}
								/>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Action</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem
									onMouseDown={(e) => {
										recipesField.remove(recipeIndex)
									}}
								>
									Delete
								</DropdownMenuItem>
								<DropdownMenuItem
									onMouseDown={(e) => {
										e.preventDefault()
										createRecipe({
											name: formRecipe.name,
											description: formRecipe.description,
											image: '',
											notes: '',
											recipeCategory: '',
											calories: Number(recipeDetails.cals),
											ingredients: formRecipe.ingredients.map((i, idx) => {
												return {
													index: idx,
													ingredientId: Number(i.ingredientId),
													note: i.note,
													serveSize: i.serveSize,
													serveUnit: i.serveUnit,
													alternateId: i.alternateId || '',
												}
											}),
										})
									}}
								>
									Save to Recipes
								</DropdownMenuItem>
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Duplicate</DropdownMenuSubTrigger>
									<DropdownMenuSubContent>
										<DropdownMenuItem
											onMouseDown={(e) => {
												e.preventDefault()
												recipesField.append({
													recipeId: formRecipe.recipeId,
													name: formRecipe.name + '-copy' || '',
													note: '',
													description: formRecipe.description || '',
													index: recipesField.fields.length,
													ingredients: formRecipe.ingredients.map(
														(ingredient, _ingredientIndex) => {
															return {
																ingredientId:
																	ingredient.ingredientId.toString(),
																alternateId:
																	ingredient.alternateId?.toString() || null,
																name: ingredient.name || '',
																serveSize: ingredient.serveSize || '',
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
													),
												})
											}}
										>
											This Meal
										</DropdownMenuItem>
										<DropdownMenuSub>
											<DropdownMenuSubTrigger
												onClick={(e) => {
													console.log(mealIndex)
												}}
											>
												Other Meal
											</DropdownMenuSubTrigger>
											<DropdownMenuSubContent>
												{Array.from({ length: mealsLength }, (_, i) => i)
													.filter((i) => i !== mealIndex)
													.map((i) => (
														<DropdownMenuItem
															key={i}
															onMouseDown={(e) => {
																e.preventDefault()
																// @ts-ignore
																const recipeData = {
																	recipeId: formRecipe.recipeId,
																	name: formRecipe.name || '',
																	note: '',
																	description: formRecipe.description || '',
																	index: recipesField.fields.length,
																	ingredients: formRecipe.ingredients.map(
																		(ingredient, _ingredientIndex) => {
																			return {
																				ingredientId:
																					ingredient.ingredientId.toString(),
																				alternateId:
																					ingredient.alternateId?.toString() ||
																					null,
																				name: ingredient.name || '',
																				serveSize: ingredient.serveSize || '',
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
																	),
																}
																const currentRecipes = form.getValues(
																	`meals.${i}.recipes`,
																)
																form.setValue(`meals.${i}.recipes`, [
																	...currentRecipes,
																	{
																		...recipeData,
																	},
																])
															}}
														>
															{i + 1}
														</DropdownMenuItem>
													))}
											</DropdownMenuSubContent>
										</DropdownMenuSub>
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</DropdownMenuContent>
							<DialogContent className='top-[30%] max-w-2xl'>
								<DialogHeader className='col-span-3 mb-6'>
									<DialogTitle>Add a new ingredient</DialogTitle>
									<DialogDescription>
										Select an ingredient to add to this recipe
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</DropdownMenu>
					</Dialog>
				</div>
			</div>
			<div className='grid grid-cols-8 place-items-center capitalize md:grid-cols-10 md:gap-1'>
				<div className='col-span-2 md:col-span-4' />
				<div className='col-span-2 place-self-center'>size</div>
				<div>cals</div>
				<div>protein</div>
				<div>carbs</div>
				<div>fat</div>
			</div>
			<div className='grid grid-cols-8 font-bold md:grid-cols-10 md:gap-1'>
				<div className='flex col-span-2 gap-2 justify-between items-center md:col-span-4'>
					<FormField
						control={form.control}
						name={`meals.${mealIndex}.recipes.${recipeIndex}.name`}
						render={({ field }) => (
							<FormItem className='col-span-2 w-full'>
								<FormControl>
									<Input
										placeholder=''
										{...field}
										onChange={(e) => {
											field.onChange(e)
										}}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='col-span-2 place-self-center' />
				<div className='place-self-center px-6 text-center rounded-full bg-secondary'>
					{recipeDetails.cals}
				</div>
				<div className='place-self-center px-6 text-center rounded-full bg-secondary'>
					{recipeDetails.protein}
				</div>
				<div className='place-self-center px-6 text-center rounded-full bg-secondary'>
					{recipeDetails.carbs}
				</div>
				<div className='place-self-center px-6 text-center rounded-full bg-secondary'>
					{recipeDetails.fat}{' '}
				</div>
			</div>
			{ingredientsField.fields.map((ingredient, ingredientIndex) => (
				<Ingredient
					key={ingredient.ingredientId}
					form={form}
					ingredientIndex={ingredientIndex}
					recipeIndex={recipeIndex}
					mealIndex={mealIndex}
					setIngredientsSize={setIngredientsSize}
					ingredientsSize={ingredientsSize}
					// @ts-ignore
					ingredientsField={ingredientsField}
				/>
			))}
			<div className='flex justify-center mt-4 w-full'>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<CirclePlus
							size={20}
							strokeWidth={3}
							className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
						/>
					</DialogTrigger>
					<DialogContent className='top-[30%] max-w-2xl'>
						<DialogHeader className='col-span-3 mb-6'>
							<DialogTitle>Add a new ingredient</DialogTitle>
							<DialogDescription>
								Select an ingredient to add to this recipe
							</DialogDescription>
						</DialogHeader>
						<div className='flex flex-col gap-2 w-full'>
							<div className='flex flex-col gap-2 w-full'>
								<h2 className='font-semibold'>Ingredient</h2>
								{!allIngredients ? null : (
									<div className='flex col-span-3 gap-2 items-center mb-8 w-full lg:w-content'>
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
											selectedOption={selected ?? ''}
											onSelectOption={(value) => {
												setSelected(value)
											}}
										/>

										<XCircle
											size={18}
											className='text-secondary-foreground shrink-0'
											onClick={() => {
												setSelected(null)
											}}
										/>
									</div>
								)}
							</div>
							<div className='flex flex-col gap-2 w-full'>
								<h2 className='font-semibold'>Alt Ingredient</h2>
								{!allIngredients ? null : (
									<div className='flex col-span-3 gap-2 items-center mb-8 w-full lg:w-content'>
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
											selectedOption={selectedAlt ?? ''}
											onSelectOption={(value) => {
												setSelectedAlt(value)
											}}
										/>

										<XCircle
											size={18}
											className='text-secondary-foreground shrink-0'
											onClick={() => {
												setSelected(null)
											}}
										/>
									</div>
								)}
							</div>
						</div>
						<div className='flex col-span-3 gap-4 justify-center w-full'>
							<Button
								onClick={(e) => {
									e.preventDefault()
									const newIngredient = allIngredients?.find(
										(i) => i.id === Number(selected),
									)
									const newAltIngredient = allIngredients?.find(
										(i) => i.id === Number(selectedAlt),
									)
									if (!newIngredient) return
									ingredientsField.append({
										ingredientId: newIngredient.id.toString(),
										alternateId: selectedAlt ?? null,
										// @ts-ignore
										ingredient: {
											...newIngredient,
										},
										alternateIngredient: {
											...newAltIngredient,
										},
										name: newIngredient?.name || '',
										serveSize: '',
										serveUnit: newIngredient?.serveUnit || '',
										note: '',
									})
									setSelected(null)
									setSelectedAlt(null)
									setIsOpen(false)
									setIngredientsSize([...ingredientsSize, 0])
								}}
							>
								Add
							</Button>
							<Button
								onClick={(e) => {
									e.preventDefault()
									setIsOpen(false)
								}}
							>
								cancel
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

export { Recipe }
