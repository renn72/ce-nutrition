import { TRPCReactProvider } from '@/trpc/react'

import { type Metadata } from 'next'
import { Epilogue } from 'next/font/google'

import { getServerAuthSession } from '@/server/auth'

import { Toaster } from '@/components/ui/sonner'

import { SignIn } from '@/components/auth/sign-in'
import { Navbar } from '@/components/layout/navbar'
import { ThemeProvider } from '@/components/misc/theme-provider'
import { Providers } from '@/components/provider'

import '@/styles/globals.css'

import { CreatorMenu } from '@/components/creator/menu'

export const metadata: Metadata = {
  title: 'CE Nutrition',

  description: 'CE Nutrition',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

const font = Epilogue({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession()
  const isCreator = session?.user?.isCreator
  return (
    <html
      lang='en'
      className={`${font.className} relative`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            <TRPCReactProvider>
              {!session?.user?.id ? (
                <SignIn />
              ) : (
                <>
                  {children}
                  {isCreator ? <CreatorMenu /> : null}
                </>
              )}
              <Toaster />
            </TRPCReactProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
