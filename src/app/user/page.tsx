'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  router.push('/')
  return <div>TODO: user page</div>
}
