'use client'

import { api } from '@/trpc/react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export default function AdminLogs() {
  const { data: logs } = api.user.getAdminLogs.useQuery()

  return (
    <div className='flex flex-col gap-2 mt-16 w-[100vw] '>
      {logs
        ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .map((log) => (
          <div
            className='flex flex-col gap-0 w-full text-xs '
            key={log.id}
          >
            <div>
              {log.createdAt.toLocaleString('en-AU', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                weekday: 'short',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </div>
            <div className='flex gap-2 items-center'>
              <div>{log.user}</div>
              <div>{log.task}</div>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <div className='truncate'>{log.notes}</div>
              </PopoverTrigger>
              <PopoverContent
                align='start'
                sideOffset={-44}
                alignOffset={-44}
                className='w-screen break-words'
              >
                {log.notes}
              </PopoverContent>
            </Popover>
          </div>
        ))}
    </div>
  )
}
