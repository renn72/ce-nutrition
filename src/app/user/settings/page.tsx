'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const DefaultWater = ({ currentUser }: { currentUser: GetUserById }) => {
  const [water, setWater] = useState(
    Number(currentUser?.settings?.defaultWater),
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateWater } = api.user.updateWater.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <div className='flex gap-6 items-center justify-between px-2 py-2 bg-secondary text-sm'>
          <div className='text-sm text-muted-foreground font-medium'>
            Default Water
          </div>
          <div className='text-sm text-muted-foreground font-medium'>
            {currentUser?.settings?.defaultWater}ml
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='w-full max-w-lg'>
        <DialogHeader>
          <DialogTitle>Default Water</DialogTitle>
          <DialogDescription>
            Set the default amount of water.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4 w-full'>
          <div className='text-sm text-muted-foreground font-medium'>
            <Input
              type='number'
              className='w-full'
              value={water}
              onChange={(e) => {
                setWater(Number(e.target.value))
              }}
            />
          </div>
          <Button
            disabled={isSaving}
            className='relative'
            onClick={() => {
              updateWater({
                water: water,
                id: Number(currentUser?.settings?.id),
              })
            }}
          >
            {isSaving ? (
              <RefreshCw
                className={cn('animate-spin')}
                size={20}
              />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const Settings = ({ currentUser }: { currentUser: GetUserById }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex gap-2 justify-between px-2 bg-secondary w-full py-2 items-end text-base font-semibold text-muted-foreground '>
        <div className='text-sm text-muted-foreground font-medium'>
          Settings
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full'>
        <DefaultWater currentUser={currentUser} />
      </div>
    </div>
  )
}

export default function Home() {
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery()

  if (isLoading) return null
  if (!currentUser) return null

  return (
    <div className='w-full mt-16'>
      <Settings currentUser={currentUser} />
    </div>
  )
}
