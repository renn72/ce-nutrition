'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { api } from '@/trpc/react'
import { FormEdit } from '@/components/ingredients/form-edit'

export default function Home() {

  const {data, isLoading} = api.ingredient.getAll.useQuery()
  const searchParams = useSearchParams()
  const i = searchParams.get('ingredient')

  const ingredient = data?.find((ingredient) => ingredient.id === Number(i))

  if (isLoading) return null

  console.log(ingredient)

  return (
    <div className='flex flex-col max-w-screen-lg w-full mx-auto mt-10'>
      <FormEdit ingredient={ingredient} />
    </div>
  )
}
