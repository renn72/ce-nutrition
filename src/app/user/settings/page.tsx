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
						<RefreshCw className={cn('animate-spin')} size={20} />
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
						<RefreshCw className={cn('animate-spin')} size={20} />
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
						<RefreshCw className={cn('animate-spin')} size={20} />
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
      id='settings-user-email'
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
						<RefreshCw className={cn('animate-spin')} size={20} />
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
						<RefreshCw className={cn('animate-spin')} size={20} />
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
				<div className='flex gap-6 items-center justify-between px-3 py-2 text-sm border rounded-lg'>
					<div className='text-sm text-muted-foreground font-medium'>
						{title}
					</div>
					<div className='text-sm font-semibold truncate'>{value}</div>
				</div>
			</DialogTrigger>
			<DialogContent className='w-full max-w-lg'>{children}</DialogContent>
		</Dialog>
	)
}

const DailyLogToggleWrapper = ({
	children,
	title,
	description,
}: {
	children: React.ReactNode
	title: string
	description: string
}) => {
	return (
		<div className='flex flex-row items-center justify-between rounded-lg border py-2 px-2 gap-2 shadow-sm'>
			<div className='space-y-0.2'>
				<Label>{title}</Label>
				<div className='text-sm text-muted-foreground'>{description}</div>
			</div>
			{children}
		</div>
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
		<DailyLogToggleWrapper title='Posing' description='Enable posing tracking.'>
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
		</DailyLogToggleWrapper>
	)
}

const BloodGlucose = ({ currentUser }: { currentUser: GetUserById }) => {
	const ctx = api.useUtils()
	const [isBloodGlucose, setIsBloodGlucose] = useState(
		currentUser.settings.isBloodGlucose,
	)
	const { mutate: updateIsBloodGlucose } =
		api.user.updateIsBloodGlucose.useMutation({
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
		<DailyLogToggleWrapper
			title='Blood Glucose'
			description='Enable blood glucose tracking.'
		>
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
		</DailyLogToggleWrapper>
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
		<DailyLogToggleWrapper title='Sleep' description='Enable sleep tracking.'>
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
		</DailyLogToggleWrapper>
	)
}
const SleepQuality = ({ currentUser }: { currentUser: GetUserById }) => {
	const ctx = api.useUtils()
	const [isSleepQuality, setIsSleepQuality] = useState(
		currentUser.settings.isSleepQuality,
	)
	const { mutate: updateIsSleepQuality } =
		api.user.updateIsSleepQuality.useMutation({
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
		<DailyLogToggleWrapper
			title='Sleep Quality'
			description='Enable sleep quality tracking.'
		>
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
		</DailyLogToggleWrapper>
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
		<DailyLogToggleWrapper title='Nap' description='Enable nap tracking.'>
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
		</DailyLogToggleWrapper>
	)
}
const WeightTraining = ({ currentUser }: { currentUser: GetUserById }) => {
	const ctx = api.useUtils()
	const [isWeightTraining, setIsWeightTraining] = useState(
		currentUser.settings.isWeightTraining,
	)
	const { mutate: updateIsWeightTraining } =
		api.user.updateIsWeightTraining.useMutation({
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
		<DailyLogToggleWrapper
			title='Weight Training'
			description='Enable weight training tracking.'
		>
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
		</DailyLogToggleWrapper>
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
		<DailyLogToggleWrapper
			title='HIIT'
			description='Enable high intensity interval training tracking.'
		>
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
		</DailyLogToggleWrapper>
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
		<DailyLogToggleWrapper
			title='LISS'
			description='Enable low intensity steady state cardio tracking.'
		>
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
		</DailyLogToggleWrapper>
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
		<DailyLogToggleWrapper
			title='Notes'
			description='Enables the you to take notes.'
		>
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
		</DailyLogToggleWrapper>
	)
}
const Sauna = ({ currentUser }: { currentUser: GetUserById }) => {
	const ctx = api.useUtils()
	const [isSauna, setIsSauna] = useState(currentUser.settings.isSauna)
	const { mutate: updateIsSauna } = api.user.updateIsSauna.useMutation({
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
		<DailyLogToggleWrapper title='Sauna' description='Enable sauna tracking.'>
			<Switch
				checked={isSauna === true}
				onCheckedChange={(checked) => {
					setIsSauna(checked)
					updateIsSauna({
						id: currentUser.id,
						isSauna: checked,
					})
				}}
			/>
		</DailyLogToggleWrapper>
	)
}
const ColdPlunge = ({ currentUser }: { currentUser: GetUserById }) => {
	const ctx = api.useUtils()
	const [isColdPlunge, setIsColdPlunge] = useState(
		currentUser.settings.isColdPlunge,
	)
	const { mutate: updateIsColdPlunge } =
		api.user.updateIsColdPlunge.useMutation({
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
		<DailyLogToggleWrapper
			title='Cold Plunge'
			description='Enable cold plunge tracking.'
		>
			<Switch
				checked={isColdPlunge === true}
				onCheckedChange={(checked) => {
					setIsColdPlunge(checked)
					updateIsColdPlunge({
						id: currentUser.id,
						isColdPlunge: checked,
					})
				}}
			/>
		</DailyLogToggleWrapper>
	)
}
const Steps = ({ currentUser }: { currentUser: GetUserById }) => {
	const ctx = api.useUtils()
	const [isSteps, setIsSteps] = useState(currentUser.settings.isSteps)
	const { mutate: updateIsSteps } = api.user.updateIsSteps.useMutation({
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
		<DailyLogToggleWrapper title='Steps' description='Enable steps tracking.'>
			<Switch
				checked={isSteps === true}
				onCheckedChange={(checked) => {
					setIsSteps(checked)
					updateIsSteps({
						id: currentUser.id,
						isSteps: checked,
					})
				}}
			/>
		</DailyLogToggleWrapper>
	)
}

const Settings = ({ currentUser }: { currentUser: GetUserById }) => {
	console.log('currentUser', currentUser)
	return (
		<div className='flex flex-col gap-4 w-full px-2'>
			<div className='text-lg font-bold'>Settings</div>
			<div className='flex flex-col gap-2 w-full p-4 border rounded-lg'>
				<h2 className='text-base font-semibold'>Profile</h2>
				<FirstName currentUser={currentUser} />
				<LastName currentUser={currentUser} />
				<Email currentUser={currentUser} />
				<Password currentUser={currentUser} />
			</div>
			<div
				id='settings-water-defaults'
				className='flex flex-col gap-2 w-full p-4 border rounded-lg'
			>
				<h2 className='text-base font-semibold'>Defaults</h2>
				<DefaultWater currentUser={currentUser} />
			</div>
			<div className='flex flex-col gap-1 w-full p-4 border rounded-lg'>
				<h2 className='text-base font-semibold' id='daily-log-settings'>
					Daily Log
				</h2>
				<Sleep currentUser={currentUser} />
				<SleepQuality currentUser={currentUser} />
				<Nap currentUser={currentUser} />
				<Steps currentUser={currentUser} />
				<WeightTraining currentUser={currentUser} />
				<Hiit currentUser={currentUser} />
				<Liss currentUser={currentUser} />
				<Sauna currentUser={currentUser} />
				<ColdPlunge currentUser={currentUser} />
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
