'use client'

import { api } from '@/trpc/react'

import { useRouter } from 'next/navigation'

import { GetRecipeById } from '@/types'
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
  const { mutate: deleteRecipe } = api.recipe.delete.useMutation({
    onSuccess: () => {
      ctx.recipe.invalidate()
      toast.success('Deleted successfully')
    },
  })
  const data = row.original as GetRecipeById
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
            router.push(`/admin/base/recipe/edit?recipe=${data?.id}`)
          }
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => deleteRecipe({ id: row.getValue('id') })}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
