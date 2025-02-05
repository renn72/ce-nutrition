'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { UserPlan } from '@/types'
import { RotateCcw } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

const UserPlanVege = ({
  userPlan,
  mealIndex,
}: {
  userPlan: UserPlan
  mealIndex: number | null
}) => {
  if (!userPlan) return null
  const meal = userPlan.userMeals.find((meal) => meal.mealIndex == mealIndex)

  if (!meal) return null
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge className='cursor-pointer'>Vege</Badge>
      </DialogTrigger>
      <DialogContent
        className='py-14'
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Vege</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='flex gap-4 items-center flex-col'>
          <div>{meal.veges}</div>
          <div>{meal.vegeNotes}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
const UserPlanRecipe = ({
  userPlan,
  mealIndex,
  recipeIndex,
}: {
  userPlan: UserPlan
  mealIndex: number | null
  recipeIndex: number | null
}) => {
  const [scale, setScale] = useState(1)

  if (!userPlan) return null
  const recipe = userPlan.userRecipes.find(
    (recipe) =>
      recipe.mealIndex == mealIndex && recipe.recipeIndex == recipeIndex,
  )
  if (!recipe) return null

  return (
    <Dialog key={recipe.id}>
      <DialogTrigger asChild>
        <Badge
          className='cursor-pointer'
          variant='accent'
        >
          {recipe.name}
        </Badge>
      </DialogTrigger>
      <DialogContent
        className='py-14 px-2'
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{recipe.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 gap-2 place-items-center'>
          <Label>Serves</Label>
          <div className='flex gap-3 items-center w-full col-span-3'>
            <Input
              placeholder='Scale'
              className='max-w-[52px]'
              type='number'
              value={scale}
              onChange={(e) => {
                setScale(Number(e.target.value))
              }}
            />
            <Slider
              min={0}
              max={10}
              step={0.25}
              value={[scale]}
              onValueChange={(newValue) => {
                if (!newValue[0]) return
                setScale(newValue[0])
              }}
            />
            <RotateCcw
              size={32}
              className='text-muted-foreground'
              onClick={() => {
                setScale(1)
              }}
            />
          </div>
        </div>
        {userPlan.userIngredients
          .filter(
            (ingredient) =>
              ingredient.mealIndex == mealIndex &&
              ingredient.recipeIndex == recipeIndex,
          )
          .map((ingredient) => {
            console.log('ingredient', ingredient)
            const serve = scale * Number(ingredient.serve)
            const calories =
              (Number(serve) / Number(ingredient.ingredient?.serveSize)) *
              Number(ingredient.ingredient?.caloriesWOFibre)
            const altSize =
              (calories /
                Number(ingredient.alternateIngredient?.caloriesWOFibre)) *
              Number(ingredient.alternateIngredient?.serveSize)
            return (
              <div
                key={ingredient.id}
                className='flex gap-0 flex-col'
              >
                <div className='grid grid-cols-6 w-full px-2 py-2 bg-secondary text-sm'>
                  <div className='col-span-4'>{ingredient.name}</div>
                  <div className='justify-self-end  mr-1 self-center '>
                    {serve.toFixed(0)}
                  </div>
                  <div className='self-center '>{ingredient.serveUnit}</div>
                </div>
                {ingredient.alternateIngredient ? (
                  <div className='grid grid-cols-6 w-full pl-4 pr-3 pb-1 bg-secondary text-[0.7rem] tracking-tighter'>
                    <div className='col-span-4 truncate'>
                      or {ingredient.alternateIngredient.name}
                    </div>
                    <div className='justify-self-end  mr-1 self-center '>
                      {altSize.toFixed(0)}
                    </div>
                    <div className='self-center '>{ingredient.serveUnit}</div>
                  </div>
                ) : null}
              </div>
            )
          })}
      </DialogContent>
    </Dialog>
  )
}

const UserPlanView = ({ userPlan }: { userPlan: UserPlan }) => {
  return (
    <div className='flex flex-col gap-4 w-full px-2 py-4 bg-secondary text-xs'>
      <h2 className='text-lg font-bold'>{userPlan?.name}</h2>
      {userPlan?.userMeals.map((meal) => (
        <div
          className='flex gap-2 flex-col'
          key={meal.id}
        >
          <div className='flex gap-2 items-center justify-between'>
            <Label className=''>{meal.mealTitle}</Label>
            <div className='text-xs text-muted-foreground tracking-tighter'>
              {meal.targetCalories}cals - {meal.targetProtein}g Protein
            </div>
          </div>
          <div className='flex gap-2 flex-row pl-0 flex-wrap'>
            {userPlan.userRecipes
              .filter((recipe) => recipe.mealIndex == meal.mealIndex)
              .map((recipe) => (
                <UserPlanRecipe
                  key={recipe.id}
                  userPlan={userPlan}
                  mealIndex={meal.mealIndex}
                  recipeIndex={recipe.recipeIndex}
                />
              ))}
          </div>
          {meal.veges !== '' && (
            <div className='grid grid-cols-1 place-items-center w-[50px]'>
              <div className='w-min'>&</div>
              <UserPlanVege
                userPlan={userPlan}
                mealIndex={meal.mealIndex}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export { UserPlanView }
