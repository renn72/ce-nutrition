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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const CreatorMenu = () => {
  const ctx = api.useUtils()
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

  const { data: allIngredients } = api.ingredient.getAll.useQuery()

  const generateRecipes = () => {
    if (!allIngredients) return
    createRecipe({
      name: 'Chicken and Rice',
      description: 'yum yum',
      image: '',
      notes: 'Test',
      recipeCategory: 'lunch',
      ingredients: [
        {
          ingredientId: allIngredients.find(i => i.publicFoodKey == 'F007682')?.id || 0,
          isProtein: false,
          isCarbohydrate: true,
          isFat: false,
          note: 'Test',
          serveSize: '90',
          serveUnit: 'grams',
        },
        {
          ingredientId: allIngredients.find(i => i.publicFoodKey == 'F002594')?.id || 0,
          isProtein: true,
          isCarbohydrate: false,
          isFat: false,
          note: 'Test',
          serveSize: '140',
          serveUnit: 'grams',
        },
      ],
    })
    createRecipe({
      name: 'Ham breadroll',
      description: 'yum yum',
      image: '',
      notes: 'Test',
      recipeCategory: 'lunch',
      ingredients: [
        {
          ingredientId: allIngredients.find(i => i.publicFoodKey == 'F001353')?.id || 0,
          isProtein: false,
          isCarbohydrate: true,
          isFat: false,
          note: 'Test',
          serveSize: '90',
          serveUnit: 'grams',
        },
        {
          ingredientId: allIngredients.find(i => i.publicFoodKey == 'F004299')?.id || 0,
          isProtein: true,
          isCarbohydrate: false,
          isFat: false,
          note: 'Test',
          serveSize: '55',
          serveUnit: 'grams',
        },
        {
          ingredientId: allIngredients.find(i => i.publicFoodKey == 'F003729')?.id || 0,
          isProtein: true,
          isCarbohydrate: false,
          isFat: true,
          note: '2 whole eggs',
          serveSize: '110',
          serveUnit: 'grams',
        },
      ],
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-2 bg-secondary rounded-full shadow-lg'>
          <HamburgerMenuIcon className='h-4 w-4' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={8}
        align='end'
        side='top'
      >
        <DropdownMenuLabel>ADMIN</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              sync()
            }}
          >
            Sync DB
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
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
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => createFakeUsers()}
          >
            GenFake
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => deleteFakeUsers()}
          >
            DeleteFake
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              createStores()
            }}
          >
            GenStore
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              importAFCDSolid()
            }}
          >
            ImportAFCDSolid
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              importAFCDLiquid()
            }}
          >
            importAFCDLiquid
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              deleteAll()
            }}
          >
            deleteAllIngredients
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              generateRecipes()
            }}
          >
            Gen Recipes
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              deleteAllRecipes()
            }}
          >
            deleteAllRecipes
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}