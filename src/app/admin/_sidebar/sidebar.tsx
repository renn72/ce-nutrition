'use client'

import { api } from '@/trpc/react'

import { usePathname, useSearchParams } from 'next/navigation'

import { impersonatedUserAtom } from '@/atoms'
import { atom, useAtom } from 'jotai'
import { Link } from 'next-view-transitions'

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
  SidebarTriggerChevron,
  useSidebar,
} from '@/components/ui/sidebar'

import { SidebarHeader as AdminSidebarHeader } from './sidebar-header'
import { SidebarUserSelect } from './sidebar-user-select'

export const userAtom = atom<string>('')

const rootLinks = ['calendar', 'kanban', 'super', 'user-super', 'all skinfolds']

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
          title: 'AI Insights',
          url: '/admin/ai',
        },
        {
          title: 'Images',
          url: '/admin/user-image',
        },
        {
          title: 'Skinfolds',
          url: '/admin/user-skinfolds',
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
          title: 'Supplements',
          url: '/admin/user-supplement',
        },
        {
          title: 'Supplement Log',
          url: '/admin/user-supplement-log',
        },
        {
          title: 'break-1',
          url: '',
        },
        {
          title: 'Settings',
          url: '/admin/user-settings',
        },
      ],
    },
    {
      title: 'Views',
      items: [
        {
          title: 'Weight',
          url: '/user-weight-view',
        },
        {
          title: 'Lean Mass',
          url: '/user-lean-mass-view',
        },
        {
          title: 'Body Fat',
          url: '/user-body-fat-view',
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
        {
          title: 'Supplements',
          url: '/admin/supplement',
        },
        {
          title: 'Supp Templates',
          url: '/admin/supplement-templates',
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
      title: 'Dictator',
      url: '#',
      items: [
        {
          title: 'User Super',
          url: '/admin/user-super',
        },
        {
          title: 'All Skinfolds',
          url: '/admin/skinfolds',
        },
      ],
    },
  ],
}

const AdminSidebarContent = () => {
  const { setOpenMobile, isMobile } = useSidebar()

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const user = searchParams.get('user')

  const [impersonatedUser, _setImpersonatedUser] = useAtom(impersonatedUserAtom)

  const { data: currentUser } = api.user.getCurrentUserRoles.useQuery({
    id: impersonatedUser.id,
  })

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className='flex justify-between items-center'>
            <SidebarUserSelect />
            <SidebarTriggerChevron />
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
                  .filter(
                    (item) =>
                      !rootLinks.includes(item.title.toLowerCase()) ||
                      currentUser?.isCreator,
                  )
                  .map((item) => {
                    if (item.url === '')
                      return (
                        <div
                          key={item.title}
                          className='py-1'
                        />
                      )
                    return (
                      <div key={item.title}>
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === item.url}
                            onClick={() => {
                              console.log('clicked')
                              if (isMobile) setOpenMobile(false)
                            }}
                          >
                            <Link href={`${item.url}?user=${user}`}>
                              {item.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </div>
                    )
                  })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

const AdminSidebar = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AdminSidebarContent />
      <SidebarInset className=''>
        <AdminSidebarHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export { AdminSidebar }
