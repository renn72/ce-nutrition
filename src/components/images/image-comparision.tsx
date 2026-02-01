'use client'

import { DailyLogCard } from '@/components/daily-log/daily-log-card'
import { api } from '@/trpc/react'

import React, { useEffect, useId, useRef, useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { cn } from '@/lib/utils'
import { skipToken } from '@tanstack/react-query'
import { atom, useAtom, useAtomValue } from 'jotai'
import {
	CirclePlus,
	Copy,
	Eraser,
	Eye,
	EyeOff,
	RedoDot,
	RotateCcw,
	Save,
	SquarePen,
	SquareSquare,
	Trash,
	UndoDot,
	ZoomIn,
	ZoomOut,
} from 'lucide-react'
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
import { toast } from 'sonner'

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
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip'

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
	dataId: number
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
				<div className='flex justify-center items-center h-[calc(100vh-110px)]'>
					<CirclePlus
						size={48}
						className='cursor-pointer hover:scale-110 active:scale-95'
					/>
				</div>
			</DialogTrigger>
			<DialogContent className='px-1 max-w-screen-2xl xl:px-2'>
				<DialogHeader className=''>
					<DialogTitle className='text-center'>Select</DialogTitle>
					<DialogDescription className='hidden' />
				</DialogHeader>
				<Carousel
					opts={{
						direction: 'ltr',
						startIndex: imagesStore.length - 1,
					}}
					className='mx-auto w-full xl:max-w-screen-xl max-w-[900px]'
				>
					<CarouselContent className='gap-0'>
						{imagesStore
							.filter((image) => !images.find((i) => i.url === image.src))
							.map((image) => (
								<CarouselItem
									key={image.src}
									className='pl-1 md:basis-1/2 lg:basis-1/4 xl:basis-1/5'
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
														dataId: image.dataId,
													},
												])
											}}
											className='transition-shadow cursor-pointer hover:shadow-lg'
										>
											<h3 className='text-sm font-medium text-center text-muted-foreground'>
												{new Date(image.date).toLocaleDateString('en-AU')}
											</h3>
											<CardContent className='flex justify-center items-center p-2 aspect-[4/7]'>
												<div className='overflow-hidden relative w-full h-full rounded-md'>
													<Image
														src={image.src || '/placeholder.svg'}
														alt={image.alt}
														fill
														className='object-cover transition-transform duration-200 hover:scale-105'
														sizes='(max-width: 1068px) 100vw, (max-width: 1200px) 50vw, 25vw'
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
		<div className='flex z-10 gap-2 justify-center items-center px-2 my-1 rounded-md border shadow-sm py-[5px] bg-primary/60 h-[24x]'>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size='sm' onClick={() => zoomIn()}>
						<ZoomIn size={20} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Zoom In</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size='sm' onClick={() => zoomOut()}>
						<ZoomOut size={20} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Zoom Out</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size='sm' onClick={() => centerView()}>
						<SquareSquare size={20} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Center</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size='sm' onClick={() => resetTransform()}>
						<RotateCcw size={20} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Reset</p>
				</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button size='sm' onClick={handleDuplicate}>
						<Copy size={20} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Duplicate Position</p>
				</TooltipContent>
			</Tooltip>
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

