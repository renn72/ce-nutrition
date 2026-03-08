'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import {
  formatShoppingQuantity,
  getShoppingAmountStep,
  toShoppingAmountNumber,
} from '@/lib/shopping-list'
import { cn, formatDate } from '@/lib/utils'
import type { GetShoppingList, GetShoppingLists } from '@/types'
import {
  ChevronDown,
  Copy,
  LoaderCircle,
  Mail,
  Minus,
  Plus,
  ShoppingCart,
  SquarePen,
  Trash2,
} from 'lucide-react'
import { Link } from 'next-view-transitions'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

type ShoppingListRecord = NonNullable<GetShoppingList>
type ShoppingListItemRecord = ShoppingListRecord['items'][number]
type ShoppingListPartner = {
  id: string
  name: string | null
} | null

const formatShoppingTextList = (value?: string | null, separator = ', ') =>
  (value ?? '')
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join(separator)

const ShoppingListHistoryCard = ({
  list,
  onDuplicate,
  onDelete,
  isDuplicating,
  isDeleting,
}: {
  list: GetShoppingLists[number]
  onDuplicate: (listId: number) => void
  onDelete: (listId: number) => void
  isDuplicating: boolean
  isDeleting: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Card className='gap-0'>
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
            <div className='flex flex-wrap gap-2'>
              <CollapsibleTrigger asChild>
                <Button
                  size='sm'
                  variant='outline'
                >
                  Ingredients
                  <ChevronDown
                    className={cn(
                      'ml-2 h-4 w-4 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
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
              <Button
                size='icon'
                variant='ghost'
                onClick={() => onDelete(list.id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <LoaderCircle className='h-4 w-4 animate-spin' />
                ) : (
                  <Trash2 className='h-4 w-4' />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
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
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}

const ShoppingListHistory = ({
  lists,
  onDuplicate,
  onDelete,
  isDuplicating,
  deletingListId,
}: {
  lists: GetShoppingLists
  onDuplicate: (listId: number) => void
  onDelete: (listId: number) => void
  isDuplicating: boolean
  deletingListId: number | null
}) => {
  if (lists.length === 0) return null

  return (
    <div className='space-y-3 border-t p-4'>
      <div className='text-sm font-semibold'>Previous Lists</div>
      {lists.map((list) => (
        <ShoppingListHistoryCard
          key={list.id}
          list={list}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
          isDuplicating={isDuplicating}
          isDeleting={deletingListId === list.id}
        />
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
  partner = null,
}: {
  userId: string
  userName?: string | null
  className?: string
  showPageLink?: boolean
  isFullHeight?: boolean
  useInternalScroll?: boolean
  allowItemEditing?: boolean
  showHistory?: boolean
  partner?: ShoppingListPartner
}) => {
  const utils = api.useUtils()
  const [editingItemId, setEditingItemId] = useState<number | null>(null)
  const [deletingHistoryListId, setDeletingHistoryListId] = useState<
    number | null
  >(null)
  const [amountDrafts, setAmountDrafts] = useState<Record<number, string>>({})
  const [newItemName, setNewItemName] = useState('')
  const [newItemAmount, setNewItemAmount] = useState('1')
  const [newItemUnit, setNewItemUnit] = useState('')

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

  const invalidateShoppingLists = async (additionalUserIds: string[] = []) => {
    const userIds = Array.from(
      new Set([userId, ...additionalUserIds.filter(Boolean)]),
    )

    await Promise.all(
      userIds.flatMap((currentUserId) => [
        utils.shoppingList.getActive.invalidate({ userId: currentUserId }),
        utils.shoppingList.getAllForUser.invalidate({ userId: currentUserId }),
      ]),
    )
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

  const mergeWithPartner = api.shoppingList.mergeWithPartner.useMutation({
    onSuccess: async (result) => {
      toast.success(
        partner?.name
          ? `Merged shopping list with ${partner.name}`
          : 'Merged shopping list with partner',
      )
      await invalidateShoppingLists(
        result.partnerUserId ? [result.partnerUserId] : [],
      )
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

  const addCustomItem = api.shoppingList.addCustomItem.useMutation({
    onSuccess: async () => {
      toast.success('Ingredient added to shopping list')
      setNewItemName('')
      setNewItemAmount('1')
      setNewItemUnit('')
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

  const handleDeleteHistoricalList = async (listId: number) => {
    setDeletingHistoryListId(listId)

    try {
      await deleteList.mutateAsync({
        listId,
      })
    } finally {
      setDeletingHistoryListId(null)
    }
  }

  const handleAdjustItemAmount = async (
    item: ShoppingListItemRecord,
    direction: 'increase' | 'decrease',
  ) => {
    const step = getShoppingAmountStep(item.unit)
    const currentAmount = toShoppingAmountNumber(item.amount)

    if (direction === 'decrease' && currentAmount <= step) {
      return
    }

    const nextAmount =
      direction === 'increase' ? currentAmount + step : currentAmount - step

    setAmountDrafts((currentDrafts) => ({
      ...currentDrafts,
      [item.id]: String(nextAmount),
    }))

    await updateItemAmount.mutateAsync({
      itemId: item.id,
      amount: nextAmount,
    })
  }

  const handleOpenAmountEditor = (item: ShoppingListItemRecord) => {
    setEditingItemId(item.id)
    setAmountDrafts((currentDrafts) => ({
      ...currentDrafts,
      [item.id]: String(item.amount),
    }))
  }

  const handleSaveItemAmount = async (item: ShoppingListItemRecord) => {
    const nextAmount = toShoppingAmountNumber(
      amountDrafts[item.id] ?? item.amount,
    )

    if (!Number.isFinite(nextAmount) || nextAmount <= 0) {
      toast.error('Enter an amount greater than 0')
      return
    }

    await updateItemAmount.mutateAsync({
      itemId: item.id,
      amount: nextAmount,
    })
    setEditingItemId(null)
  }

  const handleAddCustomItem = async () => {
    const amount = toShoppingAmountNumber(newItemAmount)

    if (newItemName.trim() === '') {
      toast.error('Enter an ingredient name')
      return
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      toast.error('Enter an amount greater than 0')
      return
    }

    await addCustomItem.mutateAsync({
      userId,
      name: newItemName.trim(),
      amount,
      unit: newItemUnit.trim(),
    })
  }

  const handleMergeWithPartner = async () => {
    if (!partner) return

    await mergeWithPartner.mutateAsync({
      userId,
    })
  }

  const isLoading = showHistory
    ? allListsQuery.isLoading
    : activeListQuery.isLoading
  const hasItems = (shoppingList?.items.length ?? 0) > 0

  const addIngredientForm =
    allowItemEditing && showHistory ? (
      <div className='space-y-3 border-t p-4'>
        <div className='space-y-1'>
          <div className='text-sm font-semibold'>Add ingredient</div>
          <div className='text-xs text-muted-foreground'>
            Add extra items that are not part of your recipe library.
          </div>
        </div>
        <div className='grid gap-2 md:grid-cols-[minmax(0,1fr)_110px_120px_auto]'>
          <Input
            value={newItemName}
            placeholder='Ingredient name'
            onChange={(event) => setNewItemName(event.target.value)}
          />
          <Input
            type='number'
            min='0'
            step='0.25'
            value={newItemAmount}
            placeholder='Amount'
            onChange={(event) => setNewItemAmount(event.target.value)}
          />
          <Input
            value={newItemUnit}
            placeholder='Unit'
            onChange={(event) => setNewItemUnit(event.target.value)}
          />
          <Button
            onClick={() => void handleAddCustomItem()}
            disabled={addCustomItem.isPending}
          >
            {addCustomItem.isPending ? (
              <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Plus className='mr-2 h-4 w-4' />
            )}
            Add item
          </Button>
        </div>
      </div>
    ) : null

  const body = isLoading ? (
    <div className='flex flex-col items-center justify-center gap-4 px-6 py-16 text-center'>
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
            <div className='flex items-start gap-3'>
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
              <Collapsible
                open={editingItemId === item.id}
                onOpenChange={(open) => {
                  if (open) {
                    handleOpenAmountEditor(item)
                    return
                  }

                  if (editingItemId === item.id) {
                    setEditingItemId(null)
                  }
                }}
              >
                <div className='mt-3 flex flex-wrap items-center justify-end gap-2'>
                  <Button
                    size='icon'
                    variant='outline'
                    className={cn(
                      editingItemId === item.id &&
                        'bg-accent text-accent-foreground',
                    )}
                    onClick={() => {
                      if (editingItemId === item.id) {
                        setEditingItemId(null)
                        return
                      }

                      handleOpenAmountEditor(item)
                    }}
                    aria-expanded={editingItemId === item.id}
                    aria-label={
                      editingItemId === item.id
                        ? 'Close ingredient editor'
                        : 'Open ingredient editor'
                    }
                  >
                    <SquarePen className='h-4 w-4' />
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
                <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'>
                  <div className='mt-3 grid gap-2 sm:grid-cols-[auto_minmax(0,140px)_auto_auto_auto]'>
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() =>
                        void handleAdjustItemAmount(item, 'decrease')
                      }
                      disabled={
                        updateItemAmount.isPending ||
                        toShoppingAmountNumber(item.amount) <=
                          getShoppingAmountStep(item.unit)
                      }
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                    <Input
                      type='number'
                      min='0'
                      step={item.unit === 'grams' ? '10' : '0.25'}
                      value={amountDrafts[item.id] ?? String(item.amount)}
                      onChange={(event) =>
                        setAmountDrafts((currentDrafts) => ({
                          ...currentDrafts,
                          [item.id]: event.target.value,
                        }))
                      }
                    />
                    <Button
                      size='icon'
                      variant='outline'
                      onClick={() =>
                        void handleAdjustItemAmount(item, 'increase')
                      }
                      disabled={updateItemAmount.isPending}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                    <Button
                      size='sm'
                      onClick={() => void handleSaveItemAmount(item)}
                      disabled={updateItemAmount.isPending}
                    >
                      Save
                    </Button>
                    <Button
                      size='sm'
                      variant='ghost'
                      onClick={() => setEditingItemId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : null}
          </div>
        ))}
      </div>
    ) : (
      <div className='flex flex-col items-center justify-center gap-4 px-6 py-16 text-center'>
        <div className='rounded-full bg-muted p-4'>
          <ShoppingCart className='h-8 w-8 text-muted-foreground' />
        </div>
        <div className='space-y-1'>
          <div className='font-medium'>This shopping list is empty</div>
          <div className='text-sm text-muted-foreground'>
            Add a recipe from your program, start a new list, or add ingredients
            manually.
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
    <div className='flex flex-col items-center justify-center gap-4 px-6 py-16 text-center'>
      <div className='rounded-full bg-muted p-4'>
        <ShoppingCart className='h-8 w-8 text-muted-foreground' />
      </div>
      <div className='space-y-1'>
        <div className='font-medium'>No active shopping list</div>
        <div className='text-sm text-muted-foreground'>
          Add a recipe from your program, create a new list, or add ingredients
          manually.
        </div>
      </div>
      <div className='flex flex-wrap justify-center gap-2'>
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
      <CardHeader className='shrink-0 gap-4 border-b px-4 py-2'>
        <div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
          <div className='space-y-1'>
            <CardTitle className='flex items-center gap-2 text-xl'>
              <ShoppingCart className='h-5 w-5' />
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
                <>
                  <span>{historicalLists.length} previous lists saved</span>
                  {partner ? (
                    <>
                      <span className='mx-2'>•</span>
                      <span>Partner linked: {partner.name ?? 'Partner'}</span>
                    </>
                  ) : null}
                </>
              ) : (
                `Add recipes from ${userName ?? 'your plan'} to build your list.`
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
            {allowItemEditing && showHistory && partner ? (
              <Button
                size='sm'
                variant='outline'
                onClick={() => void handleMergeWithPartner()}
                disabled={mergeWithPartner.isPending}
              >
                {mergeWithPartner.isPending ? (
                  <LoaderCircle className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <Copy className='mr-2 h-4 w-4' />
                )}
                Merge with {partner.name ?? 'partner'}
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
                onDelete={(listId) => void handleDeleteHistoricalList(listId)}
                isDuplicating={duplicateList.isPending}
                deletingListId={deletingHistoryListId}
              />
            ) : null}
            {addIngredientForm}
          </ScrollArea>
        ) : (
          <>
            {body}
            {showHistory ? (
              <ShoppingListHistory
                lists={historicalLists}
                onDuplicate={(listId) => void handleDuplicateList(listId)}
                onDelete={(listId) => void handleDeleteHistoricalList(listId)}
                isDuplicating={duplicateList.isPending}
                deletingListId={deletingHistoryListId}
              />
            ) : null}
            {addIngredientForm}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { ShoppingListView }
