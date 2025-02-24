'use client'

import { api } from '@/trpc/react'

import { toast } from 'sonner'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const DefaultWater = ({ currentUser }: { currentUser: GetUserById }) => {
  const [water, setWater] = useState(
    Number(currentUser?.settings?.defaultWater),
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateWater } = api.user.updateWater.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  return (
    <DialogWrapper
      title='Default Water'
      value={`${currentUser?.settings?.defaultWater}ml`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
        <DialogHeader>
          <DialogTitle>Default Water</DialogTitle>
          <DialogDescription>
            Set the default amount of water.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4 w-full'>
          <div className='text-sm text-muted-foreground font-medium'>
            <Input
              type='number'
              className='w-full'
              value={water}
              onChange={(e) => {
                setWater(Number(e.target.value))
              }}
            />
          </div>
          <Button
            disabled={isSaving}
            className='relative'
            onClick={() => {
              updateWater({
                water: water,
                id: Number(currentUser?.settings?.id),
              })
            }}
          >
            {isSaving ? (
              <RefreshCw
                className={cn('animate-spin')}
                size={20}
              />
            ) : (
              <span>Save</span>
            )}
          </Button>
        </div>
    </DialogWrapper>
  )
}

const FirstName = ({ currentUser }: { currentUser: GetUserById }) => {
  const [firstName, setFirstName] = useState(
    currentUser?.firstName ?? '',
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateFirstName } = api.user.updateFirstName.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='First Name'
      value={currentUser?.firstName ?? ''}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
        <DialogHeader>
          <DialogTitle>First Name</DialogTitle>
          <DialogDescription>
            Update your first name.
          </DialogDescription>
        </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium'>
          <Input
            type='text'
            className='w-full'
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving}
          className='relative'
          onClick={() => {
            updateFirstName({
              firstName: firstName,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const LastName = ({ currentUser }: { currentUser: GetUserById }) => {
  const [lastName, setLastName] = useState(currentUser?.lastName ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateLastName } = api.user.updateLastName.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='Last Name'
      value={currentUser?.lastName ?? ''}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
        <DialogHeader>
          <DialogTitle>Last Name</DialogTitle>
          <DialogDescription>
            Update your last name.
          </DialogDescription>
        </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium'>
          <Input
            type='text'
            className='w-full'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving}
          className='relative'
          onClick={() => {
            updateLastName({
              lastName: lastName,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const Email = ({ currentUser }: { currentUser: GetUserById }) => {
  const [email, setEmail] = useState(currentUser?.email ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateEmail } = api.user.updateEmail.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='Email'
      value={currentUser?.email ?? ''}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
        <DialogHeader>
          <DialogTitle>Email</DialogTitle>
          <DialogDescription>
            Update your email.
          </DialogDescription>
        </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium'>
          <Input
            type='text'
            className='w-full'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving}
          className='relative'
          onClick={() => {
            updateEmail({
              email: email,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const Password = ({ currentUser }: { currentUser: GetUserById }) => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updatePassword } = api.user.updatePassword.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='Password'
      value={'********'}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
        <DialogHeader>
          <DialogTitle>Password</DialogTitle>
          <DialogDescription>
            Update your password.
          </DialogDescription>
        </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium flex gap-4 flex-col'>
          <Input
            type='password'
            placeholder='New Password'
            className='w-full'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            className='w-full'
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving || (password !== passwordConfirm)}
          className='relative'
          onClick={() => {
            if (password !== passwordConfirm){
              toast.error('Passwords do not match')
              return
            }
            updatePassword({
              password: password,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const DialogWrapper = ({
  children,
  title,
  value,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode
  title: string
  value: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <div className='flex gap-6 items-center justify-between px-8 py-2 bg-secondary text-sm'>
          <div className='text-sm text-muted-foreground/80 font-medium'>
            {title}
          </div>
          <div className='text-sm text-muted-foreground font-semibold truncate'>
            {value}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='w-full max-w-lg'>{children}</DialogContent>
    </Dialog>
  )
}

const Settings = ({ currentUser }: { currentUser: GetUserById }) => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex gap-2 justify-between px-2 bg-secondary w-full py-2 items-end text-base font-semibold text-muted-foreground '>
        <div className='text-sm text-muted-foreground font-medium'>
          Profile
        </div>
      </div>
      <div className='flex flex-col gap-2 w-full px-8'>
        <FirstName currentUser={currentUser} />
        <LastName currentUser={currentUser} />
        <Email currentUser={currentUser} />
        <Password currentUser={currentUser} />
        <DefaultWater currentUser={currentUser} />
      </div>
    </div>
  )
}

export default function Home() {
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery()

  if (isLoading) return null
  if (!currentUser) return null

  return (
    <div className='w-full mt-16'>
      <Settings currentUser={currentUser} />
    </div>
  )
}
