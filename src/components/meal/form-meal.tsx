import { api } from '@/trpc/react'

import { useState } from 'react'
import { cn, getRecipeDetails } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDown, CirclePlus, CircleX, PlusCircle } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormMealRecipe } from './form-meal-recipe'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  mealCategory: z.string(),
  veges: z
    .object({
      vegeStackId: z.string(),
      note: z.string(),
      calories: z.string(),
    })
    .optional(),
  recipes: z.array(
    z.object({
      recipeId: z.string(),
      note: z.string(),
      index: z.number(),
    }),
  ),
})

const FormMeal = () => {
  const [key, setKey] = useState(+new Date())
  const ctx = api.useUtils()
  const { data: veges, isLoading : vegesIsLoading } = api.vege.getAll.useQuery()
  const { data: recipes } = api.recipe.getAll.useQuery()
  const { mutate: createIngredient } = api.ingredient.create.useMutation({
    onSuccess: () => {
      ctx.ingredient.invalidate()
      toast.success('Ingredient added successfully')
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      image: '',
      notes: '',
      mealCategory: '',
      veges: {
        vegeStackId: '',
        note: '',
        calories: '',
      },
      recipes: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'recipes',
  })

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  if (vegesIsLoading) return null

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4 justify-between'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='w-full'>
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
              name='mealCategory'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Category'
                      {...field}
                      type='text'
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
              name='description'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Description'
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
              name='notes'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Notes'
                      {...field}
                      type='text'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Image'
                    {...field}
                    type='text'
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {veges && (
            <>
              <Label>Vege Stack</Label>
              <div className='flex gap-4 justify-between'>
                <FormField
                  control={form.control}
                  name='veges.vegeStackId'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel className=''>&#8192;</FormLabel>
                      <div className='flex gap-2 items-center'>
                        <Select
                          key={key}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Vege Stack' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {veges?.map((vege) => (
                              <SelectItem
                                key={vege.id}
                                value={vege.id.toString()}
                              >
                                {vege.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <CircleX
                          size={20}
                          className='cursor-pointer text-primary/50 hover:text-primary active:scale-90'
                          onClick={() => {
                            form.resetField('veges.vegeStackId')
                            form.resetField('veges.note')
                            form.resetField('veges.calories')
                            setKey(+new Date())
                          }}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='veges.calories'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Calories</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Calories'
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
                  name='veges.note'
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Notes'
                          {...field}
                          type='text'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          <Label>Recipes</Label>
          <div className='grid gap-2 grid-cols-10 items-end capitalize'>
            <div className='col-span-2'>recipe</div>
            <div>size</div>
            <div>cals</div>
            <div>protein</div>
            <div>carbs</div>
            <div>fat</div>
          </div>
          {fields.map((field, index) => (
            <FormMealRecipe
              index={index}
              form={form}
              remove={remove}
              key={field.recipeId}
            />
          ))}
          <CirclePlus
            size={20}
            className='cursor-pointer text-primary/50 hover:text-primary active:scale-90 '
            onClick={() =>
              append({ recipeId: '', note: '', index: fields.length + 1 })
            }
          />
          <div className='flex gap-4 justify-between'></div>
          <div>
            <Button type='submit'>Submit</Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export { FormMeal }
