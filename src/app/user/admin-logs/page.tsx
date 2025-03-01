'use client'

import { api } from '@/trpc/react'

import { XCircle } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {useState} from 'react'
import { Switch } from '@/components/ui/switch'

export default function AdminLogs() {
  const [ isHideMe, setIsHideMe ] = useState(false)
  const ctx = api.useUtils()
  const { data: logs } = api.user.getAdminLogs.useQuery()
  const { mutate: deleteLog } = api.user.deleteAdminLog.useMutation({
    onSuccess: () => {
      ctx.user.invalidate()
    },
    onSettled: () => {
      ctx.user.invalidate()
    },
  })

  return (
    <div className='flex flex-col gap-2 mt-16 w-[100vw] px-1 '>
      <div className='flex items-center justify-between w-full'>
        <Switch
          checked={isHideMe}
          onCheckedChange={(checked) => {
            setIsHideMe(checked)
          }}
        />
      </div>
      {logs
        ?.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .filter((log) => {
          if (isHideMe) return log.user?.toLowerCase() !== 'david warner'
          return true
        })
        .map((log) => (
          <div
            className='flex flex-col gap-0 w-full text-xs '
            key={log.id}
          >
            <div className='flex justify-between items-center'>
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
              <XCircle
                size={20}
                className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform cursor-pointer'
                onClick={() => {
                  deleteLog(log.id)
                }}
              />
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
