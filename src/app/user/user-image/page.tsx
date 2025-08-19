'use client'

import { UserGallery } from '@/components/images/user-gallery'
import { api } from '@/trpc/react'

export default function Home() {
  const { data: user, isLoading } = api.user.getCurrentUser.useQuery()

  if (isLoading) return null
  if (!user) return null

	return <UserGallery userId={user.id} isAdmin={false} />
}
