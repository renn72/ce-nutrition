'use client'

import { useSearchParams } from 'next/navigation'
import { UserGallery } from '@/components/images-2/user-gallery'

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

	return <UserGallery userId={userId} isAdmin={true} />
}
