'use client'

import { useState } from 'react'

import { api } from '@/trpc/react'

import { useRouter, useSearchParams } from 'next/navigation'

import { GetSkinfoldById } from '@/types'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { SkinfoldFormContent } from '../form'


interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [ isOpen, setIsOpen ] = useState(false)
  const searchParams = useSearchParams()
  const userId = searchParams.get('user')

  const { data: userSkinfolds } = api.metrics.getUserSkinfolds.useQuery(userId ?? '')

  const ctx = api.useUtils()
  const { mutate: deleteSkinfold } = api.metrics.deleteSkinfold.useMutation({
    onSuccess: () => {
      ctx.metrics.invalidate()
      toast.success('Skinfold deleted')
    },
    onSettled: () => {},
  })

  const data = row.original as GetSkinfoldById

  const skinfold = userSkinfolds?.find((skinfold) => skinfold.id === (Number(data?.id)))

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-[160px]'
        >
          <DialogTrigger asChild>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              if (!data) return
              if (!data.id) return
              deleteSkinfold(data.id)
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent
        className='w-full max-w-2xl'>
        {
          skinfold ? (
            <SkinfoldFormContent
              userId={userId ?? ''}
              bodyWeight={skinfold.bodyWeight?.[0]?.bodyWeight ?? ''}
              setIsOpen={setIsOpen}
              skinfold={skinfold}
            />
          ) : null
        }

      </DialogContent>


    </Dialog>
  )
}
