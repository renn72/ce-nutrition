'use client'

import { usePathname } from 'next/navigation'
import * as React from 'react'

import { Check, ChevronsUpDown, GalleryVerticalEnd, LayoutDashboard, Search } from 'lucide-react'

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
        {
          title: 'Users',
          url: '/admin/base/user',
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
              <div className='flex items-end space-x-2 w-full py-1'>
                <LayoutDashboard size={26} className='mb-1'/>
                <h2 className='text-xl font-bold'>
                  Dashboard
                </h2>
              </div>
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
