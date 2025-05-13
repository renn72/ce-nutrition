'use client'

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { MixerHorizontalIcon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

const columMap = {
  id: 'ID',
  createdAt: 'Created',
  date: 'Date',
  bodyWeight: 'Body Weight',
  bodyFat: 'Body Fat',
  leanMass: 'Lean Mass',
  chin: 'Chin',
  cheek: 'Cheek',
  lowerAbdominal: 'Lower Abdominal',
  pectoral: 'Pectoral',
  biceps: 'Biceps',
  triceps: 'Triceps',
  subscapular: 'Subscapular',
  midAxillary: 'Mid Axillary',
  suprailiac: 'Suprailiac',
  umbilical: 'Umbilical',
  lowerBack: 'Lower Back',
  quadriceps: 'Quadriceps',
  hamstrings: 'Hamstrings',
  medialCalf: 'Medial Calf',
  knee: 'Knee',
  shoulder: 'Shoulder',
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className='ml-auto h-8 lg:flex'
        >
          <MixerHorizontalIcon className='mr-2 h-4 w-4' />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[250px]'
      >
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {columMap[column.id as keyof typeof columMap]}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
