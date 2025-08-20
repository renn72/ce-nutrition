'use client'

import React, { useEffect, useId, useRef, useState } from 'react'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { atom, useAtom, useAtomValue } from 'jotai'
import { CirclePlus, Eraser, Menu, Save, SquarePen, Trash } from 'lucide-react'
import {
	ReactSketchCanvas,
	type ReactSketchCanvasRef,
} from 'react-sketch-canvas'
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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { ColorPicker } from '@/components/images/color-picker'

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

	return (
		<div className='flex gap-2 items-center justify-center border px-2 py-[5px] my-1 rounded-md bg-primary/60 shadow-sm z-10 h-[24x]'>
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

const strokeMap = {
	1: 2,
	2: 4,
	4: 6,
	8: 8,
	12: 10,
	20: 16,
}

const ImageView = ({
	src,
	alt,
	date,
	isRoot = false,
	userId,
	isAdmin = false,
}: {
	src: string
	alt: string
	date: string
	isRoot?: boolean
	userId: string
	isAdmin?: boolean
}) => {
	const [toggleDraw, setToggleDraw] = useState(false)
	const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

	const [color, setColor] = useState('#000000')
	const [strokeWidth, setStrokeWidth] = useState(4)
	const [isEraser, setIsEraser] = useState(false)

	const ref = useRef<HTMLImageElement>(null)
	const canvasRef = useRef<ReactSketchCanvasRef>(null)

	const width = ref.current?.width || 0
	const height = ref.current?.height || 0

	const id = useId()

	const handleToggeEraser = () => {
		setIsEraser(!isEraser)
		canvasRef.current?.eraseMode(!isEraser)
	}

	const handleClear = () => {
		canvasRef.current?.eraseMode(false)
		canvasRef.current?.clearCanvas()
		setIsEraser(false)
	}
	const handleSave = async () => {
		const data = await canvasRef.current?.exportSvg()
		console.log(data)
	}

	return (
		<div className='flex flex-col items-center relative shrink-0'>
			<div className='absolute top-14 left-1/2 -translate-x-1/2 z-10 text-sm'>
				{date}
			</div>
			{isRoot && (
				<div className='absolute top-16 right-2 z-20 flex flex-col gap-4 w-14 items-center rounded-md bg-muted/50 py-2'>
					<Button
						variant='ghost'
						className=' hover:outline hover:bg-primary/00 w-10 p-0'
					>
						<SquarePen size={24} onClick={() => setToggleDraw(!toggleDraw)} />
					</Button>
					{toggleDraw && (
						<>
							<ColorPicker onChange={setColor} value={color} />
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant='ghost'
										className=' hover:outline hover:bg-primary/00 w-10 p-0'
									>
										<div
											className={cn(
												'rounded-full bg-primary/90 shadow-sm',
												// @ts-ignore
												`h-[${strokeMap[strokeWidth]}px] w-[${strokeMap[strokeWidth]}px]`,
											)}
										/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-12 min-w-1'>
									<DropdownMenuItem
										onClick={() => setStrokeWidth(1)}
										className='w-10 h-10 flex items-center justify-center'
									>
										<div className='h-[2px] w-[2px] rounded-full bg-primary/90 shadow-sm' />
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setStrokeWidth(2)}
										className='w-10 h-10 flex items-center justify-center'
									>
										<div className='h-[4px] w-[4px] rounded-full bg-primary/90 shadow-sm' />
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setStrokeWidth(4)}
										className='w-10 h-10 flex items-center justify-center'
									>
										<div className='h-[6px] w-[6px] rounded-full bg-primary/90 shadow-sm' />
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setStrokeWidth(8)}
										className='w-10 h-10 flex items-center justify-center'
									>
										<div className='h-[8px] w-[8px] rounded-full bg-primary/90 shadow-sm' />
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setStrokeWidth(12)}
										className='w-10 h-10 flex items-center justify-center'
									>
										<div className='h-[10px] w-[10px] rounded-full bg-primary/90 shadow-sm' />
									</DropdownMenuItem>
									<DropdownMenuItem
										onClick={() => setStrokeWidth(20)}
										className='w-10 h-10 flex items-center justify-center'
									>
										<div className='h-[16px] w-[16px] rounded-full bg-primary/90 shadow-sm' />
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<Button
								variant='ghost'
								className=' hover:outline hover:bg-primary/00 w-10 p-0'
							>
								<Eraser size={26} onClick={handleToggeEraser} />
							</Button>
							<Button
								variant='ghost'
								className=' hover:outline hover:bg-primary/00 w-10 p-0'
							>
								<Trash size={26} onClick={handleClear} />
							</Button>
							<Button
								variant='ghost'
								className=' hover:outline hover:bg-primary/00 w-10 p-0'
							>
								<Save size={26} onClick={handleSave} />
							</Button>
						</>
					)}
				</div>
			)}

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
								ref={ref}
								src={src}
								alt={alt}
								id={id}
								className='h-[calc(100vh-120px)] rounded-md shadow-md z-10'
							/>
						</TransformComponent>
					</React.Fragment>
				)}
			</TransformWrapper>
			<div className='absolute top-[52px] left-1/2 -translate-x-1/2 z-10 rounded-md'>
				{ref && toggleDraw && (
					<ReactSketchCanvas
						ref={canvasRef}
						className={cn('border-2 rounded-md border-primary ')}
						canvasColor='transparent'
						width='100'
						height='100'
						strokeColor={color}
						strokeWidth={strokeWidth}
						eraserWidth={strokeWidth}
						style={{ width: `${width}px`, height: `${height}px` }}
					/>
				)}
			</div>
		</div>
	)
}

export { ImageView, ImageAdd }
