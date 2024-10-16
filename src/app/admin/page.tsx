'use client'

import { api } from '@/trpc/react'

export default function Home() {
  const { data } = api.ingredient.getAll.useQuery()
  return (
    <div className='flex min-h-screen flex-col'>
      {data?.map((item) => (
        <div
          className='flex gap-2'
          key={item.id}
        >
          <div>{item.foodName}</div>
          <div>{item.energyWithDietaryFibre}</div>
        </div>
      ))}
    </div>
  )
}
