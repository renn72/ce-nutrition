'use client'

import { api } from '@/trpc/react'

import * as React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Check,
  ChevronRight,
  ChevronsUpDown,
  GalleryVerticalEnd,
  LayoutDashboard,
  Search,
} from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
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
  SidebarMenuSub,
  SidebarMenuSubItem,
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
          title: 'Plans',
          url: '/admin/base/plan',
          items: [
            {
              title: 'Create',
              url: '/admin/base/plan/create',
            },
          ],
        },
        {
          title: 'Meals',
          url: '/admin/base/meal',
          items: [
            {
              title: 'Create',
              url: '/admin/base/meal/create',
            },
          ],
        },
        {
          title: 'Recipes',
          url: '/admin/base/recipe',
          items: [
            {
              title: 'Create',
              url: '/admin/base/recipe/create',
            },
          ],
        },
        {
          title: 'Ingredients',
          url: '/admin/base/ingredient',
          items: [
            {
              title: 'Create',
              url: '/admin/base/ingredient/create',
            },
          ],
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

const AdminBaseSidebar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [selectedVersion, setSelectedVersion] = React.useState(data.versions[0])
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <div className='flex items-end space-x-2 w-full py-1'>
                <LayoutDashboard
                  size={26}
                  className='mb-1'
                />
                <h2 className='text-xl font-bold'>Dashboard</h2>
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
                    <div key={item.title}>
                      {item.items ? (
                        <Collapsible
                          key={item.title}
                          className='group/collapsible'
                        >
                          <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton
                                isActive={pathname === item.url}
                              >
                                <Link href={item.url}>{item.title}</Link>
                                <ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.items.map((item) => (
                                  <SidebarMenuSubItem key={item.title}>
                                    <Link href={item.url}>{item.title}</Link>
                                  </SidebarMenuSubItem>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          </SidebarMenuItem>
                        </Collapsible>
                      ) : (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.url}
                          >
                            <a href={item.url}>{item.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </div>
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
