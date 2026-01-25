'use client'

import { useAtom } from 'jotai'

import { isAllRecipesAtom } from '@/atoms'

import { api } from '@/trpc/react'

import { cn } from '@/lib/utils'

import { DataTable } from '@/components/recipe/data-table'
import { DataTableSkeleton } from '@/components/table/data-table-skeleton'

import { Switch } from '@/components/ui/switch'

const LoadTable = ({ userId }: { userId: string }) => {
	const { data: allRecipes } = api.recipe.getAll.useQuery()
	const { data: myRecipes, isLoading } = api.recipe.getAllUserCreated.useQuery({
		userId: userId,
	})

	const [isAll, setIsAll] = useAtom(isAllRecipesAtom)

	return (
		<div className='flex flex-col items-center px-2 w-full min-h-screen'>
			{isLoading ? (
				<DataTableSkeleton
					className='max-w-screen-2xl'
					columnCount={6}
					rowCount={20}
				/>
			) : (
				<div className='py-6 max-w-screen-2xl min-w-screen-xl'>
					<div className='flex gap-1 mb-2 w-full text-sm font-semibold text-muted-foreground/50'>
						<div className={cn(isAll ? '' : 'text-foreground')}>My Recipes</div>
						<Switch
							onCheckedChange={setIsAll}
							checked={isAll}
							className='data-[state=unchecked]:bg-foreground data-[state=checked]:bg-foreground'
						/>
						<div className={cn(isAll ? 'text-foreground' : '')}>
							All Recipes
						</div>
					</div>
					{isAll ? (
						<>
							{allRecipes ? (
								<DataTable
									recipe={allRecipes.filter((recipe) => !recipe.hiddenAt)}
								/>
							) : null}
						</>
					) : (
						<>
							{myRecipes ? (
								<DataTable
									recipe={myRecipes.filter((recipe) => !recipe.hiddenAt)}
								/>
							) : null}
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default function Home() {
	const { data: user } = api.user.isUser.useQuery()
	if (!user) return null
	return <LoadTable userId={user.id} />
}
