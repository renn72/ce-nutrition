'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
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
import { Switch } from '@/components/ui/switch'

const DefaultWater = ({ currentUser }: { currentUser: GetUserById }) => {
  const [water, setWater] = useState(
    Number(currentUser?.settings?.defaultWater),
  )
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateWater } = api.user.updateWater.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  return (
    <DialogWrapper
      title='Default Water'
      value={`${currentUser?.settings?.defaultWater}ml`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DialogHeader>
        <DialogTitle>Default Water</DialogTitle>
        <DialogDescription>Set the default amount of water.</DialogDescription>
      </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium'>
          <Input
            type='number'
            className='w-full'
            value={water}
            onChange={(e) => {
              setWater(Number(e.target.value))
            }}
          />
        </div>
        <Button
          disabled={isSaving}
          className='relative'
          onClick={() => {
            updateWater({
              water: water,
              id: Number(currentUser?.settings?.id),
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const FirstName = ({ currentUser }: { currentUser: GetUserById }) => {
  const [firstName, setFirstName] = useState(currentUser?.firstName ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateFirstName } = api.user.updateFirstName.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='First Name'
      value={currentUser?.firstName ?? ''}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DialogHeader>
        <DialogTitle>First Name</DialogTitle>
        <DialogDescription>Update your first name.</DialogDescription>
      </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium'>
          <Input
            type='text'
            className='w-full'
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving}
          className='relative'
          onClick={() => {
            updateFirstName({
              firstName: firstName,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const LastName = ({ currentUser }: { currentUser: GetUserById }) => {
  const [lastName, setLastName] = useState(currentUser?.lastName ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateLastName } = api.user.updateLastName.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='Last Name'
      value={currentUser?.lastName ?? ''}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DialogHeader>
        <DialogTitle>Last Name</DialogTitle>
        <DialogDescription>Update your last name.</DialogDescription>
      </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium'>
          <Input
            type='text'
            className='w-full'
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving}
          className='relative'
          onClick={() => {
            updateLastName({
              lastName: lastName,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const Email = ({ currentUser }: { currentUser: GetUserById }) => {
  const [email, setEmail] = useState(currentUser?.email ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updateEmail } = api.user.updateEmail.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='Email'
      value={currentUser?.email ?? ''}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DialogHeader>
        <DialogTitle>Email</DialogTitle>
        <DialogDescription>Update your email.</DialogDescription>
      </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium'>
          <Input
            type='text'
            className='w-full'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving}
          className='relative'
          onClick={() => {
            updateEmail({
              email: email,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const Password = ({ currentUser }: { currentUser: GetUserById }) => {
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const ctx = api.useUtils()
  const { mutate: updatePassword } = api.user.updatePassword.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onSettled: () => {
      ctx.user.invalidate()
      setIsOpen(false)
      setTimeout(() => {
        setIsSaving(false)
      }, 100)
    },
    onMutate: () => {
      setIsSaving(true)
    },
  })
  if (!currentUser) return null
  return (
    <DialogWrapper
      title='Password'
      value={'********'}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <DialogHeader>
        <DialogTitle>Password</DialogTitle>
        <DialogDescription>Update your password.</DialogDescription>
      </DialogHeader>
      <div className='flex flex-col gap-4 w-full'>
        <div className='text-sm text-muted-foreground font-medium flex gap-4 flex-col'>
          <Input
            type='password'
            placeholder='New Password'
            className='w-full'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <Input
            type='password'
            placeholder='Confirm Password'
            className='w-full'
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
            }}
          />
        </div>
        <Button
          disabled={isSaving || password !== passwordConfirm}
          className='relative'
          onClick={() => {
            if (password !== passwordConfirm) {
              toast.error('Passwords do not match')
              return
            }
            updatePassword({
              password: password,
              id: currentUser?.id,
            })
          }}
        >
          {isSaving ? (
            <RefreshCw
              className={cn('animate-spin')}
              size={20}
            />
          ) : (
            <span>Save</span>
          )}
        </Button>
      </div>
    </DialogWrapper>
  )
}

const DialogWrapper = ({
  children,
  title,
  value,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode
  title: string
  value: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
    >
      <DialogTrigger asChild>
        <div className='flex gap-6 items-center justify-between px-8 py-2 bg-secondary text-sm'>
          <div className='text-sm text-muted-foreground/80 font-medium'>
            {title}
          </div>
          <div className='text-sm text-muted-foreground font-semibold truncate'>
            {value}
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className='w-full max-w-lg'>{children}</DialogContent>
    </Dialog>
  )
}

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
          Tracks the time spent posing.
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
          Tracks the time spent on blood glucose.
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
          Tracks the time spent sleeping.
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
          Tracks the time spent sleeping.
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
          Tracks the time spent napping.
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
          Tracks the time spent weight training.
        </div>
      </div>
      <Switch
        checked={isWeightTraining === true}
        onCheckedChange={(checked) => {
          setIsWeightTraining(checked)
          updateIsWeightTraining({
            id: user.id,
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
          Tracks the time spent HIIT.
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
          Tracks the time spent LISS.
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
          Tracks the time spent taking notes.
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






const Settings = ({ currentUser }: { currentUser: GetUserById }) => {
  console.log('currentUser', currentUser)
  return (
    <div className='flex flex-col gap-4 w-full px-2'>
      <div className='flex gap-2 justify-between px-2 bg-secondary w-full py-2 items-end text-base font-semibold text-muted-foreground '>
        <div className='text-sm text-muted-foreground font-medium'>Profile</div>
      </div>
      <div className='flex flex-col gap-2 w-full px-4'>
        <FirstName currentUser={currentUser} />
        <LastName currentUser={currentUser} />
        <Email currentUser={currentUser} />
        <Password currentUser={currentUser} />
        <DefaultWater currentUser={currentUser} />
      </div>
      <div className='flex flex-col gap-2 w-full p-4 border rounded-lg'>
        <h2 className='text-base font-semibold'>Daily Log</h2>
        <Sleep currentUser={currentUser} />
        <SleepQuality currentUser={currentUser} />
        <Nap currentUser={currentUser} />
        <WeightTraining currentUser={currentUser} />
        <Hiit currentUser={currentUser} />
        <Liss currentUser={currentUser} />
        <BloodGlucose currentUser={currentUser} />
        <Posing currentUser={currentUser} />
        <Notes currentUser={currentUser} />
      </div>
    </div>
  )
}

export default function Home() {
  const { data: currentUser, isLoading } = api.user.getCurrentUser.useQuery()

  if (isLoading) return null
  if (!currentUser) return null

  return (
    <div className='w-full my-16'>
      <Settings currentUser={currentUser} />
    </div>
  )
}
