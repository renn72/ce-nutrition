'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { cn, getRecipeDetailsForDailyLog } from '@/lib/utils'
import { GetAllDailyLogs, GetUserById, UserPlan, UserRecipe } from '@/types'
import { ChevronsLeft, ChevronsRight, ListCollapse, Salad } from 'lucide-react'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Switch } from '@/components/ui/switch'
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
  setIsOpen,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  allPlans: UserPlan[]
  userId: string
  index: number
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
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
    onMutate: async () => {
      await ctx.dailyLog.getAllCurrentUser.cancel()
      const previousLog = ctx.dailyLog.getAllUser.getData(userId)
      if (!previousLog) return
      ctx.dailyLog.getAllUser.setData(userId, [
        ...previousLog.map((log) => {
          if (log.date === date.toDateString()) {
            return {
              ...log,
              dailyMeals: [
                ...log.dailyMeals,
                {
                  id: -1,
                  createdAt: new Date(),
                  dailyLogId: -1,
                  mealIndex: null,
                  date: null,
                  recipeId: null,
                  vegeCalories: null,
                  veges: null,
                  recipe: [],
                  ingredients: [],
                },
              ],
            }
          }
          return log
        }),
      ])
      return { previousLog }
    },

    onSettled: () => {
      ctx.dailyLog.invalidate()
    },
    onSuccess: () => {
      toast.success(`${recipeName} Added`)
    },
    onError: (err, newLog, context) => {
      toast.error('error')
      ctx.dailyLog.getAllUser.setData(userId, context?.previousLog)
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
      <DialogHeader className='pb-4'>
        <DialogTitle className='text-xl flex gap-6 items-center w-full justify-center relative'>
          <ChevronsLeft
            size={32}
            className='cursor-pointer hidden '
            onClick={() => {
              setMealIndex(mealIndex - 1)
            }}
          />
          <div className='mt-[6px]'>Meal {mealIndex + 1}</div>
          <ChevronsRight
            size={32}
            className='cursor-pointer hidden '
            onClick={() => {
              setMealIndex(mealIndex + 1)
            }}
          />
        </DialogTitle>
        <DialogDescription></DialogDescription>
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
                  'text-xs truncate max-w-28 py-1 px-2 tracking-tight h-min',
                  'data-[state=on]:bg-foreground data-[state=on]:text-background data-[state=on]:shadow-none',
                  'block rounded-full font-semibold',
                )}
              >
                {plan.name}
              </ToggleGroupItem>
            )
          })}
        </ToggleGroup>
      </DialogHeader>

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
          setIsOpen(false)
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

  const [isAllMeals, setIsAllMeals] = useState<boolean>(false)
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

  return (
    <div className='flex flex-col gap-0 w-full relative col-span-3'>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className='flex flex-col gap-0 items-center justify-start w-full'>
          <div
            className={cn(
              'text-lg font-semibold',
              isFinished ? 'opacity-0' : '',
            )}
          >
            Meal {currentMeal + 1}
          </div>
          <div
            className={cn(
              'rounded-full border-[3px] border-primary/80 w-11 h-11 flex items-center',
              'justify-center active:scale-75 transition-transform cursor-pointer',
              isOpen ? 'scale-75' : '',
            )}
          >
            <DialogTrigger disabled={isNotActivePlan}>
              <Salad
                size={28}
                className={cn(
                  'text-primary/80 hover:text-primary active:scale-90 transition-transform cursor-pointer',
                  isOpen ? 'scale-90' : '',
                )}
              />
            </DialogTrigger>
          </div>
        </div>
        <DialogContent
          className='px-2 min-h-[60vh] top-20 translate-y-0 '
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <ScrollArea className='max-h-[80vh]'>
            {isAll ? (
              <div className='flex items-center gap-2'>
                <Label> All Meals </Label>
                <Switch
                  checked={isAllMeals}
                  onCheckedChange={(checked) => {
                    setIsAllMeals(checked)
                  }}
                />
              </div>
            ) : null}
            <Meal
              allPlans={refinedPlans}
              date={today}
              dailyLogs={dailyLogs}
              userId={currentUser.id}
              index={currentMeal}
              setIsOpen={setIsOpen}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <MealBottomSheet
        todaysDailyLog={todaysLog}
        deleteMealLog={deleteMeal}
      />
    </div>
  )
}

export { MealLog }
