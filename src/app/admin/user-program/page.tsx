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
import { Badge } from '@/components/ui/badge'

const UserInfo = ({ userId }: { userId: string }) => {
  const searchParams = useSearchParams()

  const [selectedPlan, setSelectedPlan] = useState('')
  const ctx = api.useUtils()

  const { mutate: deletePlan } = api.userPlan.delete.useMutation({
    onSuccess: () => {
      toast.success('Deleted')
      ctx.invalidate()
    },
  })
  const { mutate: finishPlan } = api.userPlan.finishPlan.useMutation({
    onSuccess: () => {
      toast.success('Deleted')
      ctx.invalidate()
    },
  })
  const { data: currentUser } = api.user.get.useQuery(userId)
  const plans = currentUser?.userPlans.filter((plan) => true)

  if (!plans) return null

  return (
    <div className='flex flex-col gap-4 items-center mt-10 capitalize px-2'>
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn('w-full max-w-screen-xl', plan.isActive ? ' border-green-500/90': '')}
        >
          <CardHeader className='pb-0 flex justify-between'>
            <div className={cn('flex gap-2 items-center w-full justify-between', plan.isActive ? '': 'hidden')}>
              <CardTitle className={cn('text-xl font-medium',)}>
                <Badge
                  className='bg-green-600 mb-2'
                >Active</Badge>
              </CardTitle>

              <Button
                variant='destructive'
                size='sm'
                onClick={() => {
                  finishPlan(plan.id)
                }}
              >
                Finish Plan
              </Button>
            </div>
            <div>program: {plan.name}</div>
            <div>
              daily calories:{' '}
              {plan.userMeals.reduce(
                (acc, meal) => acc + Number(meal.calories),
                0,
              )}
            </div>
          </CardHeader>
          <CardContent className='flex flex-col gap-2 w-full py-4'>
            <Card>
              <CardHeader className='pb-0'>
                <CardTitle className='text-xl font-medium'>Meals</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-col gap-2 w-full pt-1 pb-4'>
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
                          {
                            meal.targetProtein !== '' ?(
                              <>
                              <div className='text-sm text-muted-foreground'>
                                Protein
                              </div>
                          <div className='text-sm text-muted-foreground'>
                            {meal.targetProtein}
                          </div>
                              </>)
                              : null
                          }
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
      ))}
    </div>
  )
}

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  return <UserInfo userId={userId} />
}
