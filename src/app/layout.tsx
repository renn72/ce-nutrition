import { TRPCReactProvider } from '@/trpc/react'

import { type Metadata } from 'next'
import { Epilogue } from 'next/font/google'

import { getServerAuthSession } from '@/server/auth'

import { Toaster } from '@/components/ui/sonner'

import { SignIn } from '@/components/auth/sign-in'
import { ThemeProvider } from '@/components/misc/theme-provider'
import { Providers } from '@/components/provider'

import '@/styles/globals.css'

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
                <div className='flex min-h-screen flex-col items-center justify-center'>
                  <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-3xl font-bold'>CE Nutrition</h2>
                    <h3 className='text-xl font-bold'>Sign in</h3>
                <SignIn />
                  </div>
                </div>
              ) : (
                <>
                  {children}
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
