'use client'

import { useState } from 'react'
import { api } from '@/trpc/react'

import { FileCode, FileJson, FileText } from 'lucide-react'

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
import { Switch } from '@/components/ui/switch'

import type { GetAllPlans } from '@/types'

const Tree = ({
	plans,
	onSetPlan,
}: {
	plans: GetAllPlans
	onSetPlan: (planId: string) => void
}) => {
	const categories = [
		'uncategorised',
		...new Set(
			plans
				.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
				.map((plan) => plan.planCategory?.toLowerCase()),
		),
	].filter((cat) => cat !== '')

	return (
		<TreeProvider>
			<TreeView>
				{categories.map((category) => {
					const filteredPlans =
						category === 'uncategorised'
							? plans.filter(
									(plan) =>
										plan.planCategory === '' || plan.planCategory === null,
								)
							: plans.filter(
									(plan) => plan.planCategory?.toLowerCase() === category,
								)

					return (
						<TreeNode key={category}>
							<TreeNodeTrigger>
								<TreeExpander hasChildren />
								<TreeIcon hasChildren />
								<TreeLabel className='capitalize'>{category}</TreeLabel>
							</TreeNodeTrigger>
							<TreeNodeContent hasChildren>
								{filteredPlans.map((plan) => (
									<TreeNode key={plan.id} level={1} nodeId='logo.svg'>
										<TreeNodeTrigger
											onMouseDown={(e) => {
												e.preventDefault()
												console.log('plan', plan)
												onSetPlan(plan.id.toString())
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
					)
				})}
			</TreeView>
		</TreeProvider>
	)
}

const PlanTree = ({
	selectedPlan,
	onSetPlan,
	userId,
}: {
	selectedPlan: string
	onSetPlan: (planId: string) => void
	userId: string
}) => {
	const [isAll, setIsAll] = useAtom(isAllPlansCreateUserAtom)

	const { data: allPlans } = api.plan.getAll.useQuery()
	const { data: myPlans, isLoading: isLoadingMyPlans } =
		api.plan.getAllMy.useQuery({ userId: userId })

	if (selectedPlan) return null
	if (isLoadingMyPlans) return null
	return (
		<div>
			<div className='flex gap-1 mb-2 w-full text-sm font-semibold text-muted-foreground/50'>
				<div className={cn(isAll ? '' : 'text-foreground')}>My Plans</div>
				<Switch
					onCheckedChange={setIsAll}
					checked={isAll}
					className='data-[state=unchecked]:bg-foreground data-[state=checked]:bg-foreground'
				/>
				<div className={cn(isAll ? 'text-foreground' : '')}>All Plans</div>
			</div>
			{/* @ts-ignore */}
			<Tree plans={isAll ? allPlans : myPlans} onSetPlan={onSetPlan} />
		</div>
	)
}

const PlanFolders = ({
	selectedPlan,
	onSetPlan,
	userId,
}: {
	selectedPlan: string
	onSetPlan: (planId: string) => void
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
