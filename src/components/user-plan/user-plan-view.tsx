'use client'

import { cn } from '@/lib/utils'
import {Button} from '@/components/ui/button'

import type { UserPlan } from '@/types'
import { Label } from '@/components/ui/label'

const UserPlanView = ({ userPlan }: { userPlan: UserPlan }) => {
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
                <Button
                  key={recipe.id}
                  size='sm'
                  variant='secondary'
                  className='bg-primary/10 shadow-none '
                >
                  {recipe.name}
                </Button>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export { UserPlanView }
