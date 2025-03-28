'use client'

import { GetDailyLogById } from '@/types'
import { Sheet } from '@silk-hq/components'
import { ChevronDown, CircleX, ListCollapse } from 'lucide-react'
import NumberFlow from '@number-flow/react'

const PoopBottomSheet = ({
  todaysDailyLog,
  totalPoop,
  deletePoopLog,
}: {
  todaysDailyLog: GetDailyLogById | null | undefined
  totalPoop: number
  deletePoopLog: ({ id }: { id: number }) => void
}) => {
  return (
    <Sheet.Root license='non-commercial'>
      <Sheet.Trigger className='flex gap-2 items-center justify-center absolute  top-10 right-0'>
        <ListCollapse
          size={20}
          className='text-muted-foreground'
        />
      </Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View className='z-[999] h-[100vh] bg-primary/50 '>
          <Sheet.Content className='min-h-[200px] max-h-[80vh] h-full rounded-t-3xl'>
            <div className='flex flex-col justify-between h-full'>
              <div className='flex flex-col '>
                <div className='flex justify-center pt-1'>
                  <Sheet.Handle
                    className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
                    action='dismiss'
                  />
                </div>
                <div className='flex justify-center pt-4 border-b-[1px] border-primary pb-4 relative'>
                  <Sheet.Title className='text-lg'>Toilet Log</Sheet.Title>
                  <Sheet.Description className='hidden'>
                    Toilet Log
                  </Sheet.Description>
                  <NumberFlow
                    value={totalPoop}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-primary hidden'
                  />
                </div>
                <div className='flex flex-col gap-2 p-4'>
                  {todaysDailyLog?.poopLogs.length === 0 || !todaysDailyLog ? (
                    <div className='text-center'>...</div>
                  ) : (
                    todaysDailyLog?.poopLogs.map((poopLog, i) => (
                      <div
                        key={poopLog.id}
                        className='grid grid-cols-4 gap-2 text-sm w-full items-center bg-secondary rounded-full px-4 py-2'
                      >
                        <div className='text-muted-foreground font-normal col-span-1'>
                          {i + 1}
                        </div>
                        <div className='text-muted-foreground font-normal col-span-2'>
                          {poopLog.createdAt.toLocaleTimeString('en-AU')}
                        </div>
                        <CircleX
                          size={20}
                          className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
                          onClick={() => {
                            deletePoopLog({
                              id: poopLog.id,
                            })
                          }}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
              <Sheet.Trigger
                className='w-full flex justify-center'
                action='dismiss'
              >
                <ChevronDown
                  size={32}
                  strokeWidth={2}
                  className='text-muted-foreground'
                />
              </Sheet.Trigger>
            </div>
          </Sheet.Content>
        </Sheet.View>
      </Sheet.Portal>
    </Sheet.Root>
  )
}

export { PoopBottomSheet }
