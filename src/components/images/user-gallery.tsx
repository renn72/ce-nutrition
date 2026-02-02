'use client'

import { api } from '@/trpc/react'

import { ImageCarousel } from './image-carousel'

import { atom } from 'jotai'

export const userImagesAtom = atom<UserImage[]>([])

interface UserImage {
	src: string
	date: string
	alt: string
	dataId: number
}

const UserGallery = ({
	userId,
	isAdmin,
}: {
	userId: string
	isAdmin: boolean
}) => {
	const { data: user, isLoading } = api.user.getCurrentUser.useQuery({
		id: userId,
	})

	const { data: logs, isLoading: isLoadingLogs } =
		api.dailyLog.getAllCurrentUser.useQuery({ id: userId })

	if (isLoading) return null
	if (isLoadingLogs) return null
	if (!user) return null

	const frontImages = logs
		?.map((log) => {
			return {
				src: log.frontImage || '',
				date: log.date || '',
				alt: 'alt',
				dataId: log.id,
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
				dataId: log.id,
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
				dataId: log.id,
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
				dataId: image.id,
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
				dataId: image.id,
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
				dataId: image.id,
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
				dataId: image.id,
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
				dataId: image.id,
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
				dataId: image.id,
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
				dataId: image.id,
			}
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	if (!logs) return null

	return (
		<div className='flex flex-col gap-2 items-center mt-2 mb-10 w-full'>
			<ImageCarousel
				images={frontImages || []}
				title='Front'
				isAdmin={isAdmin}
				dailyLogs={logs}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={sideImages || []}
				title='Side'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={backImages || []}
				title='Back'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={frontDbl || []}
				title='Front Double Biceps'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={sideChest || []}
				title='Side Chest'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={sideTri || []}
				title='Side Triceps'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={rearDbl || []}
				title='Rear Double Biceps'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={absThigh || []}
				title='Abs & Thighs'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={frontVac || []}
				title='Front Vacuum'
				isAdmin={isAdmin}
			/>
			<ImageCarousel
				dailyLogs={logs}
				images={favorite || []}
				title='Favourite Pose'
				isAdmin={isAdmin}
			/>
		</div>
	)
}

export { UserGallery }
