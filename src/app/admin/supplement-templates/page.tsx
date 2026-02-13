'use client'

import { api } from '@/trpc/react'
import { useState } from 'react'
import { Plus, Trash2, UserPlus, LockIcon, CircleX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
	CardAction,
} from '@/components/ui/card'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { VirtualizedCombobox as SuppCombobox } from '@/components/ui/virtualized-combobox-supps'
import { VirtualizedCombobox as UserCombobox } from '@/components/ui/virtualized-combobox'
import { cn } from '@/lib/utils'

export default function SupplementTemplatesPage() {
	const ctx = api.useUtils()
	const { data: templates, isLoading } =
		api.supplement.getAllTemplates.useQuery()
	const { data: supplements } = api.supplement.getAll.useQuery()
	const { data: users } = api.user.getAllYour.useQuery()

	const [isCreateOpen, setIsCreateOpen] = useState(false)
	const [newTemplate, setNewTemplate] = useState({ name: '', time: '' })

	const { mutate: createTemplate } = api.supplement.createTemplate.useMutation({
		onSuccess: () => {
			ctx.supplement.getAllTemplates.invalidate()
			setIsCreateOpen(false)
			setNewTemplate({ name: '', time: '' })
		},
	})

	const { mutate: deleteTemplate } = api.supplement.deleteTime.useMutation({
		onSuccess: () => {
			ctx.supplement.getAllTemplates.invalidate()
		},
	})

	if (isLoading) return <div className='p-8'>Loading...</div>

	return (
		<div className='flex flex-col gap-6 p-8 mx-auto max-w-screen-xl'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Supplement Templates</h1>
				<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
					<DialogTrigger asChild>
						<Button>
							<Plus className='mr-2 w-4 h-4' /> New Template
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create Supplement Template</DialogTitle>
							<DialogDescription>
								Create a template that can be assigned to multiple users.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<div className='grid gap-2'>
								<Label htmlFor='name'>Template Name</Label>
								<Input
									id='name'
									value={newTemplate.name}
									onChange={(e) =>
										setNewTemplate({ ...newTemplate, name: e.target.value })
									}
									placeholder='e.g. Morning Routine'
								/>
							</div>
						</div>
						<Button
							disabled={!newTemplate.name || newTemplate.name === ''}
							onClick={() =>
								createTemplate({
									name: newTemplate.name,
									time: newTemplate.name,
								})
							}
						>
							Create
						</Button>
					</DialogContent>
				</Dialog>
			</div>

			<div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
				{templates?.map((template) => (
					<TemplateCard
						key={template.id}
						template={template}
						supplements={supplements || []}
						users={users || []}
					/>
				))}
			</div>
		</div>
	)
}

