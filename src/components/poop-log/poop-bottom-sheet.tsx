'use client'

import { useState } from 'react'

import { GetDailyLogById } from '@/types'
import NumberFlow from '@number-flow/react'
import { Sheet } from '@silk-hq/components'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ListCollapse, Shuffle, Trash2 } from 'lucide-react'
const transition = {
  duration: 0.15,
  ease: 'easeInOut',
}

const slideAnimation = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: {transition},
}

const toiletPhrases = [
  'Dropping the kids off',
  'Taking the Browns out',
  'Downloading some logs',
  'Releasing the Kraken',
  'Visiting Uncle John',
  'Answering nature’s call',
  'Launching a torpedo',
  'Sending a fax out',
  'Making a splash',
  'Delivering a package',
  'On the porcelain throne',
  'Filling the royal seat',
  'Deploying the troops',
  'Meeting the plumbing team',
  'Evacuating the floor',
  'Taking the Oval seat',
  'On a secret mission',
  'Handling some business',
  'Unloading the cargo',
  'Sinking the Titanic',
]

const PoopBottomSheet = ({
  todaysDailyLog,
  totalPoop,
  deletePoopLog,
}: {
  todaysDailyLog: GetDailyLogById | null | undefined
  totalPoop: number
  deletePoopLog: ({ id }: { id: number }) => void
}) => {
  const [title, setTitle] = useState('Toilet Log')
  return (
    <Sheet.Root license='non-commercial'>
      <Sheet.Trigger className='flex gap-2 items-center justify-center mt-1'>
        <ListCollapse
          size={20}
          className='text-muted-foreground'
        />
      </Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.View className='z-[999] h-[100vh] bg-black/50 '>
          <Sheet.Content className='min-h-[200px] max-h-[80vh] h-full rounded-t-3xl bg-background relative'>
            <div className='absolute bottom-10 right-0 p-2 text-primary'>
              <Shuffle
                size={16}
                className='text-primary/30 active:scale-90 transition-transform cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  const rnd = Math.floor(Math.random() * toiletPhrases.length)
                  const phrase = toiletPhrases[rnd] ?? 'Toilet Log'
                  setTitle(phrase)
                }}
              />
            </div>
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
                      <AnimatePresence mode='wait'>
                        <motion.div
                          key={title}
                          className=''
                          initial={slideAnimation.initial}
                          animate={slideAnimation.animate}
                          exit={slideAnimation.exit}
                          transition={slideAnimation.transition}
                        >
                          {title}
                        </motion.div>
                      </AnimatePresence>
                    </Sheet.Title>
                  </div>
                  <Sheet.Description className='hidden'>
                    Toilet Log
                  </Sheet.Description>
                  <div className='border w-px h-6' />
                  <NumberFlow
                    value={totalPoop}
                    className='text-lg text-primary ml-2 '
                  />
                </div>
                <div className='flex flex-col gap-2 p-4'>
                  {todaysDailyLog?.poopLogs.length === 0 || !todaysDailyLog ? (
                    <div className='text-center'>...</div>
                  ) : (
                    todaysDailyLog?.poopLogs.map((poopLog, i) => (
                      <div
                        key={poopLog.id}
                        className='grid grid-cols-4 gap-2 text-sm w-full bg-secondary rounded-full px-4 py-2 items-center'
                      >
                        <div className='text-primary font-normal col-span-1'>
                          <div className='rounded-full h-6 w-6 bg-primary/20 flex justify-center items-center pt-[1px]'>
                            {i + 1}
                          </div>
                        </div>
                        <div className='text-muted-foreground font-normal col-span-2'>
                          {poopLog.createdAt.toLocaleTimeString('en-AU')}
                        </div>
                        <div className='justify-self-end'>
                          <Trash2
                            size={16}
                            className='cursor-pointer text-destructive hover:text-primary active:scale-90 transition-transform cursor-pointer mb-[1px]'
                            onClick={() => {
                              deletePoopLog({
                                id: poopLog.id,
                              })
                            }}
                          />
                        </div>
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
