'use client'

import * as React from 'react'

import { api } from '@/trpc/react'

import Link from 'next/link'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import { Check, ChevronsUpDown, GalleryVerticalEnd, Search } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from '@/components/ui/sidebar'

const data = {
  versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
  navMain: [
    {
      title: 'User',
      url: '#',
      items: [
        {
          title: 'Info',
          url: '/admin/user/info',
        },

        {
          title: 'Program',
          url: '/admin/user/program',
        },
      ],
    },
  ],
}

const AdminBaseSidebar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const user = searchParams.get('user')
  const [selectedUser, setSelectedUser] = React.useState(user)
  const { data: allUsers } = api.user.getAll.useQuery()
  const userName = allUsers?.find((user) => user.id === selectedUser)?.name

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size='lg'
                    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                  >
                    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                      <GalleryVerticalEnd className='size-4' />
                    </div>
                    <div className='flex flex-col gap-0.5 leading-none'>
                      <span className='font-semibold'>User</span>
                      <span className=''>{userName}</span>
                    </div>
                    <ChevronsUpDown className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-[--radix-dropdown-menu-trigger-width]'
                  align='start'
                >
                  {allUsers?.map((user) => (
                    <DropdownMenuItem
                      key={user.id}
                      onSelect={() => {
                        console.log(pathname)
                        router.push(`${pathname}?user=${user.id}`)
                        setSelectedUser(user.id)}}
                    >
                      {user.name}
                      {user.id === selectedUser && (
                        <Check className='ml-auto' />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* We create a SidebarGroup for each parent. */}
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                      >
                        <Link href={item.url + '?user=' + user}>
                          {item.title}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className='w-full'>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export { AdminBaseSidebar }
