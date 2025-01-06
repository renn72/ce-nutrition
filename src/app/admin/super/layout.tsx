
import { auth } from '@/server/auth'

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()

  console.log('---------------session-------------', session)
  if (!session?.user?.isCreator)
    return <>Unauthorized</>

  return (
      <>
          {children}
      </>
  )
}
