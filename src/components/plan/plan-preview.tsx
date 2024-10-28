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
          <div>{plan.name}</div>
          <div>{plan.notes}</div>
          <div>{plan.planCategory}</div>
          <div className='flex flex-col gap-2'>
            {Array.from(Array(plan.numberOfMeals).keys()).map((i) => {
              const recipes = plan.planToRecipe.filter(
                (r) => r.mealNumber === i + 1,
              )
              const vegeStack = plan.planToVegeStack.find(
                (v) => v.mealNumber === i + 1,
              )
              console.log(i)
              return (
                <div
                  key={i}
                  className='flex gap-2 flex-col'
                >
                  <div>{i + 1}</div>
                  {recipes.map((r) => {
                    return (
                      <div
                        key={r.id}
                        className='flex gap-2'
                      >
                        <div>{r.recipe?.name}</div>
                        <div>{r.calories}cals</div>
                      </div>
                    )
                  })}
                  {vegeStack ? (
                    <div className='flex flex-col gap-2'>
                      <div className='flex gap-2'>
                        {vegeStack.vegeStack?.veges}
                      </div>
                      <div>{vegeStack.calories}cals</div>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { PlanPreview }
