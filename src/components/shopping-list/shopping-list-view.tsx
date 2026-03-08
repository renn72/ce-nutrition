'use client'

import { api } from '@/trpc/react'

import {
  formatShoppingQuantity,
  getShoppingAmountStep,
  toShoppingAmountNumber,
} from '@/lib/shopping-list'
import { cn, formatDate } from '@/lib/utils'
import type { GetShoppingList, GetShoppingLists } from '@/types'
import {
  Copy,
  LoaderCircle,
  Mail,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'

type ShoppingListRecord = NonNullable<GetShoppingList>
type ShoppingListItemRecord = ShoppingListRecord['items'][number]

const formatShoppingTextList = (value?: string | null, separator = ', ') =>
  (value ?? '')
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join(separator)

const ShoppingListHistory = ({
  lists,
  onDuplicate,
  isDuplicating,
}: {
  lists: GetShoppingLists
  onDuplicate: (listId: number) => void
  isDuplicating: boolean
}) => {
  if (lists.length === 0) return null

  return (
    <div className='border-t p-4 space-y-3'>
      <div className='text-sm font-semibold'>Previous Lists</div>
      {lists.map((list) => (
        <Card
          key={list.id}
          className='gap-0'
        >
          <CardHeader className='gap-3 border-b py-4'>
            <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
              <div className='space-y-1'>
                <CardTitle className='text-base'>{list.name}</CardTitle>
                <div className='text-xs text-muted-foreground'>
                  {list.items.length} items
                  <span className='mx-2'>•</span>
                  Updated{' '}
                  {formatDate(list.updatedAt ?? list.createdAt, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
              <Button
                size='sm'
                variant='outline'
                onClick={() => onDuplicate(list.id)}
                disabled={isDuplicating}
              >
                {isDuplicating ? (
                  <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Copy className='mr-2 h-4 w-4' />
                )}
                Duplicate
              </Button>
            </div>
          </CardHeader>
          <CardContent className='p-4'>
            {list.items.length > 0 ? (
              <div className='space-y-2'>
                {list.items.map((item) => (
                  <div
                    key={item.id}
                    className='rounded-xl border px-3 py-2 text-sm'
                  >
                    <div
                      className={cn(
                        'font-medium',
                        item.isChecked && 'text-muted-foreground line-through',
                      )}
                    >
                      {formatShoppingQuantity(item.amount, item.unit)}{' '}
                      {item.name}
                    </div>
                    {item.source ? (
                      <div className='text-xs text-muted-foreground'>
                        From {formatShoppingTextList(item.source)}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-sm text-muted-foreground'>
                This list does not contain any ingredients.
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

const ShoppingListView = ({
  userId,
  userName,
  className,
  showPageLink = false,
  isFullHeight = false,
  useInternalScroll = false,
  allowItemEditing = false,
  showHistory = false,
}: {
  userId: string
  userName?: string | null
  className?: string
  showPageLink?: boolean
  isFullHeight?: boolean
  useInternalScroll?: boolean
  allowItemEditing?: boolean
  showHistory?: boolean
}) => {
  const utils = api.useUtils()
  const activeListQuery = api.shoppingList.getActive.useQuery(
    { userId },
    { enabled: !showHistory },
  )
  const allListsQuery = api.shoppingList.getAllForUser.useQuery(
    { userId },
    { enabled: showHistory },
  )

  const shoppingList = showHistory
    ? (allListsQuery.data?.find((list) => list.isActive) ?? null)
    : (activeListQuery.data ?? null)

  const historicalLists = showHistory
    ? (allListsQuery.data?.filter((list) => !list.isActive) ?? [])
    : []

  const invalidateShoppingLists = async () => {
    await Promise.all([
      utils.shoppingList.getActive.invalidate({ userId }),
      utils.shoppingList.getAllForUser.invalidate({ userId }),
    ])
  }

  const emailShoppingList = api.shoppingList.email.useMutation({
    onSuccess: async () => {
      toast.success('Shopping list emailed')
      await invalidateShoppingLists()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteList = api.shoppingList.deleteList.useMutation({
    onSuccess: async () => {
      toast.success('Shopping list deleted')
      await invalidateShoppingLists()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const createNewList = api.shoppingList.createNew.useMutation({
    onSuccess: async () => {
      toast.success('Started a new shopping list')
      await invalidateShoppingLists()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const duplicateList = api.shoppingList.duplicate.useMutation({
    onSuccess: async () => {
      toast.success('Previous list duplicated into a new active list')
      await invalidateShoppingLists()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const setItemChecked = api.shoppingList.setItemChecked.useMutation({
    onSuccess: async () => {
      await invalidateShoppingLists()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const updateItemAmount = api.shoppingList.updateItemAmount.useMutation({
    onSuccess: async () => {
      await invalidateShoppingLists()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const deleteItem = api.shoppingList.deleteItem.useMutation({
    onSuccess: async () => {
      await invalidateShoppingLists()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleEmailList = async () => {
    if (!shoppingList || shoppingList.items.length === 0) {
      toast.error('Add items to your shopping list first')
      return
    }

    await emailShoppingList.mutateAsync({
      listId: shoppingList.id,
    })
  }

  const handleCreateNewList = async () => {
    await createNewList.mutateAsync({
      userId,
    })
  }

  const handleDuplicateList = async (listId: number) => {
    await duplicateList.mutateAsync({
      listId,
    })
  }

  const handleDeleteCurrentList = async () => {
    if (!shoppingList) return

    await deleteList.mutateAsync({
      listId: shoppingList.id,
    })
  }

  const handleAdjustItemAmount = async (
    item: ShoppingListRecord['items'][number],
    direction: 'increase' | 'decrease',
  ) => {
    const step = getShoppingAmountStep(item.unit)
    const currentAmount = toShoppingAmountNumber(item.amount)
    if (direction === 'decrease' && currentAmount <= step) {
      return
    }
    const nextAmount =
      direction === 'increase' ? currentAmount + step : currentAmount - step

    await updateItemAmount.mutateAsync({
      itemId: item.id,
      amount: nextAmount,
    })
  }

  const isLoading = showHistory
    ? allListsQuery.isLoading
    : activeListQuery.isLoading
  const hasItems = (shoppingList?.items.length ?? 0) > 0

  const body = isLoading ? (
    <div className='flex flex-col gap-4 justify-center items-center py-16 px-6 text-center'>
      <LoaderCircle className='h-8 w-8 animate-spin text-muted-foreground' />
      <div className='text-sm text-muted-foreground'>
        Loading shopping list...
      </div>
    </div>
  ) : shoppingList ? (
    shoppingList.items.length > 0 ? (
      <div className='flex flex-col gap-3 p-4'>
        {shoppingList.items.map((item: ShoppingListItemRecord) => (
          <div
            key={item.id}
            className={cn(
              'rounded-2xl border p-4 transition-colors',
              item.isChecked && 'border-dashed bg-muted/40',
            )}
          >
            <div className='flex gap-3 items-start'>
              <Checkbox
                checked={item.isChecked}
                onCheckedChange={(checked) =>
                  setItemChecked.mutate({
                    itemId: item.id,
                    checked: checked === true,
                  })
                }
                className='mt-1'
              />
              <div className='flex-1 space-y-1'>
                <div
                  className={cn(
                    'font-medium',
                    item.isChecked && 'text-muted-foreground line-through',
                  )}
                >
                  {formatShoppingQuantity(item.amount, item.unit)} {item.name}
                </div>
                {item.source ? (
                  <div className='text-xs text-muted-foreground'>
                    From {formatShoppingTextList(item.source)}
                  </div>
                ) : null}
                {item.note ? (
                  <div className='text-xs text-muted-foreground'>
                    {formatShoppingTextList(item.note, ' • ')}
                  </div>
                ) : null}
              </div>
            </div>
            {allowItemEditing ? (
              <div className='flex flex-wrap gap-2 items-center justify-end mt-3'>
                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => void handleAdjustItemAmount(item, 'decrease')}
                  disabled={
                    updateItemAmount.isPending ||
                    toShoppingAmountNumber(item.amount) <=
                      getShoppingAmountStep(item.unit)
                  }
                >
                  <Minus className='h-4 w-4' />
                </Button>
                <div className='min-w-[88px] rounded-md border px-3 py-2 text-center text-sm'>
                  {formatShoppingQuantity(item.amount, item.unit)}
                </div>
                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => void handleAdjustItemAmount(item, 'increase')}
                  disabled={updateItemAmount.isPending}
                >
                  <Plus className='h-4 w-4' />
                </Button>
                <Button
                  size='icon'
                  variant='ghost'
                  onClick={() =>
                    deleteItem.mutate({
                      itemId: item.id,
                    })
                  }
                  disabled={deleteItem.isPending}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    ) : (
      <div className='flex flex-col gap-4 justify-center items-center py-16 px-6 text-center'>
        <div className='p-4 rounded-full bg-muted'>
          <ShoppingCart className='w-8 h-8 text-muted-foreground' />
        </div>
        <div className='space-y-1'>
          <div className='font-medium'>This shopping list is empty</div>
          <div className='text-sm text-muted-foreground'>
            Add a recipe from your program or start a new list.
          </div>
        </div>
        <Button
          asChild
          variant='outline'
        >
          <Link href='/user/program'>Open program</Link>
        </Button>
      </div>
    )
  ) : (
    <div className='flex flex-col gap-4 justify-center items-center py-16 px-6 text-center'>
      <div className='p-4 rounded-full bg-muted'>
        <ShoppingCart className='w-8 h-8 text-muted-foreground' />
      </div>
      <div className='space-y-1'>
        <div className='font-medium'>No active shopping list</div>
        <div className='text-sm text-muted-foreground'>
          Add a recipe from your program, or create a new list from here.
        </div>
      </div>
      <div className='flex flex-wrap gap-2 justify-center'>
        {showHistory ? (
          <Button onClick={() => void handleCreateNewList()}>
            <Plus className='mr-2 h-4 w-4' />
            Create list
          </Button>
        ) : null}
        <Button
          asChild
          variant='outline'
        >
          <Link href='/user/program'>Open program</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <Card
      className={cn(
        'gap-0 overflow-hidden',
        isFullHeight && 'h-full min-h-0 rounded-none border-0 shadow-none',
        className,
      )}
    >
      <CardHeader className='gap-4 border-b px-4 py-2 shrink-0'>
        <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex gap-2 items-center text-xl'>
              <ShoppingCart className='w-5 h-5' />
              {shoppingList?.name ?? 'Shopping List'}
            </CardTitle>
            <div className='text-sm text-muted-foreground'>
              {isLoading ? (
                'Loading shopping list...'
              ) : hasItems ? (
                <>
                  <span>
                    {
                      shoppingList?.items.filter(
                        (item: ShoppingListItemRecord) => !item.isChecked,
                      ).length
                    }{' '}
                    left to buy
                  </span>
                  <span className='mx-2'>•</span>
                  <span>{shoppingList?.items.length ?? 0} total items</span>
                  {shoppingList?.updatedAt || shoppingList?.createdAt ? (
                    <>
                      <span className='mx-2'>•</span>
                      <span>
                        Updated{' '}
                        {formatDate(
                          shoppingList.updatedAt ?? shoppingList.createdAt,
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )}
                      </span>
                    </>
                  ) : null}
                </>
              ) : showHistory ? (
                `${historicalLists.length} previous lists saved`
              ) : (
                'Add recipes from your plan to build your list.'
              )}
            </div>
          </div>
          <div className='flex flex-wrap gap-1'>
            {showPageLink ? (
              <Button
                asChild
                variant='outline'
                size='sm'
              >
                <Link href='/user/shopping-list'>Open page</Link>
              </Button>
            ) : null}
            {showHistory ? (
              <Button
                size='sm'
                variant='outline'
                onClick={() => void handleCreateNewList()}
                disabled={createNewList.isPending}
              >
                {createNewList.isPending ? (
                  <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Plus className='mr-2 h-4 w-4' />
                )}
                New list
              </Button>
            ) : null}
            <Button
              size='sm'
              variant='outline'
              onClick={() => void handleDeleteCurrentList()}
              disabled={!shoppingList || deleteList.isPending}
            >
              {deleteList.isPending ? (
                <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Trash2 className='mr-2 h-4 w-4' />
              )}
              Delete list
            </Button>
            <Button
              size='sm'
              onClick={() => void handleEmailList()}
              disabled={
                !hasItems || emailShoppingList.isPending || !shoppingList
              }
            >
              {emailShoppingList.isPending ? (
                <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Mail className='mr-2 h-4 w-4' />
              )}
              Email list
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          'p-0',
          isFullHeight && useInternalScroll && 'flex min-h-0 flex-1 flex-col',
        )}
      >
        {useInternalScroll ? (
          <ScrollArea
            className={cn(isFullHeight ? 'min-h-0 flex-1' : 'h-[70svh]')}
          >
            {body}
            {showHistory ? (
              <ShoppingListHistory
                lists={historicalLists}
                onDuplicate={(listId) => void handleDuplicateList(listId)}
                isDuplicating={duplicateList.isPending}
              />
            ) : null}
          </ScrollArea>
        ) : (
          <>
            {body}
            {showHistory ? (
              <ShoppingListHistory
                lists={historicalLists}
                onDuplicate={(listId) => void handleDuplicateList(listId)}
                isDuplicating={duplicateList.isPending}
              />
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { ShoppingListView }
