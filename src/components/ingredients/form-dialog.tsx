import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { createIngredientSchema } from '@/server/api/schema/ingredient'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  XCircle,
} from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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

const formSchema = z.object({
  foodName: z.string().min(1),
  servingSize: z.number(),
  servingUnit: z.string().min(1),
  protein: z.number(),
  fatTotal: z.number(),
  totalDietaryFibre: z.number(),
  totalSugars: z.number(),
  addedSugars: z.number(),
  freeSugars: z.number(),
  starch: z.number(),
  resistantStarch: z.number(),
  availableCarbohydrateWithoutSugarAlcohols: z.number(),
  availableCarbohydrateWithSugarAlcohols: z.number(),
})

const FormDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ctx = api.useUtils()
  const { mutate: createIngredient } = api.ingredient.create.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      ctx.ingredient.invalidate()
      toast.success('Ingredient added successfully')
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      foodName: '',
      servingSize: 100,
      servingUnit: 'grams',
      protein: 0,
      fatTotal: 0,
      totalDietaryFibre: 0,
      totalSugars: 0,
      addedSugars: 0,
      freeSugars: 0,
      starch: 0,
      resistantStarch: 0,
      availableCarbohydrateWithoutSugarAlcohols: 0,
      availableCarbohydrateWithSugarAlcohols: 0,
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createIngredient({
      foodName: data.foodName,
      servingSize: data.servingSize.toString(),
      servingUnit: data.servingUnit.toString(),
      protein: data.protein.toString(),
      fatTotal: data.fatTotal.toString(),
      totalDietaryFibre: data.totalDietaryFibre.toString(),
      totalSugars: data.totalSugars.toString(),
      addedSugars: data.addedSugars.toString(),
      freeSugars: data.freeSugars.toString(),
      starch: data.starch.toString(),
      resistantStarch: data.resistantStarch.toString(),
      availableCarbohydrateWithoutSugarAlcohols:
        data.availableCarbohydrateWithoutSugarAlcohols.toString(),
      availableCarbohydrateWithSugarAlcohols:
        data.availableCarbohydrateWithSugarAlcohols.toString(),
    })
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-4'>
                <FormField
                  control={form.control}
                  name='foodName'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Food Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='food name'
                          {...field}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className='flex gap-4 justify-between'>
                  <FormField
                    control={form.control}
                    name='servingSize'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Serving Size</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='serving size'
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                            type='number'
                            className='w-full'
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
                      <FormItem className='w-full'>
                        <FormLabel>Serving Unit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='serving unit'
                            {...field}
                            type='text'
                            className='w-full'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex gap-4 justify-between'>
                  <FormField
                    control={form.control}
                    name='protein'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protein</FormLabel>
                        <FormControl>
                          <div className='relative w-full'>
                            <Input
                              placeholder='Protein'
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                              type='number'
                            />
                            <div className='absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground'>
                              grams
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='fatTotal'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fat Total</FormLabel>
                        <FormControl>
                          <div className='relative w-full'>
                            <Input
                              placeholder='Fat Total'
                              {...field}
                              onChange={e => field.onChange(Number(e.target.value))}
                              type='number'
                            />
                            <div className='absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground'>
                              grams
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='availableCarbohydrateWithSugarAlcohols'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carbohydrate</FormLabel>
                        <FormControl>
                          <div className='relative w-full'>
                            <Input
                              placeholder='Carbohydrate'
                              {...field}
                              type='number'
                            />
                            <div className='absolute right-8 top-1/2 -translate-y-1/2 text-xs text-muted-foreground'>
                              grams
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Collapsible>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant='outline'
                      className='data-[state=open]:rotate-180 transition-transform'
                    >
                      <ChevronDown className='h-4 w-4 ' />
                      <span className='sr-only'>Show more</span>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className='flex flex-col gap-4'>
                    <FormField
                      control={form.control}
                      name='totalDietaryFibre'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Dietary Fibre</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter total dietary fibre'
                              {...field}
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='totalSugars'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Total Sugars</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter total sugars'
                              {...field}
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='addedSugars'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Added Sugars</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter added sugars'
                              {...field}
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='freeSugars'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Free Sugars</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter free sugars'
                              {...field}
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='starch'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Starch</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter starch'
                              {...field}
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='resistantStarch'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resistant Starch</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter resistant starch'
                              {...field}
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='availableCarbohydrateWithoutSugarAlcohols'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Available Carbohydrate Without Sugar Alcohol
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder='Enter available carbohydrate without sugar alcohol'
                              {...field}
                              type='number'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CollapsibleContent>
                </Collapsible>
                <div>
                  <Button type='submit'>Submit</Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export { FormDialog }
