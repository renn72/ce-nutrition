'use client'


import { api } from '@/trpc/react'

export default function AdminPage() {
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  return <div>Admin Page</div>
}
