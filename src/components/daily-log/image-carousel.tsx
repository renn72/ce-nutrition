'use client'

import { api } from '@/trpc/react'

import { useEffect, useRef, useState } from 'react'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

interface Props {
  userId: string
}

function ImageCarousel({ userId }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  const [viewportRef, embla] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  })
  const scrollPrev = () => embla && embla.scrollPrev()
  const scrollNext = () => embla && embla.scrollNext()

  const onSelect = () => {
    if (!embla) return
    setSelectedIndex(embla.selectedScrollSnap())
  }

  useEffect(() => {
    onSelect()
  }, [embla])

  useEffect(() => {
    if (!embla) return
    const handler = () => {
      setScrollSnaps(embla.scrollSnapList())
    }
    handler()
    embla.on('reInit', handler)
    return () => embla.off('reInit', handler)
  }, [embla])

  if (!dailyLogs) return null

  return (
    <>
      {dailyLogs?.filter((log) => log.image !== '').length ? (
        <div className='mx-auto max-w-[600px] overflow-hidden'>
          <div
            ref={viewportRef}
            className='w-full'
          >
            <div className='flex'>
              {dailyLogs
                ?.filter((log) => log.image !== '')
                .map((log, index) => (
                  <div
                    key={index}
                    className='flex min-w-[300px] justify-center relative'
                  >
                    <img
                      src={log.image ?? ''}
                      alt={log.notes ?? ''}
                      className='h-[500px] w-[300px] object-contain'
                    />
                    <div className='text-sm text-muted-foreground font-medium absolute bottom-0 left-1/2 -translate-x-1/2'>
                      {log.date.toLocaleDateString('en-AU', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                      })}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className='flex justify-center gap-4'>
            <button
              onClick={scrollPrev}
              className='absolute top-1/2 left-2 z-10 -translate-y-1/2'
            >
              <ChevronLeftIcon
                strokeWidth={3}
                size={20}
              />
            </button>
            <div className='flex gap-2'>
              {scrollSnaps.map((snap, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === selectedIndex
                      ? 'bg-primary'
                      : 'bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={scrollNext}
              className='absolute top-1/2 right-2 z-10 -translate-y-1/2'
            >
              <ChevronRightIcon

                strokeWidth={3}
              />
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export { ImageCarousel }
