'use client'

import { api } from '@/trpc/server'

import { useState } from 'react'

import { getRecipeDetails } from '@/lib/utils'
import {
  type UserIngredient,
  type UserMeal,
  type UserPlan,
  type UserRecipe,
} from '@/types'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDown, CircleChevronDown } from 'lucide-react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Ingredient = ({ userIngredient }: { userIngredient: UserIngredient }) => {
  if (!userIngredient) return null
  return (
    <div className='flex gap-0 flex-col'>
      <div className='grid grid-cols-5 w-full px-2 py-2 text-xs'>
        <div className='col-span-3'>{userIngredient.name}</div>
        <div className='justify-self-end  mr-1 self-center '>
          {userIngredient.serve}g
        </div>
      </div>
      {userIngredient.alternateIngredient ? (
        <div className='grid grid-cols-5 w-full ml-2 pl-2 pr-3 py-1 bg-secondary text-[0.7rem]'>
          <div className='col-span-3'>
            {userIngredient.alternateIngredient.name}
          </div>
          <div className='justify-self-end  mr-1 self-center '>
          {userIngredient.serve}g
          </div>
        </div>
      ) : null}
    </div>
  )
}

const Recipe = ({
  mealIndex,
  recipeIndex,
  plan,
}: {
  mealIndex: number | null
  recipeIndex: number | null
  plan: UserPlan
}) => {
  const meal = plan?.userMeals.find((meal) => meal.mealIndex == mealIndex)

  if (!meal) return null
  if (!plan) return null

  const recipe = plan.userRecipes.find(
    (recipe) =>
      recipe.recipeIndex == recipeIndex && recipe.mealIndex == mealIndex,
  )

  const ingredients = plan.userIngredients.filter(
    (ingredient) =>
      ingredient.recipeIndex == recipeIndex &&
      ingredient.mealIndex == mealIndex,
  )

  if (!recipe) return null

  return (
    <Collapsible className=''>
      <div className='flex gap-6 items-center'>
        <CollapsibleTrigger className='flex items-center justify-center w-10 h-8 data-[state=open]:rotate-180 transition-transform '>
          <CircleChevronDown
            size={28}
            strokeWidth={1.5}
            className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-90 transition-transform cursor-pointer '
          />
        </CollapsibleTrigger>
        <span className=''>{recipe.name}</span>
      </div>
      <CollapsibleContent className='w-full'>
        <div className='flex flex-col gap-0 p-2'>
          {ingredients?.map((ingredient) => (
            <Ingredient
              key={ingredient.id}
              userIngredient={ingredient}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

const Meal = ({
  mealIndex,
  plan,
}: {
  mealIndex: number | null
  plan: UserPlan
}) => {
  const meal = plan?.userMeals.find((meal) => meal.mealIndex == mealIndex)
  const recipes = plan?.userRecipes.filter(
    (recipe) => recipe.mealIndex == mealIndex,
  )

  if (!meal) return null
  const columns: ColumnDef<{
    name: string
    serveSize: string
    serveUnit: string
    calories: number
    protein: number
    carbs: number
    fat: number
  }>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'serveSize',
      header: 'Size',
    },
    {
      accessorKey: 'serveUnit',
      header: 'Unit',
    },
    {
      accessorKey: 'calories',
      header: 'Calories',
    },
    {
      accessorKey: 'protein',
      header: 'Protein',
    },
    {
      accessorKey: 'carbs',
      header: 'Carbs',
    },
    {
      accessorKey: 'fat',
      header: 'Fat',
    },
  ]

  return (
    <div className='flex flex-col gap-4'>
      {recipes?.map((recipe) => (
        <Recipe
          key={recipe.id}
          mealIndex={recipe.mealIndex}
          recipeIndex={recipe.recipeIndex}
          plan={plan}
        />
      ))}
    </div>
  )
}

const PlanView = ({ plan }: { plan: UserPlan }) => {
  if (!plan) return null

  return (
    <div className='flex flex-col gap-4 px-1 py-2'>
      {plan.name}

      <Accordion type='multiple'>
        {plan.userMeals.map((meal) => (
          <AccordionItem
            key={meal.id}
            value={meal.id.toString()}
          >
            <AccordionTrigger className='flex items-center gap-2 w-full'>
              <div>{meal.mealTitle}</div>
              <div className='text-sm text-muted-foreground'>
                {meal.targetCalories}cals - {meal.targetProtein}g Protein
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Meal
                mealIndex={meal.mealIndex}
                plan={plan}
              />
              {meal.veges !== '' && (
                <div className='flex flex-col w-full'>
                  <div className=''>{meal.vegeNotes}</div>
                  <div className=''>{meal.veges}</div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default PlanView
