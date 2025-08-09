'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { SquarePen, SquareX } from 'lucide-react'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible'
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

const FormUserCatagories = () => {
	const [isOpen, setIsOpen] = useState(false)
	const ctx = api.useUtils()

	const [userCatId, setUserCatId] = useState(-1)
	const [userCatName, setUserCatName] = useState('')

	const { data: userCategories } = api.userCatagories.getAll.useQuery()

	const { mutate: createUserCatagory } = api.userCatagories.create.useMutation({
		onSuccess: () => {
			ctx.userCatagories.invalidate()
			toast.success('User catagory added successfully')
			setUserCatId(-1)
			setUserCatName('')
		},
	})

	const { mutate: updateUserCatagory } = api.userCatagories.update.useMutation({
		onSuccess: () => {
			ctx.userCatagories.invalidate()
			toast.success('User catagory updated successfully')
			setUserCatId(-1)
			setUserCatName('')
		},
	})

	const { mutate: deleteUserCatagory } = api.userCatagories.delete.useMutation({
		onSuccess: () => {
			ctx.userCatagories.invalidate()
			toast.success('User catagory deleted successfully')
			setUserCatId(-1)
			setUserCatName('')
		},
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline' size='sm'>
					Catagories
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>User Catagories</DialogTitle>
				</DialogHeader>
				<DialogDescription />

				{userCategories?.length === 0 ? (
					<div className=' text-sm text-muted-foreground'>nill ...</div>
				) : (
					<div className='flex flex-col gap-4 mb-4'>
						{userCategories?.map((userCatagory) => (
							<div
								key={userCatagory.id}
								className={cn(
									'flex gap-4 items-center w-full rounded-sm shadow-sm bg-secondary text-secondary-foreground justify-between',
									'px-4 py-2',
								)}
							>
								<span>{userCatagory.name}</span>
								<span className='flex gap-4'>
									<SquarePen
										size={20}
										className='cursor-pointer hover:text-primary active:scale-110 transition-transform'
										onClick={() => {
											setUserCatId(userCatagory.id)
											setUserCatName(userCatagory.name ?? '')
											setIsOpen(true)
										}}
									/>
									<AlertDialog>
										<AlertDialogTrigger asChild>
											<SquareX
												size={20}
												className='cursor-pointer hover:text-primary active:scale-110 transition-transform'
											/>
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you absolutely sure?
												</AlertDialogTitle>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
                            onClick={() => {
                              deleteUserCatagory(userCatagory.id)
                            }}
                          >Delete</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</span>
							</div>
						))}
					</div>
				)}
				<Collapsible open={isOpen} onOpenChange={setIsOpen}>
					<CollapsibleTrigger asChild>
						<div
							className={cn(
								'flex w-full justify-center',
								isOpen ? 'hidden' : '',
							)}
						>
							<Button variant='outline' size='sm'>
								Add
							</Button>
						</div>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<div className='flex gap-4 items-center'>
							<Input
								placeholder='Name'
								value={userCatName}
								onChange={(event) => setUserCatName(event.target.value)}
								className='h-8 w-[150px] lg:w-[250px]'
							/>
							<Button
								variant='outline'
								size='sm'
								onClick={() => {
                  if (userCatName === '') return
                  if (userCatId !== -1) {
                    updateUserCatagory({
                      id: userCatId,
                      name: userCatName,
                    })
                    setUserCatName('')
                    setIsOpen(false)
                  } else {
                    createUserCatagory(userCatName)
                    setUserCatName('')
                    setIsOpen(false)
                  }
								}}
							>
								Save
							</Button>
							<Button
								variant='outline'
								size='sm'
								onClick={() => {
									setUserCatName('')
									setIsOpen(false)
								}}
							>
								Cancel
							</Button>
						</div>
					</CollapsibleContent>
				</Collapsible>
			</DialogContent>
		</Dialog>
	)
}

export { FormUserCatagories }
