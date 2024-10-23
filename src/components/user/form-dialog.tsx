import { api } from '@/trpc/react'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const dynamic = 'force-dynamic'

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(4),
  isTrainer: z.boolean(),
})

const FormDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ctx = api.useUtils()
  const { mutate: createUser } = api.user.createUser.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      ctx.groceryStore.invalidate()
      toast.success('Store added successfully')
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isTrainer: false,
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createUser(data)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <PlusCircle className='h-6 w-6 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-125 transition-transform cursor-pointer' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Ingredient</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4'>
              <div className='flex gap-4 justify-between'>
                <FormField
                  control={form.control}
                  name='firstName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='First Name'
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
                  name='lastName'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Last Name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='email'
                        type='email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isTrainer'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-6 space-y-0 rounded-md border p-4 shadow'>
                    <FormLabel>Is Trainer?</FormLabel>
                    <FormControl>
                      <Checkbox
                        className='h-4'
                        checked={field.value}
                        onCheckedChange={(value) => {
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <Button type='submit'>Submit</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export { FormDialog }
