'use client'

import { Switch } from '@/components/ui/switch'
import { api } from '@/trpc/react'

import { useState } from 'react'

import { balanceRecipe, cn } from '@/lib/utils'
import type { GetPlanById } from '@/types'
import {
	Check,
	ChevronsUpDown,
	CircleMinus,
	CirclePlus,
	EllipsisVertical,
} from 'lucide-react'
import {
	useFieldArray,
	type UseFieldArrayReturn,
	type UseFormReturn,
} from 'react-hook-form'
import type { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
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
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import { v4 as uuidv4 } from 'uuid'

import type { formSchema } from './create-user-plan'
import { Recipe } from './recipe'

export const dynamic = 'force-dynamic'

const Meal = ({
	form,
	index,
	plan,
	mealsField,
	meal,
}: {
	form: UseFormReturn<z.infer<typeof formSchema>>
	index: number
	plan: GetPlanById
	mealsField: UseFieldArrayReturn
	meal: any
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [cmdIsOpen, setCmdIsOpen] = useState(false)
	const [selectValue, setSelectValue] = useState('')
	const [calories, setCalories] = useState(plan?.meals[index]?.calories || '')
	const formCals = form.watch(`meals.${index}.calories`)
	const formProtien = form.watch(`meals.${index}.protein`)
	const formVege = form.watch(`meals.${index}.vege`)

	const [isVege, setIsVege] = useState(() => formVege !== '')

	const resetMeal = () => {
		form.resetField(`meals.${index}`)
	}

	const formMeal = form.watch(`meals.${index}`)

	const balanceCals = () => {
		form.setValue(`meals.${index}.targetCalories`, formCals)
		for (const [recipeIndex, recipe] of formMeal.recipes.entries()) {
			if (recipe.ingredients && recipe.ingredients?.length > 0) {
				const cals = recipe.ingredients.reduce((acc, curr) => {
					const c =
						(Number(curr.serveSize) / Number(curr.ingredient.serveSize)) *
						Number(curr.ingredient.caloriesWOFibre)
					return acc + c
				}, 0) as number
				console.log('cals', cals)
				for (const [
					ingredientIndex,
					ingredient,
				] of recipe.ingredients.entries()) {
					const serve = (
						(Number(ingredient.serveSize) * Number(calories)) /
						cals
					).toFixed(2)
					form.setValue(
						`meals.${index}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`,
						serve,
					)
				}
			}
		}
	}
	const balanceCalsProtien = () => {
		if (Number(formProtien) === 0) return
		form.setValue(`meals.${index}.targetCalories`, formCals)
		form.setValue(`meals.${index}.targetProtein`, formProtien || '')

		console.log('meal', meal)
		console.log('formMeal', formMeal)
		for (const [recipeIndex, recipe] of formMeal.recipes.entries()) {
			console.log('recipe', recipeIndex, recipe)
			const calsPerGram = recipe.ingredients.map(
				(ingredient) =>
					Number(ingredient.ingredient.caloriesWOFibre) /
					Number(ingredient.ingredient.serveSize),
			)
			const proteinPerGram = recipe.ingredients.map(
				(ingredient) =>
					Number(ingredient.ingredient.protein) /
					Number(ingredient.ingredient.serveSize),
			)
			const carbsPerGram = recipe.ingredients.map(
				(ingredient) =>
					Number(ingredient.ingredient.availableCarbohydrateWithSugarAlcohols) /
					Number(ingredient.ingredient.serveSize),
			)
			if (!calsPerGram || !proteinPerGram || !carbsPerGram) {
				console.log('calsPerGram, proteinPerGram, carbsPerGram is null')
				continue
			}
			if (calsPerGram.length === 2 && proteinPerGram.length === 2) {
				console.log('length is 2')
				try {
					const serve = balanceRecipe(
						proteinPerGram,
						calsPerGram,
						Number(formProtien),
						Number(formCals),
					)
					if (!serve) {
						console.log('serve is null')
						continue
					}
					if (serve.length !== 2) {
						console.log('serve length is not 2')
						continue
					}
					const value1 = Number(serve[0]).toFixed(2)
					const value2 = Number(serve[1]).toFixed(2)
					form.setValue(
						`meals.${index}.recipes.${recipeIndex}.ingredients.0.serveSize`,
						// @ts-ignore
						value1,
					)
					form.setValue(
						`meals.${index}.recipes.${recipeIndex}.ingredients.1.serveSize`,
						// @ts-ignore
						value2,
					)
				} catch (error) {
					console.log('error', error)
				}
			} else {
				if (calsPerGram.length === 1) continue
				if (proteinPerGram.length === 1) continue

				const indexCals = carbsPerGram.findIndex(
					(cals) => cals === Math.max(...carbsPerGram),
				)
				const indexProtein = proteinPerGram.findIndex(
					(protein) => protein === Math.max(...proteinPerGram),
				)
				const indexs = calsPerGram
					.map((_, i) => i)
					.filter((i) => !(i === indexCals || i === indexProtein))

				const calsToRemove = calsPerGram.reduce((acc, curr, i) => {
					if (indexs.includes(i)) {
						return (
							acc +
							Number(
								form.getValues(
									`meals.${index}.recipes.${recipeIndex}.ingredients.${i}.serveSize`,
								),
							) *
								Number(curr)
						)
					}
					return acc
				}, 0)
				const proteinToRemove = proteinPerGram.reduce((acc, curr, i) => {
					if (indexs.includes(i)) {
						return (
							acc +
							Number(
								form.getValues(
									`meals.${index}.recipes.${recipeIndex}.ingredients.${i}.serveSize`,
								),
							) *
								Number(curr)
						)
					}
					return acc
				}, 0)

				if (indexCals === -1 || indexProtein === -1) return
				if (indexCals === indexProtein) return
				try {
					const serve = balanceRecipe(
						proteinPerGram.filter(
							(_, i) => i === indexProtein || i === indexCals,
						),
						calsPerGram.filter((_, i) => i === indexProtein || i === indexCals),
						Number(formProtien) - proteinToRemove,
						Number(formCals) - calsToRemove,
					)
					if (!serve) return
					if (serve.length !== 2) return
					const value1 = Number(serve[0]).toFixed(2)
					const value2 = Number(serve[1]).toFixed(2)
					const i = calsPerGram
						.map((_, i) => i)
						.filter((i) => i === indexCals || i === indexProtein)
					const index1 = i[0] as number
					const index2 = i[1] as number
					form.setValue(
						`meals.${index}.recipes.${recipeIndex}.ingredients.${index1}.serveSize`,
						// @ts-ignore
						value1,
					)
					form.setValue(
						`meals.${index}.recipes.${recipeIndex}.ingredients.${index2}.serveSize`,
						// @ts-ignore
						value2,
					)
				} catch (error) {
					console.log('error', error)
				}
			}
		}
	}

	const { data: userAdmin } = api.user.isUser.useQuery()
	const { data: _recipesData } = api.recipe.getAll.useQuery()
	const { data: _yourRecipes } = api.recipe.getAllUserCreated.useQuery({
		userId: userAdmin?.id || '',
	})

	const [isAllRecipes, setIsAllRecipes] = useState(false)
	const recipesData = _recipesData?.filter((recipe) => {
		if (recipe.hiddenAt === null) return true
		return false
	})
	const yourRecipes = _yourRecipes?.filter((recipe) => {
		if (recipe.hiddenAt === null) return true
		return false
	})

	// if (selectValue !== '') {
	// 	console.log(
	// 		'recipesData',
	// 		recipesData?.find((r) => r.id === Number(selectValue)),
	// 	)
	// }

	const recipeField = useFieldArray({
		control: form.control,
		name: `meals.${index}.recipes`,
	})

	return (
		<Card className='gap-2 pt-2 pb-2 bg-background'>
			<CardHeader className='flex flex-row justify-between items-center py-2 bg-background'>
				<CardTitle className='text-xl font-semibold'>
					Meal {index + 1}
				</CardTitle>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<EllipsisVertical
							size={24}
							strokeWidth={3}
							className={cn(
								' hover:text-foreground/70 hover:scale-110 active:scale-90',
								' transition-transform cursor-pointer shrink-0',
							)}
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Action</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className='cursor-pointer'
							onSelect={() => {
								resetMeal()
							}}
						>
							Reset
						</DropdownMenuItem>
						<DropdownMenuItem
							className='cursor-pointer'
							onSelect={() => {
								console.log('meal', meal)
								mealsField.insert(index + 1, {
									mealId: (
										mealsField.fields.length +
										1 +
										Math.random()
									).toString(),
									mealTitle: meal.mealTitle,
									calories: meal.calories,
									targetCalories: meal.targetCalories,
									targetProtein: meal.targetProtein,
									vege: '',
									vegeCalories: '',
									vegeNotes: '',
									protein: meal.protein,
									note: meal.note,
									recipes: [...meal.recipes],
								})
							}}
						>
							Duplicate Meal
						</DropdownMenuItem>
						<DropdownMenuItem
							className='cursor-pointer'
							onSelect={() => {
								mealsField.insert(index + 1, {
									mealId: (
										mealsField.fields.length +
										1 +
										Math.random()
									).toString(),
									mealTitle: 'New Meal',
									calories: '500',
									targetCalories: '500',
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
							Add New Meal
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger className='cursor-pointer'>
								Move to
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								{[...Array(mealsField.fields.length)].map((_, i) => (
									<DropdownMenuItem
										key={i}
										className={cn(
											'cursor-pointer',
											i === index ? 'text-accent' : '',
										)}
										disabled={i === index}
										onSelect={() => {
											mealsField.move(index, i)
										}}
									>
										{i + 1}
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className='cursor-pointer'
							onSelect={() => {
								mealsField.remove(index)
							}}
						>
							Delete Meal
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</CardHeader>
			<CardContent className='flex flex-col gap-2 py-0 px-1 w-full lg:px-4 bg-background'>
				<div className='flex flex-col lg:flex-row lg:gap-2 lg:items-center'>
					<FormField
						control={form.control}
						name={`meals.${index}.mealTitle`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder='Title' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`meals.${index}.targetCalories`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Target Calories</FormLabel>
								<FormControl>
									<Input placeholder='Calories' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`meals.${index}.targetProtein`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Target Protein</FormLabel>
								<FormControl>
									<Input placeholder='Protein' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name={`meals.${index}.note`}
						render={({ field }) => (
							<FormItem className='w-full'>
								<FormLabel>Note</FormLabel>
								<FormControl>
									<Input placeholder='Notes' {...field} type='text' />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='flex gap-4 items-center w-full tracking-tighter'>
					<div className='flex flex-row gap-2 items-center'>
						<Label>Veg</Label>
						<Checkbox
							checked={isVege}
							onCheckedChange={(e) => {
								setIsVege(e === true)
								if (e === true) {
									form.setValue(
										`meals.${index}.vege`,
										'Lettuce, Onion, Green Beans, Zucchini, Kale, Spinach, Broccoli, Cauliflower, Capsicum, Cucumber',
									)
									form.setValue(`meals.${index}.vegeCalories`, '50')
									form.setValue(`meals.${index}.vegeNotes`, '2 Cups')
								} else {
									form.setValue(`meals.${index}.vegeCalories`, '')
									form.setValue(`meals.${index}.vege`, '')
									form.setValue(`meals.${index}.vegeNotes`, '')
								}
							}}
						/>
					</div>
					<div
						className={cn(
							'flex gap-2 items-center w-full',
							!isVege && 'hidden',
						)}
					>
						<FormField
							control={form.control}
							name={`meals.${index}.vege`}
							render={({ field }) => (
								<FormItem className='w-full'>
									<FormLabel>Veg</FormLabel>
									<FormControl>
										<Input placeholder='Veg' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`meals.${index}.vegeCalories`}
							render={({ field }) => (
								<FormItem className=''>
									<FormLabel>Veg Calories</FormLabel>
									<FormControl>
										<Input placeholder='Veg Calories' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`meals.${index}.vegeNotes`}
							render={({ field }) => (
								<FormItem className=''>
									<FormLabel>Veg Notes</FormLabel>
									<FormControl>
										<Input placeholder='Notes' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-2 items-center w-full md:grid-cols-5'>
					<div className='flex flex-col col-span-2 gap-2 w-full md:col-span-1'>
						<div className='flex flex-col gap-2 py-4 px-2 w-full rounded-md border border-border'>
							<div className='flex flex-col gap-1 items-center'>
								<Label>Calories</Label>
								<div className='flex gap-4 justify-between items-center w-full'>
									<CircleMinus
										size={24}
										className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
										onClick={() => {
											setCalories((Number(calories) - 1).toString())
											form.setValue(
												`meals.${index}.calories`,
												(Number(calories) - 1).toString(),
											)
										}}
									/>
									<Input
										placeholder='Calories'
										type='number'
										value={calories}
										onChange={(e) => {
											setCalories(e.target.value)
											form.setValue(`meals.${index}.calories`, e.target.value)
										}}
									/>
									<CirclePlus
										size={24}
										className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
										onClick={() => {
											setCalories((Number(calories) + 1).toString())
											form.setValue(
												`meals.${index}.calories`,
												(Number(calories) + 1).toString(),
											)
										}}
									/>
								</div>
							</div>
							<FormField
								control={form.control}
								name={`meals.${index}.protein`}
								render={({ field }) => (
									<FormItem className='flex flex-col items-center'>
										<FormLabel className=''>Protein</FormLabel>
										<FormControl>
											<div className='flex gap-4 justify-between items-center w-full'>
												<CircleMinus
													size={24}
													className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
													onClick={() =>
														field.onChange(Number(field.value) - 1)
													}
												/>
												<Input placeholder='Protein' {...field} type='number' />
												<CirclePlus
													size={24}
													className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
													onClick={() =>
														field.onChange(Number(field.value) + 1)
													}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								variant='outline'
								onClick={(e) => {
									e.preventDefault()
									balanceCals()
								}}
							>
								Balance Cals
							</Button>
							<Button
								variant='outline'
								onClick={(e) => {
									e.preventDefault()
									balanceCalsProtien()
								}}
							>
								Balance Cal+Protein
							</Button>
						</div>
					</div>

					<div className='flex flex-col col-span-4 gap-4 text-sm tracking-tighter select-none md:text-base md:tracking-tight'>
						{recipeField.fields.map((recipe, recipeIndex) => (
							<Recipe
								key={recipe.name}
								form={form}
								mealIndex={index}
								recipeIndex={recipeIndex}
								plan={plan}
								calories={formCals}
								recipe={recipe}
								recipesField={recipeField}
							/>
						))}
						<div className='flex justify-center my-1 w-full'>
							<Dialog
								open={isOpen}
								onOpenChange={(open) => {
									setIsOpen(open)
								}}
							>
								<DialogTrigger asChild>
									<Button
										onMouseDown={(e) => {
											e.preventDefault()
											setIsOpen(true)
										}}
									>
										Add Recipe
										<CirclePlus size={20} className='mb-1 ml-4' />
									</Button>
								</DialogTrigger>
								<DialogContent className='top-[20%]'>
									<DialogHeader>
										<DialogTitle>Add a recipe</DialogTitle>
										<DialogDescription>
											Select a recipe to add to this meal
										</DialogDescription>
									</DialogHeader>

									<div className='flex gap-2 items-center w-full max-w-md'>
										<Popover
											modal={true}
											open={cmdIsOpen}
											onOpenChange={setCmdIsOpen}
										>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant='outline'
														role='combobox'
														className={cn(
															'w-full justify-between shadow-none border-none',
															!selectValue && 'text-muted-foreground',
														)}
													>
														{selectValue
															? selectValue === 'blank'
																? 'Blank'
																: recipesData?.find(
																		(recipe) =>
																			recipe.id.toString() === selectValue,
																	)?.name
															: 'Select recipe'}
														<ChevronsUpDown
															className='opacity-50'
															strokeWidth={1}
														/>
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent className='p-0 w-[800px] max-w-[100vw]'>
												<Command
													filter={(_value, search, keywords) => {
														const extendValue =
															keywords?.join(' ').toLowerCase() || ''
														if (extendValue.includes(search)) return 1
														return 0
													}}
												>
													<div className='relative w-full'>
														<CommandInput
															placeholder='Search recipes...'
															className='h-9'
														/>
														<div className='absolute top-2 right-2 z-100'>
															<div className='flex gap-1 mb-2 w-full text-sm font-semibold z-100 text-muted-foreground/50'>
																<div
																	className={cn(
																		isAllRecipes ? '' : 'text-foreground',
																	)}
																>
																	My Recipes
																</div>
																<Switch
																	onCheckedChange={setIsAllRecipes}
																	checked={isAllRecipes}
																	className='data-[state=unchecked]:bg-foreground data-[state=checked]:bg-foreground'
																/>
																<div
																	className={cn(
																		isAllRecipes ? 'text-foreground' : '',
																	)}
																>
																	All Recipes
																</div>
															</div>
														</div>
													</div>
													<CommandList className='w-[800px] max-h-[500px] max-w-[100vw]'>
														<CommandEmpty>...</CommandEmpty>
														<CommandGroup>
															<CommandItem
																value={`blank`}
																className={cn(
																	'grid grid-cols-10',
																	'blank' === selectValue ? 'bg-muted' : '',
																)}
																onSelect={() => {
																	setSelectValue('blank')
																	setCmdIsOpen(false)
																}}
															>
																<div className='col-span-6'>Blank</div>
																<div className='col-span-3'></div>
																<Check
																	className={cn(
																		'ml-auto',
																		'blank' === selectValue
																			? 'opacity-100'
																			: 'opacity-0',
																	)}
																/>
															</CommandItem>
															{isAllRecipes
																? recipesData?.map((recipe) => (
																		<CommandItem
																			key={recipe.id}
																			value={recipe.id.toString()}
																			keywords={[
																				recipe.name,
																				recipe.recipeCategory,
																			]}
																			className={cn(
																				'grid grid-cols-13',
																				recipe.id.toString() === selectValue
																					? 'bg-muted'
																					: '',
																			)}
																			onSelect={() => {
																				setSelectValue(recipe.id.toString())
																				setCmdIsOpen(false)
																			}}
																		>
																			<div className='col-span-6'>
																				{recipe.name}
																			</div>
																			<div className='col-span-3'>
																				{/^\d+$/.test(recipe.recipeCategory)
																					? ''
																					: recipe.recipeCategory}
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient?.caloriesWOFibre,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(0)}
																				cals
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				C:
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient
																								?.availableCarbohydrateWithoutSugarAlcohols,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(1)}
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				P:
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient?.protein,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(1)}
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				F:
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient?.fatTotal,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(1)}
																			</div>
																		</CommandItem>
																	))
																: yourRecipes?.map((recipe) => (
																		<CommandItem
																			key={recipe.id}
																			value={recipe.id.toString()}
																			keywords={[
																				recipe.name,
																				recipe.recipeCategory,
																			]}
																			className={cn(
																				'grid grid-cols-13',
																				recipe.id.toString() === selectValue
																					? 'bg-muted'
																					: '',
																			)}
																			onSelect={() => {
																				setSelectValue(recipe.id.toString())
																				setCmdIsOpen(false)
																			}}
																		>
																			<div className='col-span-6'>
																				{recipe.name}
																			</div>
																			<div className='col-span-3'>
																				{/^\d+$/.test(recipe.recipeCategory)
																					? ''
																					: recipe.recipeCategory}
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient?.caloriesWOFibre,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(0)}
																				cals
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				C:
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient
																								?.availableCarbohydrateWithoutSugarAlcohols,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(1)}
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				P:
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient?.protein,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(1)}
																			</div>
																			<div className='font-medium text-[0.75rem] text-muted-foreground'>
																				F:
																				{recipe?.recipeToIngredient
																					.reduce((acc, curr) => {
																						const cal = Number(
																							curr?.ingredient?.fatTotal,
																						)
																						const scale =
																							Number(curr?.serveSize) /
																							Number(
																								curr?.ingredient?.serveSize,
																							)
																						return acc + cal * scale
																					}, 0)
																					.toFixed(1)}
																			</div>
																		</CommandItem>
																	))}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										</Popover>
									</div>
									<Button
										onMouseDown={(e) => {
											e.preventDefault()
											if (selectValue === '') return

											if (selectValue === 'blank') {
												const id = uuidv4()
												recipeField.append({
													recipeId: id,
													name: '',
													note: '',
													description: '',
													index: recipeField.fields.length,
													ingredients: [],
												})
												setIsOpen(false)
												setSelectValue('')
												return
											}

											const r = recipesData?.find(
												(r) => r.id === Number(selectValue),
											)
											if (!r) return

											recipeField.append({
												recipeId: r.id.toString(),
												name: r.name || '',
												note: '',
												description: r?.description || '',
												index: recipeField.fields.length,
												ingredients: r?.recipeToIngredient.map(
													(ingredient, _ingredientIndex) => {
														const serve =
															r?.calories === 0
																? 1
																: (Number(ingredient.serveSize) *
																		Number(formCals)) /
																	Number(r?.calories)
														return {
															ingredientId:
																ingredient.ingredient?.id.toString(),
															alternateId:
																ingredient.alternateId?.toString() || null,
															name: ingredient.ingredient?.name || '',
															serveSize: serve.toFixed(2),
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

											setIsOpen(false)
											setSelectValue('')
										}}
									>
										Add
									</Button>
								</DialogContent>
							</Dialog>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export { Meal }
