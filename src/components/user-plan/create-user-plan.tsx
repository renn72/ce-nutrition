'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams, useRouter } from 'next/navigation'

import { userAtom } from '@/app/admin/_sidebar/sidebar'
import type { GetPlanById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { Meal } from '@/components/user-plan/meal'
import { PlanSelect } from '@/components/user-plan/plan-select'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string().optional(),
  notes: z.string(),
  meals: z.array(
    z.object({
      mealId: z.string(),
      mealTitle: z.string(),
      calories: z.string(),
      protein: z.string().optional(),
      targetProtein: z.string(),
      targetCalories: z.string(),
      vegeCalories: z.string(),
      vege: z.string(),
      vegeNotes: z.string(),
      note: z.string(),
      recipes: z.array(
        z.object({
          recipeId: z.string(),
          name: z.string(),
          note: z.string(),
          description: z.string(),
          index: z.number(),
          ingredients: z.array(
            z.object({
              ingredientId: z.string(),
              name: z.string(),
              serveSize: z.string(),
              serveUnit: z.string(),
              note: z.string(),
            }),
          ),
        }),
      ),
    }),
  ),
})

const CreateUserPlan = () => {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''
  const router = useRouter()

  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<GetPlanById | null>(null)

  const [userId] = useAtom(userAtom)

  const { data: allPlans } = api.plan.getAll.useQuery()
  const { data: currentUser } = api.user.get.useQuery(user)

  const ctx = api.useUtils()

  const { mutate: createPlan } = api.userPlan.create.useMutation({
    onSuccess: () => {
      toast.success('Created')
      ctx.invalidate()
      setTimeout(() => {
        router.push(`/admin/user-program?user=${user}`)
      }, 400)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      notes: '',
      meals: [],
    },
  })
  const mealsField = useFieldArray({
    control: form.control,
    name: 'meals',
  })

  const onSetPlan = (planId: string) => {
    setSelectedPlanId(planId)
    const _selectedPlan = allPlans?.find((plan) => plan.id === Number(planId))
    if (!_selectedPlan) return
    console.log('selectedPlan', _selectedPlan)
    setSelectedPlan(_selectedPlan)
    form.reset({
      name: _selectedPlan?.name || '',
      description: _selectedPlan?.description || '',
      image: _selectedPlan?.image || '',
      notes: _selectedPlan?.notes || '',
      meals:
        _selectedPlan?.planToMeal.map((meal, mealIndex) => ({
          mealId: mealIndex.toString(),
          mealTitle: meal.mealTitle || '',
          calories: meal.calories || '',
          targetCalories:
            (Number(meal.calories) + Number(meal.vegeCalories)).toString() ||
            '',
          targetProtein: '40',
          vegeCalories: meal.vegeCalories || '',
          vege: meal.meal?.mealToVegeStack[0]?.vegeStack?.veges || '',
          vegeNotes: meal.meal?.mealToVegeStack[0]?.vegeStack?.notes || '',
          protein: '40',
          note: meal.note || '',
          recipes:
            meal?.meal?.mealToRecipe.map((recipe, recipeIndex) => ({
              recipeId: recipeIndex.toString(),
              name: recipe.recipe?.name || '',
              note: recipe.note || '',
              description: recipe.recipe?.description || '',
              index: recipe.index,
              ingredients:
                recipe?.recipe?.recipeToIngredient.map(
                  (ingredient, ingredientIndex) => {
                    const serve = (
                      (Number(ingredient.serveSize) * Number(meal.calories)) /
                      Number(recipe.recipe?.calories)
                    ).toFixed(2)
                    return {
                      ingredientId: ingredient.ingredient?.id.toString(),
                      name: ingredient.ingredient?.name || '',
                      serveSize: serve,
                      serveUnit: ingredient.serveUnit,
                      note: ingredient.note || '',
                    }
                  },
                ) || [],
            })) || [],
        })) || [],
    })
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createPlan({
      name: data.name,
      description: data.description,
      image: '',
      notes: data.notes,
      meals: data.meals.map((meal, mealIndex) => ({
        mealIndex: mealIndex,
        mealTitle: meal.mealTitle,
        calories: meal.calories,
        targetCalories: meal.targetCalories,
        targetProtein: meal.targetProtein,
        vegeCalories: meal.vegeCalories,
        veges: meal.vege,
        vegeNotes: meal.vegeNotes,
        protein: meal.protein?.toString(),
        note: meal.note || '',
        recipes: meal?.recipes.map((recipe, recipeIndex) => ({
          recipeIndex: recipeIndex,
          mealIndex: mealIndex,
          name: recipe.name || '',
          note: recipe.note || '',
          description: recipe.description || '',
          index: recipe.index,
          ingredients: recipe?.ingredients.map(
            (ingredient, ingredientIndex) => ({
              ingredientId: Number(ingredient.ingredientId),
              ingredientIndex: ingredientIndex,
              recipeIndex: recipeIndex,
              mealIndex: mealIndex,
              name: ingredient.name || '',
              serve: ingredient.serveSize,
              serveUnit: ingredient.serveUnit,
              note: ingredient.note || '',
            }),
          ),
        })),
      })),
      userId: userId,
    })
  }

  return (
    <div className='flex flex-col max-w-screen-lg w-full my-12'>
      <PlanSelect
        selectedPlan={selectedPlanId}
        onSetPlan={onSetPlan}
      />
      {selectedPlanId === '' ? null : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-2 '>
              <div className='flex justify-between gap-8'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Name'
                          {...field}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Description'
                          {...field}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='notes'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Notes'
                          {...field}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-col gap-2 mt-4'>
                <h2 className='text-2xl font-bold'>Meals</h2>
                <div className='flex flex-col gap-1 '>
                  {mealsField.fields.map((field, index) => (
                    <Meal
                      key={field.mealId}
                      index={index}
                      form={form}
                      plan={selectedPlan}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Button type='submit'>Create</Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export { CreateUserPlan }
