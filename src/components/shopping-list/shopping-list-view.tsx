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

const shoppingListAccentStyles = {
  header: 'bg-sky-500/[0.045]',
  stat: 'border-sky-500/15 bg-sky-500/[0.09]',
  statText: 'text-sky-700/80 dark:text-sky-300/80',
  section: 'border-sky-500/12 bg-sky-500/[0.04]',
  pill: 'border-sky-500/15 bg-sky-500/[0.1] text-sky-700 dark:text-sky-300',
} as const

const formatShoppingTextList = (value?: string | null, separator = ', ') =>
  (value ?? '')
    .split('\n')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .join(separator)

const SummaryChip = ({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold leading-none',
        'border-border/60 bg-background/90 text-foreground',
        className,
      )}
    >
      <span className='uppercase opacity-70 tracking-[0.14em]'>{label}</span>
      <span>{value}</span>
    </div>
  )
}

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
      <Card className='gap-0 overflow-hidden rounded-[24px] border-border/70 shadow-sm'>
        <CardHeader className='gap-3 border-b border-border/60 bg-muted/25 px-3 py-3'>
          <div className='flex flex-col gap-3'>
            <div className='space-y-1'>
              <div className='font-semibold uppercase text-[10px] tracking-[0.16em] text-muted-foreground'>
                Previous list
              </div>
              <CardTitle className='text-base font-semibold tracking-tight text-foreground/85'>
                {list.name}
              </CardTitle>
              <div className='mt-1 flex flex-wrap gap-1.5'>
                <SummaryChip
                  label='Items'
                  value={String(list.items.length)}
                />
                <SummaryChip
                  label='Updated'
                  value={formatDate(list.updatedAt ?? list.createdAt, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                />
              </div>
            </div>
            <div className='flex flex-wrap gap-1.5'>
              <CollapsibleTrigger asChild>
                <Button
                  size='sm'
                  variant='outline'
                  className='h-8 rounded-full border-border/70 bg-background/90 px-3 text-xs font-semibold shadow-none'
                >
                  Ingredients
                  <ChevronDown
                    className={cn(
                      'ml-1.5 h-4 w-4 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </Button>
              </CollapsibleTrigger>
              <Button
                size='sm'
                variant='outline'
                className='h-8 rounded-full border-border/70 bg-background/90 px-3 text-xs font-semibold shadow-none'
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
                className='h-8 w-8 rounded-full text-muted-foreground'
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
          <CardContent className='bg-card px-3 py-3'>
            {list.items.length > 0 ? (
              <div className='space-y-2'>
                {list.items.map((item) => (
                  <div
                    key={item.id}
                    className='rounded-[20px] border border-border/70 bg-background/90 px-3 py-2.5 text-sm shadow-sm'
                  >
                    <div className='flex items-start justify-between gap-2'>
                      <div
                        className={cn(
                          'min-w-0 flex-1 font-medium',
                          item.isChecked &&
                            'text-muted-foreground line-through',
                        )}
                      >
                        {item.name}
                      </div>
                      <div className='shrink-0 rounded-full border border-border/60 bg-muted/50 px-2.5 py-1 text-[11px] font-semibold'>
                        {formatShoppingQuantity(item.amount, item.unit)}
                      </div>
                    </div>
                    {item.source ? (
                      <div className='mt-1 text-xs text-muted-foreground'>
                        From {formatShoppingTextList(item.source)}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className='rounded-[20px] border border-dashed border-border/70 bg-background/90 px-3 py-3 text-sm text-muted-foreground'>
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
    <div className='border-t border-border/60 px-3 py-3'>
      <div className='mb-3 font-semibold uppercase text-[10px] tracking-[0.16em] text-muted-foreground'>
        Previous lists
      </div>
      <div className='space-y-3'>
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
  const remainingCount =
    shoppingList?.items.filter((item) => !item.isChecked).length ?? 0
  const totalCount = shoppingList?.items.length ?? 0
  const updatedLabel =
    shoppingList?.updatedAt || shoppingList?.createdAt
      ? formatDate(shoppingList.updatedAt ?? shoppingList.createdAt, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : null

  const addIngredientForm =
    allowItemEditing && showHistory ? (
      <div className='border-t border-border/60 px-3 py-3'>
        <div className='rounded-[24px] border border-border/70 bg-card px-3 py-3 shadow-sm'>
          <div className='space-y-1'>
            <div className='font-semibold uppercase text-[10px] tracking-[0.16em] text-muted-foreground'>
              Add ingredient
            </div>
            <div className='text-sm font-semibold tracking-tight text-foreground/85'>
              Add custom items
            </div>
            <div className='text-xs leading-5 text-muted-foreground'>
              Add extra items that are not part of your recipe library.
            </div>
          </div>
          <div className='mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_110px_120px_auto]'>
            <Input
              value={newItemName}
              placeholder='Ingredient name'
              className='h-10 rounded-2xl border-border/70 bg-background/90'
              onChange={(event) => setNewItemName(event.target.value)}
            />
            <Input
              type='number'
              min='0'
              step='0.25'
              value={newItemAmount}
              placeholder='Amount'
              className='h-10 rounded-2xl border-border/70 bg-background/90'
              onChange={(event) => setNewItemAmount(event.target.value)}
            />
            <Input
              value={newItemUnit}
              placeholder='Unit'
              className='h-10 rounded-2xl border-border/70 bg-background/90'
              onChange={(event) => setNewItemUnit(event.target.value)}
            />
            <Button
              className='h-10 rounded-2xl'
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
      </div>
    ) : null

  const body = isLoading ? (
    <div className='p-3'>
      <div className='flex flex-col items-center justify-center gap-4 rounded-[26px] border border-border/70 bg-card px-6 py-16 text-center shadow-sm'>
        <div className='rounded-full border border-sky-500/15 bg-sky-500/[0.08] p-4'>
          <LoaderCircle className='h-8 w-8 animate-spin text-sky-700/80 dark:text-sky-300/80' />
        </div>
        <div className='text-sm text-muted-foreground'>
          Loading shopping list...
        </div>
      </div>
    </div>
  ) : shoppingList ? (
    shoppingList.items.length > 0 ? (
      <div className='flex flex-col gap-2.5 p-3'>
        {shoppingList.items.map((item: ShoppingListItemRecord) => (
          <div
            key={item.id}
            className={cn(
              'rounded-[24px] border px-3 py-3 shadow-sm transition-colors',
              item.isChecked
                ? 'border-border/60 bg-muted/35'
                : shoppingListAccentStyles.section,
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
                className='mt-0.5 border-border/70 data-[state=checked]:border-sky-500/35 data-[state=checked]:bg-sky-500/90 data-[state=checked]:text-white'
              />
              <div className='min-w-0 flex-1'>
                <div className='flex items-start justify-between gap-2'>
                  <div className='min-w-0 flex-1'>
                    <div
                      className={cn(
                        'text-sm font-semibold leading-5 text-foreground/85',
                        item.isChecked && 'text-muted-foreground line-through',
                      )}
                    >
                      {item.name}
                    </div>
                  </div>
                  <div
                    className={cn(
                      'shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                      item.isChecked
                        ? 'border-border/60 bg-background/90 text-muted-foreground'
                        : shoppingListAccentStyles.pill,
                    )}
                  >
                    {formatShoppingQuantity(item.amount, item.unit)}
                  </div>
                </div>
                {item.source ? (
                  <div className='mt-1 text-xs leading-5 text-muted-foreground'>
                    From {formatShoppingTextList(item.source)}
                  </div>
                ) : null}
                {item.note ? (
                  <div className='mt-1 text-xs leading-5 text-muted-foreground'>
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
                <div className='mt-3 flex flex-wrap items-center justify-end gap-1.5'>
                  <Button
                    size='icon'
                    variant='outline'
                    className={cn(
                      'h-8 w-8 rounded-full border-border/70 bg-background/90 shadow-none',
                      editingItemId === item.id &&
                        'border-sky-500/20 bg-sky-500/[0.12] text-sky-700 dark:text-sky-300',
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
                    className='h-8 w-8 rounded-full text-muted-foreground'
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
                  <div className='mt-3 rounded-[20px] border border-border/70 bg-background/90 p-2.5 shadow-sm'>
                    <div className='grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2'>
                      <Button
                        size='icon'
                        variant='outline'
                        className='h-10 w-10 rounded-2xl border-border/70 bg-background shadow-none'
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
                        className='min-w-[120px] h-10 flex-1 rounded-2xl border-border/70 bg-background'
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
                        className='h-10 w-10 rounded-2xl border-border/70 bg-background shadow-none'
                        onClick={() =>
                          void handleAdjustItemAmount(item, 'increase')
                        }
                        disabled={updateItemAmount.isPending}
                      >
                        <Plus className='h-4 w-4' />
                      </Button>
                      <div className='col-start-2 col-end-4 flex flex-wrap gap-2 pt-1'>
                        <Button
                          size='sm'
                          className='h-8 rounded-full px-3'
                          onClick={() => void handleSaveItemAmount(item)}
                          disabled={updateItemAmount.isPending}
                        >
                          Save
                        </Button>
                        <Button
                          size='sm'
                          variant='ghost'
                          className='h-8 rounded-full px-3'
                          onClick={() => setEditingItemId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : null}
          </div>
        ))}
      </div>
    ) : (
      <div className='p-3'>
        <div className='flex flex-col items-center justify-center gap-4 rounded-[26px] border border-border/70 bg-card px-6 py-16 text-center shadow-sm'>
          <div className='rounded-full border border-sky-500/15 bg-sky-500/[0.08] p-4'>
            <ShoppingCart className='h-8 w-8 text-sky-700/80 dark:text-sky-300/80' />
          </div>
          <div className='space-y-1'>
            <div className='font-semibold tracking-tight text-foreground/85'>
              This shopping list is empty
            </div>
            <div className='text-sm leading-6 text-muted-foreground'>
              Add a recipe from your program, start a new list, or add
              ingredients manually.
            </div>
          </div>
          <Button
            asChild
            variant='outline'
            className='h-10 rounded-full border-border/70 bg-background/90 px-4'
          >
            <Link href='/user/program'>Open program</Link>
          </Button>
        </div>
      </div>
    )
  ) : (
    <div className='p-3'>
      <div className='flex flex-col items-center justify-center gap-4 rounded-[26px] border border-border/70 bg-card px-6 py-16 text-center shadow-sm'>
        <div className='rounded-full border border-sky-500/15 bg-sky-500/[0.08] p-4'>
          <ShoppingCart className='h-8 w-8 text-sky-700/80 dark:text-sky-300/80' />
        </div>
        <div className='space-y-1'>
          <div className='font-semibold tracking-tight text-foreground/85'>
            No active shopping list
          </div>
          <div className='text-sm leading-6 text-muted-foreground'>
            Add a recipe from your program, create a new list, or add
            ingredients manually.
          </div>
        </div>
        <div className='flex flex-wrap justify-center gap-2'>
          {showHistory ? (
            <Button
              className='h-10 rounded-full px-4'
              onClick={() => void handleCreateNewList()}
            >
              <Plus className='mr-2 h-4 w-4' />
              Create list
            </Button>
          ) : null}
          <Button
            asChild
            variant='outline'
            className='h-10 rounded-full border-border/70 bg-background/90 px-4'
          >
            <Link href='/user/program'>Open program</Link>
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <Card
      className={cn(
        'gap-0 overflow-hidden border-border/70 shadow-sm',
        isFullHeight && 'h-full min-h-0 rounded-none border-0 shadow-none',
        !isFullHeight && 'rounded-[28px]',
        className,
      )}
    >
      <CardHeader
        className={cn(
          'shrink-0 gap-3 border-b border-border/60 px-3 py-4',
          shoppingListAccentStyles.header,
          isFullHeight && 'pt-[max(1rem,env(safe-area-inset-top))]',
        )}
      >
        <div className='flex flex-col gap-3'>
          <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
            <div className='min-w-0 space-y-1'>
              <div className='font-semibold uppercase text-[10px] tracking-[0.16em] text-muted-foreground'>
                Shopping list
              </div>
              <CardTitle className='flex items-center gap-2 text-lg font-bold tracking-tight text-foreground/85'>
                <ShoppingCart className='h-5 w-5' />
                <span className='truncate'>
                  {shoppingList?.name ?? 'Shopping List'}
                </span>
              </CardTitle>
              <div className='text-xs leading-5 text-muted-foreground'>
                {isLoading ? (
                  'Loading shopping list...'
                ) : hasItems ? (
                  <>
                    <span>{remainingCount} left to buy</span>
                    <span className='mx-2'>•</span>
                    <span>{totalCount} total items</span>
                    {updatedLabel ? (
                      <>
                        <span className='mx-2'>•</span>
                        <span>Updated {updatedLabel}</span>
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
            <div className='flex flex-wrap gap-1.5'>
              {showPageLink ? (
                <Button
                  asChild
                  variant='outline'
                  size='sm'
                  className='h-8 rounded-full border-border/70 bg-background/90 px-3 text-xs font-semibold shadow-none'
                >
                  <Link href='/user/shopping-list'>Open page</Link>
                </Button>
              ) : null}
              {allowItemEditing && showHistory && partner ? (
                <Button
                  size='sm'
                  variant='outline'
                  className='h-8 rounded-full border-border/70 bg-background/90 px-3 text-xs font-semibold shadow-none'
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
                  className='h-8 rounded-full border-border/70 bg-background/90 px-3 text-xs font-semibold shadow-none'
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
                className='h-8 rounded-full border-border/70 bg-background/90 px-3 text-xs font-semibold shadow-none'
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
                className='h-8 rounded-full px-3 text-xs font-semibold'
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
          <div className='grid grid-cols-2 gap-2'>
            <div
              className={cn(
                'rounded-2xl border px-2.5 py-1.5',
                shoppingListAccentStyles.stat,
              )}
            >
              <div
                className={cn(
                  'uppercase text-[10px] tracking-[0.14em]',
                  shoppingListAccentStyles.statText,
                )}
              >
                {showHistory ? 'Active items' : 'Left to buy'}
              </div>
              <div className='mt-1 text-sm font-semibold'>
                {showHistory ? totalCount : remainingCount}
              </div>
            </div>
            <div className='rounded-2xl border border-border/60 bg-background/90 px-2.5 py-1.5'>
              <div className='uppercase text-[10px] tracking-[0.14em] text-muted-foreground'>
                {showHistory ? 'Saved lists' : 'Total items'}
              </div>
              <div className='mt-1 text-sm font-semibold'>
                {showHistory ? historicalLists.length : totalCount}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={cn(
          'bg-muted/[0.18] p-0',
          isFullHeight && useInternalScroll && 'flex min-h-0 flex-1 flex-col',
        )}
      >
        {useInternalScroll ? (
          <ScrollArea
            className={cn(isFullHeight ? 'min-h-0 flex-1' : 'h-[70svh]')}
          >
            {body}
            {addIngredientForm}
            {showHistory ? (
              <ShoppingListHistory
                lists={historicalLists}
                onDuplicate={(listId) => void handleDuplicateList(listId)}
                onDelete={(listId) => void handleDeleteHistoricalList(listId)}
                isDuplicating={duplicateList.isPending}
                deletingListId={deletingHistoryListId}
              />
            ) : null}
          </ScrollArea>
        ) : (
          <>
            {body}
            {addIngredientForm}
            {showHistory ? (
              <ShoppingListHistory
                lists={historicalLists}
                onDuplicate={(listId) => void handleDuplicateList(listId)}
                onDelete={(listId) => void handleDeleteHistoricalList(listId)}
                isDuplicating={duplicateList.isPending}
                deletingListId={deletingHistoryListId}
              />
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export { ShoppingListView }
