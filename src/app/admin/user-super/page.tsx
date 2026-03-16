'use client'

import { api } from '@/trpc/react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'

const UserSuperPage = () => {
	const ctx = api.useUtils()

	const { mutate: deleteShortFinishedPlans, isPending } =
		api.userPlan.deleteShortFinishedPlans.useMutation({
			onSuccess: ({ deletedCount }) => {
				toast.success(`Deleted ${deletedCount} finished user plans`)
				ctx.invalidate()
			},
			onError: (error) => {
				toast.error(error.message)
			},
		})

	return (
		<div className='flex flex-col gap-4 items-center mt-10'>
			<Button
				type='button'
				onClick={() => deleteShortFinishedPlans()}
				disabled={isPending}
			>
				{isPending ? 'Deleting short finished plans...' : 'Delete short finished plans'}
			</Button>
		</div>
	)
}

export default UserSuperPage
