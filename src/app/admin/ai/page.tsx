'use client'

import { useSearchParams } from 'next/navigation'

import { AiInsights } from '@/components/admin/ai-insights'

export default function AdminAiPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  const isValidUserId =
    userId !== '' &&
    userId !== undefined &&
    userId !== null &&
    userId !== 'null'

  if (!isValidUserId) return <div>Select a user</div>

  return <AiInsights userId={userId} />
}
