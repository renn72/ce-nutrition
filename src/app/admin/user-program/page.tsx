'use client'

import { api } from '@/trpc/react'

import { useRouter, useSearchParams } from 'next/navigation'

import { cn, getRecipeDetailsForDailyLog } from '@/lib/utils'
import type { GetUserById } from '@/types'
import {
	CalendarRange,
	ChevronDown,
	CopyPlus,
	Ellipsis,
	FileStack,
	PencilLine,
	RotateCcw,
	Target,
	Trash2,
} from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

type UserProgramPlan = NonNullable<GetUserById>['userPlans'][number]

type MacroTotals = {
	cals: number
	protein: number
	carbs: number
	fat: number
}

const EMPTY_MACROS: MacroTotals = {
	cals: 0,
	protein: 0,
	carbs: 0,
	fat: 0,
}

const formatDateLabel = (date: Date | null | undefined) => {
	if (!date) return 'Present'

	return date.toLocaleDateString('en-AU', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	})
}

const getRecipeMacros = (
	plan: UserProgramPlan,
	recipeId: number,
): MacroTotals => {
	const { cals, protein, carbs, fat } = getRecipeDetailsForDailyLog(
		plan,
		recipeId,
	)

	return {
		cals: Number(cals) || 0,
		protein: Number(protein) || 0,
		carbs: Number(carbs) || 0,
		fat: Number(fat) || 0,
	}
}

const formatMacroValue = (label: keyof MacroTotals, value: number) => {
	if (label === 'cals') return value.toFixed(0)
	return value.toFixed(1)
}

const MacroPill = ({
	label,
	value,
	unit = 'g',
	className,
}: {
	label: string
	value: string
	unit?: string
	className?: string
}) => {
	return (
		<div
			className={cn(
				'flex min-w-[88px] flex-col rounded-2xl border border-border/60 bg-background/80 px-3 py-2 shadow-sm',
				className,
			)}
		>
			<div className='uppercase text-[0.65rem] tracking-[0.24em] text-muted-foreground'>
				{label}
			</div>
			<div className='mt-1 text-base font-semibold text-foreground'>
				{value}
				{unit}
			</div>
		</div>
	)
}

const SummaryStat = ({
	label,
	value,
	helper,
	className,
}: {
	label: string
	value: string
	helper?: string
	className?: string
}) => {
	return (
		<div
			className={cn(
				'rounded-3xl border border-border/60 bg-background/80 px-4 py-4 shadow-sm',
				className,
			)}
		>
			<div className='uppercase text-[0.65rem] tracking-[0.28em] text-muted-foreground'>
				{label}
			</div>
			<div className='mt-2 text-2xl font-semibold'>{value}</div>
			{helper ? (
				<div className='mt-1 text-xs text-muted-foreground'>{helper}</div>
			) : null}
		</div>
	)
}

const SectionHeader = ({
	title,
	description,
	count,
}: {
	title: string
	description: string
	count: number
}) => {
	return (
		<div className='flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end'>
			<div className='space-y-1'>
				<div className='text-xs uppercase tracking-[0.32em] text-muted-foreground'>
					User Programs
				</div>
				<h2 className='text-2xl font-semibold tracking-tight'>{title}</h2>
				<p className='text-sm text-muted-foreground'>{description}</p>
			</div>
			<Badge
				variant='outline'
				className='py-1 px-3 uppercase rounded-full w-fit text-[0.7rem] tracking-[0.2em]'
			>
				{count} plans
			</Badge>
		</div>
	)
}

const EmptySection = ({
	title,
	description,
}: {
	title: string
	description: string
}) => {
	return (
		<Card className='py-10 border-dashed shadow-none rounded-[28px] bg-muted/20'>
			<CardContent className='flex flex-col gap-2 items-center text-center'>
				<div className='text-base font-semibold'>{title}</div>
				<div className='max-w-xl text-sm text-muted-foreground'>
					{description}
				</div>
			</CardContent>
		</Card>
	)
}

