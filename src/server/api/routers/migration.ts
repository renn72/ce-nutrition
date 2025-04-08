import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { drizzle } from 'drizzle-orm/postgres-js'

import { user } from '@/server/db/schema-pg/user'

const pgdb = drizzle(process.env.DATABASE_TWO_URL ?? '')

export const migrationRouter = createTRPCRouter({
  migrateUsers: protectedProcedure.mutation(async ({ ctx }) => {
    const res = await ctx.db.query.user.findMany()

    const mig = await pgdb.insert(user).values(res.map((u) => ({
      id: u.id,
      name: u.name,
      firstName: u.firstName,
      lastName: u.lastName,
      birthDate: u.birthDate?.toString(),
      gender: u.gender,
      address: u.address,
      notes: u.notes,
      instagram: u.instagram,
      phone: u.phone,
      email: u.email,
      emailVerified: u.emailVerified?.toString(),
      password: u.password,
      image: u.image,
      isFake: u.isFake,
      isTrainer: u.isTrainer,
      isRoot: u.isRoot,
      isCreator: u.isCreator,
      createdAt: u.createdAt.toString(),
      updatedAt: u.updatedAt?.toString(),
    })))
    return mig
  }),
})
