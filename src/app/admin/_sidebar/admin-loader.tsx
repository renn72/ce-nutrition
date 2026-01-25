import { api } from '@/trpc/react'

const AdminLoader = ({ userId }: { userId: string }) => {
	const _recipes = api.recipe.getAllUserCreated.useQuery({
		userId: userId,
	})
	const _plans = api.plan.getAllMy.useQuery({
		userId: userId,
	})
	return null
}

export { AdminLoader }
