import { isMobileDevice } from '@/lib/is-mobile-server'

import { User } from '@/components/auth/user'
import { MobileFooter } from '@/components/layout/mobile-footer'
import { MobileHeader } from '@/components/layout/mobile-header'

const Mobile = ({
	children,
	isDesktop = false,
}: {
	children: React.ReactNode
	isDesktop?: boolean
}) => {
	return (
		<div className='flex flex-col gap-2 w-full min-h-[100svh] relative'>
			{isDesktop ? (
				<div className='absolute top-1 right-1 z-100'>
					<User />
				</div>
			) : (
				<MobileHeader />
			)}
			{children}
			{!isDesktop && <MobileFooter />}
		</div>
	)
}

export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const isMobile = await isMobileDevice()
	if (isMobile) {
		return <Mobile>{children}</Mobile>
	}

	return (
		<div className='flex flex-col items-center gap-2 '>
			<Mobile isDesktop={true}>{children}</Mobile>
		</div>
	)
}
