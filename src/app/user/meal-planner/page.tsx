'use client'

import { api } from '@/trpc/react'
import { toast } from 'sonner'

import { useEffect, useState } from 'react'

import { GetAllDailyLogs, GetUserById, UserMeal, UserPlan } from '@/types'
import { ChevronLeft, ChevronRight, CircleX, Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const dynamic = 'force-dynamic'

const Meal = ({
  date,
  plan,
  dailyLogs,
  userId,
  index,
  meal,
  recipeId,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  plan: UserPlan
  userId: string
  index: number
  meal: UserMeal
  recipeId: number | null
}) => {
  const [selectValue, setSelectValue] = useState<string>(
    () => recipeId?.toString() ?? '',
  )

  useEffect(() => {
    setSelectValue(recipeId?.toString() ?? '')
  }, [recipeId])

  const ctx = api.useUtils()
  const { mutate: addMeal } = api.dailyLog.addMeal.useMutation({
    onMutate: async () => {
      console.log('addMeal')
    },

    onSettled: () => {
      console.log('settled')
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
    (dailyLog) => dailyLog.date.toDateString() === date.toDateString(),
  )

  const recipes = plan?.userRecipes.filter(
    (recipe) => recipe.mealIndex == meal?.mealIndex,
  )

  const logMeal = dailyLogs
    ?.find((dailyLog) => dailyLog.date.toDateString() === date.toDateString())
    ?.dailyMeals.find((dailyMeal) => dailyMeal.mealIndex == meal?.mealIndex)

  if (!plan) return null
  if (!meal) return null

  if (!recipes) return null

  return (
    <div
      key={meal.id}
      className='flex gap-2 flex flex-col items-start w-full'
    >
      <div className='text-sm text-muted-foreground font-medium truncate w-24'>
        {meal.mealTitle}
      </div>

        <ToggleGroup type='single'
          className='w-full justify-start'
          value={selectValue}
          onValueChange={(value) => {
            setSelectValue(value)
            const recipe = plan.userRecipes.find(
              (recipe) => recipe.id == Number(value),
            )
            addMeal({
              userId: userId,
              planId: plan.id,
              mealIndex: meal.mealIndex,
              recipeIndex: recipe?.recipeIndex,
              recipeId: Number(value),
              date: date,
              logId: log?.id || null,
            })
          }}
        >

          {recipes.map((recipe) => (
            <ToggleGroupItem
              key={recipe.id}
              value={recipe.id.toString()}
              className='text-xs py-1 px-1'
            >
              {recipe.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

      <CircleX
        size={20}
        className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform active:text-red-500 hidden'
        onClick={() => {
          // setSelectValue('')
          deleteMeal({
            userId: userId,
            planId: plan.id,
            mealIndex: meal.mealIndex,
            date: date,
            logId: log?.id || null,
          })
        }}
      />
    </div>
  )
}

const Day = ({
  date,
  plan,
  dailyLogs,
  userId,
  index,
  setIsLoading,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  plan: UserPlan
  userId: string
  index: number
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const ctx = api.useUtils()
  const { mutate: copyWeek } = api.dailyLog.copyWeek.useMutation({
    onSettled:  () => {
      setIsLoading(false)
    },
    onSuccess: async () => {
      await ctx.dailyLog.invalidate()
      toast.success('Copied week')
    },
  })
  const { mutate: clearDay } = api.dailyLog.clearDay.useMutation({
    onSuccess: async () => {
      await ctx.dailyLog.invalidate()
      toast.success('Cleared day')
    },
  })
  const todaysLog = dailyLogs?.find(
    (dailyLog) => dailyLog.date.toDateString() === date.toDateString(),
  )

  return (
    <div className='flex gap-2 flex-col w-full bg-secondary min-h-[70px] px-4 py-1'>
      <div className='w-full flex justify-between items-center'>
      <div className='text-sm text-muted-foreground font-medium'>
        {date.toLocaleDateString('en-AU', {
          weekday: 'long',
          day: 'numeric',
        })}
      </div>
        <Button
          variant='outline'
          size='sm'
          className='bg-background/10'
          onClick={() => {
            const logId = todaysLog?.id
            const planId = plan?.id
            if (!logId || !planId) return
            clearDay({
              logId: logId,
            })
          }}
        >
        Clear
        </Button>
      </div>
      <div className='flex gap-2 flex-col'>
        {plan?.userMeals.map((meal) => {
          const logMeal = dailyLogs
            ?.find(
              (dailyLog) =>
                dailyLog.date.toDateString() === date.toDateString(),
            )
            ?.dailyMeals.find(
              (dailyMeal) => dailyMeal.mealIndex == meal?.mealIndex,
            )
          return (
            <Meal
              key={meal.id}
              date={date}
              dailyLogs={dailyLogs}
              plan={plan}
              userId={userId}
              index={index}
              meal={meal}
              recipeId={logMeal?.recipeId || null}
            />
          )
        })}
      </div>
      {index === 0 ? (
        <div className='flex gap-2 justify-end'>
          <Button
            variant='ghost'
            size='sm'
            className='text-xs'
            onClick={() => {
              const logId = todaysLog?.id
              const planId = plan?.id
              if (!logId || !planId) return
              copyWeek({
                userId: userId,
                planId: planId,
                logId: logId,
              })
              setIsLoading(true)
            }}
          >
            Apply to all week
          </Button>
        </div>
      ) : null}
    </div>
  )
}

const DayList = ({
  userId,
  weekStart,
  currentUser,
  setIsLoading,
}: {
  userId: string
  weekStart: Date
  currentUser: GetUserById
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { data: dailyLogs, isLoading: isLoadingDailyLogs } =
    api.dailyLog.getAllUser.useQuery(userId)

  const currentUserPlan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )

  if (isLoadingDailyLogs) return null
  if (!currentUserPlan) return <div>No Program Found</div>
  return (
    <div className='flex flex-col gap-2 w-full'>
      {Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(weekStart.getTime() + i * 86400000)
        return (
          <Day
            key={i}
            index={i}
            date={date}
            dailyLogs={dailyLogs}
            plan={currentUserPlan}
            userId={userId}
            setIsLoading={setIsLoading}
          />
        )
      })}
    </div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date()
    return today.getDay() === 0
      ? new Date(today.setDate(today.getDate() - today.getDay() - 1))
      : today.getDay() === 1
        ? today
        : new Date(today.setDate(today.getDate() - today.getDay() + 1))
  })
  const { data: currentUser } = api.user.getCurrentUser.useQuery()

  // console.log(weekStart)

  if (!currentUser) return null

  return (
    <div className='flex flex-col gap-2 w-full text-sm my-16'>
      {isLoading && (
        <div className='absolute top-0 h-screen w-screen bg-primary/50 z-[999] flex justify-center items-center'>
          <Loader
            className='animate-spin '
            size={32}
            color='white'
          />
        </div>
      )}
      <div className='flex gap-2 justify-between px-6 bg-secondary w-full py-2 items-end text-base font-semibold text-muted-foreground '>
        <ChevronLeft
          onClick={() =>
            setWeekStart(new Date(weekStart.getTime() - 86400000 * 7))
          }
          size={26}
        />
        {weekStart.toLocaleDateString('en-AU', {
          month: 'long',
          day: 'numeric',
        })}
        <ChevronRight
          onClick={() =>
            setWeekStart(new Date(weekStart.getTime() + 86400000 * 7))
          }
          size={26}
        />
      </div>
      <DayList
        setIsLoading={setIsLoading}
        userId={currentUser.id}
        weekStart={weekStart}
        currentUser={currentUser}
      />
    </div>
  )
}
