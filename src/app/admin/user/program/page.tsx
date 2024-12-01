'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''

  const [selectedPlan, setSelectedPlan] = useState('')
  const ctx = api.useUtils()

  const { mutate: deletePlan } = api.userPlan.delete.useMutation({
    onSuccess: () => {
      toast.success('Deleted')
      ctx.invalidate()
    },
  })
  const { data: currentUser } = api.user.get.useQuery(user)
  const plan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )

  if (!plan) return null

  console.log('plan', plan)

  return (
    <div className='flex flex-col items-center mt-10 capitalize'>
      <Card className='w-full max-w-screen-xl'>
        <CardHeader className='pb-0 flex justify-between'>
          <CardTitle className='text-xl font-medium'>Program</CardTitle>
          <div>current program: {plan.name}</div>
          <div>
            daily calories:{' '}
            {plan.userMeals.reduce(
              (acc, meal) => acc + Number(meal.calories),
              0,
            )}
          </div>
          <div>
            daily protein:{' '}
            {plan.userMeals.reduce(
              (acc, meal) => acc + Number(meal.protein),
              0,
            )}
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-2 w-full py-4'>
          <Card>
            <CardHeader className=''>
              <CardTitle className='text-xl font-medium'>Meals</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-2 w-full py-4'>
              {plan.userMeals.map((meal, mealIndex) => {
                const recipes = plan.userRecipes.filter(
                  (recipe) => recipe.mealIndex == mealIndex,
                )
                return (
                  <div
                    className='flex flex-col gap-1 w-full'
                    key={meal.id}
                  >
                    <div className='flex gap-1 items-center'>
                      <div>{meal.mealTitle}</div>
                      <div className='flex gap-1 items-center'>
                        <div className='text-sm text-muted-foreground'>
                          Calories
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {meal.targetCalories}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          Protein
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {meal.targetProtein}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col gap-1 w-full ml-4'>
                      {recipes.map((recipe, recipeIndex) => {
                        return (
                          <div
                            className='flex flex-col gap-1 w-full'
                            key={recipe.id}
                          >
                            <div>{recipe.name}</div>
                          </div>
                        )
                      })}
                    </div>
                    {meal.veges !== '' && (
                      <div className='flex gap-1 items-center'>
                        <div className='text-sm text-muted-foreground'>
                          Vege
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {meal.veges}
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          Notes
                        </div>
                        <div className='text-sm text-muted-foreground'>
                          {meal.vegeNotes}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <div className='w-full flex justify-center mt-8'>
        <Button
          variant='destructive'
          onClick={() => {
            deletePlan(plan.id)
          }}
        >
          Delete Plan
        </Button>
      </div>
    </div>
  )
}
