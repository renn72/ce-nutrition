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

	const sideImages = logs
		?.map((log) => {
			return {
				src: log.sideImage || '',
				date: log.date || '',
				alt: 'alt',
			}
		})
		.filter((image) => image.src !== '')

	const backImages = logs
		?.map((log) => {
			return {
				src: log.backImage || '',
				date: log.date || '',
				alt: 'alt',
			}
		})
		.filter((image) => image.src !== '')

	if (isLoading) return null
	if (!user) return null
	return (
		<div className='flex flex-col gap-2 w-full my-16 items-center '>
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
