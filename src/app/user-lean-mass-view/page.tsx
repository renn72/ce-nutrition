'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { MoveDown, MoveUp } from 'lucide-react'

const View = ({ userId }: { userId: string }) => {
  const { data: skinfolds, isLoading } = api.metrics.getUserSkinfolds.useQuery(userId)

  const data = skinfolds
    ?.map((skinfold) => ({
      value: Number(skinfold.leanMass?.[0]?.leanMass || 0),
      date: skinfold.date,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const value = (data?.[1]?.value || 0) - (data?.[0]?.value || 0)

  if (isLoading) return null

  console.log('data', data?.slice(-2))
  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center w-full'>
      <div className='flex text-[20rem] justify-center items-center text-green-600 font-bold -ml-8'>
        {
          value > 0 ?
            <MoveDown
              className='text-black mb-16 -mr-20'
              size={250}
            /> :
            <MoveUp
              className='text-black mb-16 -mr-20'
              size={250}
            />
        }
        {Math.abs(value).toFixed(1)}kg
      </div>
      <div className='text-[4rem] w-full uppercase text-center font-bold -mt-36'>
        Lean Mass
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
