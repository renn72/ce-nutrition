'use client'

import { api } from '@/trpc/react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Navbar } from '@/components/layout/navbar'

export default function Home() {
  const { data: _currentUser } = api.user.getCurrentUser.useQuery()
  const { data: currentUser } = api.user.get.useQuery(_currentUser?.id ?? '')
  const isTrainer = currentUser?.isTrainer
  console.log('currentUser', currentUser)
  const plan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <main className='flex-1'>
        <div className='flex flex-col gap-2 w-full py-4'>
          {plan ? (
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
                            {recipes.map((recipe, _recipeIndex) => {
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
          ) : null}
        </div>
      </main>
      <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t px-2 py-2 md:py-6 sm:flex-row md:px-6'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2024 CE Nutrition. All rights reserved.
        </p>
        <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
          <Link
            className='text-xs underline-offset-4 hover:underline'
            href='#'
          >
            Terms of Service
          </Link>
          <Link
            className='text-xs underline-offset-4 hover:underline'
            href='#'
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
