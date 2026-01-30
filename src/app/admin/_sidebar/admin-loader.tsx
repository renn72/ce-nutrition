import { api } from '@/trpc/react'

const BBLoader = ({ userId }: { userId: string }) => {
	const _d = api.dailyLog.getAllUser.useQuery(userId || '')
	return <div />
}

const AdminLoader = ({ userId }: { userId: string }) => {
	const _recipes = api.recipe.getAllUserCreated.useQuery({
		userId: userId,
	})
	const _plans = api.plan.getAllMy.useQuery({
		userId: userId,
	})
	const { data: yourUsers, isLoading } = api.user.getAllYour.useQuery()

	const bbUsers = yourUsers
		?.filter((user) => {
			return user.category?.find((category) => category.categoryId === 3)
		})
		?.sort((a, b) => a.name?.localeCompare(b.name ?? '') ?? 0)

	return (
		<>
			{bbUsers?.map((user) => (
				<BBLoader userId={user.id} key={user.id} />
			))}
		</>
	)
}

export { AdminLoader }
