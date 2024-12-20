import { getServerAuthSession } from '@/server/auth'
import { TRPCError } from '@trpc/server'
import { generateFullName, generateName } from '~/lib/names'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  rootProtectedProcedure,
} from '~/server/api/trpc'
import { client, db } from '~/server/db'
import { user } from '~/server/db/schema/user'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

function isTuple<T>(array: T[]): array is [T, ...T[]] {
  return array.length > 0
}

const createSchema = z.object({
  name: z.string(),
  birthDate: z.date().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  openLifter: z.string().optional(),
  notes: z.string().optional(),
  email: z.string().optional(),
})

const isUserRoot = async (userId: string) => {
  const res = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, userId),
    columns: {
      isRoot: true,
    },
  })
  return res?.isRoot
}

export const userRouter = createTRPCRouter({
  sync: protectedProcedure.mutation(async () => {
    await client.sync()
    return true
  }),
  unprotectedSync: publicProcedure.mutation(async () => {
    await client.sync()
    return true
  }),
  getByEmail: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, input),
      columns: {
        password: false,
      },
    })
    return res
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, input),
      columns: {
        password: false,
      },
      with: {
        userPlans: {
          with: {
            userMeals: true,
            userRecipes: true,
            userIngredients: {
              with: {
                ingredient: true,
              },
            },
          },
        },
      },
    })
    return res
  }),
  getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id

    if (!userId) return null

    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
      columns: {
        password: false,
      },
    })
    return res
  }),
  isUser: publicProcedure.query(async () => {
    console.log('isUser')
    const session = await getServerAuthSession()
    console.log('session')
    if (!session?.user) return null
    if (!session?.user?.id) return null
    return session.user
  }),
  isTrainer: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id

    if (!userId) return null

    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
      columns: {
        isTrainer: true,
      },
    })
    return res
  }),
  isRoot: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id

    if (!userId) return null

    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
      columns: {
        isRoot: true,
      },
    })
    return res
  }),
  updateRoot: rootProtectedProcedure
    .input(z.object({ isRoot: z.boolean(), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(user)
        .set({
          isRoot: input.isRoot,
        })
        .where(eq(user.id, input.id))

      return res
    }),
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.date().optional().nullable(),
        isCreator: z.boolean().optional(),
        isTrainer: z.boolean().optional(),
        isRoot: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hash(input.password, 10)
      const res = await ctx.db.insert(user).values({
        ...input,
        name: input.firstName + ' ' + input.lastName,
        password: hashedPassword,
      })

      return { user: input.email, password: input.password }
    }),

  createFakeUsers: rootProtectedProcedure.mutation(async ({ ctx }) => {
    const users = [
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
      },
      {
        firstName: generateName(),
        lastName: generateName(),
        isFake: true,
        isTrainer: true,
      },
    ]
    const hashedPassword = await hash('hklasd', 10)
    const hashedJamie = await hash('jamiedash', 10)
    const res = await ctx.db.insert(user).values(
      users.map((user) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.firstName + ' ' + user.lastName,
        email:
          user.firstName.toLowerCase() +
          user.lastName.toLowerCase() +
          '@warner.systems',
        password: hashedPassword,
        isFake: user.isFake,
        isTrainer: user.isTrainer || false,
      })),
    )
    await ctx.db.insert(user).values({
      firstName: 'Jamie',
      lastName: 'Dash',
      name: 'Jamie Dash',
      email: 'jamie@comp-edge.com.au',
      password: hashedJamie,
      isTrainer: false,
    })

    return res
  }),
  deleteFakeUsers: rootProtectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.delete(user).where(eq(user.isFake, true))
    return res
  }),
  deleteUser: rootProtectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.delete(user).where(eq(user.id, input))
      return res
    }),
  getFakeUsers: rootProtectedProcedure.query(async () => {
    const res = await db.query.user.findMany({
      where: (users, { eq }) => eq(users.isFake, true),
    })
    return res
  }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.user.findMany()
    return res
  }),
})
