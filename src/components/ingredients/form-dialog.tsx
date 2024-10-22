import { api } from '@/trpc/react'

import { useState } from 'react'

import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, PlusCircle } from 'lucide-react'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const dynamic = 'force-dynamic'

const formSchema = z.object({
  foodName: z.string().min(1),
  servingSize: z.number(),
  servingUnit: z.string().min(1),
  energyWithDietaryFibre: z.number(),
  energyWithoutDietaryFibre: z.number(),
  protein: z.number(),
  fatTotal: z.number(),
  totalDietaryFibre: z.number(),
  totalSugars: z.number(),
  starch: z.number(),
  resistantStarch: z.number(),
  availableCarbohydrateWithoutSugarAlcohols: z.number(),
  availableCarbohydrateWithSugarAlcohols: z.number(),
  stores: z.array(z.string()),
  isAllStores: z.boolean(),
})

const FormDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ctx = api.useUtils()
  const { data: stores } = api.groceryStore.getAll.useQuery()
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
      energyWithDietaryFibre: 0,
      energyWithoutDietaryFibre: 0,
      protein: 0,
      fatTotal: 0,
      totalDietaryFibre: 0,
      totalSugars: 0,
      starch: 0,
      resistantStarch: 0,
      availableCarbohydrateWithoutSugarAlcohols: 0,
      availableCarbohydrateWithSugarAlcohols: 0,
      stores: [],
      isAllStores: true,
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createIngredient({
      foodName: data.foodName,
      servingSize: data.servingSize.toString(),
      servingUnit: data.servingUnit.toString(),
      energyWithDietaryFibre: data.energyWithDietaryFibre.toString(),
      energyWithoutDietaryFibre: data.energyWithoutDietaryFibre.toString(),
      protein: data.protein.toString(),
      fatTotal: data.fatTotal.toString(),
      totalDietaryFibre: data.totalDietaryFibre.toString(),
      totalSugars: data.totalSugars.toString(),
      starch: data.starch.toString(),
      resistantStarch: data.resistantStarch.toString(),
      availableCarbohydrateWithoutSugarAlcohols:
        data.availableCarbohydrateWithoutSugarAlcohols.toString(),
      availableCarbohydrateWithSugarAlcohols:
        data.availableCarbohydrateWithSugarAlcohols.toString(),
      isAllStores: data.isAllStores,
      stores: data.stores,
    })
  }

  const isAllStores = form.watch('isAllStores')

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
                      <div className='flex gap-2 items-baseline'>
                        <FormLabel>Serving Size</FormLabel>
                        <FormDescription>.</FormDescription>
                      </div>
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
                      <div className='flex gap-2 items-baseline'>
                        <FormLabel>Serving Unit</FormLabel>
                        <FormDescription>grams/mls/each</FormDescription>
                      </div>
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
                <div className='w-full'>
                <FormField
                  control={form.control}
                  name='energyWithoutDietaryFibre'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories w/0 fibre</FormLabel>
                      <FormControl>
                        <div className='relative w-full'>
                          <Input
                            placeholder='Calories'
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
                </div>
                <div className='w-full'>
                <FormField
                  control={form.control}
                  name='energyWithDietaryFibre'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Calories w fibre</FormLabel>
                      <FormControl>
                        <div className='relative w-full'>
                          <Input
                            placeholder='Calories'
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

              </div>
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
                  name='availableCarbohydrateWithSugarAlcohols'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Carbohydrate</FormLabel>
                      <FormControl>
                        <div className='relative w-full'>
                          <Input
                            placeholder='Carbohydrate'
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
              </div>
              <FormField
                control={form.control}
                name='isAllStores'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-end space-x-6 space-y-0 rounded-md border p-4 shadow'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>Available in all stores</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={cn(
                  isAllStores
                    ? 'h-0 border-0 shadow-none'
                    : 'h-max shadow border',
                  'transition-all duration-300 ease-in-out',
                  'flex flex-row rounded-md ',
                )}
              >
                <FormField
                  control={form.control}
                  name='stores'
                  render={({ field }) => (
                    <FormItem
                      className={cn('w-full p-4', isAllStores && 'hidden')}
                    >
                      <FormLabel>Stores</FormLabel>
                      <FormControl>
                        <div className='relative w-full'>
                          <ToggleGroup
                            type='multiple'
                            value={field.value}
                            onValueChange={field.onChange}
                            className='flex-wrap gap-2'
                          >
                            {stores?.map((store) => (
                              <ToggleGroupItem
                                key={store.id}
                                value={store.id.toString()}
                                className='flex flex-row items-center justify-between border rounded-md '
                              >
                                <div className='flex flex-col gap-2'>
                                  <div className='flex flex-row items-center gap-2'>
                                    <div className='w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center'>
                                      <PlusCircle className='w-4 h-4' />
                                    </div>
                                    <div className='flex flex-col'>
                                      <div className='text-sm font-medium'>
                                        {store.name}
                                      </div>
                                      <div className='text-xs text-gray-500'>
                                        {store.location}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
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
      </DialogContent>
    </Dialog>
  )
}

export { FormDialog }
