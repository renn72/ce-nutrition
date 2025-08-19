'use client'

import {  useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'

import { ImageAdd, ImageView } from '@/components/images/image-comparision'

export default function Page({
	params: _,
}: {
	params: Promise<{ image: string }>
}) {
	const searchParams = useSearchParams()
	const imageId = searchParams.get('imageId')
	const user = searchParams.get('user')
	const date = searchParams.get('date') ?? ''
	const router = useRouter()

	const [images, setImages] = useState([
		{ url: `https://utfs.io/f/${imageId}`, date: date },
	])

	if (!imageId) return <div>Loading...</div>

	return (
		<div className='w-full grid justify-center px-2'>
			<div className='relative flex gap-2  overflow-x-auto'>
				<Button
					onClick={() => router.push(`/admin/user-image?user=${user}`)}
					className='absolute top-2 left-2 z-20'
				>
					Back
				</Button>
				{images.map((image) => (
					<ImageView
						key={image.url}
						src={image.url}
						alt='image'
						date={image.date}
					/>
				))}
				<ImageAdd setImages={setImages} images={images} />
			</div>
		</div>
	)
}
