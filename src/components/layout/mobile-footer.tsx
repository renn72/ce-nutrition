'use client'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Logs } from 'lucide-react'

import { User } from '@/components/auth/user'

const MobileFooter = () => {
  return (
    <div
      className={cn(
        'grid grid-cols-3 place-items-center p-2 fixed border-t border-border bg-background w-full',
        'bottom-0 w-full',
      )}
    >
      <Link href='/user/log'>
        <div className='flex gap-2 items-end'>
          <span className='text-muted-foreground text-base font-semibold leading-4 '>
            Logs
          </span>
          <Logs size={20} />
        </div>
      </Link>
      <User />
      <div />
    </div>
  )
}

export { MobileFooter }
