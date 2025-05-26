'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { impersonatedUserAtom } from '@/atoms'
import { useAtom } from 'jotai'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { ImageCarousel } from './image-carousel'

const imageTitles = [
	{
		title: 'Front',
		value: 'front',
	},
	{
		title: 'Side',
		value: 'side',
	},
	{
		title: 'Back',
		value: 'back',
	},
]

const imageTitlesFull = [
	{
		title: 'Front',
		value: 'front',
	},
	{
		title: 'Side',
		value: 'side',
	},
	{
		title: 'Back',
		value: 'back',
	},
	{
		title: 'Front Dbl Biceps',
		value: 'frontDouble',
	},
	{
		title: 'Side Chest',
		value: 'sideChest',
	},
	{
		title: 'Side Triceps',
		value: 'sideTri',
	},
	{
		title: 'Rear Dbl Biceps',
		value: 'rearDouble',
	},
	{
		title: 'Abs & Thighs',
		value: 'absThighs',
	},
	{
		title: 'Front Vacum',
		value: 'frontVacum',
	},
	{
		title: 'Favourite Pose',
		value: 'favourite',
	},
]

const Gallery = ({ userId }: { userId: string }) => {

	const { data: user, isLoading } = api.user.getCurrentUser.useQuery({
		id: userId,
	})

	const { data: logs, isLoading: logsLoading } =
		api.dailyLog.getAllUser.useQuery(userId)

  const { mutate: updateGallery } = api.metrics.updateGallery.useMutation()

	const [select, setSelect] = useState<string>('front')

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

	const images = user.images
		.filter((image) => image.name === select)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.map((image) => {
			return {
				src: image.image || '',
				date: image.date || '',
				alt: 'alt',
			}
		})

  if (isLoading) return null

	const isBB = user.roles.find(
		(role) => role.name === 'body-builder-images',
	)
		? true
		: false

	return (
		<div className='flex flex-col gap-2 w-full mt-16 mb-20'>
			<div className='flex justify-center w-full'>
				<Select
					value={select}
					onValueChange={(value) => {
						setSelect(value)
            updateGallery({
              image: value,
              userId: userId,
            })
					}}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Select an image' />
					</SelectTrigger>
					<SelectContent>
						{isBB
							? imageTitlesFull.map((image) => (
									<SelectItem key={image.value} value={image.value}>
										{image.title}
									</SelectItem>
								))
							: imageTitles.map((image) => (
									<SelectItem key={image.value} value={image.value}>
										{image.title}
									</SelectItem>
								))}
					</SelectContent>
				</Select>
			</div>
			{select === 'front' ? (
				<ImageCarousel images={frontImages || []} className='w-full' />
			) : null}
			{select === 'side' ? (
				<ImageCarousel images={sideImages || []} className='w-full' />
			) : null}
			{select === 'back' ? (
				<ImageCarousel images={backImages || []} className='w-full' />
			) : null}
			{select !== 'front' && select !== 'side' && select !== 'back' ? (
				<ImageCarousel images={images || []} className='w-full' />
			) : null}
		</div>
	)
}

const Home = () => {
	const [impersonatedUser, setImpersonatedUser] = useAtom(impersonatedUserAtom)
	const { data: currentUser } = api.user.getCurrentUser.useQuery({
		id: impersonatedUser.id,
	})

	if (!currentUser) return null
	return <Gallery userId={currentUser.id} />
}

export default Home
