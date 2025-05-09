'use client'

import { useSearchParams } from 'next/navigation'

import { api } from '@/trpc/react'
import { ArrowDown, MoveDown } from 'lucide-react'

const View = ({ userId }: { userId: string }) => {
  const { data: skinfolds } = api.metrics.getUserSkinfolds.useQuery(userId)


  const data = skinfolds?.map((skinfold) => ({
    value: skinfold.bodyWeight?.[0]?.bodyWeight,
    date: skinfold.date,
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  console.log('data', data?.slice(-2))
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center w-full'>
    <div
    className='flex text-[26rem] justify-center items-center text-green-600 font-bold'
  >
      <MoveDown className='text-black mb-16 -mr-36' size={340} />
    { (1.7).toFixed(1) }kg
  </div>
      <div className='text-[6rem] w-full uppercase text-center font-bold -mt-48'>
      Body Weight
    </div>
    </div>

  )
}

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  return <View userId={userId} />
}
