'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
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

import { FormDialogIngredient } from './form-dialog-ingredient'

export const dynamic = 'force-dynamic'

export const formSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  image: z.string(),
  notes: z.string(),
  recipeCategory: z.string(),
  ingredients: z.array(
    z.object({
      ingredientId: z.number().nullable(),
      isProtein: z.boolean(),
      isCarbohydrate: z.boolean(),
      isFat: z.boolean(),
      note: z.string(),
      serveSize: z.string(),
      serveUnit: z.string(),
      index: z.number(),
      isAlternate: z.boolean().optional(),
    }),
  ),
})

const FormDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const ctx = api.useUtils()
  const { data: allIngredients } = api.ingredient.getAll.useQuery()
  const { mutate: createRecipe } = api.recipe.create.useMutation({
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
      description: '',
      image: '',
      notes: '',
      recipeCategory: '',
      ingredients: [],
    },
  })
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'ingredients',
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <PlusCircle className='h-6 w-6 text-muted-foreground hover:text-foreground hover:scale-110 active:scale-125 transition-transform cursor-pointer' />
      </DialogTrigger>
      <DialogContent className='max-w-xl w-full'>
        <DialogHeader>
          <DialogTitle>Create New Recipe</DialogTitle>
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
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipe Description</FormLabel>
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
              <div className='flex flex-col gap-4'>
                <h2>Ingredients</h2>
                {fields.map((ingredient, index) => (
                  <FormDialogIngredient
                    key={index}
                    index={index}
                    form={form}
                  />
                ))}
                <PlusCircle
                  size={24}
                  className='text-muted-foreground hover:text-foreground hover:scale-110 active:scale-125 transition-transform cursor-pointer'
                  onClick={() =>
                    append({
                      ingredientId: 0,
                      isProtein: false,
                      isCarbohydrate: false,
                      isFat: false,
                      serveSize: '',
                      serveUnit: '',
                      index: 0,
                      isAlternate: false,
                      note: '',
                    })
                  }
                />
              </div>
              <FormField
                control={form.control}
                name='notes'
                render={({ field }) => (
                  <FormItem>
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
              <div className='flex justify-between gap-4'>
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='recipeCategory'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recipe Category</FormLabel>
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
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image TODO</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Image'
                            {...field}
                            type='text'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