const PlanActionsMenu = ({
	isActive,
	onEdit,
	onSaveAsPlan,
	onDuplicate,
	onFinish,
	onReactivate,
	onDelete,
}: {
	isActive: boolean
	onEdit: () => void
	onSaveAsPlan: () => void
	onDuplicate: () => void
	onFinish: () => void
	onReactivate: () => void
	onDelete: () => void
}) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					className='rounded-full border border-border/60 bg-background/80'
				>
					<Ellipsis className='w-4 h-4' />
					<span className='sr-only'>Open actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[220px]'>
				<DropdownMenuLabel>Program Actions</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{isActive ? (
					<>
						<DropdownMenuItem onSelect={onEdit}>
							<PencilLine className='w-4 h-4' />
							Edit Program
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={onSaveAsPlan}>
							<FileStack className='w-4 h-4' />
							Save as Plan
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={onDuplicate}>
							<CopyPlus className='w-4 h-4' />
							Duplicate Program
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={onFinish}
							className='text-destructive focus:text-destructive'
						>
							<Target className='w-4 h-4' />
							Finish Program
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem onSelect={onSaveAsPlan}>
							<FileStack className='w-4 h-4' />
							Save as Plan
						</DropdownMenuItem>
						<DropdownMenuItem onSelect={onReactivate}>
							<RotateCcw className='w-4 h-4' />
							Reactivate Program
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onSelect={onDelete}
							className='text-destructive focus:text-destructive'
						>
							<Trash2 className='w-4 h-4' />
							Delete Program
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

const ProgramCard = ({
	plan,
	userId,
	onSaveAsPlan,
	onDuplicate,
	onFinish,
	onReactivate,
	onDelete,
}: {
	plan: UserProgramPlan
	userId: string
	onSaveAsPlan: (id: number) => void
	onDuplicate: (id: number) => void
	onFinish: (id: number) => void
	onReactivate: (id: number) => void
	onDelete: (id: number) => void
}) => {
	const router = useRouter()

	const mealDetails = plan.userMeals.map((meal, mealOrderIndex) => {
		const resolvedMealIndex = meal.mealIndex ?? mealOrderIndex
		const recipes = plan.userRecipes
			.filter((recipe) => recipe.mealIndex === resolvedMealIndex)
			.map((recipe) => ({
				...recipe,
				macros: getRecipeMacros(plan, recipe.id),
			}))

		const averageMacros =
			recipes.length === 0
				? EMPTY_MACROS
				: recipes.reduce(
						(acc, recipe) => ({
							cals: acc.cals + recipe.macros.cals,
							protein: acc.protein + recipe.macros.protein,
							carbs: acc.carbs + recipe.macros.carbs,
							fat: acc.fat + recipe.macros.fat,
						}),
						{ ...EMPTY_MACROS },
					)

		return {
			meal,
			recipes,
			averageMacros:
				recipes.length === 0
					? EMPTY_MACROS
					: {
							cals: averageMacros.cals / recipes.length,
							protein: averageMacros.protein / recipes.length,
							carbs: averageMacros.carbs / recipes.length,
							fat: averageMacros.fat / recipes.length,
						},
		}
	})

	const planMacros = mealDetails.reduce(
		(acc, detail) => ({
			cals: acc.cals + detail.averageMacros.cals,
			protein: acc.protein + detail.averageMacros.protein,
			carbs: acc.carbs + detail.averageMacros.carbs,
			fat: acc.fat + detail.averageMacros.fat,
		}),
		{ ...EMPTY_MACROS },
	)

	const isActive = Boolean(plan.isActive)
	const recipeCount = mealDetails.reduce(
		(acc, detail) => acc + detail.recipes.length,
		0,
	)

	return (
		<Collapsible defaultOpen={isActive}>
			<Card
				className={cn(
					'overflow-hidden rounded-[32px] border py-0 shadow-sm',
					isActive
						? 'border-emerald-500/25 bg-gradient-to-br from-emerald-500/[0.10] via-background to-background'
						: 'border-border/70 bg-gradient-to-br from-slate-500/[0.06] via-background to-background',
				)}
			>
				<CardHeader className='py-6 px-6 border-b border-border/60'>
					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start'>
							<div className='space-y-3'>
								<div className='flex flex-wrap gap-2 items-center'>
									<Badge
										className={cn(
											'rounded-full px-3 py-1 tracking-[0.22em] uppercase',
											isActive ? 'bg-emerald-600' : 'bg-muted text-foreground',
										)}
									>
										{isActive ? 'Active' : 'Finished'}
									</Badge>
									<div className='flex gap-2 items-center text-xs uppercase tracking-[0.24em] text-muted-foreground'>
										<CalendarRange className='w-3.5 h-3.5' />
										<span>
											{formatDateLabel(plan.createdAt)} to{' '}
											{formatDateLabel(plan.finishedAt)}
										</span>
									</div>
								</div>
								<div className='space-y-2'>
									<CardTitle className='text-2xl tracking-tight md:text-3xl'>
										{plan.name}
									</CardTitle>
									{plan.description ? (
										<CardDescription className='max-w-3xl text-sm leading-6'>
											{plan.description}
										</CardDescription>
									) : null}
								</div>
							</div>
							<CardAction>
								<PlanActionsMenu
									isActive={isActive}
									onEdit={() =>
										router.push(
											`/admin/user-program-edit?user=${userId}&plan=${plan.id}`,
										)
									}
									onSaveAsPlan={() => onSaveAsPlan(plan.id)}
									onDuplicate={() => onDuplicate(plan.id)}
									onFinish={() => onFinish(plan.id)}
									onReactivate={() => onReactivate(plan.id)}
									onDelete={() => onDelete(plan.id)}
								/>
							</CardAction>
						</div>
						<div className='grid gap-3 sm:grid-cols-2 xl:grid-cols-6'>
							<SummaryStat
								label='Calories'
								value={formatMacroValue('cals', planMacros.cals)}
								helper='sum of meal averages'
							/>
							<SummaryStat
								label='Protein'
								value={`${formatMacroValue('protein', planMacros.protein)}g`}
							/>
							<SummaryStat
								label='Carbs'
								value={`${formatMacroValue('carbs', planMacros.carbs)}g`}
							/>
							<SummaryStat
								label='Fat'
								value={`${formatMacroValue('fat', planMacros.fat)}g`}
							/>
							<SummaryStat
								label='Meals'
								value={plan.userMeals.length.toString()}
							/>
							<SummaryStat label='Recipes' value={recipeCount.toString()} />
						</div>
					</div>
				</CardHeader>
				<CardContent className='py-6 px-6'>
					<CollapsibleTrigger asChild>
						<Button
							variant='ghost'
							className='flex h-auto w-full items-center justify-between rounded-[24px] border border-border/60 bg-background/75 px-4 py-4 text-left hover:bg-accent/40 data-[state=open]:[&_svg]:rotate-180'
						>
							<div className='space-y-1'>
								<div className='text-sm font-semibold'>Reveal full program</div>
								<div className='text-xs text-muted-foreground'>
									See all meals, recipe options, and associated macros. Meal
									macros are averaged across that meal&apos;s recipes.
								</div>
							</div>
							<ChevronDown className='w-5 h-5 transition-transform shrink-0' />
						</Button>
					</CollapsibleTrigger>
					<CollapsibleContent className='pt-5'>
						<div className='grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]'>
							<div className='p-4 border rounded-[28px] border-border/60 bg-background/80'>
								<div className='flex flex-col gap-1 pb-4'>
									<div className='text-lg font-semibold'>Meals and recipes</div>
									<div className='text-sm text-muted-foreground'>
										Front-loaded meal summaries, with recipe-level macros
										underneath each meal.
									</div>
								</div>
								<div className='grid gap-3 xl:grid-cols-2'>
									{mealDetails.map(
										({ meal, recipes, averageMacros }, index) => (
											<div
												key={meal.id}
												className='p-4 border rounded-[24px] border-border/60 bg-muted/20'
											>
												<div className='flex gap-3 justify-between items-start'>
													<div className='space-y-1'>
														<div className='text-base font-semibold'>
															{meal.mealTitle || `Meal ${index + 1}`}
														</div>
														<div className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>
															{recipes.length} recipe options
														</div>
													</div>
													<Badge variant='secondary' className='rounded-full'>
														Meal {index + 1}
													</Badge>
												</div>
												<div className='flex flex-wrap gap-2 mt-4'>
													<MacroPill
														label='Calories'
														value={formatMacroValue('cals', averageMacros.cals)}
														unit=''
													/>
													<MacroPill
														label='Protein'
														value={formatMacroValue(
															'protein',
															averageMacros.protein,
														)}
													/>
													<MacroPill
														label='Carbs'
														value={formatMacroValue(
															'carbs',
															averageMacros.carbs,
														)}
													/>
													<MacroPill
														label='Fat'
														value={formatMacroValue('fat', averageMacros.fat)}
													/>
												</div>
												<div className='mt-4 space-y-2'>
													{recipes.map((recipe) => (
														<div
															key={recipe.id}
															className='py-3 px-3 rounded-2xl border border-border/60 bg-background/85'
														>
															<div className='flex flex-col gap-3 lg:flex-row lg:justify-between lg:items-start'>
																<div className='space-y-1'>
																	<div className='text-sm font-semibold'>
																		{recipe.name}
																	</div>
																	{recipe.note ? (
																		<div className='text-xs text-muted-foreground'>
																			{recipe.note}
																		</div>
																	) : null}
																</div>
																<div className='flex flex-wrap gap-2 text-xs'>
																	<Badge
																		variant='outline'
																		className='rounded-full'
																	>
																		{formatMacroValue(
																			'cals',
																			recipe.macros.cals,
																		)}
																		cals
																	</Badge>
																	<Badge
																		variant='outline'
																		className='rounded-full'
																	>
																		P{' '}
																		{formatMacroValue(
																			'protein',
																			recipe.macros.protein,
																		)}
																		g
																	</Badge>
																	<Badge
																		variant='outline'
																		className='rounded-full'
																	>
																		C{' '}
																		{formatMacroValue(
																			'carbs',
																			recipe.macros.carbs,
																		)}
																		g
																	</Badge>
																	<Badge
																		variant='outline'
																		className='rounded-full'
																	>
																		F{' '}
																		{formatMacroValue('fat', recipe.macros.fat)}
																		g
																	</Badge>
																</div>
															</div>
														</div>
													))}
													{recipes.length === 0 ? (
														<div className='py-4 px-3 text-sm rounded-2xl border border-dashed border-border/60 bg-background/60 text-muted-foreground'>
															No recipes attached to this meal.
														</div>
													) : null}
												</div>
												{meal.veges ? (
													<div className='hidden py-3 px-3 mt-4 rounded-2xl border border-dashed border-emerald-500/25 bg-emerald-500/[0.06]'>
														<div className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>
															Vege notes
														</div>
														<div className='mt-2 text-sm font-medium'>
															{meal.veges}
														</div>
														{meal.vegeNotes ? (
															<div className='mt-1 text-sm text-muted-foreground'>
																{meal.vegeNotes}
															</div>
														) : null}
													</div>
												) : null}
											</div>
										),
									)}
								</div>
							</div>
							<div className='flex flex-col gap-4'>
								<Card className='py-0 border rounded-[28px] border-border/60 bg-background/80'>
									<CardHeader className='py-5 px-5'>
										<CardTitle className='text-lg'>Program snapshot</CardTitle>
										<CardDescription>
											High signal details for quick review.
										</CardDescription>
									</CardHeader>
									<CardContent className='px-5 pb-5 space-y-4'>
										<div className='flex justify-between items-center text-sm'>
											<span className='text-muted-foreground'>Status</span>
											<Badge
												className={cn(
													'rounded-full',
													isActive
														? 'bg-emerald-600'
														: 'bg-muted text-foreground',
												)}
											>
												{isActive ? 'Active now' : 'Finished'}
											</Badge>
										</div>
										<Separator />
										<div className='flex justify-between items-center text-sm'>
											<span className='text-muted-foreground'>Created</span>
											<span>{formatDateLabel(plan.createdAt)}</span>
										</div>
										<div className='flex justify-between items-center text-sm'>
											<span className='text-muted-foreground'>Finished</span>
											<span>{formatDateLabel(plan.finishedAt)}</span>
										</div>
										<div className='flex justify-between items-center text-sm'>
											<span className='text-muted-foreground'>Meals</span>
											<span>{plan.userMeals.length}</span>
										</div>
										<div className='flex justify-between items-center text-sm'>
											<span className='text-muted-foreground'>
												Recipe options
											</span>
											<span>{recipeCount}</span>
										</div>
									</CardContent>
								</Card>
								<Card className='py-0 border rounded-[28px] border-border/60 bg-background/80'>
									<CardHeader className='py-5 px-5'>
										<CardTitle className='text-lg'>Notes</CardTitle>
										<CardDescription>
											The extra context that sits behind the plan.
										</CardDescription>
									</CardHeader>
									<CardContent className='px-5 pb-5 space-y-4'>
										<div>
											<div className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>
												Description
											</div>
											<div className='mt-2 text-sm leading-6'>
												{plan.description || 'No description supplied.'}
											</div>
										</div>
										<Separator />
										<div>
											<div className='text-xs uppercase tracking-[0.22em] text-muted-foreground'>
												Plan notes
											</div>
											<div className='mt-2 text-sm leading-6 text-muted-foreground'>
												{plan.notes || 'No notes supplied.'}
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>
					</CollapsibleContent>
				</CardContent>
			</Card>
		</Collapsible>
	)
}

const ProgramSection = ({
	title,
	description,
	plans,
	userId,
	onSaveAsPlan,
	onDuplicate,
	onFinish,
	onReactivate,
	onDelete,
}: {
	title: string
	description: string
	plans: UserProgramPlan[]
	userId: string
	onSaveAsPlan: (id: number) => void
	onDuplicate: (id: number) => void
	onFinish: (id: number) => void
	onReactivate: (id: number) => void
	onDelete: (id: number) => void
}) => {
	return (
		<section className='flex flex-col gap-4'>
			<SectionHeader
				title={title}
				description={description}
				count={plans.length}
			/>
			{plans.length === 0 ? (
				<EmptySection
					title={`No ${title.toLowerCase()} yet`}
					description='When programs land in this section they will appear here with summary macros and a full meal breakdown.'
				/>
			) : (
				<div className='grid gap-4'>
					{plans.map((plan) => (
						<ProgramCard
							key={plan.id}
							plan={plan}
							userId={userId}
							onSaveAsPlan={onSaveAsPlan}
							onDuplicate={onDuplicate}
							onFinish={onFinish}
							onReactivate={onReactivate}
							onDelete={onDelete}
						/>
					))}
				</div>
			)}
		</section>
	)
}

const UserInfo = ({ userId }: { userId: string }) => {
	const ctx = api.useUtils()

	const { mutate: finishPlan } = api.userPlan.finishPlan.useMutation({
		onSuccess: () => {
			toast.success('Program finished')
			void ctx.user.get.invalidate(userId)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})
	const { mutate: activePlan } = api.userPlan.activePlan.useMutation({
		onSuccess: () => {
			toast.success('Program reactivated')
			void ctx.user.get.invalidate(userId)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})
	const { mutate: deletePlan } = api.userPlan.delete.useMutation({
		onSuccess: () => {
			toast.success('Program deleted')
			void ctx.user.get.invalidate(userId)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const { data: currentUser } = api.user.get.useQuery(userId)

	const { mutate: saveAsPlan } = api.plan.saveAsPlan.useMutation({
		onSuccess: () => {
			toast.success('Saved as reusable plan')
			void ctx.user.get.invalidate(userId)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})
	const { mutate: createPlan } = api.userPlan.create.useMutation({
		onSuccess: () => {
			toast.success('Program duplicated')
			void ctx.user.get.invalidate(userId)
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const plans = [...(currentUser?.userPlans ?? [])]
		.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
		.sort((a, b) => {
			if (!a.isActive && !b.isActive) return 0
			if (a.isActive && !b.isActive) return -1
			if (!a.isActive && b.isActive) return 1
			return 0
		})

	const activePlans = plans.filter((plan) => plan.isActive)
	const finishedPlans = plans.filter((plan) => !plan.isActive)

	const onSaveAsPlan = (id: number) => {
		const plan = plans.find((item) => item.id === id)
		if (!plan) return

		saveAsPlan({
			name: `${plan.name}-copy`,
			description: plan.description,
			image: plan.image,
			notes: plan.notes,
			planCategory: `${currentUser?.firstName} ${currentUser?.lastName}`,
			numberOfMeals: plan.numberOfMeals || plan.userMeals.length,
			meals: plan.userMeals.map((meal) => ({
				mealIndex: meal.mealIndex || 0,
				mealTitle: meal.mealTitle || '',
				calories: meal.calories || '',
				vegeCalories: meal.vegeCalories || '',
				vegeNotes: meal.vegeNotes || '',
				vege: meal.veges || '',
				note: meal.note || '',
				recipes: plan.userRecipes
					.filter((recipe) => recipe.mealIndex === meal.mealIndex)
					.map((recipe) => ({
						id: recipe.id,
						name: recipe.name || '',
						calories: meal.calories || '',
						note: recipe.note || '',
						ingredients: plan.userIngredients
							.filter(
								(ingredient) =>
									ingredient.recipeIndex === recipe.recipeIndex &&
									ingredient.mealIndex === recipe.mealIndex,
							)
							.map((ingredient) => ({
								ingredientId: ingredient.ingredientId || -1,
								alternateId: ingredient.alternateId,
								name: ingredient.name || '',
								serve: ingredient.serve || '',
								serveUnit: ingredient.serveUnit || '',
								note: ingredient.note || '',
							})),
					})),
			})),
		})
	}

	const onDuplicatePlan = (id: number) => {
		const plan = plans.find((item) => item.id === id)
		if (!plan) return

		createPlan({
			name: `${plan.name}-dup`,
			createdAt: new Date(),
			description: plan.description,
			image: plan.image || '',
			notes: plan.notes,
			meals: plan.userMeals.map((meal, mealIndex) => ({
				mealIndex: mealIndex,
				mealTitle: meal.mealTitle || '',
				calories: meal.calories || '',
				targetCalories: meal.targetCalories || '',
				targetProtein: meal.targetProtein || '',
				vegeCalories: meal.vegeCalories || '',
				veges: meal.veges || '',
				vegeNotes: meal.vegeNotes || '',
				protein: meal.protein?.toString(),
				note: meal.note || '',
				recipes: plan.userRecipes
					.filter((recipe) => recipe.mealIndex === mealIndex)
					.map((recipe, recipeIndex) => ({
						recipeIndex: recipeIndex,
						mealIndex: mealIndex,
						name: recipe.name || '',
						note: recipe.note || '',
						index: recipeIndex,
						description: '',
						ingredients: plan.userIngredients
							.filter(
								(ingredient) =>
									ingredient.recipeIndex === recipe.recipeIndex &&
									ingredient.mealIndex === recipe.mealIndex,
							)
							.map((ingredient, ingredientIndex) => ({
								ingredientId: Number(ingredient.ingredientId),
								ingredientIndex: ingredientIndex,
								recipeIndex: recipeIndex,
								mealIndex: mealIndex,
								name: ingredient.name || '',
								serve: ingredient.serve || '',
								serveUnit: ingredient.serveUnit || '',
								alternateId:
									ingredient.alternateId === null
										? null
										: Number(ingredient.alternateId),
								note: ingredient.note || '',
							})),
					})),
			})),
			userId: userId,
		})
	}

	if (!currentUser) return null

	return (
		<div className='flex flex-col gap-8 py-6 px-3 mx-auto max-w-screen-2xl md:px-5'>
			<Card className='overflow-hidden py-0 bg-gradient-to-br border-0 shadow-sm rounded-[36px] from-primary/[0.08] via-background to-emerald-500/[0.08]'>
				<CardContent className='py-8 px-6 md:px-8'>
					<div className='flex flex-col gap-8 xl:flex-row xl:justify-between xl:items-end'>
						<div className='space-y-3'>
							<div className='text-xs uppercase tracking-[0.34em] text-muted-foreground'>
								Program Dashboard
							</div>
							<div className='space-y-2'>
								<h1 className='text-3xl font-semibold tracking-tight md:text-5xl'>
									{currentUser.firstName || currentUser.name}&rsquo;s programs
								</h1>
								<p className='max-w-3xl text-sm leading-6 md:text-base text-muted-foreground'>
									Designed for quick decisions: active and finished programs are
									separated, actions are tucked into context menus, and every
									program expands into meal and recipe-level macro detail.
								</p>
							</div>
						</div>
						<div className='grid gap-3 sm:grid-cols-3'>
							<SummaryStat
								label='Active'
								value={activePlans.length.toString()}
								helper='current rotation'
							/>
							<SummaryStat
								label='Finished'
								value={finishedPlans.length.toString()}
								helper='archived programs'
							/>
							<SummaryStat
								label='Total'
								value={plans.length.toString()}
								helper='all user programs'
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			<ProgramSection
				title='Active Programs'
				description='Current programs stay front and center, with edit and lifecycle actions available from the menu on each card.'
				plans={activePlans}
				userId={userId}
				onSaveAsPlan={onSaveAsPlan}
				onDuplicate={onDuplicatePlan}
				onFinish={(id) => finishPlan(id)}
				onReactivate={(id) => activePlan(id)}
				onDelete={(id) => deletePlan(id)}
			/>

			<ProgramSection
				title='Finished Programs'
				description='Archived programs keep their historical context, with quick access to save as plan, reactivate, or delete.'
				plans={finishedPlans}
				userId={userId}
				onSaveAsPlan={onSaveAsPlan}
				onDuplicate={onDuplicatePlan}
				onFinish={(id) => finishPlan(id)}
				onReactivate={(id) => activePlan(id)}
				onDelete={(id) => deletePlan(id)}
			/>
		</div>
	)
}

export default function Home() {
	const searchParams = useSearchParams()
	const userId = searchParams.get('user')

	if (
		userId === '' ||
		userId === undefined ||
		userId === null ||
		userId === 'null'
	)
		return <div>Select a user</div>

	return <UserInfo userId={userId} />
}
