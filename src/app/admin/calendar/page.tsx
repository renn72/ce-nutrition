'use client'

import { useSearchParams } from 'next/navigation'

import { Calendar } from './calendar'

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

	return (
		<div className='w-full min-h-[calc(100vh-80px]'>
			<Calendar />
		</div>
	)
}
