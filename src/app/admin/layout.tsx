import { getServerAuthSession } from '@/server/auth'

import { SignIn } from '@/components/auth/sign-in'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession()

  if (!session?.user.id)
    return (
      <>
        <div className='flex w-full h-screen flex-col items-center justify-center gap-2'>
        <SignIn />
        </div>
      </>
    )

  return <>{children}</>
}