const Drawing = ({
	imageRef: ref,
	dataId,
	imageType,
	overlay,
	setShowOverlay,
}: {
	imageRef: React.RefObject<HTMLImageElement>
	dataId: number
	imageType: string
	overlay: string | undefined | null
	setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const ctx = api.useUtils()
	const { mutate: updateFrontImageOverlay } =
		api.dailyLog.updateFrontImageOverlay.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
			onError: () => {
				toast.error('error conflict')
			},
		})
	const { mutate: updateSideImageOverlay } =
		api.dailyLog.updateSideImageOverlay.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
			onError: () => {
				toast.error('error conflict')
			},
		})
	const { mutate: updateBackImageOverlay } =
		api.dailyLog.updateBackImageOverlay.useMutation({
			onSettled: () => {
				ctx.dailyLog.invalidate()
			},
			onError: () => {
				toast.error('error conflict')
			},
		})
	const { mutate: updateBodyBuilderImageOverlay } =
		api.dailyLog.updateBodyBuilderImageOverlay.useMutation({
			onSettled: () => {
				ctx.user.invalidate()
			},
			onError: () => {
				toast.error('error conflict')
			},
		})

	const [toggleDraw, setToggleDraw] = useState(false)

	const [color, setColor] = useState('#000001')
	const [strokeWidth, setStrokeWidth] = useState(4)
	const [isEraser, setIsEraser] = useState(false)

	const canvasRef = useRef<ReactSketchCanvasRef>(null)

	const width = ref.current?.width || 0
	const height = ref.current?.height || 0

	const handleToggeEraser = () => {
		setIsEraser(!isEraser)
		canvasRef.current?.eraseMode(!isEraser)
	}

	const handleUndo = () => {
		canvasRef.current?.undo()
	}

	const handleRedo = () => {
		canvasRef.current?.redo()
	}

	const handleClear = () => {
		canvasRef.current?.eraseMode(false)
		canvasRef.current?.clearCanvas()
		setIsEraser(false)
	}
	const handleSave = async () => {
		const data = await canvasRef.current?.exportSvg()
		if (!data) return
		if (imageType === 'front') {
			updateFrontImageOverlay({
				logId: dataId,
				overlay: data,
			})
			return
		}
		if (imageType === 'side') {
			console.log('side')
			return
		}
		if (imageType === 'back') {
			console.log('back')
			return
		}
		console.log('else')
	}
	return (
		<>
			<div className='flex absolute right-2 top-16 z-20 flex-col gap-4 justify-center items-center py-2 w-14 rounded-md bg-muted/50'>
				<Button
					variant='ghost'
					className='p-0 w-10 h-10 z-100 hover:outline hover:outline-primary/50 hover:bg-primary/00'
				>
					<SquarePen
						size={24}
						onClick={() => {
							if (!toggleDraw) setShowOverlay(false)
							setToggleDraw(!toggleDraw)
						}}
					/>
				</Button>
				{toggleDraw && (
					<>
						<Tooltip>
							<TooltipTrigger asChild>
								<div>
									<ColorPicker onChange={setColor} value={color} />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Change color</p>
							</TooltipContent>
						</Tooltip>
						<Tooltip>
							<TooltipTrigger asChild>
								<div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant='ghost'
												className='p-0 w-10 hover:outline hover:bg-primary/00'
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
												className='flex justify-center items-center w-10 h-10'
											>
												<div className='rounded-full shadow-sm h-[2px] w-[2px] bg-primary/90' />
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setStrokeWidth(2)}
												className='flex justify-center items-center w-10 h-10'
											>
												<div className='rounded-full shadow-sm h-[4px] w-[4px] bg-primary/90' />
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setStrokeWidth(4)}
												className='flex justify-center items-center w-10 h-10'
											>
												<div className='rounded-full shadow-sm h-[6px] w-[6px] bg-primary/90' />
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setStrokeWidth(8)}
												className='flex justify-center items-center w-10 h-10'
											>
												<div className='rounded-full shadow-sm h-[8px] w-[8px] bg-primary/90' />
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setStrokeWidth(12)}
												className='flex justify-center items-center w-10 h-10'
											>
												<div className='rounded-full shadow-sm h-[10px] w-[10px] bg-primary/90' />
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => setStrokeWidth(20)}
												className='flex justify-center items-center w-10 h-10'
											>
												<div className='rounded-full shadow-sm h-[16px] w-[16px] bg-primary/90' />
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Change stroke width</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									className='p-0 w-10 hover:outline hover:bg-primary/00'
								>
									<Eraser size={26} onClick={handleToggeEraser} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Eraser</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									className='p-0 w-10 hover:outline hover:bg-primary/00'
								>
									<UndoDot size={26} onClick={handleUndo} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Undo</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									className='p-0 w-10 hover:outline hover:bg-primary/00'
								>
									<RedoDot size={26} onClick={handleRedo} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Redo</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									className='p-0 w-10 hover:outline hover:bg-primary/00'
								>
									<Trash size={26} onClick={handleClear} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Clear</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant='ghost'
									className='p-0 w-10 hover:outline hover:bg-primary/00'
								>
									<Save size={26} onClick={handleSave} />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Save</p>
							</TooltipContent>
						</Tooltip>
					</>
				)}
			</div>
			{ref && toggleDraw && (
				<div className='absolute left-1/2 z-10 rounded-md -translate-x-1/2 top-[52px]'>
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
				</div>
			)}
		</>
	)
}

