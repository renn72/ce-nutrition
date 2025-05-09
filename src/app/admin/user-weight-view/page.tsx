
'use client'

import { useSearchParams } from 'next/navigation'

const View = ({ userId }: { userId: string }) => {
  return (
    <div>View</div>
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

  return (
    <View
      userId={userId}
    />
  )
}
