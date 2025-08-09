import { db } from '@/server/db'
import { log } from '@/server/db/schema/log'
import { message } from '@/server/db/schema/message'
import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

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

export const messageRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        fromUserId: z.string(),
        subject: z.string(),
        message: z.string(),
        isImportant: z.boolean(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .insert(message)
        .values({
          ...input,
        })
        .returning({ id: message.id })

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Create Message',
        notes: JSON.stringify(input),
        objectId: res[0]?.id,
      })

      return { res }
    }),
  getAllUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      let userId = input
      if (input === '') {
        userId = ctx.session?.user.id
      }
      const res = await ctx.db.query.message.findMany({
        where: eq(message.userId, userId),
        orderBy: (data, { desc }) => desc(data.createdAt),
        with: {
          fromUser: true,
          user: true,
        },
      })
      return res
    }),
  getAllFromUser: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      let userId = input
      if (input === '') {
        userId = ctx.session?.user.id
      }
      const res = await ctx.db.query.message.findMany({
        where: eq(message.fromUserId, userId),
        orderBy: (data, { desc }) => desc(data.createdAt),
        with: {
          fromUser: true,
          user: true,
        },
      })
      return res
    }),
  get: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    const res = await ctx.db.query.message.findFirst({
      where: eq(message.id, input),
    })
    return res
  }),
  markAsViewed: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(message)
        .set({ isViewed: true })
        .where(eq(message.id, input))

      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Mark Message as Viewed',
        notes: '',
        objectId: input,
      })

      return res
    }),
  markAsRead: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(message)
        .set({ isRead: true })
        .where(eq(message.id, input))
      createLog({
        user: ctx.session.user.name,
        userId: ctx.session.user.id,
        task: 'Mark Message as Read',
        notes: '',
        objectId: input,
      })
      return res
    }),

  delete: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db
        .update(message)
        .set({ isDeleted: true })
        .where(eq(message.id, input))
      return res
    }),
  deletePermanently: protectedProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const res = await ctx.db.delete(message).where(eq(message.id, input))
      return res
    }),
})
