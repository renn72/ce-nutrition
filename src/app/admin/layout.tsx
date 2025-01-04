import { auth } from '@/server/auth'
import { SignIn } from '@/components/auth/sign-in'

import { AdminSidebar } from './_sidebar/sidebar'
import { SidebarHeader } from './_sidebar/sidebar-header'


export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  if (!session?.user.id)
    return (
      <>
        <div className='flex w-full h-screen flex-col items-center justify-center gap-2'>
        <SignIn />
        </div>
      </>
    )

  return (
      <>
        <AdminSidebar>
          <SidebarHeader />
          {children}
        </AdminSidebar>
      </>
  )
}
