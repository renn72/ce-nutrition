'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useSearchParams } from 'next/navigation'

import type { GetUserById } from '@/types'
import { toast } from 'sonner'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Reminders } from './reminders'

export const dynamic = 'force-dynamic'

const Posing = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isPosing, setIsPosing] = useState(currentUser.settings.isPosing)

  const { mutate: updateIsPosing } = api.user.updateIsPosing.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Posing</Label>
        <div className='text-sm text-muted-foreground'>
          Enable posing tracking.
        </div>
      </div>
      <Switch
        checked={isPosing === true}
        onCheckedChange={(checked) => {
          setIsPosing(checked)
          updateIsPosing({
            id: currentUser.id,
            isPosing: checked,
          })
        }}
      />
    </div>
  )
}

const BloodGlucose = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isBloodGlucose, setIsBloodGlucose] = useState(currentUser.settings.isBloodGlucose)
  const { mutate: updateIsBloodGlucose } = api.user.updateIsBloodGlucose.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Blood Glucose</Label>
        <div className='text-sm text-muted-foreground'>
          Enable blood glucose tracking.
        </div>
      </div>
      <Switch
        checked={isBloodGlucose === true}
        onCheckedChange={(checked) => {
          setIsBloodGlucose(checked)
          updateIsBloodGlucose({
            id: currentUser.id,
            isBloodGlucose: checked,
          })
        }}
      />
    </div>
  )
}
const Sleep = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isSleep, setIsSleep] = useState(currentUser.settings.isSleep)
  const { mutate: updateIsSleep } = api.user.updateIsSleep.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Sleep</Label>
        <div className='text-sm text-muted-foreground'>
          Enable sleep tracking.
        </div>
      </div>
      <Switch
        checked={isSleep === true}
        onCheckedChange={(checked) => {
          setIsSleep(checked)
          updateIsSleep({
            id: currentUser.id,
            isSleep: checked,
          })
        }}
      />
    </div>
  )
}
const SleepQuality = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isSleepQuality, setIsSleepQuality] = useState(currentUser.settings.isSleepQuality)
  const { mutate: updateIsSleepQuality } = api.user.updateIsSleepQuality.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Sleep Quality</Label>
        <div className='text-sm text-muted-foreground'>
          Enable sleep quality tracking.
        </div>
      </div>
      <Switch
        checked={isSleepQuality === true}
        onCheckedChange={(checked) => {
          setIsSleepQuality(checked)
          updateIsSleepQuality({
            id: currentUser.id,
            isSleepQuality: checked,
          })
        }}
      />
    </div>
  )
}
const Nap = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isNap, setIsNap] = useState(currentUser.settings.isNap)
  const { mutate: updateIsNap } = api.user.updateIsNap.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Nap</Label>
        <div className='text-sm text-muted-foreground'>
          Enable nap tracking.
        </div>
      </div>
      <Switch
        checked={isNap === true}
        onCheckedChange={(checked) => {
          setIsNap(checked)
          updateIsNap({
            id: currentUser.id,
            isNap: checked,
          })
        }}
      />
    </div>
  )
}
const WeightTraining = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isWeightTraining, setIsWeightTraining] = useState(currentUser.settings.isWeightTraining)
  const { mutate: updateIsWeightTraining } = api.user.updateIsWeightTraining.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Weight Training</Label>
        <div className='text-sm text-muted-foreground'>
          Enable weight training tracking.
        </div>
      </div>
      <Switch
        checked={isWeightTraining === true}
        onCheckedChange={(checked) => {
          setIsWeightTraining(checked)
          updateIsWeightTraining({
            id: currentUser.id,
            isWeightTraining: checked,
          })
        }}
      />
    </div>
  )
}
const Hiit = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isHiit, setIsHiit] = useState(currentUser.settings.isHiit)
  const { mutate: updateIsHiit } = api.user.updateIsHiit.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>HIIT</Label>
        <div className='text-sm text-muted-foreground'>
          Enable high intensity interval training tracking.
        </div>
      </div>
      <Switch
        checked={isHiit === true}
        onCheckedChange={(checked) => {
          setIsHiit(checked)
          updateIsHiit({
            id: currentUser.id,
            isHiit: checked,
          })
        }}
      />
    </div>
  )
}
const Liss = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isLiss, setIsLiss] = useState(currentUser.settings.isLiss)
  const { mutate: updateIsLiss } = api.user.updateIsLiss.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>LISS</Label>
        <div className='text-sm text-muted-foreground'>
          Enable low intensity steady state cardio tracking.
        </div>
      </div>
      <Switch
        checked={isLiss === true}
        onCheckedChange={(checked) => {
          setIsLiss(checked)
          updateIsLiss({
            id: currentUser.id,
            isLiss: checked,
          })
        }}
      />
    </div>
  )
}
const Notes = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isNote, setIsNote] = useState(currentUser.settings.isNotes)
  const { mutate: updateIsNote } = api.user.updateIsNote.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Notes</Label>
        <div className='text-sm text-muted-foreground'>
          Enables the you to take notes.
        </div>
      </div>
      <Switch
        checked={isNote === true}
        onCheckedChange={(checked) => {
          setIsNote(checked)
          updateIsNote({
            id: currentUser.id,
            isNote: checked,
          })
        }}
      />
    </div>
  )
}

