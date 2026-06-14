'use client'

import { api } from '@/trpc/react'

import { compareItems, rankItem } from '@tanstack/match-sorter-utils'
import { ChevronsDown, ChevronsUp, FileText } from 'lucide-react'
import { useState } from 'react'

import {
	TreeExpander,
	TreeIcon,
	TreeLabel,
	TreeNode,
	TreeNodeContent,
	TreeNodeTrigger,
	TreeProvider,
	TreeView,
} from '@/components/kibo-ui/tree'

import { isAllPlansCreateUserAtom } from '@/atoms'
import { useAtom } from 'jotai'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

import type { GetAllPlansName } from '@/types'

const getCategoryName = (category: string | null) =>
	category?.trim().toLowerCase() || 'uncategorised'

const Tree = ({
	plans,
	onSetPlan,
	categorySearch,
	planSearch,
}: {
	plans: GetAllPlansName | undefined
	onSetPlan: (planId: number) => void
	categorySearch: string
	planSearch: string
}) => {
	const [treeExpandKey, setTreeExpandKey] = useState(0)
	const [defaultExpandedIds, setDefaultExpandedIds] = useState<string[]>([])

	if (!plans) return null

	const categoryQuery = categorySearch.trim()
	const planQuery = planSearch.trim()
	const sortedPlans = [...plans].sort((a, b) => {
		if (!a.updatedAt || !b.updatedAt) return 0
		return a.updatedAt > b.updatedAt ? -1 : 1
	})
	const plansByCategory = new Map<string, typeof sortedPlans>()
	for (const plan of sortedPlans) {
		const category = getCategoryName(plan.planCategory)
		const categoryPlans = plansByCategory.get(category)

		if (categoryPlans) {
			categoryPlans.push(plan)
		} else {
			plansByCategory.set(category, [plan])
		}
	}
	const categories = [
		'uncategorised',
		...Array.from(plansByCategory.keys()).filter(
			(category) => category !== 'uncategorised',
		),
	]
	const visibleCategories = categories.flatMap((category) => {
		if (categoryQuery) {
			const categoryRank = rankItem(category, categoryQuery)

			if (!categoryRank.passed) return []
		}

		const categoryPlans = plansByCategory.get(category) ?? []
		const filteredPlans = planQuery
			? categoryPlans
					.map((plan) => ({
						plan,
						rank: rankItem(plan.name, planQuery),
					}))
					.filter(({ rank }) => rank.passed)
					.sort((a, b) => compareItems(a.rank, b.rank))
					.map(({ plan }) => plan)
			: categoryPlans

		if (filteredPlans.length === 0) return []

		return [{ category, filteredPlans }]
	})
	const visibleCategoryIds = visibleCategories.map(({ category }) => category)

	return (
		<div>
			<div className='flex gap-1 justify-start mb-1'>
				<Button
					aria-label='Expand all plan categories'
					className='w-8 h-8'
					disabled={visibleCategoryIds.length === 0}
					onClick={() => {
						setDefaultExpandedIds(visibleCategoryIds)
						setTreeExpandKey((key) => key + 1)
					}}
					size='icon'
					type='button'
					variant='ghost'
				>
					<ChevronsDown className='w-4 h-4' />
				</Button>
				<Button
					aria-label='Collapse all plan categories'
					className='w-8 h-8'
					disabled={visibleCategoryIds.length === 0}
					onClick={() => {
						setDefaultExpandedIds([])
						setTreeExpandKey((key) => key + 1)
					}}
					size='icon'
					type='button'
					variant='ghost'
				>
					<ChevronsUp className='w-4 h-4' />
				</Button>
			</div>
			<TreeProvider defaultExpandedIds={defaultExpandedIds} key={treeExpandKey}>
				<TreeView>
					{visibleCategories.map(({ category, filteredPlans }) => (
						<TreeNode key={category} nodeId={category}>
							<TreeNodeTrigger>
								<TreeExpander hasChildren />
								<TreeIcon hasChildren />
								<TreeLabel className='capitalize'>{category}</TreeLabel>
							</TreeNodeTrigger>
							<TreeNodeContent hasChildren>
								{filteredPlans.map((plan) => (
									<TreeNode key={plan.id} level={1} nodeId={`plan-${plan.id}`}>
										<TreeNodeTrigger
											onMouseDown={(e) => {
												e.preventDefault()
												console.log('plan', plan)
												onSetPlan(plan.id)
											}}
										>
											<TreeExpander />
											<TreeIcon icon={<FileText className='w-4 h-4' />} />
											<TreeLabel>{plan.name}</TreeLabel>
										</TreeNodeTrigger>
									</TreeNode>
								))}
							</TreeNodeContent>
						</TreeNode>
					))}
				</TreeView>
			</TreeProvider>
		</div>
	)
}

const PlanTree = ({
	selectedPlan,
	onSetPlan,
	userId,
}: {
	selectedPlan: number
	onSetPlan: (planId: number) => void
	userId: string
}) => {
	const [isAll, setIsAll] = useAtom(isAllPlansCreateUserAtom)
	const [categorySearch, setCategorySearch] = useState('')
	const [planSearch, setPlanSearch] = useState('')

	const { data: allPlans } = api.plan.getAllName.useQuery()

	if (selectedPlan) return null
	return (
		<div>
			<div className='flex flex-wrap gap-2 items-center mb-2 w-full'>
				<div className='grid flex-1 grid-cols-2 gap-2 min-w-0'>
					<Input
						aria-label='Search plan categories'
						type='search'
						placeholder='Search categories'
						value={categorySearch}
						onChange={(event) => setCategorySearch(event.target.value)}
					/>
					<Input
						aria-label='Search plan names'
						type='search'
						placeholder='Search plans'
						value={planSearch}
						onChange={(event) => setPlanSearch(event.target.value)}
					/>
				</div>
				<div className='flex gap-1 items-center text-sm font-semibold shrink-0 text-muted-foreground/50'>
					<div className={cn(isAll ? '' : 'text-foreground')}>My Plans</div>
					<Switch
						onCheckedChange={setIsAll}
						checked={isAll}
						className='data-[state=unchecked]:bg-foreground data-[state=checked]:bg-foreground'
					/>
					<div className={cn(isAll ? 'text-foreground' : '')}>All Plans</div>
				</div>
			</div>
			<Tree
				plans={
					isAll
						? allPlans
						: allPlans?.filter((plan) => plan.creatorId === userId)
				}
				onSetPlan={onSetPlan}
				categorySearch={categorySearch}
				planSearch={planSearch}
			/>
		</div>
	)
}

const PlanFolders = ({
	selectedPlan,
	onSetPlan,
	userId,
}: {
	selectedPlan: number
	onSetPlan: (planId: number) => void
	userId: string | undefined | null
}) => {
	if (!userId) return null
	return (
		<PlanTree
			selectedPlan={selectedPlan}
			onSetPlan={onSetPlan}
			userId={userId}
		/>
	)
}

export { PlanFolders }
