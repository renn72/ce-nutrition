'use client'

import Image from 'next/image'

import { cn } from '@/lib/utils'
import { GetWeighInById } from '@/types'

const Text = ({
  title,
  text,
  suffix = '',
}: {
  suffix?: string
  title: string
  text: string | undefined | null
}) => {
  return (
    <div className='flex gap-2 items-center'>
      <div className='text-muted-foreground'>{title}</div>
      <div
        className={cn(
          'text-sm font-semibold truncate',
          text ? 'text-secondary-foreground' : 'text-muted-foreground/70',
        )}
      >
        {text ? text + suffix : '...'}
      </div>
    </div>
  )
}

const CheckIn = ({ weighIn }: { weighIn: GetWeighInById }) => {
  if (weighIn?.image && weighIn?.image !== '') {
    return (
      <div className='grid grid-cols-3 w-full px-4 py-2 bg-secondary text-sm'>
        <div className='flex flex-col gap-1 items-start col-span-2'>
          <Text
            title='Weight'
            text={weighIn?.bodyWeight}
            suffix='kg'
          />
          <Text
            title='Lean Mass'
            text={weighIn?.leanMass}
            suffix='kg'
          />
          <Text
            title='Body Fat'
            text={weighIn?.bodyFat}
            suffix='kg'
          />
          <Text
            title='Blood Pressure'
            text={weighIn?.bloodPressure}
          />
          <Text
            title='Notes'
            text={weighIn?.notes}
          />
        </div>
        <Image
          src={weighIn.image}
          alt='img'
          width={400}
          height={500}
          style={{
            width: '100%',
            height: 'auto',
          }}
          className=''
        />
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-2 w-full px-2 py-4 bg-secondary text-sm'>
      <div className='grid grid-cols-3'>
        <Text
          title='Weight'
          text={weighIn?.bodyWeight}
          suffix='kg'
        />
        <Text
          title='Lean Mass'
          text={weighIn?.leanMass}
          suffix='kg'
        />
        <Text
          title='Body Fat'
          text={weighIn?.bodyFat}
          suffix='kg'
        />
      </div>
      <div className='grid grid-cols-2'>
        <Text
          title='Blood Pressure'
          text={weighIn?.bloodPressure}
        />
        <Text
          title='Notes'
          text={weighIn?.notes}
        />
      </div>
    </div>
  )
}

export { CheckIn }
