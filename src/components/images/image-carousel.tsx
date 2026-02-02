'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { api } from '@/trpc/react'
import { DailyLogCard } from '@/components/daily-log/daily-log-card'
import { useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { useSetAtom } from 'jotai'
import { Link } from 'next-view-transitions'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '@/components/ui/carousel'

import { userImagesAtom } from './user-gallery'

import type { GetAllDailyLogs, GetUserWRoles } from '@/types'

interface ImageData {
	src: string
	alt: string
	date: string
	dataId: number
}

interface ImageCarouselProps {
	images: ImageData[]
	title: string
	isAdmin: boolean
	dailyLogs: GetAllDailyLogs
}

const Item = ({
	image,
	title,
	user,
	images,
	isAdmin,
	toggleLog,
	dailyLogs,
}: {
	image: ImageData
	title: string
	images: ImageData[]
	user: GetUserWRoles
	isAdmin: boolean
	toggleLog: boolean
	dailyLogs: GetAllDailyLogs
}) => {
	const [isPrefetched, setIsPrefetched] = useState(false)

	const setImages = useSetAtom(userImagesAtom)

	const handlePrefetch = () => {
		if (isPrefetched) return
		setIsPrefetched(true)
		void fetch(image.src)
	}

	const dailyLog = dailyLogs?.find(
		(log) => log.date === new Date(image.date).toDateString(),
	)

	const d = new Date(image.date)
		.toLocaleDateString('en-AU')
		.replaceAll('/', '-')
	const link = `/${isAdmin ? 'admin' : 'user'}/user-image/${title}%${d}?imageId=${image.src.split('/').pop()}&user=${user}&date=${d}&title=${title}&dataId=${image.dataId}`

	return (
		<CarouselItem
			key={image.src}
			className='grid content-between pl-1 md:basis-1/2 lg:basis-1/5'
		>
			<AnimatePresence>
				{toggleLog && dailyLog ? (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.1, ease: 'easeIn' }}
						className='overflow-hidden' // Prevents content pop during height change
					>
						<DailyLogCard
							title={''}
							currentUser={user}
							dailyLog={dailyLog}
							yesterdaysDailyLog={dailyLog}
							date={new Date(image.date)}
							isAdmin={isAdmin}
							isLogPage={true}
							isDanger={false}
							isCreator={false}
						/>
					</motion.div>
				) : null}
			</AnimatePresence>
			<div className='p-1'>
				<Card className='transition-shadow cursor-pointer hover:shadow-lg'>
					<div className='flex flex-col'>
						<h3 className='text-sm font-medium text-center text-muted-foreground'>
							{new Date(image.date).toLocaleDateString('en-AU')}
						</h3>
						<h3 className='text-sm font-medium text-center text-muted-foreground'>
							{new Date(image.date).toLocaleDateString('en-AU', {
								weekday: 'long',
							})}
						</h3>
					</div>
					<CardContent
						onMouseEnter={() => handlePrefetch()}
						className='flex justify-center items-center p-2 aspect-[4/7]'
					>
						<div className='overflow-hidden relative w-full h-full rounded-md'>
							<Link
								href={link}
								prefetch={true}
								onClick={() => setImages([...images])}
							>
								<Image
									src={image.src || '/placeholder.svg'}
									alt={image.alt}
									fill
									className='object-cover transition-transform duration-200 hover:scale-105'
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

const ImageCarousel = ({
	images,
	title,
	isAdmin,
	dailyLogs,
}: ImageCarouselProps) => {
	const searchParams = useSearchParams()
	const userId = searchParams.get('user') ?? ''
	const [toggleLog, setToggleLog] = useState(false)

	const { data: user } = api.user.getCurrentUserRoles.useQuery({
		id: userId || '',
	})

	if (images.length === 0)
		return <div className='my-2 w-full text-center'>nil</div>

	return (
		<div className='flex flex-col gap-2 w-full'>
			<div className='flex gap-2 justify-center items-center w-full'>
				<h2 className='text-2xl font-medium text-center'>{title}</h2>
				<Button
					variant={toggleLog ? 'accent' : 'outline'}
					size='sm'
					onClick={() => setToggleLog(!toggleLog)}
				>
					Toggle Logs
				</Button>
			</div>
			<Carousel
				opts={{
					direction: 'ltr',
					startIndex: images.length - 1,
				}}
				className='mx-auto w-full max-w-screen-xl'
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
							toggleLog={toggleLog}
							dailyLogs={dailyLogs}
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
