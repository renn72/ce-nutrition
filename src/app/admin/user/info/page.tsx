'use client'

import { useSearchParams } from 'next/navigation'

export default function Home() {

  const searchParams = useSearchParams()
  const user = searchParams.get('user')


  return (
    <div className='flex min-h-screen flex-col items-center'>
      {user}
    </div>
  )
}
