'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import type { GetGoal, GetUserById, GetUserGoals } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { EllipsisVertical, } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export const formSchema = z.object({
  title: z.string(),
  description: z.string(),
  state: z.string(),
})

const Goal = ({
  goal,
  setGoalId,
  form,
  setIsEdit,
  setIsOpen,
  deleteGoal,
}: {
  goal: GetGoal
  setGoalId: React.Dispatch<React.SetStateAction<number | null>>
  form: any
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  deleteGoal: any
}) => {
  if (!goal) return null

  return (
    <div className='flex gap-0 w-full flex-col leading-none'>
      <div
        className={cn(
          'flex gap-2 items-center justify-between w-full',
          goal.state === 'created' ? '' : 'line-through opacity-50',
        )}
      >
        <div className='text-base font-medium'>{goal.title}</div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
            >
              <EllipsisVertical className='h-4 w-4' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='w-[160px]'
          >
            <DropdownMenuItem
              onSelect={() => {
                setGoalId(goal.id)
                form.reset({
                  title: goal.title || '',
                  description: goal.description || '',
                  state: goal.state || '',
                })
                setIsEdit(true)
                setIsOpen(true)
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                deleteGoal({ id: goal.id })
              }}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='text-[0.6rem] rounded-full bg-muted px-2 py-1 w-fit'>
        {goal.updatedAt?.toLocaleDateString('en-AU', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </div>
      <div
        className={cn(
          'text-sm text-muted-foreground',
          goal.state === 'created' ? '' : 'hidden',
        )}
      >
        {goal.description}
      </div>
    </div>
  )
}

const UserGoals = ({
  user,
  userGoals,
  className,
}: {
  user: GetUserById
  userGoals: GetUserGoals | undefined
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [goalId, setGoalId] = useState<number | null>(null)

  const ctx = api.useUtils()
  const { mutate: createGoal } = api.goal.create.useMutation({
    onSuccess: () => {
      toast.success('Goal created')
      ctx.invalidate()
      setIsOpen(false)
      form.reset({
        title: '',
        description: '',
        state: 'created',
      })
    },
  })
  const { mutate: deleteGoal } = api.goal.delete.useMutation({
    onSuccess: () => {
      toast.success('Goal deleted')
      ctx.invalidate()
    },
  })
  const { mutate: updateGoal } = api.goal.update.useMutation({
    onSuccess: () => {
      toast.success('Goal updated successfully')
      ctx.invalidate()
      setIsOpen(false)
      form.reset({
        title: '',
        description: '',
        state: 'created',
      })
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      state: 'created',
    },
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (isEdit) {
      if (!goalId) return
      updateGoal({
        id: goalId,
        title: data.title,
        description: data.description,
        state: data.state,
      })
    } else {
      createGoal({
        title: data.title,
        description: data.description,
        state: data.state,
        userId: user.id,
      })
    }
  }

  return (
    <div className={cn('border rounded-lg p-4 flex flex-col w-full items-center justify-between gap-2 ', className)}>
      <div className='flex gap-2 flex-col w-full'>
        <h2 className='text-xl font-semibold'>Goals</h2>
        <div className='flex gap-2 flex-col'>
          <ScrollArea className='max-h-[284px]'>
            {userGoals
              ?.filter((goal) => goal.state === 'created')
              .sort(
                (a, b) =>
                  (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0),
              )
              .map((goal) => (
                <Goal
                  key={goal.id}
                  goal={goal}
                  setGoalId={setGoalId}
                  form={form}
                  setIsEdit={setIsEdit}
                  setIsOpen={setIsOpen}
                  deleteGoal={deleteGoal}
                />
              ))}
            {userGoals
              ?.filter((goal) => goal.state !== 'created')
              .sort(
                (a, b) =>
                  (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0),
              )
              .map((goal) => (
                <Goal
                  key={goal.id}
                  goal={goal}
                  setGoalId={setGoalId}
                  form={form}
                  setIsEdit={setIsEdit}
                  setIsOpen={setIsOpen}
                  deleteGoal={deleteGoal}
                />
              ))}
          </ScrollArea>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              setIsEdit(false)
            }}
          >
            Add Goal
          </Button>
        </DialogTrigger>
        <DialogContent className='p-8'>
          <DialogHeader>
            <DialogTitle>Add Goal</DialogTitle>
            <DialogDescription>Add a new goal for this user</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-4 w-full'>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Title'
                          {...field}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder='Description'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='state'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='...' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='created'>Created</SelectItem>
                          <SelectItem value='achieved'>Achieved</SelectItem>
                          <SelectItem value='failed'>Failed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex w-full gap-4'>
                  <Button
                    className='w-full'
                    type='submit'
                  >
                    Save
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      form.reset({
                        title: '',
                        description: '',
                        state: 'created',
                      })
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { UserGoals }
