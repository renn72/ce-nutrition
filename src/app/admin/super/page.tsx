'use client'

import { api } from '@/trpc/react'

import { Button } from '@/components/ui/button'

import { CreatorMenu } from '@/components/creator/menu'

export default function Home() {
  const { mutate: migrateUsers } = api.migration.migrateUsers.useMutation()

  return (
    <div className='flex flex-col items-center mt-10 gap-2'>
      <Button
        className='w-min'
        onClick={() => migrateUsers()}>Migrate Users</Button>
      <CreatorMenu />
    </div>
  )
}
