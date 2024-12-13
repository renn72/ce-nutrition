
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { api } from '@/trpc/react'
import { FormRecipe} from '@/components/recipe/form-recipe'

export default function Home() {

  const {data, isLoading} = api.recipe.getAll.useQuery()
  const searchParams = useSearchParams()
  const i = searchParams.get('recipe')

  const recipe = data?.find((recipe) => recipe.id === Number(i))

  if (isLoading) return null

  return (
    <div className='flex flex-col max-w-screen-lg w-full mx-auto mt-10'>
      <FormRecipe recipe={recipe} />
    </div>
  )
}
