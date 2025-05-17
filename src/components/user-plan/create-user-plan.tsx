'use client'

import { api } from '@/trpc/react'

import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { userAtom } from '@/app/admin/_sidebar/sidebar'
import { cn } from '@/lib/utils'
import type { GetPlanById, UserPlan } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { PlusCircle } from 'lucide-react'
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
      targetProtein: z.string().min(1, 'Please enter a protein value'),
      targetCalories: z.string().min(1, 'Please enter a calories value'),
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
              alternateId: z.string().nullable(),
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

const CreateUserPlan = ({
  userPlan = null,
}: {
  userPlan?: UserPlan | null
}) => {
  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''
  const router = useRouter()

  const [selectedPlanId, setSelectedPlanId] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<GetPlanById | null>(null)

  const [userId] = useAtom(userAtom)

  const { data: allPlans } = api.plan.getAll.useQuery()

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

  const { mutate: finishPlan } = api.userPlan.finishPlan.useMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userPlan?.name || '',
      description: userPlan?.description || '',
      image: userPlan?.image || '',
      notes: userPlan?.notes || '',
      meals:
        userPlan?.userMeals.map((meal, mealIndex) => ({
          mealId: mealIndex.toString(),
          mealTitle: meal.mealTitle || '',
          calories: meal.calories || '',
          targetCalories:
            (Number(meal.calories) + Number(meal.vegeCalories)).toString() ||
            '',
          targetProtein: '',
          vegeCalories: meal.vegeCalories || '',
          vege: meal.veges || '',
          vegeNotes: meal.vegeNotes || '',
          protein: '',
          note: '',
          recipes: userPlan?.userRecipes
            .filter((recipe) => recipe.mealIndex === mealIndex)
            .map((recipe) => ({
              recipeId: recipe.id.toString(),
              name: recipe.name || '',
              note: recipe.note || '',
              description: '',
              index: recipe.index || 0,
              ingredients: userPlan?.userIngredients
                .filter(
                  (ingredient) =>
                    ingredient.recipeIndex === recipe.recipeIndex &&
                    ingredient.mealIndex === recipe.mealIndex,
                )
                .map((ingredient) => ({
                  ingredientId: ingredient.ingredientId?.toString() || '',
                  recipeIndex: recipe.recipeIndex,
                  mealIndex: recipe.mealIndex,
                  alternateId: ingredient.alternateId?.toString() || null,
                  name: ingredient.name || '',
                  serveSize: ingredient.serve || '',
                  serveUnit: ingredient.serveUnit || '',
                  note: ingredient.note || '',
                  ingredient: {
                    ...ingredient.ingredient,
                  },
                  alternateIngredient: {
                    ...ingredient.alternateIngredient,
                  },
                })),
            })),
        })) || [],
    },
  })
  const mealsField = useFieldArray({
    control: form.control,
    name: 'meals',
  })

  useEffect(() => {
    if (userPlan) {
      setSelectedPlan({
        id: -1,
        name: userPlan?.name || '',
        description: userPlan?.description || '',
        notes: userPlan?.notes || '',
        meals:
          userPlan?.userMeals.map((meal, mealIndex) => ({
            id: -1,
            createdAt: new Date(),
            calories: meal.calories || '',
            mealIndex: mealIndex + 1,
            name: meal.mealTitle || '',
            notes: meal.note || '',
            vege: meal.veges || '',
            vegeCalories: meal.vegeCalories || '',
            vegeNotes: meal.vegeNotes || '',
            description: null,
            creatorId: userPlan.creatorId,
            favouriteAt: null,
            deletedAt: null,
            hiddenAt: null,
            image: null,
            mealCategory: null,
            updatedAt: new Date(),
            planId: -1,
            mealToVegeStack: [],
            mealToRecipe: userPlan?.userRecipes
              .filter((recipe) => recipe.mealIndex === mealIndex)
              .map((recipe, recipeIndex) => ({
                id: -1,
                createdAt: new Date(),
                index: recipeIndex,
                mealId: -1,
                note: '',
                recipeId: -1,
                recipe: {
                  id: -1,
                  createdAt: new Date(),
                  calories: Number(meal.calories) || 0,
                  creatorId: userPlan.creatorId,
                  deletedAt: null,
                  favouriteAt: null,
                  notes: '',
                  hiddenAt: null,
                  updatedAt: new Date(),
                  image: '',
                  description: '',
                  name: recipe.name || '',
                  recipeCategory: '',
                  recipeToIngredient: userPlan?.userIngredients
                    .filter(
                      (ingredient) =>
                        ingredient.recipeIndex === recipe.recipeIndex &&
                        ingredient.mealIndex === recipe.mealIndex,
                    )
                    .map((ingredient, ingredientIndex) => ({
                      id: -1,
                      createdAt: new Date(),
                      index: ingredientIndex,
                      note: '',
                      serveSize: ingredient.serve || '',
                      serveUnit: ingredient.serveUnit || '',
                      recipeId: -1,
                      alternateId: ingredient.alternateId,
                      alternateIngredient: {
                        ...ingredient.alternateIngredient,
                      },
                      ingredientId: ingredient.ingredientId || -1,
                      ingredient: {
                        ...ingredient.ingredient,
                      },
                      alternateIngredient: {
                        ...ingredient.alternateIngredient,
                      },
                    })),
                },
              })),
          })) || [],
      })
    }
  }, [userPlan])

  const onSetPlan = (planId: string) => {
    setSelectedPlanId(planId)
    const _selectedPlan = allPlans?.find((plan) => plan.id === Number(planId))
    if (!_selectedPlan) return
    setSelectedPlan(_selectedPlan)
    console.log('selectedPlan', _selectedPlan)
    form.reset({
      name: _selectedPlan?.name || '',
      description: _selectedPlan?.description || '',
      image: _selectedPlan?.image || '',
      notes: _selectedPlan?.notes || '',
      meals:
        _selectedPlan?.meals?.map((meal, mealIndex) => ({
          mealId: mealIndex.toString(),
          mealTitle: meal.name || '',
          calories: meal.calories || '',
          targetCalories:
            (Number(meal.calories) + Number(meal.vegeCalories)).toString() ||
            '',
          targetProtein: '',
          vegeCalories: meal.vegeCalories || '',
          vege: meal.vege || '',
          vegeNotes: meal.vegeNotes || '',
          protein: '',
          note: '',
          recipes:
            meal?.mealToRecipe.map((recipe, recipeIndex) => ({
              recipeId: recipeIndex.toString(),
              name: recipe.recipe?.name || '',
              note: recipe.note || '',
              description: recipe.recipe?.description || '',
              index: recipe.index,
              ingredients:
                recipe?.recipe?.recipeToIngredient.map(
                  (ingredient, _ingredientIndex) => {
                    const serve = (
                      (Number(ingredient.serveSize) * Number(meal.calories)) /
                      Number(recipe.recipe?.calories)
                    ).toFixed(2)
                    return {
                      ingredientId: ingredient.ingredient?.id.toString(),
                      alternateId: ingredient.alternateId?.toString() || null,
                      name: ingredient.ingredient?.name || '',
                      serveSize: serve,
                      serveUnit: ingredient.serveUnit,
                      note: ingredient.note || '',
                      ingredient: {
                        ...ingredient.ingredient,
                      },
                      alternateIngredient: {
                        ...ingredient.alternateIngredient,
                      },
                    }
                  },
                ) || [],
            })) || [],
        })) || [],
    })
  }

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (userPlan) finishPlan(userPlan.id)
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
              alternateId:
                ingredient.alternateId === '' || ingredient.alternateId === '0'
                  ? null
                  : Number(ingredient.alternateId),
              note: ingredient.note || '',
            }),
          ),
        })),
      })),
      userId: userId,
    })
  }

  return (
    <div className='flex flex-col max-w-screen-xl w-full my-12'>
      <div className={cn('flex gap-8 items-center', userPlan ? 'hidden' : '')}>
        <PlanSelect
          selectedPlan={selectedPlanId}
          onSetPlan={onSetPlan}
        />
      </div>
      {selectedPlanId === '' && userPlan === null ? null : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col lg:gap-2 '>
              <div className='flex flex-col lg:flex-row justify-between lg:gap-8'>
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
                <div className='flex flex-col gap-3 '>
                  {mealsField.fields.map((field, index) => (
                    <Meal
                      key={field.mealId}
                      index={index}
                      form={form}
                      meal={field}
                      plan={selectedPlan}
                      mealsField={mealsField}
                    />
                  ))}
                </div>
              </div>
              <div className='my-8 flex w-full justify-center'>
                <Button
                  onClick={(e) => {
                    e.preventDefault()
                    mealsField.append({
                      mealId: (mealsField.fields.length + 1).toString(),
                      mealTitle: (mealsField.fields.length + 1).toString(),
                      calories: '500',
                      targetCalories: '',
                      targetProtein: '',
                      vege: '',
                      vegeCalories: '',
                      vegeNotes: '',
                      protein: '',
                      note: '',
                      recipes: [],
                    })
                  }}
                >
                  Add Meal
                  <PlusCircle
                    size={20}
                    className='ml-4 mb-1'
                  />
                </Button>
              </div>
              <div className='my-8'>
                <Button
                  type='submit'
                  onClick={() => {
                    console.log('form', form.getValues())
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export { CreateUserPlan }