const Overlay = ({
	overlay,
	showOverlay,
}: {
	overlay: string
	showOverlay: boolean
}) => {
	console.log('in')
	return (
		<div
			className={cn(
				'absolute top-0 left-1/2 -translate-x-1/2 z-10 text-sm w-full',
				showOverlay ? '' : 'hidden',
			)}
		>
			<div dangerouslySetInnerHTML={{ __html: overlay }} />
		</div>
	)
}

const ImageView = ({
	src,
	alt,
	date,
	isRoot: _isRoot = false,
	userId: _userId,
	isAdmin = false,
	dataId,
	isLogs = false,
	dailyLog = null,
}: {
	src: string
	alt: string
	date: string
	isRoot?: boolean
	userId: string
	isAdmin?: boolean
	dataId?: number | undefined
	isLogs?: boolean
	dailyLog?: any
}) => {
	const [showOverlay, setShowOverlay] = useState(false)
	const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)

	const ref = useRef<HTMLImageElement>(null)

	const id = useId()
	const searchParams = useSearchParams()
	const imageType = searchParams.get('title')?.toLowerCase()
	const paramsDataId = Number(searchParams.get('dataId'))
	const userId = searchParams.get('user')
	const { data: user } = api.user.get.useQuery(userId || '')

	const { data: overlayRes } = api.dailyLog.getImageOverlay.useQuery(
		paramsDataId && imageType
			? {
					dataId: paramsDataId,
					imageType: imageType,
				}
			: skipToken,
	)
	const overlay = overlayRes?.overlay

	if (!imageType) return null
	if (!user) return null
	return (
		<div className='flex relative flex-col items-center shrink-0'>
			{isAdmin && dataId && (
				<Drawing
					imageRef={ref}
					dataId={dataId}
					overlay={overlay}
					imageType={imageType}
					setShowOverlay={setShowOverlay}
				/>
			)}
			<div className='absolute top-14 left-1/2 z-10 px-3 text-xs leading-none rounded-full -translate-x-1/2 bg-background/40 pt-[4px] pb-[1px]'>
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
						{/* @ts-ignore */}
						<Controls {...utils} src={src} />
						<TransformComponent>
							<img
								ref={ref}
								src={src}
								alt={alt}
								id={id}
								className='z-10 rounded-md shadow-md h-[calc(100vh-120px)]'
							/>
							{overlay && (
								<Overlay overlay={overlay} showOverlay={showOverlay} />
							)}
							{overlay ? (
								<div className='flex absolute left-2 z-20 justify-center items-center w-14 h-14 rounded-md top-[9px] bg-muted/50'>
									{showOverlay ? (
										<Button
											variant='ghost'
											className='p-0 w-10 hover:outline hover:bg-primary/00'
										>
											<Eye size={24} onClick={() => setShowOverlay(false)} />
										</Button>
									) : (
										<Button
											variant='ghost'
											className='p-0 w-10 hover:outline hover:bg-primary/00'
										>
											<EyeOff size={24} onClick={() => setShowOverlay(true)} />
										</Button>
									)}
								</div>
							) : null}
						</TransformComponent>
					</React.Fragment>
				)}
			</TransformWrapper>
			{isLogs && (
				<DailyLogCard
					title={''}
					userId={user.id}
					dailyLog={dailyLog}
					yesterdaysDailyLog={dailyLog}
					date={new Date(date)}
					isAdmin={isAdmin}
					isLogPage={true}
					isDanger={false}
					isCreator={false}
				/>
			)}
		</div>
	)
}

export { ImageView, ImageAdd }
