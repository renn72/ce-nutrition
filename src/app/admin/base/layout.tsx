import { AdminBaseSidebar as Sidebar } from './_sidebar/sidebar'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  )
}
