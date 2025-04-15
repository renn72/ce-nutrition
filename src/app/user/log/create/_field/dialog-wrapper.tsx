'use client'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import {
  ArrowDownIcon,
  ArrowUpIcon,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

const DialogWrapper = ({
  children,
  title,
  value,
  prevValue,
  isWidthFull = false,
  fixed = 0,
  isString = false,
  postfix = '',
}: {
  children: React.ReactNode
  title: string
  value: string
  prevValue: string
  isWidthFull?: boolean
  fixed?: number
  isString?: boolean
  postfix?: string
}) => {
  const diff = Number(prevValue) - Number(value)
  const [isOpen, setIsOpen] = useState(false)
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <div
          className={cn(
            'flex gap-1 items-center justify-around flex-col bg-secondary px-2 py-2 rounded-md shadow-sm',
            'active:scale-90 active:shadow-none transition-transform cursor-pointer',
            isOpen ? 'scale-90 shadow-none' : '',
            isWidthFull ? 'w-full min-w-[300px]' : 'w-28 font-semibold',
          )}
        >
          <div className='text-muted-foreground text-center leading-5'>{title}</div>
          {value !== '' && value !== undefined && value !== null ? (
            <div
              className={cn(
                'relative',
                isWidthFull ? 'text-sm first-letter:capitalize' : '',
              )}
            >
              {postfix !== '' ? (
                <div className='absolute right-[-2.5rem] top-1/2 -translate-y-1/2 text-xs text-secondary-foreground flex gap-0 items-start'>
                  {postfix}
                </div>
              ) : null}
              {isString ? value : Number(value).toFixed(fixed)}
              {prevValue !== '' &&
              prevValue !== undefined &&
              prevValue !== null ? (
                <div className='absolute right-[-2.1rem] top-1/2 -translate-y-1/2 text-[0.7rem] text-secondary-foreground flex gap-0 items-start'>
                  {diff === 0 ? null : diff < 0 ? (
                    <ArrowUpIcon size={12} />
                  ) : (
                    <ArrowDownIcon size={12} />
                  )}
                  {Math.abs(diff).toFixed(fixed)}
                </div>
              ) : null}
            </div>
          ) : (
            <div className='text-muted-foreground'>...</div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent
        className='top-20 translate-y-0 rounded-xl py-8 '
        onOpenAutoFocus={(e) => {
          e.preventDefault()
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  )
}

export { DialogWrapper }
