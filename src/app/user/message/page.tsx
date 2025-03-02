'use client'

import { api } from '@/trpc/react'

import { impersonatedUserAtom } from '@/atoms'
import { useAtomValue } from 'jotai'
import { CirclePlus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const NewMessage = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CirclePlus
          size={24}
          className='cursor-pointer'
        />
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription>Write your message here</DialogDescription>
        </DialogHeader>
        <DialogDescription>Write your message here</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default function Message() {
  const impersonatedUser = useAtomValue(impersonatedUserAtom)
  const { data: messages, isLoading: messagesLoading } =
    api.message.getAllUser.useQuery(impersonatedUser.id)
  const { data: sendMessage, isLoading: sendMessageLoading } =
    api.message.getAllFromUser.useQuery(impersonatedUser.id)
  const { data: currentUser, isLoading: currentUserLoading } =
    api.user.getCurrentUser.useQuery({ id: impersonatedUser.id })
  const { data: getAllUser, isLoading: getAllUserLoading } =
    api.user.getAll.useQuery()

  const sendList = getAllUser?.filter((user) => {
    if (currentUser.isRoot) return true
    if (currentUser.isCreator) return true
    if (currentUser.isTrainer) return true

    if (user.isTrainer) return true
    return false
  })

  console.log('sendList', sendList)

  return (
    <div className='flex gap-4 flex-col items-center justify-center w-full min-h-[200px]'>
      <div className='flex gap-4'>
        <h1>Messages</h1>
        <NewMessage />
      </div>
    </div>
  )
}
