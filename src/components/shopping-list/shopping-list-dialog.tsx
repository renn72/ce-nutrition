'use client'

import { api } from '@/trpc/react'

import type { GetShoppingList } from '@/types'
import { ShoppingCart } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { ShoppingListView } from '@/components/shopping-list/shopping-list-view'

type ActiveShoppingList = NonNullable<GetShoppingList>

const ShoppingListDialog = ({
  userId,
  userName,
}: {
  userId: string
  userName?: string | null
}) => {
  const { data: shoppingList } = api.shoppingList.getActive.useQuery({ userId })

  const remainingCount =
    shoppingList?.items.filter(
      (item: ActiveShoppingList['items'][number]) => !item.isChecked,
    ).length ?? 0
  const hasItems = (shoppingList?.items.length ?? 0) > 0

  if (!hasItems) return null

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size='icon'
          className='fixed right-4 bottom-20 z-40 h-14 w-14 rounded-full shadow-lg md:bottom-6'
        >
          <ShoppingCart className='h-6 w-6' />
          <span className='sr-only'>Open shopping list</span>
          <span className='absolute -top-1 -right-1 rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground'>
            {remainingCount}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className='top-0 left-0 flex h-[100svh] max-h-[100svh] min-h-0 w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-hidden rounded-none border-0 p-0 sm:rounded-none'>
        <DialogHeader className='sr-only'>
          <DialogTitle>Shopping list</DialogTitle>
          <DialogDescription>
            Review, tick off, and email your shopping list.
          </DialogDescription>
        </DialogHeader>
        <ShoppingListView
          userId={userId}
          userName={userName}
          showPageLink={true}
          isFullHeight={true}
          useInternalScroll={true}
        />
      </DialogContent>
    </Dialog>
  )
}

export { ShoppingListDialog }
