'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { buildShoppingListItemsFromRecipe } from '@/lib/shopping-list'
import { cn, getRecipeDetailsForDailyLog } from '@/lib/utils'
import type { UserPlan } from '@/types'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, Leaf, RotateCcw, ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Slider } from '@/components/ui/slider'

const hasText = (value?: string | null) => Boolean(value?.trim())

const formatCompactNumber = (value: number | string) => Number(value).toFixed(0)

const mealAccentStyles = {
  section: 'border-sky-500/12 bg-sky-500/[0.045]',
  dot: 'bg-sky-500/75',
  average: 'border-sky-500/15 bg-sky-500/[0.1] text-foreground',
} as const

const recipeAccentStyles = {
  card: 'border-emerald-500/12 bg-emerald-500/[0.05]',
  pill: 'border-emerald-500/15 bg-emerald-500/[0.12] text-emerald-700 dark:text-emerald-300',
  macro: 'border-emerald-500/10 bg-emerald-500/[0.045]',
  stat: 'border-emerald-500/15 bg-emerald-500/[0.09]',
} as const

const SummaryChip = ({
  label,
  value,
  tone = 'muted',
}: {
  label: string
  value: string
  tone?: 'muted' | 'primary' | 'success'
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none',
        tone === 'muted' &&
          'border-border/60 bg-muted/70 text-muted-foreground',
        tone === 'primary' &&
          'border-primary/15 bg-primary/[0.08] text-primary',
        tone === 'success' &&
          'border-emerald-500/25 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      )}
    >
      <span className='uppercase opacity-70 tracking-[0.14em]'>{label}</span>
      <span>{value}</span>
    </div>
  )
}

