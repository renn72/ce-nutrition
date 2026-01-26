'use client'
import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { GetPlanById } from '@/types'
import { Loader2 } from 'lucide-react'

interface DataTableRowActionsProps<TData> {
	row: Row<TData>
}

export function DataTableRowActions<TData>({
	row,
}: DataTableRowActionsProps<TData>) {
	const [isOpen, setIsOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const ctx = api.useUtils()
	const router = useRouter()
	const { mutate: deletePlan } = api.plan.delete.useMutation({
		onSettled: () => {
			ctx.plan.invalidate()
			toast.success('Deleted successfully')
		},
	})
	const { mutate: updatePlanCategory } =
		api.plan.updatePlanCategory.useMutation({
			onSettled: () => {
				ctx.plan.invalidate()
				setTimeout(() => {
					setIsLoading(false)
					setIsOpen(false)
				}, 500)
			},
			onMutate: () => {
				setIsLoading(true)
			},
		})
	const data = row.original as GetPlanById
	const [category, setCategory] = useState(data?.planCategory || '')
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='ghost'
						className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
					>
						<DotsHorizontalIcon className='w-4 h-4' />
						<span className='sr-only'>Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent forceMount align='end' className='w-[160px]'>
					<DropdownMenuItem onSelect={() => setIsOpen(true)}>
						Edit Category
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onSelect={() => router.push(`/admin/plan/edit?plan=${data?.id}`)}
					>
						Edit
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem
						onSelect={() => deletePlan({ id: row.getValue('id') })}
					>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent
					forceMount
					onOpenAutoFocus={(e) => {
						e.preventDefault()
					}}
				>
					<DialogHeader>
						<DialogTitle>Set Category</DialogTitle>
						<DialogDescription />
					</DialogHeader>
					<Input
						value={category}
						onChange={(e) => {
							setCategory(e.target.value)
						}}
					/>
					<div className='flex justify-between w-full'>
						<Button
							onMouseDown={() => {
								updatePlanCategory({
									id: Number(row.getValue('id')),
									planCategory: category,
								})
							}}
							variant='outline'
							disabled={isLoading}
						>
							{isLoading ? <Loader2 className='animate-spin' /> : 'Save'}
						</Button>
						<Button
							variant='outline'
							disabled={isLoading}
							onMouseDown={() => {
								setIsOpen(false)
							}}
						>
							Cancel
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}
