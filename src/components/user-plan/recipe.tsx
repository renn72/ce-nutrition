'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { cn, getRecipeDetailsForUserPlan } from '@/lib/utils'
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
  const ingredient  = form.watch(`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}`)

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
			<div className='grid md:grid-cols-10 grid-cols-8 md:gap-1 text-muted-foreground items-center relative'>
				<div className='md:col-span-4 col-span-2 md:ml-2'>
					{ingredient?.name}
				</div>
				<FormField
					control={form.control}
					name={`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.serveSize`}
					render={({ field }) => (
						<FormItem className='w-full col-span-2'>
							<FormControl>
								<div className='w-full flex justify-between items-center gap-2 px-2'>
									<CircleMinus
										size={20}
										className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0 hidden md:block'
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
										className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0 hidden md:block'
										onClick={() => {
											field.onChange(
												(Math.floor(Number(field.value)) + 1).toString(),
											)
										}}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div
          className='place-self-center'
        >
					{(Number(ingredient.ingredient.caloriesWOFibre) * ratio).toFixed(1)}
				</div>
				<div
          className='place-self-center'
        >{(Number(ingredient.ingredient.protein) * ratio).toFixed(1)}</div>
				<div
          className='place-self-center'
        >
					{(
						Number(
							ingredient.ingredient.availableCarbohydrateWithSugarAlcohols,
						) * ratio
					).toFixed(1)}
				</div>
				<div
          className='place-self-center'
        >{(Number(ingredient.ingredient.fatTotal) * ratio).toFixed(1)}</div>

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
									<h2 className='font-semibold '>Ingredient</h2>
									{!allIngredients ? null : (
										<div className='flex gap-2 items-center w-full lg:w-content col-span-3 mb-8'>
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
									<h2 className='font-semibold '>Alt Ingredient</h2>
									{!allIngredients ? null : (
										<div className='flex gap-2 items-center w-full lg:w-content col-span-3 mb-8'>
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
							<div className='flex gap-4 justify-center w-full col-span-3'>
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
                    form.setValue(`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.ingredientId`, selected, { shouldTouch: true })
                    form.setValue(`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.name`, newIngredient.name ?? 'error', { shouldTouch: true })
                    form.setValue(`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.alternateId`, selectedAlt ?? null, { shouldTouch: true })



                    // @ts-ignore
                    form.setValue(`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.ingredient`, {...newIngredient}, { shouldTouch: true })
                    // @ts-ignore
                    form.setValue(`meals.${mealIndex}.recipes.${recipeIndex}.ingredients.${ingredientIndex}.alternateIngredient`, {...newAltIngredient}, { shouldTouch: true })

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
				<div className='grid grid-cols-10 gap-1 text-muted-foreground items-center text-xs'>
					<div className='col-span-4 truncate ml-4'>
						or {ingredient.alternateIngredient?.name}
					</div>
					<div className='place-self-center col-span-2 text-xs'>
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
		<div className='flex flex-col gap-1 border rounded-md p-2 relative'>
			<div className='absolute top-1 left-2 text-xs text-muted-foreground'>
				{recipeIndex + 1}
			</div>
			<div className='grid md:grid-cols-10 grid-cols-8 md:gap-1 capitalize place-items-center'>
				<div className='md:col-span-4 col-span-2 ' />
				<div className='col-span-2 place-self-center'>size</div>
				<div>cals</div>
				<div>protein</div>
				<div>carbs</div>
				<div>fat</div>
			</div>
			<div className='grid md:grid-cols-10 grid-cols-8 md:gap-1 font-bold'>
				<div className='md:col-span-4 col-span-2 flex gap-2 justify-between items-center'>
					<FormField
						control={form.control}
						name={`meals.${mealIndex}.recipes.${recipeIndex}.name`}
						render={({ field }) => (
							<FormItem className='w-full col-span-2'>
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
					<Button
						variant='destructive'
						size='icon'
						className='rounded-full shrink-0 text-[0.7rem] h-5 w-6'
						onClick={(e) => {
							e.preventDefault()
							recipesField.remove(recipeIndex)
						}}
					>
						Del
					</Button>
				</div>
				<div className='col-span-2 place-self-center' />
				<div className='text-center bg-secondary rounded-full place-self-center px-6'>
					{recipeDetails.cals}
				</div>
				<div className='text-center bg-secondary rounded-full place-self-center px-6'>
					{recipeDetails.protein}
				</div>
				<div className='text-center bg-secondary rounded-full place-self-center px-6'>
					{recipeDetails.carbs}
				</div>
				<div className='text-center bg-secondary rounded-full place-self-center px-6'>
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
			<div className='flex w-full justify-center mt-4'>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<CirclePlus
							size={20}
							strokeWidth={3}
							className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer shrink-0'
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
								<h2 className='font-semibold '>Ingredient</h2>
								{!allIngredients ? null : (
									<div className='flex gap-2 items-center w-full lg:w-content col-span-3 mb-8'>
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
								<h2 className='font-semibold '>Alt Ingredient</h2>
								{!allIngredients ? null : (
									<div className='flex gap-2 items-center w-full lg:w-content col-span-3 mb-8'>
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
						<div className='flex gap-4 justify-center w-full col-span-3'>
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
										serveUnit: '',
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
