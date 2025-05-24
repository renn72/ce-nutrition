'use client'

import { useState } from 'react'

import Image from 'next/image'

import { X } from 'lucide-react'

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
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleImageClick = (image: ImageData) => {
		setSelectedImage(image)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedImage(null)
	}

	return (
		<div className={className}>
			<Carousel className='w-full max-w-4xl mx-auto'>
				<CarouselContent>
					{images.map((image, index) => (
						<CarouselItem key={image.src} className='md:basis-1/2 lg:basis-1/3'>
							<div className='p-1'>
								<Card className='cursor-pointer hover:shadow-lg transition-shadow'>
                  <h3 className='text-center text-sm font-medium text-muted-foreground'>{new Date(image.date).toLocaleDateString('en-AU')}</h3>
									<CardContent className='flex aspect-[3/4] items-center justify-center p-2'>
										<div
											className='relative w-full h-full overflow-hidden rounded-md'
											onClick={() => handleImageClick(image)}
										>
											<Image
												src={image.src || '/placeholder.svg'}
												alt={image.alt}
												fill
												className='object-cover hover:scale-105 transition-transform duration-200'
												sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
											/>
										</div>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='max-h-[90vh] p-0'>
					<DialogTitle className='hidden'>Image</DialogTitle>
					<DialogDescription className='hidden'>Image</DialogDescription>
					{selectedImage && (
						<div className=' w-full h-[80vh]'>
							<Image
								src={selectedImage.src}
								alt={selectedImage.alt}
								fill
								className='object-contain w-full'

								priority
							/>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</div>
	)
}

export { ImageCarousel }
