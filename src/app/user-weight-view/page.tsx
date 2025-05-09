'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { ArrowDown, MoveDown } from 'lucide-react'

const View = ({ userId }: { userId: string }) => {
  const { data: skinfolds } = api.metrics.getUserSkinfolds.useQuery(userId)

  const data = skinfolds
    ?.map((skinfold) => ({
      value: skinfold.bodyWeight?.[0]?.bodyWeight,
      date: skinfold.date,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  console.log('data', data?.slice(-2))
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center w-full'>
      <div className='flex text-[20rem] justify-center items-center text-green-600 font-bold -ml-8'>
        <MoveDown
          className='text-black mb-16 -mr-20'
          size={250}
        />
        {(2.4).toFixed(1)}kg
      </div>
      <div className='text-[4rem] w-full uppercase text-center font-bold -mt-36'>
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
