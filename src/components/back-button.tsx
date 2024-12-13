'use client'

import { useRouter } from 'next/navigation'

import { Undo2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

const BackButton = () => {
  const router = useRouter()

  return (
    <Button
      variant='outline'
      className='flex items-start w-24 gap-2'
      onClick={() => router.back()}
    >
      <Undo2 size={16} />
      <span>Back</span>
    </Button>
  )
}

export { BackButton }
