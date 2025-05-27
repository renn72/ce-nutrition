'use client'

import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { ImageCarousel } from './image-carousel'

const UserImage = ({ userId }: { userId: string }) => {
	const ctx = api.useUtils()
	const { data: user, isLoading } = api.user.getCurrentUser.useQuery({
		id: userId,
	})

	const { data: logs, isLoading: logsLoading } =
		api.dailyLog.getAllUser.useQuery(userId)

	console.log('user', user)
	console.log('logs', logs)

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

	if (isLoading) return null
	if (!user) return null

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
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Front Images</h2>
				<ImageCarousel images={frontImages || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Side Images</h2>
				<ImageCarousel images={sideImages || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Back Images</h2>
				<ImageCarousel images={backImages || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>
					Front Double Biceps
				</h2>
				<ImageCarousel images={frontDbl || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Side Chest</h2>
				<ImageCarousel images={sideChest || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Side Triceps</h2>
				<ImageCarousel images={sideTri || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Rear Double Biceps</h2>
				<ImageCarousel images={rearDbl || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Abs & Thighs</h2>
				<ImageCarousel images={absThigh || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Front Vacuum</h2>
				<ImageCarousel images={frontVac || []} className='w-full' />
			</div>
			<div className='flex flex-col gap-2 w-full'>
				<h2 className='text-2xl font-medium text-center'>Favourite Pose</h2>
				<ImageCarousel images={favorite || []} className='w-full' />
			</div>
		</div>
	)
}

export default function Home() {
	const searchParams = useSearchParams()
	const userId = searchParams.get('user')

	if (
		userId === '' ||
		userId === undefined ||
		userId === null ||
		userId === 'null'
	)
		return <div>Select a user</div>

	return <UserImage userId={userId} />
}
