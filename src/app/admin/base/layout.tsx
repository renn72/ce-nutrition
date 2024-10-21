import { AdminBaseSidebar } from './_sidebar/sidebar'
import { SidebarHeader } from './_sidebar/sidebar-header'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <>
        <AdminBaseSidebar>
          <SidebarHeader />
          {children}
        </AdminBaseSidebar>
      </>
  )
}
