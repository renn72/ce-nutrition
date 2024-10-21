'use client'

import { api } from '@/trpc/react'

import Image from 'next/image'
import Link from 'next/link'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Cucumber } from '@/components/ui/cucumber'
import { Database } from '@/components/ui/database'

import { User } from '@/components/auth/user'
import { ModeToggle } from '@/components/layout/mode-toggle'

const RootNavbar = () => {
  const ctx = api.useUtils()
  const { mutate: sync } = api.user.sync.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Synced')
    },
  })
  const { data: isRoot, isLoading: isLoadingRoot } = api.user.isRoot.useQuery()

  if (isLoadingRoot) return null
  if (!isRoot) return null
  if (!isRoot.isRoot) return null

  return (
    <div className='flex items-center gap-4'>
      <Button
        variant='ghost'
        onClick={() => {
          sync()
        }}
      >
        <Database className='h-8 w-8 text-secondary' />
      </Button>
      <Link href='/super-admin'>
        <Cucumber className='h-8 w-8 text-secondary' />
      </Link>
    </div>
  )
}

const GenUser = () => {
  const ctx = api.useUtils()
  const { mutate } = api.user.createUser.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Created')
    },
  })

  return (
    <Button
      variant='outline'
      onClick={() => {
        mutate({
          email: 'renn@warner.systems',
          password: 'hklasd',
          firstName: 'David',
          lastName: 'Warner',
          birthDate: new Date(1980, 0, 1),
          isCreator: true,
        })
      }}
    >
      GenUser
    </Button>
  )
}

const ImportAFCDSolid = () => {
  const ctx = api.useUtils()
  const { mutate } = api.test.importAFCDSolid.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Imported')
    },
  })
  const { mutate: importAFCDLiquid } = api.test.importAFCDLiquid.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Imported')
    },
  })
  const { mutate: deleteAll } = api.test.deleteAllIngredients.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Deleted')
    },
  })

  return (
    <div className='flex items-center gap-4'>
      <Button
        variant='outline'
        onClick={() => {
          mutate()
        }}
      >
        ImportAFCDSolid
      </Button>
      <Button
        variant='outline'
        onClick={() => {
          importAFCDLiquid()
        }}
      >
        ImportAFCDLiquid
      </Button>
      <Button
        variant='outline'
        onClick={() => {
          deleteAll()
        }}
      >
        DeleteAll
      </Button>
    </div>
  )
}

export const Navbar = () => {
  const ctx = api.useUtils()
  const { data: isUser, isLoading: isLoadingUser } = api.user.isUser.useQuery()
  const { mutate: sync } = api.user.unprotectedSync.useMutation({
    onSuccess: () => {
      ctx.invalidate()
      toast.success('Synced')
    },
  })

  return (
    <div className='h-18 flex items-center justify-between px-2'>
      <div className='flex items-center gap-4'>
        <Link
          className='hover:opacity-100 opacity-80 transition-all py-2'
          href='/'
        >
          <Image
            src='/logo/ce.png'
            alt='logo'
            width={30}
            height={30}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <Button
          variant='ghost'
          onClick={() => {
            sync()
          }}
        >
          <Database className='h-8 w-8 text-secondary' />
        </Button>
        <GenUser />
        <ImportAFCDSolid />
      </div>
      {isLoadingUser ? null : (
        <div className='flex items-center gap-4'>
          {isUser ? <RootNavbar /> : null}
          {true ? (
            <Link href='/admin'>
              <Button variant='outline'>Admin</Button>
            </Link>
          ) : null}
          <ModeToggle />
          <User />
        </div>
      )}
    </div>
  )
}
