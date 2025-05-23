'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import Image from 'next/image'

import { UploadButton } from '@/lib/uploadthing'
import type { GetDailyLogById, GetUserById } from '@/types'
import { File, ImageIcon, XSquare } from 'lucide-react'
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
	const [isOpen, setIsOpen] = useState(false)
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
    })
	}

	return (
		<div className='flex gap-4 flex-col w-full items-center justify-between rounded-md shadow-sm border-2 border-dashed border-gray-300 px-2 h-56 relative'>
			<ImageIcon
				className='text-muted-foreground absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2'
				size={64}
				strokeWidth={1}
			/>
			<h2 className='text-center text-base font-semibold'>{title}</h2>
			<div className='flex gap-4 justify-around w-full mb-1'>
				<Camera onUpload={onUpdateImage} />
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button variant='secondary' className='h-10 w-10'>
							<File size={20} className='shrink-0' />
						</Button>
					</DialogTrigger>
					<DialogContent>
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
	const [isOpen, setIsOpen] = useState(false)
	const ctx = api.useUtils()
	const title = titlesMap[position]

	console.log('currentUser', currentUser)

	const image = currentUser?.images?.find(
		(image) => image.name === position,
	)?.image

	const onDeleteImage = () => {
		if (!todaysLog) return
	}

	return (
		<div>
			{image === '' || image === undefined || image === null ? (
				<ImageTake
					todaysLog={todaysLog}
					position={position}
					currentUser={currentUser}
				/>
			) : (
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<div className='flex gap-4 flex-col h-56 rounded-md relative '>
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<div
										onClick={(e) => {
											e.stopPropagation()
										}}
										className='absolute top-1 right-1 p-[1px] bg-white/20 rounded-sm'
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
								className='object-cover h-full w-full rounded-md'
							/>
						</div>
					</DialogTrigger>
					<DialogContent
						onOpenAutoFocus={(e) => e.preventDefault()}
						className='px-0 py-0 bg-background/10 border-none rounded-md shadow-lg'
					>
						<DialogHeader className='hidden'>
							<DialogTitle />
							<DialogDescription />
						</DialogHeader>
						<Image
							src={image}
							alt='img'
							width={128}
							height={224}
							className='object-cover h-full w-full rounded-md'
						/>
					</DialogContent>
				</Dialog>
			)}
		</div>
	)
}

export { ImageBoxBodyBuilder }
