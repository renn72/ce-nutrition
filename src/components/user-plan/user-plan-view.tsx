'use client'

import { cn } from '@/lib/utils'
import {Button} from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import type { UserPlan } from '@/types'
import { Label } from '@/components/ui/label'

const UserPlanView = ({ userPlan }: { userPlan: UserPlan }) => {
  console.log('userPlan', userPlan)
  return (
    <div className='flex flex-col gap-2 w-full px-2 py-4 bg-secondary min-h-[200px] text-xs'>
      {userPlan?.userMeals.map((meal, mealIndex) => (
        <div
          className='flex gap-2 flex-col'
          key={meal.id}
        >
          <div className='flex gap-2 items-center justify-between'>
            <Label className=''>{meal.mealTitle}</Label>
            <div className='text-xs text-muted-foreground'>
              {meal.targetCalories}cals
            </div>
          </div>
          <div className='flex gap-2 flex-row pl-0 flex-wrap'>
            {userPlan.userRecipes
              .filter((recipe) => recipe.mealIndex == mealIndex)
              .map((recipe, ) => (
                <Badge
                  variant='accent'
                  key={recipe.id}
                >
                  {recipe.name}
                </Badge>
              ))}
          </div>
          {
            meal.veges !== '' && (
              <div className='grid grid-cols-1 place-items-center w-[50px]'>
                <div className='w-min'>&</div>
              <Badge className='w-min'>Vege</Badge>
              </div>
            )
          }
        </div>
      ))}
    </div>
  )
}

export { UserPlanView }
