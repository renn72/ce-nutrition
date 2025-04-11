'use client'

import { api } from '@/trpc/react'

import { toast } from 'sonner'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

export default function SettingsPage() {


  return (
    <div className='flex flex-col items-center w-full mt-10'>
      <h2> Settings</h2>
      <div className='flex flex-row items-center justify-between rounded-lg border p-3 gap-4 shadow-sm hidden'>
        <div className='space-y-0.5'>
          <Label>Include fibre in calories</Label>
          <div className='text-sm text-muted-foreground'>
            Sets the default behavior for the calories calculation.
          </div>
        </div>
        <Switch
        />
      </div>
    </div>
  )
}
