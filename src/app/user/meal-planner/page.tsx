'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { GetAllDailyLogs, GetUserById, UserPlan, UserRecipe } from '@/types'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { ChevronLeft, ChevronRight, CircleX, Loader } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const selectedPlansIdAtom = atomWithStorage<string[]>('selectedPlansId', [])

const dynamic = 'force-dynamic'

const Meal = ({
  date,
  plans,
  dailyLogs,
  userId,
  index,
  recipeId,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  plans: {
    id: number
    name: string
    recipes: UserRecipe[] | undefined
  }[]
  userId: string
  index: number
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
    (dailyLog) => dailyLog.date === date.toDateString(),
  )

  const logMeal = dailyLogs
    ?.find((dailyLog) => dailyLog.date === date.toDateString())
    ?.dailyMeals.find((dailyMeal) => dailyMeal.mealIndex == index)

  const recipes = plans.map((plan) => plan.recipes).flat()

  return (
    <div className='flex gap-0 flex flex-col items-start w-full'>
      <div className='text-sm text-muted-foreground font-medium'>
        Meal {Number(index) + 1}
      </div>

      <ToggleGroup
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
        <div className='flex flex-col ml-4'>
          {plans?.map((plan) => {
            if (plan.recipes?.length === 0) return null
            return (
              <div
                key={plan.id}
                className='flex flex-col'
              >
                <h3>{plan.name}</h3>
                <div className='flex gap-1 items-center'>
                  {plan.recipes?.map((recipe) => (
                    <ToggleGroupItem
                      key={recipe?.id}
                      value={recipe?.id.toString() ?? ''}
                      className='text-xs py-1 px-1 data-[state=on]:bg-blue-900/70 data-[state=on]:text-slate-100 data-[state=on]:shadow-none h-7'
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

      <CircleX
        size={20}
        className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform active:text-red-500 hidden'
        onClick={() => {
          // setSelectValue('')
          deleteMeal({
            userId: userId,
            mealIndex: index,
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
  plans,
  dailyLogs,
  userId,
  index,
  setIsLoading,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  plans: UserPlan[]
  userId: string
  index: number
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const ctx = api.useUtils()
  const [selectedPlansId] = useAtom(selectedPlansIdAtom)
  const { mutate: copyWeek } = api.dailyLog.copyWeek.useMutation({
    onSettled: () => {
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
    (dailyLog) => dailyLog.date === date.toDateString(),
  )

  const numMeals = plans
    .filter((plan) => selectedPlansId.includes(plan?.id.toString() ?? ''))
    .reduce((acc, curr) => {
      return acc > (curr?.userMeals.length ?? 0)
        ? acc
        : Number(curr?.userMeals.length)
    }, 0)

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
            if (!logId) return
            clearDay({
              logId: logId,
            })
          }}
        >
          Clear
        </Button>
      </div>
      <div className='flex gap-2 flex-col'>
        {Array.from({ length: numMeals }).map((_, i) => {
          const logMeal = dailyLogs
            ?.find((dailyLog) => dailyLog.date === date.toDateString())
            ?.dailyMeals.find((dailyMeal) => dailyMeal.mealIndex == i)
          const recipePlans = plans
            .map((plan) => {
              return {
                id: plan?.id ?? 0,
                name: plan?.name ?? '',
                recipes: plan?.userRecipes.filter(
                  (recipe) => recipe.mealIndex == i,
                ),
              }
            })
            .filter((plan) => selectedPlansId.includes(plan.id.toString()))
          return (
            <Meal
              key={i}
              date={date}
              dailyLogs={dailyLogs}
              plans={recipePlans}
              userId={userId}
              index={i}
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
              if (!logId) return
              copyWeek({
                userId: userId,
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

  const [selectedPlansId, setSelectedPlansId] = useAtom(selectedPlansIdAtom)
  const [toggle, setToggle] = useState(false)

  console.log('selectedPlansId', selectedPlansId)

  useEffect(() => {
    const id = currentUser?.userPlans?.[0]?.id.toString()
    if (id && selectedPlansId.length === 0) {
      setSelectedPlansId([id])
    }
  }, [])

  useEffect(() => {
    console.log('selectedPlansId', selectedPlansId)
  }, [selectedPlansId])

  const currentUserPlans = currentUser?.userPlans.filter(
    (plan) => plan.isActive,
  )

  if (isLoadingDailyLogs) return null
  if (!currentUserPlans || currentUserPlans.length === 0) return null
  return (
    <div className='flex flex-col gap-2 w-full'>
      <div className='px-2 py-1 bg-secondary text-sm'>
        <ToggleGroup
          size='sm'
          variant='outline'
          type='multiple'
          className='w-full justify-center'
          value={selectedPlansId}
          onValueChange={(value) => {
            console.log('value', value)
            setToggle(!toggle)
            setSelectedPlansId(value)
          }}
        >
          {currentUserPlans.map((plan) => (
            <ToggleGroupItem
              key={plan.id}
              value={plan.id.toString()}
              className='text-xs py-1 px-1 hover:bg-background hover:text-foreground'
            >
              {plan.name}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      {Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(weekStart.getTime() + i * 86400000)
        return (
          <Day
            key={i}
            index={i}
            date={date}
            dailyLogs={dailyLogs}
            plans={currentUserPlans}
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
  const [_selectedPlansId] = useAtom(selectedPlansIdAtom)
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date()
    return today.getDay() === 0
      ? new Date(today.setDate(today.getDate() - today.getDay() - 1))
      : today.getDay() === 1
        ? today
        : new Date(today.setDate(today.getDate() - today.getDay() + 1))
  })
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  console.log('currentUser', currentUser)

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
