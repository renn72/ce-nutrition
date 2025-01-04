'use client'

import { api } from '@/trpc/react'

import Link from 'next/link'

import { cn } from '@/lib/utils'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { House, LogOutIcon, Settings, UserRoundCog, VenetianMask } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

import { Logout } from '@/components/auth/logout'
import { SignInUp } from '@/components/auth/sign-in-up'
import { CreatorMenu } from '../creator/menu'

const User = () => {
  const ctx = api.useUtils()
  const { data: user, isLoading } = api.user.getCurrentUser.useQuery()

  const { theme, setTheme } = useTheme()
  const isTrainer = user?.isTrainer
  const isCreator = user?.isCreator
  const onLogout = async () => {
    try {
      await signOut()
    } catch (error) {
      toast.error('Error logging out')
      return
    }
    ctx.user.isUser.refetch()
  }

  if (isLoading) return <div className='w-8' />
  if (!user) return <SignInUp />
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            'flex items-center justify-center rounded-full cursor-pointer ',
            'bg-secondary-foreground/40 h-8 w-8 pt-1 text-sm font-bold',
          )}
        >
          {user.firstName?.slice(0, 1).toUpperCase()}
          {user.lastName?.slice(0, 1).toUpperCase()}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={12}
        className='min-w-48'
      >
        <DropdownMenuLabel>
          <div className='flex gap-6 items-center'>
            <div
              className={cn(
                'flex items-center justify-center rounded-full cursor-pointer',
                'bg-secondary-foreground/40 h-8 w-8 pt-1 text-sm font-bold',
                'hover:bg-secondary-foreground/70',
              )}
            >
              {user.firstName?.slice(0, 1).toUpperCase()}
              {user.lastName?.slice(0, 1).toUpperCase()}
            </div>
            <div className='pt-1'>{user.name}</div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'>
          <House size={20} />
          <Link href='/'>Home</Link>
        </DropdownMenuItem>
        {isTrainer && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'>
              <UserRoundCog size={20} />

              <Link href='/admin'>Admin</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'>
          <Settings size={20} />
          <Link href='/settings'>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? (
            <MoonIcon className='h-4 w-4' />
          ) : (
            <SunIcon className='h-4 w-4' />
          )}
          <span className=''>Toggle theme</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isCreator ? (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'>
              <VenetianMask size={20} />
              Super
            </DropdownMenuSubTrigger>
            <CreatorMenu />
          </DropdownMenuSub>
        ) : null}
        <DropdownMenuItem
          onClick={() => onLogout()}
          className='-m-1 rounded-none px-4 py-4 cursor-pointer flex items-center gap-6'
        >
          <LogOutIcon size={20} />
          <span className=''>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { User }
