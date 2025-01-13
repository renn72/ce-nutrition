'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { GetAllDailyLogs, GetUserById, UserPlan } from '@/types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const Day = ({
  date,
  plan,
  dailyLogs,
  userId,
}: {
  date: Date
  dailyLogs: GetAllDailyLogs | null | undefined
  plan: UserPlan
  userId: string
}) => {
  const ctx = api.useUtils()
  const { mutate: createDailyLog } = api.dailyLog.create.useMutation({
    onSuccess: () => {
      // ctx.dailyLog.getAllUser.refetch()
    },
    onSettled: () => {},
  })
  const log = dailyLogs?.find(
    (dailyLog) => dailyLog.date.toDateString() === date.toDateString(),
  )
  console.log('log', plan)
  return (
    <div className='flex gap-2 flex-col w-full bg-secondary min-h-[70px] px-4 py-1'>
      <div className='text-sm text-muted-foreground font-medium'>
        {date.toLocaleDateString('en-AU', {
          weekday: 'long',
          day: 'numeric',
        })}
        <div>
          {plan?.userMeals.map((meal) => {
            const recipes = plan.userRecipes.filter(
              (recipe) => recipe.mealIndex == meal.mealIndex,
            )
            return (
              <div
                key={meal.id}
                className='flex gap-2 flex-col'
              >
                <div className='text-sm text-muted-foreground font-medium'>
                  {meal.mealTitle}
                </div>
                <ToggleGroup type='single'>
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
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const DayList = ({
  userId,
  weekStart,
  currentUser,
}: {
  userId: string
  weekStart: Date
  currentUser: GetUserById
}) => {
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)

  const currentUserPlan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )

  if (!currentUserPlan) return <div>No Program Found</div>
  return (
    <div className='flex flex-col gap-2 w-full'>
      {Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(weekStart.getTime() + i * 86400000)
        return (
          <Day
            key={i}
            date={date}
            dailyLogs={dailyLogs}
            plan={currentUserPlan}
            userId={userId}
          />
        )
      })}
    </div>
  )
}

export default function Home() {
  const [weekStart, setWeekStart] = useState(() => {
    const today = new Date()
    return today.getDay() === 0
      ? new Date(today.setDate(today.getDate() - today.getDay() - 1))
      : today.getDay() === 1
        ? today
        : new Date(today.setDate(today.getDate() - today.getDay() + 1))
  })
  const { data: currentUser } = api.user.getCurrentUser.useQuery()

  console.log(weekStart)

  if (!currentUser) return null

  return (
    <div className='flex flex-col gap-2 w-full text-sm mt-16'>
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
        userId={currentUser.id}
        weekStart={weekStart}
        currentUser={currentUser}
      />
    </div>
  )
}
