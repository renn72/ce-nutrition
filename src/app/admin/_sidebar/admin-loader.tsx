import { api } from '@/trpc/react'

const AdminLoader = ({ userId }: { userId: string }) => {
	if (userId === '') return null
	// const _recipes = api.recipe.getAllUserCreated.useQuery({
	// 	userId: userId,
	// })
	// const _plans = api.plan.getAllMy.useQuery({
	// 	userId: userId,
	// })
	// const { data: yourUsers } = api.user.getAllYour.useQuery()
	//
	// const bbUsers = yourUsers
	// 	?.filter((user) => {
	// 		return user.category?.find((category) => category.categoryId === 3)
	// 	})
	// 	?.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0)

	return null
}

export { AdminLoader }
