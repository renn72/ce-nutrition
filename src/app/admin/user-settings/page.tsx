'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { GetUserById } from '@/types'
import { toast } from 'sonner'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const Settings = ({ user }: { user: GetUserById }) => {
  const ctx = api.useUtils()
  const [isPosing, setIsPosing] = useState(user.settings.isPosing)

  const { mutate: updateIsPosing } = api.user.updateIsPosing.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })

  return (
    <div className='flex flex-col items-center w-full mt-10'>
      <h2> User Settings</h2>
      <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
        <div className='space-y-0.5'>
          <Label>Posing Client</Label>
          <div className='text-sm text-muted-foreground'>
            Enables the user to tracke posing time in their logs.
          </div>
        </div>
        <Switch
          checked={isPosing === true}
          onCheckedChange={(checked) => {
            setIsPosing(checked)
            updateIsPosing({
              id: user.id,
              isPosing: checked,
            })
          }}
        />
      </div>
    </div>
  )
}

const User = ({ userId }: { userId: string }) => {
  const { data: currentUser } = api.user.get.useQuery(userId)

  if (!currentUser) return null

  return <Settings user={currentUser} />
}

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  return <User userId={userId} />
}
