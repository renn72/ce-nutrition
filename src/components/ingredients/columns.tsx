'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import type { GetIngredientById } from '@/types'
import { Paperclip } from 'lucide-react'
import Image from 'next/image'

export const columns: ColumnDef<GetIngredientById>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='id'
      />
    ),
    cell: ({ row }) => <div className='w-min'>{row.getValue('id')}</div>,
    // enableSorting: false,
    // enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Name'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-[500px] truncate font-medium'>
            {row.getValue('name')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'case',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Case'
      />
    ),
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className='flex w-[200px] items-center truncate'>
              {row.getValue('case')}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className='w-min'>
            <div className='flex w-[200px] items-center'>
              {row.getValue('case')}
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'question',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Question'
      />
    ),
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className='flex w-[200px] items-center truncate'>
              {row.getValue('question')}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className='w-min'>
            <div className='flex w-[200px] items-center'>
              {row.getValue('question')}
            </div>
          </HoverCardContent>
        </HoverCard>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Type'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-min items-center truncate'>
          {row.getValue('type')}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'topics',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Topics'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[250px] flex-wrap items-center gap-1'>
          {row.original?.topics?.map((topic) => (
            <Badge
              key={topic.topic?.id}
              className=''
            >
              {topic.topic?.name}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, id, values) => {
      // @ts-ignore
      const topics = row.getValue(id)?.map((topic) => topic.topic?.name)
      if (!topics) return false
      let result = false
      for (const value of values) {
        if (topics.includes(value)) {
          result = true
        } else {
          result = false
          break
        }
      }
      return result
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Tags'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[250px] flex-wrap items-center gap-1'>
          {row.original?.tags?.map((tag) => (
            <Badge
              key={tag.tag?.id}
              className=''
            >
              {tag.tag?.name}
            </Badge>
          ))}
        </div>
      )
    },
    filterFn: (row, id, values) => {
      // @ts-ignore
      const tags = row.getValue(id)?.map((tag) => tag.tag?.name)
      if (!tags) return false
      let result = false
      for (const value of values) {
        if (tags.includes(value)) {
          result = true
        } else {
          result = false
          break
        }
      }
      return result
    },
  },
  {
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Image'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-min items-center truncate'>
          {row.original?.images && row.original?.images.length > 0 ? (
            <Popover>
              <PopoverTrigger>
                <Paperclip size={16} />
              </PopoverTrigger>
              <PopoverContent className='w-max'>
                {row.original?.images[0]?.image?.url ? (
                  <Image
                    src={row.original?.images[0]?.image?.url}
                    alt={row.original?.images[0].image.id.toString()}
                    width={200}
                    height={200}
                  />
                ) : null}
              </PopoverContent>
            </Popover>
          ) : (
            ''
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'pdf',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='PDF'
      />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-min items-center'>
          {row.original?.pdfs && row.original?.pdfs.length > 0 ? (
            <Popover>
              <PopoverTrigger>
                <Paperclip size={16} />
              </PopoverTrigger>
              <PopoverContent className='w-max'>
                {row.original?.pdfs[0]?.pdf?.url ? (
                  <PdfViewer
                    file={row.original?.pdfs[0]?.pdf?.url}
                  />
                ) : null}
              </PopoverContent>
            </Popover>
          ) : (
            ''
          )}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
