'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

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
      title: 'Building Blocks',
      url: '#',
      items: [
        {
          title: 'Ingredients',
          url: '/admin/base/ingredient',
        },
        {
          title: 'Store',
          url: '/admin/base/store',
        },
      ],
    },
    {
      title: 'Admin',
      url: '#',
      items: [
        {
          title: 'Settings',
          url: '/admin/base/settings',
        },
      ],
    },
  ],
}

const AdminBaseSidebar = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [selectedVersion, setSelectedVersion] = React.useState(data.versions[0])
  const pathname = usePathname()

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
                      <span className='font-semibold'>Documentation</span>
                      <span className=''>v{selectedVersion}</span>
                    </div>
                    <ChevronsUpDown className='ml-auto' />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className='w-[--radix-dropdown-menu-trigger-width]'
                  align='start'
                >
                  {data.versions.map((version) => (
                    <DropdownMenuItem
                      key={version}
                      onSelect={() => setSelectedVersion(version)}
                    >
                      v{version}{' '}
                      {version === selectedVersion && (
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
                        <a href={item.url}>{item.title}</a>
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
      <SidebarInset
        className='w-full'
      >
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AdminBaseSidebar }
