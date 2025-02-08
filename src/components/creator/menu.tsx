'use client'

import { api } from '@/trpc/react'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Jamie } from './jamie'

export const CreatorMenu = () => {
  const ctx = api.useUtils()

  const { mutate: deleteAllMeals } = api.meal.deleteAll.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Deleted')
    },
  })
  const { mutate: createMeal } = api.meal.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: createVegeStack } = api.vege.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: deleteAllVegeStacks } = api.vege.deleteAll.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Deleted')
    },
  })
  const { mutate: deleteAllPlans } = api.plan.deleteAll.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Deleted')
    },
  })
  const { mutate: createPlan } = api.plan.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: createRecipe } = api.recipe.create.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: deleteAllRecipes } = api.recipe.deleteAll.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Deleted')
    },
  })
  const { mutate: sync } = api.user.sync.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Synced')
    },
  })
  const { mutate: createUser } = api.user.createUser.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: createFakeUsers } = api.user.createFakeUsers.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: deleteFakeUsers } = api.user.deleteFakeUsers.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Deleted')
    },
  })
  const { mutate: createStores } = api.test.generateGroceryStores.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })
  const { mutate: importAFCDSolid } = api.test.importAFCDSolid.useMutation({
    onSuccess: () => {
      ctx.ingredient.invalidate()
      toast.success('Imported')
    },
  })
  const { mutate: importAFCDLiquid } = api.test.importAFCDLiquid.useMutation({
    onSuccess: () => {
      ctx.ingredient.invalidate()
      toast.success('Imported')
    },
  })
  const { mutate: deleteAll } = api.test.deleteAllIngredients.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Deleted')
    },
  })

  const { data: allMeals } = api.meal.getAll.useQuery()

  const generatePlans = () => {
    if (!allMeals) return
    const snack = allMeals.find((meal) => meal.name === 'Snack 1')
    const lunch = allMeals.find((meal) => meal.name === 'Lunch 1')
    const dinner = allMeals.find((meal) => meal.name === 'Dinner 1')
    createPlan({
      name: 'Plan 1',
      description: 'General',
      image: '',
      notes: '',
      planCategory: 'general',
      numberOfMeals: 4,
      meals: [
        {
          mealId: snack?.id || 0,
          mealIndex: 1,
          mealTitle: 'Snack 1',
          calories: '400',
          vegeCalories: '',
          note: '',
        },
        {
          mealId: lunch?.id || 0,
          mealIndex: 2,
          mealTitle: 'Lunch 1',
          calories: '500',
          vegeCalories: '50',
          note: '',
        },
        {
          mealId: snack?.id || 0,
          mealIndex: 3,
          mealTitle: 'Snack 2',
          calories: '350',
          vegeCalories: '',
          note: '',
        },
        {
          mealId: dinner?.id || 0,
          mealIndex: 4,
          mealTitle: 'Dinner 1',
          calories: '600',
          vegeCalories: '50',
          note: '',
        },
      ],
    })
  }

  const generateVegeStacks = () => {
    createVegeStack({
      name: 'Vege Stack 1',
      veges:
        'Lettuce, Onion, Green Beans, Zucchini, Kale, Spinach, Broccoli, Cauliflower, Capsicum, Cucumber',
      notes: '2 Cups',
      calories: '50',
    })
  }

  const { data: allIngredients } = api.ingredient.getAll.useQuery()
  const { data: allRecipes } = api.recipe.getAll.useQuery()
  const { data: allVegeStacks } = api.vege.getAll.useQuery()

  const generateMeals = () => {
    if (!allRecipes) return
    if (!allVegeStacks) return
    const beef = allRecipes.find((i) => i.name == 'Beef and Potatoes')?.id || 0
    const ham = allRecipes.find((i) => i.name == 'Ham breadroll')?.id || 0
    const chicken =
      allRecipes.find((i) => i.name == 'Chicken and Rice')?.id || 0
    const vegeStack = allVegeStacks[0]?.id || 0
    console.log({ beef, ham, chicken, vegeStack })
    createMeal({
      name: 'Snack 1',
      description: 'General',
      image: '',
      notes: 'General',
      mealCategory: 'snack',
      recipes: [
        {
          recipeId: ham,
          note: 'Test',
          index: 2,
        },
        {
          recipeId: chicken,
          note: 'Test',
          index: 3,
        },
      ],
    })
    createMeal({
      name: 'Lunch 1',
      description: 'General',
      image: '',
      notes: 'General',
      mealCategory: 'Lunch',
      veges: {
        vegeStackId: vegeStack,
        note: '',
        calories: '50',
      },
      recipes: [
        {
          recipeId: beef,
          note: 'Test',
          index: 1,
        },
        {
          recipeId: ham,
          note: 'Test',
          index: 2,
        },
        {
          recipeId: chicken,
          note: 'Test',
          index: 3,
        },
      ],
    })
    createMeal({
      name: 'Dinner 1',
      description: 'General',
      image: '',
      notes: 'General',
      mealCategory: 'Dinner',
      veges: {
        vegeStackId: vegeStack,
        note: '',
        calories: '50',
      },
      recipes: [
        {
          recipeId: beef,
          note: 'Test',
          index: 1,
        },
        {
          recipeId: chicken,
          note: 'Test',
          index: 3,
        },
      ],
    })
  }

  const generateRecipes = () => {
    console.log('ingredients', allIngredients)
    if (!allIngredients) return
    createRecipe({
      name: 'Chicken and Rice',
      description: 'yum yum',
      image: '',
      notes: 'Test',
      recipeCategory: 'lunch',
      calories: 441.1,
      ingredients: [
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F007682')?.id || 0,
          note: 'Test',
          serveSize: '90',
          serveUnit: 'grams',
          index: 0,
          alternateId: '',
        },
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F002594')?.id || 0,
          note: 'Test',
          serveSize: '140',
          serveUnit: 'grams',
          index: 1,
          alternateId: '',
        },
      ],
    })
    createRecipe({
      name: 'Ham breadroll',
      description: 'yum yum',
      image: '',
      notes: 'Test',
      recipeCategory: 'lunch',
      calories: 419.1,
      ingredients: [
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F001353')?.id || 0,
          note: 'Test',
          serveSize: '90',
          serveUnit: 'grams',
          index: 0,
          alternateId: '',
        },
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F004299')?.id || 0,
          note: 'Test',
          serveSize: '55',
          serveUnit: 'grams',
          index: 1,
          alternateId: '',
        },
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F003729')?.id || 0,
          note: '2 whole eggs',
          serveSize: '110',
          serveUnit: 'grams',
          index: 2,
          alternateId: '',
        },
      ],
    })
    createRecipe({
      name: 'Beef and Potatoes',
      description: 'yum yum',
      image: '',
      notes: 'Test',
      recipeCategory: 'dinner',
      calories: 538.5,
      ingredients: [
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F000561')?.id || 0,
          note: 'Test',
          serveSize: '120',
          serveUnit: 'grams',
          index: 0,
          alternateId: '',
        },
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F007308')?.id || 0,
          note: 'Test',
          serveSize: '420',
          serveUnit: 'grams',
          index: 1,
          alternateId: '',
        },
        {
          ingredientId:
            allIngredients.find((i) => i.publicFoodKey == 'F001971')?.id || 0,
          note: '',
          serveSize: '15',
          serveUnit: 'grams',
          index: 2,
          alternateId: '',
        },
      ],
    })
  }

  return (
    <div className='grid grid-cols-2'>
      <Jamie/>
    <div className='flex flex-col gap-6 items-center max-w-screen-lg w-full mx-auto mt-10 tracking-tighter'>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          sync()
        }}
      >
        Sync DB
      </Button>
      <Button
        variant='secondary'
        onClick={() => {
          createUser({
            email: 'renn@warner.systems',
            password: 'hklasd',
            firstName: 'David',
            lastName: 'Warner',
            birthDate: new Date(1980, 0, 1),
            isCreator: true,
            isRoot: true,
            isTrainer: true,
          })
        }}
      >
        GenMe
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => createFakeUsers()}
      >
        GenFake
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => deleteFakeUsers()}
      >
        DeleteFake
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          createStores()
        }}
      >
        GenStore
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          importAFCDSolid()
        }}
      >
        ImportAFCDSolid
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          importAFCDLiquid()
        }}
      >
        importAFCDLiquid
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          deleteAll()
        }}
      >
        deleteAllIngredients
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          generateRecipes()
        }}
      >
        Gen Recipes
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          deleteAllRecipes()
        }}
      >
        deleteAllRecipes
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          generateVegeStacks()
        }}
      >
        Gen Vege Stacks
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          deleteAllVegeStacks()
        }}
      >
        deleteAllVegeStacks
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          generateMeals()
        }}
      >
        Gen Meals
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          deleteAllMeals()
        }}
      >
        deleteAllMeals
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          generatePlans()
        }}
      >
        Gen Plans
      </Button>
      <Button
        variant='secondary'
        size='lg'
        onClick={() => {
          deleteAllPlans()
        }}
      >
        deleteAllPlans
      </Button>
    </div>
    </div>
  )
}
