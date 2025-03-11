'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { GetAllDailyLogs, GetUserById, userPlan, UserRecipe } from '@/types'
import NumberFlow from '@number-flow/react'
import { CircleX, ListCollapse, Salad, Toilet } from 'lucide-react'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const dynamic = 'force-dynamic'

const Meal = ({
  date,
  plans,
  dailyLogs,
  userId,
  index,
  setIsOpen,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
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
    ?.dailyMeals.find((dailyMeal) => dailyMeal.mealIndex == index)

  const recipes = plans.map((plan) => plan.recipes).flat()

  return (
    <div className='flex gap-0 flex flex-col items-start w-full'>
      <DialogHeader>
        <DialogTitle>Meal {index}</DialogTitle>
        <DialogDescription></DialogDescription>
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
        <div className='flex flex-col ml-2'>
          {plans?.map((plan) => {
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
                <div className='flex gap-4 flex-col items-start mt-2'>
                  {plan.recipes?.map((recipe) => (
                    <ToggleGroupItem
                      key={recipe?.id}
                      value={recipe?.id.toString() ?? ''}
                      className='text-sm truncate min-w-44 py-1 px-2 data-[state=on]:bg-blue-900/70 data-[state=on]:text-slate-100 data-[state=on]:shadow-none h-8'
                    >
                      {recipe?.name}
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

  const meals = activePlans
    .map((plan) => plan.userMeals)
    .flat()
    .filter((meal) => meal.mealIndex === currentMeal)

  const recipes = activePlans
    .map((plan) => plan.userRecipes)
    .flat()
    .filter((recipe) => recipe.mealIndex === currentMeal)
  console.log('recipes', recipes)

  console.log('todaysLog', todaysLog)

  const recipePlans = activePlans.map((plan) => {
    return {
      id: plan?.id ?? 0,
      name: plan?.name ?? '',
      mealCals:
        plan?.userMeals.find((meal) => meal.mealIndex == currentMeal)
          ?.calories ?? '',
      recipes: plan?.userRecipes.filter(
        (recipe) => recipe.mealIndex == currentMeal,
      ),
    }
  })

  return (
    <div className='flex flex-col gap-0 w-full relative col-span-3'>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger disabled={isNotActivePlan}>
          <div className='flex flex-col gap-0 items-center justify-start w-full'>
            <div className='text-lg font-semibold'>Meal {currentMeal + 1}</div>
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
          onOpenAutoFocus={(e) => {
            e.preventDefault()
          }}
        >
          <Meal
            date={today}
            dailyLogs={dailyLogs}
            plans={recipePlans}
            userId={currentUser.id}
            index={currentMeal}
            setIsOpen={setIsOpen}
          />
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
                <div className=''>
                  {meal.recipe?.[0]?.name}</div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export { MealLog }
