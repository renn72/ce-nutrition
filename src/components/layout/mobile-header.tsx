'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import Image from 'next/image'

import { impersonatedUserAtom } from '@/atoms'
import { slideInOut } from '@/lib/tranistions'
import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { useAtom } from 'jotai'
import { Bell, BellDot, NotebookText } from 'lucide-react'
// import Link from 'next/link'
import { Link, useTransitionRouter } from 'next-view-transitions'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
  currentUser,
}: {
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>
  currentUser: GetUserById
}) => {
  const ctx = api.useUtils()
  const { data: userMessages } = api.message.getAllUser.useQuery(currentUser.id)
  const { mutate: markAsViewed } = api.message.markAsViewed.useMutation({
    onMutate: async (newMessage) => {
      await ctx.message.getAllUser.cancel()
      const previousLog = ctx.message.getAllUser.getData(currentUser.id)
      if (!previousLog) return
      ctx.message.getAllUser.setData(currentUser.id, [
        ...previousLog.map((message) => {
          if (message.id === newMessage) {
            return {
              ...message,
              isViewed: true,
            }
          }
          return message
        }),
      ])
      return { previousLog }
    },
    onSettled: () => {
      ctx.message.invalidate()
    },
    onError: (err, newPoopLog, context) => {
      toast.error('error')
      ctx.message.getAllUser.setData(currentUser.id, context?.previousLog)
    },
  })
  const { mutate: markAsRead } = api.message.markAsRead.useMutation({
    onMutate: async (newMessage) => {
      await ctx.message.getAllUser.cancel()
      const previousLog = ctx.message.getAllUser.getData(currentUser.id)
      if (!previousLog) return
      ctx.message.getAllUser.setData(currentUser.id, [
        ...previousLog.map((message) => {
          if (message.id === newMessage) {
            return {
              ...message,
              isRead: true,
            }
          }
          return message
        }),
      ])
      return { previousLog }
    },
    onSettled: () => {
      ctx.message.invalidate()
    },
    onError: (err, newPoopLog, context) => {
      toast.error('error')
      ctx.message.getAllUser.setData(currentUser.id, context?.previousLog)
    },
  })

  const isNotifications = userMessages?.some(
    (message) => message.isViewed === false || message.isViewed === null,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isNotifications ? (
          <div className={cn('relative', isNotifications ? '' : '')}>
            <BellDot
              size={36}
              className='bg-accentt cursor-pointer rounded-full p-1'
            />
            <div className='absolute top-[7px] right-[6px] w-3 h-3 bg-red-600 rounded-full '></div>
            <div className='absolute top-[7px] right-[6px] w-3 h-3 bg-red-600 rounded-full animate-ping'></div>
          </div>
        ) : (
          <Bell
            size={36}
            className='bg-accentt cursor-pointer rounded-full p-1'
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        alignOffset={-28}
        align='end'
        sideOffset={8}
        className='min-w-[240px]'
      >
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {userMessages
          ?.filter(
            (message) => message.isRead === false || message.isRead === null,
          )
          .map((message) => (
            <div key={message.id}>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault()
                }}
                onClick={() => {
                  if (message.isRead === false || message.isRead === null) {
                    markAsViewed(message.id)
                  }
                }}
                key={message.id}
              >
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <div
                      className={cn(
                        'flex gap-2 items-center',
                        message.isViewed === false || message.isViewed === null
                          ? 'text-foreground font-semibold'
                          : '',
                      )}
                    >
                      <div className='w-32'>
                        {message.isViewed === false || message.isViewed === null
                          ? 'New Message'
                          : 'message'}
                      </div>
                      <div className='font-normal text-[0.65rem] text-muted-foreground'>
                        {`from ${message.fromUser?.name}`}
                      </div>
                      <div className='text-sm text-muted-foreground'>
                        {message.isViewed === false ||
                        message.isViewed === null ? (
                          <div className='h-2 w-2 rounded-full bg-red-600' />
                        ) : (
                          <div className='w-2' />
                        )}
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className='flex gap-2 items-center flex-col'>
                      <div>{message.message}</div>
                      <Button
                        className=''
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          markAsRead(message.id)
                        }}
                      >
                        Mark as Read
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </div>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
const MobileHeader = ({ isDesktop = false }: { isDesktop?: boolean }) => {
  const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery({
    id: impersonatedUser.id,
  })
  const [notifications, setNotifications] = useState(() => [
    { id: 2, state: 'read', message: 'Update to your diet plan' },
  ])
  const router = useTransitionRouter()
  if (!currentUser) return null
  return (
    <div
      className={cn(
        'flex gap-2 items-center justify-around fixed z-10 bg-background',
        isDesktop ? 'top-[129px] w-[388px]' : 'top-0 w-full ',
      )}
    >
      <div className='flex flex-col gap-0 items-center justify-center'>
        <Link href='/user/program'>
          <NotebookText
            size={36}
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
          width={36}
          height={36}
          priority
          style={{
            width: '90%',
            height: 'auto',
          }}
        />
      </Link>
      <div className='flex flex-col gap-0 items-center justify-center'>
        <Notifications
          currentUser={currentUser}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Label className='text-xs text-muted-foreground'>Notifications</Label>
      </div>
    </div>
  )
}

export { MobileHeader }
