'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { SpinnerGapIcon } from '@phosphor-icons/react'

import { useIsMobile } from '@/hooks/use-mobile'
import { cn, getRecipeDetailsByCals } from '@/lib/utils'
import type { GetIngredientById } from '@/types'
import {
	Check,
	ChevronsUpDown,
	CircleChevronDown,
	CircleChevronUp,
	CirclePlus,
	CircleX,
} from 'lucide-react'
import { useFieldArray, type UseFormReturn } from 'react-hook-form'
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
import { Textarea } from '@/components/ui/textarea'

import type { formSchema } from './form-plan'

export const dynamic = 'force-dynamic'

const Ingredient = ({
	ingredient,
	ratio: r,
	size,
}: {
	ingredient: GetIngredientById | null
	ratio: number
	size: number
}) => {
	const ratio = (size * r) / Number(ingredient?.serveSize)

	if (!ingredient) return null
	return (
		<div className='grid grid-cols-9 gap-1 text-muted-foreground'>
			<div />
			<div className='col-span-3'>{ingredient.name}</div>
			<div>{(Number(size) * ratio).toFixed(0)}</div>
			<div>{(Number(ingredient.caloriesWOFibre) * ratio).toFixed(1)}</div>
			<div>{(Number(ingredient.protein) * ratio).toFixed(1)}</div>
			<div>
				{(
					Number(ingredient.availableCarbohydrateWithSugarAlcohols) * ratio
				).toFixed(1)}
			</div>
			<div>{(Number(ingredient.fatTotal) * ratio).toFixed(1)}</div>
		</div>
	)
}

const Recipe = ({
	calories,
	form,
	mealIndex,
	recipeIndex,
	remove,
}: {
	calories: string
	form: UseFormReturn<z.infer<typeof formSchema>>
	mealIndex: number
	recipeIndex: number
	remove: (index: number) => void
}) => {
	const [isOpen, setOpen] = useState(false)
	const isMobile = useIsMobile()
	const { data: _recipes } = api.recipe.getAll.useQuery()
	const recipeId = form.watch(
		`meals.${mealIndex}.recipes.${recipeIndex}.recipeId`,
	)

	const recipes = _recipes?.filter((recipe) => {
		if (recipe.id.toString() === recipeId) return true
		if (recipe.hiddenAt === null) return true
		return false
	})

	const recipe = recipes?.find((recipe) => recipe.id === Number(recipeId))
	const recipeDetails = getRecipeDetailsByCals(recipe, Number(calories))

	if (!recipes) return null

	return (
		<div className='grid relative grid-cols-4 gap-1 items-center py-1 text-sm lg:grid-cols-9'>
			<FormField
				control={form.control}
				name={`meals.${mealIndex}.recipes.${recipeIndex}.recipeId`}
				render={({ field }) => (
					<FormItem className='flex col-span-5 w-full'>
						<Popover open={isOpen} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<FormControl>
									<Button
										variant='outline'
										role='combobox'
										className={cn(
											'w-full justify-between shadow-none border-none',
											!field.value && 'text-muted-foreground',
										)}
									>
										{field.value
											? recipes?.find(
													(recipe) => recipe.id.toString() === field.value,
												)?.name
											: 'Select recipe'}
										<ChevronsUpDown className='opacity-50' strokeWidth={1} />
									</Button>
								</FormControl>
							</PopoverTrigger>
							<PopoverContent className='p-0 w-[800px]'>
								<Command>
									<CommandInput
										placeholder='Search recipes...'
										className='h-9'
									/>
									<CommandList className='w-[800px]'>
										<CommandEmpty>...</CommandEmpty>
										<CommandGroup>
											{recipes.map((recipe) => (
												<CommandItem
													value={`${recipe.name} ${/^\d+$/.test(recipe.recipeCategory) ? '' : recipe.recipeCategory}`}
													key={recipe.id}
													className={cn(
														'grid grid-cols-10',
														recipe.id.toString() === field.value
															? 'bg-muted'
															: '',
													)}
													onSelect={() => {
														form.setValue(
															`meals.${mealIndex}.recipes.${recipeIndex}.recipeId`,
															recipe.id.toString(),
														)
														setOpen(false)
													}}
												>
													<div className='col-span-6'>{recipe.name}</div>
													<div className='col-span-3'>
														{/^\d+$/.test(recipe.recipeCategory)
															? ''
															: recipe.recipeCategory}
													</div>
													<Check
														className={cn(
															'ml-auto',
															recipe.id.toString() === field.value
																? 'opacity-100'
																: 'opacity-0',
														)}
													/>
												</CommandItem>
											))}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>

						<FormMessage />
						{isMobile ? (
							<CircleX
								size={20}
								className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground hover:text-foreground'
								onClick={() => remove(recipeIndex)}
							/>
						) : null}
					</FormItem>
				)}
			/>
			{recipe?.name && (
				// biome-ignore lint/complexity/noUselessFragments: fuck off
				<>
					{isMobile ? (
						<div className='flex flex-col col-span-4 gap-0'>
							<div className='grid grid-cols-4 gap-1 items-center place-items-center font-medium capitalize text-muted-foreground'>
								<div>cals</div>
								<div>protein</div>
								<div>carbs</div>
								<div>fat</div>
							</div>
							<div className='grid grid-cols-4 gap-1 items-center place-items-center -mt-1'>
								<div>{recipeDetails.cals}</div>
								<div>{recipeDetails.protein}</div>
								<div>{recipeDetails.carbs}</div>
								<div>{recipeDetails.fat} </div>
							</div>
						</div>
					) : (
						<>
							<div>{recipeDetails.cals}</div>
							<div>{recipeDetails.protein}</div>
							<div>{recipeDetails.carbs}</div>
							<div>{recipeDetails.fat} </div>
						</>
					)}
				</>
			)}
			{isMobile ? null : (
				<CircleX
					size={20}
					className='absolute right-0 top-1/2 transition-transform -translate-y-1/2 cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground hover:text-foreground'
					onClick={() => remove(recipeIndex)}
				/>
			)}
		</div>
	)
}

