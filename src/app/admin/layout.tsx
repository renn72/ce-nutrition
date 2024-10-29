import { getServerAuthSession } from '@/server/auth'

import { SignIn } from '@/components/auth/sign-in'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession()

  console.log(session?.user.id)

  if (!session?.user.id)
    return (
      <>
        <div className='flex w-full h-screen h-screen flex-col items-center justify-center gap-2'>
        <SignIn />
        </div>
      </>
    )

  return <>{children}</>
}
