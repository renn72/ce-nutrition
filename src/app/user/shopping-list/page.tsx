'use client'

import { api } from '@/trpc/react'

import { impersonatedUserAtom } from '@/atoms'
import { useAtomValue } from 'jotai'

import { ShoppingListView } from '@/components/shopping-list/shopping-list-view'

export default function ShoppingListPage() {
  const impersonatedUser = useAtomValue(impersonatedUserAtom)
  const { data: user, isLoading } = api.user.getCurrentUser.useQuery({
    id: impersonatedUser.id,
  })

  if (isLoading || !user) return null

  return (
    <div className='my-16 px-2 pb-6 w-full max-w-3xl'>
      <ShoppingListView
        userId={user.id}
        userName={user.name}
        allowItemEditing={true}
        showHistory={true}
      />
    </div>
  )
}