const FormPlanMeal = ({
	index,
	form,
	remove: removeMeal,
	insert: insertMeal,
	move,
}: {
	index: number
	form: UseFormReturn<z.infer<typeof formSchema>>
	remove: (index: number) => void
	// biome-ignore lint/suspicious/noExplicitAny: fuck off
	insert: (index: number, value: any) => void
	move: (from: number, to: number) => void
}) => {
	const isMobile = useIsMobile()
	const { data: recipes } = api.recipe.getAll.useQuery()

	const [isVege, setIsVege] = useState(false)

	const calories =
		Number(form.watch(`meals.${index}.calories`)) -
		Number(form.watch(`meals.${index}.vegeCalories`))

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `meals.${index}.recipes`,
	})

	return (
		<Card key={index} className='w-full'>
			<CardHeader className='pt-4 pb-2 w-full bg-background'>
				<div className='flex justify-between w-full'>
					<div className='flex gap-0 items-center'>
						<CardTitle className='mr-8 text-3xl'>Meal {index + 1}</CardTitle>
						<Button
							variant='ghost'
							className='w-min'
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								if (index === 0) return
								move(index, index - 1)
							}}
						>
							<CircleChevronUp size={28} />
						</Button>
						<Button
							variant='ghost'
							className='w-min'
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								console.log(index, fields.length, form.watch('meals').length)
								const length = form.watch('meals').length - 1
								if (index === length) return
								move(index, index + 1)
							}}
						>
							<CircleChevronDown size={28} />
						</Button>
					</div>
					<CircleX
						size={24}
						className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground hover:text-foreground'
						onClick={() => removeMeal(index)}
					/>
				</div>
			</CardHeader>
			<CardContent className='px-2 lg:px-6 bg-background'>
				<div
					key={index}
					className='grid grid-cols-1 gap-1 py-2 w-full lg:grid-cols-5'
				>
					<div className='flex flex-col gap-2'>
						<FormField
							control={form.control}
							name={`meals.${index}.mealTitle`}
							render={({ field }) => (
								<FormItem className=''>
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
							name={`meals.${index}.calories`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Calories</FormLabel>
									<FormControl>
										<Input placeholder='Calories' {...field} type='number' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name={`meals.${index}.note`}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Notes</FormLabel>
									<FormControl>
										<Input placeholder='Notes' {...field} type='text' />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='flex gap-2 items-center'>
							<Label>Vege</Label>
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
						{isVege && (
							<>
								<FormField
									control={form.control}
									name={`meals.${index}.vegeCalories`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Veg Calories</FormLabel>
											<FormControl>
												<Input
													placeholder='Veg Calories'
													type='number'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`meals.${index}.vege`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Veg</FormLabel>
											<FormControl>
												<Textarea placeholder='Veg' rows={3} {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`meals.${index}.vegeNotes`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Veg Notes</FormLabel>
											<FormControl>
												<Input placeholder='Veg Notes' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
						<Button
							variant='secondary'
							className='mt-4 w-min'
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								insertMeal(index + 1, {
									mealTitle: 'copy',
									calories: form.getValues(`meals.${index}.calories`),
									vegeCalories: form.getValues(`meals.${index}.vegeCalories`),
									vegeNotes: form.getValues(`meals.${index}.vegeNotes`),
									vege: form.getValues(`meals.${index}.vege`),
									note: form.getValues(`meals.${index}.note`),
									recipes: form
										.getValues(`meals.${index}.recipes`)
										.map((recipe) => ({
											recipeId: recipe.recipeId,
											note: recipe.note,
										})),
								})
							}}
						>
							Duplicate Meal
						</Button>
					</div>

					<div className='flex flex-col col-span-4 gap-0 divide-y lg:ml-4 divide-border'>
						{!recipes ? (
							<div className='flex justify-center items-center h-32'>
								<SpinnerGapIcon size={32} className='animate-spin' />
							</div>
						) : (
							<>
								{isMobile ? (
									<div className='mt-1' />
								) : (
									<div className='grid grid-cols-9 gap-1 py-1 capitalize'>
										<div className='col-span-5' />
										<div>cals</div>
										<div>protein</div>
										<div>carbs</div>
										<div>fat</div>
									</div>
								)}
								{fields.map((field, recipeIndex) => (
									<Recipe
										mealIndex={index}
										recipeIndex={recipeIndex}
										form={form}
										calories={calories.toFixed(2)}
										key={field.id}
										remove={remove}
									/>
								))}
							</>
						)}
						<div className='flex justify-center pt-4 w-full'>
							<CirclePlus
								size={20}
								className='transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground hover:text-foreground'
								onClick={() =>
									append({
										recipeId: '',
										note: '',
									})
								}
							/>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export { FormPlanMeal }
