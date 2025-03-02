'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { impersonatedUserAtom } from '@/atoms'
import { cn } from '@/lib/utils'
import { GetAllUsers, GetUserById } from '@/types'
import { useAtomValue } from 'jotai'
import {
  Check,
  ChevronsUpDown,
  CircleAlert,
  CircleCheck,
  CircleDot,
  CirclePlus,
  Star,
} from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'

const SendTo = ({
  sendList,
  value,
  setValue,
}: {
  sendList: GetAllUsers | null | undefined
  value: string
  setValue: (value: string) => void
}) => {
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
          className={cn(
            'w-[200px] justify-between px-3',
            value ? '' : 'text-muted-foreground font-normal',
          )}
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
  currentUser,
}: {
  sendList: GetAllUsers | null | undefined
  currentUser: GetUserById
}) => {
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [recipient, setRecipient] = useState<string>('')
  const [isImportant, setIsImportant] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const ctx = api.useUtils()
  const { mutate: sendMessage } = api.message.create.useMutation({
    onMutate: () => setIsSending(true),
    onSettled: () => setIsSending(false),
    onSuccess: () => {
      ctx.message.invalidate()
      toast.success('Message sent')
      setIsOpen(false)
      setMessage('')
      setSubject('')
      setRecipient('')
    },
  })

  if (!currentUser) return null
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <CirclePlus
          size={24}
          className='cursor-pointer'
        />
      </DialogTrigger>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className='flex flex-col gap-4'
      >
        <DialogHeader>
          <DialogTitle>New Message</DialogTitle>
          <DialogDescription></DialogDescription>
          <SendTo
            sendList={sendList}
            value={recipient}
            setValue={setRecipient}
          />
        </DialogHeader>
        <div className='flex gap-4 items-center'>
          <Input
            placeholder='Subject'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <CircleAlert
            size={36}
            strokeWidth={isImportant ? 3 : 2}
            className={cn(
              'cursor-pointer text-muted-foreground p-1',
              isImportant ? 'text-alert rounded-md' : '',
            )}
            onClick={() => setIsImportant(!isImportant)}
          />
        </div>
        <Textarea
          placeholder='Message'
          value={message}
          rows={12}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className='flex gap-4'>
          <Button
            className='w-full'
            disabled={isSending}
            onClick={() => {
              if (message === '') return toast.error('Message cannot be empty')
              sendMessage({
                message: message,
                subject: subject,
                userId: recipient,
                fromUserId: currentUser.id,
                isImportant: isImportant,
              })
            }}
          >
            {isSending ? 'Sending' : 'Send'}
          </Button>
          <Button
            className='w-full'
            onClick={() => {
              setRecipient('')
              setSubject('')
              setMessage('')
            }}
          >
            Clear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const Messages = ({ currentUser }: { currentUser: GetUserById }) => {
  const { data: messages, isLoading: messagesLoading } =
    api.message.getAllUser.useQuery(currentUser.id)
  const { data: sentMessages, isLoading: sentMessageLoading } =
    api.message.getAllFromUser.useQuery(currentUser.id)
  const { data: getAllUser, isLoading: getAllUserLoading } =
    api.user.getAll.useQuery()

  if (messagesLoading || sentMessageLoading || getAllUserLoading) return null
  const sendList = getAllUser?.filter((user) => {
    if (currentUser.isRoot) return true
    if (currentUser.isCreator) return true
    if (currentUser.id === user.id) return false
    if (currentUser.isTrainer) return true

    if (user.isTrainer) return true
    return false
  })

  console.log('sent', sentMessages)
  console.log('messages', messages)

  return (
    <div className='flex gap-4 flex-col items-center justify-center w-full mt-16'>
      <div className='flex gap-4'>
        <h1>Messages</h1>
        <NewMessage
          sendList={sendList}
          currentUser={currentUser}
        />
      </div>
      <Tabs
        defaultValue='inbox'
        className='w-full'
      >
        <TabsList className='w-full'>
          <TabsTrigger value='inbox'>Inbox</TabsTrigger>
          <TabsTrigger value='sent'>Sent</TabsTrigger>
        </TabsList>
        <TabsContent
          value='inbox'
          className='w-full flex flex-col gap-4'
        >
          {messages?.map((message) => (
            <Card
              className='w-full'
              key={message.id}
            >
              <CardHeader className='flex justify-between'>
                <CardTitle className='text-center w-full relative'>
                  <span>From {message.fromUser?.name}</span>
                  {message.isViewed ? (
                    <CircleCheck
                      size={16}
                      className={cn(
                        'absolute right-0 top-0 cursor-pointer text-green-700',
                      )}
                    />
                  ) : (
                    <CircleDot
                      size={16}
                      className={cn(
                        'absolute right-0 top-0 cursor-pointer text-muted-foreground',
                      )}
                    />
                  )}
                </CardTitle>
                <CardDescription className='text-center'>
                  {message.subject}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex justify-between'>
                {message.message}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent
          value='sent'
          className='w-full flex flex-col gap-4'
        >
          {sentMessages?.map((message) => (
            <Card
              className='w-full'
              key={message.id}
            >
              <CardHeader className='flex justify-between'>
                <CardTitle className='text-center w-full relative'>
                  <span>To {message.user?.name}</span>
                  {message.isViewed ? (
                    <CircleCheck
                      size={16}
                      className={cn(
                        'absolute right-0 top-0 cursor-pointer text-green-700',
                      )}
                    />
                  ) : (
                    <CircleDot
                      size={16}
                      className={cn(
                        'absolute right-0 top-0 cursor-pointer text-muted-foreground',
                      )}
                    />
                  )}
                </CardTitle>
                <CardDescription className='text-center'>
                  {message.subject}
                </CardDescription>
              </CardHeader>
              <CardContent className='flex justify-between'>
                {message.message}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function Page() {
  const impersonatedUser = useAtomValue(impersonatedUserAtom)
  const { data: currentUser } = api.user.getCurrentUser.useQuery({
    id: impersonatedUser.id,
  })

  if (!currentUser) return null
  return <Messages currentUser={currentUser} />
}
