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

import { ModeToggle } from '@/components/layout/mode-toggle'

const SidebarHeader = () => {
  const pathname = usePathname()
  return (
    <header className='flex h-16 items-center gap-2 border-b px-4 justify-between'>
      <div className='flex shrink-0 items-center gap-2 '>
        <SidebarTrigger className='-ml-1' />
        <Separator
          // @ts-ignore
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
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>
                {pathname.split('/')[3]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <ModeToggle />
    </header>
  )
}

export { SidebarHeader }
