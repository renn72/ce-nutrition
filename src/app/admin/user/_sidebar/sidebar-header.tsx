'use client'

import * as React from 'react'

import Image from 'next/image'
import { usePathname } from 'next/navigation'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

import { User } from '@/components/auth/user'
import { ModeToggle } from '@/components/layout/mode-toggle'

import { useAtom } from 'jotai'
import { api } from '@/trpc/react'
import { userAtom } from '@/app/admin/user/_sidebar/sidebar'

const SidebarHeader = () => {
  const [selectedUser,] = useAtom(userAtom)
  const { data: users } = api.user.getAll.useQuery()
  const user = users?.find((user) => user.id === selectedUser)
  const pathname = usePathname()
  return (
    <header className='flex h-16 items-center gap-2 border-b px-4 justify-between'>
      <div className='flex shrink-0 items-center gap-2 '>
        <SidebarTrigger className='-ml-1' />
        <Separator
          orientation='vertical'
          className='mr-2 h-4'
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className='hidden md:block'>
              <BreadcrumbLink href='/admin/base'>
                <Image
                  src='/logo/ce.png'
                  alt='logo'
                  width={20}
                  height={20}
                />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>User</BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>
                {pathname.split('/')[3]}
              </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator className='hidden md:block' />
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>
                {user?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className='flex items-center gap-2'>
        <User />
      </div>
    </header>
  )
}

export { SidebarHeader }
