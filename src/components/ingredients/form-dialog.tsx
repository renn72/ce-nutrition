import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, PlusCircle, XCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  foodName: z.string().min(1),
  servingSize: z.string().min(1),
  servingUnit: z.string().min(1),
})
const FormDialog = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: '',
      servingSize: '',
      servingUnit: '',
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    toast.success('Ingredient added successfully')
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PlusCircle className='h-6 w-6 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-125 transition-transform cursor-pointer' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='foodName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter food name'
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
                  name='servingSize'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serving Size</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter serving size'
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
                  name='servingUnit'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Serving Unit</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter serving unit'
                          {...field}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { FormDialog }
