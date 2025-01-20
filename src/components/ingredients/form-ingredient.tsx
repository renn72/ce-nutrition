'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import type { GetIngredientById } from '@/types'
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { BackButton } from '../back-button'

export const dynamic = 'force-dynamic'

const formSchema = z.object({
  name: z.string().min(1),
  serveSize: z.number(),
  serveUnit: z.string().min(1),
  caloriesWFibre: z.number(),
  caloriesWOFibre: z.number(),
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

const FormIngredient = ({
  ingredient = null,
}: {
  ingredient?: GetIngredientById | null
}) => {
  const router = useRouter()
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
  const { mutate: updateIngredient } = api.ingredient.update.useMutation({
    onSuccess: () => {
      setIsOpen(false)
      ctx.ingredient.invalidate()
      toast.success('Ingredient added successfully')
      setTimeout(() => {
        router.push('/admin/base/ingredient')
      }, 1000)
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ingredient?.name || '',
      serveSize: Number(ingredient?.serveSize) || 100,
      serveUnit: ingredient?.serveUnit || 'grams',
      caloriesWFibre: Number(ingredient?.caloriesWFibre) || 0,
      caloriesWOFibre: Number(ingredient?.caloriesWOFibre) || 0,
      protein: Number(ingredient?.protein) || 0,
      fatTotal: Number(ingredient?.fatTotal) || 0,
      totalDietaryFibre: Number(ingredient?.totalDietaryFibre) || 0,
      totalSugars: Number(ingredient?.totalSugars) || 0,
      starch: Number(ingredient?.starch) || 0,
      resistantStarch: Number(ingredient?.resistantStarch) || 0,
      availableCarbohydrateWithoutSugarAlcohols:
        Number(ingredient?.availableCarbohydrateWithoutSugarAlcohols) || 0,
      availableCarbohydrateWithSugarAlcohols:
        Number(ingredient?.availableCarbohydrateWithSugarAlcohols) || 0,
      stores:
        ingredient?.ingredientToGroceryStore?.map(
          (store) => store.groceryStoreId?.toString() || '',
        ) || [],
      isAllStores: ingredient?.isAllStores || true,
    },
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (ingredient) {
      updateIngredient({
        id: ingredient.id,
        name: data.name,
        serveSize: data.serveSize.toString(),
        serveUnit: data.serveUnit.toString(),
        caloriesWFibre: data.caloriesWFibre.toString(),
        caloriesWOFibre: data.caloriesWOFibre.toString(),
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
    } else {
      createIngredient({
        name: data.name,
        serveSize: data.serveSize.toString(),
        serveUnit: data.serveUnit.toString(),
        caloriesWFibre: data.caloriesWFibre.toString(),
        caloriesWOFibre: data.caloriesWOFibre.toString(),
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
  }

  const isAllStores = form.watch('isAllStores')

  return (
    <div className='flex flex-col gap-4'>
      <BackButton />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Food Name</FormLabel>
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
            <div className='flex gap-4 justify-between'>
              <FormField
                control={form.control}
                name='serveSize'
                render={({ field }) => (
                  <FormItem className='w-full'>
                      <FormLabel>Serving Size</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='serving size'
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
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
                name='serveUnit'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Serving Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {['grams', 'mls', 'each'].map((option) => (
                          <SelectItem
                            key={option}
                            value={option}
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4  justify-between'>
                <FormField
                  control={form.control}
                  name='caloriesWOFibre'
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
              <FormField
                control={form.control}
                name='caloriesWFibre'
                render={({ field }) => (
                  <FormItem
                    className='hidden'
                  >
                    <FormLabel>Calories</FormLabel>
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
                    <FormLabel>Fat</FormLabel>
                    <FormControl>
                      <div className='relative w-full'>
                        <Input
                          placeholder='Fat'
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
                <FormItem className='flex flex-row items-end space-x-6 space-y-0 rounded-md border p-4 shadow hidden'>
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
            <Collapsible className='hidden'>
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
    </div>
  )
}

export { FormIngredient }
