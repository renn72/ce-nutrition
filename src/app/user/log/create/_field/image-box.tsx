'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import Image from 'next/image'

import { UploadButton } from '@/lib/uploadthing'
import type { GetDailyLogById } from '@/types'
import { File, ImageIcon, XSquare } from 'lucide-react'

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
	front: 'Front',
	side: 'Side',
	back: 'Back',
}

const ImageTake = ({
	todaysLog,
	position,
}: {
	todaysLog: GetDailyLogById
	position: 'front' | 'side' | 'back'
}) => {
	const ctx = api.useUtils()
	const { mutate: updateFrontImage } =
		api.dailyLog.updateFrontImage.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	const { mutate: updateSideImage } = api.dailyLog.updateSideImage.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})

	const { mutate: updateBackImage } = api.dailyLog.updateBackImage.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})
	const title = titlesMap[position]

	const onUpdateImage = (url: string) => {
		if (!todaysLog) return

		if (position === 'front') {
			updateFrontImage({
				logId: todaysLog.id,
				image: url,
			})
		}
		if (position === 'side') {
			updateSideImage({
				logId: todaysLog.id,
				image: url,
			})
		}
		if (position === 'back') {
			updateBackImage({
				logId: todaysLog.id,
				image: url,
			})
		}
	}

	return (
		<div className='flex gap-4 flex-col w-full items-center justify-between rounded-md shadow-sm border-2 border-dashed border-gray-300 px-2 h-56 relative'>
			<ImageIcon
				className='text-muted-foreground absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2'
				size={64}
				strokeWidth={1}
			/>
			<h2 className='text-center text-base font-semibold'>{title}</h2>
			<div className='flex gap-4 justify-around w-full'>
				<Camera onUpload={onUpdateImage} />
				<UploadButton
					appearance={{
						button: {
							background: 'hsl(var(--secondary))',
							color: 'hsl(var(--secondary-foreground))',
							fontSize: '14px',
							fontWeight: '500',
							width: '40px',
							height: '40px',
						},
						allowedContent: {
							height: '1px',
						},
					}}
					content={{
						button() {
							return <File size={16} className='text-secondary-foreground' />
						},
						allowedContent() {
							return ''
						},
					}}
					endpoint='imageUploader'
					onClientUploadComplete={(res) => {
						console.log('onClientUploadComplete', res)
						const url = res?.[0]?.url
						onUpdateImage(url ?? '')
					}}
				/>
			</div>
		</div>
	)
}

const ImageBox = ({
	todaysLog,
	position,
}: {
	todaysLog: GetDailyLogById
	position: 'front' | 'side' | 'back'
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const ctx = api.useUtils()
	const { mutate: updateFrontImage } =
		api.dailyLog.updateFrontImage.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
		})

	const { mutate: updateSideImage } = api.dailyLog.updateSideImage.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})

	const { mutate: updateBackImage } = api.dailyLog.updateBackImage.useMutation({
		onSettled: () => {
			ctx.dailyLog.invalidate()
		},
	})
	const title = titlesMap[position]

	const image =
		position === 'front'
			? todaysLog?.frontImage
			: position === 'side'
				? todaysLog?.sideImage
				: todaysLog?.backImage

	const onDeleteImage = () => {
		if (!todaysLog) return

		if (position === 'front') {
			updateFrontImage({
				logId: todaysLog.id,
				image: '',
			})
		}
		if (position === 'side') {
			updateSideImage({
				logId: todaysLog.id,
				image: '',
			})
		}
		if (position === 'back') {
			updateBackImage({
				logId: todaysLog.id,
				image: '',
			})
		}
	}

	return (
		<div>
			{image === '' || image === undefined || image === null ? (
				<ImageTake todaysLog={todaysLog} position={position} />
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
                      >Cancel</AlertDialogCancel>
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
              className='px-0 py-0 bg-background/10 border-none rounded-md shadow-lg'>
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

export { ImageBox }
