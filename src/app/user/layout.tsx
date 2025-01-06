import Link from 'next/link'

import { isMobileDevice } from '@/lib/is-mobile-server'
import { cn } from '@/lib/utils'
import { Logs } from 'lucide-react'

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
      <MobileHeader isDesktop={false} />
      {children}
      <div
        className={cn(
          'grid grid-cols-3 place-items-center p-2 fixed border-t border-border bg-background w-full',
          !isDesktop || true ? 'bottom-0 w-full' : 'top-[922px] w-[388px]',
        )}
      >
        <Link href='/user/log'>
          <div className='flex gap-2 items-end'>
            <span className='text-muted-foreground text-base font-semibold leading-4 '>
              Logs
            </span>
            <Logs size={20} />
          </div>
        </Link>
        <User />
        <div />
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
        <Mobile isDesktop={true}>{children}</Mobile>
    </div>
  )
}
