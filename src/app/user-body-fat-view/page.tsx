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
			value: Number(skinfold.bodyFat?.[0]?.bodyFat || 0),
			date: skinfold.date,
		}))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

	const [value, setValue] = useState(() =>
		Math.abs((data?.[1]?.value || 0) - (data?.[0]?.value || 0)).toFixed(1),
	)

	const [isPositive, setIsPositive] = useState(() => {
		const i = (data?.[1]?.value || 0) - (data?.[0]?.value || 0)
		return i > 0
	})

	const [valueType, setValueType] = useState('body fat')

	const [postfix, setPostfix] = useState('%')

	if (isLoading) return null

	console.log('data', data?.slice(-2))
	return (
		<div className='flex flex-col justify-center items-center w-screen h-screen full'>
			<div className='flex justify-center items-center mt-24 -ml-4 font-bold text-green-600 text-[20rem]'>
				{isPositive ? (
					<MoveDown
						onClick={() => setIsPositive(false)}
						className='mb-16 -mr-16 text-black'
						size={250}
					/>
				) : (
					<MoveUp
						onClick={() => setIsPositive(true)}
						className='mb-16 -mr-16 text-black'
						size={250}
					/>
				)}
				<input
					className={cn(
						'w-min h-full text-center field-sizing-content text-[20rem] focus:outline-0',
					)}
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<input
					value={postfix}
					onChange={(e) => setPostfix(e.target.value)}
					className='field-sizing-content focus:outline-0'
				/>
			</div>
			<div className='-mt-36 w-full font-bold text-center uppercase text-[4rem]'>
				<input
					value={valueType}
					onChange={(e) => setValueType(e.target.value)}
					className='text-center uppercase field-sizing-content focus:outline-0'
				/>
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
					'font-medium',
				)}
			>
				<input
					value={info}
					onChange={(e) => setInfo(e.target.value)}
					className='py-2 px-36 text-center hover:bg-gray-600 field-sizing-content focus:outline-0'
				/>
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
