import { auth } from '@/server/auth'
import { TRPCError } from '@trpc/server'
import { generateFullName, generateName } from '~/lib/names'
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  rootProtectedProcedure,
} from '~/server/api/trpc'
import { client, db } from '~/server/db'
import { log } from '~/server/db/schema/log'
import { user, userSettings } from '~/server/db/schema/user'
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

const createLog = async ({
  user,
  task,
  notes,
  userId,
  objectId,
}: {
  user: string
  task: string
  notes: string
  userId: string
  objectId: number | null | undefined
}) => {
  await db.insert(log).values({
    task: task,
    notes: notes,
    user: user,
    userId: userId,
    objectId: objectId,
  })
}

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
  getAdminLogs: protectedProcedure.query(async ({ ctx }) => {
    const res = await ctx.db.query.log.findMany({})
    return res
  }),
  deleteAdminLog: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.delete(log).where(eq(log.id, input))
      return res
    }),
  sync: protectedProcedure.mutation(async () => {
    await client.sync()
    return true
  }),
  unprotectedSync: publicProcedure.mutation(async () => {
    await client.sync()
    return true
  }),
  getByEmail: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
      const res = await ctx.db.query.user.findFirst({
        where: (user, { eq }) => eq(user.email, input),
        columns: {
          password: false,
        },
      })
      return res
    }),
  updateTrainer: protectedProcedure
    .input(z.object({ id: z.string(), isTrainer: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(user)
        .set({
          isTrainer: input.isTrainer,
        })
        .where(eq(user.id, input.id))

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'Update Trainer',
        notes: JSON.stringify(input),
      })

      return res
    }),
  updateFirstName: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(user)
        .set({
          firstName: input.firstName,
        })
        .where(eq(user.id, input.id))

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'Update First Name',
        notes: JSON.stringify(input),
      })
      return res
    }),
  updateLastName: protectedProcedure
    .input(
      z.object({
        lastName: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(user)
        .set({
          lastName: input.lastName,
        })
        .where(eq(user.id, input.id))

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'Update Last Name',
        notes: JSON.stringify(input),
      })
      return res
    }),
  updateEmail: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(user)
        .set({
          email: input.email,
        })
        .where(eq(user.id, input.id))

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'Update Email',
        notes: JSON.stringify(input),
      })
      return res
    }),
  updatePassword: protectedProcedure
    .input(
      z.object({
        password: z.string(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hashedPassword = await hash(input.password, 10)
      const res = await ctx.db
        .update(user)
        .set({
          password: hashedPassword,
        })
        .where(eq(user.id, input.id))

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        objectId: null,
        task: 'Update Password',
        notes: JSON.stringify(input),
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
        settings: true,
        userPlans: {
          with: {
            userMeals: true,
            userRecipes: true,
            userIngredients: {
              with: {
                ingredient: true,
                alternateIngredient: true,
              },
            },
          },
        },
      },
    })
    return res
  }),
  getCurrentUser: protectedProcedure
    .input(z.object({ id: z.string() }).optional())
    .query(async ({ ctx, input }) => {
      let userId = ctx.session?.user.id

      if (input?.id && input.id !== '') userId = input.id

      if (!userId) return null

      const res = await ctx.db.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, userId),
        columns: {
          password: false,
        },
        with: {
          settings: true,
          userPlans: {
            with: {
              userMeals: true,
              userRecipes: true,
              userIngredients: {
                with: {
                  ingredient: true,
                  alternateIngredient: true,
                },
              },
            },
          },
        },
      })
      return res
    }),
  isUser: publicProcedure.query(async () => {
    console.log('isUser')
    const session = await auth()
    console.log('session')
    if (!session?.user) return null
    if (!session?.user?.id) return null
    return session.user
  }),
  isCreator: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id

    if (!userId) return null

    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
      columns: {
        isCreator: true,
      },
    })

    return res
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
      const res = await ctx.db
        .insert(user)
        .values({
          ...input,
          name: input.firstName + ' ' + input.lastName,
          password: hashedPassword,
        })
        .returning({ id: user.id })

      await ctx.db.insert(userSettings).values({
        userId: res[0]?.id || '00',
        defaultWater: '600',
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
    const jamie = await ctx.db
      .insert(user)
      .values({
        firstName: 'Jamie',
        lastName: 'Dash',
        name: 'Jamie Dash',
        email: 'jamie@comp-edge.com.au',
        password: hashedJamie,
        isTrainer: false,
      })
      .returning({ id: user.id })

    await ctx.db.insert(userSettings).values({
      userId: jamie[0]?.id || '00',
      defaultWater: '600',
    })

    return res
  }),
  updateWater: protectedProcedure
    .input(z.object({ water: z.number(), id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(userSettings)
        .set({
          defaultWater: input.water.toString(),
        })
        .where(eq(userSettings.id, input.id))
      return res
    }),
  updateChartRange: protectedProcedure
    .input(z.object({ range: z.number(), id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db
        .update(userSettings)
        .set({
          defaultChartRange: input.range.toString(),
        })
        .where(eq(userSettings.id, input.id))
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
  getGaurenteed: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
    if (input === '') throw new TRPCError({ code: 'BAD_REQUEST' })
    const res = await ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, input),
      columns: {
        password: false,
      },
      with: {
        settings: true,
        userPlans: {
          with: {
            userMeals: true,
            userRecipes: true,
            userIngredients: {
              with: {
                ingredient: true,
                alternateIngredient: true,
              },
            },
          },
        },
      },
    })
    if (!res) throw new TRPCError({ code: 'NOT_FOUND' })
    return res
  }),
})
