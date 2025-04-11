'use client'

import { api } from '@/trpc/react'

import { UploadButton } from '@/lib/uploadthing'
import { GetDailyLogById, GetUserById } from '@/types'
import { Image } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Camera } from '@/components/camera/camera'

import { Notes } from './_field/notes'
import { BloodGlucose } from './_field/blood-glucose'
import { Weight } from './_field/weight'

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
    <div className='flex flex-col gap-3 px-4'>
      <div className='flex gap-4 w-full justify-around flex-wrap'>
        <Weight todaysLog={todaysLog} prevLog={prevLog} date={date} />
        {
          currentUser?.settings?.isBloodGlucose ? <BloodGlucose todaysLog={todaysLog} prevLog={prevLog} date={date} /> : null
        }
        <Notes todaysLog={todaysLog} prevLog={prevLog} date={date} />
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