function TemplateCard({
	template,
	supplements,
	users,
}: {
	template: any
	supplements: any[]
	users: any[]
}) {
	const ctx = api.useUtils()
	const [isAddSuppOpen, setIsAddSuppOpen] = useState(false)
	const [isAssignOpen, setIsAssignOpen] = useState(false)

	const [selectedSupp, setSelectedSupp] = useState('')
	const [suppAmount, setSuppAmount] = useState(1)
	const [suppUnit, setSuppUnit] = useState('')

	const [selectedUser, setSelectedUser] = useState('')

	const { mutate: addSupp } =
		api.supplement.addSupplementToTemplate.useMutation({
			onSuccess: () => {
				ctx.supplement.getAllTemplates.invalidate()
				setIsAddSuppOpen(false)
				setSelectedSupp('')
			},
		})

	const { mutate: deleteSupp } = api.supplement.deleteFromUser.useMutation({
		onSuccess: () => {
			ctx.supplement.getAllTemplates.invalidate()
		},
	})

	const { mutate: assignTemplate } =
		api.supplement.applyTemplateToUser.useMutation({
			onSuccess: () => {
				setIsAssignOpen(false)
				setSelectedUser('')
			},
		})

	const { mutate: deleteTemplate } = api.supplement.deleteTime.useMutation({
		onSuccess: () => {
			ctx.supplement.getAllTemplates.invalidate()
		},
	})

	return (
		<Card className='flex flex-col'>
			<CardHeader>
				<div className='flex justify-between items-start'>
					<div>
						<CardTitle>{template.name}</CardTitle>
						<CardDescription>{template.time}</CardDescription>
					</div>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => {
							if (confirm('Are you sure you want to delete this template?')) {
								deleteTemplate({ id: template.id })
							}
						}}
					>
						<Trash2 className='w-4 h-4 text-destructive' />
					</Button>
				</div>
			</CardHeader>
			<CardContent className='flex-grow'>
				<div className='flex flex-col border-t border-b divide-y divide-border'>
					{template.supplements.length === 0 && (
						<div className='py-4 text-sm text-center text-muted-foreground'>
							No supplements added
						</div>
					)}
					{template.supplements.map((supp: any) => (
						<div
							key={supp.id}
							className='grid grid-cols-6 gap-2 items-center py-1 px-2 text-sm'
						>
							<div className='flex col-span-3 items-center truncate'>
								<span className='flex-grow'>{supp.supplement?.name}</span>
							</div>
							<div className='place-self-end'>{supp.size}</div>
							<div className='place-self-start ml-1'>{supp.unit}</div>
							<CircleX
								size={18}
								className='place-self-end cursor-pointer text-muted-foreground hover:text-foreground'
								onClick={() =>
									deleteSupp({
										suppId: supp.supplementId,
										suppStackId: template.id,
									})
								}
							/>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className='flex gap-2'>
				<Dialog open={isAddSuppOpen} onOpenChange={setIsAddSuppOpen}>
					<DialogTrigger asChild>
						<Button variant='outline' size='sm' className='flex-grow'>
							<Plus className='mr-1 w-4 h-4' /> Add Supp
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add Supplement to Template</DialogTitle>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<SuppCombobox
								width='100%'
								options={supplements.map((s) => ({
									value: s.id.toString(),
									label: s.name || '',
									unit: s.serveUnit || '',
									size: s.serveSize || '',
									isPrivate: s.isPrivate || false,
								}))}
								selectedOption={selectedSupp}
								onSelectOption={(val) => {
									setSelectedSupp(val)
									const s = supplements.find(
										(supp) => supp.id.toString() === val,
									)
									if (s) {
										setSuppAmount(Number(s.serveSize))
										setSuppUnit(s.serveUnit || '')
									}
								}}
							/>
							<div className='flex gap-2'>
								<Input
									type='number'
									value={suppAmount}
									onChange={(e) => setSuppAmount(Number(e.target.value))}
									placeholder='Amount'
								/>
								<Input
									value={suppUnit}
									onChange={(e) => setSuppUnit(e.target.value)}
									placeholder='Unit'
								/>
							</div>
							<Button
								onClick={() =>
									addSupp({
										stackId: template.id,
										suppId: Number(selectedSupp),
										size: suppAmount.toString(),
										unit: suppUnit,
									})
								}
							>
								Add
							</Button>
						</div>
					</DialogContent>
				</Dialog>

				<Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
					<DialogTrigger asChild>
						<Button variant='secondary' size='sm' className='flex-grow'>
							<UserPlus className='mr-1 w-4 h-4' /> Assign
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Assign Template to User</DialogTitle>
							<DialogDescription>
								This will copy all supplements from this template to the user's
								supplement stack at {template.time}.
							</DialogDescription>
						</DialogHeader>
						<div className='grid gap-4 py-4'>
							<UserCombobox
								width='100%'
								options={users.map((u) => ({
									value: u.id,
									label: u.name || u.email || 'Unknown',
								}))}
								selectedOption={selectedUser}
								onSelectOption={setSelectedUser}
								searchPlaceholder='Select user...'
							/>
							<Button
								onClick={() =>
									assignTemplate({
										templateId: template.id,
										userId: selectedUser,
									})
								}
							>
								Assign Template
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</CardFooter>
		</Card>
	)
}
