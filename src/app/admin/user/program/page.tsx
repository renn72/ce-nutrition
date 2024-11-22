
'use client'
import { api } from '@/trpc/react'
import { useSearchParams } from 'next/navigation'

export default function Home() {

  const searchParams = useSearchParams()
  const user = searchParams.get('user') ?? ''

  const { data: allPlans } = api.plan.getAllSimple.useQuery()
  const { data: currentUser } = api.user.get.useQuery(user)



  return (
    <div className='flex min-h-screen flex-col items-center'>
      {user}
    </div>
  )
}
