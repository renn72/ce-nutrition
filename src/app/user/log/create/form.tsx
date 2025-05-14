'use client'

import { api } from '@/trpc/react'

import { UploadButton } from '@/lib/uploadthing'
import type { GetDailyLogById, GetUserById } from '@/types'
import { Cog, Image, Settings } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Camera } from '@/components/camera/camera'

import { BloodGlucose } from './_field/blood-glucose'
import { Hiit } from './_field/hiit'
import { Liss } from './_field/liss'
import { Nap } from './_field/nap'
import { Notes } from './_field/notes'
import { Posing } from './_field/posing'
import { Sleep } from './_field/sleep'
import { SleepQuality } from './_field/sleep-quality'
import { Steps } from './_field/steps'
import { Weight } from './_field/weight'
import { WeightTraining } from './_field/weight-training'
import { Sauna } from './_field/sauna'
import { ColdPlunge } from './_field/cold-plunge'
import { Link } from 'next-view-transitions'

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

  return (
    <div className='flex flex-col gap-3 px-1 relative mt-2'>
      <Link
        href='/user/settings#settings-water-defaults'
        className='absolute -top-8 right-8'>
        <Settings
          size={24}
          className='cursor-pointer'
        />
      </Link>
      <div className='flex gap-2 w-full justify-around flex-wrap'>
        <Weight
          todaysLog={todaysLog}
          prevLog={prevLog}
          date={date}
        />
        {currentUser?.settings?.isBloodGlucose ? (
          <BloodGlucose
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isSleep ? (
          <Sleep
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isSleepQuality ? (
          <SleepQuality
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isNap ? (
          <Nap
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isSteps ? (
          <Steps
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isWeightTraining ? (
          <WeightTraining
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isHiit ? (
          <Hiit
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isLiss ? (
          <Liss
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isPosing ? (
          <Posing
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isSauna ? (
          <Sauna
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isColdPlunge ? (
          <ColdPlunge
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
        {currentUser?.settings?.isNotes ? (
          <Notes
            todaysLog={todaysLog}
            prevLog={prevLog}
            date={date}
          />
        ) : null}
      </div>
      {todaysLog?.image === '' ||
      todaysLog?.image === undefined ||
      todaysLog?.image === null ? (
        <div className='flex gap-4 flex-col w-full items-center'>
          <Image
            className='text-muted-foreground'
            size={64}
            strokeWidth={1}
          />
          <div className='flex gap-4 justify-around w-full'>
            <UploadButton
              appearance={{
                button: {
                  background: 'hsl(var(--secondary))',
                  color: 'hsl(var(--secondary-foreground))',
                  fontSize: '14px',
                  fontWeight: '550',
                },
              }}
              endpoint='imageUploader'
              onClientUploadComplete={(res) => {
                console.log('onClientUploadComplete', res)
                const url = res?.[0]?.url
                onUpdateImage(url ?? '')
              }}
            />
            <Camera onUpload={onUpdateImage} />
          </div>
        </div>
      ) : (
        <div className='flex gap-4 flex-col '>
          <div className='flex gap-2 items-center justify-around w-full'>
            <img
              src={todaysLog?.image ?? ''}
              alt='img'
              className='w-full h-full'
            />
          </div>
          <Button
            variant='secondary'
            onClick={() => {}}
          >
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}
export { DailyLogForm }
