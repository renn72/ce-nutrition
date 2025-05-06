'use client'

import { api } from '@/trpc/react'

import * as React from 'react'

// import Link from 'next/link'
import { Link, useTransitionRouter } from 'next-view-transitions'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { atom, useAtom } from 'jotai'
import { Check, ChevronsUpDown, User } from 'lucide-react'

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

export const userAtom = atom<string>('')

const data = {
  navMain: [
    {
      title: 'User',
      url: '#',
      items: [
        {
          title: 'Info',
          url: '/admin/user-info',
        },
        {
          title: 'Logs',
          url: '/admin/user-logs',
        },
        {
          title: 'Skinfolds',
          url: '/admin/user-skinfolds',
        },
        {
          title: 'Check-in',
          url: '/admin/user-check-in',
        },
        {
          title: 'Program',
          url: '/admin/user-program',
        },
        {
          title: 'Create',
          url: '/admin/user-create-plan',
        },
        {
          title: 'Settings',
          url: '/admin/user-settings',
        },
        {
          title: 'User Super',
          url: '/admin/user-super',
        },
      ],
    },
    {
      title: 'Building Blocks',
      url: '#',
      items: [
        {
          title: 'Plans',
          url: '/admin/plan',
        },
        // {
        //   title: 'Meals',
        //   url: '/admin/meal',
        // },
        {
          title: 'Recipes',
          url: '/admin/recipe',
        },
        {
          title: 'Ingredients',
          url: '/admin/ingredient',
        },
        // {
        //   title: 'Store',
        //   url: '/admin/store',
        // },
        {
          title: 'Users',
          url: '/admin/users',
        },
      ],
    },
    {
      title: 'Admin',
      url: '#',
      items: [
        // {
        //   title: 'Settings',
        //   url: '/admin/settings',
        // },
        {
          title: 'Super',
          url: '/admin/super',
        },
      ],
    },
  ],
}

const AdminSidebar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter()
  const router2 = useTransitionRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const user = searchParams.get('user')
  const [selectedUser, setSelectedUser] = useAtom(userAtom)
  const { data: _allUsers } = api.user.getAll.useQuery()
  const { data: isRoot } = api.user.isRoot.useQuery()
  const allUsers = _allUsers?.filter((user) => true) //!user.isRoot || isRoot?.isRoot)
  const userName = allUsers?.find((user) => user.id === selectedUser)?.name

  React.useEffect(() => {
    if (user) {
      setSelectedUser(user)
    }
  }, [user])

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
                      <User className='size-4' />
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
                        setSelectedUser(user.id)
                      }}
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
                  {item.items
                    .filter((item) => item.title !== 'Super' || isRoot?.isRoot)
                    .filter((item) => item.title !== 'User Super' || isRoot?.isRoot)
                    .map((item) => (
                      <div key={item.title}>
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
                      </div>
                    ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className=''>{children}</SidebarInset>
    </SidebarProvider>
  )
}

export { AdminSidebar }