const UserPlanVege = ({
  userPlan,
  mealIndex,
}: {
  userPlan: UserPlan
  mealIndex: number | null
}) => {
  if (!userPlan) return null
  const meal = userPlan.userMeals.find(
    (currentMeal) => currentMeal.mealIndex === mealIndex,
  )

  if (!meal) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type='button'
          size='sm'
          variant='outline'
          className='px-3 h-8 font-semibold text-emerald-700 rounded-full shadow-none dark:text-emerald-300 border-emerald-500/30 bg-background/90 text-[10px] hover:bg-background'
        >
          <Leaf className='mr-1.5 w-3.5 h-3.5' />
          Veg details
        </Button>
      </DialogTrigger>
      <DialogContent
        className='gap-4 py-6 px-4 sm:max-w-sm'
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader className='gap-2'>
          <DialogTitle className='flex gap-2 items-center text-left'>
            <Leaf className='w-4 h-4 text-emerald-600 dark:text-emerald-300' />
            Vegetable details
          </DialogTitle>
          <DialogDescription className='text-xs leading-5 text-left'>
            Extra vegetables and side notes for this meal.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-3'>
          {hasText(meal.vegeNotes) ? (
            <div className='py-2 px-3 rounded-2xl bg-muted'>
              <div className='font-semibold uppercase text-[10px] tracking-[0.14em] text-muted-foreground'>
                Guide
              </div>
              <div className='mt-1 text-sm font-semibold'>{meal.vegeNotes}</div>
            </div>
          ) : null}
          {hasText(meal.veges) ? (
            <div className='py-3 px-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.08]'>
              <div className='font-semibold uppercase text-[10px] tracking-[0.14em] text-emerald-700/80 dark:text-emerald-300/80'>
                Vegetables
              </div>
              <div className='mt-1 text-sm leading-5 text-foreground'>
                {meal.veges}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

const UserPlanRecipe = ({
  userPlan,
  mealIndex,
  recipeIndex,
}: {
  userPlan: UserPlan
  mealIndex: number | null
  recipeIndex: number | null
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const utils = api.useUtils()
  const userId = userPlan?.userId ?? ''
  const addRecipeToShoppingList = api.shoppingList.addRecipe.useMutation({
    onSuccess: async () => {
      if (!userId) return
      await Promise.all([
        utils.shoppingList.getActive.invalidate({ userId }),
        utils.shoppingList.getAllForUser.invalidate({ userId }),
      ])
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  if (!userPlan) return null
  const recipe = userPlan.userRecipes.find(
    (currentRecipe) =>
      currentRecipe.mealIndex === mealIndex &&
      currentRecipe.recipeIndex === recipeIndex,
  )
  if (!recipe) return null

  const ingredientCount = userPlan.userIngredients.filter(
    (ingredient) =>
      ingredient.mealIndex === mealIndex &&
      ingredient.recipeIndex === recipeIndex,
  ).length

  const { cals, protein, carbs, fat } = getRecipeDetailsForDailyLog(
    userPlan,
    recipe.id,
  )

  const handleAddToShoppingList = async () => {
    if (!userId) {
      toast.error(
        'Unable to determine which user this shopping list belongs to',
      )
      return
    }

    if (!Number.isFinite(scale) || scale <= 0) {
      toast.error('Set serves above 0 before adding to your shopping list')
      return
    }

    const items = buildShoppingListItemsFromRecipe({
      userPlan,
      mealIndex,
      recipeIndex,
      scale,
    })

    if (items.length === 0) {
      toast.error('This recipe does not have any ingredients to add')
      return
    }

    await addRecipeToShoppingList.mutateAsync({
      userId,
      items,
    })
    toast.success(`${recipe.name} added to your shopping list`)
    setIsOpen(false)
  }

  return (
    <Sheet.Root
      license='non-commercial'
      presented={isOpen}
      onPresentedChange={setIsOpen}
    >
      <Sheet.Trigger
        className={cn(
          'overflow-hidden py-2 px-2.5 w-full text-left border transition-transform rounded-[18px] shadow-[0_14px_22px_-20px_hsl(var(--foreground)/0.55)] active:scale-[0.99]',
          recipeAccentStyles.card,
        )}
      >
        <div className='flex gap-3 justify-between items-start'>
          <div className='overflow-hidden flex-1 min-w-0'>
            <div
              className='pr-1 font-semibold leading-5 max-w-[10.5rem] truncate text-[13px] text-foreground'
              title={recipe.name}
            >
              {recipe.name}
            </div>
            <div className='mt-0.5 uppercase text-[10px] tracking-[0.14em] text-muted-foreground'>
              {ingredientCount}{' '}
              {ingredientCount === 1 ? 'ingredient' : 'ingredients'}
            </div>
          </div>
          <div
            className={cn(
              'py-1 px-2 font-semibold rounded-2xl border shrink-0 text-[10px]',
              recipeAccentStyles.pill,
            )}
          >
            {formatCompactNumber(cals)} cal
          </div>
        </div>
        <div className='grid grid-cols-3 gap-1.5 mt-2'>
          {[
            { label: 'Protein', value: `${formatCompactNumber(protein)}g` },
            { label: 'Carbs', value: `${formatCompactNumber(carbs)}g` },
            { label: 'Fat', value: `${formatCompactNumber(fat)}g` },
          ].map((item) => (
            <div
              key={item.label}
              className={cn(
                'py-1 px-2 rounded-2xl border',
                recipeAccentStyles.macro,
              )}
            >
              <div className='uppercase text-[10px] tracking-[0.12em] text-muted-foreground'>
                {item.label}
              </div>
              <div className='mt-0.5 font-semibold leading-none text-[11px]'>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View className='z-[999] h-[100vh] bg-black/50'>
          <Sheet.Content className='relative h-full rounded-t-3xl min-h-[200px] max-h-[90vh] bg-background'>
            <div className='flex flex-col justify-between h-full'>
              <div className='flex flex-col gap-4'>
                <div className='flex justify-center pt-1'>
                  <Sheet.Handle
                    className='rounded-full border-0 w-[50px] h-[6px] bg-primary/20'
                    action='dismiss'
                  />
                </div>
                <div className='flex flex-col gap-2 px-4'>
                  <Sheet.Title className='text-lg font-semibold'>
                    {recipe.name}
                  </Sheet.Title>
                  <Sheet.Description className='flex gap-1 justify-between items-center py-1 px-4 text-xs font-normal rounded-full shadow-md bg-primary text-background'>
                    <span>{`${(Number(cals) * scale).toFixed(0)} cals`}</span>
                    <span>{`${(Number(protein) * scale).toFixed(0)} protein`}</span>
                    <span>{`${(Number(carbs) * scale).toFixed(0)} carbs`}</span>
                    <span>{`${(Number(fat) * scale).toFixed(0)} fat`}</span>
                  </Sheet.Description>
                  <div className='grid grid-cols-4 gap-2 place-items-center mt-4'>
                    <Label>Serves</Label>
                    <div className='flex col-span-3 gap-3 items-center w-full'>
                      <Input
                        placeholder='Scale'
                        className='max-w-[52px]'
                        type='number'
                        value={scale}
                        onChange={(e) => {
                          setScale(Number(e.target.value))
                        }}
                      />
                      <Slider
                        min={0}
                        max={10}
                        step={0.25}
                        value={[scale]}
                        onValueChange={(newValue) => {
                          if (!newValue[0]) return
                          setScale(newValue[0])
                        }}
                      />
                      <RotateCcw
                        size={32}
                        className='text-muted-foreground'
                        onClick={() => {
                          setScale(1)
                        }}
                      />
                    </div>
                  </div>
                  <Button
                    type='button'
                    className='w-full'
                    onClick={() => void handleAddToShoppingList()}
                    disabled={addRecipeToShoppingList.isPending}
                  >
                    {addRecipeToShoppingList.isPending ? (
                      <RotateCcw className='mr-2 w-4 h-4 animate-spin' />
                    ) : (
                      <ShoppingCart className='mr-2 w-4 h-4' />
                    )}
                    Add to shopping list
                  </Button>
                </div>
                <ScrollArea className='px-0 pt-0 h-[calc(90vh-240px)]'>
                  {userPlan.userIngredients
                    .filter(
                      (ingredient) =>
                        ingredient.mealIndex === mealIndex &&
                        ingredient.recipeIndex === recipeIndex,
                    )
                    .map((ingredient) => {
                      const serve = scale * Number(ingredient.serve)
                      const calories =
                        (Number(serve) /
                          Number(ingredient.ingredient?.serveSize)) *
                        Number(ingredient.ingredient?.caloriesWOFibre)
                      const altSize =
                        (calories /
                          Number(
                            ingredient.alternateIngredient?.caloriesWOFibre,
                          )) *
                        Number(ingredient.alternateIngredient?.serveSize)
                      return (
                        <div
                          key={ingredient.id}
                          className='flex flex-col gap-0'
                        >
                          <div className='grid grid-cols-6 py-2 px-1 w-full text-sm bg-secondary'>
                            <div className='col-span-5 truncate'>
                              {ingredient.name}
                            </div>
                            <div className='place-self-end'>{`${serve.toFixed(0)}${
                              ingredient.serveUnit === 'each'
                                ? 'ea'
                                : ingredient.serveUnit === 'grams'
                                  ? 'g'
                                  : ingredient.serveUnit
                            }`}</div>
                          </div>
                          {ingredient.alternateIngredient ? (
                            <div className='grid grid-cols-6 py-0 px-1 w-full text-xs font-light bg-secondary'>
                              <div className='col-span-5 truncate'>
                                or {ingredient.alternateIngredient.name}
                              </div>
                              <div className='place-self-end'>{`${altSize.toFixed(0)}${ingredient.alternateIngredient?.serveUnit?.slice(0, 1)}`}</div>
                            </div>
                          ) : null}
                        </div>
                      )
                    })}
                </ScrollArea>
              </div>
              <Sheet.Trigger
                className='flex justify-center w-full'
                action='dismiss'
              >
                <ChevronDown
                  size={32}
                  strokeWidth={2}
                  className='text-muted-foreground'
                />
              </Sheet.Trigger>
            </div>
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  )
}

const UserPlanView = ({ userPlan }: { userPlan: UserPlan }) => {
  const mealCount = userPlan?.userMeals.length
  const recipeCount = userPlan?.userRecipes.length

  return (
    <Card className='overflow-hidden gap-0 py-0 rounded-none border-border/70 shadow-[0_20px_48px_-32px_hsl(var(--foreground)/0.45)]'>
      <CardHeader className='gap-3 px-3 pt-4 pb-3 border-b border-border/60 bg-[linear-gradient(180deg,hsl(var(--primary)/0.045),transparent_100%)]'>
        <div className='flex gap-3 justify-between items-start'>
          <div className='min-w-0'>
            <div className='font-semibold uppercase text-[10px] tracking-[0.16em] text-muted-foreground'>
              Active plan
            </div>
            <h1 className='mt-1 text-base font-semibold tracking-tight text-foreground'>
              {userPlan?.name}
            </h1>
            <p className='mt-1 text-xs text-muted-foreground'>
              Tap any recipe to open ingredients and add it to the shopping
              list.
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div className='py-2 px-2.5 rounded-2xl border border-sky-500/15 bg-sky-500/[0.09]'>
            <div className='uppercase text-[10px] tracking-[0.14em] text-sky-700/80 dark:text-sky-300/80'>
              Meals
            </div>
            <div className='mt-1 text-sm font-semibold'>{mealCount}</div>
          </div>
          <div
            className={cn(
              'py-2 px-2.5 rounded-2xl border',
              recipeAccentStyles.stat,
            )}
          >
            <div className='uppercase text-[10px] tracking-[0.14em] text-emerald-700/80 dark:text-emerald-300/80'>
              Recipes
            </div>
            <div className='mt-1 text-sm font-semibold'>{recipeCount}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col gap-2.5 py-2.5 px-2.5'>
        {userPlan?.userMeals.map((meal, index) => {
          const mealAccent = mealAccentStyles
          const mealRecipes = userPlan.userRecipes.filter(
            (recipe) => recipe.mealIndex === meal.mealIndex,
          )

          const averageMealMacros =
            mealRecipes.length > 0
              ? mealRecipes.reduce(
                  (acc, recipe) => {
                    const recipeMacros = getRecipeDetailsForDailyLog(
                      userPlan,
                      recipe.id,
                    )

                    return {
                      cals: acc.cals + Number(recipeMacros.cals),
                      protein: acc.protein + Number(recipeMacros.protein),
                    }
                  },
                  { cals: 0, protein: 0 },
                )
              : null

          const averageCalories = averageMealMacros
            ? averageMealMacros.cals / mealRecipes.length
            : null
          const averageProtein = averageMealMacros
            ? averageMealMacros.protein / mealRecipes.length
            : null

          return (
            <section
              key={meal.id}
              className={cn(
                'rounded-[22px] border px-2.5 py-2.5 shadow-[0_14px_26px_-24px_hsl(var(--foreground)/0.5)]',
                mealAccent.section,
              )}
            >
              <div className='flex gap-2.5 justify-between items-start'>
                <div className='min-w-0'>
                  <div className='flex gap-1.5 items-center font-semibold uppercase text-[10px] tracking-[0.16em] text-muted-foreground'>
                    <span
                      aria-hidden
                      className={cn('h-2 w-2 rounded-full', mealAccent.dot)}
                    />
                    <span>Meal {index + 1}</span>
                  </div>
                  <h2 className='text-sm font-semibold leading-5 truncate'>
                    {meal.mealTitle}
                  </h2>
                </div>
                <SummaryChip
                  label='Options'
                  value={mealRecipes.length.toString()}
                  tone='primary'
                />
              </div>

              <div className='flex flex-wrap gap-2 mt-2'>
                <div
                  className={cn(
                    'rounded-2xl border px-2.5 py-1.5',
                    mealAccent.average,
                  )}
                >
                  <div className='font-semibold uppercase opacity-75 text-[10px] tracking-[0.14em]'>
                    Target macros
                  </div>
                  <div className='flex gap-3 items-center mt-1 font-semibold text-[11px]'>
                    <span>
                      {averageCalories !== null
                        ? `${averageCalories.toFixed(0)} cal`
                        : '-- cal'}
                    </span>
                    <span>
                      {averageProtein !== null
                        ? `${averageProtein.toFixed(0)}g protein`
                        : '-- g protein'}
                    </span>
                  </div>
                </div>
              </div>

              <div className='grid gap-1.5 mt-2'>
                {mealRecipes.length > 0 ? (
                  mealRecipes.map((recipe) => (
                    <UserPlanRecipe
                      key={recipe.id}
                      userPlan={userPlan}
                      mealIndex={meal.mealIndex}
                      recipeIndex={recipe.recipeIndex}
                    />
                  ))
                ) : (
                  <div className='py-3 px-3 text-xs rounded-2xl border border-dashed border-border/70 text-muted-foreground'>
                    No recipe options added to this meal yet.
                  </div>
                )}
              </div>

              {hasText(meal.veges) ? (
                <div className='flex gap-2 items-center py-2 px-2.5 mt-2 border rounded-[18px] border-emerald-500/20 bg-emerald-500/[0.1]'>
                  <div className='flex-1 min-w-0'>
                    <div className='font-semibold uppercase text-[10px] tracking-[0.14em] text-emerald-700/80 dark:text-emerald-300/80'>
                      Vegetable side
                    </div>
                    <div className='mt-0.5 text-xs font-medium dark:text-emerald-50 truncate text-emerald-950'>
                      {meal.vegeNotes || meal.veges}
                    </div>
                  </div>
                  <UserPlanVege
                    userPlan={userPlan}
                    mealIndex={meal.mealIndex}
                  />
                </div>
              ) : null}
            </section>
          )
        })}
      </CardContent>
    </Card>
  )
}

export { UserPlanView }
