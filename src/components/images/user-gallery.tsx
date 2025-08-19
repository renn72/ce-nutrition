'use client'

import { api } from '@/trpc/react'

import { ImageCarousel } from './image-carousel'

import { atom } from 'jotai'

export const userImagesAtom = atom<UserImage[]>([])

interface UserImage {
	src: string
	date: string
	alt: string
}

const UserGallery = ({ userId, isAdmin }: { userId: string, isAdmin: boolean }) => {
	const { data: user, isLoading } = api.user.getCurrentUser.useQuery({
		id: userId,
	})

	const { data: logs, isLoading: isLoadingLogs } = api.dailyLog.getAllUser.useQuery(userId)

	if (isLoading) return null
  if (isLoadingLogs) return null
	if (!user) return null

	const frontImages = logs
		?.map((log) => {
			return {
				src: log.frontImage || '',
				date: log.date || '',
				alt: 'alt',
			}
		})
		.filter((image) => image.src !== '')
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	const sideImages = logs
		?.map((log) => {
			return {
				src: log.sideImage || '',
				date: log.date || '',
				alt: 'alt',
			}
		})
		.filter((image) => image.src !== '')
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	const backImages = logs
		?.map((log) => {
			return {
				src: log.backImage || '',
				date: log.date || '',
				alt: 'alt',
			}
		})
		.filter((image) => image.src !== '')
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())


	const frontDbl = user.images
		.filter((image) => image.name === 'frontDouble')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	const sideChest = user.images
		.filter((image) => image.name === 'sideChest')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	const sideTri = user.images
		.filter((image) => image.name === 'sideTri')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	const rearDbl = user.images
		.filter((image) => image.name === 'rearDouble')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	const absThigh = user.images
		.filter((image) => image.name === 'absThighs')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	const frontVac = user.images
		.filter((image) => image.name === 'frontVacum')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
	const favorite = user.images
		.filter((image) => image.name === 'favourite')
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	return (
		<div className='flex flex-col gap-2 w-full mt-2 mb-10 items-center '>
			<ImageCarousel images={frontImages || []} title='Front' isAdmin={isAdmin} />
			<ImageCarousel images={sideImages || []} title='Side' isAdmin={isAdmin} />
			<ImageCarousel images={backImages || []} title='Back' isAdmin={isAdmin} />
			<ImageCarousel images={frontDbl || []} title='Front Double Biceps' isAdmin={isAdmin} />
			<ImageCarousel images={sideChest || []} title='Side Chest' isAdmin={isAdmin} />
			<ImageCarousel images={sideTri || []} title='Side Triceps' isAdmin={isAdmin} />
			<ImageCarousel images={rearDbl || []} title='Rear Double Biceps' isAdmin={isAdmin} />
			<ImageCarousel images={absThigh || []} title='Abs & Thighs' isAdmin={isAdmin} />
			<ImageCarousel images={frontVac || []} title='Front Vacuum' isAdmin={isAdmin} />
			<ImageCarousel images={favorite || []} title='Favourite Pose' isAdmin={isAdmin} />
		</div>
	)
}

export {UserGallery}
