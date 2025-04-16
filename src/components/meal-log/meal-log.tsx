'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import {
  cn,
  getRecipeDetailsForDailyLog,
  getRecipeDetailsFromDailyLog,
} from '@/lib/utils'
import { GetAllDailyLogs, GetUserById, UserPlan } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, Salad } from 'lucide-react'
import { toast } from 'sonner'

import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { Label } from '../ui/label'
import { MealBottomSheet } from './meal-bottom-sheet'

export const dynamic = 'force-dynamic'

const Meal = ({
  date,
  allPlans,
  dailyLogs,
  userId,
  index,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  allPlans: UserPlan[]
  userId: string
  index: number
}) => {
  const [selectValue, setSelectValue] = useState<string>('')

  const [recipeName, setRecipeName] = useState<string>('')

  const [selectedPlans, setSelectedPlans] = useState<string[]>(() => {
    if (allPlans.length === 1)
      return [...allPlans.map((plan) => plan?.id.toString() ?? '')]
    return ['']
  })

  const [mealIndex, setMealIndex] = useState(() => index)

  const ctx = api.useUtils()
  const { mutate: addMeal } = api.dailyLog.addMeal.useMutation({
    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
    onSuccess: () => {
      toast.success(`${recipeName} Added`)
    },
    onError: (err, newLog, context) => {
      toast.error('error')
    },
  })
  const log = dailyLogs?.find(
    (dailyLog) => dailyLog.date === date.toDateString(),
  )
  console.log('logs', log)

  const logMeal = dailyLogs
    ?.find((dailyLog) => dailyLog.date === date.toDateString())
    ?.dailyMeals.find((dailyMeal) => dailyMeal.mealIndex == mealIndex)

  const recipes = allPlans.map((plan) => plan?.userRecipes).flat()

  useEffect(() => {
    if (logMeal) {
      setSelectValue(logMeal?.recipeId?.toString() ?? '')
    }
  }, [logMeal])

  return (
    <div className='flex gap-0 flex flex-col items-start w-full'>
      <div className='pb-4'>
        <ToggleGroup
          orientation='vertical'
          size='sm'
          variant='outline'
          type='multiple'
          className='w-full justify-start flex flex-wrap'
          value={selectedPlans}
          onValueChange={setSelectedPlans}
        >
          {allPlans?.map((plan) => {
            if (!plan) return null
            return (
              <ToggleGroupItem
                key={plan.id}
                value={plan.id.toString()}
                className={cn(
                  'text-xs truncate max-w-32 py-1 px-2 tracking-tight h-min',
                  'data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none',
                  'block rounded-full font-semibold',
                )}
              >
                {plan.name}
              </ToggleGroupItem>
            )
          })}
        </ToggleGroup>
      </div>

      <ToggleGroup
        orientation='vertical'
        size='sm'
        variant='outline'
        type='single'
        className='w-full justify-start'
        value={selectValue}
        onValueChange={(value) => {
          setSelectValue(value)
          const recipe = recipes.find((recipe) => recipe?.id == Number(value))
          setRecipeName(recipe?.name ?? '')
          const plan = allPlans.find((plan) =>
            plan?.userRecipes?.find((recipe) => recipe?.id == Number(value)),
          )
          if (!recipe || !plan) return
          addMeal({
            userId: userId,
            planId: plan.id,
            mealIndex: index,
            recipeIndex: recipe?.recipeIndex,
            recipeId: Number(value),
            date: date,
            logId: log?.id || null,
          })
        }}
      >
        <div className='flex flex-col ml-2 gap-2'>
          {allPlans
            ?.filter((plan) =>
              selectedPlans.includes(plan?.id.toString() ?? 'aabb'),
            )
            ?.map((plan) => {
              if (!plan) return null
              if (plan.userRecipes?.length === 0) return null

              return (
                <div
                  key={plan.id}
                  className='flex flex-col'
                >
                  <div className='flex gap-4 items-center'>
                    <h3 className='font-semibold text-primary/80'>
                      {plan.name}
                    </h3>
                  </div>
                  <div className='flex gap-2 flex-col items-center py-2 w-full'>
                    {plan.userRecipes?.map((recipe) => {
                      const { cals, protein, carbs, fat } =
                        getRecipeDetailsForDailyLog(plan, recipe.id)
                      return (
                        <ToggleGroupItem
                          key={recipe?.id}
                          value={recipe?.id.toString() ?? ''}
                          className={cn(
                            'text-sm truncate max-w-[600px]  py-2 px-4 data-[state=on]:bg-blue-900/70 relative',
                            'data-[state=on]:text-slate-100 data-[state=on]:shadow-none',
                            'h-full shadow-md flex flex-col w-[calc(100vw-2rem)]',
                          )}
                        >
                          <div className=' flex'>
                            <div className='truncate font-semibold'>
                              {recipe?.name && recipe?.name?.length > 41
                                ? recipe?.name?.slice(0, 43) + '...'
                                : recipe?.name}
                            </div>
                            <div className='absolute -top-1 right-1 text-[0.6rem] data-[state=off]:text-muted-foreground font-light'>{`${cals} cals`}</div>
                          </div>

                          <div className='text-xs data-[state=off]:text-muted-foreground flex gap-4 font-medium'>
                            <div>{`C:${carbs}g`}</div>
                            <div>{`P:${protein}g`}</div>
                            <div>{`F:${fat}g`}</div>
                          </div>
                        </ToggleGroupItem>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </ToggleGroup>
    </div>
  )
}

const MealLog = ({
  currentUser,
  dailyLogs,
}: {
  currentUser: GetUserById
  dailyLogs: GetAllDailyLogs | null | undefined
}) => {
  const today = new Date()

  const [isAllMeals, setIsAllMeals] = useState<boolean>(() => {
    return (
      currentUser.id === 'f3feb152-06de-4a1e-8c9f-19d5c96c6788' ||
      currentUser.id === 'f19482e2-a009-4dd4-801d-4aff3911924a'
    )
  })

  const ctx = api.useUtils()

  const [isOpen, setIsOpen] = useState(false)

  const activePlans = currentUser?.userPlans.filter((plan) => plan.isActive)

  const { mutate: deleteMeal } = api.dailyLog.deleteMeal.useMutation({
    onMutate: async () => {
      console.log('deleteMeal')
    },

    onSettled: () => {
      console.log('settled')
      ctx.dailyLog.invalidate()
    },
  })
  const onDeleteMeal = ({ id }: { id: number }) => {}
  const isNotActivePlan = activePlans.length === 0

  const todaysLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date === today.toDateString(),
  )

  const currentMeal = todaysLog?.dailyMeals?.length ?? 0

  const recipes = activePlans
    .map((plan) => plan.userRecipes)
    .flat()
    .filter((recipe) => recipe.mealIndex === currentMeal)

  const isAll =
    currentUser.id === 'f3feb152-06de-4a1e-8c9f-19d5c96c6788' ||
    currentUser.id === 'f19482e2-a009-4dd4-801d-4aff3911924a'

  const recipePlans = activePlans.map((plan) => {
    return {
      id: plan?.id ?? 0,
      name: plan?.name ?? '',
      mealCals:
        plan?.userMeals.find((meal) => meal.mealIndex == currentMeal)
          ?.calories ?? '',
      recipes: plan?.userRecipes.filter(
        (recipe) => recipe.mealIndex == currentMeal || isAllMeals,
      ),
    }
  })

  const refinedPlans = activePlans.map((plan) => {
    return {
      ...plan,
      userRecipes: plan.userRecipes.filter(
        (recipe) => recipe.mealIndex === currentMeal || isAllMeals,
      ),
    }
  })

  const isFinished =
    currentMeal ===
    activePlans
      .map((plan) => plan.userMeals?.length)
      .reduce((a, b) => (a > b ? a : b), 0)

  const mealsMacros = todaysLog?.dailyMeals
    .map((meal) => {
      const { cals, protein, carbs, fat } = getRecipeDetailsFromDailyLog(
        todaysLog,
        meal.mealIndex ?? 0,
      )
      return {
        cals: Number(cals),
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
      }
    })
    .reduce(
      (acc, curr) => {
        return {
          cals: acc.cals + curr.cals,
          protein: acc.protein + curr.protein,
          carbs: acc.carbs + curr.carbs,
          fat: acc.fat + curr.fat,
        }
      },
      {
        cals: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    )

  return (
    <div className='flex flex-col gap-0 w-full items-center'>
      <Sheet.Root license='non-commercial'>
        <div className='flex flex-col gap-0 items-center justify-start w-full'>
          <div className={cn('text-lg font-semibold')}>
            Meal {currentMeal + 1}
          </div>
          <div
            className={cn(
              'rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center',
              'justify-center active:scale-75 transition-transform cursor-pointer',
              isOpen ? 'scale-75' : '',
            )}
          >
            <Sheet.Trigger disabled={isNotActivePlan}>
              <Salad
                size={28}
                className={cn(
                  'text-primary/80 hover:text-primary active:scale-90 transition-transform cursor-pointer',
                  isOpen ? 'scale-90' : '',
                )}
              />
            </Sheet.Trigger>
          </div>
        </div>
        <Sheet.Portal>
          <Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
            <Sheet.Content className='min-h-[200px] max-h-[90vh] h-full rounded-t-3xl bg-background relative'>
              <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col '>
                  <div className='flex justify-center pt-1'>
                    <Sheet.Handle
                      className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
                      action='dismiss'
                    />
                  </div>
                  <div className='flex gap-0 pt-2 flex-col border-b-[1px] border-primary pb-4 relative font-medium'>
                    <div className='flex justify-center'>
                      <Sheet.Title className='text-xl ml-0 font-semibold'>
                        Meal {currentMeal + 1}
                      </Sheet.Title>
                      <Sheet.Description className='hidden'>
                        Meal Log
                      </Sheet.Description>
                    </div>
                    <div className='flex items-baseline'>
                      <div className='flex items-center gap-2'>
                        <NumberFlow
                          value={mealsMacros?.cals ?? 0}
                          className='text-lg text-primary ml-2 '
                        />
                        <span className='text-xs text-primary/50 ml-[1px]'>
                          cals
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <NumberFlow
                          value={mealsMacros?.carbs ?? 0}
                          className='text-lg text-primary ml-2 '
                        />
                        <span className='text-xs text-primary/50 ml-[1px]'>
                          carbs
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <NumberFlow
                          value={mealsMacros?.protein ?? 0}
                          className='text-lg text-primary ml-2 '
                        />
                        <span className='text-xs text-primary/50 ml-[1px]'>
                          protein
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <NumberFlow
                          value={mealsMacros?.fat ?? 0}
                          className='text-lg text-primary ml-2 '
                        />
                        <span className='text-xs text-primary/50 ml-[1px]'>
                          fat
                        </span>
                      </div>
                    </div>
                    {isAll ? (
                      <div className='flex items-center gap-2 absolute top-1 right-2'>
                        <Label className='text-xs mt-1'>All Meals</Label>
                        <Checkbox
                          checked={isAllMeals}
                          onCheckedChange={(checked) => {
                            setIsAllMeals(checked === true)
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                  <ScrollArea className='pt-4 px-2 h-[calc(90vh-130px)]'>
                    <div className='flex flex-col gap-2 '>
                      <Meal
                        allPlans={refinedPlans}
                        date={today}
                        dailyLogs={dailyLogs}
                        userId={currentUser.id}
                        index={currentMeal}
                      />
                    </div>
                  </ScrollArea>
                </div>
                <Sheet.Trigger
                  className='w-full flex justify-center'
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
      <MealBottomSheet
        todaysDailyLog={todaysLog}
        deleteMealLog={onDeleteMeal}
      />
    </div>
  )
}

export { MealLog }
