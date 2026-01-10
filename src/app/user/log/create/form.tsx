'use client'

import { api } from '@/trpc/react'

import type { GetDailyLogById, GetUserById } from '@/types'
import { CircleParking, Settings } from 'lucide-react'
import { Link } from 'next-view-transitions'

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

import { PeriodIcon } from '@/components/period-icon'
import { OvulationIcon } from '@/components/ovulation-icon'
import { cn } from '@/lib/utils'

import { getPeriodStatusDays } from '@/lib/period'

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

	const ctx = api.useUtils()
	const { mutate: updateIsPeriod } = api.dailyLog.updateIsPeriod.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})
	const { mutate: updateIsOvulation } =
		api.dailyLog.updateIsOvulation.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	const userName = currentUser.name?.replaceAll(' ', '-') ?? ''

	const isPeriodEnabled = currentUser.settings?.isPeriodOvulaion ?? false

	const isPeriod = todaysLog?.isPeriod ?? false
	const isOvulation = todaysLog?.isOvulation ?? false

	const ovulaionStartAt = currentUser.settings?.ovulaionStartAt ?? new Date()
	const start = currentUser.settings?.periodStartAt ?? new Date()
	const interval = currentUser.settings?.periodInterval ?? 28
	const duration = currentUser.settings?.periodLength ?? 5
	const today = new Date(date ?? Date.now())

	const periodStatus = getPeriodStatusDays(today, start, interval, duration)
	const ovulationStatus = getPeriodStatusDays(
		today,
		ovulaionStartAt,
		interval,
		1,
	)

	console.log({ periodStatus, isPeriod })

	if (!todaysLog) return null

	return (
		<div className='flex relative flex-col gap-1 px-1 mt-0 mb-16'>
			<div className='flex justify-between items-center px-6 w-full'>
				<div className='flex gap-2 items-center'>
					<div>
						<div
							onClick={() => {
								updateIsPeriod({
									date: todaysLog.date,
									isPeriod: !isPeriod,
								})
							}}
							className={cn(
								'text-muted-foreground/10 flex gap-0 items-center',
								isPeriodEnabled ? '' : 'hidden',
							)}
						>
							<PeriodIcon
								color={isPeriod ? '#E11D48' : '#88888855'}
								size={36}
							/>
							<p
								className={cn(
									'mt-1 text-[0.7rem] hidden ml-2',
									periodStatus === -1 ? 'block text-muted-foreground' : '',
									isPeriod ? 'hidden' : '',
								)}
							>
								tomorrow
							</p>
						</div>
					</div>
					<div>
						<div
							onClick={() => {
								updateIsOvulation({
									date: todaysLog.date,
									isOvulation: !isOvulation,
								})
							}}
							className={cn(
								'text-muted-foreground/10 flex gap-0 items-center',
								isPeriodEnabled ? '' : 'hidden',
							)}
						>
							<OvulationIcon
								color={isOvulation ? '#8B5CF6' : '#88888855'}
								size={36}
							/>
							<p
								className={cn(
									'mt-1 text-[0.7rem] hidden ml-2',
									ovulationStatus === -1 ? 'block text-muted-foreground' : '',
									isPeriod ? 'hidden' : '',
								)}
							>
								tomorrow
							</p>
						</div>
					</div>
				</div>
				<Link href='/user/settings#settings-water-defaults'>
					<Settings size={24} className='cursor-pointer' />
				</Link>
			</div>
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
