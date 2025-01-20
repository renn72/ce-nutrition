'use client'

import { api } from '@/trpc/react'

import { ImageCarousel } from '@/components/daily-log/image-carousel'

export default function Home() {
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery()

  if (isLoading) return null
if (!currentUser) return null

  return (
    <div className='w-full mt-24'>
      <ImageCarousel userId={currentUser.id} />
    </div>
  )

}
