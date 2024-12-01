'use client'

import Link from 'next/link'

import { api } from '@/trpc/react'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/layout/navbar'

export default function Home() {
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const isTrainer = currentUser?.isTrainer
  return (
    <div className='flex min-h-screen flex-col'>

      <Navbar />
      <main className='flex-1'></main>
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
