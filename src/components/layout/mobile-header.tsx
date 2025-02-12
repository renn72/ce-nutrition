'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Bell, BellDot, NotebookText } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'

interface Notification {
  id: number
  state: string
  message: string
}
const Notifications = ({
  notifications,
  setNotifications,
}: {
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
}) => {
  const isNotifications = notifications.reduce(
    (acc, idx) => (acc ? true : idx.state === 'unread' ? true : false),
    false,
  )
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isNotifications ? (
          <div className='relative'>
            <BellDot
              size={40}
              className='bg-accentt cursor-pointer rounded-full p-1'
            />
            <div className='absolute top-[8px] right-[6px] w-3 h-3 bg-red-600 rounded-full'></div>
          </div>
        ) : (
          <Bell
            size={40}
            className='bg-accentt cursor-pointer rounded-full p-1'
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={-28}
        align='end'
        sideOffset={8}
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.map((notification) => (
          <div key={notification.id}>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault()
                setNotifications(
                  notifications.map((n) => {
                    if (n.id == notification.id) {
                      return {
                        ...n,
                        state: 'read',
                      }
                    }
                    return n
                  }),
                )
              }}
              key={notification.id}
            >
              <div
                className={cn(
                  'flex gap-2 items-center',
                  notification.state === 'unread'
                    ? 'text-foreground font-semibold'
                    : '',
                )}
              >
                <div className=''>{notification.message}</div>
                <div className='text-sm text-muted-foreground'>
                  {notification.state === 'unread' ? (
                    <div className='h-2 w-2 rounded-full bg-red-600' />
                  ) : (
                    <div className='w-2' />
                  )}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
const MobileHeader = ({ isDesktop = false }: { isDesktop?: boolean }) => {
  const [notifications, setNotifications] = useState(() => [
    { id: 2, state: 'read', message: 'Update to your diet plan' },
  ])
  return (
    <div className={cn('flex gap-2 items-center justify-around fixed z-10 bg-background',
      isDesktop ? 'top-[129px] w-[388px]' : 'top-0 w-full '
    )}>
      <div className='flex flex-col gap-0 items-center justify-center'>
        <Link
          href='/user/program'
          >
        <NotebookText
          size={40}
          className='bg-accentt cursor-pointer rounded-full p-1'
        />
        </Link>
        <Label className='text-xs text-muted-foreground'>Program</Label>
      </div>
      <Link
        className='hover:opacity-100 opacity-80 transition-all py-2'
        href='/'
      >
        <Image
          src='/logo/ce.png'
          alt='logo'
          width={40}
          height={40}
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Link>
      <div className='flex flex-col gap-0 items-center justify-center'>
        <Notifications
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Label className='text-xs text-muted-foreground'>Notifications</Label>
      </div>
    </div>
  )
}

export {MobileHeader}
