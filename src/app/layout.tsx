import { TRPCReactProvider } from '@/trpc/react'

import type {  Metadata } from 'next'

import { epilogue } from '@/lib/font'

import { auth } from '@/server/auth'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { ourFileRouter } from '~/app/api/uploadthing/core'
import { ViewTransitions } from 'next-view-transitions'
import { extractRouterConfig } from 'uploadthing/server'

import { Toaster } from '@/components/ui/sonner'

import { SignIn } from '@/components/auth/sign-in'
import { ThemeProvider } from '@/components/misc/theme-provider'
import { Providers } from '@/components/provider'

import '../styles/globals.css'
import { Disclaimers } from '@/components/disclamier/disclamiers'

export const metadata: Metadata = {
  title: 'CE Nutrition',

  description: 'CE Nutrition',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}


export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  return (
    <ViewTransitions>
      <html
        lang='en'
        className={`${epilogue.className} relative`}
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
              <NextSSRPlugin
                routerConfig={extractRouterConfig(ourFileRouter)}
              />
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
                    <Disclaimers />
                  </>
                )}
                <Toaster />
              </TRPCReactProvider>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  )
}
