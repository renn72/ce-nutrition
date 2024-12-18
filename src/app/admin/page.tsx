'use client'
import { useRouter } from 'next/navigation'

import { api } from '@/trpc/react'

export default function AdminPage() {
  const router = useRouter()

  router.push('/admin/base')
  return null
}
