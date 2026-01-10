'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import Image from 'next/image'

import { UploadButton } from '@/lib/uploadthing'
import type { GetDailyLogById, GetUserById } from '@/types'
import { File, Loader2, XSquare } from 'lucide-react'
import { ImageIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { Camera } from '@/components/camera/camera'

const titlesMap = {
	frontDouble: 'Front Dbl Biceps',
	sideChest: 'Side Chest',
	sideTri: 'Side Triceps',
	rearDouble: 'Rear Dbl Biceps',
	absThighs: 'Abs & Thighs',
	frontVacum: 'Front Vacum',
	favourite: 'Favourite Pose',
}

const ImageTake = ({
	todaysLog,
	position,
	currentUser,
	isNotifyTrainer,
}: {
	todaysLog: GetDailyLogById
	position:
		| 'frontDouble'
		| 'sideChest'
		| 'sideTri'
		| 'rearDouble'
		| 'absThighs'
		| 'frontVacum'
		| 'favourite'
	currentUser: GetUserById
	isNotifyTrainer: boolean
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const ctx = api.useUtils()
	const title = titlesMap[position]
	const { mutate: updateImage } =
		api.dailyLog.updateBodyBuilderImage.useMutation({
			onSettled: () => {
				ctx.user.invalidate()
			},
		})

	const onUpdateImage = (url: string) => {
		if (!todaysLog) return
		updateImage({
			date: todaysLog.date,
			userId: currentUser.id,
			image: url,
			name: position,
			isNotifyTrainer: isNotifyTrainer,
		})
	}

	if (isUploading) {
		return (
			<div className='flex relative flex-col gap-4 justify-center items-center px-2 w-full h-56 rounded-md border shadow-md'>
				<Loader2 size={36} className='animate-spin text-primary/70' />
			</div>
		)
	}

	return (
		<div className='flex relative flex-col gap-4 justify-between items-center px-2 w-full h-56 rounded-md border shadow-md'>
			<ImageIcon
				className='text-muted-foreground/20 absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2'
				size={80}
				weight='thin'
			/>
			<h2 className='mt-4 font-semibold tracking-wider text-center uppercase text-[12px] text-muted-foreground'>
				{title}
			</h2>
			<div className='flex gap-4 justify-around mb-1 w-full'>
				<Camera onUpload={onUpdateImage} />
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button variant='outline' size='icon' className='rounded-full'>
							<File size={20} className='shrink-0' />
						</Button>
					</DialogTrigger>
					<DialogContent forceMount>
						<DialogHeader>
							<DialogTitle>Upload Image File</DialogTitle>
							<DialogDescription className=''>
								Upload an image file to use as the {title} image.
							</DialogDescription>
						</DialogHeader>
						<UploadButton
							appearance={{
								button: {
									background: 'hsl(var(--secondary))',
									color: 'hsl(var(--secondary-foreground))',
									fontSize: '14px',
									fontWeight: '500',
								},
							}}
							endpoint='imageUploader'
							onUploadBegin={() => {
								setIsUploading(true)
								setIsOpen(false)
							}}
							onUploadError={() => {
								setIsUploading(false)
								toast.error('error')
							}}
							onBeforeUploadBegin={(files) => {
								setIsUploading(true)
								return files
							}}
							onClientUploadComplete={(res) => {
								console.log('onClientUploadComplete', res)
								const url = res?.[0]?.url
								if (!url) {
									toast.error('error')
									return
								}
								onUpdateImage(url)
								setIsOpen(false)
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

const ImageBoxBodyBuilder = ({
	todaysLog,
	position,
	currentUser,
}: {
	todaysLog: GetDailyLogById
	position:
		| 'frontDouble'
		| 'sideChest'
		| 'sideTri'
		| 'rearDouble'
		| 'absThighs'
		| 'frontVacum'
		| 'favourite'
	currentUser: GetUserById
}) => {
	let isNotifyTrainer = currentUser.roles.find(
		(role) => role.name === 'notify-trainer-all-images',
	)
		? true
		: false
	const [isOpen, setIsOpen] = useState(false)
	const ctx = api.useUtils()
	const title = titlesMap[position]

	const { mutate: updateImage } =
		api.dailyLog.updateBodyBuilderImage.useMutation({
			onSettled: () => {
				ctx.user.invalidate()
			},
		})

	const image = currentUser?.images?.find(
		(image) => image.name === position && image.date === todaysLog?.date,
	)?.image

	const onDeleteImage = () => {
		if (!todaysLog) return
		updateImage({
			date: todaysLog.date,
			userId: currentUser.id,
			image: '',
			name: position,
			isNotifyTrainer: false,
		})
	}

	return (
		<div>
			{image === '' || image === undefined || image === null ? (
				<ImageTake
					todaysLog={todaysLog}
					position={position}
					currentUser={currentUser}
					isNotifyTrainer={isNotifyTrainer}
				/>
			) : (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<div className='flex relative flex-col gap-4 h-56 rounded-md'>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<div
										onClick={(e) => {
											e.stopPropagation()
										}}
										className='absolute top-1 right-1 rounded-sm p-[1px] bg-white/20'
									>
										<XSquare size={16} strokeWidth={1} className='black' />
									</div>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This will delete the image from the log.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel
											onClick={(e) => {
												e.stopPropagation()
											}}
										>
											Cancel
										</AlertDialogCancel>
										<AlertDialogAction
											onClick={(e) => {
												e.stopPropagation()
												onDeleteImage()
											}}
										>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>

							<Image
								src={image}
								alt='img'
								width={128}
								height={224}
								className='object-cover w-full h-full rounded-md'
							/>
						</div>
					</DialogTrigger>
					<DialogContent
						onOpenAutoFocus={(e) => e.preventDefault()}
						className='py-0 px-0 rounded-md border-none shadow-lg bg-background/10'
					>
						<div className='absolute -top-10 right-1/2 font-bold text-center translate-x-1/2 text-white/80'>
							{titlesMap[position]}
						</div>
						<DialogHeader className='hidden'>
							<DialogTitle />
							<DialogDescription />
						</DialogHeader>
						<Image
							src={image}
							alt='img'
							width={128}
							height={224}
							className='object-cover w-full h-full rounded-md'
						/>
					</DialogContent>
				</Dialog>
			)}
		</div>
	)
}

export { ImageBoxBodyBuilder }
