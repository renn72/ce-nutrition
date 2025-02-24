'use client'

import { api } from '@/trpc/react'

import { useState } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
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

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const SignIn = () => {
  const [loginError, setLoginError] = useState('')
  const [email, setEmail] = useState('')
  const ctx = api.useUtils()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            console.log('data', data)
            try {
              const res = await signIn('credentials', {
                redirect: false,
                username: data.email,
                password: data.password,
              })
              console.log('res', res)
              if (res?.status === 200) {
                toast.success('Logged in')
                ctx.user.isUser.refetch()
                router.push('/')
                router.refresh()
              }
              if (res?.error) throw new Error(res.error)
            } catch (err: any) {
              if (err.message === 'user not found')
                setLoginError('Invalid email')
              if (err.message === 'invalid password')
                setLoginError('Invalid password')
              console.log('err', err.message)
              return
            }
          })}
          className='flex w-full max-w-lg flex-col gap-2'
        >
          <div className='flex w-full flex-col gap-6'>
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
            <Button
              className='w-full'
              type='submit'
            >
              Log in
            </Button>
            <div className='text-sm text-destructive w-full text-center h-4 leading-none'>
              {loginError}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div className='text-sm text-muted-foreground w-full text-center '>
                  <span className='cursor-pointer text-primary/90 p-2'>
                    Forgot password? Get email link
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Email Magic Link</DialogTitle>
                  <DialogDescription className='px-6'>
                    We sent you an email with a magic link to login.
                  </DialogDescription>
                </DialogHeader>
                <Input
                  placeholder='email'
                  type='email'
                  className='w-full'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className='w-full'
                  onClick={async (e) => {
                    e.preventDefault()
                    void signIn('email', {email})
                  }}
                >
                  Send
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </form>
      </Form>
    </>
  )
}

export { SignIn }
