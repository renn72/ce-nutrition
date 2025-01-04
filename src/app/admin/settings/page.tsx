'use client'

import { api } from '@/trpc/react'

import { toast } from 'sonner'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {
  const ctx = api.useUtils()
  const { data, isLoading } = api.settings.get.useQuery()
  const { mutate: updateCalories } = api.settings.updateCalories.useMutation({
    onSuccess: () => {
      toast.success('Settings updated successfully')
      ctx.settings.get.refetch()
    },
    onMutate: async () => {
      await ctx.settings.get.cancel()
      const prev = ctx.settings.get.getData()
      if (!prev) return
      ctx.settings.get.setData(undefined, {
        ...prev,
        isCaloriesWithFibre: !prev.isCaloriesWithFibre,
      })
    },
  })

  if (isLoading) return null

  return (
    <div className='flex flex-col items-center w-full'>
      <h2> Settings</h2>
      <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm'>
        <div className='space-y-0.5'>
          <Label>Include fibre in calories</Label>
          <div className='text-sm text-muted-foreground'>
            Sets the default behavior for the calories calculation.
          </div>
        </div>
        <Switch
          checked={data?.isCaloriesWithFibre ?? false}
          onCheckedChange={(e) => {
            updateCalories(e)
          }}
        />
      </div>
    </div>
  )
}
