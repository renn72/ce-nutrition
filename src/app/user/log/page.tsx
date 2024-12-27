

'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { UploadButton } from '@/lib/uploadthing'
import { cn } from '@/lib/utils'
import { GetDailyLogById } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CameraIcon, ChevronDown, PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Camera } from '@/components/camera/camera'
import { DailyLogForm } from './form'

export default function Home() {
  const ctx = api.useUtils()
  const { data: currentUser } = api.user.getCurrentUser.useQuery()
  const { mutate: createDailyLog } = api.dailyLog.create.useMutation({
    onSuccess: () => {
      toast.success('Updated successfully')
    },
  })
  const { data: currentUserDailyLogs, isLoading: isLoadingDailyLogs } =
    api.dailyLog.getAllCurrentUser.useQuery()

  if (isLoadingDailyLogs) return null

  const todaysDate = new Date()

  const todaysDailyLog = currentUserDailyLogs?.find(
    (dailyLog) => dailyLog.date.toDateString() === todaysDate.toDateString(),
  )

  return <DailyLogForm todaysLog={todaysDailyLog} />
}
