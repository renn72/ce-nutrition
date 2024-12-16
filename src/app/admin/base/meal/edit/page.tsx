'use client'

import { api } from '@/trpc/react'

import { useRouter, useSearchParams } from 'next/navigation'

import { FormMeal } from '@/components/meal/form-meal'

export default function Home() {
  const { data, isLoading } = api.meal.getAll.useQuery()
  const searchParams = useSearchParams()
  const i = searchParams.get('meal')

  const meal = data?.find((meal) => meal.id === Number(i))

  if (isLoading) return null

  return (
    <div className='flex flex-col max-w-screen-lg w-full mx-auto mt-10'>
      <FormMeal meal={meal} />
    </div>
  )
}