const Supplements = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isCreateMeals, setIsCreateMeals] = useState<boolean>(!!currentUser.roles.find((role) => role.name === 'supplements'))
  const { mutate: updateRoleCreateMeals } = api.user.updateRoleSupplements.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Supplements</Label>
        <div className='text-sm text-muted-foreground'>
          Enables the client to log supplements.
        </div>
      </div>
      <Switch
        checked={isCreateMeals === true}
        onCheckedChange={(checked) => {
          setIsCreateMeals(checked)
          updateRoleCreateMeals({
            userId: currentUser.id,
          })
        }}
      />
    </div>
  )
}

const CreateMeals = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isCreateMeals, setIsCreateMeals] = useState<boolean>(!!currentUser.roles.find((role) => role.name === 'create-meals'))
  const { mutate: updateRoleCreateMeals } = api.user.updateRoleCreateMeals.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Create Meals</Label>
        <div className='text-sm text-muted-foreground'>
          Enables the client to create meals.
        </div>
      </div>
      <Switch
        checked={isCreateMeals === true}
        onCheckedChange={(checked) => {
          setIsCreateMeals(checked)
          updateRoleCreateMeals({
            userId: currentUser.id,
          })
        }}
      />
    </div>
  )
}

const BodyBuilderImages = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isBodyBuilderImages, setIsBodyBuilderImages] = useState<boolean>(!!currentUser.roles.find((role) => role.name === 'body-builder-images'))
  const { mutate: updateRoleBodyBuilderImages } = api.user.updateRoleBodyBuilderImages.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Body Builder Images</Label>
        <div className='text-sm text-muted-foreground'>
          Enables the full suite of body builder images in the Daily Log.
        </div>
      </div>
      <Switch
        checked={isBodyBuilderImages === true}
        onCheckedChange={(checked) => {
          setIsBodyBuilderImages(checked)
          updateRoleBodyBuilderImages({
            userId: currentUser.id,
          })
        }}
      />
    </div>
  )
}

const NotifyTrainerFrontImage = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isImages, setIsImages] = useState<boolean>(!!currentUser.roles.find((role) => role.name === 'notify-trainer-front-image'))
  const { mutate: updateRoleNotifyFrontImage } = api.user.updateRoleNotifyFrontImage.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>Front Pose</Label>
        <div className='text-sm text-muted-foreground'>
          Notify trainer when the frone pose image is uploaded.
        </div>
      </div>
      <Switch
        checked={isImages === true}
        onCheckedChange={(checked) => {
          setIsImages(checked)
          updateRoleNotifyFrontImage({
            userId: currentUser.id,
          })
        }}
      />
    </div>
  )
}
const NotifyTrainerAllImages = ({ currentUser }: { currentUser: GetUserById }) => {
  const ctx = api.useUtils()
  const [isImages, setIsImages] = useState<boolean>(!!currentUser.roles.find((role) => role.name === 'notify-trainer-all-images'))
  const { mutate: updateRoleNotifyTrainerAllImages } = api.user.updateRoleNotifyTrainerAllImages.useMutation({
    onSuccess: () => {
      toast.success('Updated')
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
    onError: (err) => {
      toast.error('error')
      ctx.user.invalidate()
    },
  })
  return (
    <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
      <div className='space-y-0.5'>
        <Label>All Images</Label>
        <div className='text-sm text-muted-foreground'>
          Notify trainer when each image is uploaded.
        </div>
      </div>
      <Switch
        checked={isImages === true}
        onCheckedChange={(checked) => {
          setIsImages(checked)
          updateRoleNotifyTrainerAllImages({
            userId: currentUser.id,
          })
        }}
      />
    </div>
  )
}

const Settings = ({ user }: { user: GetUserById }) => {

  return (
    <div className='flex flex-col gap-2 items-center w-full mt-10 mb-40'>
      <h2
        className='text-xl font-semibold'
      > User Settings</h2>
      <div className='flex flex-col gap-2 w-full p-4 border rounded-lg max-w-lg'>
        <h2 className='text-base font-semibold'>Notifications</h2>
        <NotifyTrainerAllImages currentUser={user} />
        <NotifyTrainerFrontImage currentUser={user} />
      </div>
      <div className='flex flex-col gap-2 w-full p-4 border rounded-lg max-w-lg'>
        <h2 className='text-base font-semibold'>Plans</h2>
        <CreateMeals currentUser={user} />
        <Supplements currentUser={user} />
      </div>
      <div className='flex flex-col gap-2 w-full p-4 border rounded-lg max-w-lg'>
        <h2 className='text-base font-semibold'>Daily Log</h2>
        <BodyBuilderImages currentUser={user} />
        <Sleep currentUser={user} />
        <SleepQuality currentUser={user} />
        <Nap currentUser={user} />
        <WeightTraining currentUser={user} />
        <Hiit currentUser={user} />
        <Liss currentUser={user} />
        <BloodGlucose currentUser={user} />
        <Posing currentUser={user} />
        <Notes currentUser={user} />
      </div>
      <Reminders user={user} />
    </div>
  )
}

const User = ({ userId }: { userId: string }) => {
  const { data: currentUser } = api.user.get.useQuery(userId)

  if (!currentUser) return null

  return <Settings user={currentUser} />
}

export default function Home() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  if (
    userId === '' ||
    userId === undefined ||
    userId === null ||
    userId === 'null'
  )
    return <div>Select a user</div>

  return <User userId={userId} />
}
