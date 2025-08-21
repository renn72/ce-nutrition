'use client'

import { useId, useRef, useState } from 'react'

import Image from 'next/image'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { cn } from '@/lib/utils'
import {
	TransformComponent,
	TransformWrapper,
	type ReactZoomPanPinchRef,
} from 'react-zoom-pan-pinch'
import type { ReactZoomPanPinchContext } from 'react-zoom-pan-pinch'

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
	DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface ImageData {
	src: string
	alt: string
	date: string
	svg: string | null
}

interface ImageCarouselProps {
	images: ImageData[]
	className?: string
}

const Overlay = ({ overlay }: { overlay: string }) => {
	console.log('in')
	return (
		<div
			className={cn(
				'absolute top-0 left-1/2 -translate-x-1/2 z-10 text-sm w-full',
			)}
		>
			<div dangerouslySetInnerHTML={{ __html: overlay }} />
		</div>
	)
}
const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null)
	const [showOverlay, setShowOverlay] = useState(false)

	const id = useId()
	const isMobile = useClientMediaQuery('(max-width: 600px)')

	const handleImageClick = (image: ImageData) => {
		setSelectedImage(image)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedImage(null)
	}

	if (images.length === 0)
		return <div className='w-full text-center my-2'>nil</div>

	return (
		<div className='max-w-[100vw]'>
			<Carousel className='w-full px-2'>
				<CarouselContent className='gap-0'>
					{images.map((image, index) => (
						<CarouselItem
							key={image.src}
							className='basis-2/3 md:basis-1/2 lg:basis-1/5 pl-0'
						>
							<div className='px-2'>
								<Card className='cursor-pointer hover:shadow-lg transition-shadow'>
									<h3 className='text-center text-xs sm:text-sm font-medium text-muted-foreground pt-1'>
										{new Date(image.date).toLocaleDateString('en-AU')}
									</h3>
									<CardContent className='flex aspect-[4/7] items-center justify-center px-2'>
										<div
											className='relative w-full h-full overflow-hidden rounded-md'
											onClick={() => handleImageClick(image)}
										>
											<Image
												src={image.src || '/placeholder.svg'}
												alt={image.alt}
												fill
												className='object-cover hover:scale-105 transition-transform duration-200'
												sizes='(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 80vw'
											/>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				{isMobile ? null : <CarouselPrevious />}
				{isMobile ? null : <CarouselNext />}
			</Carousel>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent
					forceMount
					onOpenAutoFocus={(e) => e.preventDefault()}
					className='max-h-[100vh] p-0'
				>
					<DialogTitle className='py-0'></DialogTitle>
					{selectedImage?.svg ? (
						<div className='flex items-center gap-2 justify-center mt-2 z-[100] absolute top-1 left-1/2 -translate-x-1/2'>
							<Label>Show Overlay</Label>
							<Switch checked={showOverlay} onCheckedChange={setShowOverlay} />
						</div>
					) : null}
					<DialogDescription className='' />
					{selectedImage && (
						<div className=' w-full'>
							<TransformWrapper
								initialScale={1}
								initialPositionX={0}
								initialPositionY={0}
								ref={transformComponentRef}
							>
								{(utils) => (
									<>
										<TransformComponent>
											<img
												src={selectedImage.src}
												alt={selectedImage.alt}
												id={id}
												className='w-screen'
											/>
											{showOverlay && selectedImage.svg ? (
												<Overlay overlay={selectedImage.svg} />
											) : null}
										</TransformComponent>
									</>
								)}
							</TransformWrapper>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}

export { ImageCarousel }
