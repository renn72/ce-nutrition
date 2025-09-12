import {
	publicProcedure,
	adminProtectedProcedure,
} from '~/server/api/trpc'
import { user, userSettings } from '~/server/db/schema/user'
import { hash } from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const post = {
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
					name: `${input.firstName} ${input.lastName}`,
					password: hashedPassword,
				})
				.returning({ id: user.id })

			await ctx.db.insert(userSettings).values({
				userId: res[0]?.id || '00',
				defaultWater: '600',
			})

			return { user: input.email, password: input.password }
		}),
	deleteUser: adminProtectedProcedure
		.input(z.string())
		.mutation(async ({ ctx, input }) => {
			const res = await ctx.db.delete(user).where(eq(user.id, input))
			return res
		}),
}
