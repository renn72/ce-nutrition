'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import { GetAllUsers } from '@/types'
import { useAtomValue } from 'jotai'
import { Check, ChevronsUpDown, CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const SendTo = ({ sendList, value, setValue }: { sendList: GetAllUsers | null | undefined, value: string, setValue: (value: string) => void }) => {
  const [open, setOpen] = useState(false)
  if (!sendList) return null
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'
        >
          {value
            ? sendList.find((user) => user.id === value)?.name
            : 'Select recipient'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandList>
            <CommandEmpty>No one found.</CommandEmpty>
            <CommandGroup>
              {sendList.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === user.id ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

const NewMessage = ({
  sendList,
}: {
  sendList: GetAllUsers | null | undefined
}) => {
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [recipient, setRecipient] = useState<string>('')

  return (
    <Dialog

    >
      <DialogTrigger asChild>
        <CirclePlus
          size={24}
          className='cursor-pointer'
        />
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className=''>
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription></DialogDescription>
          <SendTo
            sendList={sendList}
            value={recipient}
            setValue={setRecipient}
          />
        </DialogHeader>
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

  if (!currentUser) return null
  if (
    messagesLoading ||
    sendMessageLoading ||
    currentUserLoading ||
    getAllUserLoading
  )
    return null
  const sendList = getAllUser?.filter((user) => {
    if (currentUser.isRoot) return true
    if (currentUser.isCreator) return true
    if (currentUser.id === user.id) return false
    if (currentUser.isTrainer) return true

    if (user.isTrainer) return true
    return false
  })

  console.log('sendList', sendList)

  return (
    <div className='flex gap-4 flex-col items-center justify-center w-full min-h-[200px]'>
      <div className='flex gap-4'>
        <h1>Messages</h1>
        <NewMessage sendList={sendList} />
      </div>
    </div>
  )
}
