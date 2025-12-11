'use client'

import { faker } from '@faker-js/faker'
import {
	KanbanBoard,
	KanbanCard,
	KanbanCards,
	KanbanHeader,
	KanbanProvider,
} from '@/components/kibo-ui/kanban'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CirclePlus, Trash } from 'lucide-react'

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

faker.seed(1)

const exampleColumns = [
	{ id: faker.string.uuid(), name: 'Planned', color: '#6B7280' },
	{ id: faker.string.uuid(), name: 'In Progress', color: '#F59E0B' },
	{ id: faker.string.uuid(), name: 'Done', color: '#10B981' },
]

const users = Array.from({ length: 4 })
	.fill(null)
	.map(() => ({
		id: faker.string.uuid(),
		name: faker.person.fullName(),
		image: faker.image.avatar(),
	}))

const exampleFeatures = Array.from({ length: 20 })
	.fill(null)
	.map(() => ({
		id: faker.string.uuid(),
		name: capitalize(faker.company.buzzPhrase()),
		startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
		endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
		column: faker.helpers.arrayElement(exampleColumns).id,
		owner: faker.helpers.arrayElement(users),
	}))

const dateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
})

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
	month: 'short',
	day: 'numeric',
})

const Kanban = () => {
	const [features, setFeatures] = useState(exampleFeatures)
	const [columns, setColumns] = useState(exampleColumns)

	return (
		<KanbanProvider
			columns={columns}
			data={features}
			onDataChange={setFeatures}
		>
			{(column) => (
				<KanbanBoard id={column.id} key={column.id}>
					<KanbanHeader>
						<div className='flex justify-between items-center'>
							<div className='flex gap-2 items-center'>
								<div
									className='w-2 h-2 rounded-full'
									style={{ backgroundColor: column.color }}
								/>
								<span>{column.name}</span>
							</div>
							{column.id === columns[columns.length - 1]?.id ? (
								<div className=''>
									<CirclePlus
										onClick={() => {
											console.log('clicked')
											const id = faker.string.uuid()
											setColumns([
												...columns,
												{
													id,
													name: capitalize(faker.company.buzzPhrase()),
													color: faker.color.rgb(),
												},
											])
										}}
										size={20}
									/>
								</div>
							) : null}
						</div>
					</KanbanHeader>
					<KanbanCards id={column.id}>
						{(feature: (typeof features)[number]) => (
							<KanbanCard
								column={column.id}
								id={feature.id}
								key={feature.id}
								name={feature.name}
							>
								<div className='flex gap-2 justify-between items-start'>
									<div className='flex flex-col gap-1'>
										<p className='flex-1 m-0 text-sm font-medium'>
											{feature.name}
										</p>
									</div>
									{feature.owner && (
										<Avatar className='w-4 h-4 shrink-0'>
											<AvatarImage src={feature.owner.image} />
											<AvatarFallback>
												{feature.owner.name?.slice(0, 2)}
											</AvatarFallback>
										</Avatar>
									)}
								</div>
								<div className='flex relative justify-between items-start w-full'>
									<p className='m-0 text-xs text-muted-foreground'>
										{shortDateFormatter.format(feature.startAt)} -{' '}
										{dateFormatter.format(feature.endAt)}
									</p>
									<div
										className='absolute top-0 right-0 p-1 cursor-pointer pointer-events-auto text-destructive z-9999'
										onMouseDown={(e) => {
											e.preventDefault()
											e.stopPropagation()
											console.log('clicked')
											setFeatures(features.filter((f) => f.id !== feature.id))
										}}
									>
										<Trash size={14} />
									</div>
								</div>
							</KanbanCard>
						)}
					</KanbanCards>
					<div className='flex justify-center items-center py-2 my-2 w-full transition-all active:scale-95 hover:text-primary/60'>
						<CirclePlus
							size={32}
							onClick={() => {
								console.log('clicked', column)
								const newFeature = {
									id: faker.string.uuid(),
									name: capitalize(faker.company.buzzPhrase()),
									startAt: faker.date.past({
										years: 0.5,
										refDate: new Date(),
									}),
									endAt: faker.date.future({
										years: 0.5,
										refDate: new Date(),
									}),
									column: column.id,
									owner: faker.helpers.arrayElement(users),
								}
								setFeatures([...features, newFeature])
							}}
						/>
					</div>
				</KanbanBoard>
			)}
		</KanbanProvider>
	)
}

export { Kanban }
