'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const SaveButton = ({
  className,
  isSaving,
  name = 'Save',
  savingText = '',
  variant = 'default',
  size = 'default',
  onClick = () => {},
  props,
}: {
  className?: string
  isSaving: boolean
  name?: string
  savingText?: string
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'link'
    | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) => {
  return (
    <Button
      className={cn('relative min-w-[100px]', className)}
      variant={variant}
      size={size}
      disabled={isSaving}
      onClick={onClick}
      {...props}
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
