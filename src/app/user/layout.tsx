import { isMobileDevice } from '@/lib/is-mobile-server'
import { cn } from '@/lib/utils'

import { ScrollArea } from '@/components/ui/scroll-area'

import { User } from '@/components/auth/user'
import MobileHeader from '@/components/layout/mobile-header'

const Mobile = ({
  children,
  isDesktop = false,
}: {
  children: React.ReactNode
  isDesktop?: boolean
}) => {
  return (
    <div className='flex flex-col gap-2 w-full min-h-screen'>
      <div className='mt-14' />
      <MobileHeader />
      {children}
      <div
        className={cn(
          'flex gap-2 w-full p-2 justify-center fixed border-t border-border bg-background w-full',
          !isDesktop ? 'bottom-0 w-full' : 'top-[924px] w-[389px]',
        )}
      >
        <User />
      </div>
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
      <div className='my-8'>TODO: desktop</div>
      <div>Mobile</div>

      <ScrollArea className='w-[390px] h-[844px] border border-border shadow-md relative '>
        <Mobile isDesktop={true}>{children}</Mobile>
      </ScrollArea>
    </div>
  )
}
