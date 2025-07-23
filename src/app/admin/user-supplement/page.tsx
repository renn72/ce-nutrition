'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import type { GetUserById } from '@/types'

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

export const dynamic = 'force-dynamic'

const Supps = ({ user }: { user: GetUserById }) => {
	const [suppTimes, setSuppTimes] = useState(() => {
		const timings = user.supplementStacks
			.map((stack) => {
				return stack.time
			})
			.filter((item, pos, self) => self.indexOf(item) === pos)
		if (timings.length === 0) return ['day']
		return timings
	})

	const [isOpen, setIsOpen] = useState(false)
  const [isError, setIsError] = useState(false)
	const [timgingInput, setTimgingInput] = useState('')

  const handleAdd = () => {
    if (timgingInput === '') return
    if (suppTimes.includes(timgingInput)) return setIsError(true)
    setSuppTimes([...suppTimes, timgingInput])
    setTimgingInput('')
    setIsError(false)
    setIsOpen(false)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

	console.log(suppTimes)
	return (
		<div className='flex flex-col gap-4 items-center '>
			{suppTimes.map((time) => {
				return <div key={time}>{time}</div>
			})}
			<Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
				<DialogTrigger asChild>
					<Button>Add</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Another Time</DialogTitle>
						<DialogDescription/>
					</DialogHeader>
            <Input
              placeholder='Enter time'
              value={timgingInput}
              onChange={(e) => setTimgingInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
            />
          {
            isError && (
              <div className='text-red-500 text-sm'>
                Time already exists
              </div>
            )
          }
            <Button
              onClick={handleAdd}
            >
              Add
            </Button>
				</DialogContent>
			</Dialog>
		</div>
	)
}

const UserSupps = ({ userId }: { userId: string }) => {
	const { data: user } = api.user.get.useQuery(userId || '')
	if (!user) return null
	return (
		<div className='p-4'>
			<Supps user={user} />
		</div>
	)
}

export default function Home() {
	const searchParams = useSearchParams()
	const userId = searchParams.get('user')

	if (
		userId === '' ||
		userId === undefined ||
		userId === null ||
		userId === 'null'
	)
		return <div>Select a user</div>

	return <UserSupps userId={userId} />
}
