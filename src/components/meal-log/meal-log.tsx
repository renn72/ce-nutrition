'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs, GetUserById, UserPlan, UserRecipe } from '@/types'
import NumberFlow from '@number-flow/react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleX,
  ListCollapse,
  Salad,
  Toilet,
} from 'lucide-react'
import { toast } from 'sonner'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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

export const dynamic = 'force-dynamic'

const Meal = ({
  date,
  plans,
  allPlans,
  dailyLogs,
  userId,
  index,
  setIsOpen,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  allPlans: UserPlan[]
  plans: {
    id: number
    name: string
    mealCals: string
    recipes: UserRecipe[] | undefined
  }[]
  userId: string
  index: number
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [selectValue, setSelectValue] = useState<string>('')

  const [selectedPlans, setSelectedPlans] = useState<string[]>([''])

  const [mealIndex, setMealIndex] = useState(() => index)

  const ctx = api.useUtils()
  const { mutate: addMeal } = api.dailyLog.addMeal.useMutation({
    onMutate: async () => {
      console.log('addMeal')
    },

    onSettled: () => {
      setIsOpen(false)
      ctx.dailyLog.invalidate()
    },
  })
  const { mutate: deleteMeal } = api.dailyLog.deleteMeal.useMutation({
    onMutate: async () => {
      console.log('deleteMeal')
    },

    onSettled: () => {
      console.log('settled')
      ctx.dailyLog.invalidate()
    },
  })
  const log = dailyLogs?.find(
    (dailyLog) => dailyLog.date === date.toDateString(),
  )

  const logMeal = dailyLogs
    ?.find((dailyLog) => dailyLog.date === date.toDateString())
    ?.dailyMeals.find((dailyMeal) => dailyMeal.mealIndex == mealIndex)
  console.log('logMeal', logMeal)

  const recipes = plans.map((plan) => plan.recipes).flat()

  useEffect(() => {
    if (logMeal) {
      setSelectValue(logMeal?.recipeId?.toString() ?? '')
    }
  }, [logMeal])

  console.log('selectValue', selectValue)

  return (
    <div className='flex gap-0 flex flex-col items-start w-full'>
      <DialogHeader className='pb-4'>
        <DialogTitle className='text-xl flex gap-6 items-center w-full justify-center relative'>
          <ChevronsLeft
            size={32}
            className='cursor-pointer '
            onClick={() => {
              setMealIndex(mealIndex - 1)
            }}
          />
          <div className='mt-[6px]'>Meal {mealIndex + 1}</div>
          <ChevronsRight
            size={32}
            className='cursor-pointer '
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
          {plans?.map((plan) => (
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
          ))}
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
          const plan = plans.find((plan) =>
            plan.recipes?.find((recipe) => recipe?.id == Number(value)),
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
          {plans
            ?.filter((plan) => selectedPlans.includes(plan.id.toString()))
            ?.map((plan) => {
              if (plan.recipes?.length === 0) return null
              return (
                <div
                  key={plan.id}
                  className='flex flex-col'
                >
                  <div className='flex gap-4 items-center'>
                    <h3>{plan.name}</h3>
                    {plan.mealCals === '' ? null : (
                      <div className='text-[0.7rem] text-muted-foreground'>
                        {plan.mealCals}cals
                      </div>
                    )}
                  </div>
                  <div className='flex gap-1 flex-col items-start mt-2'>
                    {plan.recipes?.map((recipe) => (
                      <ToggleGroupItem
                        key={recipe?.id}
                        value={recipe?.id.toString() ?? ''}
                        className='text-sm truncate min-w-44  py-1 px-2 data-[state=on]:bg-blue-900/70 data-[state=on]:text-slate-100 data-[state=on]:shadow-none h-8'
                      >
                        {recipe?.name && recipe?.name?.length > 40
                          ? recipe?.name?.slice(0, 37) + '...'
                          : recipe?.name}
                      </ToggleGroupItem>
                    ))}
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

  console.log('activePlans', activePlans)
  console.log('currentUser', currentUser)

  const isNotActivePlan = activePlans.length === 0

  const todaysLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date === today.toDateString(),
  )

  const currentMeal = todaysLog?.dailyMeals?.length ?? 0

  const recipes = activePlans
    .map((plan) => plan.userRecipes)
    .flat()
    .filter((recipe) => recipe.mealIndex === currentMeal)
  console.log('recipes', recipes)

  console.log('todaysLog', todaysLog)

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
        <DialogTrigger disabled={isNotActivePlan}>
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
              <Salad
                size={28}
                className={cn(
                  'text-primary/80 hover:text-primary active:scale-90 transition-transform cursor-pointer',
                  isOpen ? 'scale-90' : '',
                )}
              />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent
          className='px-2'
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
              allPlans={activePlans}
              date={today}
              dailyLogs={dailyLogs}
              plans={recipePlans}
              userId={currentUser.id}
              index={currentMeal}
              setIsOpen={setIsOpen}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>
      <Collapsible>
        <CollapsibleTrigger className='flex gap-2 items-center justify-center absolute top-10 right-0'>
          <ListCollapse
            size={20}
            className='text-muted-foreground'
          />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className='flex flex-col gap-0 divide-y divide-border items-start justify-center mt-[4px] text-muted-foreground tracking-tight px-[6px]'>
            {todaysLog?.dailyMeals.map((meal) => (
              <div
                key={meal.mealIndex}
                className='text-xs flex flex-col items-start py-[2px]'
              >
                <div>
                  {meal.createdAt.toLocaleTimeString('en-AU', {
                    hour: 'numeric',
                    minute: 'numeric',
                  })}
                </div>
                <div className=''>{meal.recipe?.[0]?.name}</div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export { MealLog }
