'use client'
import { useRouter } from 'next/navigation'

import { api } from '@/trpc/react'

import type { GetIngredientById } from '@/types'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
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
  const ctx = api.useUtils()
  const { mutate: deleteIngredient } = api.ingredient.delete.useMutation({
    onSuccess: () => {
      ctx.ingredient.invalidate()
      toast.success('Ingredient deleted successfully')
    },
  })
  const { mutate: updateHiddenAt } = api.ingredient.updateHiddenAt.useMutation({
    onSuccess: () => {
      ctx.ingredient.invalidate()
      toast.success('Ingredient hidden successfully')
    },
  })
  const { mutate: deleteHiddenAt } =
    api.ingredient.deleteHiddenAt.useMutation({
      onSuccess: () => {
        ctx.ingredient.invalidate()
        toast.success('Ingredient unhidden successfully')
      },
    })

  const data = row.original as GetIngredientById


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
          onSelect={() =>
            router.push(`/admin/ingredient/edit?ingredient=${data?.id}`)
          }
        >Edit</DropdownMenuItem>
        {
          data?.hiddenAt ? (
            <DropdownMenuItem
              onSelect={() => deleteHiddenAt({ id: data?.id || 0 })}
            >
              Unhide
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={() => updateHiddenAt({ id: data?.id || 0 })}
            >
              Hide
            </DropdownMenuItem>
          )
        }
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => deleteIngredient({ id: row.getValue('id') })}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
