'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import type { GetUserById } from '@/types'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

import { toast } from 'sonner'

const Supplements = ({ currentUser }: { currentUser: GetUserById }) => {
	const [isOpen, setIsOpen] = useState(true)
	const [checked, setChecked] = useState(false)

	const ctx = api.useUtils()
	const { mutate } = api.user.updateRoleSupplementDisclaimer.useMutation({
		onSuccess: () => {
			ctx.user.invalidate()
      setTimeout(() => {
			  setIsOpen(false)
        toast.success('disclaimer accepted')
      }, 200)
		},
	})

	if (!currentUser.roles.find((r) => r.name === 'supplements')) return null
	if (currentUser.roles.find((r) => r.name === 'supplement_disclaimer_v1'))
		return null

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className='hidden'>Open</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Supplement Disclaimer</DialogTitle>
					<DialogDescription>
						I acknowledge that any food, beveridge, supplement, compound or
						medication recommendations provided are for informational purposes
						only. I understand it is my sole responsibility to determine the
						safety, personal suitability, and legality of any product. I release
						Competitive Edge Nutrition professionals, including representing
						contractors from all liability relating to the use or misuse of any
						item mentioned.
					</DialogDescription>
					<div className='h-2' />
					<div className='border p-4 flex flex-col gap-2 items-center rounded-md bg-secondary'>
						<Label>I understand and agree to the above terms</Label>
						<Checkbox
							className='bg-secondary'
							checked={checked}
							onCheckedChange={(e) => {
								setChecked(e === true)
								mutate({ userId: currentUser.id })
							}}
						/>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export { Supplements }
