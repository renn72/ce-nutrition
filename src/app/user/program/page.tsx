'use client'

import { api } from '@/trpc/react'

import PlanView from '@/components/user-plan/detailed-plan-view'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const { data: currentUser } = api.user.getCurrentUser.useQuery()

  const plans = currentUser?.userPlans.filter((plan) => plan.isActive)

  if (!plans) return null

  if (plans.length === 0) return null

  if (plans.length === 1)
    return (
      <div className='mt-16'>
        <PlanView plan={plans[0]} />
      </div>
    )

  return (
    <div className='my-16'>
      <Tabs defaultValue='all'>
        <div className=' flex justify-center'>
          <TabsList className='px-2 flex flex-wrap bg-secondary h-full'>
            <TabsTrigger value='all'>All</TabsTrigger>
            {plans.map((plan) => (
              <TabsTrigger value={plan.id.toString()} key={plan.id}>
                {plan.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value='all'>
          {plans?.map((plan) => (
            <PlanView
              plan={plan}
              key={plan.id}
            />
          ))}
        </TabsContent>
        {plans.map((plan) => (
          <TabsContent
              key={plan.id}
            value={plan.id.toString()}>
            <PlanView
              plan={plan}
              key={plan.id}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
