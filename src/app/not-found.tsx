'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  console.log('not found')
  const router = useRouter()
  router.replace('/')
  return null
}
