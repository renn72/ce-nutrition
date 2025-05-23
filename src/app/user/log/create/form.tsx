'use client'

import { api } from '@/trpc/react'

import { UploadButton } from '@/lib/uploadthing'
import type { GetDailyLogById, GetUserById } from '@/types'
import { Cog, Image, Settings } from 'lucide-react'
import { Link } from 'next-view-transitions'

import { Button } from '@/components/ui/button'

import { Camera } from '@/components/camera/camera'

import { BloodGlucose } from './_field/blood-glucose'
import { ColdPlunge } from './_field/cold-plunge'
import { Hiit } from './_field/hiit'
import { ImageBox } from './_field/image-box'
import { Liss } from './_field/liss'
import { Nap } from './_field/nap'
import { Notes } from './_field/notes'
import { Posing } from './_field/posing'
import { Sauna } from './_field/sauna'
import { Sleep } from './_field/sleep'
import { SleepQuality } from './_field/sleep-quality'
import { Steps } from './_field/steps'
import { Weight } from './_field/weight'
import { WeightTraining } from './_field/weight-training'

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
	const ctx = api.useUtils()
	const todaysLogDate = new Date(date ?? '')
	const { mutate: updateImage } = api.dailyLog.updateImage.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})

	const onUpdateImage = (url: string) => {
		updateImage({
			date: todaysLogDate.toDateString(),
			image: url,
		})
	}

  if (!todaysLog) return null

	return (
		<div className='flex flex-col gap-3 px-1 relative mt-2'>
			<Link
				href='/user/settings#settings-water-defaults'
				className='absolute -top-8 right-8'
			>
				<Settings size={24} className='cursor-pointer' />
			</Link>
			<div className='flex gap-2 w-full justify-around flex-wrap'>
				<Weight todaysLog={todaysLog} prevLog={prevLog} date={date} />
				{currentUser?.settings?.isBloodGlucose ? (
					<BloodGlucose todaysLog={todaysLog} prevLog={prevLog} date={date} />
				) : null}
				{currentUser?.settings?.isSleep ? (
					<Sleep todaysLog={todaysLog} prevLog={prevLog} date={date} />
				) : null}
				{currentUser?.settings?.isSleepQuality ? (
					<SleepQuality todaysLog={todaysLog} prevLog={prevLog} date={date} />
				) : null}
				{currentUser?.settings?.isNap ? (
					<Nap todaysLog={todaysLog} prevLog={prevLog} date={date} />
				) : null}
				{currentUser?.settings?.isSteps ? (
					<Steps todaysLog={todaysLog} prevLog={prevLog} date={date} />
				) : null}
				{currentUser?.settings?.isWeightTraining ? (
					<WeightTraining todaysLog={todaysLog} prevLog={prevLog} date={date} />
				) : null}
				{currentUser?.settings?.isHiit ? (
					<Hiit todaysLog={todaysLog} prevLog={prevLog} date={date} />
				) : null}
				{currentUser?.settings?.isLiss ? (
					<Liss todaysLog={todaysLog} prevLog={prevLog} date={date} />
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
			<div className='grid grid-cols-3 gap-1 w-full'>
				<ImageBox
					todaysLog={todaysLog}
					position='front'
				/>
				<ImageBox
					todaysLog={todaysLog}
					position='side'
				/>
				<ImageBox
					todaysLog={todaysLog}
					position='back'
				/>
			</div>
		</div>
	)
}
export { DailyLogForm }
