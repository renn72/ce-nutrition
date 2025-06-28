
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
import { useClientMediaQuery } from '@/hooks/use-client-media-query'

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

  const isMobile = useClientMediaQuery('(max-width: 600px)')

	const handleImageClick = (image: ImageData) => {
		setSelectedImage(image)
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
		setSelectedImage(null)
	}

  if (images.length === 0) return <div className='w-full text-center my-2'>nil</div>

	return (
		<div className='max-w-[100vw]'>
			<Carousel
        className='w-full px-2'>
				<CarouselContent
          className='gap-0'
        >
					{images.map((image, index) => (
						<CarouselItem key={image.src} className='basis-2/3 md:basis-1/2 lg:basis-1/5 pl-0'>
							<div className='p-2'>
								<Card className='cursor-pointer hover:shadow-lg transition-shadow'>
                  <h3 className='text-center text-xs sm:text-sm font-medium text-muted-foreground pt-1'>{new Date(image.date).toLocaleDateString('en-AU')}</h3>
									<CardContent className='flex aspect-[4/7] items-center justify-center p-2'>
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
        {
          isMobile ? null : (
            <CarouselPrevious />
          )
        }
        {
          isMobile ? null : (
            <CarouselNext />
          )
        }
			</Carousel>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className='max-h-[90vh] p-0'>
					<DialogTitle className='hidden'>Image</DialogTitle>
					<DialogDescription className='hidden'>Image</DialogDescription>
					{selectedImage && (
						<div className=' w-full h-[90vh]'>
							<Image
								src={selectedImage.src}
								alt={selectedImage.alt}
								fill
                sizes=''
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
