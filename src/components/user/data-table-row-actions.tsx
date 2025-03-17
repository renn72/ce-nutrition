'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { RefreshCw } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

const DialogWrapper = ({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode
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
        <Button variant='ghost'>Update Email</Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        className='w-full max-w-lg'
      >
        {children}
      </DialogContent>
    </Dialog>
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
  return (
    <DialogWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DialogHeader>
        <DialogTitle>Email</DialogTitle>
        <DialogDescription>Update your email.</DialogDescription>
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
              id: currentUser?.id ?? '',
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

const DeleteAccount = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const { mutate: deleteUser } = api.user.deleteUser.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      toast.success('Deleted successfully')
    },
  })
  const { data: isUser } = api.user.isUser.useQuery()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>Delete Account</Button>
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
        className='w-full max-w-lg'
      >
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action is
            irreversible.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4 w-full'>
          <Button
            variant='destructive'
            onClick={() => {
              if (!currentUser) return
              if (isUser?.id === currentUser?.id) {
                toast.error('You cannot delete yourself')
                return
              }

              deleteUser(currentUser?.id)
            }}
          >
            Delete Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const ctx = api.useUtils()
  const data = row.original as GetUserById
  const { mutate: updateTrainer } = api.user.updateTrainer.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      toast.success('Updated successfully')
    },
  })
  const { data: isUser } = api.user.isUser.useQuery()
  console.log(data)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[160px]'
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation()
          }}
          onSelect={(e) => {
            e.stopPropagation()
            if (!data) return
            if (isUser?.id === data?.id) {
              toast.error('You cannot toggle yourself as a trainer')
              return
            }

            updateTrainer({
              id: data?.id,
              isTrainer: !data?.isTrainer,
            })
          }}
        >
          <Button variant='ghost'>Toggle Trainer</Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <Email currentUser={data} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            await signIn('resend', { email: data?.email?.toLowerCase(), redirect: false })
            toast.success('Sent email invite')
          }}
        >
          <Button variant='ghost'>Send Email Invite</Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='text-destructive'
          onSelect={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <DeleteAccount currentUser={data} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
