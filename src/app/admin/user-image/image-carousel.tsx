'use client'

import { useState } from 'react'

import Image from 'next/image'

import { CircleChevronLeft, CircleChevronRight, CircleX, X } from 'lucide-react'

import { cn } from '@/lib/utils'
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
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/components/ui/dialog'

interface ImageData {
	src: string
	alt: string
	date: string
}

interface ImageCarouselProps {
	images: ImageData[]
	className?: string
}
const ImageCarousel = ({ images, className }: ImageCarouselProps) => {
	const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
	const [selectedImageIndex, setSelectedImageIndex] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleImageClick = (image: ImageData, index: number) => {
		setSelectedImage(image)
		setSelectedImageIndex(index)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedImage(null)
	}

	if (images.length === 0)
		return <div className='w-full text-center my-2'>nil</div>

	const isFirstImage = selectedImageIndex === 0
	const isLastImage = selectedImageIndex === images.length - 1

	return (
		<div className={className}>
			<Carousel
				opts={{
					direction: 'ltr',
					startIndex: images.length - 1,
				}}
				className='w-full max-w-screen-xl mx-auto'
			>
				<CarouselContent className='gap-0'>
					{images.map((image, index) => (
						<CarouselItem
							key={image.src}
							className='md:basis-1/2 lg:basis-1/5 pl-1'
						>
							<div className='p-1'>
								<Card className='cursor-pointer hover:shadow-lg transition-shadow'>
									<h3 className='text-center text-sm font-medium text-muted-foreground'>
										{new Date(image.date).toLocaleDateString('en-AU')}
									</h3>
									<CardContent className='flex aspect-[4/7] items-center justify-center p-2'>
										<div
											className='relative w-full h-full overflow-hidden rounded-md'
											onClick={() => handleImageClick(image, index)}
										>
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

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='max-h-[95vh] p-0 max-w-[55vw] bg-background/00 border-none shadow-none'>
					<DialogTitle className='hidden'>Image</DialogTitle>
					<DialogDescription className='hidden'>Image</DialogDescription>
					{selectedImage && (
						<div className=' w-full h-[95vh] relative '>
							<DialogClose className='absolute top-2 left-1/2 -translate-x-1/2 text-white z-[1000] '>
								<CircleX
                  fill='#eeeeee77'
                  size={24} className='hover:scale-110 active:scale-95' />
							</DialogClose>
							<CircleChevronLeft
								className={cn('text-white/90 absolute top-1/2 left-2 -translate-y-1/2 z-[1000] ',
                  isFirstImage ? 'opacity-50' : 'hover:scale-110 active:scale-95'
                )}
								strokeWidth={1}
								size={36}
								onClick={() => {
									if (isFirstImage) return
									handleImageClick(
                    // @ts-ignore
										images[selectedImageIndex - 1],
										selectedImageIndex - 1,
									)
								}}
							/>
							<Image
								src={selectedImage.src}
								alt={selectedImage.alt}
								fill
								sizes=''
								className='object-contain'
								priority
							/>
							<CircleChevronRight
								className={cn('text-white/90 absolute top-1/2 right-2 -translate-y-1/2 z-[1000] ',
                  isLastImage ? 'opacity-50' : 'hover:scale-110 active:scale-95'
                )}
								strokeWidth={1}
								size={36}
								onClick={() =>{
                  if (isLastImage) return
									handleImageClick(
                    // @ts-ignore
										images[selectedImageIndex + 1],
										selectedImageIndex + 1,
									)
								}}
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}

export { ImageCarousel }
