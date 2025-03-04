'use client'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

export const SaveButton = ({
  className,
  props,
  isSaving,
  name = 'Save',
  savingText = '',
}: {
  className?: string
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
  isSaving: boolean
  name?: string
  savingText?: string
}) => {
  return (
    <Button
      className={cn('relative min-w-[100px]', className)}
      {...props}
      disabled={isSaving}
    >
      {isSaving ? savingText : name}
      {isSaving ? (
        <div className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
          <Loader2
            size={16}
            className='animate-spin'
          />
        </div>
      ) : null}
    </Button>
  )
}
