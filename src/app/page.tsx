'use client'

import { api } from '@/trpc/react'

import Link from 'next/link'

import { useClientMediaQuery } from '@/hooks/use-client-media-query'
import { cn } from '@/lib/utils'
import { GetUserById } from '@/types'
import { Logs, } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { User } from '@/components/auth/user'
import { BodyFat } from '@/components/charts/mobile/body-fat'
import { LeanMass } from '@/components/charts/mobile/lean-mass'
import { Sleep } from '@/components/charts/mobile/sleep'
import { DailyLog } from '@/components/daily-log/daily-log'
import { BodyWeight } from '@/components/charts/mobile/body-weight'
import MobileHeader from '@/components/layout/mobile-header'

export const dynamic = 'force-dynamic'

const PlanPreview = ({ user }: { user: GetUserById }) => {
  const plan = user?.userPlans.find((plan) => plan.id == user?.currentPlanId)

  if (!plan) return null

  return (
    <div className='flex flex-col gap-2 w-full p-2 bg-secondary min-h-[200px] text-xs'>
      {plan.userMeals.map((meal, mealIndex) => (
        <div
          className='flex gap-0 flex-col'
          key={meal.id}
        >
          <div className='flex gap-2 items-center'>
            <div className='text-muted-foreground'>{meal.mealTitle}</div>
            <div className='text-sm text-muted-foreground'>
              {meal.targetCalories}cals
            </div>
          </div>
          <div className='flex gap-0 flex-col pl-4'>
            {plan.userRecipes
              .filter((recipe) => recipe.mealIndex == mealIndex)
              .map((recipe, recipeIndex) => (
                <div
                  className='flex gap-2 items-center'
                  key={recipe.id}
                >
                  <div className='text-muted-foreground'>{recipe.name}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}



const Mobile = ({
  userId,
  isDesktop = false,
}: {
  userId: string
  isDesktop?: boolean
}) => {
  const { data: currentUser } = api.user.get.useQuery(userId)
  const { data: dailyLogs } = api.dailyLog.getAllUser.useQuery(userId)
  const { data: weighIns } = api.weighIn.getAllUser.useQuery(userId)

  const isTrainer = currentUser?.isTrainer
  const plan = currentUser?.userPlans.find(
    (plan) => plan.id == currentUser?.currentPlanId,
  )

  return (
    <div className={cn('flex flex-col gap-2 w-full min-h-screen mt-16 ', isDesktop && 'relative')}>
      <MobileHeader isDesktop={isDesktop} />

      <Tabs
        defaultValue='bw'
        className='w-full'
      >
        <TabsList className='flex gap-2 items-center justify-center w-full bg-background '>
          <TabsTrigger
            className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
            value='bw'
          >
            Body Weight
          </TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
            value='lm'
          >
            Lean Mass
          </TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
            value='bf'
          >
            Body Fat
          </TabsTrigger>
          <TabsTrigger
            className='data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent-foreground rounded-none'
            value='sleep'
          >
            Sleep
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className='bg-secondary p-2'
          value='bw'
        >
          {dailyLogs ? <BodyWeight dailyLogs={dailyLogs} /> : null}
        </TabsContent>
        <TabsContent
          value='lm'
          className='bg-secondary p-2'
        >
          {weighIns ? <LeanMass weighIns={weighIns} /> : null}
        </TabsContent>
        <TabsContent
          value='bf'
          className='bg-secondary p-2'
        >
          {weighIns ? <BodyFat weighIns={weighIns} /> : null}
        </TabsContent>
        <TabsContent
          value='sleep'
          className='bg-secondary p-2'
        >
          {dailyLogs ? <Sleep dailyLogs={dailyLogs} /> : null}
        </TabsContent>
      </Tabs>
      <div className='flex gap-0 w-full justify-center items-center my-6 flex-col bg-secondary pt-2'>
        <h2 className=' font-bold'>Today</h2>
        <Link
          className='w-full'
          href='/user/log/create'
        >
          <DailyLog dailyLogs={dailyLogs} />
        </Link>
      </div>
      <PlanPreview user={currentUser} />
      <div className='flex flex-col gap-2 w-full p-2 h-96 bg-secondary'></div>
      <div className='flex flex-col gap-2 w-full p-2 h-96 bg-secondary'></div>
      <div className='flex flex-col gap-2 w-full p-2 grow'></div>
      <div
        className={cn(
          'grid grid-cols-3 place-items-center p-2 fixed border-t border-border bg-background w-full',
          !isDesktop ? 'bottom-0 w-full' : 'top-[922px] w-[388px]',
        )}
      >
        <Link href='/user/log'>
        <div className='flex gap-2 items-end'>
          <span className='text-muted-foreground text-base font-semibold leading-4 '>Logs</span>
          <Logs size={20} />
        </div>
        </Link>
        <User />
        <div />
      </div>
    </div>
  )
}

const Desktop = ({ userId }: { userId: string }) => {
  return (
    <div className='flex flex-col items-center gap-2 '>
      <div className='my-8'>TODO: desktop</div>
      <div>Mobile</div>

      <ScrollArea className='w-[390px] h-[844px] border border-border shadow-md relative '>
        <Mobile
          userId={userId}
          isDesktop={true}
        />
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
      {isMobile ? (
        <Mobile userId={currentUser.id} />
      ) : (
        <Desktop userId={currentUser.id} />
      )}
    </div>
  )
}
