'use client'

import type { GetPlanById } from '@/types'
import { ScanEye } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const PlanPreview = ({ plan }: { plan: GetPlanById }) => {
  console.log('plan', plan)
  if (!plan) return null
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ScanEye
          className='text-primary/70 hover:text-primary hover:scale-110 transition-all'
          size={20}
        />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={8}
        align='end'
        side='bottom'
        asChild
      >
        <div className='flex flex-col gap-2 max-w-screen-sm'>
          <div className='flex gap-2 '>
            <div>{plan.name}</div>
            <div>{plan.notes}</div>

            <div>{plan.planCategory}</div>
          </div>
          <div className='flex flex-col gap-2'>
            {plan.planToMeal.map((meal) => (
              <div
                key={meal.id}
                className='flex gap-2 flex-col'
              >
                <div>{meal.mealTitle}</div>
                <div>
                  {meal.meal?.mealToRecipe.map((recipe) => (
                    <div>{recipe.recipe?.name}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { PlanPreview }
