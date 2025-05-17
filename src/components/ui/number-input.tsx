'use client'

import { Minus, PlusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'

const NumberInput = ({
  value,
  setValue,
  fixed = 0,
  scale,
  postfix = '',
  isSmall = false,
  placeholder = '',
}: {
  value: number | null
  setValue: (value: number) => void
  fixed?: number
  scale: number
  postfix?: string
  isSmall?: boolean
  placeholder?: string
}) => {
  return (
    <div className={cn('w-60 relative border rounded-lg h-16 flex items-center shadow-sm',
      isSmall ? 'h-10 w-32' : '',
    )}>
      <Input
        placeholder={placeholder}
        className={cn('relative w-full text-xl font-medium rounded-lg text-center h-min border-none',
          ' focus-visible:ring-0 focus:border-none shadow-none py-0 active:border-none',
          isSmall ? 'text-sm' : '',
        )}
        type='number'
        value={value && value % 1 === 0 ? value : (value?.toFixed(fixed) ?? '')}
        onChange={(e) => {
          setValue(Number(e.target.value))
        }}
      />

      <div className='absolute right-16 top-1/2 -translate-y-1/2 text-xs text-muted-foreground flex gap-0 items-start pt-[2px]'>
        {postfix}
      </div>

      <div
        onClick={() => {
          if (!value) return
          setValue(value + scale)
        }}
        className='absolute right-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-l active:bg-primary/60 rounded-r-lg'
      >
        <div className={cn('h-16 w-14 flex items-center justify-center active:scale-75', isSmall ? 'w-10 h-10' : 'w-14')}>
          <PlusIcon size={isSmall ? 16 : 24} />
        </div>
      </div>
      <div
        onClick={() => {
          if (!value) return
          setValue(value - scale)
        }}
        className='absolute left-0 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start border-r active:bg-primary/30 rounded-l-lg'
      >
        <div className={cn('h-16 w-14 flex items-center justify-center active:scale-75', isSmall ? 'w-10 h-10' : 'w-14')}>
          <Minus size={isSmall ? 16 : 24} />
        </div>
      </div>
    </div>
  )
}

export { NumberInput }
