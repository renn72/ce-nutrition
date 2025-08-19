
import { isMobileDevice } from '@/lib/is-mobile-server'

import { MobileHeader } from '@/components/layout/mobile-header'

import { MobileFooter } from '@/components/layout/mobile-footer'
import { User } from '@/components/auth/user'

const Mobile = ({
  children,
  isDesktop = false,
}: {
  children: React.ReactNode
  isDesktop?: boolean
}) => {
  return (
    <div className='flex flex-col gap-2 w-full min-h-[100svh] relative'>
      <div className='absolute top-1 right-1 z-100'>
        <User />
      </div>
      {children}
    </div>
  )
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isMobile = await isMobileDevice()
  if (isMobile) {
    return <Mobile>{children}</Mobile>
  }

  return (
    <div className='flex flex-col items-center gap-2 '>
      <Mobile isDesktop={true}>{children}</Mobile>
    </div>
  )
}
