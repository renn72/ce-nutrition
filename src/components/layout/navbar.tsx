'use client'

import { api } from '@/trpc/react'

import Image from 'next/image'
import Link from 'next/link'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Database } from '@/components/ui/database'

import { User } from '@/components/auth/user'
import { ModeToggle } from '@/components/layout/mode-toggle'

export const Navbar = () => {
  const ctx = api.useUtils()
  const { data: isUser, isLoading: isLoadingUser } = api.user.isUser.useQuery()
  const { data: isTrainer, isLoading: isLoadingTrainer } =
    api.user.isTrainer.useQuery()
  const { mutate: sync } = api.user.unprotectedSync.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Synced')
    },
  })

  return (
    <div className='h-18 flex items-center justify-between px-4'>
      <div className='flex items-center gap-4'>
        <Link
          className='hover:opacity-100 opacity-80 transition-all py-2'
          href='/'
        >
          <Image
            src='/logo/ce.png'
            alt='logo'
            width={30}
            height={30}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <Button
          variant='ghost'
          className='hidden'
          onClick={() => {
            sync()
          }}
        >
          <Database className='h-8 w-8 text-secondary' />
        </Button>
      </div>
      <User />
    </div>
  )
}
