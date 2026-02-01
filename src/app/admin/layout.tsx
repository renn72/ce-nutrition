import { auth } from '@/server/auth'
import { SignIn } from '@/components/auth/sign-in'

import { AdminSidebar } from './_sidebar/sidebar'

import { redirect } from 'next/navigation'

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const session = await auth()

	if (!session?.user.id)
		return (
			<>
				<div className='flex flex-col gap-2 justify-center items-center w-full h-screen'>
					<SignIn />
				</div>
			</>
		)

	if (!session?.user.isTrainer) redirect('/')

	return (
		<>
			<AdminSidebar>{children}</AdminSidebar>
		</>
	)
}
