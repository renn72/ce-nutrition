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
        className='py-14'
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>{recipe.name}</DialogTitle>
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
          .map((ingredient) => (
            <div
              key={ingredient.id}
              className='grid grid-cols-5 w-full px-2 py-2 bg-secondary text-sm'
            >
              <div className='col-span-3'>{ingredient.name}</div>
              <div className='justify-self-end  mr-1 self-center '>
                {(scale * Number(ingredient.serve)).toFixed(0)}
              </div>
              <div className='self-center '>{ingredient.serveUnit}</div>
            </div>
          ))}
      </DialogContent>
    </Dialog>
  )
}

const UserPlanView = ({ userPlan }: { userPlan: UserPlan }) => {
  return (
    <div className='flex flex-col gap-4 w-full px-2 py-4 bg-secondary text-xs'>
      <h2 className='text-lg font-bold'>Program</h2>
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
              <Badge className='w-min'>Vege</Badge>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export { UserPlanView }
