'use client'

// import Link from 'next/link'
import { Link } from 'next-view-transitions'

import { cn } from '@/lib/utils'
import { CalendarDays, Cog, Images, Logs, MessageSquare } from 'lucide-react'

import { User } from '@/components/auth/user'

const MobileFooter = () => {
  return (
    <div
      className={cn(
        'grid grid-cols-5 place-items-center p-2 fixed border-t border-border bg-background w-full tracking-tighter',
        'bottom-0 w-full',
      )}
    >
      <Link href='/user/log'>
        <div className='flex flex-col items-center text-sm'>
          <Logs size={20} />
          <span className='text-muted-foreground font-semibold leading-4 '>
            Logs
          </span>
          </div>
      </Link>
      <Link href='/user/settings'>
        <div className='flex flex-col items-center text-sm'>
          <Cog size={20} />
          <span className='text-muted-foreground font-semibold leading-4 '>
            Settings
          </span>
        </div>
      </Link>
      <User />
      <Link href='/user/message'>
        <div className='flex flex-col items-center text-sm'>
          <MessageSquare size={20} />
          <span className='text-muted-foreground font-semibold leading-4 '>
            Messages
          </span>
        </div>
      </Link>
      <Link href='/user/gallery'>
        <div className='flex flex-col items-center text-sm'>
          <Images size={20} />
          <span className='text-muted-foreground font-semibold leading-4 '>
            Gallery
          </span>
        </div>
      </Link>
    </div>
  )
}

export { MobileFooter }
