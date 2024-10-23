'use client'

import { api } from '@/trpc/react'
import { toast } from 'sonner'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

export const CreatorMenu = () => {
  const ctx = api.useUtils()
  const { mutate: sync } = api.user.sync.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Synced')
    },
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-2 bg-secondary rounded-full shadow-lg'>
          <HamburgerMenuIcon className='h-4 w-4' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={8}
        align='end'
        side='top'
      >
        <DropdownMenuLabel>ADMIN</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button
            variant='ghost'
            onClick={() => {
              sync()
            }}
          >
            Sync
          </Button>

        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
