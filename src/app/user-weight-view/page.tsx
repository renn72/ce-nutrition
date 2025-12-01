'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { api } from '@/trpc/react'

import { useSearchParams } from 'next/navigation'

import { CircleMinus, CirclePlus, MoveDown, MoveUp } from 'lucide-react'

const View = ({ userId }: { userId: string }) => {
	const { data: skinfolds, isLoading } =
		api.metrics.getUserSkinfolds.useQuery(userId)

	const [info, setInfo] = useState('')
	const [size, setSize] = useState(5)
	const data = skinfolds
		?.map((skinfold) => ({
			value: Number(skinfold.bodyWeight?.[0]?.bodyWeight || 0),
			date: skinfold.date,
		}))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const value = (data?.[1]?.value || 0) - (data?.[0]?.value || 0)

	if (isLoading) return null

	console.log('data', data?.slice(-2))
	return (
		<div className='flex flex-col justify-center items-center w-full w-screen h-screen'>
			<div className={cn('font-medium w-full text-3xl ')}>
				<div className='flex gap-2 justify-center items-center px-24'>
					<CirclePlus
						onClick={() => {
							if (size === 9) return
							setSize(size + 1)
						}}
						size={60}
						className='text-white hover:text-black'
					/>
					<CircleMinus
						onClick={() => {
							if (size === 4) return
							setSize(size - 1)
						}}
						size={60}
						className='text-white hover:text-black'
					/>
				</div>
				<div className='flex gap-2 justify-center items-center w-full hover:bg-gray-600'>
					<input
						className='w-min text-center text-white hover:bg-gray-600 focus:border-none focus:outline-0'
						value={info}
						onChange={(e) => setInfo(e.target.value)}
					/>
				</div>
			</div>
			<div className='flex justify-center items-center -ml-8 font-bold text-green-600 text-[20rem]'>
				{value > 0 ? (
					<MoveDown className='mb-16 -mr-20 text-black' size={250} />
				) : (
					<MoveUp className='mb-16 -mr-20 text-black' size={250} />
				)}
				{Math.abs(value).toFixed(1)}kg
			</div>
			<div className='-mt-36 w-full font-bold text-center uppercase text-[4rem]'>
				Body Weight
			</div>
			<div
				className={cn(
					size === 5 ? 'text-3xl' : '',
					size === 4 ? 'text-2xl' : '',
					size === 3 ? 'text-xl' : '',
					size === 2 ? 'text-base' : '',
					size === 6 ? 'text-4xl' : '',
					size === 7 ? 'text-5xl' : '',
					size === 8 ? 'text-6xl' : '',
					size === 9 ? 'text-7xl' : '',
					'font-medium w-full text-center pb-28',
				)}
			>
				{info}
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

	return <View userId={userId} />
}
