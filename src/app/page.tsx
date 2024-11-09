'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <main className='flex-1'>
        <section className='flex h-screen w-full flex-col justify-center bg-background py-12 md:py-24 lg:py-32 xl:py-48'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
                  Welcome to Our Revolutionary Platform
                </h1>
                <p className='mx-auto max-w-[700px] text-muted-foreground dark:text-gray-400 md:text-xl'>
                  Empower your workflow, boost productivity, and achieve your
                  goals with our cutting-edge solution. Experience innovation
                  like never before.
                </p>
              </div>
              <div className='space-x-4'>
                <Link
                  href='/admin'
                  passHref
                >
                  <Button>Get Started for Free</Button>
                </Link>
                <Link
                  href='#'
                  passHref
                >
                  <Button variant='outline'>Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-6 sm:flex-row md:px-6'>
        <p className='text-xs text-gray-500 dark:text-gray-400'>
          © 2024 CE Nutrition. All rights reserved.
        </p>
        <nav className='flex gap-4 sm:ml-auto sm:gap-6'>
          <Link
            className='text-xs underline-offset-4 hover:underline'
            href='#'
          >
            Terms of Service
          </Link>
          <Link
            className='text-xs underline-offset-4 hover:underline'
            href='#'
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
