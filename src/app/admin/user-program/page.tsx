'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const UserInfo = ({ userId }: { userId: string }) => {
  const ctx = api.useUtils()

  const { mutate: finishPlan } = api.userPlan.finishPlan.useMutation({
    onSuccess: () => {
      toast.success('Deleted')
      ctx.invalidate()
    },
  })
  const { mutate: activePlan } = api.userPlan.activePlan.useMutation({
    onSuccess: () => {
      toast.success('Actived')
      ctx.invalidate()
    },
  })
  const { data: currentUser } = api.user.get.useQuery(userId)
  const plans = currentUser?.userPlans
    .filter((_plan) => true)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .sort((a, b) => {
      if (!a.isActive && !b.isActive) return 0
      if (a.isActive && !b.isActive) return -1
      if (!a.isActive && b.isActive) return 1
      return 0
    })

  console.log('plans', plans)

  const { mutate: saveAsPlan } = api.plan.saveAsPlan.useMutation({
    onSuccess: () => {
      toast.success('Saved as Plan')
      ctx.invalidate()
    },
  })

  const onSaveAsPlan = (id: number) => {
    const plan = plans?.find((plan) => plan.id === id)
    if (!plan) return
    saveAsPlan({
      name: plan.name + '-copy',
      description: plan.description,
      image: plan.image,
      notes: plan.notes,
      planCategory: '',
      numberOfMeals: plan.numberOfMeals || plan.userMeals.length,
      meals: plan.userMeals.map((meal) => ({
        mealIndex: meal.mealIndex || 0,
        mealTitle: meal.mealTitle || '',
        calories: meal.calories || '',
        vegeCalories: meal.vegeCalories || '',
        vegeNotes: meal.vegeNotes || '',
        vege: meal.veges || '',
        note: meal.note || '',
        recipes: plan.userRecipes
          .filter((recipe) => recipe.mealIndex === meal.mealIndex)
          .map((recipe) => ({
            id: recipe.id,
            name: recipe.name || '',
            calories: meal.calories || '',
            note: recipe.note || '',
            ingredients: plan.userIngredients
              .filter(
                (ingredient) =>
                  ingredient.recipeIndex === recipe.recipeIndex &&
                  ingredient.mealIndex === recipe.mealIndex,
              )
              .map((ingredient) => ({
                ingredientId: ingredient.ingredientId || -1,
                alternateId: ingredient.alternateId,
                name: ingredient.name || '',
                serve: ingredient.serve || '',
                serveUnit: ingredient.serveUnit || '',
                note: ingredient.note || '',
              })),
          })),
      })),
    })
  }

  if (!plans) return null

  return (
    <div className='flex flex-col gap-4 items-center my-10 capitalize px-2 '>
      {plans.map((plan) => (
        <Card
          key={plan.id}
          className={cn(
            'w-full max-w-screen-xl rounded-lg',
            plan.isActive ? ' border-green-500/90' : '',
          )}
        >
          <Collapsible>
            <CardHeader className='pb-2 flex justify-between relative'>
              <CollapsibleTrigger className='absolute bottom-0 right-1/2 -translate-x-1/2'>
                <ChevronDown size={40} />
              </CollapsibleTrigger>
              <div
                className={cn(
                  'flex gap-2 items-center w-full justify-between',
                  plan.isActive ? 'hidden' : '',
                )}
              >
                <div className='flex gap-2 items-center'>
                  <CardTitle className={cn('text-xl font-medium')}>
                    <Badge className=' mb-2'>Finished</Badge>
                  </CardTitle>
                  <div className='text-[0.8rem] font-light text-muted-foreground flex gap-2 items-center'>
                    <div>
                      {plan.createdAt.toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    {plan.finishedAt ? (
                      <div>
                        -{' '}
                        {plan.finishedAt.toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      onSaveAsPlan(plan.id)
                    }}
                  >
                    Save As Plan
                  </Button>
                  <Button
                    variant='default'
                    size='sm'
                    onClick={() => {
                      activePlan(plan.id)
                    }}
                  >
                    Reactivate Plan
                  </Button>
                </div>
              </div>
              <div
                className={cn(
                  'flex gap-2 items-center w-full justify-between',
                  plan.isActive ? '' : 'hidden',
                )}
              >
                <div className='flex gap-2 items-center'>
                  <CardTitle className={cn('text-xl font-medium')}>
                    <Badge className='bg-green-600 mb-2'>Active</Badge>
                  </CardTitle>
                  <div className='text-[0.8rem] font-light text-muted-foreground flex gap-2 items-center'>
                    <div>
                      {plan.createdAt.toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                    {plan.finishedAt ? (
                      <div>
                        -{' '}
                        {plan.finishedAt.toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='flex gap-2 items-center'>
                  <Link
                    className=''
                    href={`/admin/user-program-edit?user=${userId}&plan=${plan.id}`}
                    prefetch={false}
                  >
                    <Button
                      variant='outline'
                      size='sm'
                    >
                      Edit Plan
                    </Button>
                  </Link>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => {
                      onSaveAsPlan(plan.id)
                    }}
                  >
                    Save As Plan
                  </Button>
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
              </div>

              <div className='flex gap-4 items-center'>
                <div className='text-xl font-medium'>{plan.name}</div>
                <div className='font-normal rounded-full bg-accent-foreground/10 px-2 py-1 text-sm'>
                  {plan.userMeals
                    .reduce((acc, meal) => acc + Number(meal.calories), 0)
                    .toFixed(0)}
                  cal
                </div>
              </div>
            </CardHeader>
            <CollapsibleContent className=''>
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
                              {meal.targetProtein !== '' ? (
                                <>
                                  <div className='text-sm text-muted-foreground'>
                                    Protein
                                  </div>
                                  <div className='text-sm text-muted-foreground'>
                                    {meal.targetProtein}
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                          <div className='flex flex-col gap-1 w-full ml-4'>
                            {recipes.map((recipe) => {
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
            </CollapsibleContent>
          </Collapsible>
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
