'use client'

import { useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { useSetAtom } from 'jotai'
import { Link } from 'next-view-transitions'

import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

import { userImagesAtom } from './user-gallery'

interface ImageData {
	src: string
	alt: string
	date: string
}

interface ImageCarouselProps {
	images: ImageData[]
	title: string
  isAdmin: boolean
}

const Item = ({
	image,
	user,
	title,
	images,
  isAdmin,
}: {
	image: ImageData
	user: string
	title: string
	images: ImageData[]
  isAdmin: boolean
}) => {
	const [isPrefetched, setIsPrefetched] = useState(false)

	const setImages = useSetAtom(userImagesAtom)

	const handlePrefetch = () => {
		if (isPrefetched) return
		setIsPrefetched(true)
		void fetch(image.src)
	}

	const d = new Date(image.date)
		.toLocaleDateString('en-AU')
		.replaceAll('/', '-')
	const link = `/${isAdmin ? 'admin' : 'user'}/user-image/${title}%${d}?imageId=${image.src.split('/').pop()}&user=${user}&date=${d}&title=${title}`

	return (
		<CarouselItem key={image.src} className='md:basis-1/2 lg:basis-1/5 pl-1'>
			<div className='p-1'>
				<Card className='cursor-pointer hover:shadow-lg transition-shadow'>
					<div className='flex flex-col'>
						<h3 className='text-center text-sm font-medium text-muted-foreground'>
							{new Date(image.date).toLocaleDateString('en-AU')}
						</h3>
						<h3 className='text-center text-sm font-medium text-muted-foreground'>
							{new Date(image.date).toLocaleDateString('en-AU', {
								weekday: 'long',
							})}
						</h3>
					</div>
					<CardContent
						onMouseEnter={() => handlePrefetch()}
						className='flex aspect-[4/7] items-center justify-center p-2'
					>
						<div className='relative w-full h-full overflow-hidden rounded-md'>
							<Link
								href={link}
								prefetch={true}
								onClick={() => setImages([...images])}
							>
								<Image
									src={image.src || '/placeholder.svg'}
									alt={image.alt}
									fill
									className='object-cover hover:scale-105 transition-transform duration-200'
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
								/>
							</Link>
						</div>
					</CardContent>
				</Card>
			</div>
		</CarouselItem>
	)
}

const ImageCarousel = ({ images, title, isAdmin }: ImageCarouselProps) => {
	const searchParams = useSearchParams()
	const user = searchParams.get('user') ?? ''

	if (images.length === 0)
		return <div className='w-full text-center my-2'>nil</div>

	return (
		<div className='flex flex-col gap-2 w-full'>
			<h2 className='text-2xl font-medium text-center'>{title}</h2>
			<Carousel
				opts={{
					direction: 'ltr',
					startIndex: images.length - 1,
				}}
				className='w-full max-w-screen-xl mx-auto'
			>
				<CarouselContent className='gap-0'>
					{images.map((image) => (
						<Item
              isAdmin={isAdmin}
							key={image.src}
							image={image}
							user={user}
							title={title}
							images={images}
						/>
					))}
				</CarouselContent>
				<CarouselNext />
				<CarouselPrevious />
			</Carousel>
		</div>
	)
}

export { ImageCarousel }
