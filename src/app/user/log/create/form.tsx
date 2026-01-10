'use client'

import type { GetDailyLogById, GetUserById } from '@/types'

import { Card, CardContent } from '@/components/ui/card'

import { BloodGlucose } from './_field/blood-glucose'
import { ColdPlunge } from './_field/cold-plunge'
import { Hiit } from './_field/hiit'
import { ImageBox } from './_field/image-box'
import { ImageBoxBodyBuilder } from './_field/image-box-bodybuilder'
import { Liss } from './_field/liss'
import { Mobility } from './_field/mobility'
import { Nap } from './_field/nap'
import { Notes } from './_field/notes'
import { Posing } from './_field/posing'
import { Sauna } from './_field/sauna'
import { Sleep } from './_field/sleep'
import { SleepQuality } from './_field/sleep-quality'
import { Steps } from './_field/steps'
import { Weight } from './_field/weight'
import { WeightTraining } from './_field/weight-training'

import { cn } from '@/lib/utils'

export const dynamic = 'force-dynamic'

const DailyLogForm = ({
	todaysLog,
	prevLog,
	date,
	currentUser,
}: {
	todaysLog: GetDailyLogById | null
	prevLog: GetDailyLogById | null
	date?: string | null
	currentUser: GetUserById
}) => {
	const isBodyBuilderImages = currentUser.roles.find(
		(role) => role.name === 'body-builder-images',
	)
		? true
		: false

	const userName = currentUser.name?.replaceAll(' ', '-') ?? ''

	if (!todaysLog) return null

	return (
		<div className='flex relative flex-col gap-1 mt-0 mb-16'>
			<Card
				className={cn(
					'overflow-hidden relative gap-0 py-1 w-full h-full shadow-sm transition-all hover:shadow-md border-border/60',
				)}
			>
				<CardContent className='p-2'>
					<div className='grid grid-cols-2 gap-2 xl:grid-cols-2'>
						<Weight todaysLog={todaysLog} prevLog={prevLog} date={date} />
						{currentUser?.settings?.isBloodGlucose ? (
							<BloodGlucose
								todaysLog={todaysLog}
								prevLog={prevLog}
								date={date}
							/>
						) : null}
						{currentUser?.settings?.isSleep ? (
							<Sleep todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isSleepQuality ? (
							<SleepQuality
								todaysLog={todaysLog}
								prevLog={prevLog}
								date={date}
							/>
						) : null}
						{currentUser?.settings?.isNap ? (
							<Nap todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isSteps ? (
							<Steps todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isWeightTraining ? (
							<WeightTraining
								todaysLog={todaysLog}
								prevLog={prevLog}
								date={date}
							/>
						) : null}
						{currentUser?.settings?.isHiit ? (
							<Hiit todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isLiss ? (
							<Liss todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isMobility ? (
							<Mobility todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isPosing ? (
							<Posing todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isSauna ? (
							<Sauna todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isColdPlunge ? (
							<ColdPlunge todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
						{currentUser?.settings?.isNotes ? (
							<Notes todaysLog={todaysLog} prevLog={prevLog} date={date} />
						) : null}
					</div>
				</CardContent>
			</Card>
			<div className='grid grid-cols-3 gap-1 mt-2 w-full'>
				<ImageBox
					todaysLog={todaysLog}
					position='front'
					userName={userName}
					currentUser={currentUser}
				/>
				<ImageBox
					todaysLog={todaysLog}
					position='side'
					userName={userName}
					currentUser={currentUser}
				/>
				<ImageBox
					todaysLog={todaysLog}
					position='back'
					userName={userName}
					currentUser={currentUser}
				/>
				{isBodyBuilderImages ? (
					<>
						<ImageBoxBodyBuilder
							todaysLog={todaysLog}
							position='frontDouble'
							currentUser={currentUser}
						/>
						<ImageBoxBodyBuilder
							todaysLog={todaysLog}
							position='sideChest'
							currentUser={currentUser}
						/>
						<ImageBoxBodyBuilder
							todaysLog={todaysLog}
							position='sideTri'
							currentUser={currentUser}
						/>
						<ImageBoxBodyBuilder
							todaysLog={todaysLog}
							position='rearDouble'
							currentUser={currentUser}
						/>
						<ImageBoxBodyBuilder
							todaysLog={todaysLog}
							position='absThighs'
							currentUser={currentUser}
						/>
						<ImageBoxBodyBuilder
							todaysLog={todaysLog}
							position='frontVacum'
							currentUser={currentUser}
						/>
						<ImageBoxBodyBuilder
							todaysLog={todaysLog}
							position='favourite'
							currentUser={currentUser}
						/>
					</>
				) : null}
			</div>
		</div>
	)
}
export { DailyLogForm }
