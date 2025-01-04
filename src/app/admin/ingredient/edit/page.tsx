'use client'

import { useSearchParams } from 'next/navigation'

import { api } from '@/trpc/react'
import { FormIngredient } from '@/components/ingredients/form-ingredient'


export default function Home() {

  const {data, isLoading} = api.ingredient.getAll.useQuery()
  const searchParams = useSearchParams()
  const i = searchParams.get('ingredient')

  const ingredient = data?.find((ingredient) => ingredient.id === Number(i))

  if (isLoading) return null

  return (
    <div className='flex flex-col max-w-screen-lg mx-auto mt-10 px-2'>
      <FormIngredient ingredient={ingredient} />
    </div>
  )
}
