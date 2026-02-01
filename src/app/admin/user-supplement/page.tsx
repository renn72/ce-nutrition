'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { GetUserById } from '@/types'
import { CircleX, LockIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { VirtualizedCombobox } from '@/components/ui/virtualized-combobox-supps'

export const dynamic = 'force-dynamic'

const SuppTimes = ({ user, time }: { user: GetUserById; time: string }) => {
	const ctx = api.useUtils()
	const [isOpen, setIsOpen] = useState(false)
	const [selected, setSelected] = useState<string | null>(null)
	const [unit, setUnit] = useState<string>('')
	const [size, setSize] = useState<number>(1)

	const { data: currentUser, isLoading: currentUserLoading } =
		api.user.getCurrentUserRoles.useQuery()

	const { data: supplements } = api.supplement.getAll.useQuery()

	const { mutate: addSuppl } = api.supplement.addToUser.useMutation({
		onSuccess: () => {
			ctx.user.invalidate()
			setIsOpen(false)
		},
	})

	const { mutate: deleteSuppl } = api.supplement.deleteFromUser.useMutation({
		onSuccess: () => {
			ctx.user.invalidate()
		},
	})

	const { mutate: deleteTime } = api.supplement.deleteTime.useMutation({
		onSuccess: () => {
			ctx.user.invalidate()
		},
	})

	const handleAdd = () => {
		if (selected && size && unit) {
			addSuppl({
				suppId: Number(selected),
				userId: user.id,
				time: time,
				size: size.toString(),
				unit: unit,
			})
		}
	}

	if (currentUserLoading) return null
	if (!currentUser) return null

	return (
		<Card className='min-w-[400px]'>
			<CardHeader>
				<CardTitle className='capitalize'>{time}</CardTitle>
				<CardDescription>Supplements</CardDescription>
				<CardAction>
					<CircleX
						className='transition-transform cursor-pointer hover:scale-110 active:scale-90 shrink-0 hover:text-foreground'
						onClick={(e) => {
							e.preventDefault()
							const timeId = user.supplementStacks.find(
								(stack) => stack.time === time,
							)?.id
							if (!timeId) return
							deleteTime({
								id: timeId,
							})
						}}
					/>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div
					className={cn(
						'flex flex-col divide-y divide-border',
						user.supplementStacks.find((stack) => stack.time === time)
							?.supplements.length === 0
							? ''
							: 'border-t border-b',
					)}
				>
					{user.supplementStacks
						.find((stack) => stack.time === time)
						?.supplements.map((supp) => {
							if (
								supp.supplement.isPrivate &&
								supp.supplement.userId !== currentUser.id
							)
								return null
							return (
								<div
									key={supp.id}
									className='grid grid-cols-6 gap-2 items-center py-1 px-2 text-sm'
								>
									<div className='flex col-span-3 items-center truncate'>
										<span className='flex-grow'>{supp.supplement?.name}</span>
										{supp.supplement.isPrivate ? (
											<LockIcon size={10} className='text-red-500' />
										) : null}
									</div>
									<div className='place-self-end'>{supp.size}</div>
									<div className='place-self-start'>{supp.unit}</div>
									<CircleX
										size={20}
										strokeWidth={2}
										className='place-self-end transition-transform cursor-pointer hover:scale-110 active:scale-90 text-muted-foreground shrink-0 hover:text-foreground'
										onClick={(e) => {
											e.preventDefault()
											if (!supp.supplementStackId) return
											if (!supp.supplementId) return

											deleteSuppl({
												suppId: supp.supplementId,
												suppStackId: supp.supplementStackId,
											})
										}}
									/>
								</div>
							)
						})}
				</div>
			</CardContent>
			<CardFooter>
				{supplements && supplements.length > 0 ? (
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogTrigger asChild>
							<Button variant='outline'>Add Supp</Button>
						</DialogTrigger>
						<DialogContent className='flex flex-col gap-4 items-center'>
							<DialogHeader>
								<DialogTitle>Add Supplement</DialogTitle>
								<DialogDescription />
							</DialogHeader>
							<VirtualizedCombobox
								width='400px'
								height='600px'
								options={supplements
									?.sort((a, b) => {
										if (a.favouriteAt) return -1
										if (b.favouriteAt) return 1
										return 0
									})
									?.map((i) => {
										return {
											value: i.id.toString(),
											label: i.name ?? '',
											unit: i.serveUnit ?? '',
											isPrivate: i.isPrivate ?? false,
										}
									})}
								selectedOption={selected ?? ''}
								onSelectOption={(value) => {
									setSelected(value)
									const unit = supplements?.find(
										(i) => i.id === Number(value),
									)?.serveUnit
									if (!unit) return
									setUnit(unit)
									const amount = supplements?.find(
										(i) => i.id === Number(value),
									)?.serveSize
									if (!amount) return
									setSize(Number(amount))
								}}
							/>
							<div className='flex gap-2 items-center'>
								<Input
									placeholder='Size'
									type='number'
									value={size}
									onChange={(e) => {
										setSize(Number(e.target.value))
									}}
								/>
								<Input
									placeholder='Unit'
									type='text'
									value={unit}
									onChange={(e) => {
										setUnit(e.target.value)
									}}
								/>
							</div>
							<Button
								onClick={(e) => {
									e.preventDefault()
									handleAdd()
								}}
							>
								Add
							</Button>
						</DialogContent>
					</Dialog>
				) : null}
			</CardFooter>
		</Card>
	)
}

const Supps = ({ user }: { user: GetUserById }) => {
	const ctx = api.useUtils()
	const [isOpen, setIsOpen] = useState(false)
	const [isError, setIsError] = useState(false)
	const [timgingInput, setTimgingInput] = useState('')

	const suppTimes = user.supplementStacks
		.map((stack) => {
			return stack.time
		})
		.filter((item, pos, self) => self.indexOf(item) === pos)

	const { mutate: addTime } = api.supplement.addTime.useMutation({
		onSuccess: () => {
			ctx.user.invalidate()
		},
	})

	const handleAdd = () => {
		if (timgingInput === '') return
		if (suppTimes.includes(timgingInput)) return setIsError(true)
		addTime({
			time: timgingInput,
			userId: user.id,
		})

		setTimgingInput('')
		setIsError(false)
		setIsOpen(false)
	}

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleAdd()
		}
	}

	return (
		<div className='flex flex-col gap-4 items-center'>
			{suppTimes.length === 0 ? (
				<Card className='min-w-[400px]'>
					<CardHeader>
						<CardTitle className='capitalize' />
						<CardDescription />
					</CardHeader>
					<CardContent className='flex flex-col items-center pb-6 text-muted-foreground'>
						-- Empty --
					</CardContent>
				</Card>
			) : null}
			{suppTimes.map((time) => {
				return time ? <SuppTimes key={time} user={user} time={time} /> : null
			})}
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogTrigger asChild>
					<Button variant='secondary'>Add Supplement Stack</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Add Another Time</DialogTitle>
						<DialogDescription />
					</DialogHeader>
					<Input
						placeholder='Enter time'
						value={timgingInput}
						onChange={(e) => setTimgingInput(e.target.value)}
						onKeyDown={handleInputKeyDown}
					/>
					{isError && (
						<div className='text-sm text-red-500'>Time already exists</div>
					)}
					<Button onClick={handleAdd}>Add</Button>
				</DialogContent>
			</Dialog>
		</div>
	)
}

const UserSupps = ({ userId }: { userId: string }) => {
	const { data: user } = api.user.get.useQuery(userId || '')
	if (!user) return null
	console.log('user', user)
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
