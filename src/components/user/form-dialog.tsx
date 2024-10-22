import { api } from '@/trpc/react'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  PlusCircle,
} from 'lucide-react'
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
  name: z.string().min(1),
  location: z.string(),
})

const FormDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ctx = api.useUtils()
  const { mutate: createStore } = api.groceryStore.create.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      ctx.groceryStore.invalidate()
      toast.success('Store added successfully')
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      location: '',
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createStore(data)
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
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Name'
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
                  name='location'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Location'
                          {...field}
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
