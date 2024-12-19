'use client'

import { api } from '@/trpc/react'
import { User } from '@/components/auth/user'

import Image from 'next/image'
import Link from 'next/link'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { Bell, NotebookText } from 'lucide-react'

import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Plan } from './_components/plan'

const BodyWeightChart = () => {
  const { data: bodyWeight } = api.user.get.useQuery('bodyWeight')
  const { data: leanMass } = api.user.get.useQuery('leanMass')

  return (
    <div className='flex flex-col gap-2 w-full'>
    </div>
  )
  }

const Mobile = ({userId}: {userId: string}) => {
  const { data: currentUser } = api.user.get.useQuery(userId)
  const isTrainer = currentUser?.isTrainer
  const plan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )
  return (
    <div className='flex flex-col gap-2 w-full p-2 min-h-screen'>
      <div className='flex gap-2 items-center justify-around w-full'>
        <div className='flex flex-col gap-0 items-center justify-center'>
          <NotebookText
            size={40}
            className='bg-accentt cursor-pointer rounded-full p-1'
          />
          <Label className='text-xs text-muted-foreground'>Program</Label>
        </div>
        <Link
          className='hover:opacity-100 opacity-80 transition-all py-2'
          href='/'
        >
          <Image
            src='/logo/ce.png'
            alt='logo'
            width={40}
            height={40}
            priority
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Link>
        <div className='flex flex-col gap-0 items-center justify-center'>
          <Bell
            size={40}
            className='bg-accentt cursor-pointer rounded-full p-1'
          />
          <Label className='text-xs text-muted-foreground'>Notifications</Label>
        </div>
      </div>

      <Tabs
        defaultValue='bw'
        className='w-full'
      >
        <TabsList className='flex gap-2 items-center justify-center w-full bg-background '>
          <TabsTrigger value='bw'>Body Weight</TabsTrigger>
          <TabsTrigger value='lm'>Lean Mass</TabsTrigger>
          <TabsTrigger value='bf'>Body Fat</TabsTrigger>
        </TabsList>
        <TabsContent value='bw'>weight</TabsContent>
        <TabsContent value='lm'>lean mass</TabsContent>
        <TabsContent value='bf'>body fat</TabsContent>
      </Tabs>
      <div className='flex flex-col gap-2 w-full p-2 grow'>
      </div>
      <div className='flex gap-2 w-full p-2 justify-center'>
        <User />
      </div>
    </div>
  )
}

const Desktop = ({userId}: {userId: string}) => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='my-8'>TODO: desktop</div>
      <div>Mobile</div>

      <ScrollArea className='w-[390px] h-[844px] border border-border shadow-md'>
        <Mobile userId={userId} />
      </ScrollArea>
    </div>
  )
}

export default function Home() {
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const isMobile = useClientMediaQuery('(max-width: 600px)')

  if (!currentUser) return null
  return (
    <div className='flex min-h-screen flex-col'>
      {isMobile ? <Mobile userId={currentUser.id} /> : <Desktop userId={currentUser.id}/>}
    </div>
  )
}
