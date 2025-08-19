'use client'

import { ReactSketchCanvas } from 'react-sketch-canvas'
import React, { useEffect, useId, useRef, useState } from 'react'

import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import { atom, useAtom, useAtomValue } from 'jotai'
import { CirclePlus } from 'lucide-react'
import {
	TransformComponent,
	TransformWrapper,
	type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch'
import type { ReactZoomPanPinchContext } from 'react-zoom-pan-pinch'


import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

import { userImagesAtom } from './user-gallery'

const transFormsAtom = atom<Transforms>([])

type SetTransformFunction = (
	x: number,
	y: number,
	scale: number,
	animationTime?: number,
	animationName?: string,
) => void

type Transforms = {
	url: string
	setTransformFunction: SetTransformFunction
}[]

interface ImageData {
	url: string
	date: string
}

const ImageAdd = ({
	setImages,
	images,
}: {
	setImages: React.Dispatch<React.SetStateAction<ImageData[]>>
	images: ImageData[]
}) => {
	const imagesStore = useAtomValue(userImagesAtom)
	const [isOpen, setIsOpen] = useState(false)
	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<div className='h-[calc(100vh-110px)] flex justify-center items-center'>
					<CirclePlus
						size={48}
						className='cursor-pointer hover:scale-110 active:scale-95'
					/>
				</div>
			</DialogTrigger>
			<DialogContent className='max-w-screen-2xl'>
				<DialogHeader className=''>
					<DialogTitle className='text-center'>Select</DialogTitle>
					<DialogDescription className='hidden' />
				</DialogHeader>
				<Carousel
					opts={{
						direction: 'ltr',
						startIndex: imagesStore.length - 1,
					}}
					className='w-full max-w-screen-xl mx-auto'
				>
					<CarouselContent className='gap-0'>
						{imagesStore
							.filter((image) => !images.find((i) => i.url === image.src))
							.map((image) => (
								<CarouselItem
									key={image.src}
									className='md:basis-1/2 lg:basis-1/5 pl-1'
								>
									<div className='p-1'>
										<Card
											onClick={() => {
												setIsOpen(false)
												console.log(image)
												setImages([
													...images,
													{
														url: image.src,
														date: new Date(image.date)
															.toLocaleDateString('en-AU')
															.replaceAll('/', '-'),
													},
												])
											}}
											className='cursor-pointer hover:shadow-lg transition-shadow'
										>
											<h3 className='text-center text-sm font-medium text-muted-foreground'>
												{new Date(image.date).toLocaleDateString('en-AU')}
											</h3>
											<CardContent className='flex aspect-[4/7] items-center justify-center p-2'>
												<div className='relative w-full h-full overflow-hidden rounded-md'>
													<Image
														src={image.src || '/placeholder.svg'}
														alt={image.alt}
														fill
														className='object-cover hover:scale-105 transition-transform duration-200'
														sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
													/>
												</div>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
					<CarouselNext />
					<CarouselPrevious />
				</Carousel>
			</DialogContent>
		</Dialog>
	)
}

const Controls = ({
	zoomIn,
	zoomOut,
	resetTransform,
	centerView,
	instance,
	src,
	setTransform,
}: {
	zoomIn: () => void
	zoomOut: () => void
	resetTransform: () => void
	centerView: () => void
	src: string
	setTransform: () => void
	instance: ReactZoomPanPinchContext
}) => {
	const [transforms, setTransforms] = useAtom(transFormsAtom)

	useEffect(() => {
		if (transforms.find((t) => t.url === src)) return
		setTransforms([
			...transforms,
			{
				url: src,
				setTransformFunction: setTransform,
			},
		])
	}, [])

	const handleDuplicate = () => {
		console.log(instance)
		console.log(transforms)
		for (const transform of transforms) {
			transform.setTransformFunction(
				instance.transformState.positionX,
				instance.transformState.positionY,
				instance.transformState.scale,
			)
		}
	}

	console.log('fincs', transforms)
	return (
		<div
			className='flex gap-2 items-center justify-center border px-2 py-[5px]
      my-1 rounded-md bg-primary/60 shadow-sm z-10'
		>
			<Button size='sm' onClick={() => zoomIn()}>
				Zoom In
			</Button>
			<Button size='sm' onClick={() => zoomOut()}>
				Zoom Out
			</Button>
			<Button size='sm' onClick={() => centerView()}>
				Center
			</Button>
			<Button size='sm' onClick={() => resetTransform()}>
				Reset
			</Button>
			<Button size='sm' onClick={handleDuplicate}>
				Duplicate Position
			</Button>
		</div>
	)
}

const ImageView = ({
	src,
	alt,
	date,
}: {
	src: string
	alt: string
	date: string
}) => {
	const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

	const id = useId()

	return (
		<div className='flex flex-col items-center relative shrink-0'>
			<div className='absolute top-14 left-1/2 -translate-x-1/2 z-10 text-sm'>
				{date}
			</div>
			<TransformWrapper
				initialScale={1}
				initialPositionX={0}
				initialPositionY={200}
				ref={transformComponentRef}
			>
				{(utils) => (
					<React.Fragment>
						<Controls {...utils} src={src} />
						<TransformComponent>
							<img
								src={src}
								alt={alt}
								id={id}
								className='h-[calc(100vh-120px)] rounded-md shadow-md z-10'
							/>
						</TransformComponent>
					</React.Fragment>
				)}
			</TransformWrapper>
		</div>
	)
}

export { ImageView, ImageAdd }
