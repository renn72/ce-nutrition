'use client'

import { useState } from 'react'

import { GetDailyLogById } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ListCollapse, Shuffle, Trash2 } from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'

const WaterBottomSheet = ({
  todaysDailyLog,
  totalWater,
  deleteWaterLog,
  size,
  setSize,
}: {
  todaysDailyLog: GetDailyLogById | null | undefined
  totalWater: number
  deleteWaterLog: ({ id }: { id: number }) => void
  size: number
  setSize: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [title, setTitle] = useState('Toilet Log')
  return (
    <Sheet.Root license='non-commercial'>
      <Sheet.Trigger className='flex gap-2 items-center justify-center absolute  top-10 right-0'>
        <ListCollapse
          size={20}
          className='text-muted-foreground'
        />
      </Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
          <Sheet.Content className='min-h-[200px] max-h-[80vh] h-full rounded-t-3xl bg-background relative'>
            <div className='flex flex-col justify-between h-full'>
              <div className='flex flex-col '>
                <div className='flex justify-center pt-1'>
                  <Sheet.Handle
                    className=' w-[50px] h-[6px] border-0 rounded-full bg-primary/20'
                    action='dismiss'
                  />
                </div>
                <div className='flex gap-4 pt-4 border-b-[1px] border-primary pb-4 relative font-medium'>
                  <div className='transition-transform '>
                    <Sheet.Title className='text-lg ml-4 '>
                      Water Log
                    </Sheet.Title>
                  </div>
                  <Sheet.Description className='hidden'>
                    Water Log
                  </Sheet.Description>
                  <div className='border w-px h-6' />
                  <div className='flex items-baseline'>
                  <NumberFlow
                    value={totalWater}
                    className='text-lg text-primary ml-2 '
                  />
                  <span className='text-xs text-primary/50 ml-[1px]'>ml</span>
                  </div>
                </div>
                <div className='flex items-center gap-2 pt-1 relative w-min ml-4'>
                  <Label>Size</Label>
                  <Input
                    placeholder='Amount'
                    className='my-1 w-24'
                    type='number'
                    value={size}
                    onChange={(e) => {
                      setSize(Number(e.target.value))
                    }}
                  />
                  <span className='text-xs text-primary/50 absolute right-2'>
                    ml
                  </span>
                </div>
                <ScrollArea className='p-4 h-[calc(80vh-110px)]'>
                  <div className='flex flex-col gap-2 '>
                    {todaysDailyLog?.waterLogs.length === 0 ||
                    !todaysDailyLog ? (
                      <div className='text-center'>...</div>
                    ) : (
                      todaysDailyLog?.waterLogs.map((waterLog, i) => (
                        <div
                          key={waterLog.id}
                          className='grid grid-cols-6 gap-2 text-sm w-full bg-secondary rounded-full px-4 py-2 items-center'
                        >
                          <div className='text-primary font-normal col-span-1'>
                            <div className='rounded-full h-6 w-6 bg-primary/20 flex justify-center items-center pt-[1px]'>
                              {i + 1}
                            </div>
                          </div>
                          <div className='text-muted-foreground font-normal col-span-2'>
                            {waterLog.createdAt.toLocaleTimeString('en-AU')}
                          </div>
                          <div className='text-muted-foreground font-medium col-span-2'>
                            {waterLog.amount}ml
                          </div>
                          <div className='justify-self-end'>
                            <Trash2
                              size={16}
                              className='cursor-pointer text-destructive hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
                              onClick={() => {
                                deleteWaterLog({
                                  id: waterLog.id,
                                })
                              }}
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
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

export { WaterBottomSheet }
