'use client'
import { useRouter } from 'next/navigation'

import { api } from '@/trpc/react'

import type { GetSupplementById, } from '@/types'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import type { Row } from '@tanstack/react-table'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {

  const router = useRouter()
  const data = row.original as GetSupplementById


  return (
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
        <DropdownMenuItem
          onClick={() => {
            router.push(`/admin/supplement/edit?ingredient=${data.id}`)
          }}
        >Edit</DropdownMenuItem>
        {
          data?.hiddenAt ? (
            <DropdownMenuItem
            >
              Unhide
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
            >
              Hide
            </DropdownMenuItem>
          )
        }
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
